import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout Components
import Navbar from './components/Navbar';
import Modal from './components/Modal';

// Pages (MCQ Assessment Engine)
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import MCQPractice from './pages/MCQPractice';
import MockAssessment from './pages/MockAssessment';
import ResultsPage from './pages/ResultsPage';
import Settings from './pages/Settings';

export default function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <Router>
      <div className="app-layout">
        <Navbar onOpenSettings={() => setIsSettingsOpen(true)} />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Assessment & MCQ Practice */}
            <Route path="/mcq-practice" element={<MCQPractice />} />
            <Route path="/mock-assessment" element={<MockAssessment />} />

            {/* Assessment Results */}
            <Route path="/results" element={<ResultsPage />} />

            {/* Legacy / Removed routes redirected to dashboard */}
            <Route path="/games/*" element={<Navigate to="/dashboard" replace />} />
            <Route path="/games" element={<Navigate to="/dashboard" replace />} />
            <Route path="/cognitive-games/*" element={<Navigate to="/dashboard" replace />} />
            <Route path="/cognitive-games" element={<Navigate to="/dashboard" replace />} />
            <Route path="/coding-practice/*" element={<Navigate to="/dashboard" replace />} />
            <Route path="/coding-practice" element={<Navigate to="/dashboard" replace />} />
            <Route path="/coding-mock" element={<Navigate to="/dashboard" replace />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global Settings Modal */}
        <Modal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          title="Arena Settings & Preferences"
          maxWidth="600px"
        >
          <Settings onClose={() => setIsSettingsOpen(false)} />
        </Modal>
      </div>
    </Router>
  );
}
