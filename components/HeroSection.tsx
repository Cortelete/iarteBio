
import React from 'react';
import { InstagramIcon } from './icons/InstagramIcon';
import { LinkedInIcon } from './icons/LinkedInIcon';
import { TikTokIcon } from './icons/TikTokIcon';
import { GamepadIcon } from './icons/GamepadIcon';


interface HeroSectionProps {
  navigateTo: (page: 'catalog', target?: { categoryName?: string }) => void;
  openPortfolio: () => void;
  openGameRoom: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ navigateTo, openPortfolio, openGameRoom }) => {

  const handleCatalogClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    navigateTo('catalog');
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative pt-16 sm:pt-24 pb-12 sm:pb-16 px-4">
      <div
        className="hero-container relative z-10 w-full max-w-3xl mx-auto opacity-0 animate-fade-in-up bg-brand-dark/40 backdrop-blur-lg border border-white/10 rounded-[clamp(0.5rem,2.08cqi,1rem)] p-[clamp(1.25rem,5cqi,2.5rem)] text-center flex flex-col items-center shadow-2xl shadow-purple-900/20 overflow-hidden"
        style={{ animationDelay: '100ms' }}
      >
        <img src="/logo.png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-5 pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center">
            <div className="mb-[clamp(1.5rem,6cqi,3rem)]">
              <img src="/logo.png" alt="InteligenciArte.IA" className="h-[clamp(8rem,40cqi,20rem)] w-auto mx-auto filter drop-shadow-[0_0_clamp(1rem,5cqi,2.5rem)_rgba(167,139,250,0.7)]" />
            </div>

            <h1 className="text-[clamp(1.5rem,7cqi,3.5rem)] font-bold text-gradient bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-[length:200%_auto] animate-text-gradient-pan mb-[clamp(0.25rem,1.04cqi,0.5rem)] pb-[clamp(0.25rem,1.04cqi,0.5rem)]">
              InteligenciArte.IA
            </h1>

            <h2 className="text-[clamp(0.9rem,3.5cqi,1.25rem)] font-semibold text-white animate-text-glow mb-[clamp(1rem,4cqi,2rem)]">
              Inteligência Artificial & Design
            </h2>

            <p className="hidden sm:block text-[clamp(0.85rem,3cqi,1.05rem)] text-brand-gray max-w-3xl mb-[clamp(1.25rem,5cqi,2.5rem)]">
              Transformamos ideias em realidade digital com soluções criativas e tecnológicas que impulsionam o seu negócio.
            </p>

            <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center items-center gap-[clamp(0.5rem,2cqi,0.8rem)] mb-[clamp(1rem,4cqi,1.75rem)] w-full max-w-sm sm:max-w-none mx-auto">
              <button
                onClick={handleCatalogClick}
                className="group relative w-full sm:w-auto inline-block text-[clamp(0.8rem,2.5cqi,1rem)] font-semibold text-white py-[clamp(0.4rem,1.5cqi,0.6rem)] px-[clamp(0.8rem,3cqi,1.6rem)] rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 overflow-hidden"
              >
                <span className="relative z-10">Catálogo</span>
                <span className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-full">
                  <span className="absolute block w-1/2 h-[300%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out -translate-x-[150%] skew-x-[-20deg] group-hover:translate-x-[150%]"></span>
                </span>
              </button>
              <button
                onClick={openPortfolio}
                className="group relative w-full sm:w-auto inline-block text-[clamp(0.8rem,2.5cqi,1rem)] font-semibold text-white py-[clamp(0.4rem,1.5cqi,0.6rem)] px-[clamp(0.8rem,3cqi,1.6rem)] rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-pink-500/30 overflow-hidden"
              >
                <span className="relative z-10">Portfólio</span>
                <span className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-full">
                  <span className="absolute block w-1/2 h-[300%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out -translate-x-[150%] skew-x-[-20deg] group-hover:translate-x-[150%]"></span>
                </span>
              </button>
              <a
                href="https://iarte.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-full sm:w-auto inline-block text-center text-[clamp(0.8rem,2.5cqi,1rem)] font-semibold text-white py-[clamp(0.4rem,1.5cqi,0.6rem)] px-[clamp(0.8rem,3cqi,1.6rem)] rounded-full bg-gradient-to-r from-pink-500 to-orange-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30 overflow-hidden"
              >
                <span className="relative z-10">Planos</span>
                <span className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-full">
                  <span className="absolute block w-1/2 h-[300%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out -translate-x-[150%] skew-x-[-20deg] group-hover:translate-x-[150%]"></span>
                </span>
              </a>
              <button
                onClick={openGameRoom}
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-[clamp(0.25rem,1cqi,0.5rem)] text-[clamp(0.8rem,2.5cqi,1rem)] font-semibold text-white py-[clamp(0.4rem,1.5cqi,0.6rem)] px-[clamp(0.8rem,3cqi,1.6rem)] rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-[length:200%_auto] transition-all duration-300 transform hover:scale-105 shadow-lg shadow-pink-500/40 hover:shadow-xl hover:shadow-red-500/50 overflow-hidden animate-[colorful-gradient-pan_4s_ease_infinite,subtle-pulse_2.5s_cubic-bezier(0.4,0,0.6,1)_infinite]"
              >
                <GamepadIcon className="w-[clamp(1.1rem,2.6cqi,1.5rem)] h-[clamp(1.1rem,2.6cqi,1.5rem)] transition-transform group-hover:rotate-[-15deg] duration-300" />
                <span className="relative z-10">Sala de Jogos</span>
                <span className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-full">
                  <span className="absolute block w-1/2 h-[300%] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-in-out -translate-x-[150%] skew-x-[-20deg] group-hover:translate-x-[150%]"></span>
                </span>
              </button>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-[clamp(0.4rem,1.5cqi,0.7rem)] mb-[clamp(1.25rem,5cqi,2.25rem)] w-full">
              <button
                onClick={() => navigateTo('catalog', { categoryName: 'Design e Identidade Visual' })}
                className="text-[clamp(0.7rem,2.2cqi,0.85rem)] font-medium text-brand-gray bg-white/5 border border-white/10 rounded-full py-[clamp(0.2rem,1cqi,0.35rem)] px-[clamp(0.6rem,2.5cqi,1.1rem)] hover:bg-white/10 hover:text-white transition-all duration-300"
              >
                Flyers e Cartões
              </button>
              <button
                onClick={() => navigateTo('catalog', { categoryName: 'Desenvolvimento Web' })}
                className="text-[clamp(0.7rem,2.2cqi,0.85rem)] font-medium text-brand-gray bg-white/5 border border-white/10 rounded-full py-[clamp(0.2rem,1cqi,0.35rem)] px-[clamp(0.6rem,2.5cqi,1.1rem)] hover:bg-white/10 hover:text-white transition-all duration-300"
              >
                Link na Bio
              </button>
              <button
                onClick={() => navigateTo('catalog', { categoryName: 'Desenvolvimento Web' })}
                className="text-[clamp(0.7rem,2.2cqi,0.85rem)] font-medium text-brand-gray bg-white/5 border border-white/10 rounded-full py-[clamp(0.2rem,1cqi,0.35rem)] px-[clamp(0.6rem,2.5cqi,1.1rem)] hover:bg-white/10 hover:text-white transition-all duration-300"
              >
                Site Simples
              </button>
              <button
                onClick={() => navigateTo('catalog', { categoryName: 'Automação' })}
                className="text-[clamp(0.7rem,2.2cqi,0.85rem)] font-medium text-brand-gray bg-white/5 border border-white/10 rounded-full py-[clamp(0.2rem,1cqi,0.35rem)] px-[clamp(0.6rem,2.5cqi,1.1rem)] hover:bg-white/10 hover:text-white transition-all duration-300"
              >
                Automações
              </button>
            </div>
            
            <div className="flex items-center gap-[clamp(0.75rem,3cqi,1.25rem)]">
              {/* InteligenciArte.IA Instagram */}
              <div className="relative group">
                <a 
                  href="https://www.instagram.com/inteligenciarte.ia" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block rounded-full p-[clamp(0.4rem,1.5cqi,0.7rem)] bg-fuchsia-500/10 border border-white/10 transition-all duration-300 ease-in-out shadow-lg shadow-fuchsia-500/30 group-hover:scale-110 group-hover:-translate-y-1 group-hover:bg-fuchsia-500/20 group-hover:shadow-xl group-hover:shadow-fuchsia-500/50" 
                  aria-describedby="tooltip-ia-insta"
                  aria-label="InteligenciArte.IA Instagram"
                >
                  <InstagramIcon className="w-[clamp(1.3rem,4cqi,2.1rem)] h-[clamp(1.3rem,4cqi,2.1rem)] text-fuchsia-400 group-hover:text-fuchsia-300 transition-colors duration-300" />
                </a>
                <div 
                  id="tooltip-ia-insta" 
                  role="tooltip" 
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-[clamp(0.25rem,1.04cqi,0.5rem)] w-max px-[clamp(0.5rem,1.56cqi,0.75rem)] py-[clamp(0.25rem,0.78cqi,0.4rem)] bg-brand-dark/80 backdrop-blur-sm border border-white/10 rounded-[clamp(0.3rem,1.04cqi,0.6rem)] shadow-lg text-[clamp(0.75rem,1.82cqi,0.9rem)] text-brand-light whitespace-nowrap opacity-0 transform translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none"
                >
                  @InteligenciArte.IA
                </div>
              </div>
              
              {/* DaviCortelete Instagram */}
              <div className="relative group">
                <a 
                  href="https://www.instagram.com/davicortelete" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block rounded-full p-[clamp(0.4rem,1.5cqi,0.7rem)] bg-fuchsia-500/10 border border-white/10 transition-all duration-300 ease-in-out shadow-lg shadow-fuchsia-500/30 group-hover:scale-110 group-hover:-translate-y-1 group-hover:bg-fuchsia-500/20 group-hover:shadow-xl group-hover:shadow-fuchsia-500/50"
                  aria-describedby="tooltip-davi-insta"
                  aria-label="Davi Cortelete Instagram"
                >
                  <InstagramIcon className="w-[clamp(1.3rem,4cqi,2.1rem)] h-[clamp(1.3rem,4cqi,2.1rem)] text-fuchsia-400 group-hover:text-fuchsia-300 transition-colors duration-300" />
                </a>
                <div 
                  id="tooltip-davi-insta" 
                  role="tooltip" 
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-[clamp(0.25rem,1.04cqi,0.5rem)] w-max px-[clamp(0.5rem,1.56cqi,0.75rem)] py-[clamp(0.25rem,0.78cqi,0.4rem)] bg-brand-dark/80 backdrop-blur-sm border border-white/10 rounded-[clamp(0.3rem,1.04cqi,0.6rem)] shadow-lg text-[clamp(0.75rem,1.82cqi,0.9rem)] text-brand-light whitespace-nowrap opacity-0 transform translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none"
                >
                  @DavICortelete
                </div>
              </div>

              {/* TikTok */}
              <div className="relative group">
                <a 
                  href="https://www.tiktok.com/@davicortelete" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block rounded-full p-[clamp(0.4rem,1.5cqi,0.7rem)] bg-pink-500/10 border border-white/10 transition-all duration-300 ease-in-out shadow-lg shadow-pink-500/30 group-hover:scale-110 group-hover:-translate-y-1 group-hover:bg-pink-500/20 group-hover:shadow-xl group-hover:shadow-pink-500/50"
                  aria-describedby="tooltip-tiktok"
                  aria-label="Davi Cortelete TikTok"
                >
                  <TikTokIcon className="w-[clamp(1.3rem,4cqi,2.1rem)] h-[clamp(1.3rem,4cqi,2.1rem)] text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
                </a>
                <div 
                  id="tooltip-tiktok" 
                  role="tooltip" 
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-[clamp(0.25rem,1.04cqi,0.5rem)] w-max px-[clamp(0.5rem,1.56cqi,0.75rem)] py-[clamp(0.25rem,0.78cqi,0.4rem)] bg-brand-dark/80 backdrop-blur-sm border border-white/10 rounded-[clamp(0.3rem,1.04cqi,0.6rem)] shadow-lg text-[clamp(0.75rem,1.82cqi,0.9rem)] text-brand-light whitespace-nowrap opacity-0 transform translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none"
                >
                  @DaviCortelete
                </div>
              </div>

              {/* LinkedIn */}
              <div className="relative group">
                <a 
                  href="https://www.linkedin.com/in/davicortelete" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block rounded-full p-[clamp(0.4rem,1.5cqi,0.7rem)] bg-blue-500/10 border border-white/10 transition-all duration-300 ease-in-out shadow-lg shadow-blue-500/30 group-hover:scale-110 group-hover:-translate-y-1 group-hover:bg-blue-500/20 group-hover:shadow-xl group-hover:shadow-blue-500/50" 
                  aria-describedby="tooltip-linkedin"
                  aria-label="Davi Cortelete LinkedIn"
                >
                  <LinkedInIcon className="w-[clamp(1.3rem,4cqi,2.1rem)] h-[clamp(1.3rem,4cqi,2.1rem)] text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                </a>
                <div 
                  id="tooltip-linkedin" 
                  role="tooltip" 
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-[clamp(0.25rem,1.04cqi,0.5rem)] w-max px-[clamp(0.5rem,1.56cqi,0.75rem)] py-[clamp(0.25rem,0.78cqi,0.4rem)] bg-brand-dark/80 backdrop-blur-sm border border-white/10 rounded-[clamp(0.3rem,1.04cqi,0.6rem)] shadow-lg text-[clamp(0.75rem,1.82cqi,0.9rem)] text-brand-light whitespace-nowrap opacity-0 transform translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none"
                >
                  Davi Cortelete
                </div>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
