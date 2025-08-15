
import { CodeIcon } from './components/icons/CodeIcon';
import { DesignIcon } from './components/icons/DesignIcon';
import { MarketingIcon } from './components/icons/MarketingIcon';
import { BotIcon } from './components/icons/BotIcon';
import { Service } from './types';

export const WHATSAPP_NUMBER = '5541988710303';
export const INSTAGRAM_URL = 'https://instagram.com/InteligenciArte.IA';
export const WHATSAPP_CONTACT_MESSAGE = encodeURIComponent('Olá! Encontrei o site da InteligenciArte.IA e fiquei interessado(a) nos seus serviços. Poderíamos conversar?');

export const SERVICES: Service[] = [
  {
    id: 'dev',
    title: 'Websites de Impacto',
    icon: CodeIcon,
    shortDescription: 'Criação de sites e sistemas modernos e responsivos com as melhores tecnologias do mercado.',
    longDescription: 'Transformamos suas ideias em realidade digital com soluções web personalizadas, desde landing pages a sistemas complexos, garantindo performance e uma experiência de usuário impecável.',
    details: ['Site institucional', 'E-commerce', 'Sistema de gestão', 'Landing Page de alta conversão']
  },
  {
    id: 'design',
    title: 'Design que Conecta',
    icon: DesignIcon,
    shortDescription: 'Interfaces intuitivas e elegantes que encantam seus usuários e fortalecem sua marca.',
    longDescription: 'Criamos experiências de usuário memoráveis através de interfaces visualmente impactantes e fáceis de usar. Focamos em design centrado no usuário para maximizar o engajamento e a satisfação.',
    details: ['Design de aplicativo', 'Prototipação interativa', 'Branding e identidade visual', 'Design System']
  },
  {
    id: 'mkt',
    title: 'Marketing Inteligente',
    icon: MarketingIcon,
    shortDescription: 'Estratégias de marketing digital para aumentar sua visibilidade e impulsionar suas vendas.',
    longDescription: 'Potencializamos seu negócio no ambiente digital com estratégias de SEO, gestão de tráfego pago e marketing de conteúdo, conectando sua marca ao público certo e gerando resultados concretos.',
    details: ['Gestão de tráfego (Google/Meta Ads)', 'Otimização para SEO', 'Criação de conteúdo', 'Análise de métricas']
  },
  {
    id: 'ia',
    title: 'Automação Eficiente',
    icon: BotIcon,
    shortDescription: 'Implementação de chatbots e automações inteligentes para otimizar seu atendimento.',
    longDescription: 'Modernize seu atendimento e processos com chatbots personalizados e automações baseadas em Inteligência Artificial. Reduza custos, aumente a eficiência e ofereça suporte 24/7 aos seus clientes.',
    details: ['Chatbot para WhatsApp', 'Chatbot para site', 'Automação de processos internos', 'Integração com CRMs']
  }
];