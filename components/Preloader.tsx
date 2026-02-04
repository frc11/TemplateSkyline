import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Preloader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Simulate loading process
    const duration = 2200; // slightly more than 2s for premium feel
    const interval = 30;
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress(prev => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          // Small delay before opening curtains
          setTimeout(() => setIsLoaded(true), 200);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // Remove component from DOM after animation completes
  useEffect(() => {
    if (isLoaded) {
      // 1.2s buffer for the 1s animation
      const timer = setTimeout(() => setShow(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
      {/* Left Curtain */}
      <motion.div
        initial={{ x: 0 }}
        animate={isLoaded ? { x: "-100%" } : { x: 0 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        className="absolute top-0 left-0 w-1/2 h-full bg-white border-r border-gray-100 shadow-2xl z-10"
      />
      
      {/* Right Curtain */}
      <motion.div
        initial={{ x: 0 }}
        animate={isLoaded ? { x: "100%" } : { x: 0 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        className="absolute top-0 right-0 w-1/2 h-full bg-white border-l border-gray-100 shadow-2xl z-10"
      />

      {/* Content */}
      <motion.div 
        animate={isLoaded ? { opacity: 0, scale: 0.95 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-20 flex flex-col items-center"
      >
        <h1 className="font-sans text-3xl font-bold uppercase tracking-[0.4em] text-luxury-black mb-6 ml-2">
          Skyline
        </h1>
        
        {/* Progress Container */}
        <div className="w-64 h-[2px] bg-gray-100 overflow-hidden relative">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-luxury-black"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="mt-3 font-sans text-[10px] font-bold tracking-widest text-gray-400">
          LOADING {Math.round(progress).toString().padStart(2, '0')}%
        </div>
      </motion.div>
    </div>
  );
};

export default Preloader;