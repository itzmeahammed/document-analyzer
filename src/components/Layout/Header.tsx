import React, { useState } from 'react';
import { Search, Bell, Settings, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="bg-slate-900/20 backdrop-blur-xl border-b border-white/10 px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Logo & Title */}
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-emerald-400 bg-clip-text text-transparent">
            📦 DocuSort AI
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/30 backdrop-blur-sm border border-slate-600/30 rounded-2xl pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-400/20 transition-all"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-xl bg-slate-800/30 backdrop-blur-sm hover:bg-slate-700/40 transition-colors relative"
          >
            <Bell className="w-5 h-5 text-slate-300" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
          </motion.button>

          {/* User Menu */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-2 rounded-xl bg-slate-800/30 backdrop-blur-sm hover:bg-slate-700/40 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-violet-400 to-emerald-400 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </motion.button>

            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-12 w-48 bg-slate-800/90 backdrop-blur-xl border border-slate-600/30 rounded-2xl py-2 shadow-2xl"
                >
                  <a href="#" className="flex items-center space-x-3 px-4 py-2 hover:bg-slate-700/40 transition-colors">
                    <User className="w-4 h-4 text-slate-300" />
                    <span className="text-slate-200">Profile</span>
                  </a>
                  <a href="#" className="flex items-center space-x-3 px-4 py-2 hover:bg-slate-700/40 transition-colors">
                    <Settings className="w-4 h-4 text-slate-300" />
                    <span className="text-slate-200">Settings</span>
                  </a>
                  <hr className="border-slate-600/30 my-2" />
                  <a href="#" className="flex items-center space-x-3 px-4 py-2 hover:bg-slate-700/40 transition-colors text-red-300">
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}