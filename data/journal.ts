export interface JournalPost {
    id: string;
    category: string;
    title: string;
    date: string;
    excerpt: string;
    coverImage: string;
    slug: string;
}

export const JOURNAL_POSTS: JournalPost[] = [
    {
        id: '1',
        category: 'Architecture',
        title: 'The Return of Brutalism in Modern Luxury',
        date: 'October 12, 2024',
        excerpt: 'Raw concrete meets velvet interiors. How the new wave of architectural design is redefining comfort through structural honesty and bold geometric forms.',
        coverImage: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=2671&auto=format&fit=crop',
        slug: 'return-of-brutalism'
    },
    {
        id: '2',
        category: 'Market Report',
        title: 'Manhattan 2025: Additional Verticality',
        date: 'September 28, 2024',
        excerpt: 'As air rights become the new gold rush, developers are looking skyward with unprecedented ambition. We analyze the next decade of the skyline.',
        coverImage: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2670&auto=format&fit=crop',
        slug: 'manhattan-2025'
    },
    {
        id: '3',
        category: 'Interior Design',
        title: 'Silence as a Material',
        date: 'September 15, 2024',
        excerpt: 'In a hyper-connected world, true luxury is acoustic privacy. Exploring the materials and techniques that turn residences into sanctuaries of quiet.',
        coverImage: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2600&auto=format&fit=crop',
        slug: 'silence-as-material'
    },
    {
        id: '4',
        category: 'Design',
        title: 'Light: The Invisible Architect',
        date: 'August 30, 2024',
        excerpt: 'Beyond mere illumination, light sculpts space. A conversation with lighting designer Thomas Kink on how to manipulate atmosphere using only photons.',
        coverImage: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=2676&auto=format&fit=crop',
        slug: 'light-invisible-architect'
    },
    {
        id: '5',
        category: 'Event',
        title: 'Milan Design Week: The Highlights',
        date: 'July 15, 2024',
        excerpt: 'From sustainable materials to retro-futurism, we curate the most impactful installations and product launches from this year\'s Salone del Mobile.',
        coverImage: 'https://images.unsplash.com/photo-1531700444066-8889b275bf40?q=80&w=2574&auto=format&fit=crop',
        slug: 'milan-design-week'
    }
];
