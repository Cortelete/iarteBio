

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
        className="hero-container relative z-10 w-full max-w-3xl mx-auto opacity-0 animate-fade-in-up bg-brand-dark/40 backdrop-blur-lg border border-white/10 rounded-[2.08cqi] p-[6.25cqi] text-center flex flex-col items-center shadow-2xl shadow-purple-900/20"
        style={{ animationDelay: '100ms' }}
      >
        <div className="mb-[3.125cqi]">
          <img src="/logo.png" alt="InteligenciArte.IA" className="h-[12.5cqi] w-auto mx-auto filter drop-shadow-[0_0_1.95cqi_rgba(167,139,250,0.6)]" />
        </div>

        <h1 className="text-[6.25cqi] font-bold text-gradient bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-[length:200%_auto] animate-text-gradient-pan mb-[1.04cqi] pb-[1.04cqi]">
          InteligenciArte.IA
        </h1>

        <h2 className="text-[2.6cqi] font-semibold text-white animate-text-glow mb-[5.2cqi]">
          Inteligência Artificial & Design
        </h2>

        <p className="text-[2.34cqi] text-brand-gray max-w-3xl mb-[6.25cqi]">
          Transformamos ideias em realidade digital com soluções criativas e tecnológicas que impulsionam o seu negócio.
        </p>

        <div className="flex flex-wrap justify-center items-center gap-[2.08cqi] mb-[4.16cqi] w-full">
          <button
            onClick={handleCatalogClick}
            className="group relative inline-block text-[2.08cqi] font-semibold text-white py-[1.3cqi] px-[3.64cqi] rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 overflow-hidden"
          >
            <span className="relative z-10">Catálogo</span>
            <span className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-full">
              <span className="absolute block w-1/2 h-[300%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out -translate-x-[150%] skew-x-[-20deg] group-hover:translate-x-[150%]"></span>
            </span>
          </button>
          <button
            onClick={openPortfolio}
            className="group relative inline-block text-[2.08cqi] font-semibold text-white py-[1.3cqi] px-[3.64cqi] rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-pink-500/30 overflow-hidden"
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
            className="group relative inline-block text-[2.08cqi] font-semibold text-white py-[1.3cqi] px-[3.64cqi] rounded-full bg-gradient-to-r from-pink-500 to-orange-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30 overflow-hidden"
          >
            <span className="relative z-10">Planos</span>
            <span className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-full">
              <span className="absolute block w-1/2 h-[300%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out -translate-x-[150%] skew-x-[-20deg] group-hover:translate-x-[150%]"></span>
            </span>
          </a>
          <button
            onClick={openGameRoom}
            className="group relative inline-flex items-center justify-center gap-[1cqi] text-[2.08cqi] font-semibold text-white py-[1.3cqi] px-[3.64cqi] rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-[length:200%_auto] transition-all duration-300 transform hover:scale-105 shadow-lg shadow-pink-500/40 hover:shadow-xl hover:shadow-red-500/50 overflow-hidden animate-[colorful-gradient-pan_4s_ease_infinite,subtle-pulse_2.5s_cubic-bezier(0.4,0,0.6,1)_infinite]"
          >
            <GamepadIcon className="w-[2.6cqi] h-[2.6cqi] transition-transform group-hover:rotate-[-15deg] duration-300" />
            <span className="relative z-10">Sala de Jogos</span>
            <span className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-full">
              <span className="absolute block w-1/2 h-[300%] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-in-out -translate-x-[150%] skew-x-[-20deg] group-hover:translate-x-[150%]"></span>
            </span>
          </button>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-[1.56cqi] mb-[5.2cqi] w-full">
          <button
            onClick={() => navigateTo('catalog', { categoryName: 'Design e Identidade Visual' })}
            className="text-[1.82cqi] font-medium text-brand-gray bg-white/5 border border-white/10 rounded-full py-[0.78cqi] px-[2.08cqi] hover:bg-white/10 hover:text-white transition-all duration-300"
          >
            Flyers e Cartões
          </button>
          <button
            onClick={() => navigateTo('catalog', { categoryName: 'Desenvolvimento Web' })}
            className="text-[1.82cqi] font-medium text-brand-gray bg-white/5 border border-white/10 rounded-full py-[0.78cqi] px-[2.08cqi] hover:bg-white/10 hover:text-white transition-all duration-300"
          >
            Link na Bio
          </button>
          <button
            onClick={() => navigateTo('catalog', { categoryName: 'Desenvolvimento Web' })}
            className="text-[1.82cqi] font-medium text-brand-gray bg-white/5 border border-white/10 rounded-full py-[0.78cqi] px-[2.08cqi] hover:bg-white/10 hover:text-white transition-all duration-300"
          >
            Site Simples
          </button>
          <button
            onClick={() => navigateTo('catalog', { categoryName: 'Automação' })}
            className="text-[1.82cqi] font-medium text-brand-gray bg-white/5 border border-white/10 rounded-full py-[0.78cqi] px-[2.08cqi] hover:bg-white/10 hover:text-white transition-all duration-300"
          >
            Automações
          </button>
        </div>
        
        <div className="flex items-center gap-[2.6cqi]">
          {/* InteligenciArte.IA Instagram */}
          <div className="relative group">
            <a 
              href="https://www.instagram.com/inteligenciarte.ia" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block rounded-full p-[1.56cqi] bg-fuchsia-500/10 border border-white/10 transition-all duration-300 ease-in-out shadow-lg shadow-fuchsia-500/30 group-hover:scale-110 group-hover:-translate-y-1 group-hover:bg-fuchsia-500/20 group-hover:shadow-xl group-hover:shadow-fuchsia-500/50" 
              aria-describedby="tooltip-ia-insta"
              aria-label="InteligenciArte.IA Instagram"
            >
              <InstagramIcon className="w-[3.125cqi] h-[3.125cqi] text-fuchsia-400 group-hover:text-fuchsia-300 transition-colors duration-300" />
            </a>
            <div 
              id="tooltip-ia-insta" 
              role="tooltip" 
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-[1.04cqi] w-max px-[1.56cqi] py-[0.78cqi] bg-brand-dark/80 backdrop-blur-sm border border-white/10 rounded-[1.04cqi] shadow-lg text-[1.82cqi] text-brand-light whitespace-nowrap opacity-0 transform translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none"
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
              className="block rounded-full p-[1.56cqi] bg-fuchsia-500/10 border border-white/10 transition-all duration-300 ease-in-out shadow-lg shadow-fuchsia-500/30 group-hover:scale-110 group-hover:-translate-y-1 group-hover:bg-fuchsia-500/20 group-hover:shadow-xl group-hover:shadow-fuchsia-500/50"
              aria-describedby="tooltip-davi-insta"
              aria-label="Davi Cortelete Instagram"
            >
              <InstagramIcon className="w-[3.125cqi] h-[3.125cqi] text-fuchsia-400 group-hover:text-fuchsia-300 transition-colors duration-300" />
            </a>
            <div 
              id="tooltip-davi-insta" 
              role="tooltip" 
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-[1.04cqi] w-max px-[1.56cqi] py-[0.78cqi] bg-brand-dark/80 backdrop-blur-sm border border-white/10 rounded-[1.04cqi] shadow-lg text-[1.82cqi] text-brand-light whitespace-nowrap opacity-0 transform translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none"
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
              className="block rounded-full p-[1.56cqi] bg-pink-500/10 border border-white/10 transition-all duration-300 ease-in-out shadow-lg shadow-pink-500/30 group-hover:scale-110 group-hover:-translate-y-1 group-hover:bg-pink-500/20 group-hover:shadow-xl group-hover:shadow-pink-500/50"
              aria-describedby="tooltip-tiktok"
              aria-label="Davi Cortelete TikTok"
            >
              <TikTokIcon className="w-[3.125cqi] h-[3.125cqi] text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
            </a>
            <div 
              id="tooltip-tiktok" 
              role="tooltip" 
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-[1.04cqi] w-max px-[1.56cqi] py-[0.78cqi] bg-brand-dark/80 backdrop-blur-sm border border-white/10 rounded-[1.04cqi] shadow-lg text-[1.82cqi] text-brand-light whitespace-nowrap opacity-0 transform translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none"
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
              className="block rounded-full p-[1.56cqi] bg-blue-500/10 border border-white/10 transition-all duration-300 ease-in-out shadow-lg shadow-blue-500/30 group-hover:scale-110 group-hover:-translate-y-1 group-hover:bg-blue-500/20 group-hover:shadow-xl group-hover:shadow-blue-500/50" 
              aria-describedby="tooltip-linkedin"
              aria-label="Davi Cortelete LinkedIn"
            >
              <LinkedInIcon className="w-[3.125cqi] h-[3.125cqi] text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
            </a>
            <div 
              id="tooltip-linkedin" 
              role="tooltip" 
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-[1.04cqi] w-max px-[1.56cqi] py-[0.78cqi] bg-brand-dark/80 backdrop-blur-sm border border-white/10 rounded-[1.04cqi] shadow-lg text-[1.82cqi] text-brand-light whitespace-nowrap opacity-0 transform translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none"
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