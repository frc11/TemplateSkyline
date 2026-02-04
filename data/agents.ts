export interface Agent {
    id: string;
    name: string;
    role: string;
    location: string;
    image: string;
    phone: string;
    email: string;
}

export const AGENTS: Agent[] = [
    {
        id: '1',
        name: 'Alexander Vane',
        role: 'Senior Broker',
        location: 'New York',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop',
        phone: '+1 (212) 555-0123',
        email: 'alexander@skyline.estates'
    },
    {
        id: '2',
        name: 'Isabella Chen',
        role: 'Global Consultant',
        location: 'Shanghai',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop',
        phone: '+86 21 5555 0199',
        email: 'isabella@skyline.estates'
    },
    {
        id: '3',
        name: 'Marcus Thorne',
        role: 'Architectural Specialist',
        location: 'London',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2574&auto=format&fit=crop',
        phone: '+44 20 7123 4567',
        email: 'marcus@skyline.estates'
    },
    {
        id: '4',
        name: 'Elena Rossi',
        role: 'Luxury Estates Director',
        location: 'Milan',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2661&auto=format&fit=crop',
        phone: '+39 02 5555 7890',
        email: 'elena@skyline.estates'
    },
    {
        id: '5',
        name: 'Julian Styles',
        role: 'Penthouse Acquisitions',
        location: 'Los Angeles',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2574&auto=format&fit=crop',
        phone: '+1 (310) 555-0456',
        email: 'julian@skyline.estates'
    },
    {
        id: '6',
        name: 'Sarah Sterling',
        role: 'Private Client Advisor',
        location: 'Dubai',
        image: 'https://images.unsplash.com/photo-1598550832236-81cf0ec54465?q=80&w=2574&auto=format&fit=crop',
        phone: '+971 4 555 1234',
        email: 'sarah@skyline.estates'
    }
];
