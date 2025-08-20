
import React, { useState, useEffect } from 'react';
import { CloseIcon } from './icons/CloseIcon';
import { ArrowUpRightIcon } from './icons/ArrowUpRightIcon';
import { PenToolIcon } from './icons/PenToolIcon';

interface ExternalGamesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const externalGames = [
  {
    title: 'IA.Palavra',
    category: 'Ferramenta de IA',
    description: 'Uma ferramenta de IA para geração e análise de textos, otimizando a criação de conteúdo.',
    link: 'https://iapalavra.vercel.app/',
    icon: PenToolIcon,
  },
];

const ExternalGamesModal: React.FC<ExternalGamesModalProps> = ({ isOpen, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsClosing(false);
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  if (!isOpen && !isClosing) return null;

  const backdropClass = isClosing ? 'opacity-0' : 'opacity-100';
  const modalClass = isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100';

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'visible' : 'invisible'}`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="external-games-modal-title"
    >
      <div className={`absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300 ${backdropClass}`} />
      
      <div
        className={`relative w-full max-w-4xl bg-brand-dark/80 rounded-2xl border border-white/10 shadow-2xl shadow-purple-500/10 text-white transform transition-all duration-300 ${modalClass} flex flex-col max-h-[90vh]`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex-shrink-0 p-4 sm:p-6 border-b border-white/10 flex justify-between items-center">
          <h2 id="external-games-modal-title" className="text-xl sm:text-2xl font-bold text-gradient bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            Jogos Externos
          </h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full p-2 transition-colors duration-300 z-10" aria-label="Fechar modal">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 scrollbar-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {externalGames.map((game, index) => {
              const Icon = game.icon;
              return (
              <a
                key={index}
                href={game.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block rounded-lg overflow-hidden bg-brand-dark/50 border border-white/10 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/20"
              >
                 <div className="relative p-6 flex flex-col items-center text-center h-full">
                    <div className="mb-4 text-purple-400">
                        <Icon className="w-12 h-12 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <div className="absolute top-2 right-2 p-1.5 bg-brand-dark/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ArrowUpRightIcon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-bold text-lg text-brand-light mt-1 mb-2">{game.title}</h3>
                    <p className="text-sm text-brand-gray flex-grow">{game.description}</p>
                </div>
              </a>
            )})}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExternalGamesModal;
