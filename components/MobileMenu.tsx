
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloseIcon } from './icons/CloseIcon';
import { InstagramIcon } from './icons/InstagramIcon';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { INSTAGRAM_URL, WHATSAPP_NUMBER, WHATSAPP_CONTACT_MESSAGE } from '../constants';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigateTo: (page: 'home' | 'catalog') => void;
  openPortfolio: () => void;
  openRedirectModal: () => void;
  openGameRoom: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, navigateTo, openPortfolio, openRedirectModal, openGameRoom }) => {
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_CONTACT_MESSAGE}`;

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, page: 'home' | 'catalog') => {
    e.preventDefault();
    navigateTo(page);
  };

  const handlePortfolioClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    openPortfolio();
    onClose();
  };

  const handleRedirectClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    openRedirectModal();
    onClose();
  };

  const handleGameRoomClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    openGameRoom();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-brand-dark/90 backdrop-blur-xl flex flex-col items-center justify-center p-6"
          onClick={onClose}
        >
          {/* Wrapper to prevent clicks on content from closing the menu */}
          <div 
            className="flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-brand-gray hover:text-white transition-colors"
              aria-label="Fechar menu"
            >
              <CloseIcon className="w-8 h-8" />
            </button>

            <nav className="flex flex-col items-center gap-8 text-center">
              <motion.a
                href="#"
                onClick={(e) => handleNavClick(e, 'home')}
                className="text-2xl text-brand-light hover:text-white transition-colors"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { delay: 0.1 } }}
              >
                Início
              </motion.a>
              <motion.a
                href="#"
                onClick={(e) => handleNavClick(e, 'catalog')}
                className="text-2xl text-brand-light hover:text-white transition-colors"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
              >
                Catálogo
              </motion.a>
              <motion.a
                href="#"
                onClick={handlePortfolioClick}
                className="text-2xl text-brand-light hover:text-white transition-colors"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
              >
                Portfólio
              </motion.a>
              <motion.a
                href="#"
                onClick={handleRedirectClick}
                className="text-2xl text-brand-light hover:text-white transition-colors"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { delay: 0.4 } }}
              >
                Planos
              </motion.a>
              <motion.a
                href="#"
                onClick={handleGameRoomClick}
                className="text-2xl text-brand-light hover:text-white transition-colors"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { delay: 0.5 } }}
              >
                Sala de Jogos
              </motion.a>
            </nav>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { delay: 0.6 } }}
              className="mt-16 pt-8 border-t border-white/10 w-full max-w-xs flex justify-center gap-8"
            >
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-brand-light hover:text-white transition-colors duration-300">
                <WhatsAppIcon className="w-7 h-7" />
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-brand-light hover:text-white transition-colors duration-300">
                <InstagramIcon className="w-7 h-7" />
              </a>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
