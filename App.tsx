import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import { AnimatePresence } from 'framer-motion';

import GridLines from './components/Layout/GridLines';
import VirtualConcierge from './components/VirtualConcierge';
import Sidebar from './components/Layout/Sidebar';
import AgentCard from './components/AgentCard';
import Preloader from './components/Preloader';
import Home from './pages/Home';
import PropertyDetail from './pages/PropertyDetail';
import Agents from './pages/Agents';
import Journal from './pages/Journal';
import { ModalProvider, useModal } from './context/ModalContext';
import Modal from './components/UI/Modal';
import InquiryForm from './components/Forms/InquiryForm';
import ScrollToTop from './components/Utils/ScrollToTop';

const GlobalModalManager: React.FC = () => {
  const { isModalOpen, closeModal } = useModal();
  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <InquiryForm />
    </Modal>
  );
};

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/journal" element={<Journal />} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <ModalProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-white text-luxury-black relative selection:bg-gray-200 selection:text-black">
          {/* Preloader - High Z-Index to cover initial load */}
          <Preloader />

          <GridLines />

          {/* Vertical Sidebar */}
          <Sidebar />

          {/* Main Content Wrapper - Added pl-20 for sidebar offset */}
          <div className="pl-20 w-full relative">
            <AnimatedRoutes />
          </div>

          {/* Human Agent (Bottom Right) */}
          <AgentCard />

          {/* AI Assistant (Bottom Left) */}
          <VirtualConcierge />

          {/* Global Modal */}
          <GlobalModalManager />
        </div>
      </BrowserRouter>
    </ModalProvider>
  );
};

export default App;