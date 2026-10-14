import React from 'react';
import { Bookmark, CheckCircle2, XCircle, RotateCcw, Lightbulb, Sparkles } from 'lucide-react';

export default function QuestionCard({
  question,
  questionNumber,
  selectedAnswer, // integer index 0-3 or null
  onSelectAnswer,
  isMarkedForReview = false,
  onToggleReview,
  onClearAnswer,
  mode = 'Practice', // 'Practice' | 'Test' | 'Revision'
  showImmediateFeedback = true // true in Practice mode
}) {
  if (!question) return null;

  const optionLabels = ['A', 'B', 'C', 'D'];
  const hasAnswered = selectedAnswer !== null && selectedAnswer !== undefined;
  const isPracticeMode = mode === 'Practice' || mode === 'Revision';
  const showFeedback = isPracticeMode && hasAnswered && showImmediateFeedback;

  return (
    <div className="glass-panel question-card-root">
      {/* Question Header */}
      <div className="qc-header">
        <div className="qc-meta-group">
          <span className="qc-qnum">QUESTION {questionNumber}</span>
          <span className="qc-topic">{question.topic}</span>
          <span className={`badge badge-${(question.difficulty || 'medium').toLowerCase()}`}>
            {question.difficulty}
          </span>
          {question.source && (
            <span className={`qc-source ${question.source.includes('Gemini') && !question.source.includes('Fallback') ? 'qc-source-ai' : 'qc-source-bank'}`}>
              <Sparkles size={12} />
              {question.source}
            </span>
          )}
        </div>

        <button
          type="button"
          className={`btn-review ${isMarkedForReview ? 'btn-review-active' : ''}`}
          onClick={onToggleReview}
          title="Mark this question to review later"
        >
          <Bookmark size={15} fill={isMarkedForReview ? 'currentColor' : 'none'} />
          <span>{isMarkedForReview ? 'Marked for Review' : 'Mark for Review'}</span>
        </button>
      </div>

      {/* Notice Banner (if fallback triggered) */}
      {question.notice && (
        <div className="qc-notice-box">
          <span>⚠️ {question.notice}</span>
        </div>
      )}

      {/* Question Text */}
      <div className="qc-body">
        <p className="qc-text">{question.question}</p>
      </div>

      {/* Answer Options */}
      <div className="qc-options-list">
        {question.options.map((optionText, idx) => {
          const isSelected = selectedAnswer === idx;
          const isCorrect = idx === question.correctAnswer;
          
          let optionStateClass = '';
          if (showFeedback) {
            if (isCorrect) optionStateClass = 'qc-option-correct';
            else if (isSelected && !isCorrect) optionStateClass = 'qc-option-incorrect';
          } else if (isSelected) {
            optionStateClass = 'qc-option-selected';
          }

          return (
            <button
              key={idx}
              type="button"
              className={`qc-option-btn ${optionStateClass}`}
              onClick={() => onSelectAnswer(idx)}
              aria-label={`Option ${optionLabels[idx]}: ${optionText}`}
            >
              <div className="qc-option-prefix">
                {showFeedback && isCorrect ? (
                  <CheckCircle2 size={18} className="qc-icon-correct" />
                ) : showFeedback && isSelected && !isCorrect ? (
                  <XCircle size={18} className="qc-icon-incorrect" />
                ) : (
                  <span>{optionLabels[idx]}</span>
                )}
              </div>
              <div className="qc-option-label-text">
                {optionText}
              </div>
            </button>
          );
        })}
      </div>

      {/* Card Actions: Clear Answer */}
      <div className="qc-footer-actions">
        {hasAnswered && (
          <button 
            type="button" 
            className="qc-clear-btn" 
            onClick={onClearAnswer}
          >
            <RotateCcw size={14} />
            <span>Clear Answer</span>
          </button>
        )}
      </div>

      {/* Practice Mode Explanation Panel */}
      {showFeedback && (
        <div className={`qc-explanation-panel ${selectedAnswer === question.correctAnswer ? 'exp-correct' : 'exp-incorrect'}`}>
          <div className="exp-header">
            <Lightbulb size={18} />
            <h4>
              {selectedAnswer === question.correctAnswer ? 'Correct! Excellent deduction.' : 'Incorrect Choice'}
            </h4>
          </div>
          
          <p className="exp-main-text">
            <strong>Key Concept ({question.concept || question.topic}): </strong>
            {question.explanation}
          </p>

          {/* Option-by-option explanations */}
          {question.optionExplanations && question.optionExplanations.length === 4 && (
            <div className="exp-breakdown">
              <span className="exp-breakdown-title">Option Breakdown:</span>
              <ul className="exp-breakdown-list">
                {question.optionExplanations.map((exp, i) => (
                  <li key={i} className={i === question.correctAnswer ? 'exp-li-correct' : 'exp-li-neutral'}>
                    <strong>Option {optionLabels[i]}:</strong> {exp}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <style>{`
        .question-card-root {
          padding: 24px;
          margin-bottom: 20px;
        }
        .qc-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 18px;
          padding-bottom: 14px;
          border-bottom: 1px solid var(--border-subtle);
        }
        .qc-meta-group {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .qc-qnum {
          font-family: var(--font-mono);
          font-weight: 700;
          font-size: 13px;
          color: var(--text-accent);
          background: rgba(56, 189, 248, 0.12);
          padding: 3px 8px;
          border-radius: var(--radius-sm);
        }
        .qc-topic {
          font-weight: 600;
          font-size: 13px;
          color: var(--text-secondary);
        }
        .qc-source {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          padding: 2px 8px;
          border-radius: 4px;
          font-weight: 500;
        }
        .qc-source-ai {
          color: #c084fc;
          background: rgba(168, 85, 247, 0.14);
          border: 1px solid rgba(168, 85, 247, 0.28);
        }
        .qc-source-bank {
          color: #f59e0b;
          background: rgba(245, 158, 11, 0.12);
          border: 1px solid rgba(245, 158, 11, 0.28);
        }
        .qc-notice-box {
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.3);
          color: #fbbf24;
          font-size: 12px;
          line-height: 1.4;
          padding: 8px 12px;
          border-radius: var(--radius-sm);
          margin-bottom: 14px;
        }
        .btn-review {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          font-size: 12px;
          font-weight: 600;
          border-radius: var(--radius-md);
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .btn-review:hover {
          color: var(--text-primary);
          border-color: var(--border-active);
        }
        .btn-review-active {
          background: var(--review-bg);
          border-color: var(--review-border);
          color: #c084fc;
        }
        .qc-body {
          margin-bottom: 22px;
        }
        .qc-text {
          font-size: 16px;
          line-height: 1.6;
          color: var(--text-primary);
          font-weight: 500;
          white-space: pre-wrap;
          word-break: break-word;
        }
        .qc-options-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .qc-option-btn {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 18px;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          text-align: left;
          cursor: pointer;
          transition: all var(--transition-fast);
          width: 100%;
        }
        .qc-option-btn:hover {
          background: var(--bg-surface-elevated);
          border-color: rgba(99, 102, 241, 0.4);
        }
        .qc-option-selected {
          background: rgba(99, 102, 241, 0.18) !important;
          border-color: var(--primary) !important;
          box-shadow: 0 0 14px rgba(99, 102, 241, 0.25);
        }
        .qc-option-correct {
          background: rgba(16, 185, 129, 0.18) !important;
          border-color: var(--success) !important;
          color: #34d399;
        }
        .qc-option-incorrect {
          background: rgba(239, 68, 68, 0.18) !important;
          border-color: var(--danger) !important;
          color: #f87171;
        }
        .qc-option-prefix {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 13px;
          flex-shrink: 0;
        }
        .qc-option-selected .qc-option-prefix {
          background: var(--primary);
          color: #ffffff;
        }
        .qc-icon-correct {
          color: #10b981;
        }
        .qc-icon-incorrect {
          color: #ef4444;
        }
        .qc-option-label-text {
          font-size: 14.5px;
          line-height: 1.45;
          flex: 1;
        }
        .qc-footer-actions {
          display: flex;
          justify-content: flex-end;
          margin-top: 14px;
        }
        .qc-clear-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-size: 12px;
          cursor: pointer;
          transition: color var(--transition-fast);
        }
        .qc-clear-btn:hover {
          color: var(--danger);
        }
        .qc-explanation-panel {
          margin-top: 20px;
          padding: 16px 20px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-subtle);
          animation: fade-in 0.2s ease;
        }
        .exp-correct {
          background: rgba(16, 185, 129, 0.08);
          border-color: rgba(16, 185, 129, 0.3);
        }
        .exp-incorrect {
          background: rgba(239, 68, 68, 0.08);
          border-color: rgba(239, 68, 68, 0.3);
        }
        .exp-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
          color: var(--text-primary);
        }
        .exp-header h4 {
          font-size: 14px;
          margin: 0;
        }
        .exp-main-text {
          font-size: 13.5px;
          line-height: 1.5;
          color: var(--text-primary);
          margin-bottom: 12px;
        }
        .exp-breakdown {
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 10px;
        }
        .exp-breakdown-title {
          font-size: 12px;
          font-weight: 700;
          color: var(--text-secondary);
          display: block;
          margin-bottom: 6px;
        }
        .exp-breakdown-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 0;
          font-size: 12.5px;
        }
        .exp-li-correct {
          color: #34d399;
        }
        .exp-li-neutral {
          color: var(--text-secondary);
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
