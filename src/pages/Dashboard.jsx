import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { storageService } from '../services/storageService';
import { 
  BarChart3, 
  Trophy, 
  Clock, 
  CheckCircle2, 
  BookOpen, 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  AlertTriangle,
  Binary,
  Table,
  Cloud
} from 'lucide-react';

export default function Dashboard() {
  const [progress, setProgress] = useState(() => storageService.getProgress());
  const [mockHistory, setMockHistory] = useState(() => storageService.getMockHistory());

  useEffect(() => {
    setProgress(storageService.getProgress());
    setMockHistory(storageService.getMockHistory());
  }, []);

  const totalAttempted = progress.totalQuestionsAttempted || 0;
  const totalCorrect = progress.totalCorrect || 0;
  const overallAccuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;
  const topicsCount = Object.keys(progress.topicPerformance || {}).length;

  // Weak topics calculation (< 65% accuracy and attempted >= 2)
  const weakTopics = Object.entries(progress.topicPerformance || {})
    .filter(([_, stats]) => stats.attempted >= 2 && (stats.correct / stats.attempted) < 0.65)
    .map(([topic, stats]) => ({
      name: topic,
      accuracy: Math.round((stats.correct / stats.attempted) * 100),
      attempted: stats.attempted
    }));

  return (
    <div className="container dashboard-page">
      {/* Welcome Banner */}
      <div className="glass-panel dashboard-hero">
        <div className="hero-text-col">
          <div className="hero-badge">
            <TrendingUp size={14} />
            <span>Preparation Analytics & Readiness</span>
          </div>
          <h1 className="hero-title">Candidate Performance Dashboard</h1>
          <p className="hero-desc">
            Real-time assessment tracking calculated from your topic practice sessions and full-length timed mock exams.
          </p>
        </div>

        <div className="hero-cta-col">
          <Link to="/mock-assessment" className="btn btn-primary btn-md">
            <Clock size={16} />
            <span>Take 40-Min Mock Test</span>
          </Link>
          <Link to="/mcq-practice" className="btn btn-secondary btn-sm">
            <span>Practice By Topic</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="kpi-grid">
        <div className="glass-panel kpi-card">
          <div className="kpi-icon-box bg-indigo">
            <BookOpen size={20} className="text-indigo" />
          </div>
          <div className="kpi-text-group">
            <span className="kpi-label">Questions Attempted</span>
            <span className="kpi-value">{totalAttempted}</span>
            <span className="kpi-sub">{totalCorrect} correct answers</span>
          </div>
        </div>

        <div className="glass-panel kpi-card">
          <div className="kpi-icon-box bg-green">
            <CheckCircle2 size={20} className="text-green" />
          </div>
          <div className="kpi-text-group">
            <span className="kpi-label">MCQ Accuracy</span>
            <span className="kpi-value">{overallAccuracy}%</span>
            <span className="kpi-sub">Across all assessment domains</span>
          </div>
        </div>

        <div className="glass-panel kpi-card">
          <div className="kpi-icon-box bg-purple">
            <BarChart3 size={20} className="text-purple" />
          </div>
          <div className="kpi-text-group">
            <span className="kpi-label">Topics Practiced</span>
            <span className="kpi-value">{topicsCount}</span>
            <span className="kpi-sub">Out of 34+ syllabus topics</span>
          </div>
        </div>

        <div className="glass-panel kpi-card">
          <div className="kpi-icon-box bg-cyan">
            <Trophy size={20} className="text-cyan" />
          </div>
          <div className="kpi-text-group">
            <span className="kpi-label">Mocks Completed</span>
            <span className="kpi-value">{mockHistory.length}</span>
            <span className="kpi-sub">
              {mockHistory[0] ? `Latest Score: ${mockHistory[0].score}/40` : 'None yet'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Analytics Layout */}
      <div className="dashboard-content-grid">
        {/* Left Column: Topic Strengths & Weakness Areas */}
        <div className="dash-left-col">
          {/* Weak Topics to Revise */}
          {weakTopics.length > 0 && (
            <div className="glass-panel alert-revision-panel">
              <div className="panel-head-row">
                <AlertTriangle size={18} className="text-yellow" />
                <h3>Focus Revision Areas</h3>
              </div>
              <p className="panel-subtext">Topics where your accuracy is currently below 65%:</p>
              <div className="weak-topics-pills">
                {weakTopics.map(w => (
                  <div key={w.name} className="weak-pill">
                    <span className="weak-name">{w.name}</span>
                    <span className="weak-pct">{w.accuracy}% ({w.attempted} attempts)</span>
                  </div>
                ))}
              </div>
              <Link to="/mcq-practice" className="btn btn-outline btn-sm btn-inline-rev">
                <span>Practice Weak Topics in Revision Mode</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          )}

          {/* Topic-Wise Performance */}
          <div className="glass-panel topic-performance-panel">
            <div className="panel-head-row">
              <BarChart3 size={18} className="text-accent" />
              <h3>Topic-Wise Mastery</h3>
            </div>

            {Object.keys(progress.topicPerformance || {}).length === 0 ? (
              <div className="empty-stats-state">
                <p>No topic practice recorded yet. Start practicing topics to populate your analytics.</p>
                <Link to="/mcq-practice" className="btn btn-primary btn-sm">Start MCQ Practice</Link>
              </div>
            ) : (
              <div className="topic-bars-list">
                {Object.entries(progress.topicPerformance).map(([topic, stats]) => {
                  const pct = stats.attempted > 0 ? Math.round((stats.correct / stats.attempted) * 100) : 0;
                  return (
                    <div key={topic} className="topic-bar-row">
                      <div className="tb-head">
                        <span className="tb-name">{topic}</span>
                        <span className="tb-score">{stats.correct}/{stats.attempted} ({pct}%)</span>
                      </div>
                      <div className="tb-track">
                        <div 
                          className="tb-fill"
                          style={{
                            width: `${pct}%`,
                            background: pct >= 70 ? 'var(--success)' : pct >= 50 ? 'var(--warning)' : 'var(--danger)'
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Recent Activity & Shortcuts */}
        <div className="dash-right-col">
          {/* Quick Continue Shortcuts */}
          <div className="glass-panel shortcuts-panel">
            <h3>Quick Launch</h3>
            <div className="shortcuts-list">
              <Link to="/mock-assessment" className="shortcut-card">
                <Clock size={16} className="text-accent" />
                <div className="sc-info">
                  <strong>40-Min Full Mock Exam</strong>
                  <span>Simulated test with timer</span>
                </div>
                <ArrowRight size={14} className="sc-arrow" />
              </Link>
              <Link to="/mcq-practice" className="shortcut-card">
                <Binary size={16} className="text-purple" />
                <div className="sc-info">
                  <strong>Pseudocodes & Logic Tracing</strong>
                  <span>Bitwise operators & loop tracing</span>
                </div>
                <ArrowRight size={14} className="sc-arrow" />
              </Link>
              <Link to="/mcq-practice" className="shortcut-card">
                <Table size={16} className="text-cyan" />
                <div className="sc-info">
                  <strong>MS Excel & Spreadsheets</strong>
                  <span>VLOOKUP, SUMIF, & formulas</span>
                </div>
                <ArrowRight size={14} className="sc-arrow" />
              </Link>
              <Link to="/mcq-practice" className="shortcut-card">
                <Cloud size={16} className="text-green" />
                <div className="sc-info">
                  <strong>Network Security & Cloud</strong>
                  <span>Firewalls, TLS, & IaaS/PaaS</span>
                </div>
                <ArrowRight size={14} className="sc-arrow" />
              </Link>
            </div>
          </div>

          {/* Recent Activity Log */}
          <div className="glass-panel recent-activity-panel">
            <h3>Recent Activity</h3>
            {progress.recentActivity && progress.recentActivity.length > 0 ? (
              <div className="activity-timeline">
                {progress.recentActivity.map((act) => (
                  <div key={act.id} className="timeline-item">
                    <span className="timeline-dot" />
                    <div className="timeline-content">
                      <div className="timeline-header">
                        <strong>{act.title}</strong>
                        <span className="timeline-score">{act.score}</span>
                      </div>
                      <span className="timeline-time">{act.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-activity">No recent assessments completed yet.</p>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .dashboard-page {
          padding-top: 24px;
        }
        .dashboard-hero {
          padding: 30px 34px;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
          border-left: 4px solid var(--primary);
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--text-accent);
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .hero-title {
          font-size: 26px;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 6px;
        }
        .hero-desc {
          color: var(--text-secondary);
          max-width: 620px;
          font-size: 14px;
          line-height: 1.5;
        }
        .hero-cta-col {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }
        .kpi-card {
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .kpi-icon-box {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .bg-indigo { background: rgba(99, 102, 241, 0.15); }
        .bg-green { background: rgba(16, 185, 129, 0.15); }
        .bg-purple { background: rgba(168, 85, 247, 0.15); }
        .bg-cyan { background: rgba(6, 182, 212, 0.15); }
        .text-indigo { color: #818cf8; }
        .text-green { color: var(--success); }
        .text-purple { color: #c084fc; }
        .text-cyan { color: #22d3ee; }
        .text-yellow { color: var(--warning); }
        .kpi-text-group {
          display: flex;
          flex-direction: column;
        }
        .kpi-label {
          font-size: 12px;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .kpi-value {
          font-size: 24px;
          font-weight: 800;
          font-family: var(--font-mono);
          color: var(--text-primary);
          line-height: 1.2;
          margin: 2px 0;
        }
        .kpi-sub {
          font-size: 12px;
          color: var(--text-secondary);
        }
        .dashboard-content-grid {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 20px;
        }
        @media (max-width: 900px) {
          .dashboard-content-grid {
            grid-template-columns: 1fr;
          }
        }
        .dash-left-col, .dash-right-col {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .alert-revision-panel {
          padding: 20px 24px;
          border: 1px solid rgba(234, 179, 8, 0.25);
          background: rgba(234, 179, 8, 0.04);
        }
        .panel-head-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 6px;
        }
        .panel-head-row h3 {
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .panel-subtext {
          font-size: 13px;
          color: var(--text-muted);
          margin-bottom: 12px;
        }
        .weak-topics-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 14px;
        }
        .weak-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(239, 68, 68, 0.12);
          border: 1px solid rgba(239, 68, 68, 0.25);
          padding: 4px 10px;
          border-radius: var(--radius-full);
          font-size: 12px;
        }
        .weak-name {
          color: var(--text-primary);
          font-weight: 600;
        }
        .weak-pct {
          color: #f87171;
          font-family: var(--font-mono);
          font-weight: 700;
        }
        .btn-inline-rev {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .topic-performance-panel, .shortcuts-panel, .recent-activity-panel {
          padding: 24px;
        }
        .topic-performance-panel h3, .shortcuts-panel h3, .recent-activity-panel h3 {
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 16px;
        }
        .empty-stats-state {
          padding: 28px 20px;
          text-align: center;
        }
        .empty-stats-state p {
          color: var(--text-muted);
          font-size: 14px;
          margin-bottom: 14px;
        }
        .topic-bars-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .topic-bar-row {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .tb-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 13px;
        }
        .tb-name {
          font-weight: 600;
          color: var(--text-primary);
        }
        .tb-score {
          font-family: var(--font-mono);
          color: var(--text-muted);
          font-size: 12px;
        }
        .tb-track {
          width: 100%;
          height: 6px;
          background: var(--bg-surface-elevated);
          border-radius: var(--radius-full);
          overflow: hidden;
        }
        .tb-fill {
          height: 100%;
          border-radius: var(--radius-full);
          transition: width 0.4s ease;
        }
        .shortcuts-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .shortcut-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 14px;
          border-radius: var(--radius-md);
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          text-decoration: none;
          transition: all var(--transition-fast);
        }
        .shortcut-card:hover {
          border-color: var(--border-active);
          background: var(--bg-surface-elevated);
          transform: translateX(3px);
        }
        .sc-info {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        .sc-info strong {
          font-size: 13px;
          color: var(--text-primary);
        }
        .sc-info span {
          font-size: 11px;
          color: var(--text-muted);
        }
        .sc-arrow {
          color: var(--text-muted);
        }
        .activity-timeline {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .timeline-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }
        .timeline-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--primary);
          margin-top: 5px;
          flex-shrink: 0;
        }
        .timeline-content {
          flex-grow: 1;
        }
        .timeline-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 13px;
        }
        .timeline-header strong {
          color: var(--text-primary);
        }
        .timeline-score {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-accent);
          font-weight: 600;
        }
        .timeline-time {
          font-size: 11px;
          color: var(--text-muted);
        }
        .empty-activity {
          color: var(--text-muted);
          font-size: 13px;
          text-align: center;
          padding: 18px 0;
        }
      `}</style>
    </div>
  );
}
