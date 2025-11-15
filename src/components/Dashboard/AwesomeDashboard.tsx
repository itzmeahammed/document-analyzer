import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Folder, 
  FileText, 
  TrendingUp, 
  Calendar, 
  Zap, 
  Brain, 
  Target,
  Award,
  Activity,
  Clock
} from 'lucide-react';
import { Category } from '../../types';
import GlassmorphicCard from '../UI/GlassmorphicCard';

const categories: Category[] = [
  { id: 'medical', name: 'Medical', icon: '🏥', count: 23, color: 'from-gray-200/50 to-gray-300/50' },
  { id: 'financial', name: 'Financial', icon: '💰', count: 45, color: 'from-gray-200/50 to-gray-300/50' },
  { id: 'legal', name: 'Legal', icon: '⚖️', count: 12, color: 'from-gray-200/50 to-gray-300/50' },
  { id: 'personal', name: 'Personal', icon: '👤', count: 67, color: 'from-gray-200/50 to-gray-300/50' },
  { id: 'education', name: 'Education', icon: '🎓', count: 34, color: 'from-gray-200/50 to-gray-300/50' },
  { id: 'other', name: 'Other', icon: '📄', count: 8, color: 'from-gray-200/50 to-gray-300/50' }
];

const stats = [
  { label: 'Total Documents', value: '189', icon: FileText, change: '+15%', color: 'text-black' },
  { label: 'AI Processed Today', value: '32', icon: Brain, change: '+12%', color: 'text-black' },
  { label: 'Categories', value: '6', icon: Folder, change: '+1', color: 'text-black' },
  { label: 'Accuracy Rate', value: '98.5%', icon: Target, change: '+0.3%', color: 'text-black' }
];

const recentActivity = [
  { 
    action: 'AI Classified', 
    document: 'Medical_Report_Q4_2024.pdf', 
    category: 'Medical', 
    time: '2 min ago',
    confidence: 97,
    icon: '🏥'
  },
  { 
    action: 'Auto-Tagged', 
    document: 'Bank_Statement_December.pdf', 
    category: 'Financial', 
    time: '8 min ago',
    confidence: 94,
    icon: '💰'
  },
  { 
    action: 'OCR Processed', 
    document: 'Legal_Contract_Amendment.docx', 
    category: 'Legal', 
    time: '15 min ago',
    confidence: 99,
    icon: '⚖️'
  },
  { 
    action: 'Batch Uploaded', 
    document: '5 Education Documents', 
    category: 'Education', 
    time: '1 hour ago',
    confidence: 92,
    icon: '🎓'
  }
];

export default function AwesomeDashboard() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassmorphicCard className="p-6 group cursor-pointer" glow>
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                    <motion.p 
                      className="text-3xl font-bold text-black"
                      whileHover={{ scale: 1.05 }}
                    >
                      {stat.value}
                    </motion.p>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs font-semibold ${
                        stat.change.startsWith('+') ? 'text-black' : 'text-gray-500'
                      }`}>
                        {stat.change}
                      </span>
                      <span className="text-xs text-gray-500">vs last month</span>
                    </div>
                  </div>
                  <motion.div 
                    className={`p-4 rounded-2xl bg-gray-200 group-hover:scale-110 transition-transform`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                  </motion.div>
                </div>
              </GlassmorphicCard>
            </motion.div>
          );
        })}
      </div>

      {/* AI Performance Metrics */}
      <GlassmorphicCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-black flex items-center space-x-3">
            <Brain className="w-7 h-7 text-black" />
            <span>AI Performance</span>
          </h2>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-black rounded-full animate-pulse" />
              <span className="text-black font-medium">Active</span>
            </div>
            <div className="text-gray-600">Last updated: 2 min ago</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-gray-100 rounded-2xl border border-gray-300">
            <div className="text-3xl font-bold text-black mb-2">98.5%</div>
            <div className="text-sm text-gray-600">Classification Accuracy</div>
          </div>
          <div className="text-center p-4 bg-gray-100 rounded-2xl border border-gray-300">
            <div className="text-3xl font-bold text-black mb-2">1.2s</div>
            <div className="text-sm text-gray-600">Avg Processing Time</div>
          </div>
          <div className="text-center p-4 bg-gray-100 rounded-2xl border border-gray-300">
            <div className="text-3xl font-bold text-black mb-2">2,847</div>
            <div className="text-sm text-gray-600">Documents Processed</div>
          </div>
        </div>
      </GlassmorphicCard>

      {/* Enhanced Category Folders */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-black flex items-center space-x-3">
            <Folder className="w-7 h-7 text-black" />
            <span>Smart Categories</span>
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-sm text-black hover:text-gray-700 font-medium"
          >
            Manage Categories →
          </motion.button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedCategory(category.id)}
            >
              <GlassmorphicCard 
                className={`p-6 cursor-pointer transition-all duration-300 ${
                  selectedCategory === category.id ? 'ring-2 ring-violet-400' : ''
                }`}
                glow={selectedCategory === category.id}
              >
                <div className="text-center space-y-4">
                  <motion.div 
                    className="text-5xl mb-4"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {category.icon}
                  </motion.div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-black mb-2">{category.name}</h3>
                    <p className="text-gray-600 text-sm">{category.count} documents</p>
                  </div>
                  
                  {/* Progress Ring */}
                  <div className="relative w-16 h-16 mx-auto">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        className="text-gray-300"
                      />
                      <motion.circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                        className="text-black"
                        initial={{ strokeDasharray: "0 175.93" }}
                        animate={{ strokeDasharray: `${(category.count / 100) * 175.93} 175.93` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold text-black">{category.count}</span>
                    </div>
                  </div>
                </div>
                
                {/* Floating Badge */}
                <motion.div 
                  className="absolute -top-2 -right-2 bg-black text-white text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {category.count}
                </motion.div>
              </GlassmorphicCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Enhanced Recent Activity */}
      <GlassmorphicCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-black flex items-center space-x-3">
            <Activity className="w-6 h-6 text-black" />
            <span>Live Activity Feed</span>
          </h3>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>Real-time updates</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <AnimatePresence>
            {recentActivity.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="group"
              >
                <GlassmorphicCard className="p-4" hover={false}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">{activity.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-black font-semibold text-sm">
                            {activity.action}
                          </span>
                          <span className="text-black font-medium">
                            {activity.document}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 text-xs text-gray-600">
                          <span>→ {activity.category}</span>
                          <span>•</span>
                          <span className="text-black font-medium">
                            {activity.confidence}% confidence
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-600 mb-1">{activity.time}</div>
                      <div className="w-2 h-2 bg-black rounded-full animate-pulse" />
                    </div>
                  </div>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </GlassmorphicCard>
    </div>
  );
}