import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import Hero from '../components/Hero';
import FloatingFilter from '../components/Search/FloatingFilter';
import Properties from '../components/Properties';
import InteractiveDetail from '../components/InteractiveDetail';
import EditorialGallery from '../components/EditorialGallery';
import PanoramaViewer from '../components/PanoramaViewer';

const Home: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    // Check if we have entered the site (i.e., not just on the landing hero)
    const isContentView = searchParams.get('mode') !== null || 
                          searchParams.get('collection') !== null || 
                          searchParams.get('entered') === 'true';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
            <AnimatePresence mode="wait">
                {!isContentView ? (
                    <motion.div 
                        key="landing-view"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                        className="relative h-screen overflow-hidden"
                    >
                        {/* Hero Section */}
                        <Hero onExplore={() => setSearchParams({ mode: 'sale' })} />

                        {/* Floating Search Filter - Overlaps Hero */}
                        <FloatingFilter
                            onSearch={(filters) => {
                                const newParams = new URLSearchParams();
                                // Map intent to the correct URL param
                                if (filters.intent === 'new-developments') {
                                    newParams.set('collection', 'new-developments');
                                } else if (filters.intent === 'rent') {
                                    newParams.set('mode', 'rent');
                                } else {
                                    // Default to 'sale' (Buy)
                                    newParams.set('mode', 'sale');
                                }
                                // Also pass any additional filters selected
                                if (filters.location !== 'all') newParams.set('location', filters.location);
                                if (filters.type !== 'all') newParams.set('type', filters.type);
                                if (filters.price !== 'all') newParams.set('price', filters.price);
                                setSearchParams(newParams);
                            }}
                        />
                    </motion.div>
                ) : (
                    <motion.div
                        key="content-view"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    >
                        {/* Main Content */}
                        <Properties />

                        {/* Interactive Materiality Section */}
                        <InteractiveDetail />

                        {/* Editorial Gallery */}
                        <EditorialGallery />

                        {/* 360 Panorama View */}
                        <PanoramaViewer />

                        {/* Footer */}
                        <footer className="bg-gray-50 py-24 px-12 md:px-24 border-t border-gray-200 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="space-y-6">
                        <h4 className="font-sans uppercase tracking-architect text-xs font-bold">Contact</h4>
                        <p className="font-serif text-gray-500 text-sm">
                            New York, NY<br />
                            +1 (555) 000-0000<br />
                            hello@skyline.estates
                        </p>
                    </div>
                    <div className="space-y-6">
                        <h4 className="font-sans uppercase tracking-architect text-xs font-bold">Social</h4>
                        <div className="flex flex-col space-y-2 font-serif text-gray-500 text-sm">
                            <a href="#" className="hover:text-black transition-colors">Instagram</a>
                            <a href="#" className="hover:text-black transition-colors">LinkedIn</a>
                            <a href="#" className="hover:text-black transition-colors">Pinterest</a>
                        </div>
                    </div>
                    <div className="md:col-span-2 text-right flex flex-col justify-between">
                        <h2 className="text-4xl font-sans uppercase tracking-widest opacity-10">Skyline</h2>
                        <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-auto">
                            © 2024 Skyline Estates. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </motion.div>
    )}
</AnimatePresence>
</motion.div>
);
};

export default Home;
