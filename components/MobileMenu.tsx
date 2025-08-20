
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloseIcon } from './icons/CloseIcon';
import { InstagramIcon } from './icons/InstagramIcon';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { INSTAGRAM_URL, WHATSAPP_NUMBER, WHATSAPP_CONTACT_MESSAGE } from '../constants';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigateTo: (page: 'home' | 'catalog', target?: { categoryName?: string }) => void;
  openPortfolio: () => void;
  openRedirectModal: () => void;
  openGameRoom: () => void;
  openToolsModal: () => void;
  openExternalGamesModal: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, navigateTo, openPortfolio, openRedirectModal, openGameRoom, openToolsModal, openExternalGamesModal }) => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_CONTACT_MESSAGE}`;

  const toggleSection = (section: string) => {
    setOpenSection(prev => (prev === section ? null : section));
  };

  const handleNavClick = (page: 'home' | 'catalog', target?: { categoryName?: string }) => {
    navigateTo(page, target);
    onClose();
  };

  const handleActionClick = (action: () => void) => {
    action();
    onClose();
  };
  
  const NavItem: React.FC<{label: string, action: () => void, delay: number}> = ({ label, action, delay }) => (
    <motion.button
      onClick={action}
      className="text-2xl text-brand-light hover:text-white transition-colors w-full text-center py-2"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: delay * 0.1 } }}
    >
      {label}
    </motion.button>
  );

  const SubNavItem: React.FC<{label: string, action: () => void}> = ({ label, action }) => (
     <motion.button
      onClick={action}
      className="text-lg text-brand-gray hover:text-white transition-colors w-full text-center py-1"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.2 }}
    >
      {label}
    </motion.button>
  );
  
  const CollapsibleNavItem: React.FC<{label: string, sectionKey: string, delay: number, children: React.ReactNode}> = ({ label, sectionKey, delay, children }) => (
     <motion.div 
      className="w-full"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: delay * 0.1 } }}
     >
      <button onClick={() => toggleSection(sectionKey)} className="flex items-center justify-center gap-2 text-2xl text-brand-light hover:text-white transition-colors w-full text-center py-2">
        <span>{label}</span>
        <ChevronDownIcon className={`w-5 h-5 transition-transform duration-300 ${openSection === sectionKey ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {openSection === sectionKey && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 mt-2 overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  const conhecaMaisItems = [
    { label: "Catálogo", action: () => handleNavClick('catalog') },
    { label: "Planos", action: () => handleActionClick(openRedirectModal) },
    { label: "Portfólio", action: () => handleActionClick(openPortfolio) },
    { label: "Ferramentas", action: () => handleActionClick(openToolsModal) },
  ];
  const queridinhosItems = [
      { label: "Flyers e Cartões", action: () => handleNavClick('catalog', { categoryName: 'Design e Identidade Visual' }) },
      { label: "Link na Bio", action: () => handleNavClick('catalog', { categoryName: 'Desenvolvimento Web' }) },
      { label: "Site com Catálogo", action: () => handleNavClick('catalog', { categoryName: 'Desenvolvimento Web' }) },
      { label: "Automações", action: () => handleNavClick('catalog', { categoryName: 'Automação' }) },
  ];
  const salaDeJogosItems = [
    { label: "Jogos Aqui", action: () => handleActionClick(openGameRoom) },
    { label: "Jogos Externos", action: () => handleActionClick(openExternalGamesModal) },
  ];

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

            <nav className="flex flex-col items-center gap-4 text-center">
              <NavItem label="Início" action={() => handleNavClick('home')} delay={1} />
              
              <CollapsibleNavItem label="Conheça mais" sectionKey="conheca" delay={2}>
                 {conhecaMaisItems.map(item => <SubNavItem key={item.label} label={item.label} action={item.action} />)}
              </CollapsibleNavItem>

              <CollapsibleNavItem label="Queridinhos" sectionKey="queridinhos" delay={3}>
                 {queridinhosItems.map(item => <SubNavItem key={item.label} label={item.label} action={item.action} />)}
              </CollapsibleNavItem>

              <CollapsibleNavItem label="Sala de Jogos" sectionKey="jogos" delay={4}>
                 {salaDeJogosItems.map(item => <SubNavItem key={item.label} label={item.label} action={item.action} />)}
              </CollapsibleNavItem>
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
