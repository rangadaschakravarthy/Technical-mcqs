import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowRight, 
  BarChart3, 
  Lightbulb, 
  Sparkles,
  AlertCircle
} from 'lucide-react';

export default function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state || {};

  const {
    title = 'Assessment Results',
    score = 0,
    totalQuestions = 40,
    timeTakenSec = 0,
    questions = [],
    userAnswers = {},
    topicBreakdown = {},
    tasksSummary = null,
    wasAutoSubmitted = false
  } = data;

  const accuracy = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  const unansweredCount = questions.length - Object.keys(userAnswers).length;
  const incorrectCount = totalQuestions - score - Math.max(0, unansweredCount);

  // Trigger celebration confetti if accuracy >= 70%
  React.useEffect(() => {
    if (accuracy >= 70) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });
    }
  }, [accuracy]);

  const formatTime = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}m ${secs}s`;
  };

  // Find weak topics (accuracy < 65%)
  const weakTopics = Object.entries(topicBreakdown)
    .filter(([_, stats]) => stats.total > 0 && (stats.correct / stats.total) < 0.65)
    .map(([topic]) => topic);

  return (
    <div className="container results-page">
      {/* Top Banner */}
      <div className="glass-panel results-hero-card">
        {wasAutoSubmitted && (
          <div className="autosubmit-warning-badge">
            <AlertCircle size={15} />
            <span>Time expired: Assessment was automatically submitted.</span>
          </div>
        )}

        <div className="results-hero-content">
          <div className="trophy-box">
            <Trophy size={48} className={accuracy >= 70 ? 'text-gold' : 'text-accent'} />
          </div>

          <div className="results-summary-text">
            <h1 className="results-title">{title}</h1>
            <p className="results-tagline">
              {accuracy >= 80 
                ? 'Outstanding performance! You are demonstrating high readiness for technical interviews.'
                : accuracy >= 60 
                ? 'Solid attempt! Review the missed concepts below to close knowledge gaps.'
                : 'Good practice session. Dedicate time to revising foundational concepts.'}
            </p>
          </div>
        </div>

        {/* Primary Metrics Grid */}
        <div className="metrics-cards-grid">
          <div className="metric-card">
            <span className="m-label">Score</span>
            <span className="m-val">{score} / {totalQuestions}</span>
          </div>
          <div className="metric-card">
            <span className="m-label">Accuracy</span>
            <span className={`m-val ${accuracy >= 70 ? 'text-green' : accuracy >= 50 ? 'text-yellow' : 'text-red'}`}>
              {accuracy}%
            </span>
          </div>
          <div className="metric-card">
            <span className="m-label">Time Taken</span>
            <span className="m-val">{formatTime(timeTakenSec)}</span>
          </div>
          <div className="metric-card">
            <span className="m-label">Answer Breakdown</span>
            <span className="m-val text-breakdown">
              <span className="text-green">{score} Correct</span> • <span className="text-red">{incorrectCount} Incorrect</span>
            </span>
          </div>
        </div>
      </div>


      {/* Topic-Wise Breakdown & Recommendations */}
      {Object.keys(topicBreakdown).length > 0 && (
        <div className="glass-panel topic-breakdown-panel">
          <div className="panel-title-row">
            <BarChart3 size={20} className="text-accent" />
            <h3>Topic-Wise Performance</h3>
          </div>

          <div className="topic-bars-grid">
            {Object.entries(topicBreakdown).map(([topic, stats]) => {
              const topicAcc = Math.round((stats.correct / stats.total) * 100);
              return (
                <div key={topic} className="topic-stat-item">
                  <div className="topic-stat-head">
                    <span className="topic-stat-name">{topic}</span>
                    <span className="topic-stat-count">{stats.correct}/{stats.total} ({topicAcc}%)</span>
                  </div>
                  <div className="topic-stat-track">
                    <div 
                      className="topic-stat-fill" 
                      style={{ 
                        width: `${topicAcc}%`,
                        background: topicAcc >= 70 ? 'var(--success)' : topicAcc >= 50 ? 'var(--warning)' : 'var(--danger)'
                      }} 
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {weakTopics.length > 0 && (
            <div className="weak-topics-box">
              <Lightbulb size={18} className="text-yellow" />
              <div>
                <strong>Recommended Revision Areas:</strong>
                <p>
                  Consider reviewing fundamentals in: <strong>{weakTopics.join(', ')}</strong>.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Review Questions & Detailed Explanations */}
      {questions.length > 0 && (
        <div className="glass-panel review-questions-section">
          <div className="panel-title-row">
            <Sparkles size={20} className="text-accent" />
            <h3>Detailed Question Review & Explanations</h3>
          </div>

          <div className="review-cards-list">
            {questions.map((q, idx) => {
              const userPick = userAnswers[idx];
              const isCorrect = userPick === q.correctAnswer;
              const isUnanswered = userPick === null || userPick === undefined;
              const optionLabels = ['A', 'B', 'C', 'D'];

              return (
                <div key={q.id || idx} className={`review-question-card ${isCorrect ? 'rq-pass' : 'rq-fail'}`}>
                  <div className="rq-header">
                    <span className="rq-num">Question {idx + 1}</span>
                    <span className="rq-topic">{q.topic}</span>
                    <span className={`badge ${isCorrect ? 'badge-easy' : isUnanswered ? 'badge-medium' : 'badge-hard'}`}>
                      {isCorrect ? 'Correct' : isUnanswered ? 'Unanswered' : 'Incorrect'}
                    </span>
                  </div>

                  <p className="rq-text">{q.question}</p>

                  <div className="rq-options-grid">
                    {q.options.map((opt, optIdx) => {
                      const isOptionSelected = userPick === optIdx;
                      const isOptionCorrect = optIdx === q.correctAnswer;

                      let optClass = 'rq-opt';
                      if (isOptionCorrect) optClass += ' rq-opt-correct';
                      else if (isOptionSelected && !isOptionCorrect) optClass += ' rq-opt-wrong';

                      return (
                        <div key={optIdx} className={optClass}>
                          <span className="rq-opt-prefix">{optionLabels[optIdx]}</span>
                          <span className="rq-opt-label">{opt}</span>
                          {isOptionCorrect && <CheckCircle2 size={16} className="text-green" />}
                          {isOptionSelected && !isOptionCorrect && <XCircle size={16} className="text-red" />}
                        </div>
                      );
                    })}
                  </div>

                  {/* Concept Explanation */}
                  <div className="rq-explanation-box">
                    <strong>Explanation ({q.concept || q.topic}): </strong>
                    <p>{q.explanation}</p>
                    {q.optionExplanations && (
                      <ul className="rq-option-exps">
                        {q.optionExplanations.map((exp, eIdx) => (
                          <li key={eIdx}>
                            <strong>Option {optionLabels[eIdx]}:</strong> {exp}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Bottom Action Shortcuts */}
      <div className="results-actions-bar">
        <Link to="/dashboard" className="btn btn-secondary">
          <RotateCcw size={15} />
          <span>Return to Dashboard</span>
        </Link>
        <Link to="/mcq-practice" className="btn btn-secondary">
          <span>Practice Topics</span>
        </Link>
        <Link to="/mock-assessment" className="btn btn-primary">
          <span>Take Another Mock</span>
          <ArrowRight size={15} />
        </Link>
      </div>

      <style>{`
        .results-page {
          padding-top: 24px;
        }
        .results-hero-card {
          padding: 32px;
          margin-bottom: 24px;
          border-left: 4px solid var(--primary);
        }
        .autosubmit-warning-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          background: rgba(245, 158, 11, 0.15);
          border: 1px solid rgba(245, 158, 11, 0.4);
          color: #fbbf24;
          border-radius: var(--radius-sm);
          font-size: 13px;
          margin-bottom: 16px;
        }
        .results-hero-content {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-bottom: 24px;
        }
        .trophy-box {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(99, 102, 241, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .text-gold { color: #facc15; filter: drop-shadow(0 0 10px rgba(250, 204, 21, 0.6)); }
        .results-title {
          font-size: 26px;
          margin-bottom: 6px;
        }
        .results-tagline {
          font-size: 14.5px;
          line-height: 1.5;
          color: var(--text-secondary);
          max-width: 720px;
          margin: 0;
        }
        .metrics-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 14px;
        }
        .metric-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 14px 18px;
        }
        .m-label {
          font-size: 11px;
          color: var(--text-muted);
          display: block;
          margin-bottom: 4px;
          text-transform: uppercase;
        }
        .m-val {
          font-size: 19px;
          font-weight: 800;
          font-family: var(--font-mono);
          color: var(--text-primary);
        }
        .text-breakdown {
          font-size: 13px;
        }
        .text-green { color: var(--success); }
        .text-yellow { color: var(--warning); }
        .text-red { color: var(--danger); }
        .task-summary-panel, .topic-breakdown-panel, .review-questions-section {
          padding: 26px;
          margin-bottom: 24px;
        }
        .panel-title-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }
        .panel-title-row h3 {
          font-size: 18px;
          margin: 0;
        }
        .tasks-status-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 14px;
        }
        .task-status-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: var(--radius-md);
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
        }
        .task-pass { border-left: 4px solid var(--success); color: #34d399; }
        .task-fail { border-left: 4px solid var(--danger); color: #f87171; }
        .task-status-info {
          display: flex;
          flex-direction: column;
          color: var(--text-primary);
        }
        .task-status-info strong { font-size: 14px; }
        .task-status-info span { font-size: 12px; color: var(--text-secondary); }
        .topic-bars-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 16px;
        }
        .topic-stat-item {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 12px 16px;
        }
        .topic-stat-head {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          margin-bottom: 6px;
        }
        .topic-stat-name { font-weight: 600; }
        .topic-stat-count { font-family: var(--font-mono); color: var(--text-muted); font-size: 12px; }
        .topic-stat-track {
          height: 6px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 999px;
          overflow: hidden;
        }
        .topic-stat-fill {
          height: 100%;
          border-radius: 999px;
        }
        .weak-topics-box {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 14px;
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.35);
          border-radius: var(--radius-md);
          margin-top: 20px;
          font-size: 13px;
          color: #fef08a;
        }
        .weak-topics-box p { margin: 4px 0 0 0; color: #fef08a; }
        .review-cards-list {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .review-question-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 20px;
        }
        .rq-pass { border-left: 4px solid var(--success); }
        .rq-fail { border-left: 4px solid var(--danger); }
        .rq-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }
        .rq-num { font-weight: 700; font-size: 13px; color: var(--text-accent); }
        .rq-topic { font-size: 12px; color: var(--text-secondary); }
        .rq-text {
          font-size: 15px;
          line-height: 1.5;
          margin-bottom: 14px;
          color: var(--text-primary);
        }
        .rq-options-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 8px;
          margin-bottom: 14px;
        }
        .rq-opt {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          font-size: 13px;
        }
        .rq-opt-correct {
          background: rgba(16, 185, 129, 0.15);
          border-color: var(--success);
          color: #34d399;
        }
        .rq-opt-wrong {
          background: rgba(239, 68, 68, 0.15);
          border-color: var(--danger);
          color: #f87171;
        }
        .rq-opt-prefix {
          font-weight: 700;
          font-family: var(--font-mono);
        }
        .rq-opt-label { flex: 1; }
        .rq-explanation-box {
          background: rgba(0, 0, 0, 0.25);
          border-radius: var(--radius-sm);
          padding: 12px 16px;
          font-size: 13px;
          line-height: 1.5;
          color: var(--text-primary);
        }
        .rq-option-exps {
          list-style: none;
          padding: 0;
          margin-top: 8px;
          font-size: 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          color: var(--text-secondary);
        }
        .results-actions-bar {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 24px;
          padding-bottom: 40px;
        }
      `}</style>
    </div>
  );
}
