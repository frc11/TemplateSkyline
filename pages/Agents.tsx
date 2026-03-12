import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AGENTS } from '../data/agents';
import { ArrowUpRight, MapPin, History, Quote } from 'lucide-react';
import { useModal } from '../context/ModalContext';
import { useSearchParams } from 'react-router-dom';
import Footer from '../components/Layout/Footer';

const AgencyHistory: React.FC = () => {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const images = [
        "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1600&auto=format&fit=crop", 
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop"
    ];

    const rotateImages = () => {
        setActiveIndex((prev) => (prev + 1) % images.length);
    };

    return (
        <div id="history" className="mt-48 pt-24 border-t border-gray-100 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            {/* Left: Poker Card Image Switcher */}
            <div 
                className="relative h-[700px] flex items-center justify-center cursor-pointer" 
                onClick={rotateImages}
            >
                {images.map((img, idx) => {
                    // Logic for the poker card fan effect - staggered to the LEFT
                    const position = (idx - activeIndex + images.length) % images.length;
                    const isTop = position === 0;

                    return (
                        <motion.div
                            key={img}
                            className="absolute w-[460px] h-[620px] shadow-2xl overflow-hidden rounded-sm border border-white/20"
                            initial={false}
                            animate={{
                                x: position * -45, // Staggered to the LEFT (peek out from right card)
                                y: position * 15,  // Slight downward stagger
                                rotate: position * -6, // Counter-clockwise rotation for left fan
                                zIndex: images.length - position,
                                opacity: position > 2 ? 0 : 1,
                                scale: 1 - position * 0.05
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 25
                            }}
                        >
                            <img src={img} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105" alt="" />
                            {isTop && (
                                <div className="absolute top-8 right-8 text-white z-10">
                                    <span className="font-sans text-[10px] uppercase tracking-widest font-bold bg-luxury-black/60 backdrop-blur-md px-4 py-1.5 border border-white/10">Est. 2012</span>
                                </div>
                            )}
                        </motion.div>
                    );
                })}
                <div className="absolute -bottom-12 left-0 flex items-center gap-4 text-gray-400 group">
                    <span className="font-sans text-[10px] uppercase tracking-widest font-bold">Click to rotate history</span>
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="flex items-center justify-center font-bold"
                    >
                        <History size={14} />
                    </motion.div>
                </div>
            </div>

            {/* Right: Company Info */}
            <div className="space-y-12">
                <div>
                    <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 mb-6 block">Our Legacy</span>
                    <h2 className="font-sans text-4xl md:text-5xl uppercase tracking-tighter font-light text-luxury-black mb-8 leading-tight">
                        A decade of <br /> <span className="font-serif italic text-gray-400 lowercase">redefining</span> expectations
                    </h2>
                    <div className="prose prose-sm font-serif text-gray-500 space-y-6 max-w-lg">
                        <p>
                            Founded in New York City in 2012, Skyline Estates began with a singular vision: to transform the acquisition of luxury real estate from a transaction into a curated experience of artistry and architectural appreciation.
                        </p>
                        <p>
                            What started as a boutique advisory has evolved into a global force, representing the most iconic residences and developments across three continents. Our philosophy remains unchanged: we do not sell properties; we facilitate the pursuit of exceptional living.
                        </p>
                    </div>
                </div>

                <div className="pt-12 border-t border-gray-100 grid grid-cols-2 gap-12">
                    <div>
                        <h4 className="font-sans text-[10px] uppercase tracking-widest font-bold text-luxury-black mb-2">$4.2B+</h4>
                        <p className="font-serif text-xs text-gray-400 italic">Total Lifetime Sales</p>
                    </div>
                    <div>
                        <h4 className="font-sans text-[10px] uppercase tracking-widest font-bold text-luxury-black mb-2">12 Countries</h4>
                        <p className="font-serif text-xs text-gray-400 italic">Global Network</p>
                    </div>
                </div>

                <div className="relative pl-8 border-l border-luxury-black italic text-gray-500 font-serif">
                    <p className="text-lg leading-relaxed">
                        "Luxury is not about price; it is about the purity of design and the resonance of space."
                    </p>
                    <span className="font-sans text-[9px] uppercase tracking-[0.2em] font-bold text-gray-300 mt-4 block">Founder's Note</span>
                </div>
            </div>
        </div>
    );
};

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
            className="bg-white min-h-screen"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="pt-32 pb-24 px-8 md:px-24">
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
                                    href={`https://wa.me/${agent.whatsapp}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white text-xs uppercase tracking-widest font-bold border-b border-white pb-1 hover:opacity-80 transition-opacity flex items-center gap-2"
                                >
                                    WhatsApp
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

            {/* Agency History Section */}
            <AgencyHistory />

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
                    {[
                        { city: 'New York', img: 'https://images.unsplash.com/photo-1546436836-07a91091f160?q=80&w=1200&auto=format&fit=crop', flag: 'https://flagcdn.com/us.svg' },
                        { city: 'London', img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1200&auto=format&fit=crop', flag: 'https://flagcdn.com/gb.svg' },
                        { city: 'Dubai', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop', flag: 'https://flagcdn.com/ae.svg' },
                        { city: 'Miami', img: 'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?q=80&w=1200&auto=format&fit=crop', flag: 'https://flagcdn.com/us.svg' }
                    ].map((office, idx) => (
                        <motion.div
                            key={office.city}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
                            className="group cursor-pointer relative"
                        >
                            <div className="aspect-[4/3] bg-gray-50 mb-6 overflow-hidden relative border border-gray-100/50">
                                <motion.img 
                                    src={office.img} 
                                    alt={office.city}
                                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                />
                                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                                
                                {/* Flag Pop-out */}
                                <div className="absolute top-4 right-4 z-20 overflow-hidden">
                                     <motion.div
                                        className="bg-white/95 backdrop-blur-sm shadow-xl px-2 py-1.5 rounded-sm border border-gray-100 flex items-center justify-center translate-x-12 translate-y-[-12px] group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 ease-out"
                                     >
                                        <img src={office.flag} className="w-5 h-auto shadow-sm" alt="Country flag" />
                                     </motion.div>
                                </div>
                            </div>
                            <h4 className="font-sans text-sm uppercase tracking-widest font-bold text-luxury-black mb-2 flex items-center gap-2">
                                <MapPin size={14} className="text-gray-400 group-hover:text-luxury-black transition-colors" />
                                {office.city}
                            </h4>
                            <p className="font-serif text-gray-400 text-xs italic">
                                {idx === 0 ? 'Headquarters' : 'Regional Office'}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Join Us / Careers Section */}
            <div id="careers" className="mt-48 pt-24 border-t border-gray-100">
                <div className="flex flex-col md:flex-row justify-between items-start mb-24">
                    <div className="max-w-2xl">
                        <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 mb-6 block">Careers</span>
                        <h2 className="font-sans text-4xl md:text-6xl uppercase tracking-tighter font-light text-luxury-black mb-8">
                            Shape the Future <br /> of <span className="font-serif italic lowercase text-gray-400">Extraordinary</span> Living
                        </h2>
                        <p className="font-serif text-gray-500 text-lg leading-relaxed italic">
                            We are seeking visionary individuals who understand that real estate is not just about spaces, but about the stories and legacies created within them.
                        </p>
                    </div>
                </div>

                {/* Core Values */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-32">
                    {[
                        { title: 'Excellence', text: 'We set the standard for luxury service, demanding perfection in every detail and interaction.' },
                        { title: 'Integrity', text: 'Transparencia and trust are the foundations of our global reputation and client relationships.' },
                        { title: 'Innovation', text: 'We leverage cutting-edge technology and market intelligence to redefine the real estate experience.' }
                    ].map((value, idx) => (
                        <div key={idx} className="relative">
                            <span className="text-4xl font-serif text-gray-100 absolute -top-6 -left-2 z-0">0{idx + 1}</span>
                            <div className="relative z-10">
                                <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-luxury-black mb-4">{value.title}</h4>
                                <p className="font-serif text-sm text-gray-500 leading-relaxed">{value.text}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Open Positions Grid */}
                <div className="space-y-4">
                    <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-gray-400 mb-12">Current Openings</h3>
                    {[
                        { title: 'Luxury Real Estate Advisor', location: 'New York / London / Dubai', type: 'Commission Based', description: 'Seeking experienced advisors with a proven track record in high-net-worth markets and a commitment to white-glove service.' },
                        { title: 'Director of International Marketing', location: 'New York (Global HQ)', type: 'Full-Time', description: 'Lead our global brand strategy, overseeing multi-channel campaigns for some of the world\'s most exclusive developments.' },
                        { title: 'Operations Manager', location: 'Miami', type: 'Full-Time', description: 'Optimize regional workflows and ensure seamless administrative support for our growing Florida advisor network.' }
                    ].map((job, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="group border-b border-gray-100 py-10 flex flex-col md:flex-row md:items-center justify-between gap-8 hover:bg-gray-50/50 transition-colors px-4 -mx-4"
                        >
                            <div className="max-w-xl">
                                <div className="flex items-center gap-4 mb-3">
                                    <h4 className="font-sans text-lg font-bold text-luxury-black">{job.title}</h4>
                                    <span className="px-2 py-0.5 border border-gray-200 text-[9px] uppercase tracking-widest text-gray-400 font-bold">{job.type}</span>
                                </div>
                                <p className="font-serif text-sm text-gray-500 leading-relaxed italic">{job.description}</p>
                            </div>
                             <div className="flex flex-col md:items-end shrink-0">
                                <span className="font-sans text-[10px] uppercase tracking-widest text-gray-400 mb-4">{job.location}</span>
                                <button 
                                    onClick={() => openModal('careers')}
                                    className="flex items-center gap-2 group/btn cursor-pointer bg-transparent border-none p-0"
                                >
                                    <span className="font-sans text-[10px] uppercase tracking-widest font-bold border-b border-luxury-black pb-0.5 group-hover/btn:opacity-50 transition-opacity whitespace-nowrap text-luxury-black">Apply Now</span>
                                    <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform text-luxury-black" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
                </div>
            </div>
            <Footer />
        </motion.div>
    );
};

export default Agents;
