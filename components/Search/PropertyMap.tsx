import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { PropertyData } from '../../data/properties';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet's default icon path issues in React/Vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

interface PropertyMapProps {
    properties: PropertyData[];
}

const PropertyMap: React.FC<PropertyMapProps> = ({ properties }) => {
    // Center initially on roughly the Atlantic to show all points optionally, or just NY.
    // Let's center on NY for now as default.
    const position: [number, number] = [30, -10]; // Global-ish view

    return (
        <MapContainer
            center={position}
            zoom={2}
            scrollWheelZoom={true}
            style={{ height: "600px", width: "100%", zIndex: 0 }}
            className="grayscale invert hover:invert-0 transition-all duration-700" // Optional funky CSS effects for "dark mode" if tiles aren't enough
        // Actually, using the dark tiles we requested. Use simple z-index to stay below overlays.
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            {properties.map(property => (
                <Marker key={property.id} position={[property.lat, property.lng]}>
                    <Popup className="custom-popup">
                        <div className="w-48">
                            <img src={property.image} alt={property.title} className="w-full h-24 object-cover mb-2 rounded-sm" />
                            <h3 className="font-sans text-xs font-bold uppercase tracking-widest mb-1">{property.title}</h3>
                            <p className="font-serif text-xs text-gray-500 mb-2">{property.location}</p>
                            <Link to={`/property/${property.id}`} className="block text-center bg-black text-white text-[10px] uppercase font-bold py-2 tracking-widest hover:bg-gray-800 transition-colors">
                                View Residence
                            </Link>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default PropertyMap;
