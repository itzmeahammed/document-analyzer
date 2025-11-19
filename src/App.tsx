import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import EnhancedThreeBackground from './components/Background/EnhancedThreeBackground';
import EnhancedHeader from './components/Layout/EnhancedHeader';
import Sidebar from './components/Layout/Sidebar';
import EnhancedUploadCard from './components/Upload/EnhancedUploadCard';
import ProcessingPanel from './components/Processing/ProcessingPanel';
import AwesomeDashboard from './components/Dashboard/AwesomeDashboard';
import LandingPage from './components/Landing/LandingPage';
import LoginPage from './components/Auth/LoginPage';
import SignupPage from './components/Auth/SignupPage';
import { ProcessingStatus } from './types';
import GlassmorphicCard from './components/UI/GlassmorphicCard';

interface User {
  email: string;
  fullName?: string;
  isAuthenticated: boolean;
}

function DashboardLayout() {
  const [activeView, setActiveView] = useState('landing');
  const [processingStatus] = useState<ProcessingStatus>({
    stage: 'nlp',
    progress: 65,
    detectedLanguage: 'English',
    confidence: 94,
    processingTime: 1.2
  });

  const renderMainContent = () => {
    switch (activeView) {
      case 'landing':
        return <LandingPage />;
      case 'dashboard':
        return <AwesomeDashboard />;
      case 'documents':
        return (
          <GlassmorphicCard className="p-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="text-6xl mb-6">📚</div>
              <h2 className="text-3xl font-bold text-black mb-4">Document Library</h2>
              <p className="text-gray-600 text-lg">Advanced document management coming soon...</p>
              <div className="flex justify-center space-x-2 mt-6">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-black rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
            </motion.div>
          </GlassmorphicCard>
        );
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-black overflow-hidden">
      <EnhancedThreeBackground />
      
      <div className="relative z-10 flex flex-col h-screen">
        <EnhancedHeader />
        
        <div className="flex-1 flex overflow-hidden">
          <Sidebar activeItem={activeView} onItemClick={setActiveView} />
          
          <main className="flex-1 overflow-auto">
            <div className="p-8">
              <div className="max-w-7xl mx-auto">
                {/* Welcome Banner */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      className="text-4xl"
                    >
                      🚀
                    </motion.div>
                    <div>
                      <h1 className="text-4xl font-bold text-black mb-2">
                        Welcome to DocuSort AI
                      </h1>
                      <p className="text-gray-600 text-lg">
                        Next-generation document intelligence powered by advanced AI
                      </p>
                    </div>
                  </div>
                </motion.div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                  {/* Main Content */}
                  <div className="xl:col-span-2">
                    {renderMainContent()}
                  </div>

                  {/* Sidebar Content */}
                  <div className="space-y-6">
                    <EnhancedUploadCard />
                    <ProcessingPanel status={processingStatus} />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLoginSuccess = (email: string) => {
    setUser({ email, isAuthenticated: true });
  };

  const handleSignupSuccess = (email: string) => {
    setUser({ email, isAuthenticated: true });
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/signup" element={<SignupPage onSignupSuccess={handleSignupSuccess} />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={user?.isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />}
        />

        {/* Default Route - Show Landing Page */}
        <Route
          path="/"
          element={<LandingPage />}
        />

        {/* Catch all - redirect to dashboard or landing */}
        <Route path="*" element={<Navigate to={user?.isAuthenticated ? "/dashboard" : "/"} />} />
      </Routes>
    </Router>
  );
}

export default App;