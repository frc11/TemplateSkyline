import { Property } from '../types';

// Enhanced Mock Data with 'type' and 'coordinates'
export interface PropertyData extends Property {
    type: 'Penthouse' | 'Villa' | 'Mansion' | 'Residence';
    rawPrice: number;
    coordinates: { x: number; y: number }; // Percentage from top-left
    lat: number;
    lng: number;
    status: 'sale' | 'rent';
    isNewDevelopment?: boolean;
}

export const PROPERTIES: PropertyData[] = [
    {
        id: '1',
        title: 'The Obsidian Penthouse',
        location: 'New York, NY',
        price: '$25,000,000',
        rawPrice: 25000000,
        type: 'Penthouse',
        image: 'https://picsum.photos/800/600?random=1',
        beds: 4,
        baths: 5.5,
        sqft: 6200,
        description: 'A monolithic expression of dark luxury overlooking Central Park.',
        coordinates: { x: 28, y: 38 }, // Approx NY
        lat: 40.785091,
        lng: -73.968285,
        status: 'sale',
        isNewDevelopment: true
    },
    {
        id: '2',
        title: 'Villa Serenity',
        location: 'Kyoto, Japan',
        price: '$18,500/mo',
        rawPrice: 18500,
        type: 'Villa',
        image: 'https://picsum.photos/800/600?random=2',
        beds: 5,
        baths: 4,
        sqft: 4500,
        description: 'Where traditional minimalism meets raw concrete brutalism.',
        coordinates: { x: 82, y: 40 }, // Approx Japan
        lat: 35.0116,
        lng: 135.7681,
        status: 'rent'
    },
    {
        id: '3',
        title: 'Azure Coast Mansion',
        location: 'Monaco',
        price: '$45,000,000',
        rawPrice: 45000000,
        type: 'Mansion',
        image: 'https://picsum.photos/800/600?random=3',
        beds: 8,
        baths: 10,
        sqft: 12000,
        description: 'Cliffside living defined by infinity edges and white marble.',
        coordinates: { x: 51, y: 36 }, // Approx Europe
        lat: 43.7384,
        lng: 7.4246,
        status: 'sale',
        isNewDevelopment: true
    },
    {
        id: '4',
        title: 'Estancia de los Vientos',
        location: 'Patagonia, Argentina',
        price: '$12,500,000',
        rawPrice: 12500000,
        type: 'Villa',
        image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=2565&auto=format&fit=crop',
        beds: 6,
        baths: 7,
        sqft: 8500,
        description: 'A brutalist concrete refuge situated amidst the raw glacial landscapes of Patagonia.',
        coordinates: { x: 29, y: 82 }, // South America (Argentina)
        lat: -50.9423,
        lng: -73.4068,
        status: 'sale'
    },
    {
        id: '5',
        title: 'Sky Garden Penthouse',
        location: 'Singapore',
        price: '$32,000,000',
        rawPrice: 32000000,
        type: 'Penthouse',
        image: 'https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?q=80&w=2670&auto=format&fit=crop',
        beds: 5,
        baths: 6,
        sqft: 7500,
        description: 'Biophilic luxury in the clouds. A vertical garden residence.',
        coordinates: { x: 75, y: 55 },
        lat: 1.3521,
        lng: 103.8198,
        status: 'sale',
        isNewDevelopment: true
    }
];
