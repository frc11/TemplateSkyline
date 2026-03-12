import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Check, Upload, FileText, X } from 'lucide-react';

const ApplicationForm: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            if (selectedFile.type === 'application/pdf') {
                setFile(selectedFile);
            } else {
                alert('Please upload a PDF file.');
            }
        }
    };

    if (isSubmitted) {
        return (
            <motion.div 
                className="flex flex-col items-center justify-center py-12 text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <div className="w-20 h-20 bg-luxury-black rounded-full flex items-center justify-center mb-8">
                    <Check className="text-white" size={32} />
                </div>
                <h3 className="font-sans text-2xl uppercase tracking-tighter mb-4 text-luxury-black">Application Received</h3>
                <p className="font-serif text-gray-500 max-w-xs mx-auto italic">
                    Our talent acquisition team will review your CV and contact you shortly if your profile matches the role.
                </p>
            </motion.div>
        );
    }

    return (
        <div className="py-8">
            <div className="mb-12">
                <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 mb-4 block">Careers</span>
                <h2 className="font-sans text-3xl uppercase tracking-tighter text-luxury-black">Apply Now</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 gap-8">
                    <div className="relative group">
                        <input
                            type="text"
                            required
                            className="w-full bg-transparent border-b border-gray-200 py-4 font-serif text-lg outline-none focus:border-luxury-black transition-colors peer"
                            placeholder=" "
                        />
                        <label className="absolute left-0 top-4 font-serif text-gray-400 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-luxury-black peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">
                            Full Name
                        </label>
                    </div>

                    <div className="relative group">
                        <input
                            type="email"
                            required
                            className="w-full bg-transparent border-b border-gray-200 py-4 font-serif text-lg outline-none focus:border-luxury-black transition-colors peer"
                            placeholder=" "
                        />
                        <label className="absolute left-0 top-4 font-serif text-gray-400 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-luxury-black peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">
                            Email Address
                        </label>
                    </div>

                    <div className="relative">
                        <label className="font-sans text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-4 block">Attach CV (PDF)</label>
                        <div 
                            onClick={() => fileInputRef.current?.click()}
                            className={`border-2 border-dashed rounded-sm p-8 flex flex-col items-center justify-center cursor-pointer transition-all ${
                                file ? 'border-luxury-black bg-gray-50' : 'border-gray-200 hover:border-gray-400'
                            }`}
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept=".pdf"
                                className="hidden"
                            />
                            
                            {file ? (
                                <div className="flex items-center gap-4 text-luxury-black">
                                    <FileText size={24} />
                                    <div className="text-left">
                                        <p className="font-sans text-xs font-bold truncate max-w-[200px]">{file.name}</p>
                                        <p className="font-serif text-[10px] text-gray-400 italic">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                    </div>
                                    <button 
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setFile(null);
                                        }}
                                        className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <Upload className="text-gray-300 mb-4" size={32} />
                                    <p className="font-serif text-sm text-gray-500 italic">Click or drag your PDF CV here</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="pt-8">
                    <button
                        type="submit"
                        disabled={isSubmitting || !file}
                        className="w-full bg-luxury-black text-white py-6 px-12 font-sans text-xs font-bold uppercase tracking-[0.2em] relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span className={`flex items-center justify-center gap-4 transition-transform duration-500 ${isSubmitting ? '-translate-y-20' : ''}`}>
                            Submit Application
                            <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </span>
                        
                        {isSubmitting && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div 
                                    className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                />
                            </div>
                        )}
                    </button>
                    {!file && (
                        <p className="text-center font-serif text-[10px] text-gray-400 italic mt-4">
                            Please attach your CV to proceed
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
};

export default ApplicationForm;
