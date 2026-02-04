import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { Compass, Maximize2 } from 'lucide-react';

const PanoramaViewer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState(0);
  
  // Motion values for physics
  const mouseX = useMotionValue(0);
  
  // Smooth out the mouse movement for a "heavy" camera feel
  const smoothX = useSpring(mouseX, { damping: 40, stiffness: 90, mass: 1 });

  // Update window width for calculations
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX } = e;
    // Update raw mouse value
    mouseX.set(clientX);
  };

  // CALCULATIONS
  // Assuming the image is significantly wider than the viewport (e.g., 160% width)
  // We map the mouse position (0 to windowWidth) to the translation range (0 to -60% of windowWidth)
  const imageTranslateX = useTransform(
    smoothX, 
    [0, windowWidth], 
    ["0%", "-25%"] // Moves the image to reveal the right side
  );

  // The compass bar moves in the opposite direction to simulate rotation
  const compassTranslateX = useTransform(
    smoothX,
    [0, windowWidth],
    ["-10%", "10%"] 
  );

  return (
    <section className="relative w-full py-0 border-t border-gray-200 bg-white">
      {/* Header Info */}
      <div className="absolute top-8 left-6 md:left-24 z-20 pointer-events-none mix-blend-difference text-white">
        <div className="flex items-center gap-3">
           <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
           <span className="font-sans text-[10px] font-bold uppercase tracking-widest">Live Horizon View</span>
        </div>
        <h2 className="font-serif text-3xl mt-2">The Pinnacle</h2>
      </div>

      <div className="absolute top-8 right-6 md:right-24 z-20 pointer-events-none mix-blend-difference text-white text-right hidden md:block">
        <span className="font-sans text-[10px] font-bold uppercase tracking-widest block mb-1">Elevation</span>
        <span className="font-serif text-xl">1,450 ft</span>
      </div>

      {/* The Viewer Window */}
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative h-[600px] w-full overflow-hidden cursor-ew-resize group bg-gray-900"
      >
        {/* The Panoramic Image */}
        {/* We force the width to be wider than 100% so we have room to pan */}
        <motion.div 
          style={{ x: imageTranslateX }}
          className="absolute top-0 left-0 h-full min-w-[140vw] md:min-w-[125vw]" 
        >
          <img 
            src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=3213&auto=format&fit=crop" 
            alt="New York Skyline Panorama" 
            className="w-full h-full object-cover opacity-90"
          />
          {/* Vignette Overlay for atmosphere */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30 pointer-events-none" />
        </motion.div>

        {/* Center Reticle / Cursor Helper */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
             <div className="w-[1px] h-full bg-white/20" />
             <div className="absolute w-24 h-24 border border-white/30 rounded-full flex items-center justify-center backdrop-blur-[2px]">
                <Maximize2 size={12} className="text-white/80" />
             </div>
        </div>

        {/* Bottom Compass Strip */}
        <div className="absolute bottom-0 left-0 right-0 h-16 border-t border-white/10 bg-black/20 backdrop-blur-md flex items-center justify-center overflow-hidden">
             <motion.div 
                style={{ x: compassTranslateX }}
                className="flex items-center gap-24 text-white/50 select-none font-sans text-xs font-medium"
             >
                <span>NW</span>
                <span>|</span>
                <span>330°</span>
                <span>|</span>
                <span className="text-white font-bold text-sm flex items-center gap-2"><Compass size={14} /> NORTH</span>
                <span>|</span>
                <span>30°</span>
                <span>|</span>
                <span>NE</span>
                <span>|</span>
                <span>60°</span>
                <span>|</span>
                <span>EAST</span>
             </motion.div>
             
             {/* Center Marker for Compass */}
             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-4 w-[1px] bg-red-500 z-10" />
        </div>
      </div>
    </section>
  );
};

export default PanoramaViewer;