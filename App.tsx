
import React, { useState } from 'react';
import CursorGlow from './components/CursorGlow';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import WhatsAppButton from './components/WhatsAppButton';
import Footer from './components/Footer';
import CatalogPage from './pages/CatalogPage';
import PortfolioModal from './components/PortfolioModal';
import RedirectModal from './components/RedirectModal';
import BackgroundStars from './components/BackgroundStars';
import GameRoomModal from './components/GameRoomModal';

type NavigationTarget = {
  categoryName?: string;
};

const App: React.FC = () => {
  const [page, setPage] = useState<'home' | 'catalog'>('home');
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const [isRedirectModalOpen, setIsRedirectModalOpen] = useState(false);
  const [isGameRoomOpen, setIsGameRoomOpen] = useState(false);
  const [initialCatalogTarget, setInitialCatalogTarget] = useState<NavigationTarget | null>(null);

  const navigateTo = (targetPage: 'home' | 'catalog', target?: NavigationTarget) => {
    if (targetPage === 'catalog' && target) {
      setInitialCatalogTarget(target);
    } else {
      setInitialCatalogTarget(null);
    }
    setPage(targetPage);
    window.scrollTo(0, 0);
  };

  const openPortfolio = () => setIsPortfolioModalOpen(true);
  const closePortfolio = () => setIsPortfolioModalOpen(false);

  const openRedirectModal = () => setIsRedirectModalOpen(true);
  const closeRedirectModal = () => setIsRedirectModalOpen(false);
  
  const openGameRoom = () => setIsGameRoomOpen(true);
  const closeGameRoom = () => setIsGameRoomOpen(false);

  return (
    <div className="relative bg-brand-dark text-brand-light min-h-screen">
      <BackgroundStars />
      <div className="absolute inset-0 z-0 h-full w-full bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-pink-900/30 bg-[length:400%_400%] animate-gradient-pan" />
      <CursorGlow />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header navigateTo={navigateTo} openPortfolio={openPortfolio} openRedirectModal={openRedirectModal} />
        <main className="flex-grow">
          {page === 'home' && (
            <>
              <HeroSection 
                navigateTo={navigateTo} 
                openPortfolio={openPortfolio}
                openGameRoom={openGameRoom}
              />
            </>
          )}
          {page === 'catalog' && <CatalogPage navigateTo={navigateTo} initialTarget={initialCatalogTarget} />}
        </main>
        <Footer />
        <WhatsAppButton />
      </div>

      <PortfolioModal isOpen={isPortfolioModalOpen} onClose={closePortfolio} />
      <RedirectModal
        isOpen={isRedirectModalOpen}
        onClose={closeRedirectModal}
        title="Você está sendo redirecionado"
        message="Estamos te levando para nossa página de planos e soluções detalhadas. Aguarde um instante."
        redirectUrl="https://iarte.vercel.app/"
      />
      <GameRoomModal
        isOpen={isGameRoomOpen}
        onClose={closeGameRoom}
      />
    </div>
  );
};

export default App;
