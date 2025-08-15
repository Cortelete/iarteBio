
import React from 'react';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  onSelect: (service: Service) => void;
  animationDelay: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelect, animationDelay }) => {
  const handleCatalogClick = (e: React.MouseEvent) => {
    e.preventDefault();
    alert(`A página de detalhes para "${service.title}" será implementada em breve!`);
  };

  return (
    <div 
      className="group relative rounded-2xl p-px bg-gradient-to-br from-blue-500/50 via-purple-500/50 to-pink-500/50 transform transition-transform duration-300 hover:scale-105 opacity-0 animate-fade-in-up flex flex-col"
      style={{ animationDelay }}
    >
      <div className="relative flex-1 bg-brand-dark/60 backdrop-blur-xl rounded-[15px] p-8 text-center flex flex-col items-center justify-between overflow-hidden">
        {/* Gleam effect */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-[15px]">
          <span className="absolute block w-1/2 h-[300%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-in-out -translate-x-[150%] skew-x-[-20deg] group-hover:translate-x-[150%]"></span>
        </div>
        
        {/* Top content block */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-4 text-gradient bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            {React.createElement(service.icon, { className: "w-10 h-10 sm:w-12 sm:h-12" })}
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-brand-light mb-3">{service.title}</h3>
          <p className="text-brand-gray text-sm">{service.shortDescription}</p>
        </div>
        
        {/* Bottom content block */}
        <div className="relative z-10 w-full mt-6 flex flex-col space-y-3">
          <a 
            href={`/catalogo/${service.id}`}
            onClick={handleCatalogClick}
            className="w-full text-center bg-gradient-to-r from-blue-500/80 to-purple-500/80 text-white font-semibold py-2 px-4 rounded-full text-sm sm:text-base hover:from-blue-500 hover:to-purple-500 transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-purple-500/20"
          >
            Ver no catálogo
          </a>
          <button 
            onClick={() => onSelect(service)}
            className="w-full bg-transparent border border-green-500 text-green-400 font-semibold py-2 px-4 rounded-full text-sm sm:text-base hover:bg-green-500/20 hover:text-green-300 transition-all duration-300 transform group-hover:scale-105"
          >
            Mais no Whats
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;