import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'outline';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, variant = 'primary', className = '' }) => {
  const baseClasses = "px-8 py-4 uppercase tracking-architect text-xs font-semibold transition-all duration-500 ease-out";
  
  const variants = {
    primary: "bg-luxury-black text-white hover:bg-gray-800",
    outline: "border border-gray-300 text-luxury-black hover:bg-luxury-black hover:text-white hover:border-luxury-black"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
};

export default Button;