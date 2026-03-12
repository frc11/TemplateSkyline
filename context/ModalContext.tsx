import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextType {
    isModalOpen: boolean;
    modalType: 'inquiry' | 'careers';
    openModal: (type?: 'inquiry' | 'careers') => void;
    closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState<'inquiry' | 'careers'>('inquiry');

    const openModal = (type: 'inquiry' | 'careers' = 'inquiry') => {
        setModalType(type);
        setIsModalOpen(true);
    };
    const closeModal = () => setIsModalOpen(false);

    return (
        <ModalContext.Provider value={{ isModalOpen, modalType, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};
