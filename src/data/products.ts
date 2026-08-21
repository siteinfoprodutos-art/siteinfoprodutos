import { Product, CategoryInfo } from '../types';

export const categories: CategoryInfo[] = [
  {
    id: "todos",
    name: "Todos",
    label: "Todos",
    title: "TODOS OS PRODUTOS",
    description: "Conheça todas as nossas ferramentas digitais.",
    icon: "Grid",
  },
  {
    id: "gestao",
    name: "Gestão",
    label: "Gestão",
    title: "GESTÃO",
    description: "Ferramentas para controle de vendas, estoque, custos e financeiro.",
    icon: "Store",
  },
  {
    id: "orcamentos",
    name: "Orçamentos",
    label: "Orçamentos",
    title: "ORÇAMENTOS",
    description: "Geradores de propostas e orçamentos comerciais rápidos.",
    icon: "FileText",
  },
  {
    id: "curriculo",
    name: "Currículo",
    label: "Currículo",
    title: "CURRÍCULO",
    description: "Geradores de currículos profissionais padronizados.",
    icon: "Sparkles",
  },
  {
    id: "agendamento",
    name: "Agendamento",
    label: "Agendamento",
    title: "AGENDAMENTO",
    description: "Agendas digitais para organizar clientes, horários e serviços.",
    icon: "Calendar",
  },
  {
    id: "produtividade",
    name: "Produtividade",
    label: "Produtividade",
    title: "PRODUTIVIDADE",
    description: "Soluções para acelerar suas rotinas diárias.",
    icon: "Zap",
  },
  {
    id: "outros",
    name: "Outros",
    label: "Outros",
    title: "OUTROS",
    description: "Demais ferramentas e recursos da AL Studio Tech.",
    icon: "Package",
  },
];

/**
 * Main products repository for AL Studio Tech.
 * To register new products in the future, simply append a new object to this array.
 */
export const products: Product[] = [
  {
    id: "gerador-orcamentos",
    slug: "gerador-de-orcamentos-profissionais",
    name: "Gerador de Orçamentos Profissionais",
    category: "Orçamentos",
    categoriesList: ["Orçamentos", "app", "Produtividade"],
    shortDescription:
      "Crie orçamentos profissionais, organize seus clientes e envie propostas pelo WhatsApp.",
    description:
      "O Gerador de Orçamentos Profissionais foi desenvolvido especialmente para autônomos, prestadores de serviços e pequenos empreendedores que precisam gerar propostas comerciais impecáveis em poucos cliques. Elimine planilhas complexas e papéis soltos: cadastre serviços, adicione valores, calcule totais automaticamente com descontos ou taxas e envie um PDF elegante ou mensagem formatada diretamente para o WhatsApp do seu cliente.",
    price: 39.9,
    billingType: "oneTime",
    availability: "available",
    deliveryType: "webapp",
    accessType: "protected",
    badge: "Novo",
    image: "/assets/gerador-orcamentos-preview.svg",
    featured: false,
    active: true,
    createdAt: "2026-08-14T00:00:00Z",
    features: [
      {
        title: "Criação Rápida de Orçamentos",
        description: "Preencha dados do cliente, itens do serviço e calcule o valor final em segundos.",
      },
      {
        title: "Envio Direto via WhatsApp",
        description: "Gere a proposta formatada com link ou texto e dispare diretamente para o cliente.",
      },
      {
        title: "Geração de PDF Elegante",
        description: "Documento com layout profissional pronto para impressão ou compartilhamento digital.",
      },
      {
        title: "Cadastro e Histórico de Clientes",
        description: "Mantenha o registro de contatos, histórico de propostas e status de aprovação.",
      },
      {
        title: "Totalmente Responsivo & Mobile First",
        description: "Acesse e monte orçamentos na palma da mão pelo celular ou pelo computador.",
      },
      {
        title: "Sem Mensalidades",
        description: "Acesso direto à ferramenta sem cobranças recorrentes surpresa.",
      },
    ],
    benefits: [
      {
        title: "Apresentação Profissional",
        description: "Passe credibilidade imediata com orçamentos padronizados e sem erros de cálculo.",
      },
      {
        title: "Economia de Tempo",
        description: "Economize até 80% do tempo gasto redigindo e formatando orçamentos manuais.",
      },
      {
        title: "Fechamento Mais Rápido",
        description: "Facilidade para o cliente visualizar e aprovar a proposta rapidamente no WhatsApp.",
      },
      {
        title: "Foco no seu Trabalho",
        description: "Menos burocracia administrativa e mais tempo para executar seus serviços.",
      },
    ],
    targetAudience: "Autônomos, freelancers, consultores, eletricistas, designers, técnicos e pequenos negócios.",
    highlights: [
      "Pronto para uso imediato",
      "Interface limpa e objetiva",
      "Funciona no celular e no computador",
    ],
    version: "v1.0",
    headline: "Orçamentos profissionais em poucos minutos.",
    headlineHighlight: "Crie, organize e envie orçamentos profissionais diretamente pelo celular ou computador.",
    ctaText: "QUERO ACESSAR O GERADOR",
    accessButtonText: "ACESSAR GERADOR",
    tutorialSteps: [
      { step: 1, title: "Acesse o gerador", description: "Abra a ferramenta pela sua área de membros no celular ou computador." },
      { step: 2, title: "Cadastre o cliente", description: "Informe nome, telefone e dados do cliente para a proposta." },
      { step: 3, title: "Adicione os itens e serviços", description: "Insira os serviços realizados, quantidades e valores unitários." },
      { step: 4, title: "Defina descontos ou taxas", description: "O aplicativo calcula os totais automaticamente sem erros." },
      { step: 5, title: "Personalize seu layout", description: "Adicione seu logotipo, dados da empresa e cores personalizadas." },
      { step: 6, title: "Gere a proposta ou PDF", description: "Exporte um PDF profissional ou prepare o envio pelo WhatsApp." },
      { step: 7, title: "Envie ao cliente", description: "Dispare a proposta e acompanhe o status de aprovação." },
    ],
    faqItems: [
      { question: "Como é feito o pagamento?", answer: "O pagamento é processado pela Kiwify através do checkout seguro do produto." },
      { question: "Como recebo o acesso?", answer: "Após a confirmação da compra, você receberá as instruções e terá o acesso liberado na área de membros." },
      { question: "Preciso instalar algum aplicativo?", answer: "Não. O gerador funciona diretamente no navegador do seu smartphone ou computador." },
      { question: "Existe mensalidade?", answer: "Não. O Gerador de Orçamentos Profissionais é vendido como compra única, sem recorrência." },
      { question: "Meus dados ficam salvos?", answer: "Sim, seus orçamentos e clientes ficam salvos com total segurança no armazenamento local do seu dispositivo." },
    ],
    checkoutProvider: "kiwify",
    checkoutUrl: "https://pay.kiwify.com.br/jqcVIQV",
    appUrl: "https://orcamentos.alstudiotech.com",
  },
  {
    id: "gerador-curriculo",
    slug: "gerador-de-curriculo-profissional",
    name: "Gerador de Currículo Profissional",
    category: "Currículo",
    categoriesList: ["Currículo", "app", "Produtividade"],
    shortDescription:
      "Crie currículos profissionais de forma rápida, moderna e organizada.",
    description:
      "O Gerador de Currículo Profissional foi desenvolvido para ajudar você a criar currículos modernos, elegantes e estruturados em poucos minutos. Basta preencher seus dados, experiências profissionais e formação para obter um documento formatado e pronto para destacar suas habilidades no mercado de trabalho.",
    price: 29.9,
    oldPrice: 59.9,
    billingType: "oneTime",
    availability: "available",
    deliveryType: "webapp",
    accessType: "protected",
    badge: "Novo",
    image: "/assets/gerador-curriculo-preview.svg",
    featured: false,
    active: true,
    createdAt: "2026-08-19T00:00:00Z",
    headline: "Currículo profissional pronto em poucos minutos.",
    headlineHighlight: "Crie, personalize e baixe seu currículo moderno diretamente pelo celular ou computador.",
    ctaText: "QUERO MEU CURRÍCULO",
    accessButtonText: "🚀 ACESSAR GERADOR",
    features: [
      {
        title: "Criação de Currículo Profissional",
        description: "Layouts estruturados de acordo com as melhores práticas exigidas pelos recrutadores.",
      },
      {
        title: "Processo Rápido e Simples",
        description: "Preencha as seções passo a passo sem se preocupar com alinhamentos manuais ou erros de formatação.",
      },
      {
        title: "Interface Fácil de Usar",
        description: "Design intuitivo e limpo, acessível tanto no smartphone quanto no computador.",
      },
      {
        title: "Currículo Organizado e Moderno",
        description: "Visual padronizado, legível e preparado para valorizar sua trajetória profissional.",
      },
      {
        title: "Uso Direto pelo Navegador",
        description: "Sem necessidade de instalar programas pesados ou extensões complicadas.",
      },
      {
        title: "Acesso Liberado Imediatamente",
        description: "Após a compra você recebe o acesso liberado na sua área de membros.",
      },
    ],
    benefits: [
      {
        title: "Destaque no Mercado",
        description: "Apresente sua trajetória com credibilidade e organização visual impecável para os recrutadores.",
      },
      {
        title: "Economia de Tempo",
        description: "Monte um currículo completo em poucos minutos sem brigas de formatação no Word.",
      },
      {
        title: "Compatibilidade Total",
        description: "Funciona perfeitamente em celulares, tablets e computadores.",
      },
      {
        title: "Sem Mensalidades",
        description: "Pagamento único e direto sem assinaturas recorrentes indesejadas.",
      },
    ],
    tutorialSteps: [
      { step: 1, title: "Acesse o gerador", description: "Clique no botão de acesso liberado na sua área de membros." },
      { step: 2, title: "Preencha seus dados", description: "Insira nome completo, contatos, cargo pretendido e resumo profissional." },
      { step: 3, title: "Adicione suas experiências profissionais", description: "Liste empresas anteriores, cargos, períodos e principais conquistas." },
      { step: 4, title: "Informe sua formação", description: "Adicione cursos, graduações, certificações e idiomas." },
      { step: 5, title: "Revise as informações", description: "Confira a pré-visualização em tempo real para garantir que tudo está correto." },
      { step: 6, title: "Gere seu currículo", description: "O sistema organiza e formata tudo automaticamente com tipografia e espaçamento profissionais." },
      { step: 7, title: "Salve ou utilize o currículo gerado", description: "Exporte em PDF pronto para enviar para vagas ou imprimir." },
    ],
    faqItems: [
      { question: "Como é feito o pagamento?", answer: "O pagamento é processado com total segurança pela Kiwify através do checkout do produto." },
      { question: "Como recebo o acesso?", answer: "Após a confirmação do pagamento pela Kiwify, o produto é liberado automaticamente na sua área de membros com o botão de acesso." },
      { question: "Preciso instalar algum programa?", answer: "Não. O gerador funciona 100% online através do seu navegador, no celular ou no computador." },
      { question: "Existe mensalidade?", answer: "Não. O Gerador de Currículo Profissional é de pagamento único, sem nenhuma mensalidade." },
      { question: "Posso criar mais de um currículo?", answer: "Sim, você pode gerar e atualizar seus currículos quantas vezes precisar." },
      { question: "O currículo pode ser salvo em PDF?", answer: "Sim, você pode exportar e baixar seu currículo em PDF com formatação profissional." },
    ],
    targetAudience: "Profissionais em transição de carreira, estudantes, candidatos a vagas de emprego e quem deseja um currículo moderno e bem estruturado.",
    highlights: [
      "Criação rápida em minutos",
      "Layout moderno e legível",
      "Funciona no celular e PC",
    ],
    version: "v1.0",
    checkoutProvider: "kiwify",
    checkoutUrl: "https://pay.kiwify.com.br/66EA8eF",
    appUrl: "https://gerador-curriculo-gamma.vercel.app/",
  },
  {
    id: "al-studio-gestao",
    slug: "al-studio-gestao",
    name: "AL Studio Gestão",
    category: "Gestão",
    categoriesList: ["Gestão", "app", "Produtividade"],
    shortDescription:
      "Uma ferramenta simples para pequenos negócios controlarem vendas, estoque, custos, despesas e resultados.",
    description:
      "O AL Studio Gestão é uma solução completa e simplificada para pequenos empreendedores, lanchonetes, restaurantes, prestadores de serviços e comércios que precisam de controle total sobre sua operação. Registre vendas, gerencie estoque de produtos e insumos, crie fichas técnicas com cálculo de custos e margem de lucro real e acompanhe seu desempenho financeiro sem complicações.",
    price: 49.9,
    oldPrice: 89.9,
    billingType: "oneTime",
    availability: "available",
    deliveryType: "webapp",
    accessType: "protected",
    badge: "Novo",
    image: "/assets/al-studio-gestao-preview.svg",
    featured: true,
    active: true,
    createdAt: "2026-08-21T00:00:00Z",
    headline: "Gestão simples e inteligente para o seu negócio.",
    headlineHighlight: "Controle vendas, estoque, fichas técnicas e margens de lucro em um só lugar.",
    ctaText: "QUERO O AL STUDIO GESTÃO",
    accessButtonText: "🚀 ACESSAR AL STUDIO GESTÃO",
    features: [
      { title: "✓ Vendas", description: "Registro rápido de vendas diárias e histórico por período." },
      { title: "✓ Estoque", description: "Controle automático de estoque de produtos acabados e insumos." },
      { title: "✓ Fichas técnicas", description: "Cálculo preciso de custos dos componentes para cada produto final." },
      { title: "✓ Custos", description: "Identifique custos fixos e variáveis com precisão." },
      { title: "✓ Margens", description: "Visualização imediata da margem de lucro real por item." },
      { title: "✓ Financeiro", description: "Controle de entradas, saídas e fluxo de caixa." },
      { title: "✓ Relatórios", description: "Gráficos de vendas, produtos mais vendidos e faturamento." },
      { title: "✓ PWA", description: "Instale no celular ou computador como um aplicativo nativo." },
      { title: "✓ Funcionamento offline", description: "Utilize mesmo sem conexão à internet e sincronize ao reconectar." },
    ],
    benefits: [
      {
        title: "Visão 360° do Negócio",
        description: "Saiba exatamente quanto ganha, quanto gasta e onde está seu lucro em tempo real.",
      },
      {
        title: "Sem Desperdícios no Estoque",
        description: "Controle de insumos e alertas quando produtos atingem nível crítico de estoque.",
      },
      {
        title: "Preificação Correta",
        description: "Fichas técnicas calculadas para garantir que você não venda no prejuízo.",
      },
      {
        title: "Acesso em Qualquer Lugar",
        description: "Suporte PWA completo para usar no celular, tablet ou computador.",
      },
    ],
    tutorialSteps: [
      { step: 1, title: "Acesse o sistema", description: "Abra o AL Studio Gestão pela sua área de membros no navegador." },
      { step: 2, title: "Cadastre seus produtos e insumos", description: "Adicione os itens do seu estoque com custos unitários." },
      { step: 3, title: "Monte as fichas técnicas", description: "Vincule insumos aos produtos finais para calcular a margem de lucro." },
      { step: 4, title: "Registre suas vendas", description: "Lançamento rápido de vendas diárias com baixa automática no estoque." },
      { step: 5, title: "Acompanhe relatórios", description: "Visualize o faturamento, lucro e produtos mais vendidos instantaneamente." },
    ],
    faqItems: [
      { question: "O sistema precisa de internet para funcionar?", answer: "Não! O AL Studio Gestão possui tecnologia PWA e funciona offline no seu dispositivo." },
      { question: "Tem mensalidade?", answer: "Não! O AL Studio Gestão é vendido como compra única com acesso vitalício à versão." },
      { question: "Como é feito o pagamento?", answer: "O pagamento é processado com total segurança pela Kiwify." },
      { question: "Posso usar no celular?", answer: "Sim! A interface é 100% responsiva e otimizada para smartphones e computadores." },
    ],
    targetAudience: "Pequenos comerciantes, restaurantes, lanchonetes, prestadores de serviços, artesãos e e-commerces.",
    highlights: [
      "Controle de Vendas & Estoque",
      "Fichas Técnicas & Margens",
      "PWA Offline sem mensalidade",
    ],
    version: "v1.0",
    checkoutProvider: "kiwify",
    checkoutUrl: "", // [URL DO CHECKOUT KIWIFY - AL STUDIO GESTÃO]
    appUrl: "https://gestao.alstudiotech.com",
  },
  {
    id: "al-studio-agenda",
    slug: "al-studio-agenda",
    name: "AL Studio Agenda",
    category: "Agendamento",
    categoriesList: ["Agendamento", "app", "Produtividade"],
    shortDescription:
      "Uma agenda digital simples para profissionais e empresas organizarem clientes, serviços, horários e agendamentos.",
    description:
      "O AL Studio Agenda é a solução ideal para salões de beleza, barbearias, clínicas, consultórios, personal trainers e profissionais autônomos que desejam profissionalizar sua rotina de atendimentos. Cadastre clientes, serviços prestados, equipe de profissionais e gerencie horários e disponibilidade em um visual moderno, rápido e sem complicações.",
    price: 39.9,
    oldPrice: 69.9,
    billingType: "oneTime",
    availability: "available",
    deliveryType: "webapp",
    accessType: "protected",
    badge: "Novo",
    image: "/assets/al-studio-agenda-preview.svg",
    featured: false,
    active: true,
    createdAt: "2026-08-21T00:00:00Z",
    headline: "Organize sua agenda e seus clientes em poucos cliques.",
    headlineHighlight: "Gerencie atendimentos, serviços e disponibilidade de forma simples e profissional.",
    ctaText: "QUERO O AL STUDIO AGENDA",
    accessButtonText: "🚀 ACESSAR AL STUDIO AGENDA",
    features: [
      { title: "✓ Agenda", description: "Visão diária, semanal e mensal de todos os agendamentos." },
      { title: "✓ Clientes", description: "Cadastro completo com histórico de visitas e preferências." },
      { title: "✓ Serviços", description: "Catálogo de serviços com duração, preço e profissional responsável." },
      { title: "✓ Profissionais", description: "Gerenciamento de múltiplos atendentes e especialidades." },
      { title: "✓ Horários", description: "Definição personalizada de horários de atendimento e intervalos." },
      { title: "✓ Disponibilidade", description: "Bloqueio de horários indisponíveis e controle de encaixes." },
      { title: "✓ PWA", description: "Instale como app no celular sem precisar de lojas de aplicativos." },
      { title: "✓ Funcionamento offline", description: "Acesse e consulte seus agendamentos mesmo sem internet." },
    ],
    benefits: [
      {
        title: "Zero Faltas e Choque de Horários",
        description: "Controle claro dos slots disponíveis para garantir atendimento pontual.",
      },
      {
        title: "Fidelização de Clientes",
        description: "Histórico completo por cliente para proporcionar atendimento personalizado.",
      },
      {
        title: "Praticidade na Palma da Mão",
        description: "Instale no smartphone e consulte seus horários onde você estiver.",
      },
      {
        title: "Sem Custos Recorrentes",
        description: "Pagamento único, sem cobranças mensais ou taxas adicionais.",
      },
    ],
    tutorialSteps: [
      { step: 1, title: "Acesse o sistema", description: "Entre na agenda pela sua área de membros no celular ou computador." },
      { step: 2, title: "Cadastre seus serviços", description: "Insira nome do serviço, duração estimada e valor cobrado." },
      { step: 3, title: "Defina seus horários", description: "Ajuste os dias de funcionamento e períodos de atendimento." },
      { step: 4, title: "Agende seus atendimentos", description: "Cadastre novos agendamentos e acompanhe o status em tempo real." },
    ],
    faqItems: [
      { question: "O sistema funciona em celular?", answer: "Sim! É 100% otimizado para celulares Android e iPhone, com tecnologia PWA." },
      { question: "Existe mensalidade?", answer: "Não! O AL Studio Agenda é de compra única sem recorrência." },
      { question: "Como recebo o acesso?", answer: "Após a confirmação do pagamento pela Kiwify, o produto é liberado imediatamente na sua área de membros." },
    ],
    targetAudience: "Salões de beleza, barbearias, clínicas, esteticistas, fisioterapeutas, personal trainers e autônomos.",
    highlights: [
      "Agenda Diária & Clientes",
      "Controle de Serviços e Horários",
      "PWA Offline sem mensalidade",
    ],
    version: "v1.0",
    checkoutProvider: "kiwify",
    checkoutUrl: "", // [URL DO CHECKOUT KIWIFY - AL STUDIO AGENDA]
    appUrl: "https://agenda.alstudiotech.com",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  if (!slug) return undefined;
  const normalized = slug.toLowerCase().replace(/\/$/, '').replace(/^apps\//, '').replace(/^produto\//, '');
  
  return products.find(
    (p) =>
      p.active &&
      (p.slug === normalized ||
        p.id === normalized ||
        (normalized === "gerador-de-orcamentos" && p.id === "gerador-orcamentos") ||
        (normalized === "orcamentos" && p.id === "gerador-orcamentos") ||
        (normalized === "gerador-curriculo" && p.id === "gerador-curriculo") ||
        (normalized === "gerador-de-curriculo" && p.id === "gerador-curriculo") ||
        (normalized === "curriculo" && p.id === "gerador-curriculo") ||
        (normalized === "al-studio-gestao" && p.id === "al-studio-gestao") ||
        (normalized === "gestao" && p.id === "al-studio-gestao") ||
        (normalized === "al-studio-agenda" && p.id === "al-studio-agenda") ||
        (normalized === "agenda" && p.id === "al-studio-agenda"))
  );
}

export function getFeaturedProduct(): Product | undefined {
  return products.find((p) => p.featured && p.active) || products[0];
}

export function getProductsByCategory(category: string): Product[] {
  if (!category || category.toLowerCase() === "todos") return products.filter((p) => p.active);
  const catLower = category.toLowerCase();
  return products.filter(
    (p) =>
      p.active &&
      (p.category.toLowerCase() === catLower ||
        (p.categoriesList && p.categoriesList.some(c => c.toLowerCase() === catLower)))
  );
}
