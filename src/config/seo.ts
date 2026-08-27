export interface SEOConfig {
  siteName: string;
  siteUrl: string;
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
  defaultImage: string;
  locale: string;
}

export const seoConfig: SEOConfig = {
  siteName: "AL Studio Tech",
  siteUrl: typeof window !== "undefined" ? window.location.origin : "https://alstudiotech.com",
  defaultTitle: "AL Studio Tech | Aplicativos, Planilhas e Ferramentas Digitais",
  titleTemplate: "%s | AL Studio Tech",
  defaultDescription: "Encontre aplicativos, planilhas e ferramentas digitais para organizar sua rotina e aumentar a produtividade do seu negócio.",
  defaultImage: "/og-default.jpg",
  locale: "pt_BR"
};

/**
  * Google Search Console Verification Tag Placeholder
  * Para ativar a verificação do Google, cole a tag de meta verificação abaixo no index.html ou configure aqui.
  * Exemplo: <meta name="google-site-verification" content="SEU_CODIGO_AQUI" />
  */
export const GOOGLE_SITE_VERIFICATION = "";
