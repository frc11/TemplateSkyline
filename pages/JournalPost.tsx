import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Tag } from 'lucide-react';
import { JOURNAL_POSTS } from '../data/journal';
import Footer from '../components/Layout/Footer';

const JournalPost: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const post = JOURNAL_POSTS.find(p => p.slug === slug);

    if (!post) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-12">
                <h2 className="font-sans text-2xl uppercase tracking-widest mb-4">Artículo No Encontrado</h2>
                <Link to="/journal" className="text-sm border-b border-black pb-1 hover:opacity-50 transition-opacity">
                    Volver a la Revista
                </Link>
            </div>
        );
    }

    return (
        <motion.div
            className="bg-white min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
            {/* Hero */}
            <header className="relative h-[70vh] overflow-hidden">
                <motion.img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Back link */}
                <Link
                    to="/journal"
                    className="absolute top-8 left-8 flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-sans text-[10px] uppercase tracking-[0.25em] font-bold">Revista</span>
                </Link>

                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-12 md:p-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="flex items-center gap-6 mb-6">
                            <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-white/70 border border-white/30 px-3 py-1">
                                {post.category}
                            </span>
                            <span className="font-sans text-[10px] uppercase tracking-widest text-white/50 flex items-center gap-2">
                                <Clock size={10} />
                                {post.readTime}
                            </span>
                            <span className="font-sans text-[10px] uppercase tracking-widest text-white/50">{post.date}</span>
                        </div>
                        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white leading-tight max-w-4xl">
                            {post.title}
                        </h1>
                    </motion.div>
                </div>
            </header>

            {/* Article Body */}
            <div className="max-w-3xl mx-auto px-8 py-24">
                {/* Lede */}
                <motion.p
                    className="font-serif text-xl md:text-2xl text-gray-600 leading-relaxed mb-16 italic border-l-2 border-gray-200 pl-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                >
                    {post.excerpt}
                </motion.p>

                {/* Body sections */}
                <div className="space-y-10">
                    {post.body.map((block, idx) => {
                        if (block.type === 'pullquote') {
                            return (
                                <motion.blockquote
                                    key={idx}
                                    className="border-l-4 border-luxury-black pl-8 py-4 my-16"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <p className="font-serif text-xl md:text-2xl text-luxury-black leading-relaxed italic">
                                        {block.content}
                                    </p>
                                </motion.blockquote>
                            );
                        }
                        if (block.type === 'heading') {
                            return (
                                <motion.h2
                                    key={idx}
                                    className="font-sans text-sm uppercase tracking-[0.3em] font-bold text-luxury-black pt-8"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {block.content}
                                </motion.h2>
                            );
                        }
                        return (
                            <motion.p
                                key={idx}
                                className="font-serif text-lg text-gray-600 leading-[1.9]"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                            >
                                {block.content}
                            </motion.p>
                        );
                    })}
                </div>

                {/* Bottom navigation */}
                <div className="mt-24 pt-12 border-t border-gray-100 flex items-center justify-between">
                    <Link
                        to="/journal"
                        className="flex items-center gap-3 group font-sans text-[10px] uppercase tracking-[0.25em] font-bold text-gray-400 hover:text-luxury-black transition-colors"
                    >
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        Volver a la Revista
                    </Link>
                    <div className="flex items-center gap-2 text-gray-300">
                        <Tag size={12} />
                        <span className="font-sans text-[10px] uppercase tracking-widest">{post.category}</span>
                    </div>
                </div>
            </div>

            <Footer />
        </motion.div>
    );
};

export default JournalPost;
