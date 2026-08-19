import { Product, CategoryInfo } from '../types';

export const categories: CategoryInfo[] = [
  {
    id: "aplicativos",
    name: "app",
    label: "Aplicativos",
    title: "APLICATIVOS",
    description: "Ferramentas prontas para resolver tarefas do dia a dia.",
    icon: "Smartphone",
  },
  {
    id: "automacoes",
    name: "automation",
    label: "Automações",
    title: "AUTOMAÇÕES",
    description: "Automatize tarefas repetitivas e economize tempo.",
    icon: "Cpu",
  },
  {
    id: "templates",
    name: "template",
    label: "Templates",
    title: "TEMPLATES",
    description: "Modelos prontos para adaptar e utilizar.",
    icon: "LayoutTemplate",
  },
  {
    id: "kits",
    name: "kit",
    label: "Kits",
    title: "KITS",
    description: "Pacotes completos com várias ferramentas.",
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
    category: "app",
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
    featured: true,
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
    category: "app",
    shortDescription:
      "Crie currículos profissionais de forma rápida, organizada e moderna, prontos para usar na sua busca por emprego.",
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
    ctaText: "QUERO ACESSAR O GERADOR",
    accessButtonText: "ACESSAR GERADOR",
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
    checkoutUrl: "", // [URL DO CHECKOUT KIWIFY DO GERADOR] - Insira a URL do checkout da Kiwify aqui
    appUrl: "https://gerador-curriculo-gamma.vercel.app/",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  const normalized = slug.toLowerCase().replace(/\/$/, '');
  return products.find(
    (p) =>
      p.active &&
      (p.slug === normalized ||
        p.id === normalized ||
        (normalized === "gerador-de-orcamentos" && p.id === "gerador-orcamentos") ||
        (normalized === "gerador-curriculo" && p.id === "gerador-curriculo") ||
        (normalized === "gerador-de-curriculo" && p.id === "gerador-curriculo"))
  );
}

export function getFeaturedProduct(): Product | undefined {
  return products.find((p) => p.featured && p.active);
}

export function getProductsByCategory(category: string): Product[] {
  if (!category || category.toLowerCase() === "todos") return products.filter((p) => p.active);
  return products.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase() && p.active
  );
}
