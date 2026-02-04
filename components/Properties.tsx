import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowUpRight, ChevronDown, Filter, X, Map as MapIcon, Grid as GridIcon, Navigation } from 'lucide-react';
import { PROPERTIES, PropertyData } from '../data/properties';
import PropertyMap from './Search/PropertyMap';



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
      <Link to={`/property/${property.id}`} className="block h-full">
        <div className="overflow-hidden mb-6 relative aspect-[4/5] bg-gray-100">
          <motion.img
            layoutId={`image-${property.id}`}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            src={property.image}
            alt={property.title}
            loading="lazy"
            className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

          {/* Badge for Type */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1">
            <span className="text-[10px] uppercase tracking-widest font-bold text-luxury-black">
              {property.type}
            </span>
          </div>

          {/* Status Badge (FOR RENT / FOR SALE) */}
          <div className={`absolute top-4 right-4 px-3 py-1 ${property.status === 'rent'
            ? 'bg-luxury-black text-white'
            : 'bg-white/90 backdrop-blur-sm text-luxury-black'
            }`}>
            <span className="text-[10px] uppercase tracking-widest font-bold">
              {property.status === 'rent' ? 'For Rent' : 'For Sale'}
            </span>
          </div>

          {/* New Development Badge */}
          {property.isNewDevelopment && (
            <div className="absolute bottom-4 left-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-1">
              <span className="text-[10px] uppercase tracking-widest font-bold">
                New Development
              </span>
            </div>
          )}
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
      </Link>
    </motion.div>
  );
};

const FilterSelect: React.FC<{
  label: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
  ariaLabel?: string;
}> = ({ label, value, options, onChange, ariaLabel }) => (
  <div className="relative group">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={ariaLabel || label}
      className="appearance-none bg-transparent border border-gray-200 pl-4 pr-10 py-3 w-full md:w-48 text-xs font-sans font-bold uppercase tracking-wider text-luxury-black focus:outline-none focus:border-luxury-black focus:ring-2 focus:ring-luxury-black focus:ring-offset-2 hover:border-gray-400 transition-colors cursor-pointer rounded-sm"
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
  const [searchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    location: 'all',
    type: 'all',
    price: 'all',
    status: 'all',
    collection: 'all'
  });

  const [title, setTitle] = useState<{ main: React.ReactNode, sub: React.ReactNode }>({
    main: <>Curated <br /></>,
    sub: <>residences</>
  });

  // Sync with URL params
  useEffect(() => {
    const mode = searchParams.get('mode');
    const collection = searchParams.get('collection');

    if (collection === 'new-developments') {
      setFilters(prev => ({ ...prev, collection: 'new-developments', status: 'all', type: 'all' }));
      setTitle({
        main: <>New <br /></>,
        sub: <>Developments</>
      });
    } else if (collection === 'penthouses') {
      setFilters(prev => ({ ...prev, collection: 'penthouses', status: 'all', type: 'all' }));
      setTitle({
        main: <>Penthouse <br /></>,
        sub: <>Collection</>
      });
    } else if (mode === 'rent') {
      setFilters(prev => ({ ...prev, status: 'rent', collection: 'all' }));
      setTitle({
        main: <>Luxury <br /></>,
        sub: <>Rentals</>
      });
    } else if (mode === 'sale') {
      setFilters(prev => ({ ...prev, status: 'sale', collection: 'all' }));
      setTitle({
        main: <>Curated <br /></>,
        sub: <>For Sale</>
      });
    } else {
      setFilters(prev => ({ ...prev, status: 'all', collection: 'all' }));
      setTitle({
        main: <>Curated <br /></>,
        sub: <>Residences</>
      });
    }
  }, [searchParams]);

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
      // Status Match (Buy/Rent)
      if (filters.status !== 'all' && property.status !== filters.status) return false;

      // Collection Match
      if (filters.collection === 'new-developments' && !property.isNewDevelopment) return false;
      if (filters.collection === 'penthouses' && property.type !== 'Penthouse') return false;

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
            {title.main}<span className="font-serif italic text-gray-400 lowercase">{title.sub}</span>
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
            ariaLabel="Filter properties by location"
          />
          <FilterSelect
            label="Type"
            value={filters.type}
            options={types}
            onChange={(val) => setFilters(prev => ({ ...prev, type: val }))}
            ariaLabel="Filter properties by type"
          />
          <div className="relative group w-full md:w-auto">
            <select
              value={filters.price}
              onChange={(e) => setFilters(prev => ({ ...prev, price: e.target.value }))}
              aria-label="Filter properties by price range"
              className="appearance-none bg-transparent border border-gray-200 pl-4 pr-10 py-3 w-full md:w-48 text-xs font-sans font-bold uppercase tracking-wider text-luxury-black focus:outline-none focus:border-luxury-black focus:ring-2 focus:ring-luxury-black focus:ring-offset-2 hover:border-gray-400 transition-colors cursor-pointer rounded-sm"
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
              aria-label="Switch to grid view"
              aria-pressed={viewMode === 'grid'}
              className={`flex items-center gap-2 px-4 py-2 rounded-sm text-[10px] uppercase tracking-widest font-bold transition-all ${viewMode === 'grid'
                ? 'bg-white text-luxury-black shadow-sm'
                : 'text-gray-400 hover:text-gray-600'
                }`}
            >
              <GridIcon size={14} />
              <span>List</span>
            </button>
            <button
              onClick={() => setViewMode('map')}
              aria-label="Switch to map view"
              aria-pressed={viewMode === 'map'}
              className={`flex items-center gap-2 px-4 py-2 rounded-sm text-[10px] uppercase tracking-widest font-bold transition-all ${viewMode === 'map'
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
                onClick={() => setFilters({ location: 'all', type: 'all', price: 'all', status: 'all', collection: 'all' })}
                aria-label={`Clear ${activeFilterCount} active filter${activeFilterCount > 1 ? 's' : ''}`}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 shadow-sm rounded-full group hover:border-red-200 transition-colors focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2"
                id="clear-filters-btn"
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
                  className="col-span-1 md:col-span-2 flex flex-col items-center justify-center py-32 text-center"
                >
                  {/* Icon */}
                  <div className="w-24 h-24 mb-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <Filter size={40} className="text-gray-300" />
                  </div>

                  {/* Message */}
                  <p className="font-serif text-3xl text-gray-400 italic mb-4">No residences found.</p>
                  <p className="font-sans text-sm text-gray-500 max-w-md mb-8">
                    {activeFilterCount > 0
                      ? "Try adjusting your filters or search criteria to see more properties."
                      : "We couldn't find any properties matching your current selection."}
                  </p>

                  {/* Actions */}
                  {activeFilterCount > 0 ? (
                    <button
                      onClick={() => setFilters({ location: 'all', type: 'all', price: 'all', status: 'all', collection: 'all' })}
                      className="flex items-center gap-2 px-6 py-3 bg-luxury-black text-white text-xs font-sans font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
                    >
                      <X size={14} />
                      Clear All Filters
                    </button>
                  ) : (
                    <Link
                      to="/"
                      className="px-6 py-3 border border-luxury-black text-luxury-black text-xs font-sans font-bold uppercase tracking-widest hover:bg-luxury-black hover:text-white transition-colors"
                    >
                      View All Properties
                    </Link>
                  )}
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
            className="w-full h-[600px] bg-luxury-black relative rounded-sm overflow-hidden shadow-2xl border border-gray-800 z-0"
          >
            <PropertyMap properties={filteredProperties} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Properties;