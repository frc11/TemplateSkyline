import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import Hero from '../components/Hero';
import FloatingFilter from '../components/Search/FloatingFilter';
import Properties from '../components/Properties';
import SectionContent from '../components/SectionContent';
import Footer from '../components/Layout/Footer';

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

                        {/* Section-specific editorial content */}
                        <SectionContent
                          section={{
                            status: searchParams.get('mode') ?? 'all',
                            collection: searchParams.get('collection') ?? 'all',
                          }}
                        />

                        {/* Footer */}
                        <Footer />
        </motion.div>
    )}
</AnimatePresence>
</motion.div>
);
};

export default Home;
