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
    checkoutProvider: "kiwify",
    checkoutUrl: "https://pay.kiwify.com.br/jqcVIQV",
    appUrl: "https://orcamentos.alstudiotech.com",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  const normalized = slug.toLowerCase().replace(/\/$/, '');
  return products.find(
    (p) => (p.slug === normalized || p.id === normalized || (normalized === "gerador-de-orcamentos" && p.id === "gerador-orcamentos")) && p.active
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
