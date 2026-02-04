import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface GalleryItemProps {
  index: string;
  title: string;
  specs: string;
  description: string;
  src: string;
  orientation: 'landscape' | 'portrait';
  align: 'left' | 'right';
  speed?: number;
}

const ParallaxImage = ({ src, speed = 1, className }: { src: string, speed?: number, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Map scroll progress to Y translation. 
  // speed 1 = moderate movement. Higher = faster.
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", `${10 * speed}%`]);

  return (
    <div ref={ref} className={`overflow-hidden relative ${className}`}>
      <motion.div style={{ y }} className="w-full h-[120%] -mt-[10%]">
        <img 
            src={src} 
            alt="Interior Detail" 
            className="w-full h-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-700 ease-out"
        />
      </motion.div>
    </div>
  );
};

const EditorialGallery: React.FC = () => {
  return (
    <section className="py-40 px-6 md:px-24 bg-white relative z-10 overflow-hidden">
      
      {/* Header */}
      <div className="flex flex-col items-center mb-32">
        <span className="font-sans text-xs font-bold uppercase tracking-architect text-gray-400 mb-4">
            The Collection
        </span>
        <h2 className="font-serif text-4xl md:text-5xl text-luxury-black text-center">
            Designed for life <br/> <span className="italic text-gray-400">lived beautifully.</span>
        </h2>
      </div>

      <div className="space-y-40">
        
        {/* ITEM 01 - Landscape Left */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7 relative">
                <ParallaxImage 
                    src="https://images.unsplash.com/photo-1556912173-3db9963ee790?q=80&w=2070&auto=format&fit=crop" 
                    className="aspect-[16/10]"
                    speed={1.5}
                />
            </div>
            <div className="md:col-span-4 md:col-start-9 flex flex-col justify-center">
                <h3 className="font-sans text-[8rem] md:text-[10rem] leading-none font-bold text-gray-50 select-none -ml-4">
                    01
                </h3>
                <div className="border-t border-luxury-black pt-6 mt-2">
                    <h4 className="font-serif text-2xl text-luxury-black mb-2">Culinary Sanctuary</h4>
                    <p className="font-sans text-xs text-gray-400 uppercase tracking-widest mb-6">
                        Poliform Alea Pro / Gaggenau 400
                    </p>
                    <p className="font-serif text-gray-600 leading-relaxed text-sm max-w-xs">
                        A kitchen designed not just for cooking, but for performance. Featuring matte charcoal cabinetry and integrated lighting systems that respond to the time of day.
                    </p>
                </div>
            </div>
        </div>

        {/* ITEM 02 - Portrait Right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
            <div className="md:col-span-4 md:col-start-2 flex flex-col justify-end text-right md:text-left order-2 md:order-1">
                 <h3 className="font-sans text-[8rem] md:text-[10rem] leading-none font-bold text-gray-50 select-none -ml-4 md:ml-0 md:-mr-4 md:text-right">
                    02
                </h3>
                <div className="border-t border-luxury-black pt-6 mt-2">
                    <h4 className="font-serif text-2xl text-luxury-black mb-2">Private Spa</h4>
                    <p className="font-sans text-xs text-gray-400 uppercase tracking-widest mb-6">
                        Travertine Silver / Rain Sky
                    </p>
                    <p className="font-serif text-gray-600 leading-relaxed text-sm max-w-xs ml-auto md:ml-0">
                         The primary bath is wrapped in silver travertine slabs, matched by book. The freestanding tub is positioned to capture the skyline while maintaining absolute privacy.
                    </p>
                </div>
            </div>
            <div className="md:col-span-6 md:col-start-7 order-1 md:order-2">
                <ParallaxImage 
                    src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1200&auto=format&fit=crop" 
                    className="aspect-[3/4] w-full"
                    speed={2}
                />
            </div>
        </div>

        {/* ITEM 03 - Wide Center Offset */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-8 md:col-start-3">
                 <ParallaxImage 
                    src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974&auto=format&fit=crop" 
                    className="aspect-[21/9]"
                    speed={1.2}
                />
            </div>
            <div className="md:col-span-3 md:col-start-9 md:-ml-24 relative z-10 bg-white p-8 md:p-12 shadow-xl -mt-24 md:mt-0">
                <div className="flex items-baseline justify-between mb-4 border-b border-gray-100 pb-4">
                    <span className="font-sans text-4xl font-bold text-gray-200">03</span>
                    <span className="font-sans text-[10px] uppercase tracking-widest text-luxury-black">The Lounge</span>
                </div>
                <p className="font-serif text-gray-600 leading-relaxed text-sm">
                    An open expanse designed for hosting. The boundaries between interior and exterior dissolve with zero-threshold sliding glass walls.
                </p>
            </div>
        </div>

      </div>
    </section>
  );
};

export default EditorialGallery;