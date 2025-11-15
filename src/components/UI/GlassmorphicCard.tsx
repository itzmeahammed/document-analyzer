import React from 'react';
import { motion } from 'framer-motion';

interface GlassmorphicCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export default function GlassmorphicCard({ 
  children, 
  className = '', 
  hover = true, 
  glow = false 
}: GlassmorphicCardProps) {
  return (
    <motion.div
      whileHover={hover ? { 
        scale: 1.02, 
        y: -5,
        boxShadow: glow ? '0 25px 50px -12px rgba(0, 0, 0, 0.3)' : '0 25px 50px -12px rgba(0, 0, 0, 0.15)'
      } : {}}
      whileTap={{ scale: 0.98 }}
      className={`
        relative backdrop-blur-xl bg-white border border-gray-200 rounded-3xl shadow-lg
        before:absolute before:inset-0 before:rounded-3xl
        before:bg-gradient-to-br before:from-gray-50 before:to-transparent
        before:opacity-50 before:pointer-events-none
        transition-all duration-300
        ${glow ? 'shadow-black/20' : ''}
        ${className}
      `}
    >
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}