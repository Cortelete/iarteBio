import { CatalogCategoryRaw } from '../../types';

export const designCategory: CatalogCategoryRaw = {
    category: "Design e Identidade Visual",
    emoji: "🎨",
    keyIndicators: [
      { label: "Reconhecimento de Marca", value: "+70%" },
      { label: "Engajamento Visual", value: "Elevado" },
      { label: "Consistência de Marca", value: "Total" },
    ],
    metrics: [
      { label: "Impacto no Negócio", value: "80%", icon: 'trendingUp' },
      { label: "Vantagem Competitiva", value: "90%", icon: 'target' },
      { label: "Vantagem Econômica", value: "55%", icon: 'dollarSign' },
    ],
    subcategories: [
      { 
        name: "Flyers e Cartões de Visita", 
        image: "FCVP.png", 
        whatIsIt: "Criação de materiais gráficos para divulgação impressa e digital.", 
        whatIsItFor: "Eventos, networking e para fortalecer a identidade visual da marca offline e online.", 
        howItHelps: "Causa uma primeira impressão memorável e profissional. *As impressões são valores adicionais e variam de acordo com o formato escolhido e valores da gráfica.",
        productionTime: "Varia por plano",
        plans: [
          { name: "Básicas", price: 150, description: "R$30 por atualização. Prazo: 1-3 Dias úteis." },
          { name: "Exclusiva", price: 250, description: "R$35 por atualização. Prazo: 3-5 Dias úteis." },
          { name: "Premium", price: 450, description: "R$70 por atualização. Prazo: 5-10 Dias úteis." },
          { name: "VIP", price: 1000, description: "A partir de R$1000. Inclui versão digital + versão Impressa personalizada com limite. Prazo: 10+ Dias úteis." }
        ]
      },
      { 
        name: "Desenvolvimento de Marca", 
        image: "DM.png", 
        whatIsIt: "O processo completo de criação de uma identidade de marca (Branding).", 
        whatIsItFor: "Novos negócios ou empresas em processo de rebranding.", 
        howItHelps: "Cria uma conexão emocional com o público e diferencia sua empresa no mercado. *Todos os planos ganham Link na Bio Simples.",
        productionTime: "Varia por plano",
        plans: [
            { name: "Básicas", price: 750, description: "Prazo: 1-3 Dias úteis." },
            { name: "Exclusiva", price: 1500, description: "Prazo: 3-5 Dias úteis." },
            { name: "Premium", price: 3000, description: "Prazo: 5-10 Dias úteis." },
            { name: "VIP", price: 5000, description: "A partir de R$5000. Prazo: 10+ Dias úteis." }
        ]
      },
      { 
        name: "Criação de Logotipo", 
        image: "CL.png", 
        whatIsIt: "O design do símbolo visual principal que representa sua empresa.", 
        whatIsItFor: "Ser a 'cara' da sua marca em todos os materiais e plataformas.", 
        howItHelps: "Gera reconhecimento instantâneo e sintetiza os valores da marca. *Todos os planos ganham Link na Bio Simples.",
        productionTime: "Varia por plano",
        plans: [
            { name: "Básicas", price: 150, description: "R$30 por atualização. Prazo: 1-3 Dias úteis." },
            { name: "Exclusiva", price: 299, description: "R$35 por atualização. Prazo: 3-5 Dias úteis." },
            { name: "Premium", price: 550, description: "R$70 por atualização. Prazo: 5-10 Dias úteis." },
            { name: "VIP", price: 1000, description: "A partir de R$1000. Prazo: 10+ Dias úteis." }
        ]
      }
    ]
};
