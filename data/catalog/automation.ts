import { CatalogCategoryRaw } from '../../types';

export const automationCategory: CatalogCategoryRaw = {
    category: "Automação",
    emoji: "⚙️",
    keyIndicators: [
        { label: "Redução de Custos", value: "-40%" },
        { label: "Eficiência Operacional", value: "+60%" },
        { label: "Disponibilidade", value: "24/7" },
    ],
    metrics: [
      { label: "Impacto no Negócio", value: "70%", icon: 'trendingUp' },
      { label: "Vantagem Competitiva", value: "65%", icon: 'target' },
      { label: "Vantagem Econômica", value: "85%", icon: 'dollarSign' },
    ],
    subcategories: [
      { 
        name: "Automações (Básicas e Avançadas)", 
        image: "ABA.png", 
        whatIsIt: "Implementação de fluxos de trabalho automatizados para tarefas repetitivas.", 
        whatIsItFor: "Marketing, vendas, atendimento e processos internos.", 
        howItHelps: "Economiza tempo e reduz erros. *Todos os planos incluem domínio próprio e ganham Link na Bio Simples.", 
        productionTime: "Varia por plano",
        plans: [
            { name: "Básicas", price: 1200, description: "R$250 por atualização, ou R$1.200 + R$250 mensal com plano de 6 meses. Prazo: 14-25 Dias úteis." },
            { name: "Avançada", price: 2700, description: "R$555 por atualização, ou R$2.700 + R$444 mensal com plano de 6 meses. Prazo: 25-45 Dias úteis." },
            { name: "Premium", price: 7999, description: "R$899 por atualização, ou R$7.999 + R$899 mensal e ganha 2 meses de plano antes de iniciar a contagem de 6 meses. Prazo: 25 dias para pré-site + 45 Dias úteis para entrega completa." },
            { name: "VIP", price: 10000, description: "A partir de R$10.000. 45+ Dias úteis. All Inclusive." }
        ]
      },
      { 
        name: "Automação de Processos Internos", 
        image: "AutoPI.png", 
        whatIsIt: "Sistematização de tarefas como preenchimento de planilhas e envio de e-mails.", 
        whatIsItFor: "Otimizar a operação diária de qualquer departamento da empresa.", 
        howItHelps: "Aumenta a produtividade e a eficiência. *Todos os planos incluem domínio próprio e ganham Link na Bio Simples.",
        productionTime: "Varia por plano",
        plans: [
            { name: "Básicas", price: 1200, description: "R$250 por atualização, ou R$1.200 + R$250 mensal com plano de 6 meses. Prazo: 14-25 Dias úteis." },
            { name: "Avançada", price: 2700, description: "R$555 por atualização, ou R$2.700 + R$444 mensal com plano de 6 meses. Prazo: 25-45 Dias úteis." },
            { name: "Premium", price: 7999, description: "R$899 por atualização, ou R$7.999 + R$899 mensal e ganha 2 meses de plano antes de iniciar a contagem de 6 meses. Prazo: 25 dias para pré-site + 45 Dias úteis para entrega completa." },
            { name: "VIP", price: 10000, description: "A partir de R$10.000. 45+ Dias úteis. All Inclusive." }
        ]
      },
      { 
        name: "Automação de Pré-Atendimento", 
        image: "AutoPreAtendimento.png", 
        whatIsIt: "Chatbots que qualificam leads e respondem perguntas frequentes 24/7.", 
        whatIsItFor: "Sites e redes sociais com alto volume de interações iniciais.", 
        howItHelps: "Filtra contatos e melhora a experiência do usuário. *Todos os planos incluem domínio próprio e ganham Link na Bio Simples.",
        productionTime: "Varia por plano",
        plans: [
            { name: "Básicas", price: 1200, description: "R$250 por atualização, ou R$1.200 + R$250 mensal com plano de 6 meses. Prazo: 14-25 Dias úteis." },
            { name: "Avançada", price: 2700, description: "R$555 por atualização, ou R$2.700 + R$444 mensal com plano de 6 meses. Prazo: 25-45 Dias úteis." },
            { name: "Premium", price: 7999, description: "R$899 por atualização, ou R$7.999 + R$899 mensal e ganha 2 meses de plano antes de iniciar a contagem de 6 meses. Prazo: 25 dias para pré-site + 45 Dias úteis para entrega completa." },
            { name: "VIP", price: 10000, description: "A partir de R$10.000. 45+ Dias úteis. All Inclusive." }
        ]
      },
      { 
        name: "Automação para Avaliações no Google Business", 
        image: "AutoAvaliacaoGB.png", 
        whatIsIt: "Um sistema para incentivar clientes satisfeitos a deixarem avaliações 5 estrelas.", 
        whatIsItFor: "Negócios locais que querem melhorar sua reputação e ranking no Google.", 
        howItHelps: "Constrói prova social e atrai mais clientes. *Todos os planos incluem domínio próprio e ganham Link na Bio Simples.",
        productionTime: "Varia por plano",
        plans: [
            { name: "Básicas", price: 1200, description: "R$250 por atualização, ou R$1.200 + R$250 mensal com plano de 6 meses. Prazo: 14-25 Dias úteis." },
            { name: "Avançada", price: 2700, description: "R$555 por atualização, ou R$2.700 + R$444 mensal com plano de 6 meses. Prazo: 25-45 Dias úteis." },
            { name: "Premium", price: 7999, description: "R$899 por atualização, ou R$7.999 + R$899 mensal e ganha 2 meses de plano antes de iniciar a contagem de 6 meses. Prazo: 25 dias para pré-site + 45 Dias úteis para entrega completa." },
            { name: "VIP", price: 10000, description: "A partir de R$10.000. 45+ Dias úteis. All Inclusive." }
        ]
      },
    ]
};
