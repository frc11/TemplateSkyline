import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-50 py-24 px-12 md:px-24 border-t border-gray-200 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="space-y-6">
                    <h4 className="font-sans uppercase tracking-[0.3em] text-xs font-bold">Contacto</h4>
                    <p className="font-serif text-gray-500 text-sm">
                        San Miguel de Tucumán, Argentina<br />
                        +54 9 381 415-4708<br />
                        hola@skyline.properties
                    </p>
                </div>
                <div className="space-y-6">
                    <h4 className="font-sans uppercase tracking-[0.3em] text-xs font-bold">Navegación</h4>
                    <div className="flex flex-col space-y-2 font-serif text-gray-500 text-sm">
                        <a href="/properties" className="hover:text-black transition-colors">Propiedades</a>
                        <a href="/agents" className="hover:text-black transition-colors">Agencia</a>
                        <a href="/journal" className="hover:text-black transition-colors">Revista</a>
                    </div>
                </div>
                <div className="space-y-6">
                    <h4 className="font-sans uppercase tracking-[0.3em] text-xs font-bold">Redes</h4>
                    <div className="flex flex-col space-y-2 font-serif text-gray-500 text-sm">
                        <a href="#" className="hover:text-black transition-colors">Instagram</a>
                        <a href="#" className="hover:text-black transition-colors">LinkedIn</a>
                        <a href="#" className="hover:text-black transition-colors">Pinterest</a>
                    </div>
                </div>
                <div className="md:col-span-1 text-right flex flex-col justify-between">
                    <h2 className="text-4xl font-sans uppercase tracking-[0.5em] font-light opacity-10">Skyline</h2>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mt-auto">
                        © 2024 Skyline Estates. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

