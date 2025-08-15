

import React from 'react';
import { InstagramIcon } from './icons/InstagramIcon';
import { LinkedInIcon } from './icons/LinkedInIcon';
import { TikTokIcon } from './icons/TikTokIcon';


interface HeroSectionProps {
  navigateTo: (page: 'catalog', target?: { categoryName?: string }) => void;
  openPortfolio: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ navigateTo, openPortfolio }) => {

  const handleCatalogClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    navigateTo('catalog');
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative pt-24 pb-12 sm:pb-16 px-4">
      <div
        className="relative z-10 w-full max-w-3xl mx-auto opacity-0 animate-fade-in-up bg-brand-dark/40 backdrop-blur-lg border border-white/10 rounded-2xl p-4 sm:p-8 md:p-12 text-center flex flex-col items-center shadow-2xl shadow-purple-900/20"
        style={{ animationDelay: '100ms' }}
      >
        <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-[2.8rem] font-bold text-gradient bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-[length:200%_auto] animate-text-gradient-pan mb-6 sm:mb-8 pb-3 sm:pb-4">
          InteligenciArte.IA
        </h1>

        <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white animate-text-glow mb-6 sm:mb-8">
          Inteligência Artificial & Design
        </h2>

        <p className="hidden sm:block text-base sm:text-lg text-brand-gray max-w-3xl mb-10 sm:mb-12">
          Transformamos ideias em realidade digital com soluções criativas e tecnológicas que impulsionam o seu negócio.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8 w-full">
          <button
            onClick={handleCatalogClick}
            className="group w-full sm:w-auto relative inline-block text-base sm:text-base font-semibold text-white py-2.5 px-6 sm:py-2.5 sm:px-7 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 overflow-hidden"
          >
            <span className="relative z-10">Catálogo</span>
            <span className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-full">
              <span className="absolute block w-1/2 h-[300%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out -translate-x-[150%] skew-x-[-20deg] group-hover:translate-x-[150%]"></span>
            </span>
          </button>
          <button
            onClick={openPortfolio}
            className="group w-full sm:w-auto relative inline-block text-base sm:text-base font-semibold text-white py-2.5 px-6 sm:py-2.5 sm:px-7 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-pink-500/30 overflow-hidden"
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
            className="group w-full sm:w-auto relative inline-block text-base sm:text-base font-semibold text-white py-2.5 px-6 sm:py-2.5 sm:px-7 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30 overflow-hidden"
          >
            <span className="relative z-10">Planos</span>
            <span className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-full">
              <span className="absolute block w-1/2 h-[300%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out -translate-x-[150%] skew-x-[-20deg] group-hover:translate-x-[150%]"></span>
            </span>
          </a>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-10 w-full">
          <button
            onClick={() => navigateTo('catalog', { categoryName: 'Design e Identidade Visual' })}
            className="text-xs sm:text-sm font-medium text-brand-gray bg-white/5 border border-white/10 rounded-full py-1.5 px-3 sm:px-4 hover:bg-white/10 hover:text-white transition-all duration-300"
          >
            Flyers e Cartões
          </button>
          <button
            onClick={() => navigateTo('catalog', { categoryName: 'Desenvolvimento Web' })}
            className="text-xs sm:text-sm font-medium text-brand-gray bg-white/5 border border-white/10 rounded-full py-1.5 px-3 sm:px-4 hover:bg-white/10 hover:text-white transition-all duration-300"
          >
            Link na Bio
          </button>
          <button
            onClick={() => navigateTo('catalog', { categoryName: 'Desenvolvimento Web' })}
            className="text-xs sm:text-sm font-medium text-brand-gray bg-white/5 border border-white/10 rounded-full py-1.5 px-3 sm:px-4 hover:bg-white/10 hover:text-white transition-all duration-300"
          >
            Site Simples
          </button>
          <button
            onClick={() => navigateTo('catalog', { categoryName: 'Automação' })}
            className="text-xs sm:text-sm font-medium text-brand-gray bg-white/5 border border-white/10 rounded-full py-1.5 px-3 sm:px-4 hover:bg-white/10 hover:text-white transition-all duration-300"
          >
            Automações
          </button>
        </div>
        
        <div className="flex items-center gap-3 sm:gap-5">
          {/* InteligenciArte.IA Instagram */}
          <div className="relative group">
            <a 
              href="https://www.instagram.com/inteligenciarte.ia" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block rounded-full p-2 sm:p-3 bg-fuchsia-500/10 border border-white/10 transition-all duration-300 ease-in-out shadow-lg shadow-fuchsia-500/30 group-hover:scale-110 group-hover:-translate-y-1 group-hover:bg-fuchsia-500/20 group-hover:shadow-xl group-hover:shadow-fuchsia-500/50" 
              aria-describedby="tooltip-ia-insta"
              aria-label="InteligenciArte.IA Instagram"
            >
              <InstagramIcon className="w-5 h-5 sm:w-6 sm:h-6 text-fuchsia-400 group-hover:text-fuchsia-300 transition-colors duration-300" />
            </a>
            <div 
              id="tooltip-ia-insta" 
              role="tooltip" 
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-1.5 bg-brand-dark/80 backdrop-blur-sm border border-white/10 rounded-lg shadow-lg text-sm text-brand-light whitespace-nowrap opacity-0 transform translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none"
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
              className="block rounded-full p-2 sm:p-3 bg-fuchsia-500/10 border border-white/10 transition-all duration-300 ease-in-out shadow-lg shadow-fuchsia-500/30 group-hover:scale-110 group-hover:-translate-y-1 group-hover:bg-fuchsia-500/20 group-hover:shadow-xl group-hover:shadow-fuchsia-500/50"
              aria-describedby="tooltip-davi-insta"
              aria-label="Davi Cortelete Instagram"
            >
              <InstagramIcon className="w-5 h-5 sm:w-6 sm:h-6 text-fuchsia-400 group-hover:text-fuchsia-300 transition-colors duration-300" />
            </a>
            <div 
              id="tooltip-davi-insta" 
              role="tooltip" 
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-1.5 bg-brand-dark/80 backdrop-blur-sm border border-white/10 rounded-lg shadow-lg text-sm text-brand-light whitespace-nowrap opacity-0 transform translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none"
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
              className="block rounded-full p-2 sm:p-3 bg-pink-500/10 border border-white/10 transition-all duration-300 ease-in-out shadow-lg shadow-pink-500/30 group-hover:scale-110 group-hover:-translate-y-1 group-hover:bg-pink-500/20 group-hover:shadow-xl group-hover:shadow-pink-500/50"
              aria-describedby="tooltip-tiktok"
              aria-label="Davi Cortelete TikTok"
            >
              <TikTokIcon className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
            </a>
            <div 
              id="tooltip-tiktok" 
              role="tooltip" 
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-1.5 bg-brand-dark/80 backdrop-blur-sm border border-white/10 rounded-lg shadow-lg text-sm text-brand-light whitespace-nowrap opacity-0 transform translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none"
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
              className="block rounded-full p-2 sm:p-3 bg-blue-500/10 border border-white/10 transition-all duration-300 ease-in-out shadow-lg shadow-blue-500/30 group-hover:scale-110 group-hover:-translate-y-1 group-hover:bg-blue-500/20 group-hover:shadow-xl group-hover:shadow-blue-500/50" 
              aria-describedby="tooltip-linkedin"
              aria-label="Davi Cortelete LinkedIn"
            >
              <LinkedInIcon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
            </a>
            <div 
              id="tooltip-linkedin" 
              role="tooltip" 
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-1.5 bg-brand-dark/80 backdrop-blur-sm border border-white/10 rounded-lg shadow-lg text-sm text-brand-light whitespace-nowrap opacity-0 transform translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none"
            >
              Davi Cortelete
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
