import React, { useState } from 'react';
import { CS_TOPICS } from '../data/topics';
import { questionService } from '../services/questionService';
import { storageService } from '../services/storageService';
import QuestionCard from '../components/QuestionCard';
import QuestionPalette from '../components/QuestionPalette';
import ProgressBar from '../components/ProgressBar';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  RotateCcw, 
  HelpCircle,
  Play,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MCQPractice() {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState(null); // topic object for config modal
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  // Configuration Modal state
  const [questionCount, setQuestionCount] = useState(10);
  const [difficulty, setDifficulty] = useState('Mixed');
  const [practiceMode, setPracticeMode] = useState('Practice'); // 'Practice' | 'Test' | 'Revision'
  const [useAi, setUseAi] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);

  // Active Practice Session state
  const [activeSession, setActiveSession] = useState(null); // { questions, currentIndex, answers, markedForReview, mode, topicName }
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [noticeMessage, setNoticeMessage] = useState(null);

  // Dynamic categories including Accenture Specifics
  const categories = ['ALL', ...Array.from(new Set(CS_TOPICS.map(t => t.category)))];

  const filteredTopics = CS_TOPICS.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'ALL' || t.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const [apiKeyInput, setApiKeyInput] = useState('');
  const [apiKeyError, setApiKeyError] = useState('');

  const openConfigForTopic = (topic) => {
    setSelectedTopic(topic);
    setIsConfigOpen(true);
    setNoticeMessage(null);
    setApiKeyError('');
  };

  const handleStartPractice = async () => {
    // If key not configured, check apiKeyInput
    if (!storageService.getSettings().geminiApiKey && !import.meta.env.VITE_GEMINI_API_KEY) {
      if (!apiKeyInput.trim()) {
        setApiKeyError('Gemini API Key is required to dynamically generate questions.');
        return;
      }
      storageService.saveSettings({ geminiApiKey: apiKeyInput.trim() });
    }

    setIsLoadingQuestions(true);
    setApiKeyError('');

    try {
      const res = await questionService.getQuestionsForPractice({
        topicName: selectedTopic.name,
        difficulty,
        count: Number(questionCount),
        mode: practiceMode
      });

      setIsConfigOpen(false);
      setActiveSession({
        questions: res.questions,
        currentIndex: 0,
        answers: {},
        markedForReview: {},
        mode: practiceMode,
        topicName: selectedTopic.name,
        startTime: Date.now()
      });

      if (res.notice) {
        setNoticeMessage(res.notice);
      }
    } catch (e) {
      setApiKeyError('Generation Error: ' + e.message);
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  // Answer selection in active session
  const handleSelectAnswer = (optionIdx) => {
    if (!activeSession) return;
    const { currentIndex, questions, answers, mode } = activeSession;
    const currentQ = questions[currentIndex];

    const isCorrect = optionIdx === currentQ.correctAnswer;

    // Record attempt in storageService
    storageService.recordMCQAttempt({
      questionId: currentQ.id,
      topic: currentQ.topic,
      difficulty: currentQ.difficulty,
      isCorrect,
      questionObj: currentQ
    });

    setActiveSession(prev => ({
      ...prev,
      answers: { ...prev.answers, [currentIndex]: optionIdx }
    }));
  };

  const handleClearAnswer = () => {
    if (!activeSession) return;
    const { currentIndex } = activeSession;
    setActiveSession(prev => {
      const updated = { ...prev.answers };
      delete updated[currentIndex];
      return { ...prev, answers: updated };
    });
  };

  const handleToggleReview = () => {
    if (!activeSession) return;
    const { currentIndex } = activeSession;
    setActiveSession(prev => ({
      ...prev,
      markedForReview: {
        ...prev.markedForReview,
        [currentIndex]: !prev.markedForReview[currentIndex]
      }
    }));
  };

  const handleSubmitSession = () => {
    if (!activeSession) return;
    const { questions, answers, startTime, topicName } = activeSession;
    let score = 0;
    const breakdown = {};

    questions.forEach((q, idx) => {
      const userPick = answers[idx];
      const isRight = userPick === q.correctAnswer;
      if (isRight) score++;

      if (!breakdown[q.topic]) {
        breakdown[q.topic] = { total: 0, correct: 0 };
      }
      breakdown[q.topic].total++;
      if (isRight) breakdown[q.topic].correct++;
    });

    const elapsedSec = Math.round((Date.now() - startTime) / 1000);

    // Navigate to results page with detailed state
    navigate('/results', {
      state: {
        resultType: 'mcq-practice',
        title: `${topicName} Practice Results`,
        score,
        totalQuestions: questions.length,
        timeTakenSec: elapsedSec,
        questions,
        userAnswers: answers,
        topicBreakdown: breakdown
      }
    });
  };

  // -------------------------------------------------------------
  // Active Question View
  // -------------------------------------------------------------
  if (activeSession) {
    const { questions, currentIndex, answers, markedForReview, mode } = activeSession;
    const currentQ = questions[currentIndex];
    const totalQ = questions.length;
    const answeredCount = Object.keys(answers).length;

    return (
      <div className="container practice-session-container">
        {/* Top Session Bar */}
        <div className="session-topbar glass-panel">
          <div className="session-info">
            <span className="session-title">{activeSession.topicName}</span>
            <span className="session-mode-badge">{mode} Mode</span>
          </div>

          <div className="session-topbar-right">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => setActiveSession(null)}
            >
              Exit to Topics
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => setShowConfirmSubmit(true)}
            >
              Submit Practice ({answeredCount}/{totalQ})
            </button>
          </div>
        </div>

        {noticeMessage && (
          <div className="session-notice-alert">
            <Sparkles size={16} />
            <span>{noticeMessage}</span>
          </div>
        )}

        <div className="session-progress-row">
          <ProgressBar current={currentIndex + 1} total={totalQ} label="Question Progress" />
        </div>

        <div className="session-layout">
          {/* Main Question Card */}
          <div className="session-main-pane">
            <QuestionCard
              question={currentQ}
              questionNumber={currentIndex + 1}
              selectedAnswer={answers[currentIndex]}
              onSelectAnswer={handleSelectAnswer}
              isMarkedForReview={Boolean(markedForReview[currentIndex])}
              onToggleReview={handleToggleReview}
              onClearAnswer={handleClearAnswer}
              mode={mode}
              showImmediateFeedback={mode === 'Practice' || mode === 'Revision'}
            />

            {/* Previous and Next Navigation */}
            <div className="session-nav-actions">
              <button
                type="button"
                className="btn btn-secondary"
                disabled={currentIndex === 0}
                onClick={() => setActiveSession(prev => ({ ...prev, currentIndex: prev.currentIndex - 1 }))}
              >
                <ChevronLeft size={16} />
                <span>Previous</span>
              </button>

              {currentIndex < totalQ - 1 ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setActiveSession(prev => ({ ...prev, currentIndex: prev.currentIndex + 1 }))}
                >
                  <span>Next Question</span>
                  <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => setShowConfirmSubmit(true)}
                >
                  <span>Finish Assessment</span>
                  <CheckCircle2 size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Palette Sidebar */}
          <div className="session-palette-pane">
            <QuestionPalette
              totalQuestions={totalQ}
              currentIndex={currentIndex}
              answers={answers}
              markedForReview={markedForReview}
              onSelectQuestion={(idx) => setActiveSession(prev => ({ ...prev, currentIndex: idx }))}
            />
          </div>
        </div>

        <ConfirmDialog
          isOpen={showConfirmSubmit}
          onClose={() => setShowConfirmSubmit(false)}
          onConfirm={handleSubmitSession}
          title="Submit Practice Session"
          message="Are you ready to submit your answers and view your performance breakdown?"
          stats={{
            answered: answeredCount,
            unanswered: totalQ - answeredCount,
            markedForReview: Object.keys(markedForReview).filter(k => markedForReview[k]).length
          }}
        />

        <style>{`
          .practice-session-container {
            padding-top: 20px;
          }
          .session-topbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 14px 20px;
            margin-bottom: 16px;
            flex-wrap: wrap;
            gap: 10px;
          }
          .session-title {
            font-size: 16px;
            font-weight: 700;
            color: var(--text-primary);
          }
          .session-mode-badge {
            background: rgba(99, 102, 241, 0.15);
            color: #818cf8;
            font-size: 11px;
            font-weight: 700;
            padding: 3px 8px;
            border-radius: var(--radius-sm);
            margin-left: 10px;
          }
          .session-topbar-right {
            display: flex;
            gap: 10px;
          }
          .session-notice-alert {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 10px 14px;
            background: rgba(56, 189, 248, 0.1);
            border: 1px solid rgba(56, 189, 248, 0.3);
            border-radius: var(--radius-md);
            font-size: 13px;
            color: #38bdf8;
            margin-bottom: 16px;
          }
          .session-progress-row {
            margin-bottom: 20px;
          }
          .session-layout {
            display: grid;
            grid-template-columns: 1fr 280px;
            gap: 20px;
          }
          .session-nav-actions {
            display: flex;
            justify-content: space-between;
            margin-top: 14px;
          }
          @media (max-width: 900px) {
            .session-layout {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Topics Catalogue View
  // -------------------------------------------------------------
  return (
    <div className="container mcq-hub-page">
      {/* Header Banner */}
      <div className="mcq-header-banner glass-panel">
        <div className="banner-badge">
          <BookOpen size={14} />
          <span>Computer Science Knowledge Bank</span>
        </div>
        <h1 className="banner-title">CS Fundamentals Practice</h1>
        <p className="banner-subtitle">
          Master 30 core technical subjects. Practice with immediate concept explanations, test your speed in timed exam simulations, or generate custom dynamic questions with the Gemini API.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="mcq-filter-bar glass-panel">
        <div className="search-input-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="filter-search-input"
            placeholder="Search topics (e.g., MS Excel, Pseudocode, Network Security, Cloud, OS)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="category-chips">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              className={`cat-chip ${categoryFilter === cat ? 'cat-chip-active' : ''}`}
              onClick={() => setCategoryFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Topics Cards Grid */}
      <div className="topics-grid">
        {filteredTopics.map((topic) => (
          <div key={topic.id} className="glass-panel glass-panel-hover topic-card">
            <div className="topic-card-header">
              <span className="topic-category-tag">{topic.category}</span>
              <span className="topic-qcount-tag">{topic.questionCount}+ Questions</span>
            </div>

            <h3 className="topic-name">{topic.name}</h3>
            <p className="topic-description">{topic.description}</p>

            <div className="topic-difficulty-breakdown">
              <span className="diff-tag-easy">Easy: {topic.difficultySplit.Easy}</span>
              <span className="diff-tag-med">Med: {topic.difficultySplit.Medium}</span>
              <span className="diff-tag-hard">Hard: {topic.difficultySplit.Hard}</span>
            </div>

            <div className="topic-card-footer">
              <button
                type="button"
                className="btn btn-primary btn-block"
                onClick={() => openConfigForTopic(topic)}
              >
                <Play size={14} />
                <span>Start Practice</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Topic Configuration Modal */}
      <Modal
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        title={selectedTopic ? `Configure: ${selectedTopic.name}` : 'Configure Practice'}
        maxWidth="500px"
      >
        {selectedTopic && (
          <div className="config-form">
            {/* Question Count Selection */}
            <div className="config-field">
              <label className="config-label">Number of Questions:</label>
              <div className="count-presets">
                {[5, 10, 15, 20, 30].map(cnt => (
                  <button
                    key={cnt}
                    type="button"
                    className={`preset-btn ${questionCount === cnt ? 'preset-active' : ''}`}
                    onClick={() => setQuestionCount(cnt)}
                  >
                    {cnt}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Selection */}
            <div className="config-field">
              <label className="config-label">Difficulty Level:</label>
              <div className="count-presets">
                {['Easy', 'Medium', 'Hard', 'Mixed'].map(diff => (
                  <button
                    key={diff}
                    type="button"
                    className={`preset-btn ${difficulty === diff ? 'preset-active' : ''}`}
                    onClick={() => setDifficulty(diff)}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            {/* Mode Selection */}
            <div className="config-field">
              <label className="config-label">Question Mode:</label>
              <div className="mode-selection-grid">
                <button
                  type="button"
                  className={`mode-card ${practiceMode === 'Practice' ? 'mode-card-active' : ''}`}
                  onClick={() => setPracticeMode('Practice')}
                >
                  <strong>Practice Mode</strong>
                  <span>Instant explanations & concept breakdowns after each answer.</span>
                </button>
                <button
                  type="button"
                  className={`mode-card ${practiceMode === 'Test' ? 'mode-card-active' : ''}`}
                  onClick={() => setPracticeMode('Test')}
                >
                  <strong>Test Mode</strong>
                  <span>No feedback until full submission, simulating timed exam conditions.</span>
                </button>
                <button
                  type="button"
                  className={`mode-card ${practiceMode === 'Revision' ? 'mode-card-active' : ''}`}
                  onClick={() => setPracticeMode('Revision')}
                >
                  <strong>Revision Mode</strong>
                  <span>Focuses on questions you previously answered incorrectly.</span>
                </button>
              </div>
            </div>

            {/* Gemini Generation Banner */}
            <div className="config-field ai-toggle-row">
              <div className="ai-label-col">
                <div className="ai-title">
                  <Sparkles size={16} className="text-accent" />
                  <strong>Generated via Gemini 2.5 Flash API</strong>
                </div>
                <span className="ai-sub">All questions are generated on demand specifically for this practice session.</span>
              </div>
            </div>

            {/* If key not set, prompt inline */}
            {!storageService.getSettings().geminiApiKey && !import.meta.env.VITE_GEMINI_API_KEY && (
              <div className="config-field">
                <label className="config-label">Enter Gemini API Key:</label>
                <input
                  type="password"
                  className="filter-search-input"
                  style={{ paddingLeft: '14px' }}
                  placeholder="AIzaSy..."
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                />
              </div>
            )}

            {apiKeyError && (
              <div className="error-text-line" style={{ color: 'var(--danger)', fontSize: '13px' }}>
                {apiKeyError}
              </div>
            )}

            <div className="config-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setIsConfigOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleStartPractice}
                disabled={isLoadingQuestions}
              >
                {isLoadingQuestions ? 'Preparing Questions...' : 'Begin Session'}
              </button>
            </div>
          </div>
        )}
      </Modal>

      <style>{`
        .mcq-hub-page {
          padding-top: 24px;
        }
        .mcq-header-banner {
          padding: 30px 36px;
          margin-bottom: 24px;
          border-left: 4px solid var(--accent-cyan);
        }
        .banner-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 700;
          color: var(--accent-cyan);
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .banner-title {
          font-size: 28px;
          font-weight: 800;
          margin-bottom: 8px;
        }
        .banner-subtitle {
          font-size: 15px;
          line-height: 1.6;
          max-width: 800px;
          color: var(--text-secondary);
        }
        .mcq-filter-bar {
          padding: 16px 20px;
          margin-bottom: 24px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .search-input-box {
          position: relative;
          width: 100%;
        }
        .search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }
        .filter-search-input {
          width: 100%;
          padding: 10px 14px 10px 42px;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-size: 14px;
        }
        .category-chips {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .cat-chip {
          padding: 5px 12px;
          font-size: 12px;
          font-weight: 600;
          border-radius: 999px;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .cat-chip:hover {
          color: var(--text-primary);
          border-color: var(--border-active);
        }
        .cat-chip-active {
          background: var(--primary) !important;
          color: #fff !important;
          border-color: var(--primary) !important;
        }
        .topics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
        }
        .topic-card {
          padding: 22px;
          display: flex;
          flex-direction: column;
        }
        .topic-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .topic-category-tag {
          font-size: 11px;
          font-weight: 700;
          color: var(--text-accent);
          background: rgba(56, 189, 248, 0.1);
          padding: 2px 8px;
          border-radius: 4px;
        }
        .topic-qcount-tag {
          font-size: 11px;
          color: var(--text-muted);
          font-family: var(--font-mono);
        }
        .topic-name {
          font-size: 18px;
          margin-bottom: 8px;
        }
        .topic-description {
          font-size: 13px;
          line-height: 1.5;
          margin-bottom: 16px;
        }
        .topic-difficulty-breakdown {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
          font-size: 11px;
          font-weight: 600;
        }
        .diff-tag-easy { color: #34d399; }
        .diff-tag-med { color: #fbbf24; }
        .diff-tag-hard { color: #f87171; }
        .topic-card-footer {
          margin-top: auto;
        }
        .config-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .config-label {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
          display: block;
          margin-bottom: 8px;
        }
        .count-presets {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .preset-btn {
          flex: 1;
          min-width: 45px;
          padding: 8px;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .preset-active {
          background: var(--primary) !important;
          border-color: var(--primary) !important;
          color: #fff !important;
        }
        .mode-selection-grid {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .mode-card {
          padding: 10px 14px;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          text-align: left;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .mode-card strong {
          display: block;
          font-size: 13px;
          color: var(--text-primary);
        }
        .mode-card span {
          font-size: 11.5px;
          color: var(--text-muted);
        }
        .mode-card-active {
          border-color: var(--primary);
          background: rgba(99, 102, 241, 0.15);
        }
        .ai-toggle-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 14px;
          background: rgba(99, 102, 241, 0.1);
          border: 1px solid rgba(99, 102, 241, 0.3);
          border-radius: var(--radius-md);
        }
        .ai-title {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: var(--text-primary);
        }
        .ai-sub {
          font-size: 11px;
          color: var(--text-muted);
          display: block;
          margin-top: 2px;
        }
        .ai-checkbox {
          width: 18px;
          height: 18px;
          accent-color: var(--primary);
          cursor: pointer;
        }
        .config-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 8px;
        }
      `}</style>
    </div>
  );
}
