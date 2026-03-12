import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AGENTS } from '../data/agents';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { useModal } from '../context/ModalContext';
import { useSearchParams } from 'react-router-dom';

const Agents: React.FC = () => {
    const { openModal } = useModal();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const section = searchParams.get('section');
        if (section) {
            setTimeout(() => {
                const el = document.getElementById(section);
                if (el) {
                    // Add an offset for the fixed header/sidebar if needed
                    const y = el.getBoundingClientRect().top + window.scrollY - 100;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }, 150);
        } else {
            // Scroll to top if no section is specified (e.g. clicking "Find an Agent")
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [searchParams]);

    return (
        <motion.div
            className="bg-white min-h-screen pt-32 pb-24 px-8 md:px-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
            {/* Header */}
            <header className="mb-24 flex flex-col md:flex-row justify-between items-end border-b border-gray-100 pb-12">
                <div>
                    <h1 className="font-sans text-5xl md:text-7xl uppercase tracking-tighter font-light mb-4 text-luxury-black">
                        Global <br /> Advisors
                    </h1>
                </div>
                <p className="font-serif text-gray-500 text-lg md:text-xl italic max-w-sm text-right mt-8 md:mt-0">
                    Expertise across every market. <br />
                    Curating a life of distinction.
                </p>
            </header>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
                {AGENTS.map((agent) => (
                    <div key={agent.id} className="group cursor-pointer">
                        {/* Image Container */}
                        <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-gray-100">
                            <img
                                src={agent.image}
                                alt={agent.name}
                                className="w-full h-full object-cover filter grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105"
                            />
                            {/* Overlay Contact Button */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/20 backdrop-blur-[2px]">
                                <a
                                    href={`mailto:${agent.email}`}
                                    className="text-white text-xs uppercase tracking-widest font-bold border-b border-white pb-1 hover:opacity-80 transition-opacity flex items-center gap-2"
                                >
                                    Email
                                </a>
                            </div>
                        </div>

                        {/* Info */}
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-sans text-sm font-bold uppercase tracking-widest text-luxury-black mb-1">
                                    {agent.name}
                                </h3>
                                <p className="font-serif text-gray-500 italic text-sm">
                                    {agent.role}
                                </p>
                            </div>
                            <span className="text-[10px] uppercase tracking-widest text-gray-400">
                                {agent.location}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Global Offices Section */}
            <div id="offices" className="mt-32 pt-24 border-t border-gray-100">
                <div className="flex flex-col md:flex-row justify-between items-start mb-16">
                    <h2 className="font-sans text-3xl md:text-5xl uppercase tracking-tighter font-light text-luxury-black">
                        Global <br /> Presence
                    </h2>
                    <p className="font-serif text-gray-500 max-w-md mt-4 md:mt-0 leading-relaxed md:text-right">
                        Our network extends across the world's most coveted destinations, providing unparalleled access to extraordinary properties.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                     {['New York', 'London', 'Dubai', 'Miami'].map((city, idx) => (
                         <motion.div 
                             key={city} 
                             initial={{ opacity: 0, y: 30 }}
                             whileInView={{ opacity: 1, y: 0 }}
                             viewport={{ once: true, margin: "-50px" }}
                             transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
                             className="group cursor-pointer"
                         >
                             <div className="aspect-[4/3] bg-gray-50 mb-6 overflow-hidden relative">
                                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                                  {/* Dummy abstract shapes or images could go here, for now solid tone */}
                             </div>
                             <h4 className="font-sans text-sm uppercase tracking-widest font-bold text-luxury-black mb-2 flex items-center gap-2">
                                 <MapPin size={14} className="text-gray-400 group-hover:text-luxury-black transition-colors" />
                                 {city}
                             </h4>
                             <p className="font-serif text-gray-400 text-xs italic">
                                 {idx === 0 ? 'Headquarters' : 'Regional Office'}
                             </p>
                         </motion.div>
                     ))}
                </div>
            </div>

            {/* Join Us / Footer CTA */}
            <div id="careers" className="mt-32 pt-24 border-t border-gray-100 flex flex-col items-center justify-center text-center pb-12">
                <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 mb-6 block">We are hiring</span>
                <h3 className="font-serif text-4xl italic text-luxury-black mb-6">Join our growing team.</h3>
                <p className="font-sans text-sm text-gray-500 max-w-md mb-8 leading-relaxed">
                    We are always looking for exceptional talent to join our global network of advisors and specialists.
                </p>
                <a href="#" className="inline-flex items-center gap-2 border-b border-luxury-black pb-1 hover:opacity-70 transition-opacity">
                    <span className="font-sans text-xs uppercase tracking-widest font-bold">View Openings</span>
                    <ArrowUpRight size={14} />
                </a>
            </div>
        </motion.div>
    );
};

export default Agents;
