import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Bed, Bath, Move, MapPin, ArrowRight } from 'lucide-react';
import { PROPERTIES } from '../data/properties';
import { useModal } from '../context/ModalContext';

const PropertyDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const property = PROPERTIES.find(p => p.id === id);
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    const { openModal } = useModal();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!property) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-12">
                <h2 className="font-sans text-2xl uppercase tracking-widest mb-4">Residencia no encontrada</h2>
                <Link to="/" className="text-sm border-b border-black pb-1 hover:opacity-50 transition-opacity">
                    Volver a la Colección
                </Link>
            </div>
        );
    }

    return (

        <motion.div
            className="bg-white min-h-screen relative selection:bg-gray-200 selection:text-black"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
            {/* Navigation Back - Absolute */}
            <nav className="absolute top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center mix-blend-difference text-white">
                <Link to="/" className="flex items-center gap-3 group">
                    <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-2 group-hover:translate-x-0">
                        Colección
                    </span>
                </Link>
                <div className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold">
                    Skyline Estates
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative h-screen overflow-hidden">
                <motion.div
                    className="absolute inset-0 w-full h-full"
                    style={{ y: y1, scale: 1.1 }}
                >
                    <motion.img
                        initial={{ scale: 1.4 }}
                        animate={{ scale: 1.1 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        src={property.image}
                        alt={property.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                </motion.div>

                <motion.div
                    style={{ opacity }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-white"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        <span className="block text-[10px] md:text-xs uppercase tracking-[0.3em] mb-6 font-bold">
                            {property.location}
                        </span>
                        <h1 className="font-sans text-5xl md:text-7xl lg:text-9xl uppercase tracking-tighter font-light mb-8 max-w-5xl leading-[0.9]">
                            {property.title}
                        </h1>
                    </motion.div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    style={{ opacity }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <div className="w-[1px] h-12 bg-white/30" />
                    <span className="text-[10px] uppercase tracking-widest">Scroll</span>
                </motion.div>
            </header>

            {/* Content Section */}
            <section className="relative z-10 bg-white pt-24 pb-48 px-8 md:px-24 max-w-[1920px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

                    {/* Left Column: Narrative */}
                    <div className="lg:col-span-7 space-y-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="font-serif text-3xl md:text-4xl text-gray-900 leading-tight">
                                "{property.description}"
                            </h2>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-gray-500 font-serif leading-relaxed text-lg space-y-6"
                        >
                            <p>
                                Una residencia que desafía las expectativas ordinarias. Cada línea, cada textura y cada sombra ha sido deliberadamente seleccionada para fomentar una sensación de calma trascendente. La arquitectura no se limita a contener el espacio; lo esculpe.
                            </p>
                            <p>
                                La luz natural inunda los interiores a través de cristales de suelo a techo, difuminando el límite entre el santuario interior y el mundo exterior. Los materiales son honestos, crudos y descaradamente lujosos.
                            </p>
                        </motion.div>
                    </div>

                    {/* Right Column: Specs */}
                    <div className="lg:col-span-5 sticky top-24 h-fit">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="bg-gray-50 p-12 border border-gray-100"
                        >
                            <div className="mb-10">
                                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-2">Precio</span>
                                <span className="font-sans text-4xl block text-luxury-black">{property.price}</span>
                            </div>

                            <div className="space-y-6">
                                <div className="flex justify-between items-center py-4 border-b border-gray-200">
                                    <div className="flex items-center gap-3 text-gray-500">
                                        <Bed size={18} />
                                        <span className="text-xs uppercase tracking-widest">Dormitorios</span>
                                    </div>
                                    <span className="font-sans font-bold">{property.beds}</span>
                                </div>
                                <div className="flex justify-between items-center py-4 border-b border-gray-200">
                                    <div className="flex items-center gap-3 text-gray-500">
                                        <Bath size={18} />
                                        <span className="text-xs uppercase tracking-widest">Baños</span>
                                    </div>
                                    <span className="font-sans font-bold">{property.baths}</span>
                                </div>
                                <div className="flex justify-between items-center py-4 border-b border-gray-200">
                                    <div className="flex items-center gap-3 text-gray-500">
                                        <Move size={18} />
                                        <span className="text-xs uppercase tracking-widest">Superficie</span>
                                    </div>
                                    <span className="font-sans font-bold">{property.sqft.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center py-4 border-b border-gray-200">
                                    <div className="flex items-center gap-3 text-gray-500">
                                        <MapPin size={18} />
                                        <span className="text-xs uppercase tracking-widest">Tipo</span>
                                    </div>
                                    <span className="font-sans font-bold">{property.type}</span>
                                </div>
                            </div>

                            <button
                                onClick={openModal}
                                className="w-full mt-12 bg-luxury-black text-white py-4 px-6 flex items-center justify-center gap-3 hover:bg-gray-800 transition-all group"
                            >
                                <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Agendar Visita Privada</span>
                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Sticky Mobile CTA (Visible only on small screens if we wanted, but sticking to requested 'Sticky CTA', usually desktop bottom bar or corner) */}
            {/* The right column card is acting as the main CTA container for desktop. Let's add a fixed bottom bar for mobile/global persistence as requested "Sticky CTA". */}
            <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 p-4 md:hidden z-40 flex justify-between items-center shadow-[0_-5px_20px_rgba(0,0,0,0.05)]"
            >
                <div>
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 block">Precio</span>
                    <span className="font-sans text-xl font-bold">{property.price}</span>
                </div>
                <button
                    onClick={openModal}
                    className="bg-luxury-black text-white px-6 py-3 text-[10px] uppercase tracking-widest font-bold"
                >
                    Consultar
                </button>
            </motion.div>

        </motion.div>
    );
};

export default PropertyDetail;
