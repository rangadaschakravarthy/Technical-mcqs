import React, { useState } from 'react';
import { storageService } from '../services/storageService';
import { Key, ShieldAlert, Download, Upload, Trash2, CheckCircle2, AlertTriangle } from 'lucide-react';
import ConfirmDialog from '../components/ConfirmDialog';

export default function Settings({ onClose }) {
  const currentSettings = storageService.getSettings();
  const [apiKey, setApiKey] = useState(currentSettings.geminiApiKey || '');
  const [saveStatus, setSaveStatus] = useState('');
  const [importStatus, setImportStatus] = useState('');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleSaveKey = (e) => {
    e.preventDefault();
    storageService.saveSettings({ geminiApiKey: apiKey.trim() });
    setSaveStatus('Settings successfully saved!');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const handleExport = () => {
    const dataStr = storageService.exportData();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `accenture-prep-arena-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const res = storageService.importData(event.target.result);
      if (res.success) {
        setImportStatus('Data imported successfully! Reloading...');
        setTimeout(() => window.location.reload(), 1200);
      } else {
        setImportStatus('Failed to import data: ' + res.error);
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    storageService.resetAllData();
    window.location.reload();
  };

  return (
    <div className="settings-container">
      {/* Gemini API Key Configuration */}
      <section className="settings-section">
        <div className="section-title-row">
          <Key size={18} className="text-accent" />
          <h4>Google Gemini API Key</h4>
        </div>
        <p className="section-desc">
          Configure your Gemini API key to dynamically generate unlimited, syllabus-aligned CS Fundamentals MCQs.
        </p>

        {/* Security Warning */}
        <div className="security-alert-box">
          <ShieldAlert size={20} className="alert-icon" />
          <div className="alert-text">
            <strong>Security Notice for Browser Execution:</strong>
            <p>
              In client-side single-page applications, API keys entered here or defined via <code>VITE_GEMINI_API_KEY</code> are visible in your browser's network inspect tab. Use a restricted key for personal practice. For production deployment, route requests through a secured backend proxy.
            </p>
          </div>
        </div>

        <form onSubmit={handleSaveKey} className="key-form">
          <div className="form-input-group">
            <input
              type="password"
              className="key-input"
              placeholder="AIzaSy..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <button type="submit" className="btn btn-primary btn-sm">
              Save Key
            </button>
          </div>
          {saveStatus && (
            <div className="status-success">
              <CheckCircle2 size={14} />
              <span>{saveStatus}</span>
            </div>
          )}
        </form>
      </section>

      {/* Backup and Restore */}
      <section className="settings-section">
        <div className="section-title-row">
          <Download size={18} className="text-accent" />
          <h4>Progress Backup & Portability</h4>
        </div>
        <p className="section-desc">
          Export your completed mock history, accuracy scores, and cognitive assessment records as JSON.
        </p>

        <div className="backup-btn-row">
          <button type="button" className="btn btn-secondary btn-sm" onClick={handleExport}>
            <Download size={14} />
            <span>Export Progress JSON</span>
          </button>

          <label className="btn btn-secondary btn-sm upload-label">
            <Upload size={14} />
            <span>Import Progress JSON</span>
            <input type="file" accept=".json" onChange={handleImport} style={{ display: 'none' }} />
          </label>
        </div>
        {importStatus && <p className="import-status-text">{importStatus}</p>}
      </section>

      {/* Danger Zone */}
      <section className="settings-section danger-section">
        <div className="section-title-row">
          <Trash2 size={18} className="text-danger" />
          <h4 className="text-danger">Reset Progress</h4>
        </div>
        <p className="section-desc">
          Clears all test histories, practice scores, solved challenges, and revision items from your local storage.
        </p>

        <button 
          type="button" 
          className="btn btn-danger btn-sm" 
          onClick={() => setShowResetConfirm(true)}
        >
          Reset All Saved Progress
        </button>
      </section>

      <ConfirmDialog
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        onConfirm={handleReset}
        title="Reset All Arena Data"
        message="Are you sure you want to permanently reset all progress, mock test scores, and code drafts? This cannot be undone."
        confirmText="Yes, Reset Everything"
        cancelText="Cancel"
        isDanger={true}
      />

      <style>{`
        .settings-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .settings-section {
          padding-bottom: 20px;
          border-bottom: 1px solid var(--border-subtle);
        }
        .settings-section:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }
        .section-title-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 6px;
        }
        .section-title-row h4 {
          font-size: 15px;
          margin: 0;
        }
        .section-desc {
          font-size: 13px;
          color: var(--text-secondary);
          margin-bottom: 14px;
          line-height: 1.45;
        }
        .security-alert-box {
          display: flex;
          gap: 12px;
          padding: 12px 14px;
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.35);
          border-radius: var(--radius-md);
          margin-bottom: 14px;
        }
        .alert-icon {
          color: #fbbf24;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .alert-text {
          font-size: 12px;
          line-height: 1.45;
          color: #fde68a;
        }
        .alert-text p {
          color: #fde68a;
          margin: 4px 0 0 0;
        }
        .alert-text code {
          background: rgba(0, 0, 0, 0.25);
          padding: 1px 4px;
          border-radius: 4px;
          font-family: var(--font-mono);
        }
        .form-input-group {
          display: flex;
          gap: 8px;
        }
        .key-input {
          flex: 1;
          padding: 8px 12px;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-family: var(--font-mono);
          font-size: 13px;
        }
        .key-input:focus {
          outline: none;
          border-color: var(--border-focus);
        }
        .status-success {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--success);
          font-size: 12px;
          margin-top: 8px;
        }
        .backup-btn-row {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .upload-label {
          cursor: pointer;
        }
        .import-status-text {
          font-size: 12px;
          color: var(--text-accent);
          margin-top: 8px;
        }
        .text-accent { color: var(--accent-cyan); }
        .text-danger { color: var(--danger); }
      `}</style>
    </div>
  );
}
