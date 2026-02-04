import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { JOURNAL_POSTS } from '../data/journal';
import { ArrowRight } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

const Journal: React.FC = () => {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('cat');

    const filteredPosts = useMemo(() => {
        if (!category) return JOURNAL_POSTS;
        return JOURNAL_POSTS.filter(post => post.category.toLowerCase().includes(category.toLowerCase()));
    }, [category]);

    return (
        <motion.div
            className="bg-white min-h-screen pt-32 pb-24 px-8 md:px-24 max-w-[1920px] mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
            {/* Header */}
            <header className="mb-32 flex flex-col items-center">
                <span className="font-sans text-xs uppercase tracking-[0.4em] font-bold text-gray-400 mb-6">Editorial</span>
                <h1 className="font-serif text-6xl md:text-8xl text-luxury-black italic text-center">
                    The Journal.
                </h1>
            </header>

            {/* Articles List */}
            <div className="flex flex-col gap-32">
                {filteredPosts.map((post, index) => (
                    <motion.article
                        key={post.id}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className={`flex flex-col md:flex-row items-center gap-12 lg:gap-24 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                    >
                        {/* Image Side */}
                        <div className="w-full md:w-1/2 aspect-[4/3] overflow-hidden group cursor-pointer relative">
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
                        </div>

                        {/* Text Side */}
                        <div className="w-full md:w-1/2 flex flex-col justify-center items-start text-left">
                            <span className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-gray-400 mb-4 block">
                                {post.category} — {post.date}
                            </span>
                            <h2 className="font-serif text-3xl md:text-5xl text-luxury-black leading-tight mb-8 hover:opacity-70 transition-opacity cursor-pointer">
                                {post.title}
                            </h2>
                            <p className="font-sans text-sm md:text-base text-gray-500 leading-relaxed max-w-md mb-8">
                                {post.excerpt}
                            </p>
                            <Link
                                to="#"
                                className="font-sans text-[10px] uppercase tracking-widest font-bold border-b border-black pb-1 hover:border-gray-300 transition-colors flex items-center gap-2 group"
                            >
                                Read Story
                                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.article>
                ))}
            </div>

            {/* Newsletter / Footer CTA */}
            <div className="mt-48 bg-gray-50 p-24 text-center">
                <h3 className="font-serif text-3xl italic mb-6">Subscribe to our digest</h3>
                <p className="font-sans text-xs text-gray-500 tracking-widest uppercase mb-8">Market insights & architectural trends</p>
                <div className="flex flex-col md:flex-row justify-center gap-4 max-w-md mx-auto">
                    <input
                        type="email"
                        placeholder="EMAIL ADDRESS"
                        className="bg-transparent border-b border-gray-300 py-3 px-2 text-xs tracking-widest focus:outline-none focus:border-black w-full"
                    />
                    <button className="bg-luxury-black text-white px-8 py-3 text-[10px] uppercase tracking-widest font-bold hover:bg-gray-800 transition-colors">
                        Join
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default Journal;
