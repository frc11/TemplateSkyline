import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, TrendingUp, ArrowUpRight, Home, Key, BarChart3, MapPin } from 'lucide-react';
import InteractiveDetail from './InteractiveDetail';
import EditorialGallery from './EditorialGallery';
import PanoramaViewer from './PanoramaViewer';
import { useModal } from '../context/ModalContext';

interface SectionContentProps {
  section: { status: string; collection: string };
}

/* ─── FADE-IN WRAPPER ─────────────────────────────────────── */
const Fade: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children, delay = 0, className = ''
}) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ─── BUY SECTION ─────────────────────────────────────────── */
const BuyContent: React.FC = () => {
  const { openModal } = useModal();
  const reasons = [
    { icon: <Home size={20} />, title: 'Build Equity', text: 'Every payment compounds your net worth. Owning is the original wealth-building instrument.' },
    { icon: <TrendingUp size={20} />, title: 'Asset Appreciation', text: 'Prime real estate in New York has averaged 6–9% annual appreciation over the last decade.' },
    { icon: <Key size={20} />, title: 'Total Freedom', text: 'Renovate, decorate, or reinvent the space on your terms — it is yours, unconditionally.' },
    { icon: <BarChart3 size={20} />, title: 'Leverage & Tax Benefits', text: 'Mortgage interest deductions and 1031 exchanges reduce your effective cost of ownership.' },
  ];

  const quotes = [
    { text: 'Ninety percent of all millionaires become so through owning real estate.', author: 'Andrew Carnegie' },
    { text: 'The best time to buy a home is always five years ago.', author: 'Ray Brown' },
    { text: 'Real estate cannot be lost or stolen, nor can it be carried away.', author: 'Franklin D. Roosevelt' },
  ];

  return (
    <section className="py-32 px-6 md:px-24 bg-white border-t border-gray-100 relative z-10">
      {/* Header */}
      <Fade>
        <span className="font-sans text-xs font-bold uppercase tracking-architect text-gray-400">Why Own</span>
        <h2 className="font-sans text-4xl md:text-5xl uppercase tracking-tight font-light text-luxury-black mt-4 mb-2">
          The case for <br /><span className="font-serif italic text-gray-400 lowercase">ownership</span>
        </h2>
      </Fade>

      {/* Reason grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
        {reasons.map((r, i) => (
          <Fade key={r.title} delay={i * 0.1}>
            <div className="border-t border-gray-200 pt-8 group">
              <div className="w-10 h-10 flex items-center justify-center bg-luxury-black text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                {r.icon}
              </div>
              <h3 className="font-sans text-sm font-bold uppercase tracking-widest text-luxury-black mb-3">{r.title}</h3>
              <p className="font-serif text-sm text-gray-500 leading-relaxed">{r.text}</p>
            </div>
          </Fade>
        ))}
      </div>

      {/* Pull quotes */}
      <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12">
        {quotes.map((q, i) => (
          <Fade key={i} delay={i * 0.12}>
            <div className={`relative pl-6 border-l-2 ${i === 1 ? 'border-luxury-black' : 'border-gray-200'}`}>
              <p className="font-serif text-xl md:text-2xl text-luxury-black leading-snug mb-6 italic">
                &ldquo;{q.text}&rdquo;
              </p>
              <span className="font-sans text-[10px] uppercase tracking-widest text-gray-400">— {q.author}</span>
            </div>
          </Fade>
        ))}
      </div>

      {/* CTA strip */}
      <Fade delay={0.3} className="mt-24">
        <div className="flex flex-col md:flex-row items-center justify-between border-y border-gray-100 py-10 gap-6">
          <div>
            <p className="font-sans text-xs uppercase tracking-widest text-gray-400 mb-2">Ready to take the step?</p>
            <h3 className="font-serif text-2xl text-luxury-black">Start your journey today.</h3>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={openModal}
            className="flex items-center gap-3 px-8 py-4 bg-luxury-black text-white font-sans text-xs uppercase tracking-widest hover:bg-gray-900 transition-colors"
          >
            <span>Schedule a Private Viewing</span>
            <ArrowUpRight size={14} />
          </motion.button>
        </div>
      </Fade>
    </section>
  );
};

/* ─── RENT SECTION ────────────────────────────────────────── */
const RentContent: React.FC = () => {
  const pros = [
    'Zero maintenance costs — everything is handled',
    'Complete flexibility to relocate when your life demands it',
    'No exposure to market downturns or property devaluations',
    'Live in neighborhoods you couldn\'t otherwise afford to buy in',
    'No capital locked in — invest the difference elsewhere',
  ];
  const cons = [
    'Rent payments build no equity for you',
    'Lease renewals can bring unpredictable rent increases',
    'Customisation and renovation options are limited',
    'Long term cost often exceeds ownership when held 10+ years',
    'You are subject to the landlord\'s decisions about the property',
  ];

  const lifestylePerks = [
    { title: 'Curated Concierge', text: 'Full-service buildings with doormen, valet, and 24/7 maintenance teams.' },
    { title: 'No Commitment', text: 'Move when your career, family, or simply your mood calls for a change of scenery.' },
    { title: 'Premium Locations', text: 'Rent in a Tribeca penthouse for the price of a mortgage in a lesser district.' },
    { title: 'Furnished Options', text: 'Turnkey residences with designer furniture included — arrive with a suitcase.' },
  ];

  return (
    <section className="py-32 px-6 md:px-24 bg-white border-t border-gray-100 relative z-10">
      <Fade>
        <span className="font-sans text-xs font-bold uppercase tracking-architect text-gray-400">Renting Guide</span>
        <h2 className="font-sans text-4xl md:text-5xl uppercase tracking-tight font-light text-luxury-black mt-4">
          The honest <br /><span className="font-serif italic text-gray-400 lowercase">guide to renting</span>
        </h2>
      </Fade>

      {/* Pros & Cons */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-16">
        <Fade delay={0.1}>
          <div>
            <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-luxury-black mb-8 flex items-center gap-2">
              <CheckCircle2 size={14} className="text-green-500" /> Advantages
            </h3>
            <ul className="space-y-5">
              {pros.map((p, i) => (
                <li key={i} className="flex items-start gap-4 border-b border-gray-50 pb-5">
                  <span className="text-[10px] font-sans font-bold text-gray-300 pt-px leading-none mt-1">{String(i + 1).padStart(2, '0')}</span>
                  <p className="font-serif text-sm text-gray-700 leading-relaxed">{p}</p>
                </li>
              ))}
            </ul>
          </div>
        </Fade>

        <Fade delay={0.2}>
          <div>
            <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-luxury-black mb-8 flex items-center gap-2">
              <XCircle size={14} className="text-red-400" /> Considerations
            </h3>
            <ul className="space-y-5">
              {cons.map((c, i) => (
                <li key={i} className="flex items-start gap-4 border-b border-gray-50 pb-5">
                  <span className="text-[10px] font-sans font-bold text-gray-300 pt-px leading-none mt-1">{String(i + 1).padStart(2, '0')}</span>
                  <p className="font-serif text-sm text-gray-700 leading-relaxed">{c}</p>
                </li>
              ))}
            </ul>
          </div>
        </Fade>
      </div>

      {/* Lifestyle perks */}
      <div className="mt-32">
        <Fade>
          <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-gray-400 mb-12">Luxury Rental Lifestyle</h3>
        </Fade>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {lifestylePerks.map((lp, i) => (
            <Fade key={lp.title} delay={i * 0.1}>
              <div className="bg-gray-50 p-8 hover:bg-luxury-black hover:text-white group transition-colors duration-500">
                <h4 className="font-sans text-xs font-bold uppercase tracking-widest mb-4 group-hover:text-white transition-colors">{lp.title}</h4>
                <p className="font-serif text-sm text-gray-500 leading-relaxed group-hover:text-gray-300 transition-colors">{lp.text}</p>
              </div>
            </Fade>
          ))}
        </div>
      </div>

      {/* Summary verdict */}
      <Fade delay={0.2} className="mt-24">
        <div className="border-l-2 border-luxury-black pl-8 max-w-2xl">
          <p className="font-serif text-xl text-luxury-black leading-relaxed italic">
            &ldquo;Renting is not a consolation prize. For the right person at the right moment, it is the most intelligent financial and lifestyle decision available.&rdquo;
          </p>
          <span className="font-sans text-[10px] uppercase tracking-widest text-gray-400 mt-4 inline-block">Skyline Estates Advisory</span>
        </div>
      </Fade>
    </section>
  );
};

/* ─── NEW DEVELOPMENTS SECTION ────────────────────────────── */
const NewDevContent: React.FC = () => {
  const zones = [
    {
      name: 'Hudson Yards',
      growth: '+38%',
      years: '5 yr',
      yield: '4.8%',
      bar: 78,
      note: 'Epicenter of NYC\'s westside expansion. Commercial and residential demand at record highs.',
    },
    {
      name: 'Brooklyn Heights',
      growth: '+27%',
      years: '5 yr',
      yield: '4.1%',
      bar: 57,
      note: 'Historic charm with modern infrastructure. Steady appreciation driven by proximity to Manhattan.',
    },
    {
      name: 'Long Island City',
      growth: '+44%',
      years: '5 yr',
      yield: '5.2%',
      bar: 90,
      note: 'Post-Amazon effect continues. One of the fastest-growing residential zones in the tri-state.',
    },
    {
      name: 'Lower East Side',
      growth: '+21%',
      years: '5 yr',
      yield: '3.9%',
      bar: 44,
      note: 'Cultural revitalization well underway. High short-term rental yield potential.',
    },
  ];

  const insights = [
    { title: 'Buy Off-Plan', text: 'Pre-construction pricing is typically 12–18% below market value at completion, creating instant embedded equity.' },
    { title: 'Phase 1 Advantage', text: 'Early-stage investors lock in the lowest prices. As construction progresses, prices rise with each new phase release.' },
    { title: 'Capital Appreciation', text: 'New developments in prime zones have historically outperformed resale properties by 2–3x over 10-year periods.' },
    { title: 'Tax Incentives', text: 'Many new construction projects qualify for 421-a tax abatements, reducing effective holding costs for up to 25 years.' },
  ];

  return (
    <section className="py-32 px-6 md:px-24 bg-white border-t border-gray-100 relative z-10">
      {/* Header */}
      <Fade>
        <span className="font-sans text-xs font-bold uppercase tracking-architect text-gray-400">Investment Intelligence</span>
        <h2 className="font-sans text-4xl md:text-5xl uppercase tracking-tight font-light text-luxury-black mt-4">
          Where value <br /><span className="font-serif italic text-gray-400 lowercase">is heading</span>
        </h2>
      </Fade>

      {/* Zone charts */}
      <div className="mt-20">
        <Fade>
          <div className="flex items-center gap-3 mb-12">
            <MapPin size={14} className="text-gray-400" />
            <span className="font-sans text-xs font-bold uppercase tracking-widest text-gray-400">5-Year Appreciation by Zone</span>
          </div>
        </Fade>

        <div className="space-y-6">
          {zones.map((z, i) => (
            <Fade key={z.name} delay={i * 0.1}>
              <div className="group border border-gray-100 hover:border-luxury-black transition-colors duration-400 p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  {/* Zone info */}
                  <div className="md:w-48 shrink-0">
                    <h3 className="font-sans text-sm font-bold uppercase tracking-widest text-luxury-black">{z.name}</h3>
                    <p className="font-serif text-xs text-gray-400 mt-1 italic">{z.note}</p>
                  </div>

                  {/* Bar */}
                  <div className="flex-1">
                    <div className="h-[3px] bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${z.bar}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full bg-luxury-black rounded-full"
                      />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex gap-8 shrink-0">
                    <div className="text-center">
                      <p className="font-sans text-lg font-bold text-luxury-black">{z.growth}</p>
                      <p className="font-sans text-[10px] uppercase tracking-widest text-gray-400">{z.years} growth</p>
                    </div>
                    <div className="text-center">
                      <p className="font-sans text-lg font-bold text-luxury-black">{z.yield}</p>
                      <p className="font-sans text-[10px] uppercase tracking-widest text-gray-400">avg yield</p>
                    </div>
                  </div>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </div>

      {/* Investment insights */}
      <div className="mt-32">
        <Fade>
          <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-gray-400 mb-12">Key Investment Insights</h3>
        </Fade>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {insights.map((ins, i) => (
            <Fade key={ins.title} delay={i * 0.1}>
              <div className="border-t-2 border-luxury-black pt-8">
                <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-luxury-black mb-3">{ins.title}</h4>
                <p className="font-serif text-sm text-gray-500 leading-relaxed">{ins.text}</p>
              </div>
            </Fade>
          ))}
        </div>
      </div>

      {/* Bottom projections callout */}
      <Fade delay={0.2} className="mt-24">
        <div className="bg-luxury-black text-white p-12 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="font-sans text-[10px] uppercase tracking-widest text-gray-400 mb-3">2025–2030 Outlook</p>
            <h3 className="font-serif text-3xl text-white leading-snug">
              Prime NYC new developments are <br />
              <span className="italic text-gray-300">projected to appreciate 30–50%</span> by 2030.
            </h3>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="shrink-0 flex items-center gap-3 px-8 py-4 bg-white text-luxury-black font-sans text-xs uppercase tracking-widest hover:bg-gray-100 transition-colors"
          >
            <span>Get Investment Report</span>
            <ArrowUpRight size={14} />
          </motion.button>
        </div>
      </Fade>
    </section>
  );
};

/* ─── MAIN EXPORT ─────────────────────────────────────────── */
const SectionContent: React.FC<SectionContentProps> = ({ section }) => {
  // Penthouse Collection → keep the rich editorial content
  if (section.collection === 'penthouses') {
    return (
      <>
        <InteractiveDetail />
        <EditorialGallery />
        <PanoramaViewer />
      </>
    );
  }

  if (section.status === 'rent') return <RentContent />;
  if (section.collection === 'new-developments') return <NewDevContent />;

  // Default: "sale" or any other modes → ownership motivation
  return <BuyContent />;
};

export default SectionContent;
