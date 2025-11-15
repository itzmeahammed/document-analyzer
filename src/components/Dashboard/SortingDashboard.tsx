import React from 'react';
import { motion } from 'framer-motion';
import { Folder, FileText, TrendingUp, Calendar } from 'lucide-react';
import { Category } from '../../types';

const categories: Category[] = [
  { id: 'medical', name: 'Medical', icon: '🏥', count: 23, color: 'from-red-500/20 to-pink-500/20' },
  { id: 'financial', name: 'Financial', icon: '💰', count: 45, count: 45, color: 'from-green-500/20 to-emerald-500/20' },
  { id: 'legal', name: 'Legal', icon: '⚖️', count: 12, color: 'from-blue-500/20 to-indigo-500/20' },
  { id: 'personal', name: 'Personal', icon: '👤', count: 67, color: 'from-purple-500/20 to-violet-500/20' },
  { id: 'other', name: 'Other', icon: '📄', count: 8, color: 'from-gray-500/20 to-slate-500/20' }
];

const stats = [
  { label: 'Total Documents', value: '155', icon: FileText, change: '+12%' },
  { label: 'Processed Today', value: '24', icon: TrendingUp, change: '+8%' },
  { label: 'Categories', value: '5', icon: Folder, change: '0%' },
  { label: 'This Month', value: '89', icon: Calendar, change: '+23%' }
];

export default function SortingDashboard() {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/30 hover:border-violet-400/40 transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                  <p className={`text-xs mt-1 ${
                    stat.change.startsWith('+') ? 'text-emerald-400' : 'text-slate-400'
                  }`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-br from-violet-500/20 to-emerald-500/20 rounded-xl">
                  <Icon className="w-6 h-6 text-violet-400" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Category Folders */}
      <div>
        <h2 className="text-xl font-bold text-white mb-6">Document Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`relative bg-gradient-to-br ${category.color} backdrop-blur-sm rounded-2xl p-6 border border-white/10 cursor-pointer group hover:shadow-2xl hover:shadow-violet-500/20 transition-all`}
            >
              <div className="text-center">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{category.name}</h3>
                <p className="text-slate-300">{category.count} documents</p>
              </div>
              
              {/* Floating count badge */}
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-violet-500 to-emerald-500 text-white text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
                {category.count}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/30">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { action: 'Classified', document: 'Medical Report Q3.pdf', category: 'Medical', time: '2 minutes ago' },
            { action: 'Uploaded', document: 'Bank Statement Dec.pdf', category: 'Financial', time: '15 minutes ago' },
            { action: 'Tagged', document: 'Contract Agreement.docx', category: 'Legal', time: '1 hour ago' }
          ].map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-slate-700/20 rounded-xl hover:bg-slate-700/30 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-white">{activity.action}</span>
                <span className="text-violet-300 font-medium">{activity.document}</span>
                <span className="text-xs text-slate-400">→ {activity.category}</span>
              </div>
              <span className="text-xs text-slate-400">{activity.time}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}