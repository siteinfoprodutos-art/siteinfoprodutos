/**
 * Brand Configuration for AL Studio Tech
 * Centralized brand information and identity settings.
 */

export interface BrandConfig {
  name: string;
  slogan: string;
  description: string;
  presentation: string;
  contact: {
    email: string;
    supportEmail: string;
    supportWhatsApp: string;
instagram: string;
    instagramUrl: string;
    whatsapp: string;
    whatsappFormatted: string;
    whatsappUrl: string;
    site: string;
  };
  navigation: {
    links: {
      label: string;
      href: string;
      category?: string;
    }[];
    cta: {
      label: string;
      href: string;
    };
  };
  benefits: {
    title: string;
    items: {
      id: string;
      title: string;
      description: string;
      icon: string;
    }[];
  };
}

export const brand: BrandConfig = {
  name: "AL Studio Tech",
  slogan: "Tecnologia simples para facilitar o seu dia.",
  description:
    "Aplicativos, planilhas e ferramentas digitais criados para simplificar tarefas e ajudar pessoas e pequenos negócios a trabalharem melhor.",
  presentation:
    "Na AL Studio Tech, criamos ferramentas digitais simples e acessíveis para resolver problemas reais do dia a dia.",
  contact: {
    email: "contato@alstudiotech.com",
    supportEmail: "suporte@alstudiotech.com",
    supportWhatsApp: "5511999999999",
instagram: "@alstudiotech",
    instagramUrl: "https://instagram.com/alstudiotech",
    whatsapp: "5511999999999",
    whatsappFormatted: "(11) 99999-9999",
    whatsappUrl: "https://wa.me/5511999999999?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20produtos%20da%20AL%20Studio%20Tech",
    site: "https://alstudiotech.com",
  },
  navigation: {
    links: [
      { label: "Início", href: "/" },
      { label: "Produtos", href: "/produtos" },
      { label: "Aplicativos", href: "/produtos?categoria=aplicativo", category: "Aplicativo" },
      { label: "Templates", href: "/produtos?categoria=template", category: "Template" },
      { label: "Sobre", href: "/sobre" },
    ],
    cta: {
      label: "Explorar produtos",
      href: "/produtos",
    },
  },
  benefits: {
    title: "Feito para simplificar.",
    items: [
      {
        id: "simples",
        title: "SIMPLES",
        description: "Sem sistemas complicados.",
        icon: "CheckCircle2",
      },
      {
        id: "pratico",
        title: "PRÁTICO",
        description: "Ferramentas pensadas para o uso real.",
        icon: "Zap",
      },
      {
        id: "mobile",
        title: "MOBILE FIRST",
        description: "Use onde estiver.",
        icon: "Smartphone",
      },
    ],
  },
};
