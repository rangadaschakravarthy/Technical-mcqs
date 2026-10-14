import React from 'react';
import Modal from './Modal';
import { AlertCircle, CheckCircle, HelpCircle } from 'lucide-react';

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Submission',
  message,
  confirmText = 'Submit Assessment',
  cancelText = 'Continue Practicing',
  isDanger = false,
  stats // optional { answered, unanswered, markedForReview }
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="480px">
      <div className="confirm-content">
        <div className="confirm-icon-row">
          {isDanger ? (
            <div className="confirm-icon-box danger-box">
              <AlertCircle size={28} />
            </div>
          ) : (
            <div className="confirm-icon-box info-box">
              <HelpCircle size={28} />
            </div>
          )}
          <p className="confirm-message">{message}</p>
        </div>

        {stats && (
          <div className="confirm-stats-box">
            <div className="c-stat-item">
              <span className="c-stat-label">Answered</span>
              <span className="c-stat-val text-green">{stats.answered}</span>
            </div>
            <div className="c-stat-item">
              <span className="c-stat-label">Marked for Review</span>
              <span className="c-stat-val text-purple">{stats.markedForReview}</span>
            </div>
            <div className="c-stat-item">
              <span className="c-stat-label">Unanswered</span>
              <span className="c-stat-val text-red">{stats.unanswered}</span>
            </div>
          </div>
        )}

        <div className="confirm-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            {cancelText}
          </button>
          <button 
            type="button" 
            className={`btn ${isDanger ? 'btn-danger' : 'btn-primary'}`} 
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>

      <style>{`
        .confirm-content {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .confirm-icon-row {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .confirm-icon-box {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .info-box {
          background: rgba(99, 102, 241, 0.15);
          color: #818cf8;
        }
        .danger-box {
          background: rgba(239, 68, 68, 0.15);
          color: #f87171;
        }
        .confirm-message {
          font-size: 14.5px;
          line-height: 1.5;
          color: var(--text-primary);
          margin: 0;
        }
        .confirm-stats-box {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 12px;
          text-align: center;
        }
        .c-stat-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .c-stat-label {
          font-size: 11px;
          color: var(--text-muted);
        }
        .c-stat-val {
          font-size: 16px;
          font-weight: 700;
          font-family: var(--font-mono);
        }
        .text-green { color: var(--success); }
        .text-purple { color: var(--review); }
        .text-red { color: var(--danger); }
        .confirm-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 6px;
        }
      `}</style>
    </Modal>
  );
}
