import React from 'react';
import { Bookmark, CheckCircle2 } from 'lucide-react';

export default function QuestionPalette({
  totalQuestions = 40,
  currentIndex = 0,
  answers = {}, // { [index]: selectedOptionIndex }
  markedForReview = {}, // { [index]: boolean }
  onSelectQuestion
}) {
  const answeredCount = Object.keys(answers).filter(k => answers[k] !== null && answers[k] !== undefined).length;
  const reviewCount = Object.keys(markedForReview).filter(k => markedForReview[k]).length;
  const unansweredCount = totalQuestions - answeredCount;

  return (
    <div className="glass-panel palette-container">
      <h4 className="palette-title">Question Palette</h4>

      {/* Summary Legend */}
      <div className="palette-stats-summary">
        <div className="stat-pill stat-answered">
          <span className="dot dot-answered" />
          <span>Answered ({answeredCount})</span>
        </div>
        <div className="stat-pill stat-review">
          <span className="dot dot-review" />
          <span>Review ({reviewCount})</span>
        </div>
        <div className="stat-pill stat-unanswered">
          <span className="dot dot-unanswered" />
          <span>Unanswered ({unansweredCount})</span>
        </div>
      </div>

      {/* Grid of Question Buttons */}
      <div className="palette-grid">
        {Array.from({ length: totalQuestions }, (_, idx) => {
          const isAnswered = answers[idx] !== null && answers[idx] !== undefined;
          const isReview = Boolean(markedForReview[idx]);
          const isCurrent = idx === currentIndex;

          let btnClass = 'palette-btn-unanswered';
          if (isReview && isAnswered) {
            btnClass = 'palette-btn-review-answered';
          } else if (isReview) {
            btnClass = 'palette-btn-review';
          } else if (isAnswered) {
            btnClass = 'palette-btn-answered';
          }

          if (isCurrent) {
            btnClass += ' palette-btn-current';
          }

          return (
            <button
              key={idx}
              type="button"
              className={`palette-btn ${btnClass}`}
              onClick={() => onSelectQuestion(idx)}
              title={`Question ${idx + 1}${isAnswered ? ' (Answered)' : ''}${isReview ? ' (Marked for Review)' : ''}`}
            >
              <span>{idx + 1}</span>
              {isReview && <span className="palette-review-flag" />}
            </button>
          );
        })}
      </div>

      <style>{`
        .palette-container {
          padding: 18px;
          height: fit-content;
        }
        .palette-title {
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 12px;
          color: var(--text-primary);
        }
        .palette-stats-summary {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 16px;
          font-size: 11.5px;
          padding-bottom: 14px;
          border-bottom: 1px solid var(--border-subtle);
        }
        .stat-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
        }
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        .dot-answered { background: var(--success); }
        .dot-review { background: var(--review); }
        .dot-unanswered { background: var(--bg-surface-elevated); border: 1px solid var(--border-subtle); }

        .palette-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 6px;
          max-height: 380px;
          overflow-y: auto;
          padding-right: 4px;
        }
        .palette-btn {
          position: relative;
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-sm);
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          border: 1px solid transparent;
          transition: all var(--transition-fast);
        }
        .palette-btn:hover {
          filter: brightness(1.2);
          transform: translateY(-1px);
        }
        .palette-btn-unanswered {
          background: var(--bg-surface);
          border-color: var(--border-subtle);
          color: var(--text-secondary);
        }
        .palette-btn-answered {
          background: rgba(16, 185, 129, 0.25);
          border-color: var(--success);
          color: #34d399;
        }
        .palette-btn-review {
          background: rgba(168, 85, 247, 0.25);
          border-color: var(--review);
          color: #c084fc;
        }
        .palette-btn-review-answered {
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(168, 85, 247, 0.35) 100%);
          border-color: var(--review);
          color: #ffffff;
        }
        .palette-btn-current {
          outline: 2px solid #38bdf8;
          outline-offset: 1px;
          box-shadow: 0 0 10px rgba(56, 189, 248, 0.5);
        }
        .palette-review-flag {
          position: absolute;
          top: 2px;
          right: 2px;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #c084fc;
        }
      `}</style>
    </div>
  );
}
