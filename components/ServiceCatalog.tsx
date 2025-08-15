
import React from 'react';
import { Service } from '../types';
import { SERVICES } from '../constants';
import ServiceCard from './ServiceCard';

interface ServiceCatalogProps {
  onServiceSelect: (service: Service) => void;
}

const ServiceCatalog: React.FC<ServiceCatalogProps> = ({ onServiceSelect }) => {
  return (
    <section id="catalogo" className="py-20 md:py-32 container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4">
          Nosso Catálogo de Serviços
        </h2>
        <p className="text-base sm:text-lg text-brand-gray max-w-2xl mx-auto">
          Soluções criativas e tecnológicas para impulsionar sua presença online.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {SERVICES.map((service, index) => (
          <ServiceCard 
            key={service.id} 
            service={service} 
            onSelect={onServiceSelect}
            animationDelay={`${index * 150}ms`}
          />
        ))}
      </div>
    </section>
  );
};

export default ServiceCatalog;
