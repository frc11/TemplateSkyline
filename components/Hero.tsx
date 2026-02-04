import React, { useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Physics for the magnetic cursor
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Heavy physics for that luxury feel
  const springConfig = { damping: 25, stiffness: 120, mass: 0.8 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    // Center the 128px (w-32) button on the cursor
    mouseX.set(e.clientX - left - 64);
    mouseY.set(e.clientY - top - 64);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full overflow-hidden bg-luxury-black cursor-none"
    >
      {/* Curtain Reveal */}
      <motion.div
        initial={{ height: "100%" }}
        animate={{ height: "0%" }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
        className="absolute bottom-0 left-0 right-0 z-30 bg-[#1a1a1a]"
      />

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <motion.img 
          initial={{ scale: 1.15, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1] }}
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop" 
          alt="The One 57 Penthouse" 
          className="w-full h-full object-cover opacity-85"
        />
        {/* Subtle gradient overlay to ensure text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      </div>

      {/* Main Text */}
      <div className="absolute bottom-12 md:bottom-20 left-12 md:left-24 z-10 pointer-events-none select-none">
        <div className="overflow-hidden">
            <motion.h1 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="font-sans text-[clamp(4rem,10vw,11rem)] font-bold text-white leading-[0.85] tracking-tighter"
            >
            THE
            </motion.h1>
        </div>
        <div className="overflow-hidden">
            <motion.h1 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.95, ease: [0.76, 0, 0.24, 1] }}
            className="font-sans text-[clamp(4rem,10vw,11rem)] font-bold text-white leading-[0.85] tracking-tighter"
            >
            ONE 57
            </motion.h1>
        </div>
      </div>

      {/* Magnetic Button */}
      <motion.button
        style={{ x: cursorX, y: cursorY }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5, ease: "easeOut" }}
        className="absolute top-0 left-0 w-32 h-32 rounded-full bg-white text-luxury-black z-20 flex items-center justify-center shadow-2xl overflow-hidden group"
      >
         <div className="relative z-10 flex flex-col items-center">
            <span className="uppercase tracking-widest text-xs font-bold group-hover:tracking-[0.3em] transition-all duration-300">Explore</span>
         </div>
         {/* Hover effect ripple */}
         <div className="absolute inset-0 bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.button>
    </section>
  );
};

export default Hero;