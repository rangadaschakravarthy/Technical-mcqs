import React, { useEffect, useState, useRef } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

/**
 * Shared Precision Assessment Timer
 * Immune to background tab suspension drift using target timestamp comparison.
 */
export default function Timer({
  initialSeconds = 2400, // default 40 minutes (40 * 60)
  onExpire,
  isPaused = false,
  warningThreshold = 300, // 5 minutes
  dangerThreshold = 60, // 1 minute
  onTick
}) {
  const [secondsRemaining, setSecondsRemaining] = useState(initialSeconds);
  const targetTimeRef = useRef(Date.now() + initialSeconds * 1000);
  const pausedRemainingRef = useRef(initialSeconds);
  const expiredHandledRef = useRef(false);

  // Handle Pause / Resume
  useEffect(() => {
    if (isPaused) {
      pausedRemainingRef.current = secondsRemaining;
    } else {
      targetTimeRef.current = Date.now() + pausedRemainingRef.current * 1000;
    }
  }, [isPaused]);

  // Main countdown loop with timestamp drift immunity
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const diffMs = targetTimeRef.current - now;
      const remaining = Math.max(0, Math.ceil(diffMs / 1000));

      setSecondsRemaining(remaining);
      if (onTick) onTick(remaining);

      if (remaining <= 0 && !expiredHandledRef.current) {
        expiredHandledRef.current = true;
        clearInterval(interval);
        if (onExpire) onExpire();
      }
    }, 500);

    return () => clearInterval(interval);
  }, [isPaused, onExpire, onTick]);

  const formatTime = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const isWarning = secondsRemaining <= warningThreshold && secondsRemaining > dangerThreshold;
  const isDanger = secondsRemaining <= dangerThreshold;

  // Percentage of time remaining
  const percentage = Math.round((secondsRemaining / initialSeconds) * 100);

  return (
    <div className={`timer-badge ${isDanger ? 'timer-danger' : isWarning ? 'timer-warning' : 'timer-normal'}`}>
      {isDanger ? (
        <AlertTriangle size={18} className="timer-icon animate-pulse" />
      ) : (
        <Clock size={18} className="timer-icon" />
      )}
      <div className="timer-text-group">
        <span className="timer-label">TIME REMAINING</span>
        <span className="timer-display">{formatTime(secondsRemaining)}</span>
      </div>

      <style>{`
        .timer-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 16px;
          border-radius: var(--radius-md);
          font-family: var(--font-mono);
          font-weight: 700;
          transition: all var(--transition-fast);
          user-select: none;
        }
        .timer-normal {
          background: rgba(30, 41, 59, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #f8fafc;
        }
        .timer-warning {
          background: rgba(245, 158, 11, 0.18);
          border: 1px solid rgba(245, 158, 11, 0.5);
          color: #fbbf24;
        }
        .timer-danger {
          background: rgba(239, 68, 68, 0.22);
          border: 1px solid rgba(239, 68, 68, 0.6);
          color: #f87171;
          animation: timer-pulse 1.5s infinite ease-in-out;
        }
        .timer-text-group {
          display: flex;
          flex-direction: column;
          line-height: 1.1;
        }
        .timer-label {
          font-size: 9px;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          font-family: var(--font-sans);
        }
        .timer-display {
          font-size: 17px;
          letter-spacing: 0.05em;
        }
        @keyframes timer-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.85; transform: scale(0.98); }
        }
      `}</style>
    </div>
  );
}
