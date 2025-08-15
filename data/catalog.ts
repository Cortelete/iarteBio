import { CatalogCategory } from '../types';

const catalogDataRaw = [
  {
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
          { name: "Simples", price: 222, description: "R$22 por atualização, ou R$22 mensal com plano de 6 meses. Prazo: 1-3 dias úteis." },
          { name: "Exclusiva", price: 444, description: "R$44 por atualização, ou R$44 mensal com plano de 6 meses. Prazo: 4-8 dias úteis." },
          { name: "Premium", price: 777, description: "R$77 por atualização, ou R$77 mensal, 2 meses de bônus no plano de 6m. Prazo: 4 dias (pré-site) + 10 dias (entrega)." }
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
            { name: "Simples", price: 222, description: "R$22 por atualização, ou R$22 mensal com plano de 6 meses. Prazo: 1-3 dias úteis." },
            { name: "Exclusiva", price: 555, description: "R$55 por atualização, ou R$55 mensal com plano de 6 meses. Prazo: 4-8 dias úteis." },
            { name: "Premium", price: 999, description: "R$99 por atualização, ou R$99 mensal, 2 meses de bônus no plano de 6m. Prazo: 4 dias (pré-site) + 10 dias (entrega)." }
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
            { name: "Simples", price: 555, description: "R$55 por atualização, ou R$55 mensal com plano de 6 meses. Prazo: 15-30 dias úteis." },
            { name: "Exclusiva", price: 888, description: "R$88 por atualização, ou R$88 mensal com plano de 6 meses. Bônus: Link na Bio Simples. Prazo: 25-35 dias úteis." },
            { name: "Premium", price: 1222, description: "R$122 por atualização, ou R$122 mensal, 2 meses de bônus no plano de 6m. Domínio incluso. Bônus: Link na Bio Exclusiva. Prazo: 25 dias (pré-site) + 45 dias (revisada)." }
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
            { name: "Simples", price: 3500, description: "R$450 por atualização, ou R$450 mensal com plano de 6 meses. Prazo: 25-35 dias úteis." },
            { name: "Exclusiva", price: 5500, description: "R$665 por atualização, ou R$665 mensal com plano de 6 meses. Prazo: 25-45 dias úteis." },
            { name: "Premium", price: 8999, description: "R$899 por atualização, ou R$899 mensal, 2 meses de bônus no plano de 6m. Prazo: 25 dias (pré-site) + 45 dias (entrega)." }
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
            { name: "Simples", price: 1200, description: "R$250 por atualização, ou R$250 mensal com plano de 6 meses. Prazo: 25-35 dias úteis." },
            { name: "Exclusiva", price: 2700, description: "R$555 por atualização, ou R$444 mensal com plano de 6 meses. Prazo: 25-45 dias úteis." },
            { name: "Premium", price: 7999, description: "R$899 por atualização, ou R$899 mensal, 2 meses de bônus no plano de 6m. Prazo: 25 dias (pré-site) + 45 dias (entrega)." }
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
            { name: "Simples", price: 1200, description: "R$250 por atualização, ou R$250 mensal com plano de 6 meses. Prazo: 25-35 dias úteis." },
            { name: "Exclusiva", price: 2700, description: "R$555 por atualização, ou R$444 mensal com plano de 6 meses. Prazo: 25-45 dias úteis." },
            { name: "Premium", price: 7999, description: "R$899 por atualização, ou R$899 mensal, 2 meses de bônus no plano de 6m. Prazo: 25 dias (pré-site) + 45 dias (entrega)." }
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
            { name: "Simples", price: 75, description: "R$20 por atualização. Prazo: 1-3 dias úteis." },
            { name: "Exclusiva", price: 150, description: "R$35 por atualização. Prazo: 3-5 dias úteis." },
            { name: "Premium", price: 300, description: "R$70 por atualização. Prazo: 5-10 dias úteis." },
            { name: "VIP", price: 1000, description: "A partir de R$1000. Prazo: 10+ dias úteis." }
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
            { name: "Simples", price: 750, description: "Prazo: 1-3 dias úteis." },
            { name: "Exclusiva", price: 1500, description: "Prazo: 3-5 dias úteis." },
            { name: "Premium", price: 3000, description: "Prazo: 5-10 dias úteis." },
            { name: "VIP", price: 5000, description: "A partir de R$5000. Prazo: 10+ dias úteis." }
        ]
      }
    ]
  },
  {
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
          { name: "Simples", price: 150, description: "R$30 por atualização. Prazo: 1-3 dias úteis." },
          { name: "Exclusiva", price: 250, description: "R$35 por atualização. Prazo: 3-5 dias úteis." },
          { name: "Premium", price: 450, description: "R$70 por atualização. Prazo: 5-10 dias úteis." },
          { name: "VIP", price: 1000, description: "A partir de R$1000. Inclui versão digital + versão Impressa personalizada com limite. Prazo: 10+ dias úteis." }
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
            { name: "Simples", price: 750, description: "Prazo: 1-3 dias úteis." },
            { name: "Exclusiva", price: 1500, description: "Prazo: 3-5 dias úteis." },
            { name: "Premium", price: 3000, description: "Prazo: 5-10 dias úteis." },
            { name: "VIP", price: 5000, description: "A partir de R$5000. Prazo: 10+ dias úteis." }
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
            { name: "Simples", price: 150, description: "R$30 por atualização. Prazo: 1-3 dias úteis." },
            { name: "Exclusiva", price: 299, description: "R$35 por atualização. Prazo: 3-5 dias úteis." },
            { name: "Premium", price: 550, description: "R$70 por atualização. Prazo: 5-10 dias úteis." },
            { name: "VIP", price: 1000, description: "A partir de R$1000. Prazo: 10+ dias úteis." }
        ]
      }
    ]
  },
  {
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
      { name: "Gestão de Marketing Digital", price: 900, productionTime: "5 dias úteis (início)", image: "MD.png", whatIsIt: "Estratégias online integradas para aumentar a visibilidade e vendas.", whatIsItFor: "Empresas que querem se destacar no ambiente digital e atrair mais clientes. (Valor mensal)", howItHelps: "Constrói uma audiência qualificada e gera oportunidades de negócio de forma consistente." },
      { name: "Tráfego Pago Simples", price: 300, productionTime: "2 dias úteis (início)", image: "TPS.png", whatIsIt: "Gestão de campanhas de anúncios no Google Ads e Meta Ads.", whatIsItFor: "Gerar resultados rápidos, levando sua oferta diretamente a potenciais clientes. (Valor mensal + verba de campanha)", howItHelps: "Acelera o crescimento ao atrair visitantes qualificados e com intenção de compra." },
      { name: "Consultoria Estratégica", price: 150, productionTime: "Sessão agendada", image: "ConsultoriaMarketing.png", whatIsIt: "Sessões de orientação estratégica para otimizar suas ações de marketing.", whatIsItFor: "Empresas que precisam de um direcionamento especializado para suas equipes. (Valor por hora)", howItHelps: "Empodera sua equipe com conhecimento prático, melhorando a performance das campanhas." },
      { name: "Análise de Dados", price: 400, productionTime: "3 dias úteis", image: "AD.png", whatIsIt: "Monitoramento e interpretação de métricas para guiar decisões.", whatIsItFor: "Entender o comportamento do consumidor e o retorno sobre o investimento (ROI).", howItHelps: "Transforma dados brutos em insights valiosos, otimizando orçamentos e estratégias." }
    ]
  },
  {
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
        productionTime: '3 a 10 dias úteis', 
        image: "ABA.png", 
        whatIsIt: "Implementação de fluxos de trabalho automatizados para tarefas repetitivas.", 
        whatIsItFor: "Marketing, vendas, atendimento e processos internos.", 
        howItHelps: "Economiza tempo, reduz erros humanos e permite que sua equipe foque em atividades estratégicas.", 
        plans: [
            { name: "Automação Básica", price: 600, description: "Fluxos de trabalho para tarefas simples. Prazo: 3 a 5 dias úteis." },
            { name: "Automação Avançada", price: 1200, description: "Fluxos de trabalho para processos complexos. Prazo: 5 a 10 dias úteis." }
        ]
      },
      { name: "Automação de Processos Internos", price: 1000, productionTime: "7 dias úteis", image: "AutoPI.png", whatIsIt: "Sistematização de tarefas como preenchimento de planilhas e envio de e-mails.", whatIsItFor: "Otimizar a operação diária de qualquer departamento da empresa.", howItHelps: "Aumenta a produtividade e a eficiência operacional, reduzindo custos." },
      { name: "Automação de Pré-Atendimento", price: 500, productionTime: "3 dias úteis", image: "AutoPreAtendimento.png", whatIsIt: "Chatbots que qualificam leads e respondem perguntas frequentes 24/7.", whatIsItFor: "Sites e redes sociais com alto volume de interações iniciais.", howItHelps: "Filtra os contatos mais importantes e melhora a experiência do usuário com respostas instantâneas." },
      { name: "Automação para Avaliações no Google Business", price: 400, productionTime: "2 dias úteis", image: "AutoAvaliacaoGB.png", whatIsIt: "Um sistema para incentivar clientes satisfeitos a deixarem avaliações 5 estrelas.", whatIsItFor: "Negócios locais que querem melhorar sua reputação e ranking no Google.", howItHelps: "Constrói prova social, atrai mais clientes e melhora o SEO local de forma automática." },
    ]
  },
  {
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
      { name: "Consultoria Especializada por Área", price: 150, productionTime: "Sessão agendada", image: "ConsultoriaArea.png", whatIsIt: "Análise e planejamento estratégico personalizado para cada serviço que oferecemos.", whatIsItFor: "Empresas que precisam de um especialista para resolver um problema específico. (Valor por hora)", howItHelps: "Fornece um roteiro claro para o sucesso, baseado em análise e experiência de mercado." },
      { name: "Aulas de Atendimento ao Cliente", price: 300, productionTime: "3 dias úteis (2h/dia)", image: "AulaAtendimento.png", whatIsIt: "Treinamento para equipes sobre como encantar e fidelizar clientes.", whatIsItFor: "Times de suporte e vendas que buscam excelência no atendimento.", howItHelps: "Transforma o atendimento em um diferencial competitivo, aumentando a retenção de clientes." },
      { name: "Revitalização de Ambiente Comercial", price: 1200, productionTime: "7 dias úteis", image: "RevitalizacaoNegocio.png", whatIsIt: "Uma análise 360º para modernizar processos, ferramentas e cultura da empresa.", whatIsItFor: "Negócios que sentem que estão estagnados ou perdendo relevância.", howItHelps: "Injeta inovação e eficiência na empresa, preparando-a para os desafios do futuro." }
    ]
  },
  {
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
      { name: "Agente de IA Personalizado", price: 1500, productionTime: "10 dias úteis", image: "AIAgente.png", whatIsIt: "Desenvolvimento de um agente de IA sob medida para automatizar tarefas específicas do seu negócio, como atendimento, vendas ou análise de dados.", whatIsItFor: "Empresas que buscam uma solução de automação única, totalmente alinhada com seus processos e fluxos de trabalho.", howItHelps: "Aumenta a eficiência, reduz a carga de trabalho manual e fornece insights valiosos para escalar suas operações de forma inteligente." },
      { name: "Treinamento de IA para Empresas", price: 500, productionTime: "2 dias úteis (2h/dia)", image: "AIAulaEmpresa.png", whatIsIt: "Um treinamento corporativo focado em capacitar sua equipe a utilizar ferramentas de IA para otimizar processos e impulsionar a inovação.", whatIsItFor: "Equipes e líderes que desejam integrar a inteligência artificial em suas operações diárias para ganhar vantagem competitiva.", howItHelps: "Capacita seus colaboradores, promove uma cultura de inovação e desbloqueia novas oportunidades de crescimento através da IA." },
      { name: "Curso de IA para Iniciantes", price: 300, productionTime: "1 dia útil (2h)", image: "AIAulaIniciante.png", whatIsIt: "Uma consultoria ou aula introdutória que desmistifica a IA, mostrando como aplicá-la em projetos pessoais ou pequenos negócios.", whatIsItFor: "Empreendedores, estudantes e curiosos que querem dar os primeiros passos no mundo da inteligência artificial de forma prática.", howItHelps: "Fornece o conhecimento fundamental e a confiança para começar a usar a IA, abrindo portas para novas habilidades e projetos." }
    ]
  },
  {
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
      { name: "Revitalização de Perfil em Redes Sociais", price: 800, productionTime: "7 dias úteis", image: "RSRevitalizacao.png", whatIsIt: "Uma auditoria completa e reestruturação do seu perfil em redes sociais para reativar o engajamento e atrair novos seguidores.", whatIsItFor: "Marcas que sentem que seu perfil está estagnado, com baixo alcance e pouca interação.", howItHelps: "Renova sua presença digital, realinha a comunicação com seu público e cria uma nova onda de crescimento e engajamento." },
      { name: "Ajuste de Identidade de Marca", price: 500, productionTime: "5 dias úteis", image: "RSAjusteMarca.png", whatIsIt: "Consultoria para refinar e alinhar a identidade visual e a comunicação da sua marca nas redes sociais, garantindo consistência.", whatIsItFor: "Empresas que buscam uma comunicação mais coesa e profissional em todos os seus canais digitais.", howItHelps: "Fortalece o reconhecimento da marca, aumenta a confiança do público e cria uma imagem profissional e memorável." },
      { name: "Definição de Posicionamento de Mercado", price: 600, productionTime: "5 dias úteis", image: "RSPosicionamento.png", whatIsIt: "Análise estratégica para definir ou refinar como sua marca é percebida pelo público em relação aos concorrentes.", whatIsItFor: "Negócios que querem se diferenciar e ocupar um espaço único na mente de seus consumidores.", howItHelps: "Cria uma vantagem competitiva clara, atrai o público-alvo ideal e justifica o valor dos seus produtos ou serviços." },
      { name: "Treinamento de Produção de Conteúdo para Redes Sociais", price: 350, productionTime: "2 dias úteis (2h/dia)", image: "RSAulaConteudo.png", whatIsIt: "Treinamento prático para você ou sua equipe aprenderem a criar conteúdo relevante e atrativo para as redes sociais.", whatIsItFor: "Empreendedores e equipes de marketing que desejam internalizar a criação de conteúdo e manter a consistência.", howItHelps: "Empodera você a criar uma linha editorial forte, produzir posts, vídeos e stories que engajam, e construir uma comunidade fiel." }
    ]
  }
] as const;

export const catalogData: CatalogCategory[] = catalogDataRaw.map(cat => ({
  ...cat,
  subcategories: cat.subcategories.map(sub => {
    const finalSub = {
      description: `Solução de ${sub.name} para alavancar seu negócio.`,
      productionTime: 'A definir',
      price: null,
      ...sub,
    };

    if ((sub as any).plans && (sub as any).plans.length > 0) {
      finalSub.price = (sub as any).plans[0].price;
    } else {
      finalSub.price = (sub as any).price || null;
    }

    return finalSub;
  })
}));
