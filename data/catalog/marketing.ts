import { CatalogCategoryRaw } from '../../types';

export const marketingCategory: CatalogCategoryRaw = {
    category: "Marketing e Estratégia",
    emoji: "📢",
    keyIndicators: [
        { label: "Geração de Leads", value: "+50%" },
        { label: "ROI de Campanhas", value: "Otimizado" },
        { label: "Alcance de Público", value: "Ampliado" },
    ],
    metrics: [
      { label: "Impacto no Negócio", value: "95%", icon: 'trendingUp' },
      { label: "Vantagem Competitiva", value: "80%", icon: 'target' },
      { label: "Vantagem Econômica", value: "90%", icon: 'dollarSign' },
    ],
    subcategories: [
      { 
        name: "Gestão de Marketing Digital", 
        image: "MD.png", 
        whatIsIt: "Estratégias online integradas para aumentar a visibilidade e vendas.", 
        whatIsItFor: "Empresas que querem se destacar no ambiente digital e atrair mais clientes.", 
        howItHelps: "Constrói uma audiência qualificada e gera oportunidades de negócio. *Todos os planos ganham Link na Bio Simples.",
        productionTime: "Varia por plano",
        plans: [
            { name: "Básicas", price: 550, description: "Prazo: 1-3 Dias úteis." },
            { name: "Exclusiva", price: 850, description: "Prazo: 3-5 Dias úteis." },
            { name: "Premium", price: 999, description: "Prazo: 5-10 Dias úteis." },
            { name: "VIP", price: 1000, description: "A partir de R$1000. Prazo: 10+ Dias úteis." }
        ]
      },
      { 
        name: "Tráfego Pago Simples", 
        image: "TPS.png", 
        whatIsIt: "Gestão de campanhas de anúncios no Google Ads e Meta Ads.", 
        whatIsItFor: "Gerar resultados rápidos, levando sua oferta diretamente a potenciais clientes.", 
        howItHelps: "Acelera o crescimento ao atrair visitantes qualificados. *Todos os planos ganham Link na Bio Simples.",
        productionTime: "Varia por plano",
        plans: [
            { name: "Básicas", price: 550, description: "Prazo: 1-3 Dias úteis." },
            { name: "Exclusiva", price: 850, description: "Prazo: 3-5 Dias úteis." },
            { name: "Premium", price: 999, description: "Prazo: 5-10 Dias úteis." },
            { name: "VIP", price: 1200, description: "A partir de R$1.200. Prazo: 10+ Dias úteis." }
        ]
      },
      { 
        name: "Consultoria Estratégica", 
        image: "ConsultoriaMarketing.png", 
        whatIsIt: "Sessões de orientação estratégica para otimizar suas ações de marketing.", 
        whatIsItFor: "Empresas que precisam de um direcionamento especializado para suas equipes.", 
        howItHelps: "Empodera sua equipe com conhecimento prático, melhorando a performance das campanhas.",
        productionTime: "Sessão agendada",
        plans: [
            { name: "Básicas", price: 150, description: "Sessão agendada." },
            { name: "Exclusiva", price: 599, description: "Ganha Link na Bio Simples." },
            { name: "Premium", price: 750, description: "Ganha Link na Bio Simples." },
            { name: "VIP", price: 1200, description: "A partir de R$1.200. Ganha Link na Bio Exclusiva." }
        ]
      },
      { 
        name: "Análise de Dados", 
        image: "AD.png", 
        whatIsIt: "Monitoramento e interpretação de métricas para guiar decisões.", 
        whatIsItFor: "Entender o comportamento do consumidor e o retorno sobre o investimento (ROI).", 
        howItHelps: "Transforma dados brutos em insights valiosos, otimizando orçamentos e estratégias.",
        productionTime: "Varia por plano",
        plans: [
            { name: "Básicas", price: 350, description: "R$30 por atualização. Prazo: 1-3 Dias úteis." },
            { name: "Exclusiva", price: 599, description: "R$35 por atualização. Ganha Link na Bio Simples. Prazo: 3-5 Dias úteis." },
            { name: "Premium", price: 750, description: "R$70 por atualização. Ganha Link na Bio Simples. Prazo: 5-10 Dias úteis." },
            { name: "VIP", price: 1200, description: "A partir de R$1.200. Ganha Link na Bio Exclusiva. Prazo: 10+ Dias úteis." }
        ]
      }
    ]
};
