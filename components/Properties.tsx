import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronDown, Filter, X, Map as MapIcon, Grid as GridIcon, Navigation } from 'lucide-react';
import { Property } from '../types';

// Enhanced Mock Data with 'type' and 'coordinates'
interface PropertyData extends Property {
  type: 'Penthouse' | 'Villa' | 'Mansion' | 'Residence';
  rawPrice: number;
  coordinates: { x: number; y: number }; // Percentage from top-left
}

const PROPERTIES: PropertyData[] = [
  {
    id: '1',
    title: 'The Obsidian Penthouse',
    location: 'New York, NY',
    price: '$25,000,000',
    rawPrice: 25000000,
    type: 'Penthouse',
    image: 'https://picsum.photos/800/600?random=1',
    beds: 4,
    baths: 5.5,
    sqft: 6200,
    description: 'A monolithic expression of dark luxury overlooking Central Park.',
    coordinates: { x: 28, y: 38 } // Approx NY
  },
  {
    id: '2',
    title: 'Villa Serenity',
    location: 'Kyoto, Japan',
    price: '$18,500,000',
    rawPrice: 18500000,
    type: 'Villa',
    image: 'https://picsum.photos/800/600?random=2',
    beds: 5,
    baths: 4,
    sqft: 4500,
    description: 'Where traditional minimalism meets raw concrete brutalism.',
    coordinates: { x: 82, y: 40 } // Approx Japan
  },
  {
    id: '3',
    title: 'Azure Coast Mansion',
    location: 'Monaco',
    price: '$45,000,000',
    rawPrice: 45000000,
    type: 'Mansion',
    image: 'https://picsum.photos/800/600?random=3',
    beds: 8,
    baths: 10,
    sqft: 12000,
    description: 'Cliffside living defined by infinity edges and white marble.',
    coordinates: { x: 51, y: 36 } // Approx Europe
  },
  {
    id: '4',
    title: 'Estancia de los Vientos',
    location: 'Patagonia, Argentina',
    price: '$12,500,000',
    rawPrice: 12500000,
    type: 'Villa',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=2565&auto=format&fit=crop',
    beds: 6,
    baths: 7,
    sqft: 8500,
    description: 'A brutalist concrete refuge situated amidst the raw glacial landscapes of Patagonia.',
    coordinates: { x: 29, y: 82 } // South America (Argentina)
  }
];

const PropertyCard: React.FC<{ property: PropertyData, index: number, highlighted?: boolean }> = ({ property, index, highlighted }) => {
  return (
    <motion.div
      layout
      id={`card-${property.id}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        scale: highlighted ? 1.02 : 1,
        borderColor: highlighted ? 'rgba(26, 26, 26, 1)' : 'rgba(0,0,0,0)'
      }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      className={`group relative cursor-pointer rounded-sm transition-all duration-500 ${highlighted ? 'ring-1 ring-offset-8 ring-luxury-black shadow-xl z-20' : ''}`}
    >
      <div className="overflow-hidden mb-6 relative aspect-[4/5] bg-gray-100">
        <motion.img
          layoutId={`image-${property.id}`}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
        
        {/* Badge for Type */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1">
          <span className="text-[10px] uppercase tracking-widest font-bold text-luxury-black">
            {property.type}
          </span>
        </div>
      </div>
      
      <div className="flex justify-between items-start border-t border-gray-200 pt-6">
        <div className="space-y-2">
          <h3 className="font-sans uppercase tracking-architect text-sm font-bold text-luxury-black">
            {property.title}
          </h3>
          <p className="font-serif text-gray-500 text-sm italic">{property.location}</p>
        </div>
        <div className="text-right">
          <p className="font-sans font-medium text-sm">{property.price}</p>
          <motion.div 
            className="mt-2 inline-flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          >
            <span className="text-[10px] uppercase tracking-widest mr-2">View</span>
            <ArrowUpRight size={14} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const FilterSelect: React.FC<{ 
  label: string; 
  value: string; 
  options: string[]; 
  onChange: (val: string) => void;
}> = ({ label, value, options, onChange }) => (
  <div className="relative group">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="appearance-none bg-transparent border border-gray-200 pl-4 pr-10 py-3 w-full md:w-48 text-xs font-sans font-bold uppercase tracking-wider text-luxury-black focus:outline-none focus:border-luxury-black hover:border-gray-400 transition-colors cursor-pointer rounded-sm"
    >
      <option value="all">{label}</option>
      {options.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-luxury-black transition-colors" />
  </div>
);

const Properties: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  const [hoveredMarker, setHoveredMarker] = useState<string | null>(null);
  const [targetId, setTargetId] = useState<string | null>(null);
  
  const [filters, setFilters] = useState({
    location: 'all',
    type: 'all',
    price: 'all'
  });

  // Extract Unique Values
  const locations = useMemo(() => Array.from(new Set(PROPERTIES.map(p => p.location))), []);
  const types = useMemo(() => Array.from(new Set(PROPERTIES.map(p => p.type))), []);
  const priceRanges = [
    { label: 'Under $10M', value: 'under-10' },
    { label: '$10M - $30M', value: '10-30' },
    { label: 'Above $30M', value: 'above-30' },
  ];

  // Filtering Logic
  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter(property => {
      // Location Match
      if (filters.location !== 'all' && property.location !== filters.location) return false;
      
      // Type Match
      if (filters.type !== 'all' && property.type !== filters.type) return false;
      
      // Price Match
      if (filters.price !== 'all') {
        const price = property.rawPrice;
        if (filters.price === 'under-10' && price >= 10000000) return false;
        if (filters.price === '10-30' && (price < 10000000 || price > 30000000)) return false;
        if (filters.price === 'above-30' && price <= 30000000) return false;
      }

      return true;
    });
  }, [filters]);

  const activeFilterCount = Object.values(filters).filter(v => v !== 'all').length;

  // Scroll to targeted property when switching to grid view
  useEffect(() => {
    if (viewMode === 'grid' && targetId) {
      // Small delay to ensure layout animation has started/DOM is ready
      const timer = setTimeout(() => {
        const element = document.getElementById(`card-${targetId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Clear highlight after a few seconds
          setTimeout(() => setTargetId(null), 2500);
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [viewMode, targetId]);

  return (
    <section className="py-32 px-12 md:px-24 relative z-10" id="properties">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
         <motion.div 
           initial={{ opacity: 0, x: -20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
         >
            <h2 className="font-sans text-4xl md:text-5xl uppercase tracking-tight font-light text-luxury-black mb-4">
              Curated <br /><span className="font-serif italic text-gray-400 lowercase">residences</span>
            </h2>
         </motion.div>
         <motion.p 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-gray-500 max-w-sm text-right mt-8 md:mt-0"
         >
           A collection of homes where space, light, and materiality converge to create timeless living environments.
         </motion.p>
      </div>

      {/* Toolbar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 flex flex-col xl:flex-row gap-8 items-start xl:items-center justify-between border-y border-gray-100 py-6"
      >
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="flex items-center gap-2 mr-4 text-gray-400">
             <Filter size={14} />
             <span className="text-[10px] uppercase tracking-widest font-bold">Filter By</span>
          </div>
          <FilterSelect 
            label="Location" 
            value={filters.location} 
            options={locations} 
            onChange={(val) => setFilters(prev => ({ ...prev, location: val }))} 
          />
          <FilterSelect 
            label="Type" 
            value={filters.type} 
            options={types} 
            onChange={(val) => setFilters(prev => ({ ...prev, type: val }))} 
          />
          <div className="relative group w-full md:w-auto">
             <select
                value={filters.price}
                onChange={(e) => setFilters(prev => ({ ...prev, price: e.target.value }))}
                className="appearance-none bg-transparent border border-gray-200 pl-4 pr-10 py-3 w-full md:w-48 text-xs font-sans font-bold uppercase tracking-wider text-luxury-black focus:outline-none focus:border-luxury-black hover:border-gray-400 transition-colors cursor-pointer rounded-sm"
              >
                <option value="all">Price Range</option>
                {priceRanges.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-luxury-black transition-colors" />
          </div>
        </div>

        <div className="flex items-center justify-between w-full xl:w-auto gap-6">
            {/* View Toggle */}
            <div className="flex items-center bg-gray-50 p-1 rounded-sm border border-gray-100">
                <button
                    onClick={() => setViewMode('grid')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-sm text-[10px] uppercase tracking-widest font-bold transition-all ${
                        viewMode === 'grid' 
                        ? 'bg-white text-luxury-black shadow-sm' 
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                >
                    <GridIcon size={14} />
                    <span>List</span>
                </button>
                <button
                    onClick={() => setViewMode('map')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-sm text-[10px] uppercase tracking-widest font-bold transition-all ${
                        viewMode === 'map' 
                        ? 'bg-white text-luxury-black shadow-sm' 
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                >
                    <MapIcon size={14} />
                    <span>Map</span>
                </button>
            </div>

            {/* Clear Filters */}
            <AnimatePresence>
            {activeFilterCount > 0 && (
                <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1, filter: "blur(4px)" }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setFilters({ location: 'all', type: 'all', price: 'all' })}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 shadow-sm rounded-full group hover:border-red-200 transition-colors"
                >
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-gray-500 group-hover:text-red-500 transition-colors">
                      Clear Filters
                  </span>
                  <span className="flex items-center justify-center w-5 h-5 bg-gray-100 text-gray-600 rounded-full text-[10px] font-bold group-hover:bg-red-50 group-hover:text-red-500 transition-colors">
                      {activeFilterCount}
                  </span>
                  <X size={12} className="text-gray-400 group-hover:text-red-500 transition-colors" />
                </motion.button>
            )}
            </AnimatePresence>
        </div>
      </motion.div>

      {/* Content Area */}
      <AnimatePresence mode='wait'>
        {viewMode === 'grid' ? (
            /* Grid View */
            <motion.div 
                key="grid-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                layout
                className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24 min-h-[600px]"
            >
                <AnimatePresence mode='popLayout'>
                {filteredProperties.length > 0 ? (
                    filteredProperties.map((prop, idx) => (
                    <PropertyCard 
                        key={prop.id} 
                        property={prop} 
                        index={idx}
                        highlighted={targetId === prop.id} 
                    />
                    ))
                ) : (
                    <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="col-span-1 md:col-span-2 flex flex-col items-center justify-center py-20 text-center"
                    >
                    <p className="font-serif text-2xl text-gray-400 italic mb-4">No residences found.</p>
                    <button 
                        onClick={() => setFilters({ location: 'all', type: 'all', price: 'all' })}
                        className="text-xs font-sans font-bold uppercase tracking-widest border-b border-luxury-black pb-1 hover:text-gray-600 hover:border-gray-400 transition-colors"
                    >
                        Reset Search
                    </button>
                    </motion.div>
                )}
                </AnimatePresence>
            </motion.div>
        ) : (
            /* Map View */
            <motion.div
                key="map-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full h-[600px] bg-luxury-black relative rounded-sm overflow-hidden shadow-2xl border border-gray-800"
            >
                {/* Abstract Dark Map Background */}
                <div className="absolute inset-0 opacity-40">
                    <img 
                        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
                        alt="World Map" 
                        className="w-full h-full object-cover object-center grayscale mix-blend-screen"
                    />
                    <div className="absolute inset-0 bg-luxury-black/60 mix-blend-multiply" />
                    {/* Grid Overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
                </div>

                {/* Map Interface Elements */}
                <div className="absolute top-8 left-8 text-white/50 font-sans text-[10px] uppercase tracking-widest flex items-center gap-2">
                    <Navigation size={12} className="animate-pulse" />
                    Global View Active
                </div>

                {/* Markers */}
                {filteredProperties.map((prop) => (
                    <div
                        key={prop.id}
                        className="absolute cursor-pointer group"
                        style={{ left: `${prop.coordinates.x}%`, top: `${prop.coordinates.y}%` }}
                        onClick={() => setActiveMarker(activeMarker === prop.id ? null : prop.id)}
                        onMouseEnter={() => setHoveredMarker(prop.id)}
                        onMouseLeave={() => setHoveredMarker(null)}
                    >
                        {/* Pulse Effect */}
                        <motion.div
                            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute -inset-4 bg-white rounded-full blur-sm"
                        />
                        {/* Dot */}
                        <motion.div 
                            whileHover={{ scale: 1.5 }}
                            animate={{ scale: activeMarker === prop.id ? 1.5 : 1 }}
                            className={`w-3 h-3 rounded-full border border-luxury-black relative z-10 ${activeMarker === prop.id ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'bg-gray-300'}`}
                        />

                        {/* Hover Tooltip - Display only if hovered and not actively selected */}
                        <AnimatePresence>
                          {hoveredMarker === prop.id && activeMarker !== prop.id && (
                            <motion.div
                              initial={{ opacity: 0, y: 5, scale: 0.95 }}
                              animate={{ opacity: 1, y: -10, scale: 1 }}
                              exit={{ opacity: 0, y: 5, scale: 0.95 }}
                              transition={{ duration: 0.2, ease: "easeOut" }}
                              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[150px] bg-white p-3 rounded-sm shadow-2xl pointer-events-none z-40"
                            >
                                <p className="font-sans text-[8px] font-bold uppercase tracking-widest text-gray-400 mb-1 line-clamp-1">{prop.title}</p>
                                <p className="font-serif text-sm text-luxury-black">{prop.price}</p>
                                {/* Triangle Arrow */}
                                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45" />
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Preview Card */}
                        <AnimatePresence>
                            {activeMarker === prop.id && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute left-1/2 -translate-x-1/2 mt-6 w-64 bg-white/95 backdrop-blur-md p-3 rounded-sm shadow-2xl z-50 origin-top"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="relative aspect-[4/3] mb-3 overflow-hidden rounded-sm">
                                        <img src={prop.image} alt={prop.title} className="w-full h-full object-cover" />
                                        <div className="absolute top-2 left-2 bg-luxury-black/80 text-white px-2 py-0.5 text-[8px] uppercase tracking-widest font-bold">
                                            {prop.type}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-luxury-black mb-1">{prop.title}</h4>
                                        <div className="flex justify-between items-center mb-3">
                                            <p className="font-serif text-xs text-gray-500 italic">{prop.location}</p>
                                            <p className="font-sans text-xs font-bold">{prop.price}</p>
                                        </div>
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setViewMode('grid');
                                                setTargetId(prop.id);
                                            }}
                                            className="w-full bg-luxury-black text-white py-2 text-[10px] uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <span>View Property</span>
                                            <ArrowUpRight size={10} />
                                        </button>
                                    </div>
                                    {/* Arrow */}
                                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white/95 rotate-45" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}

                {filteredProperties.length === 0 && (
                     <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black/50 backdrop-blur-sm p-6 border border-white/10 text-center">
                            <p className="text-white font-serif italic">No properties in this region.</p>
                        </div>
                     </div>
                )}
            </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Properties;