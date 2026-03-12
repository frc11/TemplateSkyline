import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { PROPERTIES } from '../data/properties';

interface HeroProps {
  onExplore?: () => void;
}

const BUTTON_RADIUS = 64;
const FORM_HEIGHT = 130;
const SLIDE_INTERVAL = 5500; // ms between slides

/** Fisher-Yates shuffle — returns a new shuffled array */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Stops a moving point at the first intersection with a Minkowski-expanded AABB.
 */
function stopAtRect(
  px: number, py: number,
  cx: number, cy: number,
  ex: number, ey: number, ew: number, eh: number
): { x: number; y: number } {
  if (cx < ex || cx > ex + ew || cy < ey || cy > ey + eh) {
    return { x: cx, y: cy };
  }
  const dx = cx - px;
  const dy = cy - py;
  let tEntry = 0;
  if (Math.abs(dx) > 0.0001) {
    const tx1 = (ex - px) / dx;
    const tx2 = (ex + ew - px) / dx;
    tEntry = Math.max(tEntry, Math.min(tx1, tx2));
  }
  if (Math.abs(dy) > 0.0001) {
    const ty1 = (ey - py) / dy;
    const ty2 = (ey + eh - py) / dy;
    tEntry = Math.max(tEntry, Math.min(ty1, ty2));
  }
  tEntry = Math.max(0, Math.min(1, tEntry - 0.001));
  return { x: px + tEntry * dx, y: py + tEntry * dy };
}

const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  // --- Slideshow state ---
  const [shuffled] = useState(() => shuffle(PROPERTIES));
  const [slideIdx, setSlideIdx] = useState(0);
  const [hintVisible, setHintVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const currentProp = shuffled[slideIdx];

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setSlideIdx(i => (i + 1) % shuffled.length);
    }, SLIDE_INTERVAL);
  }, [shuffled.length]);

  // Auto-advance
  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  // Auto-hide keyboard hint after 4 s
  // (no longer used — hint hides only on first keypress)

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setSlideIdx(i => (i + 1) % shuffled.length);
        setHintVisible(false);
        startTimer();
      } else if (e.key === 'ArrowLeft') {
        setSlideIdx(i => (i - 1 + shuffled.length) % shuffled.length);
        setHintVisible(false);
        startTimer();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [shuffled.length, startTimer]);

  // --- Magnetic button ---
  const mouseX = useMotionValue(300);
  const mouseY = useMotionValue(300);
  const springConfig = { damping: 28, stiffness: 130, mass: 0.9 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const cr = containerRef.current.getBoundingClientRect();
    const W = cr.width;
    const H = cr.height;
    const px = springX.get() + BUTTON_RADIUS;
    const py = springY.get() + BUTTON_RADIUS;
    let cx = Math.max(BUTTON_RADIUS, Math.min(W - BUTTON_RADIUS, e.clientX - cr.left));
    let cy = Math.max(BUTTON_RADIUS, Math.min(H - FORM_HEIGHT - BUTTON_RADIUS, e.clientY - cr.top));
    // Sidebar left edge
    if (cx < BUTTON_RADIUS) cx = BUTTON_RADIUS;
    // Title element
    if (titleRef.current) {
      const tr = titleRef.current.getBoundingClientRect();
      const ex = (tr.left - cr.left) - BUTTON_RADIUS;
      const ey = (tr.top - cr.top) - BUTTON_RADIUS;
      const ew = tr.width + BUTTON_RADIUS * 2;
      const eh = tr.height + BUTTON_RADIUS * 2;
      const s = stopAtRect(px, py, cx, cy, ex, ey, ew, eh);
      cx = s.x; cy = s.y;
    }
    mouseX.set(cx - BUTTON_RADIUS);
    mouseY.set(cy - BUTTON_RADIUS);
  }, [mouseX, mouseY, springX, springY]);

  // Human-readable price label
  const priceLabel = currentProp.status === 'rent' ? currentProp.price : currentProp.price;
  const statusLabel = currentProp.isNewDevelopment ? 'New Development' : currentProp.status === 'rent' ? 'For Rent' : 'For Sale';

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full overflow-hidden bg-luxury-black cursor-none"
    >
      {/* Curtain Reveal */}
      <motion.div
        initial={{ height: '100%' }}
        animate={{ height: '0%' }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
        className="absolute bottom-0 left-0 right-0 z-30 bg-[#1a1a1a]"
      />

      {/* Dynamic Background Slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="sync">
          <motion.img
            key={currentProp.id}
            src={currentProp.image}
            alt={currentProp.title}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 w-full h-full object-cover opacity-85"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
      </div>

      {/* Subtle property info — bottom-right, very discreet */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentProp.id + '-info'}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="absolute bottom-[135px] right-8 z-10 text-right pointer-events-none select-none"
        >
          <p className="font-sans text-[9px] uppercase tracking-[0.25em] text-white/40 mb-1">
            {statusLabel} · {currentProp.type}
          </p>
          <p className="font-serif text-sm text-white/60 leading-tight">{currentProp.location}</p>
          <p className="font-sans text-[10px] tracking-wider text-white/40 mt-0.5">{priceLabel}</p>
        </motion.div>
      </AnimatePresence>

      {/* Progress dots — always centered, never moves */}
      <div className="absolute bottom-[138px] left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 pointer-events-none">
        {shuffled.map((_, i) => (
          <div
            key={i}
            className={`h-[1px] transition-all duration-700 ${i === slideIdx ? 'w-8 bg-white/70' : 'w-3 bg-white/25'}`}
          />
        ))}
      </div>

      {/* Keyboard hint — independent, positioned right of dots, no effect on dots */}
      <AnimatePresence>
        {hintVisible && (
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16, transition: { duration: 0.5, ease: 'easeIn' } }}
            transition={{ duration: 0.8, delay: 2.0 }}
            className="absolute bottom-[130px] z-10 flex items-center gap-2 pointer-events-none"
            style={{ left: 'calc(50% + 70px)' }}
          >
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-white/35">Browse with</span>
            <span className="font-sans text-[10px] text-white/50 border border-white/25 px-2 py-1 leading-none">←</span>
            <span className="font-sans text-[10px] text-white/50 border border-white/25 px-2 py-1 leading-none">→</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Title — ref'd for collision */}
      <div
        ref={titleRef}
        className="absolute bottom-24 md:bottom-32 left-12 md:left-24 z-10 pointer-events-none select-none"
      >
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="font-sans text-[clamp(4rem,10vw,11rem)] font-bold text-white leading-[0.85] tracking-tighter"
          >
            SKYLINE
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.95, ease: [0.76, 0, 0.24, 1] }}
            className="font-sans text-[clamp(4rem,10vw,11rem)] font-bold text-white pr-2 leading-[0.85] tracking-tighter"
          >
            ESTATES
          </motion.h1>
        </div>
      </div>

      {/* Magnetic Button */}
      <motion.button
        onClick={onExplore}
        style={{ x: springX, y: springY }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5, ease: 'easeOut' }}
        className="absolute top-0 left-0 w-32 h-32 rounded-full bg-white text-luxury-black z-20 flex items-center justify-center shadow-2xl overflow-hidden group"
      >
        <div className="relative z-10 flex flex-col items-center">
          <span className="uppercase tracking-widest text-xs font-bold group-hover:tracking-[0.3em] transition-all duration-300">
            Explore
          </span>
        </div>
        <div className="absolute inset-0 bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.button>
    </section>
  );
};

export default Hero;