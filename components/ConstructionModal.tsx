
import React, { useState, useEffect } from 'react';
import { CloseIcon } from './icons/CloseIcon';
import { WrenchIcon } from './icons/WrenchIcon';

interface ConstructionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

const ConstructionModal: React.FC<ConstructionModalProps> = ({ isOpen, onClose, title, message }) => {
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setIsClosing(false);
        } else {
            document.body.style.overflow = 'auto';
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                handleClose();
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            if (!document.querySelector('[role="dialog"][aria-modal="true"]')) {
                document.body.style.overflow = 'auto';
            }
        };
    }, [isOpen]);
    
    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
            setIsClosing(false); // Reset for next open
        }, 300);
    };

    if (!isOpen && !isClosing) return null;

    const backdropClass = isClosing ? 'opacity-0' : 'opacity-100';
    const modalClass = isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100';

    return (
        <div
          className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'visible' : 'invisible'}`}
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
        >
          <div className={`absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300 ${backdropClass}`} />
          <div
            className={`relative w-full max-w-md bg-brand-dark/80 rounded-2xl border border-white/10 shadow-2xl shadow-purple-500/10 text-white transform transition-all duration-300 ${modalClass} text-center p-8`}
            onClick={e => e.stopPropagation()}
          >
            <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-white hover:bg-white/10 rounded-full p-2 transition-colors duration-300 z-10" aria-label="Fechar modal">
              <CloseIcon className="w-6 h-6" />
            </button>
            <div className="mx-auto mb-4 text-gradient bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 w-16 h-16 flex items-center justify-center rounded-full bg-brand-dark/50 border-2 border-yellow-500/50">
                <WrenchIcon className="w-8 h-8"/>
            </div>
            <h2 className="text-2xl font-bold text-gradient bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4">{title}</h2>
            <p className="text-brand-gray mb-6">{message}</p>
            <button 
                onClick={handleClose}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-2 px-8 rounded-full text-base hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 transform transition-all duration-300"
            >
                Entendido
            </button>
          </div>
        </div>
    );
};

export default ConstructionModal;
