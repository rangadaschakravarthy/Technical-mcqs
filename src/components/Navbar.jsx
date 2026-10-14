import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  Gamepad2, 
  BookOpen, 
  Timer as TimerIcon, 
  Code2, 
  BarChart3, 
  Settings as SettingsIcon,
  Menu,
  X,
  Sparkles,
  Sun,
  Moon
} from 'lucide-react';
import { storageService } from '../services/storageService';

export default function Navbar({ onOpenSettings }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => storageService.getSettings().theme || 'dark');

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    storageService.saveSettings({ theme: nextTheme });
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { to: '/mcq-practice', label: 'MCQ Practice', icon: BookOpen },
    { to: '/mock-assessment', label: 'Mock Test (40m)', icon: TimerIcon, badge: '40Q' }
  ];

  return (
    <header className="navbar-wrapper">
      <div className="container navbar-inner">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo" onClick={() => setMobileMenuOpen(false)}>
          <div className="brand-icon-box">
            <span className="brand-symbol">▲</span>
          </div>
          <div className="brand-text">
            <span className="brand-title">Accenture <span className="text-gradient">Prep Arena</span></span>
            <span className="brand-subtitle">Assessment Readiness Portal</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => `nav-item ${isActive ? 'nav-item-active' : ''}`}
              >
                <Icon size={16} />
                <span>{link.label}</span>
                {link.badge && <span className="nav-badge">{link.badge}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="nav-controls">
          <button 
            className="icon-btn" 
            onClick={toggleTheme} 
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button 
            className="icon-btn" 
            onClick={onOpenSettings} 
            title="Settings & Gemini API"
            aria-label="Open settings"
          >
            <SettingsIcon size={18} />
          </button>

          <Link to="/mock-assessment" className="btn btn-primary btn-sm start-mock-btn">
            <TimerIcon size={14} />
            <span>Start Mock</span>
          </Link>

          {/* Mobile hamburger button */}
          <button
            className="icon-btn mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <nav className="mobile-nav-list">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => `mobile-nav-item ${isActive ? 'mobile-nav-item-active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon size={18} />
                  <span>{link.label}</span>
                  {link.badge && <span className="nav-badge">{link.badge}</span>}
                </NavLink>
              );
            })}
            <button 
              className="mobile-nav-item" 
              onClick={() => { setMobileMenuOpen(false); onOpenSettings(); }}
            >
              <SettingsIcon size={18} />
              <span>Settings & API Key</span>
            </button>
          </nav>
        </div>
      )}

      <style>{`
        .navbar-wrapper {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(9, 13, 22, 0.88);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border-subtle);
          height: var(--header-height);
        }
        .navbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 100%;
        }
        .brand-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }
        .brand-icon-box {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 14px rgba(99, 102, 241, 0.5);
        }
        .brand-symbol {
          color: #ffffff;
          font-weight: 900;
          font-size: 16px;
          transform: rotate(90deg);
        }
        .brand-title {
          font-weight: 800;
          font-size: 16px;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          display: block;
        }
        .brand-subtitle {
          font-size: 11px;
          color: var(--text-muted);
          display: block;
          margin-top: -2px;
        }
        .text-gradient {
          background: linear-gradient(135deg, #818cf8 0%, #38bdf8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .nav-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          font-size: 13.5px;
          font-weight: 500;
          color: var(--text-secondary);
          border-radius: var(--radius-md);
          text-decoration: none;
          transition: all var(--transition-fast);
        }
        .nav-item:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.05);
        }
        .nav-item-active {
          color: #ffffff;
          background: rgba(99, 102, 241, 0.18);
          border: 1px solid rgba(99, 102, 241, 0.35);
        }
        .nav-badge {
          background: var(--primary);
          color: #ffffff;
          font-size: 10px;
          font-weight: 700;
          padding: 1px 6px;
          border-radius: 999px;
        }
        .nav-controls {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .icon-btn {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .icon-btn:hover {
          color: var(--text-primary);
          border-color: var(--border-active);
          background: var(--bg-surface-elevated);
        }
        .mobile-menu-toggle {
          display: none;
        }
        .start-mock-btn {
          white-space: nowrap;
        }
        .mobile-drawer {
          position: fixed;
          top: var(--header-height);
          left: 0;
          right: 0;
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border-subtle);
          padding: 16px;
          box-shadow: var(--shadow-lg);
          z-index: 99;
        }
        .mobile-nav-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .mobile-nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          font-size: 15px;
          font-weight: 500;
          color: var(--text-secondary);
          border-radius: var(--radius-md);
          background: transparent;
          border: none;
          width: 100%;
          text-align: left;
          cursor: pointer;
          text-decoration: none;
        }
        .mobile-nav-item-active {
          color: #ffffff;
          background: rgba(99, 102, 241, 0.2);
          border: 1px solid rgba(99, 102, 241, 0.4);
        }
        @media (max-width: 1024px) {
          .desktop-nav {
            display: none;
          }
          .mobile-menu-toggle {
            display: flex;
          }
          .start-mock-btn {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
