import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, Check } from 'lucide-react';

const InquiryForm: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate loading
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        setIsSuccess(true);
    };

    if (isSuccess) {
        return (
            <div className="text-center py-12">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600"
                >
                    <Check size={32} />
                </motion.div>
                <h3 className="font-sans text-xl uppercase tracking-widest font-bold mb-4">Message Received</h3>
                <p className="font-serif text-gray-500">
                    Our concierge team has received your inquiry and will contact you shortly to coordinate your private viewing.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="text-center mb-10">
                <h3 className="font-sans text-2xl uppercase tracking-widest font-light mb-2">Private Viewing</h3>
                <p className="font-serif text-gray-400 italic text-sm">Please provide your details below.</p>
            </div>

            <div className="space-y-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Full Name"
                        required
                        className="w-full py-3 border-b border-gray-200 text-luxury-black bg-transparent focus:border-luxury-black focus:outline-none transition-colors placeholder:text-gray-300 font-serif"
                    />
                </div>
                <div className="relative">
                    <input
                        type="email"
                        placeholder="Email Address"
                        required
                        className="w-full py-3 border-b border-gray-200 text-luxury-black bg-transparent focus:border-luxury-black focus:outline-none transition-colors placeholder:text-gray-300 font-serif"
                    />
                </div>
                <div className="relative">
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        className="w-full py-3 border-b border-gray-200 text-luxury-black bg-transparent focus:border-luxury-black focus:outline-none transition-colors placeholder:text-gray-300 font-serif"
                    />
                </div>
                <div className="relative">
                    <textarea
                        rows={3}
                        placeholder="Message (Optional)"
                        className="w-full py-3 border-b border-gray-200 text-luxury-black bg-transparent focus:border-luxury-black focus:outline-none transition-colors placeholder:text-gray-300 font-serif resize-none"
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-luxury-black text-white py-4 mt-8 flex items-center justify-center gap-3 hover:bg-gray-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed group"
            >
                {isSubmitting ? (
                    <Loader2 size={16} className="animate-spin" />
                ) : (
                    <>
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Request Access</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </>
                )}
            </button>
        </form>
    );
};

export default InquiryForm;
