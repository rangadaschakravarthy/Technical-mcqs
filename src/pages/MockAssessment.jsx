import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { questionService } from '../services/questionService';
import { storageService } from '../services/storageService';
import { hasGeminiKey } from '../services/geminiService';
import QuestionCard from '../components/QuestionCard';
import QuestionPalette from '../components/QuestionPalette';
import ProgressBar from '../components/ProgressBar';
import Timer from '../components/Timer';
import ConfirmDialog from '../components/ConfirmDialog';
import { 
  Timer as TimerIcon, 
  Key, 
  Play, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Sparkles,
  Loader2,
  AlertCircle
} from 'lucide-react';

export default function MockAssessment() {
  const navigate = useNavigate();
  const [hasStarted, setHasStarted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStatus, setGenerationStatus] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState({});
  const [startTime, setStartTime] = useState(null);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Inline API Key entry if user hasn't configured it
  const [inputKey, setInputKey] = useState('');
  const [isKeyConfigured, setIsKeyConfigured] = useState(() => hasGeminiKey());

  const handleSaveInlineKey = (e) => {
    e.preventDefault();
    if (!inputKey.trim()) return;
    storageService.saveSettings({ geminiApiKey: inputKey.trim() });
    setIsKeyConfigured(true);
    setErrorMsg('');
  };

  // Prevent accidental reload during test
  useEffect(() => {
    if (!hasStarted || isSubmitting) return;

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = 'You have an active timed mock assessment in progress. Are you sure you want to exit?';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasStarted, isSubmitting]);

  // Generate 40 questions via Gemini API
  const handleStartAndGenerate = async () => {
    if (!hasGeminiKey()) {
      setIsKeyConfigured(false);
      return;
    }

    setIsGenerating(true);
    setErrorMsg('');
    setGenerationStatus('Connecting to Gemini 2.5 Flash API...');

    try {
      const generatedQuestions = await questionService.getMockAssessmentQuestions((status) => {
        setGenerationStatus(status);
      });

      setQuestions(generatedQuestions);
      setHasStarted(true);
      setStartTime(Date.now());
    } catch (err) {
      setErrorMsg('Gemini Generation Error: ' + err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectAnswer = (optionIdx) => {
    setAnswers(prev => ({ ...prev, [currentIndex]: optionIdx }));
  };

  const handleClearAnswer = () => {
    setAnswers(prev => {
      const updated = { ...prev };
      delete updated[currentIndex];
      return updated;
    });
  };

  const handleToggleReview = () => {
    setMarkedForReview(prev => ({
      ...prev,
      [currentIndex]: !prev[currentIndex]
    }));
  };

  // Final submission
  const finalizeSubmission = (wasAutoSubmitted = false) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    let score = 0;
    const topicBreakdown = {};

    questions.forEach((q, idx) => {
      const userPick = answers[idx];
      const isRight = userPick === q.correctAnswer;
      if (isRight) score++;

      if (!topicBreakdown[q.topic]) {
        topicBreakdown[q.topic] = { total: 0, correct: 0 };
      }
      topicBreakdown[q.topic].total++;
      if (isRight) topicBreakdown[q.topic].correct++;

      storageService.recordMCQAttempt({
        questionId: q.id,
        topic: q.topic,
        difficulty: q.difficulty,
        isCorrect: isRight,
        questionObj: q
      });
    });

    const timeTakenSec = startTime ? Math.round((Date.now() - startTime) / 1000) : 2400;

    storageService.recordMockTest({
      score,
      totalQuestions: questions.length,
      timeTakenSec,
      topicBreakdown
    });

    navigate('/results', {
      state: {
        resultType: 'mock-assessment',
        title: 'Full 40-Question CS Mock Assessment (Gemini AI)',
        score,
        totalQuestions: questions.length,
        timeTakenSec,
        wasAutoSubmitted,
        questions,
        userAnswers: answers,
        topicBreakdown
      }
    });
  };

  const answeredCount = Object.keys(answers).length;
  const reviewCount = Object.keys(markedForReview).filter(k => markedForReview[k]).length;
  const unansweredCount = questions.length - answeredCount;

  // -------------------------------------------------------------
  // Pre-test Launch Screen
  // -------------------------------------------------------------
  if (!hasStarted) {
    return (
      <div className="container mock-launch-container">
        <div className="glass-panel mock-launch-card">
          <div className="launch-header">
            <div className="launch-badge">
              <Sparkles size={16} />
              <span>100% Dynamic Gemini AI Generation</span>
            </div>
            <h1 className="launch-title">CS Fundamentals Mock Assessment</h1>
            <p className="launch-subtitle">
              Generates a brand-new, customized 40-question technical exam across all syllabus domains in real time using the Gemini API.
            </p>
          </div>

          {/* API Key Entry Box if needed */}
          {!isKeyConfigured && (
            <div className="api-key-prompt-box">
              <div className="prompt-head">
                <Key size={18} className="text-accent" />
                <h4>Gemini API Key Required</h4>
              </div>
              <p>
                All questions are generated directly using the Gemini API. Please enter your Google Gemini API key to proceed.
              </p>
              <form onSubmit={handleSaveInlineKey} className="inline-key-form">
                <input
                  type="password"
                  className="inline-key-input"
                  placeholder="AIzaSy..."
                  value={inputKey}
                  onChange={(e) => setInputKey(e.target.value)}
                />
                <button type="submit" className="btn btn-primary btn-sm">
                  Save & Enable
                </button>
              </form>
            </div>
          )}

          {errorMsg && (
            <div className="error-alert-banner">
              <AlertCircle size={18} />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="mock-specs-grid">
            <div className="spec-item">
              <span className="spec-label">Total Questions</span>
              <span className="spec-val">40 MCQs</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Time Limit</span>
              <span className="spec-val">40 Minutes</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Question Source</span>
              <span className="spec-val">Gemini 2.5 Flash</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Negative Marking</span>
              <span className="spec-val">None (+1 for correct)</span>
            </div>
          </div>

          <div className="blueprint-distribution-box">
            <h4>Live AI Generation Blueprint</h4>
            <div className="blueprint-tags">
              <span className="bp-tag">Batch 1: Pseudocodes & Logic (10 Qs)</span>
              <span className="bp-tag">Batch 2: MS Excel & Office (10 Qs)</span>
              <span className="bp-tag">Batch 3: Network Security & Cloud (10 Qs)</span>
              <span className="bp-tag">Batch 4: Core CS Fundamentals (10 Qs)</span>
            </div>
          </div>

          {/* Generating Indicator or Launch Button */}
          <div className="launch-action-row">
            {isGenerating ? (
              <div className="generation-progress-box">
                <Loader2 size={24} className="animate-spin text-accent" />
                <span className="gen-status-text">{generationStatus}</span>
              </div>
            ) : (
              <button
                type="button"
                className="btn btn-primary btn-lg launch-btn"
                onClick={handleStartAndGenerate}
              >
                <Play size={18} />
                <span>Generate 40 Questions & Start Test</span>
              </button>
            )}
          </div>
        </div>

        <style>{`
          .mock-launch-container {
            padding-top: 32px;
            max-width: 860px;
          }
          .mock-launch-card {
            padding: 36px;
          }
          .launch-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-size: 12px;
            font-weight: 700;
            color: var(--accent-cyan);
            text-transform: uppercase;
            margin-bottom: 10px;
          }
          .launch-title {
            font-size: 30px;
            margin-bottom: 8px;
          }
          .launch-subtitle {
            font-size: 15px;
            line-height: 1.6;
            color: var(--text-secondary);
            margin-bottom: 24px;
          }
          .api-key-prompt-box {
            background: rgba(99, 102, 241, 0.12);
            border: 1px solid rgba(99, 102, 241, 0.35);
            border-radius: var(--radius-md);
            padding: 18px;
            margin-bottom: 24px;
          }
          .prompt-head {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 6px;
          }
          .prompt-head h4 {
            font-size: 15px;
            margin: 0;
            color: #fff;
          }
          .api-key-prompt-box p {
            font-size: 13px;
            color: var(--text-secondary);
            margin-bottom: 12px;
          }
          .inline-key-form {
            display: flex;
            gap: 8px;
          }
          .inline-key-input {
            flex: 1;
            padding: 8px 12px;
            background: var(--bg-surface);
            border: 1px solid var(--border-subtle);
            border-radius: var(--radius-sm);
            color: #fff;
            font-family: var(--font-mono);
            font-size: 13px;
          }
          .error-alert-banner {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 12px 16px;
            background: rgba(239, 68, 68, 0.15);
            border: 1px solid var(--danger-border);
            color: #f87171;
            border-radius: var(--radius-md);
            margin-bottom: 20px;
            font-size: 13.5px;
          }
          .mock-specs-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
            gap: 14px;
            margin-bottom: 24px;
          }
          .spec-item {
            background: var(--bg-surface);
            border: 1px solid var(--border-subtle);
            border-radius: var(--radius-md);
            padding: 14px;
            text-align: center;
          }
          .spec-label {
            font-size: 11px;
            color: var(--text-muted);
            display: block;
            margin-bottom: 4px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          .spec-val {
            font-size: 16px;
            font-weight: 800;
            color: var(--text-primary);
            font-family: var(--font-mono);
          }
          .blueprint-distribution-box {
            background: rgba(99, 102, 241, 0.08);
            border: 1px solid rgba(99, 102, 241, 0.2);
            border-radius: var(--radius-md);
            padding: 18px;
            margin-bottom: 28px;
          }
          .blueprint-distribution-box h4 {
            font-size: 14px;
            margin-bottom: 12px;
            color: #a5b4fc;
          }
          .blueprint-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }
          .bp-tag {
            background: rgba(255, 255, 255, 0.06);
            border: 1px solid var(--border-subtle);
            padding: 4px 10px;
            border-radius: var(--radius-sm);
            font-size: 12px;
            color: var(--text-secondary);
          }
          .launch-action-row {
            display: flex;
            justify-content: center;
          }
          .launch-btn {
            min-width: 320px;
          }
          .generation-progress-box {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 14px 24px;
            background: var(--bg-surface);
            border: 1px solid var(--border-active);
            border-radius: var(--radius-md);
          }
          .gen-status-text {
            font-size: 14px;
            font-weight: 600;
            color: var(--text-accent);
          }
        `}</style>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Active Assessment View
  // -------------------------------------------------------------
  const currentQ = questions[currentIndex];

  return (
    <div className="container active-mock-page">
      {/* Assessment Header Bar */}
      <div className="mock-topbar glass-panel">
        <div className="topbar-left">
          <span className="exam-title-badge">Accenture CS Mock (Gemini AI)</span>
          <span className="exam-qnum-tag">Q {currentIndex + 1} of 40</span>
        </div>

        {/* Precision Timer with Auto-Submit */}
        <div className="topbar-center">
          <Timer
            initialSeconds={2400}
            onExpire={() => finalizeSubmission(true)}
            warningThreshold={300}
            dangerThreshold={60}
          />
        </div>

        <div className="topbar-right">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => setShowConfirmSubmit(true)}
          >
            Submit Test ({answeredCount}/40)
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mock-progress-strip">
        <ProgressBar current={currentIndex + 1} total={40} label="Assessment Progress" />
      </div>

      {/* Test Execution Split */}
      <div className="mock-workspace-layout">
        <div className="mock-main-card-col">
          <QuestionCard
            question={currentQ}
            questionNumber={currentIndex + 1}
            selectedAnswer={answers[currentIndex]}
            onSelectAnswer={handleSelectAnswer}
            isMarkedForReview={Boolean(markedForReview[currentIndex])}
            onToggleReview={handleToggleReview}
            onClearAnswer={handleClearAnswer}
            mode="Test"
            showImmediateFeedback={false}
          />

          {/* Navigation Controls */}
          <div className="mock-navigation-bar">
            <button
              type="button"
              className="btn btn-secondary"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(prev => prev - 1)}
            >
              <ChevronLeft size={16} />
              <span>Previous</span>
            </button>

            {currentIndex < 39 ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setCurrentIndex(prev => prev + 1)}
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
                <span>Review & Submit</span>
                <CheckCircle2 size={16} />
              </button>
            )}
          </div>
        </div>

        {/* 40-Question Palette Sidebar */}
        <div className="mock-sidebar-col">
          <QuestionPalette
            totalQuestions={40}
            currentIndex={currentIndex}
            answers={answers}
            markedForReview={markedForReview}
            onSelectQuestion={(idx) => setCurrentIndex(idx)}
          />
        </div>
      </div>

      {/* Confirm Manual Submission Modal */}
      <ConfirmDialog
        isOpen={showConfirmSubmit}
        onClose={() => setShowConfirmSubmit(false)}
        onConfirm={() => finalizeSubmission(false)}
        title="Confirm Final Submission"
        message={
          unansweredCount > 0
            ? `You still have ${unansweredCount} unanswered question(s). Are you sure you want to finalize and score your test now?`
            : 'You have answered all 40 questions! Ready to finalize and submit?'
        }
        confirmText="Yes, Submit Final Score"
        cancelText="Return to Questions"
        stats={{
          answered: answeredCount,
          unanswered: unansweredCount,
          markedForReview: reviewCount
        }}
      />

      <style>{`
        .active-mock-page {
          padding-top: 18px;
        }
        .mock-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 20px;
          margin-bottom: 14px;
          flex-wrap: wrap;
          gap: 12px;
        }
        .topbar-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .exam-title-badge {
          font-weight: 700;
          font-size: 14px;
          color: var(--text-primary);
        }
        .exam-qnum-tag {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.05);
          padding: 2px 6px;
          border-radius: 4px;
        }
        .mock-progress-strip {
          margin-bottom: 18px;
        }
        .mock-workspace-layout {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 20px;
        }
        .mock-navigation-bar {
          display: flex;
          justify-content: space-between;
          margin-top: 14px;
        }
        @media (max-width: 960px) {
          .mock-workspace-layout {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
