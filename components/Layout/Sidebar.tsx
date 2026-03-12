import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Mail, ArrowRight, Home, Users, BookOpen, MapPin, Phone, MessageCircle, Instagram, Linkedin, Facebook, Share2 } from 'lucide-react';
import { useModal } from '../../context/ModalContext';

import { Link, useSearchParams, useLocation } from 'react-router-dom';

interface SubItem {
  label: string;
  path: string;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  subItems: SubItem[];
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'properties',
    label: 'Properties',
    icon: <Home size={20} strokeWidth={1.5} />,
    subItems: [
      { label: 'Buy', path: '/?mode=sale' },
      { label: 'Rent', path: '/?mode=rent' },
      { label: 'New Developments', path: '/?collection=new-developments' },
      { label: 'Penthouse Collection', path: '/?collection=penthouses' }
    ]
  },
  {
    id: 'agency',
    label: 'The Agency',
    icon: <Users size={20} strokeWidth={1.5} />,
    subItems: []
  },
  {
    id: 'journal',
    label: 'Journal',
    icon: <BookOpen size={20} strokeWidth={1.5} />,
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
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { openModal } = useModal();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  // Auto-set the active menu based on current location/params
  React.useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === '/agents') {
      setActiveMenu('agency');
    } else if (currentPath === '/journal') {
      setActiveMenu('journal');
    } else if (currentPath === '/' && (searchParams.get('mode') || searchParams.get('collection'))) {
      setActiveMenu('properties');
    }
  }, [location.pathname, searchParams]);

  // Check if a sub-item is currently active
  const isSubItemActive = (path: string): boolean => {
    // Check for agent sections specifically first to avoid broad matching
    if (location.pathname === '/agents') {
      const currentSection = searchParams.get('section');
      
      // If no section in URL, only "Find an Agent" (path === '/agents') is active
      if (!currentSection) {
        return path === '/agents';
      }
      
      // If there is a section, match against path with that section query
      if (path.includes('?section=')) {
        const pathParams = new URLSearchParams(path.split('?')[1]);
        const pathSection = pathParams.get('section');
        return currentSection === pathSection;
      }
      
      return false;
    }

    if (location.pathname !== '/' && path.startsWith(location.pathname)) {
      // For other pages, check if categories or sections match if present
      const pathParts = path.split('?');
      if (pathParts.length > 1) {
        const pathParams = new URLSearchParams(pathParts[1]);
        for (const [key, value] of pathParams.entries()) {
          if (searchParams.get(key) === value) return true;
        }
        return false;
      }
      
      // If path has no params but current URL does, it's not a match (too broad)
      if (searchParams.toString() !== '') return false;
      
      return true;
    }

    // Check query params for home page
    if (location.pathname === '/' && path.startsWith('/?')) {
      const params = new URLSearchParams(path.split('?')[1]);
      const currentMode = searchParams.get('mode');
      const currentCollection = searchParams.get('collection');
      const pathMode = params.get('mode');
      const pathCollection = params.get('collection');

      if (pathCollection && currentCollection === pathCollection) return true;
      if (pathMode && currentMode === pathMode) return true;
      
      // If it's the home page with no params, and the path is just '/', it would match, 
      // but here we only handle paths starting with '/?'
    }

    return false;
  };

  const handleMouseEnter = (id: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    const item = MENU_ITEMS.find(m => m.id === id);
    if (item && item.subItems.length > 0) {
      setActiveMenu(id);
    } else {
      setActiveMenu(null);
    }
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 400); // 400ms delay to allow moving perfectly diagonally
  };

  return (
    <aside
      className="group/sidebar peer/sidebar fixed left-0 top-0 h-screen w-16 hover:w-72 bg-white/95 backdrop-blur-md border-r border-gray-100 z-50 flex flex-col justify-between items-start py-8 font-sans transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] shadow-[4px_0_24px_rgba(0,0,0,0.02)]"
      onMouseLeave={() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setActiveMenu(null);
      }}
    >
      {/* Logo */}
      <Link to="/" onClick={() => window.scrollTo(0, 0)} className="flex items-center px-4 w-full cursor-pointer group/logo">
        <div className="w-8 flex justify-center shrink-0">
          <Building2 strokeWidth={1} size={24} className="text-luxury-black group-hover/logo:opacity-50 transition-opacity" />
        </div>
        <span className="ml-4 font-serif text-lg tracking-widest text-luxury-black opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300 whitespace-nowrap overflow-hidden">
          SKYLINE
        </span>
      </Link>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 w-full mt-24 flex-1 justify-start">
        {MENU_ITEMS.map((item) => (
          <div
            key={item.id}
            className="flex flex-col w-full relative z-10"
            onMouseEnter={() => handleMouseEnter(item.id)}
          >
            {/* The Icon & Text */}
            <Link 
              to={item.id === 'agency' ? '/agents' : '#'}
              className={`flex items-center w-full px-4 cursor-pointer group/navitem py-3 transition-colors hover:bg-gray-50/80 rounded-r-full mr-2 ${
                (item.id === 'agency' && location.pathname === '/agents') || item.subItems.some(sub => isSubItemActive(sub.path)) ? 'text-luxury-black' : 'text-gray-400'
              }`}
            >
              <div className={`w-8 h-8 flex justify-center items-center shrink-0 transition-colors duration-300 ${
                item.subItems.some(sub => isSubItemActive(sub.path)) ? 'text-luxury-black' : 'text-gray-400 group-hover/navitem:text-luxury-black'
              }`}>
                {item.icon}
              </div>

              {/* The Text - Only visible when aside is hovered */}
              <span className={`ml-4 font-sans text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 whitespace-nowrap opacity-0 group-hover/sidebar:opacity-100 overflow-hidden w-0 group-hover/sidebar:w-auto mt-[2px] ${
                item.subItems.some(sub => isSubItemActive(sub.path)) ? 'text-luxury-black' : 'text-gray-400 group-hover/navitem:text-luxury-black'
              }`}>
                {item.label}
              </span>
            </Link>

            {/* Hover Submenu / Accordion State */}
            <AnimatePresence>
              {activeMenu === item.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden w-full"
                >
                  <ul className="pl-16 pr-4 pb-4 pt-1 space-y-4 opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    {item.subItems.map((sub, idx) => (
                      <li key={sub.label}>
                        <Link
                          to={sub.path}
                          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                          className={`font-serif text-[13px] cursor-pointer flex items-center group/item transition-all duration-300 origin-left hover:translate-x-1 ${isSubItemActive(sub.path)
                            ? 'text-luxury-black font-semibold'
                            : 'text-gray-400 hover:text-luxury-black'
                            }`}
                        >
                          <span className={`overflow-hidden transition-all duration-300 flex items-center ${isSubItemActive(sub.path) ? 'w-4 opacity-100' : 'w-0 opacity-0 group-hover/item:w-4 group-hover/item:opacity-100'}`}>
                            <ArrowRight size={12} className="mr-2 shrink-0" />
                          </span>
                          {sub.label}
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

      {/* Bottom Contact Info */}
      <div className="flex flex-col w-full mt-auto mb-4 border-t border-gray-100 pt-4">

        {/* WhatsApp */}
        <a
          href="https://wa.me/5493814154708?text=Hello%2C%20I%20am%20interested%20in%20a%20property%20from%20Skyline%20Estates."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center w-full px-4 cursor-pointer group/contactitem py-3 transition-colors hover:bg-gray-50/80 rounded-r-full mr-2"
        >
          <div className="w-8 h-8 flex justify-center items-center shrink-0 text-gray-400 group-hover/contactitem:text-green-500 transition-colors duration-300">
            <MessageCircle size={18} strokeWidth={1.5} />
          </div>
          <span className="ml-4 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 group-hover/contactitem:text-green-500 transition-colors duration-300 whitespace-nowrap opacity-0 group-hover/sidebar:opacity-100 overflow-hidden w-0 group-hover/sidebar:w-auto mt-[2px]">
            WhatsApp
          </span>
        </a>

        {/* Phone */}
        <a href="tel:+543814154708" className="flex items-center w-full px-4 cursor-pointer group/contactitem py-3 transition-colors hover:bg-gray-50/80 rounded-r-full mr-2">
          <div className="w-8 h-8 flex justify-center items-center shrink-0 text-gray-400 group-hover/contactitem:text-luxury-black transition-colors duration-300">
            <Phone size={18} strokeWidth={1.5} />
          </div>
          <span className="ml-4 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 group-hover/contactitem:text-luxury-black transition-colors duration-300 whitespace-nowrap opacity-0 group-hover/sidebar:opacity-100 overflow-hidden w-0 group-hover/sidebar:w-auto mt-[2px]">
            +54 381 415-4708
          </span>
        </a>

        {/* Location */}
        <a
          href="https://maps.google.com/?q=San+Miguel+de+Tucuman"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center w-full px-4 cursor-pointer group/contactitem py-3 transition-colors hover:bg-gray-50/80 rounded-r-full mr-2"
        >
          <div className="w-8 h-8 flex justify-center items-center shrink-0 text-gray-400 group-hover/contactitem:text-luxury-black transition-colors duration-300">
            <MapPin size={18} strokeWidth={1.5} />
          </div>
          <span className="ml-4 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 group-hover/contactitem:text-luxury-black transition-colors duration-300 whitespace-nowrap opacity-0 group-hover/sidebar:opacity-100 overflow-hidden w-0 group-hover/sidebar:w-auto mt-[2px]">
            Tucumán, ARG
          </span>
        </a>

        {/* Socials */}
        <div className="flex items-center w-full px-4 group/contactitem py-3 transition-colors hover:bg-gray-50/80 rounded-r-full mr-2">
          <div className="w-8 h-8 flex justify-center items-center shrink-0 text-gray-400 group-hover/contactitem:text-luxury-black transition-colors duration-300">
            <Share2 size={18} strokeWidth={1.5} />
          </div>
          <div className="ml-4 flex items-center gap-6 opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300 overflow-hidden w-0 group-hover/sidebar:w-auto pl-1">
            <a href="#" className="text-gray-400 hover:text-luxury-black hover:scale-110 transition-all duration-300"><Instagram size={16} /></a>
            <a href="#" className="text-gray-400 hover:text-luxury-black hover:scale-110 transition-all duration-300"><Linkedin size={16} /></a>
            <a href="#" className="text-gray-400 hover:text-luxury-black hover:scale-110 transition-all duration-300"><Facebook size={16} /></a>
          </div>
        </div>

        {/* Contact Action */}
        <div
          onClick={() => openModal('inquiry')}
          className="flex items-center w-full px-4 cursor-pointer group/contactitem py-3 transition-colors hover:bg-gray-50/80 mt-2 border-t border-gray-50 pt-3"
        >
          <div className="w-8 h-8 flex justify-center items-center shrink-0 text-gray-400 group-hover/contactitem:text-luxury-black transition-colors duration-300">
            <Mail size={18} strokeWidth={1.5} />
          </div>
          <span className="ml-4 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 group-hover/contactitem:text-luxury-black transition-colors duration-300 whitespace-nowrap opacity-0 group-hover/sidebar:opacity-100 overflow-hidden w-0 group-hover/sidebar:w-auto mt-[2px]">
            Contact
          </span>
        </div>

      </div>
    </aside>
  );
};

export default Sidebar;