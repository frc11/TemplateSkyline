import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

interface Hotspot {
  id: string;
  x: number; // Percentage
  y: number; // Percentage
  title: string;
  material: string;
  detailImage: string;
  description: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'fireplace',
    x: 35,
    y: 55,
    title: 'Focus Element',
    material: 'Arabescato Corchia Marble',
    detailImage: 'https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?q=80&w=400&auto=format&fit=crop',
    description: 'Imported from the quarries of Carrara, defined by its ovular breccias.'
  },
  {
    id: 'view',
    x: 65,
    y: 30,
    title: 'Glazing',
    material: 'Low-Iron Starphire Glass',
    detailImage: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?q=80&w=200&auto=format&fit=crop',
    description: 'Floor-to-ceiling ultra-clear glazing providing unobstructed UV protection.'
  },
  {
    id: 'floor',
    x: 50,
    y: 80,
    title: 'Flooring',
    material: 'White Oak Herringbone',
    detailImage: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=200&auto=format&fit=crop',
    description: 'Hand-scraped French white oak finished with a matte oil seal.'
  }
];

const InteractiveDetail: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section className="py-32 px-6 md:px-24 border-t border-gray-100 relative z-20 bg-white">
       {/* Section Header */}
       <div className="mb-16 max-w-2xl">
        <h2 className="font-sans text-xs font-bold uppercase tracking-architect text-gray-400 mb-4">
          Materiality
        </h2>
        <p className="font-serif text-3xl md:text-4xl text-luxury-black">
          Uncompromising attention to detail. Hover over the space to explore the finishings.
        </p>
      </div>

      {/* Interactive Container */}
      <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-gray-100 rounded-sm cursor-crosshair">
        
        {/* Main Background Image */}
        <motion.div 
          className="absolute inset-0 w-full h-full"
          animate={{ 
            filter: activeId ? "blur(4px) brightness(0.9)" : "blur(0px) brightness(1)",
            scale: activeId ? 1.02 : 1
          }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <img 
            src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2400&auto=format&fit=crop" 
            alt="Luxury Living Room" 
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Hotspots Layer */}
        {HOTSPOTS.map((spot) => (
          <div
            key={spot.id}
            className="absolute z-10"
            style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
            onMouseEnter={() => setActiveId(spot.id)}
            onMouseLeave={() => setActiveId(null)}
          >
            {/* The Dot */}
            <div className="relative -translate-x-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center cursor-pointer group">
              {/* Pulse Ring */}
              <motion.div
                animate={{ 
                  scale: [1, 1.8, 1],
                  opacity: [0.5, 0, 0.5]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute inset-0 rounded-full border border-white"
              />
              
              {/* Center Core */}
              <motion.div 
                animate={{ scale: activeId === spot.id ? 1.2 : 1 }}
                className="w-3 h-3 bg-white rounded-full shadow-lg relative z-20 flex items-center justify-center"
              >
                 <AnimatePresence>
                    {activeId === spot.id && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                        >
                           <Plus size={8} className="text-black" />
                        </motion.div>
                    )}
                 </AnimatePresence>
              </motion.div>
            </div>

            {/* The Tooltip Card */}
            <AnimatePresence>
              {activeId === spot.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="absolute left-6 bottom-6 w-64 bg-white p-4 shadow-2xl border border-gray-100 z-30 pointer-events-none"
                >
                  <div className="flex gap-4 mb-4">
                    <img 
                        src={spot.detailImage} 
                        alt={spot.material} 
                        className="w-12 h-12 object-cover rounded-sm border border-gray-100"
                    />
                    <div>
                        <h4 className="font-sans text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                            {spot.title}
                        </h4>
                        <p className="font-serif text-sm font-medium text-luxury-black leading-tight">
                            {spot.material}
                        </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 font-sans leading-relaxed border-t border-gray-100 pt-3">
                    {spot.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InteractiveDetail;