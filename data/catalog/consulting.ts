import { CatalogCategoryRaw } from '../../types';

export const consultingCategory: CatalogCategoryRaw = {
    category: "Consultoria e Treinamentos",
    emoji: "📚",
    keyIndicators: [
        { label: "Equipe Capacitada", value: "100%" },
        { label: "Decisões Assertivas", value: "Guiadas" },
        { label: "Inovação Interna", value: "Estimulada" },
    ],
    metrics: [
      { label: "Impacto no Negócio", value: "60%", icon: 'trendingUp' },
      { label: "Vantagem Competitiva", value: "70%", icon: 'target' },
      { label: "Vantagem Econômica", value: "40%", icon: 'dollarSign' },
    ],
    subcategories: [
      { 
        name: "Consultoria Especializada por Área", 
        image: "ConsultoriaArea.png", 
        whatIsIt: "Análise e planejamento estratégico personalizado para cada serviço que oferecemos.", 
        whatIsItFor: "Empresas que precisam de um especialista para resolver um problema específico.", 
        howItHelps: "Fornece um roteiro claro para o sucesso, baseado em análise e experiência de mercado.",
        productionTime: "Sessão agendada",
        plans: [
            { name: "Básicas", price: 120, description: "Duração: 1h." },
            { name: "Exclusiva", price: 250, description: "Duração: 1:30h." },
            { name: "Premium", price: 799, description: "Duração: 5h. Ganha Link na Bio Exclusiva." },
            { name: "VIP", price: 1000, description: "A partir de R$1.000. Full Day. Ganha Link na Bio Exclusiva." }
        ]
      },
      { 
        name: "Aulas de Atendimento ao Cliente", 
        image: "AulaAtendimento.png", 
        whatIsIt: "Treinamento para equipes sobre como encantar e fidelizar clientes.", 
        whatIsItFor: "Times de suporte e vendas que buscam excelência no atendimento.", 
        howItHelps: "Transforma o atendimento em um diferencial competitivo, aumentando a retenção de clientes.",
        productionTime: "Varia por plano",
        plans: [
            { name: "Básicas", price: 120, description: "Duração: 2h." },
            { name: "Avançadas", price: 250, description: "Duração: 3:30h." },
            { name: "Premium", price: 799, description: "Duração: 6h. Ganha Link na Bio Exclusiva." },
            { name: "VIP", price: 1000, description: "A partir de R$1.000. Full Day. Ganha Link na Bio Exclusiva." }
        ]
      },
      { 
        name: "Revitalização de Ambiente Comercial", 
        image: "RevitalizacaoNegocio.png", 
        whatIsIt: "Uma análise 360º para modernizar processos, ferramentas e cultura da empresa.", 
        whatIsItFor: "Negócios que sentem que estão estagnados ou perdendo relevância.", 
        howItHelps: "Injeta inovação e eficiência na empresa, preparando-a para os desafios do futuro.",
        productionTime: "Varia por plano",
        plans: [
            { name: "Básicas", price: 120, description: "Duração: 2h." },
            { name: "Exclusiva", price: 250, description: "Duração: 3:30h." },
            { name: "Premium", price: 799, description: "Duração: 6h. Ganha Link na Bio Exclusiva." },
            { name: "VIP", price: 1000, description: "A partir de R$1.000. Full Day. Ganha Link na Bio Exclusiva." }
        ]
      }
    ]
};
