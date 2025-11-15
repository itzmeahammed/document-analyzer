import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  FileText, 
  FolderOpen, 
  Tag, 
  Trash2, 
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SidebarItem {
  id: string;
  label: string;
  icon: any;
  count?: number;
}

const sidebarItems: SidebarItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'documents', label: 'All Documents', icon: FileText, count: 142 },
  { id: 'categories', label: 'Categories', icon: FolderOpen, count: 5 },
  { id: 'tags', label: 'Tags', icon: Tag, count: 23 },
  { id: 'trash', label: 'Trash', icon: Trash2, count: 7 },
];

interface SidebarProps {
  activeItem: string;
  onItemClick: (itemId: string) => void;
}

export default function Sidebar({ activeItem, onItemClick }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 bg-white backdrop-blur-xl border-r border-gray-200 h-full flex flex-col`}>
      {/* Toggle Button */}
      <div className="p-4 border-b border-gray-200">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors w-full flex items-center justify-center"
        >
          {isCollapsed ? 
            <ChevronRight className="w-4 h-4 text-gray-600" /> : 
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          }
        </motion.button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          
          return (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.02, x: 2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onItemClick(item.id)}
              className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all group ${
                isActive 
                  ? 'bg-black border border-gray-400 text-white shadow-lg shadow-black/20' 
                  : 'hover:bg-gray-100 text-gray-600 hover:text-black'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'group-hover:text-black'} transition-colors`} />
              
              {!isCollapsed && (
                <>
                  <span className="font-medium flex-1 text-left">{item.label}</span>
                  {item.count && (
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      isActive 
                        ? 'bg-white/30 text-white' 
                        : 'bg-gray-200 text-gray-600 group-hover:bg-gray-300 group-hover:text-black'
                    } transition-colors`}>
                      {item.count}
                    </span>
                  )}
                </>
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="text-xs text-gray-600 text-center">
            DocuSort AI v1.0
          </div>
        </div>
      )}
    </div>
  );
}