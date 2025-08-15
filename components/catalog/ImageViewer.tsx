import React, { useEffect, useState } from 'react';
import { CloseIcon } from '../icons/CloseIcon';

interface ImageViewerProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ isOpen, onClose, imageUrl }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

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
      setIsClosing(false);
    }, 300);
  };

  if (!isOpen && !isClosing) {
    return null;
  }

  const backdropClass = isClosing || !isOpen ? 'opacity-0' : 'opacity-100';
  const imageClass = isClosing || !isOpen ? 'opacity-0 scale-95' : 'opacity-100 scale-100';

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center p-4 transition-opacity duration-300 bg-black/90 backdrop-blur-sm ${backdropClass}`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Visualizador de Imagem"
    >
      <button 
        onClick={handleClose} 
        className="absolute top-4 right-4 text-gray-400 hover:text-white hover:bg-white/10 rounded-full p-2 transition-colors duration-300 z-10" 
        aria-label="Fechar imagem"
      >
        <CloseIcon className="w-8 h-8" />
      </button>

      <div 
        className={`relative max-w-5xl max-h-[90vh] transition-all duration-300 ${imageClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        <img 
          src={imageUrl} 
          alt="Visualização em tela cheia" 
          className="object-contain w-full h-full max-w-full max-h-[90vh] rounded-lg shadow-2xl"
        />
      </div>
    </div>
  );
};

export default ImageViewer;
