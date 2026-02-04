import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Phone, Calendar, ArrowRight } from 'lucide-react';

const AgentCard: React.FC = () => {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Show after scrolling past the hero section (approx 500px)
    if (latest > 500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="fixed bottom-8 right-8 z-40 hidden md:flex items-center gap-6 p-4 bg-luxury-black text-white shadow-2xl rounded-sm border border-gray-800"
        >
          {/* Agent Profile */}
          <div className="flex items-center gap-4 border-r border-gray-700 pr-6">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop" 
                alt="Elena Fisher" 
                className="w-12 h-12 rounded-full object-cover border border-gray-600"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-luxury-black"></div>
            </div>
            <div>
              <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-white">Elena Fisher</h4>
              <p className="font-serif text-xs text-gray-400 italic">Senior Broker</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-3 rounded-sm hover:bg-white/10 transition-colors text-xs font-sans font-medium uppercase tracking-wider text-gray-300 hover:text-white">
              <Phone size={14} />
              <span>WhatsApp</span>
            </button>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 bg-white text-luxury-black rounded-sm text-xs font-sans font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors"
            >
              <span>Schedule Viewing</span>
              <ArrowRight size={14} />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AgentCard;