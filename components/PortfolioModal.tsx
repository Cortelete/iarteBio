

import React, { useState, useEffect } from 'react';
import { CloseIcon } from './icons/CloseIcon';
import { ArrowUpRightIcon } from './icons/ArrowUpRightIcon';
import ImageViewer from './catalog/ImageViewer';

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const portfolioItems = [
  {
    title: 'Comando Autoservice',
    category: 'Site Institucional',
    description: 'Website profissional para um centro automotivo, com agendamento de serviços e apresentação da empresa.',
    image: '/ComandoAutoservice.png',
    link: 'https://comandoauto.vercel.app/'
  },
  {
    title: 'Gusta',
    category: 'Link na Bio',
    description: 'Página de Link na Bio para profissional, centralizando seus contatos e redes sociais.',
    image: '/GustaBio.png',
    link: 'https://gustabio.vercel.app/'
  },
  {
    title: 'IA.Palavra',
    category: 'Ferramenta de IA',
    description: 'Uma ferramenta de IA para geração e análise de textos, otimizando a criação de conteúdo.',
    image: '/IAPalavra.png',
    link: 'https://iapalavra.vercel.app/'
  },
  {
    title: 'ToolBoxIA',
    category: 'Ferramenta de IA',
    description: 'Uma coleção de ferramentas de IA para otimizar tarefas diárias e aumentar a produtividade.',
    image: '/ToolBoxIA.png',
    link: 'https://toolboxia.vercel.app/'
  },
  {
    title: 'Gestão de Automação',
    category: 'Automação & Processos',
    description: 'Landing page para serviços de automação, focada em otimização de processos para empresas.',
    image: '/GestaoAutomacao.png',
    link: 'https://cortelete.carrd.co/'
  },
  {
    title: 'Planos e Soluções Digitais',
    category: 'Consultoria Digital',
    description: 'Site apresentando um portfólio completo de soluções digitais e planos de serviço.',
    image: '/PlanosSolucoes.png',
    link: 'https://iarte.vercel.app/'
  },
  {
    title: 'Clube do Estudante',
    category: 'Comunidade & Educação',
    description: 'Plataforma para estudantes, oferecendo recursos, descontos e uma comunidade de apoio.',
    image: '/ClubeEstudante.png',
    link: 'https://cortelete.github.io/CDE/'
  },
  {
    title: 'VetJaqs',
    category: 'Saúde & Web App',
    description: 'Aplicação web para uma clínica veterinária, facilitando agendamentos e comunicação.',
    image: '/VetJaqs.png',
    link: 'http://vetjaqs.vercel.app/'
  },
  {
    title: 'Dr. Darany Advogado',
    category: 'Site Institucional',
    description: 'Site profissional para um escritório de advocacia, projetado para transmitir confiança e credibilidade.',
    image: '/DrDarany.png',
    link: 'https://drdarany.vercel.app/'
  },
  {
    title: 'Apresentação BPMN',
    category: 'Apresentação Interativa',
    description: 'Apresentação interativa sobre Business Process Model and Notation (BPMN).',
    image: '/ApresentacaoBPMN.png',
    link: 'https://cortelete.github.io/apresentacaoBPMN/'
  },
  {
    title: 'CardMasters',
    category: 'Jogo Web',
    description: 'Um jogo de cartas simples desenvolvido como um projeto experimental de desenvolvimento web.',
    image: '/CardMasters.png',
    link: 'https://cortelete.github.io/CardGame1/'
  },
  {
    title: 'Biedermann Nutrição',
    category: 'Site Institucional',
    description: 'Website para uma nutricionista esportiva, com foco em agendamentos e apresentação de serviços.',
    image: '/BiedermannNutricao.png',
    link: 'https://nutrisyr.vercel.app/'
  },
  {
    title: 'Gerador de Contratos',
    category: 'Ferramenta Web',
    description: 'Aplicação para gerar contratos personalizados de forma rápida e segura.',
    image: '/GeradorContratos.png',
    link: 'https://geracontrato.vercel.app/'
  },
  {
    title: 'Gerador de Comprovantes',
    category: 'Ferramenta Web',
    description: 'Ferramenta simples para a criação de comprovantes de transação ou serviço.',
    image: '/GeradorComprovantes.png',
    link: 'https://geranota.vercel.app/'
  },
  {
    title: 'Catálogo Luxury Studio',
    category: 'Catálogo Digital',
    description: 'Catálogo de serviços digital e interativo para o Luxury Studio, com agendamento integrado.',
    image: '/CatalogoLuxury.png',
    link: 'https://catalogolux.vercel.app/'
  },
  {
    title: 'Caramella Chocolates',
    category: 'E-commerce',
    description: 'E-commerce para uma marca de chocolates artesanais, com foco em uma experiência de compra doce e intuitiva.',
    image: '/CaramellaChocolates.png',
    link: 'https://caramellabio.vercel.app/'
  },
  {
    title: 'Link na Bio - Luxury',
    category: 'Link na Bio',
    description: 'Página de Link na Bio personalizada para o Luxury Studio, agregando todos os canais de contato.',
    image: '/LinkBioLuxury.png',
    link: 'https://luxbio.vercel.app/'
  },
  {
    title: 'LuxAcademy',
    category: 'Cursos Online',
    description: 'Plataforma de cursos online para a LuxAcademy, especializada em Lash Design.',
    image: '/LuxAcademy.png',
    link: 'http://luxacademy.vercel.app/'
  },
  {
    title: 'LK Luiza Kruppa',
    category: 'Influencer & Branding',
    description: 'Website para uma influenciadora digital, focando em branding pessoal e parcerias.',
    image: '/LKLuizaKruppa.png',
    link: 'https://lkruppa.vercel.app/'
  },
];


const PortfolioModal: React.FC<PortfolioModalProps> = ({ isOpen, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsClosing(false);
    } else if (!isImageViewerOpen) {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen, isImageViewerOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  const openImageViewer = (imageUrl: string) => {
    setSelectedImageUrl(imageUrl);
    setIsImageViewerOpen(true);
  };

  const closeImageViewer = () => {
    setIsImageViewerOpen(false);
    setTimeout(() => setSelectedImageUrl(null), 300);
  };

  if (!isOpen && !isClosing) return null;

  const backdropClass = isClosing ? 'opacity-0' : 'opacity-100';
  const modalClass = isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100';

  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'visible' : 'invisible'}`}
        onClick={handleClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="portfolio-modal-title"
      >
        <div className={`absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300 ${backdropClass}`} />
        
        <div
          className={`relative w-full max-w-5xl bg-brand-dark/80 rounded-2xl border border-white/10 shadow-2xl shadow-purple-500/10 text-white transform transition-all duration-300 ${modalClass} flex flex-col max-h-[90vh]`}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex-shrink-0 p-4 sm:p-6 border-b border-white/10 flex justify-between items-center">
            <h2 id="portfolio-modal-title" className="text-xl sm:text-2xl font-bold text-gradient bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Nosso Portfólio
            </h2>
            <button onClick={handleClose} className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full p-2 transition-colors duration-300 z-10" aria-label="Fechar modal">
              <CloseIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 scrollbar-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {portfolioItems.map((item, index) => (
                <div
                  key={index}
                  className="group relative flex flex-col rounded-lg overflow-hidden bg-brand-dark/50 border border-white/10 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/10"
                >
                  <button
                    onClick={() => openImageViewer(item.image)}
                    className="relative block w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-brand-dark/50"
                    aria-label={`Ver imagem de ${item.title}`}
                  >
                    <img src={item.image} alt={item.title} className="w-full h-32 sm:h-40 object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    </div>
                  </button>

                  <div className="p-4 flex-grow flex flex-col">
                    <span className="text-xs font-semibold uppercase text-purple-400 tracking-wider">{item.category}</span>
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-base sm:text-lg text-brand-light mt-1 mb-2 group/link inline-flex items-center gap-2 hover:text-purple-300 transition-colors"
                      >
                        <span>{item.title}</span>
                        <ArrowUpRightIcon className="w-4 h-4 text-brand-gray transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                      </a>
                    ) : (
                      <h3 className="font-bold text-base sm:text-lg text-brand-light mt-1 mb-2">{item.title}</h3>
                    )}
                    <p className="text-sm text-brand-gray flex-grow">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ImageViewer
        isOpen={isImageViewerOpen}
        onClose={closeImageViewer}
        imageUrl={selectedImageUrl || ''}
      />
    </>
  );
};

export default PortfolioModal;
