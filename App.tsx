import React from 'react';
import GridLines from './components/Layout/GridLines';
import VirtualConcierge from './components/VirtualConcierge';
import Properties from './components/Properties';
import Sidebar from './components/Layout/Sidebar';
import Hero from './components/Hero';
import FloatingFilter from './components/Search/FloatingFilter';
import InteractiveDetail from './components/InteractiveDetail';
import EditorialGallery from './components/EditorialGallery';
import PanoramaViewer from './components/PanoramaViewer';
import AgentCard from './components/AgentCard';
import Preloader from './components/Preloader';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-luxury-black relative selection:bg-gray-200 selection:text-black">
      {/* Preloader - High Z-Index to cover initial load */}
      <Preloader />

      <GridLines />
      
      {/* Vertical Sidebar */}
      <Sidebar />

      {/* Main Content Wrapper - Added pl-20 for sidebar offset */}
      <div className="pl-20 w-full relative">
        
        {/* Hero Section */}
        <Hero />

        {/* Floating Search Filter - Overlaps Hero and Content */}
        <FloatingFilter />

        {/* Main Content */}
        <Properties />

        {/* Interactive Materiality Section */}
        <InteractiveDetail />

        {/* Editorial Gallery */}
        <EditorialGallery />

        {/* 360 Panorama View */}
        <PanoramaViewer />

        {/* Footer */}
        <footer className="bg-gray-50 py-24 px-12 md:px-24 border-t border-gray-200 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-6">
              <h4 className="font-sans uppercase tracking-architect text-xs font-bold">Contact</h4>
              <p className="font-serif text-gray-500 text-sm">
                New York, NY<br/>
                +1 (555) 000-0000<br/>
                hello@skyline.estates
              </p>
            </div>
            <div className="space-y-6">
              <h4 className="font-sans uppercase tracking-architect text-xs font-bold">Social</h4>
              <div className="flex flex-col space-y-2 font-serif text-gray-500 text-sm">
                <a href="#" className="hover:text-black transition-colors">Instagram</a>
                <a href="#" className="hover:text-black transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-black transition-colors">Pinterest</a>
              </div>
            </div>
            <div className="md:col-span-2 text-right flex flex-col justify-between">
               <h2 className="text-4xl font-sans uppercase tracking-widest opacity-10">Skyline</h2>
               <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-auto">
                 © 2024 Skyline Estates. All rights reserved.
               </p>
            </div>
          </div>
        </footer>
      </div>

      {/* Human Agent (Bottom Right) */}
      <AgentCard />

      {/* AI Assistant (Bottom Left) */}
      <VirtualConcierge />
    </div>
  );
};

export default App;