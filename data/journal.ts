export interface JournalPost {
    id: string;
    category: string;
    title: string;
    date: string;
    excerpt: string;
    coverImage: string;
    slug: string;
    readTime: string;
    body: {
        type: 'paragraph' | 'pullquote' | 'heading';
        content: string;
    }[];
}

export const JOURNAL_POSTS: JournalPost[] = [
    /* ─── Architecture ─── */
    {
        id: '1',
        category: 'Architectura',
        title: 'El Regreso del Brutalismo en el Lujo Moderno',
        date: '12 de octubre de 2024',
        readTime: '6 min de lectura',
        excerpt: 'Hormigón visto y terciopelo. Cómo la nueva ola del diseño arquitectónico redefine el confort a través de la honestidad estructural y las formas geométricas audaces.',
        coverImage: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=2671&auto=format&fit=crop',
        slug: 'return-of-brutalism',
        body: [
            { type: 'paragraph', content: 'Durante décadas, el Brutalismo fue la arquitectura de las instituciones: frío, imponente, sin concesiones. Hoy, una nueva generación de diseñadores rescata ese vocabulario crudo y lo traduce en residencias privadas de extraordinaria intimidad. La paradoja es irresistible: refugios construidos con los materiales más honestos de la tierra.' },
            { type: 'pullquote', content: '"El hormigón no miente. Lleva la marca de cada etapa de su construcción: la veta del encofrado, el ritmo del vertido. Esa honestidad es lo que buscan quienes aspiran al verdadero lujo."' },
            { type: 'heading', content: 'La Estructura como Ornamento' },
            { type: 'paragraph', content: 'En estas nuevas residencias, los muros portantes son la decoración. El hormigón visto se confronta con lana anudada a mano, con obsidiana pulida, con la calidez de la madera de olivo antiguo. La tensión es el punto. Rodear un material capaz de sostener un puente con el lino más fino disponible genera una conversación que ningún estuco ornamental podría lograr.' },
            { type: 'paragraph', content: 'Arquitectos como Tom Kundig, Tadao Ando y una nueva escuela de estudios latinoamericanos lideran esta corriente. Su obra comparte un compromiso firme con lo que podría llamarse empatía estructural: la convicción de que el modo en que se construye un edificio es inseparable de la experiencia de habitarlo.' },
            { type: 'heading', content: 'La Dimensión Acústica' },
            { type: 'paragraph', content: 'Más allá de lo visual, el hormigón ofrece algo precioso y escaso: masa. Masa que absorbe el caos del mundo exterior. En una residencia brutalista, el ruido urbano que atraviesa las torres de vidrio simplemente se absorbe, se amortigua, se borra. El silencio resultante es un lujo en sí mismo: un silencio que no puede comprarse con espuma aislante aplicada sobre un material inferior.' },
        ]
    },
    {
        id: '2',
        category: 'Arquitectura',
        title: 'Casas de Vidrio y el Coraje de la Transparencia',
        date: '3 de noviembre de 2024',
        readTime: '5 min de lectura',
        excerpt: 'Vivir dentro de un pabellón de vidrio implica una negociación constante con el paisaje. Las residencias más notables de nuestra era se definen por esta delicada transparencia.',
        coverImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2670&auto=format&fit=crop',
        slug: 'glass-houses-transparency',
        body: [
            { type: 'paragraph', content: 'Philip Johnson construyó su casa de vidrio en 1949 como una declaración filosófica. Casi ocho décadas después, la residencia transparente ha evolucionado del manifiesto a la aspiración. En manos de los arquitectos contemporáneos, el vidrio ya no es un muro: es una negociación con la naturaleza.' },
            { type: 'pullquote', content: '"Vivir en vidrio es aceptar que la luz modificará el ambiente por sí sola, hora a hora. Uno cede el control y algo magnífico toma su lugar."' },
            { type: 'heading', content: 'La Nueva Transparencia' },
            { type: 'paragraph', content: 'El vidrio ultra-claro bajo en hierro logra hoy una neutralidad que las formulaciones anteriores no alcanzaban. Donde el acristalamiento de otra época introducía un tinte verdoso, el vidrio moderno es simplemente invisible: la vista a través de él es indistinguible de la realidad directa. Combinado con sistemas estructurales con rotura de puente térmico y acristalamiento al vacío, estos muros ya no son las debilidades térmicas que alguna vez fueron.' },
            { type: 'paragraph', content: 'Los interiores de estas viviendas responden en consecuencia. El mobiliario es escultórico, mínimo, cuidadosamente situado. Cada objeto es visible desde cualquier ángulo, cualquier eje. Vivir aquí exige cierta disciplina, una voluntad de ser visto, que es quizás la forma de lujo más exigente.' },
        ]
    },
    {
        id: '3',
        category: 'Arquitectura',
        title: 'Subterráneo: La Última Frontera de la Privacidad',
        date: '1 de diciembre de 2024',
        readTime: '7 min de lectura',
        excerpt: 'En las ciudades más caras del mundo, la élite está construyendo hacia abajo. Los niveles residenciales subterráneos se han convertido en el nuevo penthouse.',
        coverImage: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2670&auto=format&fit=crop',
        slug: 'underground-architecture',
        body: [
            { type: 'paragraph', content: 'En las mansiones de Kensington, en las casas adosadas de Manhattan, en las villas de Ginebra, una silenciosa excavación está en marcha. La élite más acaudalada está construyendo hacia abajo: creando niveles subterráneos de ambición extraordinaria que redefinen lo que puede ser un sótano.' },
            { type: 'pullquote', content: '"La casa iceberg ya no es una curiosidad. Es el estandarte de una nueva era de privacidad urbana, donde los metros cuadrados más impresionantes existen enteramente bajo tierra."' },
            { type: 'heading', content: 'Ingeniería del Vacío' },
            { type: 'paragraph', content: 'La ingeniería requerida para excavar bajo una terraza victoriana —estabilizando el nivel freático, apuntalando las estructuras vecinas, impermeabilizando contra la humedad permanente del subsuelo— es extraordinaria. El costo por metro cuadrado puede superar cualquier otra forma de construcción. Y sin embargo la demanda sigue creciendo.' },
            { type: 'paragraph', content: '¿Qué atrae a los compradores hacia estas expansiones subterráneas? La privacidad es primordial: sin línea de visión desde la calle, sin vista aérea. Pero también el atractivo de los ambientes controlados: temperatura constante, humedad constante, sin luz directa que dañe colecciones de arte o vinos de añada. Bajo tierra, las variables del clima quedan anuladas.' },
        ]
    },

    /* ─── Market Report ─── */
    {
        id: '4',
        category: 'Informe del Mercado',
        title: 'Tucumán 2025: Ambición Vertical en el NOA',
        date: '28 de septiembre de 2024',
        readTime: '8 min de lectura',
        excerpt: 'A medida que los derechos aéreos se convierten en la nueva fiebre del oro, los desarrolladores miran hacia arriba con una ambición sin precedentes. Analizamos la próxima década del skyline tucumano.',
        coverImage: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2670&auto=format&fit=crop',
        slug: 'manhattan-2025',
        body: [
            { type: 'paragraph', content: 'Tucumán siempre estuvo definida por su dinámica urbana, pero el ritmo de la construcción vertical que entra al 2025 no tiene precedentes en la última década. Los derechos edificatorios sobre estructuras existentes de baja altura se están cotizando a valores que habrían parecido fantásticos hace apenas diez años.' },
            { type: 'pullquote', content: '"La torre residencial de gran altura se ha convertido en un instrumento financiero tanto como arquitectónico. Los pisos superiores se pricean como arte escaso: hay muy pocos de ellos."' },
            { type: 'heading', content: 'La Búsqueda de Calidad' },
            { type: 'paragraph', content: 'Lo que distingue este ciclo de los booms inmobiliarios anteriores en Tucumán es la búsqueda de calidad en todos los segmentos. El producto de lujo especulativo que saturó el mercado entre 2018 y 2020 fue reemplazado por un comprador más exigente, que demanda diseño genuino, calidad material auténtica y amenidades reales.' },
            { type: 'paragraph', content: 'Los activos trofeo —los pisos superiores de las torres más ambiciosas, las mansiones históricas del casco histórico, los escasos lofts de planta libre de Yerba Buena— continúan apreciándose independientemente de las condiciones generales del mercado. Han alcanzado el estatus de activos alternativos, descorrelacionados de los mercados financieros.' },
        ]
    },
    {
        id: '5',
        category: 'Informe del Mercado',
        title: 'El Efecto Yerba Buena: Por Qué la Élite se Muda al Piedemonte',
        date: '20 de octubre de 2024',
        readTime: '6 min de lectura',
        excerpt: 'Calidad de vida, seguridad y una década de inversión en infraestructura se combinan para crear una atracción gravitacional sobre la riqueza regional. Los números son contundentes.',
        coverImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop',
        slug: 'dubai-effect',
        body: [
            { type: 'paragraph', content: 'En los últimos tres años, Yerba Buena concentró más traslados de familias de alto patrimonio que cualquier otra zona de Tucumán. El fenómeno, que comenzó a acelerarse durante la pandemia, no muestra señales de detenerse. La pregunta ya no es por qué Yerba Buena, sino cuáles son las implicancias a largo plazo para la distribución de la riqueza en el noroeste argentino.' },
            { type: 'pullquote', content: '"La seguridad es el titular, pero la realidad es más matizada. Es la combinación de calidad de vida, naturaleza, infraestructura y acceso a servicios premium lo que genera confianza genuina."' },
            { type: 'heading', content: 'El Dividendo de la Infraestructura' },
            { type: 'paragraph', content: 'Yerba Buena ha visto una expansión significativa de su red vial, educativa y comercial en la última década. El resultado es una zona con una de las redes logísticas más completas de la región, a minutos del centro neurálgico de San Miguel de Tucumán.' },
            { type: 'paragraph', content: 'Para familias de alto patrimonio, la oferta residencial ha madurado notablemente. Los condominios de hace cinco años han dado paso a una nueva generación de proyectos arquitectónicamente significativos, colaboraciones entre desarrolladores locales y estudios de diseño de primer nivel, posicionando a Yerba Buena como un mercado primario del NOA.' },
        ]
    },
    {
        id: '6',
        category: 'Informe del Mercado',
        title: 'El Mercado Premium Post-Pandemia: Resiliencia y Reinvención',
        date: '15 de noviembre de 2024',
        readTime: '7 min de lectura',
        excerpt: 'Cinco años después, las predicciones de declive no se materializaron. El mercado residencial premium de Tucumán cuenta una historia más compleja y convincente.',
        coverImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1200&auto=format&fit=crop',
        slug: 'london-after-brexit',
        body: [
            { type: 'paragraph', content: 'Cuando llegó la pandemia en 2020, el pronóstico entre la mayoría de los analistas era claro: el mercado inmobiliario de lujo en Argentina colapsaría. La incertidumbre económica fragmentaría la demanda. Las valuaciones caerían. Sin embargo, el segmento premium de Tucumán contó una historia diferente.' },
            { type: 'pullquote', content: '"Tucumán no es un mercado que necesite del ciclo nacional para ser Tucumán. Tiene su propia dinámica, su propia clase compradora, y una escasez de producto de calidad que sostiene los valores."' },
            { type: 'heading', content: 'Lo Que Realmente Ocurrió' },
            { type: 'paragraph', content: 'Nada de lo previsto se materializó completamente. El mercado residencial premium de Tucumán, tras un breve período de incertidumbre durante 2020-2021, se recuperó y luego se aceleró. La demanda de propiedades en dólares en zonas de calidad se mantuvo robusta, con compradores que encontraron en el ladrillo un refugio ante la inflación.' },
            { type: 'paragraph', content: 'Hoy, el corredor premium de Yerba Buena y las zonas del piedemonte operan en niveles que habrían sido considerados proyecciones optimistas en 2019. Los compradores han cambiado: hay más empresarios del agronegocio, profesionales del sector salud y privado, y familias que priorizan calidad de vida sobre centralidad urbana.' },
        ]
    },

    /* ─── Interior Design ─── */
    {
        id: '7',
        category: 'Diseño de Interiores',
        title: 'El Silencio como Material',
        date: '15 de septiembre de 2024',
        readTime: '5 min de lectura',
        excerpt: 'En un mundo hiperconectado, el verdadero lujo es la privacidad acústica. Exploramos los materiales y técnicas que convierten las residencias en santuarios de quietud.',
        coverImage: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2600&auto=format&fit=crop',
        slug: 'silence-as-material',
        body: [
            { type: 'paragraph', content: 'La especificación más solicitada en los encargos residenciales de lujo hoy no es una isla de cocina, ni un baño spa, ni un cine en casa. Es el silencio. Un silencio genuino, envolvente, terapéutico: el tipo que antes requería un retiro en la montaña pero que ahora, con la inversión adecuada, puede ser diseñado dentro del tejido mismo de un apartamento urbano.' },
            { type: 'pullquote', content: '"Cuando logro la especificación acústica que diseñé, los clientes siempre hacen una pausa. Luego exhalan. No habían notado cuánta energía gastaban simplemente procesando el ruido ambiental."' },
            { type: 'heading', content: 'La Arquitectura del Silencio' },
            { type: 'paragraph', content: 'Los materiales que contribuyen al dominio acústico raramente son los que se fotografían. Vinilo de masa cargada enterrado entre capas estructurales. Muros de doble tablave llenos de aislación de denim reciclado que absorbe el sonido sin transmitirlo. Sistemas de piso flotante que desacoplan la losa estructural de la superficie terminada. Canales resilientes que evitan que el ruido de impacto viaje por el esqueleto del edificio.' },
            { type: 'paragraph', content: 'Los materiales visibles —las paredes de yeso vaciado a mano, las cortinas de lino, los gruesos tapetes de lana— también contribuyen, pero son la capa de terminación de un sistema mucho más profundo. Las habitaciones que logran verdadera privacidad acústica se sienten diferentes antes de que uno identifique conscientemente por qué. Hay un sosiego, un peso en ellas, que es inmediatamente perceptible.' },
        ]
    },
    {
        id: '8',
        category: 'Diseño de Interiores',
        title: 'El Interior Wabi-Sabi: La Imperfección como Virtud',
        date: '5 de octubre de 2024',
        readTime: '6 min de lectura',
        excerpt: 'La filosofía japonesa de encontrar belleza en la imperfección está transformando el modo en que se conciben y habitan los interiores más refinados del mundo.',
        coverImage: 'https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?q=80&w=2680&auto=format&fit=crop',
        slug: 'wabi-sabi-interior',
        body: [
            { type: 'paragraph', content: 'Hay un placer específico en una superficie marcada por el tiempo: una mesa de nogal cuya veta se ha profundizado con aceite y uso, un lino lavado tantas veces que adquirió una suavidad indistinguible de la piel, un cuenco de cerámica cuyo esmalte se acumuló imperfectamente en el horno y se detuvo en un momento de feliz accidente. Este placer es el objeto del wabi-sabi, y es cada vez más la filosofía detrás de los interiores residenciales más cuidados del mundo.' },
            { type: 'pullquote', content: '"Ya no especifico lo nuevo. Especifico lo envejecido, lo encontrado, lo heredado. La pátina del tiempo es un acabado que no puede comprarse a ningún precio: solo esperarse."' },
            { type: 'heading', content: 'Contra la Perfección' },
            { type: 'paragraph', content: 'La reacción contra la perfección brillante en los interiores de lujo lleva una década construyéndose. Los muebles lacados, los pisos de espejo pulido, la piedra con borde mecanizado —el vocabulario del interior de lujo de los 2000— han llegado a sentirse estériles, ansiosos, esforzados. En su lugar, una generación de diseñadores y sus clientes eligen superficies que respiran, materiales que envejecen, objetos con procedencia.' },
            { type: 'paragraph', content: 'Las consecuencias se sienten en toda la cadena de valor. La demanda de antigüedades se disparó, llevando los precios en subasta a niveles no vistos desde finales de los ochenta. Los artesanos que producen objetos a mano —ceramistas, tejedores, ebanistas— ven sus listas de espera extenderse a años. Lo hecho a mano, lo singular, lo imperfecto: estas son las nuevas señales de distinción.' },
        ]
    },
    {
        id: '9',
        category: 'Diseño de Interiores',
        title: 'El Regreso de la Biblioteca',
        date: '20 de noviembre de 2024',
        readTime: '4 min de lectura',
        excerpt: 'A medida que la vida digital consume nuestras horas de vigilia, la biblioteca privada protagoniza un revival profundo. Los libros, resulta, son el objeto de estatus definitivo.',
        coverImage: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2693&auto=format&fit=crop',
        slug: 'return-of-library',
        body: [
            { type: 'paragraph', content: 'La biblioteca privada casi desapareció. Durante dos décadas, el cuarto designado para los libros fue convertido —en cines en casa, en gimnasios, en extensiones de planta abierta que consumieron la intimidad tranquila del estudio en favor de la apertura social. Se asumía que el libro era un objeto agonizante, y el cuarto construido para él una afectación de época.' },
            { type: 'pullquote', content: '"Una biblioteca cuenta la historia de una vida vivida en ideas. Ningún otro cuarto hace esto. El gimnasio habla del cuerpo. La cocina del apetito. Solo la biblioteca habla de lo que has pensado, y aspirado a pensar."' },
            { type: 'heading', content: 'El Revival' },
            { type: 'paragraph', content: 'La biblioteca está de vuelta, y regresó con una seriedad que sugiere que no es nostalgia sino una recalibración genuina. En los encargos residenciales más significativos que se diseñan hoy, la biblioteca aparece consistentemente como prioridad: un cuarto que debe existir, que no puede comprometerse, que debe hacerse con convicción.' },
            { type: 'paragraph', content: 'Los propios libros se han convertido en objetos de diseño del más alto orden. Estanterías de piso a techo en roble ahumado, escaleras rodantes con acentos de bronce, primeras ediciones exhibidas con la reverencia del arte: la biblioteca ha absorbido la ambición de diseño que solía concentrarse en la cocina.' },
        ]
    },

    /* ─── Event ─── */
    {
        id: '10',
        category: 'Evento',
        title: 'Semana del Diseño de Milán: Los Highlights',
        date: '15 de julio de 2024',
        readTime: '5 min de lectura',
        excerpt: 'Desde materiales sustentables hasta el retrofuturismo, curamos las instalaciones y lanzamientos de productos más impactantes del Salone del Mobile de este año.',
        coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2574&auto=format&fit=crop',
        slug: 'milan-design-week',
        body: [
            { type: 'paragraph', content: 'El Salone del Mobile siempre fue la semana en que el mundo del diseño contiene la respiración. Pero esta edición se sintió diferente: más urgente, más ambiciosa arquitectónicamente, más dispuesta a hacer preguntas incómodas sobre el futuro de fabricar objetos para uso humano en una era de emergencia ecológica.' },
            { type: 'pullquote', content: '"Milán este año no fue sobre objetos. Fue sobre preguntas. ¿Qué estamos haciendo? ¿Para quién? ¿Con qué? ¿A qué costo para los sistemas que nos sostienen?"' },
            { type: 'heading', content: 'La Conversación Material' },
            { type: 'paragraph', content: 'La narrativa dominante en este Salone fue la honestidad material. Marca tras marca —desde las casas de herencia italiana hasta los nuevos estudios escandinavos que exponen en el distrito Brera— hacía el mismo argumento: que el diseño extraordinario y la responsabilidad ecológica no son valores en competencia sino inseparables.' },
            { type: 'paragraph', content: 'Las instalaciones que más permanecieron en la memoria fueron las que convirtieron al material mismo en protagonista. Un pabellón construido de micelio —el sistema de raíces fúngicas de los hongos— que se descomponía en tiempo real durante los cinco días de la feria. Una instalación lumínica tejida con redes de pesca reutilizadas que refractaba la luz con la especificidad del cristal tallado.' },
        ]
    },
    {
        id: '11',
        category: 'Evento',
        title: 'Zona Maco: Donde el Arte y el Inmobiliario Convergen',
        date: '8 de diciembre de 2024',
        readTime: '6 min de lectura',
        excerpt: 'En la intersección de la feria de arte más significativa de América Latina y uno de sus mercados inmobiliarios más dinámicos, emerge un nuevo tipo de comprador.',
        coverImage: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2670&auto=format&fit=crop',
        slug: 'art-basel-miami',
        body: [
            { type: 'paragraph', content: 'Zona Maco es, nominalmente, una feria de arte. Pero durante la semana de su celebración, funciona igualmente como la concentración mundial más densa de individuos de alto patrimonio neto: coleccionistas, empresarios, directores de family offices, para quienes el arte es inseparable de la arquitectura y el inmobiliario de la identidad personal.' },
            { type: 'pullquote', content: '"Los compradores con los que trabajo ya no piensan en arte e inmobiliario como clases de activos separadas. La residencia es el marco de la colección. La colección justifica la residencia."' },
            { type: 'heading', content: 'El Momento de Buenos Aires' },
            { type: 'paragraph', content: 'Buenos Aires ha experimentado una de las transformaciones urbanas más dramáticas de cualquier ciudad latinoamericana en la última década. La migración de instituciones financieras, la llegada de un sector tecnológico previamente asentado en otras capitales, y la expansión sostenida de la riqueza regional se combinaron para crear un mercado de profundidad y velocidad extraordinarias.' },
            { type: 'paragraph', content: 'El producto residencial que demanda este mercado ha evolucionado en consecuencia. Los condominios de hace cinco años dieron paso a una nueva generación de proyectos arquitectónicamente significativos —colaboraciones entre desarrolladores globales y arquitectos de renombre— que posicionan a Buenos Aires no como mercado secundario sino como mercado primario en el escenario de lujo global.' },
        ]
    },
    {
        id: '12',
        category: 'Evento',
        title: 'ArteBA: El Diseño en el Límite del Arte',
        date: '14 de octubre de 2024',
        readTime: '5 min de lectura',
        excerpt: 'La frontera entre el diseño coleccionable y el arte de vanguardia se ha disuelto. ArteBA es el lugar donde ambos mundos convergen.',
        coverImage: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?q=80&w=2670&auto=format&fit=crop',
        slug: 'frieze-london',
        body: [
            { type: 'paragraph', content: 'Cuando ArteBA abrió su primera edición en Buenos Aires, era una feria de arte. Cuando abrió su edición más reciente, era algo más complejo: una negociación entre arte, diseño y los objetos que amueblan vidas notables. La distinción entre lo que pertenece a una galería y lo que pertenece a una residencia se ha erosionado hasta el punto de la irrelevancia.' },
            { type: 'pullquote', content: '"El comprador que veo con más frecuencia en ArteBA no está decidiendo entre una pintura y una silla. Está construyendo un mundo: y la pintura y la silla son parte del mismo."' },
            { type: 'heading', content: 'Coleccionar Sin Categorías' },
            { type: 'paragraph', content: 'El surgimiento de la categoría del "diseño coleccionable" —objetos funcionales que se comercializan con múltiplos significativos por encima de su valor utilitario— ha sido uno de los desarrollos más importantes del mercado del arte de la última década. Sillas, lámparas, piezas únicas de distintas disciplinas: estos objetos ocupan una posición entre el uso y la contemplación que ninguna taxonomía anterior describe adecuadamente.' },
            { type: 'paragraph', content: 'El interior residencial se convierte, en este contexto, en un acto curatorial. El coleccionista no amuebla un cuarto; lo compone. Cada objeto está en conversación con cada otro objeto. El mobiliario es tan meditado como el arte con el que coexiste.' },
        ]
    },
];
