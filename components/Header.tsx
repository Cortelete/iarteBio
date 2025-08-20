

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { InstagramIcon } from './icons/InstagramIcon';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { INSTAGRAM_URL, WHATSAPP_NUMBER, WHATSAPP_CONTACT_MESSAGE } from '../constants';
import { MenuIcon } from './icons/MenuIcon';
import MobileMenu from './MobileMenu';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

interface HeaderProps {
  navigateTo: (page: 'home' | 'catalog', target?: { categoryName?: string }) => void;
  openPortfolio: () => void;
  openRedirectModal: () => void;
  openGameRoom: () => void;
  openToolsModal: () => void;
  openExternalGamesModal: () => void;
}

const NavButton: React.FC<{label: string, isOpen: boolean, onClick: () => void}> = ({ label, isOpen, onClick }) => (
  <button onClick={onClick} className="relative text-brand-light hover:text-white transition-colors duration-300 py-2 group flex items-center gap-1">
    <span>{label}</span>
    <ChevronDownIcon className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
    <span className={`absolute bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transform transition-transform duration-300 ease-out ${isOpen ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
  </button>
);

const Header: React.FC<HeaderProps> = ({ navigateTo, openPortfolio, openRedirectModal, openGameRoom, openToolsModal, openExternalGamesModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_CONTACT_MESSAGE}`;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggleDropdown = (dropdown: string) => {
    setOpenDropdown(prev => prev === dropdown ? null : dropdown);
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, page: 'home' | 'catalog', target?: { categoryName?: string }) => {
    e.preventDefault();
    navigateTo(page, target);
    setOpenDropdown(null);
  };

  const handleActionClick = (action: () => void) => {
    action();
    setOpenDropdown(null);
  }

  const handleMobileNav = (page: 'home' | 'catalog', target?: { categoryName?: string }) => {
    navigateTo(page, target);
    setIsMenuOpen(false);
  };

  const dropdownItemClass = "block w-full text-left px-4 py-2 text-sm text-brand-light hover:bg-white/10 transition-colors rounded-md";

  const conhecaMaisItems = [
    { label: "Catálogo", action: (e: any) => handleNavClick(e, 'catalog') },
    { label: "Planos", action: () => handleActionClick(openRedirectModal) },
    { label: "Portfólio", action: () => handleActionClick(openPortfolio) },
    { label: "Ferramentas", action: () => handleActionClick(openToolsModal) },
  ];
  const queridinhosItems = [
      { label: "Flyers e Cartões", action: (e: any) => handleNavClick(e, 'catalog', { categoryName: 'Design e Identidade Visual' }) },
      { label: "Link na Bio", action: (e: any) => handleNavClick(e, 'catalog', { categoryName: 'Desenvolvimento Web' }) },
      { label: "Site com Catálogo", action: (e: any) => handleNavClick(e, 'catalog', { categoryName: 'Desenvolvimento Web' }) },
      { label: "Automações", action: (e: any) => handleNavClick(e, 'catalog', { categoryName: 'Automação' }) },
  ];
  const salaDeJogosItems = [
    { label: "Jogos Aqui", action: () => handleActionClick(openGameRoom) },
    { label: "Jogos Externos", action: () => handleActionClick(openExternalGamesModal) },
  ];

  const dropdownVariants: Variants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 25 } },
    exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.15 } }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-brand-dark/50 backdrop-blur-lg">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <a href="#" onClick={(e) => handleNavClick(e, 'home')} className="flex items-center gap-2 sm:gap-3" aria-label="Página inicial InteligenciArte.IA">
            <img src="/public/logo.png" alt="InteligenciArte.IA Logo" className="h-8 sm:h-10 w-auto filter drop-shadow-[0_0_8px_rgba(167,139,250,0.5)]" />
            <span className="font-bold text-md sm:text-lg tracking-tight text-gradient bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-[length:200%_auto] animate-text-gradient-pan">InteligenciArte.IA</span>
          </a>
          
          <nav ref={menuRef} className="hidden md:flex items-center space-x-2">
            <div className="flex items-center space-x-6">
              {/* Conheça mais */}
              <div className="relative">
                <NavButton label="Conheça mais" isOpen={openDropdown === 'conheca'} onClick={() => handleToggleDropdown('conheca')} />
                <AnimatePresence>
                  {openDropdown === 'conheca' && (
                    <motion.div variants={dropdownVariants} initial="hidden" animate="visible" exit="exit" className="absolute top-full mt-2 w-48 bg-brand-dark/80 backdrop-blur-lg border border-white/10 rounded-lg p-2 shadow-lg">
                      {conhecaMaisItems.map(item => <button key={item.label} onClick={item.action as any} className={dropdownItemClass}>{item.label}</button>)}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {/* Queridinhos */}
              <div className="relative">
                <NavButton label="Queridinhos" isOpen={openDropdown === 'queridinhos'} onClick={() => handleToggleDropdown('queridinhos')} />
                <AnimatePresence>
                  {openDropdown === 'queridinhos' && (
                    <motion.div variants={dropdownVariants} initial="hidden" animate="visible" exit="exit" className="absolute top-full mt-2 w-48 bg-brand-dark/80 backdrop-blur-lg border border-white/10 rounded-lg p-2 shadow-lg">
                       {queridinhosItems.map(item => <a href="#" key={item.label} onClick={item.action} className={dropdownItemClass}>{item.label}</a>)}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {/* Sala de Jogos */}
              <div className="relative">
                 <NavButton label="Sala de Jogos" isOpen={openDropdown === 'jogos'} onClick={() => handleToggleDropdown('jogos')} />
                <AnimatePresence>
                  {openDropdown === 'jogos' && (
                    <motion.div variants={dropdownVariants} initial="hidden" animate="visible" exit="exit" className="absolute top-full mt-2 w-48 bg-brand-dark/80 backdrop-blur-lg border border-white/10 rounded-lg p-2 shadow-lg">
                       {salaDeJogosItems.map(item => <button key={item.label} onClick={item.action} className={dropdownItemClass}>{item.label}</button>)}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
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

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(true)} className="text-brand-light hover:text-white transition-colors duration-300" aria-label="Abrir menu">
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        navigateTo={handleMobileNav} 
        openPortfolio={openPortfolio} 
        openRedirectModal={openRedirectModal} 
        openGameRoom={openGameRoom} 
        openToolsModal={openToolsModal}
        openExternalGamesModal={openExternalGamesModal}
      />
    </>
  );
};

export default Header;