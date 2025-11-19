import React, { useState, useEffect } from 'react';
import { Search, Bell, Settings, User, LogOut, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import GlassmorphicCard from '../UI/GlassmorphicCard';

interface UserData {
  email: string;
  fullName?: string;
  isAuthenticated: boolean;
}

export default function EnhancedHeader() {
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications] = useState(3);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUserData(null);
    navigate('/login');
  };

  const getUserInitial = () => {
    if (userData?.fullName) {
      return userData.fullName.charAt(0).toUpperCase();
    }
    return userData?.email.charAt(0).toUpperCase() || 'U';
  };

  const getDisplayName = () => {
    if (userData?.fullName) {
      return userData.fullName;
    }
    return userData?.email.split('@')[0] || 'User';
  };

  return (
    <header className="bg-white backdrop-blur-2xl border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Logo & Title */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-4"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="text-3xl"
          >
            📦
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold text-black">
              DocuSort AI
            </h1>
            <div className="flex items-center space-x-1">
              <Sparkles className="w-3 h-3 text-gray-600" />
              <span className="text-xs text-gray-600 font-medium">Smart Classifier</span>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 max-w-md mx-8"
        >
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-black transition-colors" />
            <input
              type="text"
              placeholder="Search documents with AI..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 backdrop-blur-xl border border-gray-300 rounded-2xl pl-12 pr-4 py-4 text-black placeholder-gray-400 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10 transition-all shadow-inner"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gray-200/10 to-gray-300/10 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
          </div>
        </motion.div>

        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            className="relative p-3 rounded-2xl bg-gray-100 backdrop-blur-xl hover:bg-gray-200 transition-all border border-gray-300 group"
          >
            <Bell className="w-5 h-5 text-gray-600 group-hover:text-black transition-colors" />
            {notifications > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-black rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg"
              >
                {notifications}
              </motion.div>
            )}
          </motion.button>

          {/* User Menu */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 p-3 rounded-2xl bg-gray-100 backdrop-blur-xl hover:bg-gray-200 transition-all border border-gray-300"
            >
              <div className="w-10 h-10 bg-black rounded-2xl flex items-center justify-center shadow-lg font-bold text-white">
                {getUserInitial()}
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium text-black">{getDisplayName()}</div>
                <div className="text-xs text-gray-600">Premium User</div>
              </div>
            </motion.button>

            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-16 w-64 z-50"
                >
                  <GlassmorphicCard className="p-2">
                    <div className="space-y-1">
                      <a href="#" className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 rounded-xl transition-colors group">
                        <User className="w-4 h-4 text-gray-600 group-hover:text-black" />
                        <span className="text-gray-700 group-hover:text-black">Profile Settings</span>
                      </a>
                      <a href="#" className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 rounded-xl transition-colors group">
                        <Settings className="w-4 h-4 text-gray-600 group-hover:text-black" />
                        <span className="text-gray-700 group-hover:text-black">Preferences</span>
                      </a>
                      <hr className="border-gray-200 my-2" />
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 rounded-xl transition-colors text-gray-700 group"
                      >
                        <LogOut className="w-4 h-4 group-hover:text-black" />
                        <span className="group-hover:text-black">Sign Out</span>
                      </button>
                    </div>
                  </GlassmorphicCard>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}