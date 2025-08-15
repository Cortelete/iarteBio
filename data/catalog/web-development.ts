import { CatalogCategoryRaw } from '../../types';

export const webDevelopmentCategory: CatalogCategoryRaw = {
    category: "Desenvolvimento Web",
    emoji: "💻",
    keyIndicators: [
      { label: "Performance Otimizada", value: "90+" },
      { label: "Experiência do Usuário", value: "Superior" },
      { label: "Taxa de Conversão", value: "+30%" },
    ],
    metrics: [
      { label: "Impacto no Negócio", value: "85%", icon: 'trendingUp' },
      { label: "Vantagem Competitiva", value: "75%", icon: 'target' },
      { label: "Vantagem Econômica", value: "60%", icon: 'dollarSign' },
    ],
    subcategories: [
      { 
        name: "Landing Page", 
        image: "LP.png", 
        whatIsIt: "Uma página única e focada, projetada para converter visitantes em leads.", 
        whatIsItFor: "Lançamento de produtos, campanhas de marketing ou captura de contatos.", 
        howItHelps: "Aumenta as taxas de conversão com uma mensagem clara e um chamado à ação (CTA) direto. *Nenhum plano inclui backend.",
        productionTime: "Varia por plano",
        plans: [
          { name: "Básicas", price: 222, description: "R$22 por atualização, ou R$22 mensal com plano de 6 meses. Prazo: 1-3 Dias úteis." },
          { name: "Exclusiva", price: 444, description: "R$44 por atualização, ou R$44 mensal com plano de 6 meses. Prazo: 4-8 Dias úteis." },
          { name: "Premium", price: 777, description: "R$77 por atualização, ou R$77 mensal e ganha 2 meses de plano antes de iniciar a contagem de 6 meses. Prazo: 4 dias para pré-site + 10 Dias úteis para entrega completa." }
        ]
      },
      { 
        name: "Link na Bio", 
        image: "LNB.png", 
        whatIsIt: "Uma micro landing page que agrupa todos os seus links importantes.", 
        whatIsItFor: "Perfis de redes sociais como Instagram, TikTok, para direcionar tráfego.", 
        howItHelps: "Facilita o acesso dos seguidores a múltiplos destinos, otimizando sua presença digital. *Nenhum plano inclui backend.",
        productionTime: "Varia por plano",
        plans: [
            { name: "Básicas", price: 222, description: "R$22 por atualização, ou R$22 mensal com plano de 6 meses. Prazo: 1-3 Dias úteis." },
            { name: "Exclusiva", price: 555, description: "R$55 por atualização, ou R$55 mensal com plano de 6 meses. Prazo: 4-8 Dias úteis." },
            { name: "Premium", price: 999, description: "R$99 por atualização, ou R$99 mensal e ganha 2 meses de plano antes de iniciar a contagem de 6 meses. Prazo: 4 dias para pré-site + 10 Dias úteis para entrega completa." }
        ]
      },
      { 
        name: "Site Personalizado Simples", 
        image: "SPS.png", 
        whatIsIt: "Um site institucional de até 5 páginas para apresentar sua empresa.", 
        whatIsItFor: "Empresas que precisam de uma presença online profissional e informativa.", 
        howItHelps: "Constrói credibilidade e serve como um portfólio digital acessível 24/7. *Nenhum plano inclui backend.",
        productionTime: "Varia por plano",
        plans: [
            { name: "Básicas", price: 555, description: "R$55 por atualização, ou R$55 mensal com plano de 6 meses. Prazo: 15-30 Dias úteis." },
            { name: "Exclusiva", price: 888, description: "R$88 por atualização, ou R$88 mensal com plano de 6 meses. Ganha Link na Bio Simples. Prazo: 25-35 Dias úteis." },
            { name: "Premium", price: 1222, description: "R$122 por atualização, ou R$122 mensal e ganha 2 meses de plano antes de iniciar a contagem de 6 meses. Inclui domínio próprio. Ganha Link na Bio Exclusiva. Prazo: 25 dias para pré-site + 45 Dias úteis para entrega revisada." }
        ]
      },
      { 
        name: "Site com Backend para Estoque e Vendas", 
        image: "SCBEV.png", 
        whatIsIt: "Um e-commerce completo com gestão de produtos, pedidos e clientes.", 
        whatIsItFor: "Lojas que desejam vender produtos online com controle total sobre as operações.", 
        howItHelps: "Automatiza o processo de vendas e gestão. *Todos os planos incluem domínio próprio e ganham Link na Bio Premium.",
        productionTime: "Varia por plano",
        plans: [
            { name: "Básicas", price: 3500, description: "R$450 por atualização, ou R$3.500 + R$450 mensal com plano de 6 meses. Prazo: 25-35 Dias úteis." },
            { name: "Exclusiva", price: 5500, description: "R$665 por atualização, ou R$5.500 + R$665 mensal com plano de 6 meses. Prazo: 25-45 Dias úteis." },
            { name: "Premium", price: 8999, description: "R$899 por atualização, ou R$8.999 + R$899 mensal e ganha 2 meses de plano antes de iniciar a contagem de 6 meses. Prazo: 25 dias para pré-site + 45 Dias úteis para entrega completa." }
        ]
      },
      { 
        name: "Ferramentas de Controle Online", 
        image: "FC.png", 
        whatIsIt: "Dashboards e sistemas internos para gestão de dados e processos.", 
        whatIsItFor: "Negócios que precisam monitorar KPIs, finanças ou operações de forma centralizada.", 
        howItHelps: "Oferece clareza sobre a performance do negócio. *Todos os planos incluem domínio próprio e ganham Link na Bio Simples.",
        productionTime: "Varia por plano",
        plans: [
            { name: "Básicas", price: 1200, description: "R$250 por atualização, ou R$1.200 + R$250 mensal com plano de 6 meses. Prazo: 25-35 Dias úteis." },
            { name: "Exclusiva", price: 2700, description: "R$555 por atualização, ou R$2.700 + R$444 mensal com plano de 6 meses. Prazo: 25-45 Dias úteis." },
            { name: "Premium", price: 7999, description: "R$899 por atualização, ou R$7.999 + R$899 mensal e ganha 2 meses de plano antes de iniciar a contagem de 6 meses. Prazo: 25 dias para pré-site + 45 Dias úteis para entrega completa." }
        ]
      },
      { 
        name: "Site de Vendas", 
        image: "SV.png", 
        whatIsIt: "Plataformas otimizadas para a venda de um ou múltiplos produtos.", 
        whatIsItFor: "Empreendedores e empresas focadas em vendas diretas pela internet.", 
        howItHelps: "Maximiza as vendas com um funil otimizado e checkout simplificado. *Todos os planos incluem domínio próprio e ganham Link na Bio Simples.",
        productionTime: "Varia por plano",
        plans: [
            { name: "Básicas", price: 1200, description: "R$250 por atualização, ou R$1.200 + R$250 mensal com plano de 6 meses. Prazo: 25-35 Dias úteis." },
            { name: "Exclusiva", price: 2700, description: "R$555 por atualização, ou R$2.700 + R$444 mensal com plano de 6 meses. Prazo: 25-45 Dias úteis." },
            { name: "Premium", price: 7999, description: "R$899 por atualização, ou R$7.999 + R$899 mensal e ganha 2 meses de plano antes de iniciar a contagem de 6 meses. Prazo: 25 dias para pré-site + 45 Dias úteis para entrega completa." }
        ]
      },
      { 
        name: "Apresentações Interativas Personalizadas", 
        image: "Apresentacoes.png", 
        whatIsIt: "Apresentações digitais dinâmicas, como um PowerPoint moderno.", 
        whatIsItFor: "Reuniões comerciais, palestras ou para apresentar projetos de forma impactante.", 
        howItHelps: "Cativa a audiência com interatividade e um visual profissional, elevando a percepção da sua marca.",
        productionTime: "Varia por plano",
        plans: [
            { name: "Básicas", price: 75, description: "R$20 por atualização. Prazo: 1-3 Dias úteis." },
            { name: "Exclusiva", price: 150, description: "R$35 por atualização. Prazo: 3-5 Dias úteis." },
            { name: "Premium", price: 300, description: "R$70 por atualização. Prazo: 5-10 Dias úteis." },
            { name: "VIP", price: 1000, description: "A partir de R$1000. Prazo: 10+ Dias úteis." }
        ]
      },
      { 
        name: "Análise de Negócios", 
        image: "AN.png", 
        whatIsIt: "Um estudo aprofundado do seu modelo de negócio e presença digital.", 
        whatIsItFor: "Empresas que buscam identificar pontos de melhoria e oportunidades de crescimento.", 
        howItHelps: "Fornece um diagnóstico completo e um plano de ação para otimizar resultados. *Todos os planos ganham Link na Bio Simples.",
        productionTime: "Varia por plano",
        plans: [
            { name: "Básicas", price: 750, description: "Prazo: 1-3 Dias úteis." },
            { name: "Exclusiva", price: 1500, description: "Prazo: 3-5 Dias úteis." },
            { name: "Premium", price: 3000, description: "Prazo: 5-10 Dias úteis." },
            { name: "VIP", price: 5000, description: "A partir de R$5000. Prazo: 10+ Dias úteis." }
        ]
      }
    ]
};
