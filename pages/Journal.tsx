import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { JOURNAL_POSTS } from '../data/journal';
import { ArrowRight } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import Footer from '../components/Layout/Footer';

const Journal: React.FC = () => {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('cat');

    const filteredPosts = useMemo(() => {
        const posts = category
            ? JOURNAL_POSTS.filter(post =>
                post.category.toLowerCase().includes(category.toLowerCase())
              )
            : [...JOURNAL_POSTS];

        // Sort newest first
        return posts.sort((a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    }, [category]);

    // Unique key drives AnimatePresence to re-mount when filter changes
    const listKey = category ?? 'all';

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
                <header className="mb-32 flex flex-col items-center">
                    <span className="font-sans text-xs uppercase tracking-[0.4em] font-bold text-gray-400 mb-6">Editorial</span>
                    <h1 className="font-serif text-6xl md:text-8xl text-luxury-black italic text-center">
                        La Revista.
                    </h1>
                    {category && (
                        <motion.p
                            className="mt-6 font-sans text-xs uppercase tracking-widest text-gray-400"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            Filtrado por: <span className="text-luxury-black font-bold">{category}</span>
                            {' · '}
                            <Link to="/journal" className="underline hover:opacity-60 transition-opacity">Ver todo</Link>
                        </motion.p>
                    )}
                </header>

                {/* Articles List — animates on category change */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={listKey}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col gap-32"
                    >
                        {filteredPosts.map((post, index) => (
                            <motion.article
                                key={post.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, delay: index * 0.05 }}
                                className={`flex flex-col md:flex-row items-center gap-12 lg:gap-24 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                            >
                                {/* Image Side */}
                                <Link
                                    to={`/journal/${post.slug}`}
                                    className="w-full md:w-1/2 aspect-[4/3] overflow-hidden group cursor-pointer relative block"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.7, ease: "easeOut" }}
                                        className="w-full h-full"
                                    >
                                        <img
                                            src={post.coverImage}
                                            alt={post.title}
                                            loading="lazy"
                                            className="w-full h-full object-cover"
                                        />
                                    </motion.div>
                                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </Link>

                                {/* Text Side */}
                                <div className="w-full md:w-1/2 flex flex-col justify-center items-start text-left">
                                    <span className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-gray-400 mb-4 block">
                                        {post.category} — {post.date} — {post.readTime}
                                    </span>
                                    <Link to={`/journal/${post.slug}`}>
                                        <h2 className="font-serif text-3xl md:text-5xl text-luxury-black leading-tight mb-8 hover:opacity-70 transition-opacity cursor-pointer">
                                            {post.title}
                                        </h2>
                                    </Link>
                                    <p className="font-sans text-sm md:text-base text-gray-500 leading-relaxed max-w-md mb-10">
                                        {post.excerpt}
                                    </p>
                                    <Link
                                        to={`/journal/${post.slug}`}
                                        className="inline-flex items-center gap-3 bg-luxury-black text-white px-8 py-4 font-sans text-xs uppercase tracking-[0.2em] font-bold hover:bg-gray-800 transition-colors group"
                                    >
                                        Leer Nota
                                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </motion.article>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Newsletter — full-width, outside the padded container */}
            <div className="mt-32 bg-gray-50 py-24 px-8 text-center">
                <h3 className="font-serif text-3xl italic mb-6">Suscribite a nuestra revista</h3>
                <p className="font-sans text-xs text-gray-500 tracking-widest uppercase mb-8">Tendencias del mercado inmobiliario de Tucumán</p>
                <div className="flex flex-col md:flex-row justify-center gap-4 max-w-md mx-auto">
                    <input
                        type="email"
                        placeholder="CORREO ELECTRÓNICO"
                        className="bg-transparent border-b border-gray-300 py-3 px-2 text-xs tracking-widest focus:outline-none focus:border-black w-full"
                    />
                    <button className="bg-luxury-black text-white px-8 py-3 text-[10px] uppercase tracking-widest font-bold hover:bg-gray-800 transition-colors">
                        Unirse
                    </button>
                </div>
            </div>

            <Footer />
        </motion.div>
    );
};

export default Journal;
