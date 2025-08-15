
import React, { useState, useEffect } from 'react';
import { CloseIcon } from './icons/CloseIcon';

interface RedirectModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  redirectUrl: string;
}

const RedirectModal: React.FC<RedirectModalProps> = ({ isOpen, onClose, title, message, redirectUrl }) => {
    const [isClosing, setIsClosing] = useState(false);
    const [countdown, setCountdown] = useState(3);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setIsClosing(false);
            setCountdown(3);

            const countdownInterval = setInterval(() => {
                setCountdown(prev => prev > 0 ? prev - 1 : 0);
            }, 1000);

            const redirectTimeout = setTimeout(() => {
                window.open(redirectUrl, '_blank');
                handleClose();
            }, 3000);

            return () => {
                clearInterval(countdownInterval);
                clearTimeout(redirectTimeout);
                document.body.style.overflow = 'auto';
            };
        }
    }, [isOpen, redirectUrl]);
    
    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
            setIsClosing(false);
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
            <h2 className="text-2xl font-bold text-gradient bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4">{title}</h2>
            <p className="text-brand-gray mb-6">{message}</p>
            <div className="flex items-center justify-center gap-3 text-lg">
                <span className="text-brand-light/90">Redirecionando em</span>
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-500/20">
                    <span className="font-bold text-2xl text-white">{countdown}</span>
                </div>
            </div>
          </div>
        </div>
    );
};

export default RedirectModal;
