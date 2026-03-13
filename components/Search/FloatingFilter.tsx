import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { PROPERTIES } from '../../data/properties';

interface FilterOptionProps {
  label: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
  isLast?: boolean;
}

interface FilterOptionProps {
  label: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
  isLast?: boolean;
}

const FilterOption: React.FC<FilterOptionProps> = ({ label, value, options, onChange, isLast }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Handle clicking outside to close
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const anyLabel = value === 'all' ? `Cualquier ${label.split(' ')[0]}` : value;

  return (
    <div
      ref={dropdownRef}
      className={`relative flex-1 p-6 md:p-8 cursor-pointer group transition-colors duration-300 hover:bg-gray-50 ${!isLast ? 'border-b md:border-b-0 md:border-r border-gray-100' : ''}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex justify-between items-start">
        <div className="w-full">
          <span className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2 font-sans font-semibold group-hover:text-luxury-black transition-colors">
            {label}
          </span>
          <span className="font-serif text-xl md:text-2xl text-luxury-black block">
            {anyLabel}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="mt-2 shrink-0 pointer-events-none absolute right-6 md:right-8 top-1/2"
        >
          <ChevronDown size={14} className="text-gray-300 group-hover:text-luxury-black transition-colors" />
        </motion.div>
      </div>

      {/* Custom Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-[100%] left-0 w-full min-w-[200px] bg-white border border-gray-100 shadow-2xl z-50 py-2 mb-2"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                onChange('all');
                setIsOpen(false);
              }}
              className={`w-full text-left px-6 py-3 font-serif text-base hover:bg-gray-50 transition-colors ${value === 'all' ? 'text-luxury-black bg-gray-50/50' : 'text-gray-500'}`}
            >
              Cualquier {label.split(' ')[0]}
            </button>
            {options.map((opt) => (
              <button
                key={opt}
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(opt);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-6 py-3 font-serif text-base hover:bg-gray-50 transition-colors ${value === opt ? 'text-luxury-black bg-gray-50/50' : 'text-gray-500'}`}
              >
                {opt}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface FloatingFilterProps {
  onSearch?: (filters: { location: string; type: string; price: string; intent?: string }) => void;
}

const FloatingFilter: React.FC<FloatingFilterProps> = ({ onSearch }) => {
  const [filters, setFilters] = React.useState({
    location: 'all',
    type: 'all',
    price: 'all'
  });

  // Derive exact options from real property data — always in sync with Properties.tsx
  const locations = Array.from(new Set(PROPERTIES.map(p => p.location)));
  // 'Penthouse' is its own section — excluded from the Type dropdown
  const types = (Array.from(new Set(PROPERTIES.map(p => p.type))) as string[]).filter(t => t !== 'Penthouse');
  const priceRanges = [
    { label: 'Menos de $10M', value: 'under-10' },
    { label: '$10M – $30M', value: '10-30' },
    { label: 'Más de $30M', value: 'above-30' },
  ];
  const priceLabels = priceRanges.map(p => p.label);
  // Map label ↔ value for URL param encoding
  const priceLabelToValue = Object.fromEntries(priceRanges.map(p => [p.label, p.value]));
  const priceValueToLabel = Object.fromEntries(priceRanges.map(p => [p.value, p.label]));

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="absolute bottom-0 left-0 right-0 mx-auto z-40 w-[88.5%]"
    >
      <div className="bg-white shadow-2xl flex flex-col md:flex-row items-stretch border-t border-gray-100">
        <FilterOption
          label="Ubicación"
          value={filters.location}
          options={locations}
          onChange={(val) => setFilters(prev => ({ ...prev, location: val }))}
        />
        <FilterOption
          label="Tipo de Inmueble"
          value={filters.type}
          options={types}
          onChange={(val) => setFilters(prev => ({ ...prev, type: val }))}
        />
        <FilterOption
          label="Precio"
          value={filters.price}
          options={priceLabels}
          onChange={(val) => setFilters(prev => ({ ...prev, price: val }))}
          isLast={true}
        />

        {/* Intent-based submit - reveals 3 mode options on hover */}
        <div className="relative group/submit flex items-stretch overflow-hidden bg-luxury-black w-full md:w-48 lg:w-56 shrink-0 mt-[-1px]">

          {/* Default Arrow State - exits left on hover */}
          <div className="absolute inset-0 flex items-center justify-center group-hover/submit:translate-x-[-110%] group-hover/submit:opacity-0 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] pointer-events-none">
            <ArrowRight size={24} strokeWidth={1} className="text-white" />
          </div>

          {/* Revealed Options - slide in from right on hover */}
          <div className="flex flex-col w-full translate-x-full opacity-0 group-hover/submit:translate-x-0 group-hover/submit:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]">
            {([
              { label: 'Comprar', intent: 'sale' },
              { label: 'Alquilar', intent: 'rent' },
              { label: 'Nuevos Des.', intent: 'new-developments' },
            ] as { label: string; intent: string }[]).map(({ label, intent }) => (
              <button
                key={label}
                onClick={() => onSearch && onSearch({
                  ...filters,
                  price: priceLabelToValue[filters.price] || filters.price,
                  intent
                })}
                className="flex-1 flex items-center justify-between px-5 text-white border-b border-white/10 last:border-b-0 hover:bg-white/10 transition-colors duration-200 group/opt"
              >
                <span className="font-sans text-[10px] uppercase tracking-widest font-bold">{label}</span>
                <ArrowRight size={11} strokeWidth={1.5} className="opacity-40 group-hover/opt:opacity-100 group-hover/opt:translate-x-0.5 transition-all duration-200" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FloatingFilter;