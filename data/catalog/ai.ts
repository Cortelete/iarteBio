import { CatalogCategoryRaw } from '../../types';

export const aiCategory: CatalogCategoryRaw = {
    category: "Inteligência Artificial",
    emoji: "🤖",
    keyIndicators: [
        { label: "Produtividade Aumentada", value: "+75%" },
        { label: "Insights de Dados", value: "Profundos" },
        { label: "Vantagem Inovadora", value: "Garantida" },
    ],
    metrics: [
      { label: "Impacto no Negócio", value: "90%", icon: 'trendingUp' },
      { label: "Vantagem Competitiva", value: "95%", icon: 'target' },
      { label: "Vantagem Econômica", value: "80%", icon: 'dollarSign' },
    ],
    subcategories: [
      { 
        name: "Agente de IA Personalizado", 
        image: "AIAgente.png", 
        whatIsIt: "Desenvolvimento de um agente de IA sob medida para automatizar tarefas específicas do seu negócio.", 
        whatIsItFor: "Empresas que buscam uma solução de automação única, alinhada com seus processos.", 
        howItHelps: "Aumenta a eficiência e reduz a carga de trabalho manual. *Todos os planos incluem domínio próprio e ganham Link na Bio Simples.",
        productionTime: "Varia por plano",
        plans: [
            { name: "Básicas", price: 1200, description: "R$250 por atualização, ou R$1.200 + R$250 mensal com plano de 6 meses. Prazo: 14-25 Dias úteis." },
            { name: "Exclusivo", price: 2700, description: "R$555 por atualização, ou R$2.700 + R$444 mensal com plano de 6 meses. Prazo: 25-45 Dias úteis." },
            { name: "Premium", price: 7999, description: "R$899 por atualização, ou R$7.999 + R$899 mensal e ganha 2 meses de plano antes de iniciar a contagem de 6 meses. Prazo: 25 dias para pré-site + 45 Dias úteis para entrega completa." },
            { name: "VIP", price: 10000, description: "A partir de R$10.000. 45+ Dias úteis. All Inclusive." }
        ]
      },
      { 
        name: "Treinamento de IA para Empresas", 
        image: "AIAulaEmpresa.png", 
        whatIsIt: "Um treinamento corporativo focado em capacitar sua equipe a utilizar ferramentas de IA.", 
        whatIsItFor: "Equipes e líderes que desejam integrar a IA em suas operações diárias.", 
        howItHelps: "Capacita seus colaboradores e promove uma cultura de inovação. *Todos os planos incluem domínio próprio e ganham Link na Bio Simples.",
        productionTime: "Varia por plano",
        plans: [
            { name: "Básicas", price: 1200, description: "R$250 por atualização, ou R$1.200 + R$250 mensal com plano de 6 meses. Prazo: 14-25 Dias úteis." },
            { name: "Exclusivo", price: 2700, description: "R$555 por atualização, ou R$2.700 + R$444 mensal com plano de 6 meses. Prazo: 25-45 Dias úteis." },
            { name: "Premium", price: 7999, description: "R$899 por atualização, ou R$7.999 + R$899 mensal e ganha 2 meses de plano antes de iniciar a contagem de 6 meses. Prazo: 25 dias para pré-site + 45 Dias úteis para entrega completa." },
            { name: "VIP", price: 10000, description: "A partir de R$10.000. 45+ Dias úteis. All Inclusive." }
        ]
      },
      { 
        name: "Curso de IA para Iniciantes", 
        image: "AIAulaIniciante.png", 
        whatIsIt: "Uma consultoria ou aula introdutória que desmistifica a IA, mostrando como aplicá-la.", 
        whatIsItFor: "Empreendedores, estudantes e curiosos que querem dar os primeiros passos no mundo da IA.", 
        howItHelps: "Fornece o conhecimento fundamental para começar a usar a IA, abrindo portas para novas habilidades.",
        productionTime: "Sessão agendada",
        plans: [
            { name: "Básicas", price: 300, description: "Sessão agendada." },
            { name: "Exclusivo", price: 700, description: "Ganha Link na Bio Básica." },
            { name: "Premium", price: 999, description: "Ganha Link na Bio Básica." },
            { name: "VIP", price: 1200, description: "A partir de R$1.200. Ganha Link na Bio Exclusiva." }
        ]
      }
    ]
};
