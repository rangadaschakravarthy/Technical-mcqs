import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Timer, 
  ArrowRight, 
  Sparkles, 
  ShieldAlert, 
  BarChart3,
  Binary,
  Table,
  Cloud,
  FileCode2
} from 'lucide-react';

export default function LandingPage() {
  const features = [
    {
      title: 'Pseudocodes & Logic Tracing',
      path: '/mcq-practice',
      icon: Binary,
      color: '#6366f1',
      badge: 'Accenture Pattern',
      desc: 'Master bitwise operators (^, &, |, ~, <<, >>), nested loops, conditional branches, and recursive variable execution.'
    },
    {
      title: 'MS Excel & Spreadsheets',
      path: '/mcq-practice',
      icon: Table,
      color: '#10b981',
      badge: 'Office Dynamics',
      desc: 'Practice VLOOKUP, HLOOKUP, INDEX/MATCH, SUMIF, COUNTIF, absolute referencing ($A$1), and spreadsheet formulas.'
    },
    {
      title: 'MS Office & Common Applications',
      path: '/mcq-practice',
      icon: BookOpen,
      color: '#06b6d4',
      badge: 'Productivity Tools',
      desc: 'Test Word Mail Merge, PowerPoint Slide Master, Outlook protocols (IMAP/POP3), and essential keyboard shortcuts.'
    },
    {
      title: 'Network Security & Cloud Computing',
      path: '/mcq-practice',
      icon: Cloud,
      color: '#f59e0b',
      badge: 'Infrastructure',
      desc: 'Deep-dive into Firewalls, TLS handshakes, VPNs, DoS mitigation, IaaS/PaaS/SaaS, AWS/Azure, and Virtualization.'
    },
    {
      title: 'Core CS Fundamentals Mastery',
      path: '/mcq-practice',
      icon: FileCode2,
      color: '#38bdf8',
      badge: '34+ Assessment Topics',
      desc: 'Revise Operating Systems, DBMS, Computer Networks, OOP, Data Structures, and Software Engineering.'
    },
    {
      title: '40-Question, 40-Min Mock Exam',
      path: '/mock-assessment',
      icon: Timer,
      color: '#a855f7',
      badge: 'Timed Simulation',
      desc: 'Take an authentic, timed 40-question technical mock test across the syllabus with timestamp drift protection and auto-submission.'
    }
  ];

  return (
    <div className="landing-page-root">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-pill-badge">
            <Sparkles size={14} className="text-accent" />
            <span>Next-Gen Accenture Recruitment Readiness</span>
          </div>

          <h1 className="hero-main-heading">
            Ace Your Accenture Assessment with <span className="hero-gradient-text">Prep Arena</span>
          </h1>

          <p className="hero-lead">
            The dedicated MCQ and Mock Assessment preparation portal engineered for engineering candidates: Pseudocode, MS Office & Excel, Network Security, Cloud Computing, CS Fundamentals, and full-length timed mock exams.
          </p>

          <div className="hero-cta-group">
            <Link to="/mock-assessment" className="btn btn-primary btn-lg">
              <Timer size={18} />
              <span>Start 40-Min Mock Test</span>
              <ArrowRight size={16} />
            </Link>
            <Link to="/mcq-practice" className="btn btn-secondary btn-lg">
              <BookOpen size={18} />
              <span>Explore Assessment Topics</span>
            </Link>
            <Link to="/dashboard" className="btn btn-outline btn-lg">
              <BarChart3 size={18} />
              <span>View Dashboard</span>
            </Link>
          </div>

          {/* Quick Stats Strip */}
          <div className="hero-stats-strip">
            <div className="stat-unit">
              <strong className="stat-num">34+</strong>
              <span className="stat-name">Assessment Topics</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-unit">
              <strong className="stat-num">40m</strong>
              <span className="stat-name">Full Mock Exam</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-unit">
              <strong className="stat-num">100%</strong>
              <span className="stat-name">Client-Side Execution</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-unit">
              <strong className="stat-num">AI Powered</strong>
              <span className="stat-name">Gemini Question Engine</span>
            </div>
          </div>
        </div>
      </section>

      {/* Preparation Disclaimer Banner */}
      <section className="disclaimer-section">
        <div className="container">
          <div className="disclaimer-banner">
            <ShieldAlert size={20} className="disclaimer-icon" />
            <div className="disclaimer-text">
              <strong>Independent Preparation Platform Notice:</strong>
              <p>
                Accenture Prep Arena provides educational simulation and practice materials. Questions and concepts are independently crafted for recruitment readiness training and are not official questions from Accenture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-head text-center">
            <span className="section-eyebrow">Comprehensive Syllabus</span>
            <h2 className="section-title">Engineered for Technical Assessment Excellence</h2>
            <p className="section-desc">
              Practice topic-by-topic with instant concept explanations or evaluate your readiness under timed examination conditions.
            </p>
          </div>

          <div className="features-grid">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="glass-panel glass-panel-hover feature-card">
                  <div className="feature-card-top">
                    <div className="feature-icon-box" style={{ background: `${feat.color}18`, color: feat.color }}>
                      <Icon size={26} />
                    </div>
                    <span className="feature-badge" style={{ borderColor: `${feat.color}40`, color: feat.color }}>
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="feature-title">{feat.title}</h3>
                  <p className="feature-desc">{feat.desc}</p>

                  <div className="feature-footer">
                    <Link to={feat.path} className="feature-link">
                      <span>Practice topic</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="arena-footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <strong>Accenture Prep Arena</strong>
            <span>Assessment Preparation Portal for Students & Engineers</span>
          </div>
          <div className="footer-links">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/mcq-practice">MCQ Practice</Link>
            <Link to="/mock-assessment">Mock Test</Link>
          </div>
        </div>
      </footer>

      <style>{`
        .landing-page-root {
          display: flex;
          flex-direction: column;
        }
        .hero-section {
          padding: 60px 0 40px 0;
          text-align: center;
          position: relative;
        }
        .hero-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 920px;
        }
        .hero-pill-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(99, 102, 241, 0.12);
          border: 1px solid rgba(99, 102, 241, 0.3);
          color: var(--text-accent);
          padding: 6px 14px;
          border-radius: var(--radius-full);
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 24px;
        }
        .hero-main-heading {
          font-size: clamp(34px, 5.5vw, 56px);
          font-weight: 900;
          line-height: 1.15;
          letter-spacing: -0.03em;
          color: var(--text-primary);
          margin-bottom: 20px;
        }
        .hero-gradient-text {
          background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-lead {
          font-size: 18px;
          line-height: 1.6;
          color: var(--text-secondary);
          max-width: 760px;
          margin-bottom: 34px;
        }
        .hero-cta-group {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 48px;
        }
        .hero-stats-strip {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 24px;
          padding: 16px 28px;
          background: rgba(15, 23, 42, 0.65);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-xl);
          backdrop-filter: blur(8px);
        }
        .stat-unit {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 10px;
        }
        .stat-num {
          font-size: 20px;
          font-weight: 800;
          color: var(--text-primary);
          font-family: var(--font-mono);
        }
        .stat-name {
          font-size: 12px;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin-top: 2px;
        }
        .stat-divider {
          width: 1px;
          height: 28px;
          background: var(--border-subtle);
        }
        .disclaimer-section {
          padding: 10px 0 30px 0;
        }
        .disclaimer-banner {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          background: rgba(56, 189, 248, 0.05);
          border: 1px solid rgba(56, 189, 248, 0.2);
          border-radius: var(--radius-lg);
          padding: 16px 20px;
          max-width: 860px;
          margin: 0 auto;
        }
        .disclaimer-icon {
          color: var(--text-accent);
          flex-shrink: 0;
          margin-top: 2px;
        }
        .disclaimer-text strong {
          color: var(--text-primary);
          font-size: 13px;
          display: block;
          margin-bottom: 4px;
        }
        .disclaimer-text p {
          color: var(--text-muted);
          font-size: 13px;
          line-height: 1.5;
          margin: 0;
        }
        .features-section {
          padding: 40px 0 60px 0;
        }
        .section-head {
          margin-bottom: 36px;
        }
        .section-eyebrow {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--primary);
          display: block;
          margin-bottom: 8px;
        }
        .section-title {
          font-size: 28px;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 12px;
        }
        .section-desc {
          color: var(--text-secondary);
          max-width: 620px;
          margin: 0 auto;
          font-size: 15px;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
          gap: 20px;
        }
        .feature-card {
          padding: 24px;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .feature-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
        }
        .feature-icon-box {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .feature-badge {
          font-size: 11px;
          font-weight: 700;
          border: 1px solid;
          padding: 3px 8px;
          border-radius: var(--radius-full);
          text-transform: uppercase;
        }
        .feature-title {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 10px;
          color: var(--text-primary);
        }
        .feature-desc {
          font-size: 14px;
          line-height: 1.5;
          color: var(--text-secondary);
          flex-grow: 1;
          margin-bottom: 20px;
        }
        .feature-footer {
          border-top: 1px solid var(--border-subtle);
          padding-top: 14px;
        }
        .feature-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--text-accent);
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          transition: transform var(--transition-fast);
        }
        .feature-link:hover {
          transform: translateX(4px);
        }
        .arena-footer {
          border-top: 1px solid var(--border-subtle);
          padding: 32px 0;
          margin-top: 60px;
          background: rgba(9, 13, 22, 0.4);
        }
        .footer-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }
        .footer-brand strong {
          display: block;
          color: var(--text-primary);
          font-size: 15px;
        }
        .footer-brand span {
          color: var(--text-muted);
          font-size: 13px;
        }
        .footer-links {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .footer-links a {
          color: var(--text-secondary);
          font-size: 14px;
          text-decoration: none;
          transition: color var(--transition-fast);
        }
        .footer-links a:hover {
          color: var(--text-primary);
        }
        @media (max-width: 640px) {
          .hero-cta-group {
            flex-direction: column;
            width: 100%;
          }
          .hero-cta-group .btn {
            width: 100%;
          }
          .footer-inner {
            flex-direction: column;
            text-align: center;
          }
          .footer-links {
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
