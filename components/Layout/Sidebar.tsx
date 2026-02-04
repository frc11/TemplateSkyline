import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Search, ArrowRight } from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
  subItems: string[];
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'properties',
    label: 'Properties',
    subItems: ['Buy', 'Rent', 'New Developments', 'Penthouse Collection']
  },
  {
    id: 'agents',
    label: 'Agents',
    subItems: ['Find an Agent', 'Careers', 'Global Offices']
  },
  {
    id: 'journal',
    label: 'Journal',
    subItems: ['Architecture', 'Interior Design', 'Market Reports', 'Events']
  }
];

const Sidebar: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <aside className="fixed left-0 top-0 h-screen w-20 bg-white border-r border-gray-100 z-50 flex flex-col justify-between items-center py-12 font-sans">
      {/* Logo */}
      <div className="text-luxury-black hover:opacity-50 transition-opacity cursor-pointer">
        <Building2 strokeWidth={1} size={28} />
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-16 items-center justify-center flex-1">
        {MENU_ITEMS.map((item) => (
          <div 
            key={item.id}
            className="relative group flex items-center justify-center w-full"
            onMouseEnter={() => setActiveMenu(item.id)}
            onMouseLeave={() => setActiveMenu(null)}
          >
            {/* Vertical Text (Default State) */}
            <div className="h-24 w-8 flex items-center justify-center cursor-pointer">
               <span 
                 className="block -rotate-90 whitespace-nowrap text-xs font-bold uppercase tracking-architect text-gray-400 group-hover:text-luxury-black transition-colors duration-300"
                 style={{ writingMode: 'vertical-rl' }}
               >
                 {item.label}
               </span>
            </div>

            {/* Hover Submenu / Horizontal State */}
            <AnimatePresence>
              {activeMenu === item.id && (
                <motion.div
                  initial={{ opacity: 0, x: -10, scale: 0.95 }}
                  animate={{ opacity: 1, x: 5, scale: 1 }}
                  exit={{ opacity: 0, x: -10, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="absolute left-full top-1/2 -translate-y-1/2 ml-4 w-64 bg-white shadow-2xl border border-gray-100 p-8 cursor-default"
                >
                  <motion.h3 
                    layoutId={`title-${item.id}`}
                    className="font-sans text-xl font-light uppercase tracking-widest text-luxury-black mb-6 border-b border-gray-100 pb-4"
                  >
                    {item.label}
                  </motion.h3>
                  
                  <ul className="space-y-4">
                    {item.subItems.map((sub, idx) => (
                      <motion.li
                        key={sub}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + idx * 0.05 }}
                        className="font-serif text-sm text-gray-500 hover:text-luxury-black cursor-pointer flex items-center group/item transition-colors"
                      >
                        <span className="w-0 group-hover/item:w-4 overflow-hidden transition-all duration-300">
                          <ArrowRight size={12} className="mr-2" />
                        </span>
                        {sub}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </nav>

      {/* Bottom Search */}
      <button className="w-12 h-12 flex items-center justify-center text-luxury-black hover:bg-gray-50 rounded-full transition-colors">
        <Search strokeWidth={1} size={24} />
      </button>
    </aside>
  );
};

export default Sidebar;