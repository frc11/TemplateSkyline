import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronDown, Filter, X, Map as MapIcon, Grid as GridIcon } from 'lucide-react';
import { PROPERTIES, PropertyData } from '../data/properties';
import Footer from '../components/Layout/Footer';
import PropertyMap from '../components/Search/PropertyMap';

/* ─── Property Card ────────────────────────────── */
const PropertyCard: React.FC<{ property: PropertyData; index: number }> = ({ property, index }) => (
    <motion.div
        layout
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
        className="group relative cursor-pointer"
    >
        <Link to={`/property/${property.id}`} className="block h-full">
            <div className="overflow-hidden mb-6 relative aspect-[4/5] bg-gray-100">
                <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                    src={property.image}
                    alt={property.title}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

                {/* Type badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-luxury-black">
                        {property.type}
                    </span>
                </div>

                {/* Status badge */}
                <div className={`absolute top-4 right-4 px-3 py-1 ${property.status === 'rent' ? 'bg-luxury-black text-white' : 'bg-white/90 backdrop-blur-sm text-luxury-black'}`}>
                    <span className="text-[10px] uppercase tracking-widest font-bold">
                        {property.status === 'rent' ? 'Alquiler' : 'Venta'}
                    </span>
                </div>

                {/* New Dev badge */}
                {property.isNewDevelopment && (
                    <div className="absolute bottom-4 left-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-1">
                        <span className="text-[10px] uppercase tracking-widest font-bold">Nuevo Desarrollo</span>
                    </div>
                )}
            </div>

            <div className="flex justify-between items-start border-t border-gray-200 pt-6">
                <div className="space-y-1">
                    <h3 className="font-sans uppercase tracking-widest text-sm font-bold text-luxury-black">
                        {property.title}
                    </h3>
                    <p className="font-serif text-gray-500 text-sm italic">{property.location}</p>
                </div>
                <div className="text-right">
                    <p className="font-sans font-medium text-sm">{property.price}</p>
                    <div className="mt-2 inline-flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <span className="text-[10px] uppercase tracking-widest mr-2">Ver</span>
                        <ArrowUpRight size={14} />
                    </div>
                </div>
            </div>
        </Link>
    </motion.div>
);

/* ─── Custom dropdown ──────────────────────────── */
const FilterSelect: React.FC<{
    label: string;
    value: string;
    options: string[];
    onChange: (val: string) => void;
}> = ({ label, value, options, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const h = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
        };
        document.addEventListener('mousedown', h);
        return () => document.removeEventListener('mousedown', h);
    }, []);

    const isActive = value !== 'all';

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setIsOpen(p => !p)}
                className={`flex items-center gap-3 border py-[10px] pl-4 pr-3 w-full md:w-44 text-xs font-sans font-bold uppercase tracking-wider transition-colors ${isActive ? 'border-luxury-black bg-luxury-black/[0.03]' : 'border-gray-200 hover:border-gray-400'} text-luxury-black`}
            >
                <span className="flex-1 text-left truncate">{isActive ? value : label}</span>
                <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={12} className={isActive ? 'text-luxury-black' : 'text-gray-400'} />
                </motion.span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.16 }}
                        className="absolute top-full left-0 mt-1 w-full min-w-[160px] bg-white border border-gray-100 shadow-xl z-50 py-1"
                    >
                        <li>
                            <button className={`w-full text-left px-4 py-2.5 text-xs font-sans uppercase tracking-wider transition-colors ${value === 'all' ? 'font-bold text-luxury-black bg-gray-50' : 'text-gray-400 hover:text-luxury-black hover:bg-gray-50'}`}
                                onClick={() => { onChange('all'); setIsOpen(false); }}>
                                {label}
                            </button>
                        </li>
                        {options.map(opt => (
                            <li key={opt}>
                                <button className={`w-full text-left px-4 py-2.5 text-xs font-sans uppercase tracking-wider transition-colors ${value === opt ? 'font-bold text-luxury-black bg-gray-50' : 'text-gray-400 hover:text-luxury-black hover:bg-gray-50'}`}
                                    onClick={() => { onChange(opt); setIsOpen(false); }}>
                                    {opt}
                                </button>
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};

/* ─── Price ranges ─────────────────────────────── */
const PRICE_RANGES = [
    { label: 'Menos de $10M', value: 'under-10', match: (p: PropertyData) => p.rawPrice < 10_000_000 },
    { label: '$10M – $30M', value: '10-30', match: (p: PropertyData) => p.rawPrice >= 10_000_000 && p.rawPrice <= 30_000_000 },
    { label: 'Más de $30M', value: 'above-30', match: (p: PropertyData) => p.rawPrice > 30_000_000 },
];

/* ─── Page ─────────────────────────────────────── */
const PropertiesPage: React.FC = () => {
    const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
    const [filters, setFilters] = useState({ location: 'all', type: 'all', status: 'all', price: 'all' });

    const locations = useMemo(() => Array.from(new Set(PROPERTIES.map(p => p.location))), []);
    const types = useMemo(() => Array.from(new Set(PROPERTIES.map(p => p.type))) as string[], []);

    const filtered = useMemo(() => {
        return PROPERTIES.filter(p => {
            if (filters.location !== 'all' && p.location !== filters.location) return false;
            if (filters.type !== 'all' && p.type !== filters.type) return false;
            if (filters.status !== 'all' && p.status !== filters.status) return false;
            if (filters.price !== 'all') {
                const range = PRICE_RANGES.find(r => r.value === filters.price);
                if (range && !range.match(p)) return false;
            }
            return true;
        });
    }, [filters]);

    const activeCount = Object.values(filters).filter(v => v !== 'all').length;

    return (
        <motion.div
            className="bg-white min-h-screen"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="pt-32 pb-24 px-8 md:px-24 max-w-[1920px] mx-auto">

                {/* Header */}
                <header className="mb-24 flex flex-col md:flex-row justify-between items-end border-b border-gray-100 pb-12">
                    <div>
                        <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 mb-4 block">
                            Colección
                        </span>
                        <h1 className="font-sans text-5xl md:text-7xl uppercase tracking-tighter font-light text-luxury-black">
                            Todas las<br />Residencias
                        </h1>
                    </div>
                    <p className="font-serif text-gray-500 text-lg md:text-xl italic max-w-sm text-right mt-8 md:mt-0">
                        {filtered.length} {filtered.length === 1 ? 'propiedad disponible' : 'propiedades disponibles'}
                    </p>
                </header>

                {/* Filters */}
                <div className="mb-16 flex flex-col md:flex-row gap-4 items-start md:items-center border-b border-gray-100 pb-8">
                    <div className="flex items-center gap-2 mr-2 text-gray-400 shrink-0">
                        <Filter size={13} />
                        <span className="text-[10px] uppercase tracking-widest font-bold">Filtrar</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <FilterSelect label="Ubicación" value={filters.location} options={locations}
                            onChange={v => setFilters(p => ({ ...p, location: v }))} />
                        <FilterSelect label="Tipo" value={filters.type} options={types}
                            onChange={v => setFilters(p => ({ ...p, type: v }))} />
                        <FilterSelect label="Estado" value={filters.status === 'sale' ? 'Venta' : filters.status === 'rent' ? 'Alquiler' : 'all'} options={['Venta', 'Alquiler']}
                            onChange={v => setFilters(p => ({ ...p, status: v === 'Venta' ? 'sale' : v === 'Alquiler' ? 'rent' : 'all' }))} />
                        <FilterSelect
                            label="Precio"
                            value={filters.price === 'all' ? 'all' : (PRICE_RANGES.find(r => r.value === filters.price)?.label ?? 'all')}
                            options={PRICE_RANGES.map(r => r.label)}
                            onChange={v => {
                                const found = PRICE_RANGES.find(r => r.label === v);
                                setFilters(p => ({ ...p, price: found ? found.value : 'all' }));
                            }}
                        />
                        {activeCount > 0 && (
                            <button
                                onClick={() => setFilters({ location: 'all', type: 'all', status: 'all', price: 'all' })}
                                className="flex items-center gap-2 text-[10px] font-sans uppercase tracking-widest text-gray-400 hover:text-luxury-black transition-colors border border-gray-200 px-4 py-[10px]"
                            >
                                <X size={11} /> Limpiar
                            </button>
                        )}
                    </div>
                    
                    <div className="flex-1" />

                    {/* View Toggle */}
                    <div className="flex items-center bg-gray-50 p-1 rounded-sm border border-gray-100">
                        <button
                            onClick={() => setViewMode('grid')}
                            aria-label="Switch to grid view"
                            className={`flex items-center gap-2 px-4 py-2 rounded-sm text-[10px] uppercase tracking-widest font-bold transition-all ${viewMode === 'grid' ? 'bg-white text-luxury-black shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            <GridIcon size={14} /><span>Lista</span>
                        </button>
                        <button
                            onClick={() => setViewMode('map')}
                            aria-label="Switch to map view"
                            className={`flex items-center gap-2 px-4 py-2 rounded-sm text-[10px] uppercase tracking-widest font-bold transition-all ${viewMode === 'map' ? 'bg-white text-luxury-black shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            <MapIcon size={14} /><span>Mapa</span>
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <AnimatePresence mode="wait">
                    {viewMode === 'grid' ? (
                        filtered.length > 0 ? (
                            <motion.div
                                key="grid"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20"
                            >
                                {filtered.map((p, i) => (
                                    <PropertyCard key={p.id} property={p} index={i} />
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center py-32"
                            >
                                <p className="font-serif text-2xl text-gray-400 italic mb-4">Ningún inmueble coincide con los filtros</p>
                                <button
                                    onClick={() => setFilters({ location: 'all', type: 'all', status: 'all', price: 'all' })}
                                    className="font-sans text-xs uppercase tracking-widest border-b border-gray-400 pb-0.5 hover:border-black transition-colors"
                                >
                                    Limpiar filtros
                                </button>
                            </motion.div>
                        )
                    ) : (
                        /* Map View */
                        <motion.div
                            key="map"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="w-full h-[70vh] min-h-[500px] bg-luxury-black relative rounded-sm overflow-hidden shadow-2xl border border-gray-100 z-0"
                        >
                            <PropertyMap properties={filtered} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <Footer />
        </motion.div>
    );
};

export default PropertiesPage;
