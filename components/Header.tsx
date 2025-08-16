
import React, { useState } from 'react';
import { InstagramIcon } from './icons/InstagramIcon';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { INSTAGRAM_URL, WHATSAPP_NUMBER, WHATSAPP_CONTACT_MESSAGE } from '../constants';
import { MenuIcon } from './icons/MenuIcon';
import MobileMenu from './MobileMenu';

interface HeaderProps {
  navigateTo: (page: 'home' | 'catalog', target?: { categoryName?: string }) => void;
  openPortfolio: () => void;
  openRedirectModal: () => void;
  openGameRoom: () => void;
}

const Header: React.FC<HeaderProps> = ({ navigateTo, openPortfolio, openRedirectModal, openGameRoom }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_CONTACT_MESSAGE}`;

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, page: 'home' | 'catalog') => {
    e.preventDefault();
    navigateTo(page);
  };

  const handlePortfolioClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    openPortfolio();
  };

  const handleRedirectClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    openRedirectModal();
  };

  const handleGameRoomClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    openGameRoom();
  };

  const handleMobileNav = (page: 'home' | 'catalog') => {
    navigateTo(page);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-brand-dark/50 backdrop-blur-lg">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <a href="#" onClick={(e) => handleNavClick(e, 'home')} className="text-xl sm:text-2xl font-bold text-gradient bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-[length:200%_auto] animate-text-gradient-pan">
            InteligenciArte.IA
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <div className="flex items-center space-x-6">
              <a href="#" onClick={(e) => handleNavClick(e, 'catalog')} className="relative text-brand-light hover:text-white transition-colors duration-300 py-2 group">
                <span>Catálogo</span>
                <span className="absolute bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
              </a>
              <a href="#" onClick={handlePortfolioClick} className="relative text-brand-light hover:text-white transition-colors duration-300 py-2 group">
                <span>Portfólio</span>
                <span className="absolute bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
              </a>
              <a href="#" onClick={handleRedirectClick} className="relative text-brand-light hover:text-white transition-colors duration-300 py-2 group">
                <span>Planos</span>
                <span className="absolute bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-pink-400 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
              </a>
              <a href="#" onClick={handleGameRoomClick} className="relative text-brand-light hover:text-white transition-colors duration-300 py-2 group">
                <span>Sala de Jogos</span>
                <span className="absolute bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-red-500 to-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
              </a>
            </div>

            <div className="h-6 w-px bg-white/20 mx-4"></div>
            
            <div className="flex items-center space-x-2">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="p-2 rounded-full text-brand-gray hover:text-green-400 hover:bg-green-500/20 transition-all duration-300">
                <WhatsAppIcon className="w-5 h-5" />
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2 rounded-full text-brand-gray hover:text-purple-400 hover:bg-purple-500/20 transition-all duration-300">
                <InstagramIcon className="w-5 h-5" />
              </a>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(true)} className="text-brand-light hover:text-white transition-colors duration-300" aria-label="Abrir menu">
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} navigateTo={handleMobileNav} openPortfolio={openPortfolio} openRedirectModal={openRedirectModal} openGameRoom={openGameRoom} />
    </>
  );
};

export default Header;
