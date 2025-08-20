
import React, { useState, useEffect } from 'react';
import { CloseIcon } from './icons/CloseIcon';
import { ArrowUpRightIcon } from './icons/ArrowUpRightIcon';

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const portfolioItems = [
  {
    title: 'IA.Palavra',
    category: 'Ferramenta de IA',
    description: 'Uma ferramenta de IA para geração e análise de textos, otimizando a criação de conteúdo.',
    image: '/public/IAPalavra.png',
    link: 'https://iapalavra.vercel.app/'
  },
  {
    title: 'ToolBoxIA',
    category: 'Ferramenta de IA',
    description: 'Uma coleção de ferramentas de IA para otimizar tarefas diárias e aumentar a produtividade.',
    image: '/public/ToolBoxIA.png',
    link: 'https://toolboxia.vercel.app/'
  },
  {
    title: 'Gestão de Automação',
    category: 'Automação & Processos',
    description: 'Landing page para serviços de automação, focada em otimização de processos para empresas.',
    image: '/public/GestaoAutomacao.png',
    link: 'https://cortelete.carrd.co/'
  },
  {
    title: 'Planos e Soluções Digitais',
    category: 'Consultoria Digital',
    description: 'Site apresentando um portfólio completo de soluções digitais e planos de serviço.',
    image: '/public/PlanosSolucoes.png',
    link: 'https://iarte.vercel.app/'
  },
  {
    title: 'Clube do Estudante',
    category: 'Comunidade & Educação',
    description: 'Plataforma para estudantes, oferecendo recursos, descontos e uma comunidade de apoio.',
    image: '/public/ClubeEstudante.png',
    link: 'https://cortelete.github.io/CDE/'
  },
  {
    title: 'VetJaqs',
    category: 'Saúde & Web App',
    description: 'Aplicação web para uma clínica veterinária, facilitando agendamentos e comunicação.',
    image: '/public/VetJaqs.png',
    link: 'http://vetjaqs.vercel.app/'
  },
  {
    title: 'Dr. Darany Advogado',
    category: 'Site Institucional',
    description: 'Site profissional para um escritório de advocacia, projetado para transmitir confiança e credibilidade.',
    image: '/public/DrDarany.png',
    link: 'https://drdarany.vercel.app/'
  },
  {
    title: 'Apresentação BPMN',
    category: 'Apresentação Interativa',
    description: 'Apresentação interativa sobre Business Process Model and Notation (BPMN).',
    image: '/public/ApresentacaoBPMN.png',
    link: 'https://cortelete.github.io/apresentacaoBPMN/'
  },
  {
    title: 'CardMasters',
    category: 'Jogo Web',
    description: 'Um jogo de cartas simples desenvolvido como um projeto experimental de desenvolvimento web.',
    image: '/public/CardMasters.png',
    link: 'https://cortelete.github.io/CardGame1/'
  },
  {
    title: 'Biedermann Nutrição',
    category: 'Site Institucional',
    description: 'Website para uma nutricionista esportiva, com foco em agendamentos e apresentação de serviços.',
    image: '/public/BiedermannNutricao.png',
    link: 'https://nutrisyr.vercel.app/'
  },
  {
    title: 'Gerador de Contratos',
    category: 'Ferramenta Web',
    description: 'Aplicação para gerar contratos personalizados de forma rápida e segura.',
    image: '/public/GeradorContratos.png',
    link: 'https://geracontrato.vercel.app/'
  },
  {
    title: 'Gerador de Comprovantes',
    category: 'Ferramenta Web',
    description: 'Ferramenta simples para a criação de comprovantes de transação ou serviço.',
    image: '/public/GeradorComprovantes.png',
    link: 'https://geranota.vercel.app/'
  },
  {
    title: 'Catálogo Luxury Studio',
    category: 'Catálogo Digital',
    description: 'Catálogo de serviços digital e interativo para o Luxury Studio, com agendamento integrado.',
    image: '/public/CatalogoLuxury.png',
    link: 'https://catalogolux.vercel.app/'
  },
  {
    title: 'Caramella Chocolates',
    category: 'E-commerce',
    description: 'E-commerce para uma marca de chocolates artesanais, com foco em uma experiência de compra doce e intuitiva.',
    image: '/public/CaramellaChocolates.png',
    link: 'https://caramellabio.vercel.app/'
  },
  {
    title: 'Link na Bio - Luxury',
    category: 'Link na Bio',
    description: 'Página de Link na Bio personalizada para o Luxury Studio, agregando todos os canais de contato.',
    image: '/public/LinkBioLuxury.png',
    link: 'https://luxbio.vercel.app/'
  },
  {
    title: 'LuxAcademy',
    category: 'Cursos Online',
    description: 'Plataforma de cursos online para a LuxAcademy, especializada em Lash Design.',
    image: '/public/LuxAcademy.png',
    link: 'http://luxacademy.vercel.app/'
  },
  {
    title: 'LK Luiza Kruppa',
    category: 'Influencer & Branding',
    description: 'Website para uma influenciadora digital, focando em branding pessoal e parcerias.',
    image: '/public/LKLuizaKruppa.png',
    link: 'https://lkruppa.vercel.app/'
  },
];


const PortfolioModal: React.FC<PortfolioModalProps> = ({ isOpen, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsClosing(false);
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  if (!isOpen && !isClosing) return null;

  const backdropClass = isClosing ? 'opacity-0' : 'opacity-100';
  const modalClass = isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100';

  return (
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
            {portfolioItems.map((item, index) => {
              const CardContent = (
                <>
                  <div className="relative">
                      <img src={item.image} alt={item.title} className="w-full h-32 sm:h-40 object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                      {item.link && (
                        <div className="absolute top-2 right-2 p-1.5 bg-brand-dark/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <ArrowUpRightIcon className="w-5 h-5 text-white" />
                        </div>
                      )}
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-semibold uppercase text-purple-400 tracking-wider">{item.category}</span>
                    <h3 className="font-bold text-base sm:text-lg text-brand-light mt-1 mb-2">{item.title}</h3>
                    <p className="text-sm text-brand-gray">{item.description}</p>
                  </div>
                </>
              );

              if (item.link) {
                return (
                  <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block rounded-lg overflow-hidden bg-brand-dark/50 border border-white/10 transform transition-transform duration-300 hover:-translate-y-1"
                  >
                    {CardContent}
                  </a>
                );
              }

              return (
                <div key={index} className="group relative rounded-lg overflow-hidden bg-brand-dark/50 border border-white/10 opacity-60">
                  {CardContent}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioModal;