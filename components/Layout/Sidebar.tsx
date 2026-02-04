import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Search, ArrowRight } from 'lucide-react';
import { useModal } from '../../context/ModalContext';

import { Link, useSearchParams, useLocation } from 'react-router-dom';

interface SubItem {
  label: string;
  path: string;
}

interface MenuItem {
  id: string;
  label: string;
  subItems: SubItem[];
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'properties',
    label: 'Properties',
    subItems: [
      { label: 'Buy', path: '/?mode=sale' },
      { label: 'Rent', path: '/?mode=rent' },
      { label: 'New Developments', path: '/?collection=new-developments' },
      { label: 'Penthouse Collection', path: '/?collection=penthouses' }
    ]
  },
  {
    id: 'agents',
    label: 'Agents',
    subItems: [
      { label: 'Find an Agent', path: '/agents' },
      { label: 'Careers', path: '/agents' }, // Placeholder
      { label: 'Global Offices', path: '/agents' } // Placeholder
    ]
  },
  {
    id: 'journal',
    label: 'Journal',
    subItems: [
      { label: 'Architecture', path: '/journal?cat=Architecture' },
      { label: 'Interior Design', path: '/journal?cat=Interior Design' },
      { label: 'Market Reports', path: '/journal?cat=Market Report' },
      { label: 'Events', path: '/journal?cat=Event' }
    ]
  }
];

const Sidebar: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const { openModal } = useModal();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  // Check if a sub-item is currently active
  const isSubItemActive = (path: string): boolean => {
    if (location.pathname !== '/' && path.startsWith(location.pathname)) {
      return true;
    }

    // Check query params for home page
    if (location.pathname === '/' && path.startsWith('/?')) {
      const params = new URLSearchParams(path.split('?')[1]);
      const currentMode = searchParams.get('mode');
      const currentCollection = searchParams.get('collection');
      const pathMode = params.get('mode');
      const pathCollection = params.get('collection');

      if (currentCollection && pathCollection === currentCollection) return true;
      if (currentMode && pathMode === currentMode) return true;
    }

    // Check for journal categories
    if (location.pathname === '/journal' && path.startsWith('/journal')) {
      const params = new URLSearchParams(path.split('?')[1]);
      const currentCat = searchParams.get('cat');
      const pathCat = params.get('cat');
      if (currentCat && pathCat === currentCat) return true;
    }

    return false;
  };

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
                      <li key={sub.label}>
                        <Link
                          to={sub.path}
                          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                          className={`font-serif text-sm cursor-pointer flex items-center group/item transition-colors ${isSubItemActive(sub.path)
                            ? 'text-luxury-black font-semibold'
                            : 'text-gray-500 hover:text-luxury-black'
                            }`}
                        >
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + idx * 0.05 }}
                            className="flex items-center w-full"
                          >
                            <span className={`overflow-hidden transition-all duration-300 ${isSubItemActive(sub.path) ? 'w-4' : 'w-0 group-hover/item:w-4'
                              }`}>
                              <ArrowRight size={12} className="mr-2" />
                            </span>
                            {sub.label}
                          </motion.span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </nav>

      {/* Bottom Search */}
      <button
        onClick={openModal}
        className="w-12 h-12 flex items-center justify-center text-luxury-black hover:bg-gray-50 rounded-full transition-colors"
      >
        <Search strokeWidth={1} size={24} />
      </button>
    </aside>
  );
};

export default Sidebar;