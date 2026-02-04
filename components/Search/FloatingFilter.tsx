import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

interface FilterOptionProps {
  label: string;
  value: string;
  hasBorder?: boolean;
}

const FilterOption: React.FC<FilterOptionProps> = ({ label, value, hasBorder = true }) => (
  <div className={`relative flex-1 p-8 cursor-pointer group transition-colors duration-300 hover:bg-gray-50 ${hasBorder ? 'border-b md:border-b-0 md:border-r border-gray-100' : ''}`}>
    <div className="flex justify-between items-start">
      <div>
        <span className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2 font-sans font-semibold group-hover:text-luxury-black transition-colors">
          {label}
        </span>
        <span className="font-serif text-xl md:text-2xl text-luxury-black block">
          {value}
        </span>
      </div>
      <ChevronDown size={14} className="text-gray-300 group-hover:text-luxury-black transition-colors mt-1" />
    </div>
  </div>
);

interface FloatingFilterProps {
  onSearch?: () => void;
}

const FloatingFilter: React.FC<FloatingFilterProps> = ({ onSearch }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="relative z-40 -mt-20 mx-6 md:mx-24"
    >
      <div className="bg-white shadow-2xl flex flex-col md:flex-row items-stretch">
        <FilterOption label="Location" value="New York, NY" />
        <FilterOption label="Property Type" value="Penthouse" />
        <FilterOption label="Price Range" value="Any Price" hasBorder={false} />

        <button
          onClick={onSearch}
          className="bg-luxury-black text-white px-10 py-8 hover:bg-gray-800 transition-all duration-300 flex items-center justify-center group md:w-auto w-full"
        >
          <motion.div
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <ArrowRight size={24} strokeWidth={1} />
          </motion.div>
        </button>
      </div>
    </motion.div>
  );
};

export default FloatingFilter;