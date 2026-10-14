/**
 * Storage Service
 * Versioned localStorage management for Accenture Prep Arena.
 * Tracks MCQ practice progress, mock assessment history, revision bank, and candidate settings.
 */

const STORAGE_KEYS = {
  SETTINGS: 'prep-arena:settings:v1',
  PROGRESS: 'prep-arena:progress:v1',
  MOCK_HISTORY: 'prep-arena:mock-history:v1',
  REVISION_BANK: 'prep-arena:revision-bank:v1'
};

const DEFAULT_SETTINGS = {
  geminiApiKey: '',
  theme: 'dark',
  soundEnabled: true,
  timerWarningThreshold: 300 // 5 minutes in seconds
};

const DEFAULT_PROGRESS = {
  sessionsCount: 0,
  totalQuestionsAttempted: 0,
  totalCorrect: 0,
  topicPerformance: {}, // { [topic]: { attempted: 0, correct: 0 } }
  difficultyPerformance: {
    Easy: { attempted: 0, correct: 0 },
    Medium: { attempted: 0, correct: 0 },
    Hard: { attempted: 0, correct: 0 }
  },
  recentActivity: [] // { id, type, title, score, timestamp }
};

const memoryStore = new Map();

function getStorage() {
  if (typeof window !== 'undefined' && window.localStorage) {
    return window.localStorage;
  }
  return {
    getItem: (key) => memoryStore.get(key) || null,
    setItem: (key, val) => memoryStore.set(key, val),
    removeItem: (key) => memoryStore.delete(key),
    clear: () => memoryStore.clear()
  };
}

function safeGet(key, defaultValue) {
  try {
    const raw = getStorage().getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw);
  } catch (e) {
    return defaultValue;
  }
}

function safeSet(key, value) {
  try {
    getStorage().setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    return false;
  }
}

export const storageService = {
  getSettings() {
    return { ...DEFAULT_SETTINGS, ...safeGet(STORAGE_KEYS.SETTINGS, {}) };
  },

  saveSettings(newSettings) {
    const current = this.getSettings();
    const updated = { ...current, ...newSettings };
    safeSet(STORAGE_KEYS.SETTINGS, updated);
    return updated;
  },

  getProgress() {
    const data = safeGet(STORAGE_KEYS.PROGRESS, DEFAULT_PROGRESS);
    return {
      ...DEFAULT_PROGRESS,
      ...data,
      topicPerformance: data.topicPerformance || {},
      difficultyPerformance: { ...DEFAULT_PROGRESS.difficultyPerformance, ...(data.difficultyPerformance || {}) }
    };
  },

  recordMCQAttempt({ questionId, topic, difficulty, isCorrect, questionObj }) {
    const progress = this.getProgress();
    progress.totalQuestionsAttempted += 1;
    if (isCorrect) progress.totalCorrect += 1;

    // Topic stats
    if (!progress.topicPerformance[topic]) {
      progress.topicPerformance[topic] = { attempted: 0, correct: 0 };
    }
    progress.topicPerformance[topic].attempted += 1;
    if (isCorrect) progress.topicPerformance[topic].correct += 1;

    // Difficulty stats
    const diff = difficulty || 'Medium';
    if (!progress.difficultyPerformance[diff]) {
      progress.difficultyPerformance[diff] = { attempted: 0, correct: 0 };
    }
    progress.difficultyPerformance[diff].attempted += 1;
    if (isCorrect) progress.difficultyPerformance[diff].correct += 1;

    // If incorrect, add to revision bank
    if (!isCorrect && questionObj) {
      this.addToRevisionBank(questionObj);
    }

    safeSet(STORAGE_KEYS.PROGRESS, progress);
    return progress;
  },

  recordMockTest(mockResult) {
    const history = this.getMockHistory();
    const record = {
      id: `mock-${Date.now()}`,
      timestamp: new Date().toISOString(),
      score: mockResult.score,
      totalQuestions: mockResult.totalQuestions,
      timeTakenSec: mockResult.timeTakenSec,
      accuracy: Math.round((mockResult.score / (mockResult.totalQuestions || 1)) * 100),
      topicBreakdown: mockResult.topicBreakdown || {}
    };

    history.unshift(record);
    safeSet(STORAGE_KEYS.MOCK_HISTORY, history.slice(0, 50)); // Keep last 50 tests

    // Update global progress
    const progress = this.getProgress();
    progress.sessionsCount += 1;
    progress.totalQuestionsAttempted += mockResult.totalQuestions;
    progress.totalCorrect += mockResult.score;

    // Recent activity log
    progress.recentActivity.unshift({
      id: record.id,
      type: 'Mock Assessment',
      title: 'Full Assessment Mock Exam (40 Qs)',
      score: `${mockResult.score}/${mockResult.totalQuestions}`,
      timestamp: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    progress.recentActivity = progress.recentActivity.slice(0, 10);

    safeSet(STORAGE_KEYS.PROGRESS, progress);
    return record;
  },

  getMockHistory() {
    return safeGet(STORAGE_KEYS.MOCK_HISTORY, []);
  },

  addToRevisionBank(question) {
    const bank = safeGet(STORAGE_KEYS.REVISION_BANK, []);
    if (!bank.some(q => q.id === question.id)) {
      bank.push({ ...question, addedAt: Date.now() });
      safeSet(STORAGE_KEYS.REVISION_BANK, bank.slice(-100)); // Keep max 100 revision questions
    }
  },

  getRevisionBank() {
    return safeGet(STORAGE_KEYS.REVISION_BANK, []);
  },

  removeFromRevisionBank(questionId) {
    const bank = safeGet(STORAGE_KEYS.REVISION_BANK, []);
    const filtered = bank.filter(q => q.id !== questionId);
    safeSet(STORAGE_KEYS.REVISION_BANK, filtered);
  },

  exportData() {
    return JSON.stringify({
      version: 1,
      exportedAt: new Date().toISOString(),
      progress: this.getProgress(),
      mockHistory: this.getMockHistory(),
      revisionBank: this.getRevisionBank()
    }, null, 2);
  },

  importData(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.progress) safeSet(STORAGE_KEYS.PROGRESS, parsed.progress);
      if (parsed.mockHistory) safeSet(STORAGE_KEYS.MOCK_HISTORY, parsed.mockHistory);
      if (parsed.revisionBank) safeSet(STORAGE_KEYS.REVISION_BANK, parsed.revisionBank);
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  },

  resetAllData() {
    getStorage().removeItem(STORAGE_KEYS.PROGRESS);
    getStorage().removeItem(STORAGE_KEYS.MOCK_HISTORY);
    getStorage().removeItem(STORAGE_KEYS.REVISION_BANK);
    return true;
  }
};
