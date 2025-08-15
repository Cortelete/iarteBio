import { CatalogCategoryRaw } from '../../types';

export const brandingCategory: CatalogCategoryRaw = {
    category: "Branding e Redes Sociais",
    emoji: "📱",
    keyIndicators: [
        { label: "Crescimento da Audiência", value: "+45%" },
        { label: "Engajamento", value: "Consistente" },
        { label: "Fortalecimento da Marca", value: "Contínuo" },
    ],
    metrics: [
      { label: "Impacto no Negócio", value: "75%", icon: 'trendingUp' },
      { label: "Vantagem Competitiva", value: "85%", icon: 'target' },
      { label: "Vantagem Econômica", value: "65%", icon: 'dollarSign' },
    ],
    subcategories: [
      { 
        name: "Revitalização de Perfil em Redes Sociais", 
        image: "RSRevitalizacao.png", 
        whatIsIt: "Uma auditoria completa e reestruturação do seu perfil para reativar o engajamento.", 
        whatIsItFor: "Marcas que sentem que seu perfil está estagnado, com baixo alcance e pouca interação.", 
        howItHelps: "Renova sua presença digital, realinha a comunicação e cria uma nova onda de crescimento.",
        productionTime: "Sessão agendada",
        plans: [
            { name: "Básicas", price: 120, description: "Sessão agendada." },
            { name: "Exclusiva", price: 250, description: "Sessão agendada." },
            { name: "Premium", price: 799, description: "Ganha Link na Bio Básica." },
            { name: "VIP", price: 1000, description: "A partir de R$1.000. Ganha Link na Bio Exclusiva." }
        ]
      },
      { 
        name: "Ajuste de Identidade de Marca", 
        image: "RSAjusteMarca.png", 
        whatIsIt: "Consultoria para refinar e alinhar a identidade visual e a comunicação da sua marca.", 
        whatIsItFor: "Empresas que buscam uma comunicação mais coesa e profissional em todos os seus canais.", 
        howItHelps: "Fortalece o reconhecimento da marca e aumenta a confiança do público.",
        productionTime: "Sessão agendada",
        plans: [
            { name: "Básicas", price: 500, description: "Sessão agendada." },
            { name: "Exclusivo", price: 700, description: "Ganha Link na Bio Básica." },
            { name: "Premium", price: 999, description: "Ganha Link na Bio Básica." },
            { name: "VIP", price: 1200, description: "A partir de R$1.200. Ganha Link na Bio Exclusiva." }
        ]
      },
      { 
        name: "Definição de Posicionamento de Mercado", 
        image: "RSPosicionamento.png", 
        whatIsIt: "Análise estratégica para definir ou refinar como sua marca é percebida pelo público.", 
        whatIsItFor: "Negócios que querem se diferenciar e ocupar um espaço único na mente dos consumidores.", 
        howItHelps: "Cria uma vantagem competitiva clara e atrai o público-alvo ideal.",
        productionTime: "Sessão agendada",
        plans: [
            { name: "Básicas", price: 500, description: "Sessão agendada." },
            { name: "Exclusivo", price: 700, description: "Ganha Link na Bio Básica." },
            { name: "Premium", price: 999, description: "Ganha Link na Bio Básica." },
            { name: "VIP", price: 1200, description: "A partir de R$1.200. Ganha Link na Bio Exclusiva." }
        ]
      },
      { 
        name: "Treinamento de Produção de Conteúdo para Redes Sociais", 
        image: "RSAulaConteudo.png", 
        whatIsIt: "Treinamento prático para você ou sua equipe aprenderem a criar conteúdo relevante e atrativo.", 
        whatIsItFor: "Empreendedores e equipes de marketing que desejam internalizar a criação de conteúdo.", 
        howItHelps: "Empodera você a criar uma linha editorial forte e construir uma comunidade fiel.",
        productionTime: "Sessão agendada",
        plans: [
            { name: "Básicas", price: 250, description: "Sessão agendada." },
            { name: "Exclusivo", price: 500, description: "Ganha Link na Bio Básica." },
            { name: "Premium", price: 699, description: "Ganha Link na Bio Básica." },
            { name: "VIP", price: 1000, description: "A partir de R$1.000. Ganha Link na Bio Exclusiva." }
        ]
      }
    ]
};
