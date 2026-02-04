import React from 'react';
import { motion } from 'framer-motion';
import { AGENTS } from '../data/agents';
import { ArrowUpRight } from 'lucide-react';
import { useModal } from '../context/ModalContext';

const Agents: React.FC = () => {
    const { openModal } = useModal();

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

            {/* Join Us / Footer CTA */}
            <div className="mt-32 pt-12 border-t border-gray-100 flex justify-center">
                <p className="font-serif text-gray-400 text-center">
                    Interested in joining our team? <a href="#" className="text-luxury-black underline underline-offset-4 decoration-1">Careers</a>
                </p>
            </div>
        </motion.div>
    );
};

export default Agents;
