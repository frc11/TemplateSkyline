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
    { icon: <Home size={20} />, title: 'Construí Patrimonio', text: 'Cada cuota incrementa tu capital neto. La propiedad es el instrumento de generación de riqueza más sólido de Argentina.' },
    { icon: <TrendingUp size={20} />, title: 'Valorización Constante', text: 'El inmobiliario premium en Tucumán ha mostrado una apreciación sostenida, sirviendo como reserva de valor frente a la inflación.' },
    { icon: <Key size={20} />, title: 'Libertad Total', text: 'Renovar, decorar y reinventar tu espacio según tus términos — es tuyo, sin condiciones.' },
    { icon: <BarChart3 size={20} />, title: 'Protección frente a la Inflación', text: 'Los inmuebles en dólares históricamente han preservado el poder adquisitivo mejor que cualquier otro activo local.' },
  ];

  const quotes = [
    { text: 'Noventa por ciento de todos los millonarios lograron su fortuna a través de la propiedad inmobiliaria.', author: 'Andrew Carnegie' },
    { text: 'El mejor momento para comprar una propiedad siempre fue hace cinco años.', author: 'Ray Brown' },
    { text: 'Los bienes raíces no pueden perderse, robarse, ni llevarse. Comprados con sentido común, son una de las inversiones más seguras del mundo.', author: 'Franklin D. Roosevelt' },
  ];

  return (
    <section className="py-32 px-6 md:px-24 bg-white border-t border-gray-100 relative z-10">
      {/* Header */}
      <Fade>
        <span className="font-sans text-xs font-bold uppercase tracking-architect text-gray-400">Por qué Comprar</span>
        <h2 className="font-sans text-4xl md:text-5xl uppercase tracking-tight font-light text-luxury-black mt-4 mb-2">
          El argumento a favor de <br /><span className="font-serif italic text-gray-400 lowercase">ser propietario</span>
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
            <p className="font-sans text-xs uppercase tracking-widest text-gray-400 mb-2">¿Listo para dar el paso?</p>
            <h3 className="font-serif text-2xl text-luxury-black">Comenzá tu búsqueda hoy.</h3>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => openModal()}
            className="flex items-center gap-3 px-8 py-4 bg-luxury-black text-white font-sans text-xs uppercase tracking-widest hover:bg-gray-900 transition-colors"
          >
            <span>Agendar una Visita Privada</span>
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
    'Sin gastos de mantenimiento — todo está a cargo del propietario',
    'Flexibilidad total para mudarse cuando tu vida lo requiera',
    'Sin exposición a caídas del mercado ni devaluaciones del activo',
    'Vivir en barrios premium a los que no podrías acceder comprando',
    'Sin capital inmovilizado — invertí la diferencia donde más rinda',
  ];
  const cons = [
    'Los alquileres no generan patrimonio propio',
    'Las renovaciones de contrato pueden traer aumentos imprevistos',
    'Las opciones de personalización y reforma son limitadas',
    'El costo total a largo plazo suele superar al de la compra en 10+ años',
    'Quedás sujeto a las decisiones del propietario sobre el inmueble',
  ];

  const lifestylePerks = [
    { title: 'Conserjería Curada', text: 'Edificios de servicio completo con portería, valet y equipos de mantenimiento permanente.' },
    { title: 'Sin Compromiso', text: 'Mudáte cuando tu carrera, tu familia o simplemente tus ganas de cambio lo pidan.' },
    { title: 'Ubicaciones Prime', text: 'Alquilá en los barrios más exclusivos de Tucumán por el valor de una cuota en otro lugar.' },
    { title: 'Opciones Amobladas', text: 'Unidades llave en mano con mobiliario de diseño incluido — llegá con una valija.' },
  ];

  return (
    <section className="py-32 px-6 md:px-24 bg-white border-t border-gray-100 relative z-10">
      <Fade>
        <span className="font-sans text-xs font-bold uppercase tracking-architect text-gray-400">Guía de Alquiler</span>
        <h2 className="font-sans text-4xl md:text-5xl uppercase tracking-tight font-light text-luxury-black mt-4">
          La guía honesta <br /><span className="font-serif italic text-gray-400 lowercase">sobre el alquiler</span>
        </h2>
      </Fade>

      {/* Pros & Cons */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-16">
        <Fade delay={0.1}>
          <div>
            <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-luxury-black mb-8 flex items-center gap-2">
              <CheckCircle2 size={14} className="text-green-500" /> Ventajas
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
              <XCircle size={14} className="text-red-400" /> Consideraciones
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
          <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-gray-400 mb-12">Estilo de Vida en Alquiler Premium</h3>
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
            &ldquo;Alquilar no es un premio de consolación. Para la persona correcta en el momento preciso, es la decisión financiera y de estilo de vida más inteligente disponible.&rdquo;
          </p>
          <span className="font-sans text-[10px] uppercase tracking-widest text-gray-400 mt-4 inline-block">Skyline Estates — Asesoramiento</span>
        </div>
      </Fade>
    </section>
  );
};

/* ─── NEW DEVELOPMENTS SECTION ────────────────────────────── */
const NewDevContent: React.FC = () => {
  const zones = [
    {
      name: 'Yerba Buena',
      growth: '+42%',
      years: '5 años',
      yield: '5.1%',
      bar: 85,
      note: 'Epicentro del crecimiento residencial premium en Tucumán. Demanda comercial y habitacional en máximos históricos.',
    },
    {
      name: 'Norte de Tucumán',
      growth: '+31%',
      years: '5 años',
      yield: '4.3%',
      bar: 60,
      note: 'Proyectos de nueva construcción en expansión. Apreciación sostenida impulsada por infraestructura y conectividad.',
    },
    {
      name: 'Centro Histórico',
      growth: '+28%',
      years: '5 años',
      yield: '3.8%',
      bar: 52,
      note: 'Recuperación y renovación urbana en marcha. Alto potencial de renta en zonas céntricas.',
    },
    {
      name: 'San Pablo / Tafí Viejo',
      growth: '+37%',
      years: '5 años',
      yield: '4.8%',
      bar: 73,
      note: 'Corredor de crecimiento emergente. Una de las zonas residenciales de mayor proyección del noroeste argentino.',
    },
  ];

  const insights = [
    { title: 'Compra en Pozo', text: 'Los precios de preventa suelen estar un 12–18% por debajo del valor al completarse, generando equity inmediato.' },
    { title: 'Ventaja de Primera Etapa', text: 'Los inversores tempranos aseguran los precios más bajos. A medida que avanza la obra, los valores suben con cada fase.' },
    { title: 'Apreciación de Capital', text: 'Nuevos desarrollos en zonas prime históricamente superan al mercado de reventa por 2–3x en períodos de 10 años.' },
    { title: 'Protección Dolarizada', text: 'Los inmuebles en USD ofrecen una cobertura natural contra la inflación y la volatilidad cambiaria argentina.' },
  ];

  return (
    <section className="py-32 px-6 md:px-24 bg-white border-t border-gray-100 relative z-10">
      {/* Header */}
      <Fade>
        <span className="font-sans text-xs font-bold uppercase tracking-architect text-gray-400">Inteligencia de Inversión</span>
        <h2 className="font-sans text-4xl md:text-5xl uppercase tracking-tight font-light text-luxury-black mt-4">
          Hacia dónde va <br /><span className="font-serif italic text-gray-400 lowercase">el valor</span>
        </h2>
      </Fade>

      {/* Zone charts */}
      <div className="mt-20">
        <Fade>
          <div className="flex items-center gap-3 mb-12">
            <MapPin size={14} className="text-gray-400" />
            <span className="font-sans text-xs font-bold uppercase tracking-widest text-gray-400">Apreciación a 5 Años por Zona</span>
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
                      <p className="font-sans text-[10px] uppercase tracking-widest text-gray-400">{z.years} de crecimiento</p>
                    </div>
                    <div className="text-center">
                      <p className="font-sans text-lg font-bold text-luxury-black">{z.yield}</p>
                      <p className="font-sans text-[10px] uppercase tracking-widest text-gray-400">renta promedio</p>
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
          <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-gray-400 mb-12">Claves para el Inversor</h3>
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
            <p className="font-sans text-[10px] uppercase tracking-widest text-gray-400 mb-3">Perspectiva 2025–2030</p>
            <h3 className="font-serif text-3xl text-white leading-snug">
              Los nuevos desarrollos premium en Tucumán <br />
              <span className="italic text-gray-300">proyectan una apreciación del 30–50%</span> hacia 2030.
            </h3>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="shrink-0 flex items-center gap-3 px-8 py-4 bg-white text-luxury-black font-sans text-xs uppercase tracking-widest hover:bg-gray-100 transition-colors"
          >
            <span>Obtener Informe de Inversión</span>
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
