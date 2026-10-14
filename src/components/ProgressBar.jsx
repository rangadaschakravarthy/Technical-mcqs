import React from 'react';

export default function ProgressBar({ current, total, label = 'Progress' }) {
  const percentage = total > 0 ? Math.min(100, Math.round((current / total) * 100)) : 0;

  return (
    <div className="progress-container">
      <div className="progress-label-row">
        <span className="progress-title">{label}</span>
        <span className="progress-count">{current} of {total} ({percentage}%)</span>
      </div>
      <div className="progress-track">
        <div 
          className="progress-fill" 
          style={{ width: `${percentage}%` }}
        />
      </div>

      <style>{`
        .progress-container {
          width: 100%;
        }
        .progress-label-row {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          margin-bottom: 6px;
        }
        .progress-title {
          color: var(--text-muted);
          font-weight: 500;
        }
        .progress-count {
          color: var(--text-primary);
          font-family: var(--font-mono);
          font-weight: 600;
        }
        .progress-track {
          height: 6px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 999px;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #6366f1 0%, #06b6d4 100%);
          border-radius: 999px;
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
}
