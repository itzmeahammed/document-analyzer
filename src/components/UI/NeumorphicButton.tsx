import React from 'react';
import { motion } from 'framer-motion';

interface NeumorphicButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

export default function NeumorphicButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false
}: NeumorphicButtonProps) {
  const variants = {
    primary: 'bg-black text-white shadow-black/30 hover:bg-gray-900',
    secondary: 'bg-gray-700 text-white shadow-gray-700/30 hover:bg-gray-800',
    success: 'bg-black text-white shadow-black/30 hover:bg-gray-900',
    danger: 'bg-black text-white shadow-black/30 hover:bg-gray-900'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <motion.button
      whileHover={{ 
        scale: 1.05,
        boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.3)'
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative font-semibold rounded-2xl transition-all duration-300
        shadow-lg border border-gray-300
        before:absolute before:inset-0 before:rounded-2xl
        before:bg-gradient-to-br before:from-white/20 before:to-transparent
        before:opacity-0 hover:before:opacity-100 before:transition-opacity
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}