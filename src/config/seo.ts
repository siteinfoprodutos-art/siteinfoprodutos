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
  defaultTitle: "AL Studio Tech | Aplicativos, Planilhas e Automações",
  titleTemplate: "%s | AL Studio Tech",
  defaultDescription: "Encontre aplicativos, planilhas e automações para organizar sua rotina, automatizar tarefas e aumentar a produtividade do seu negócio.",
  defaultImage: "/og-default.jpg",
  locale: "pt_BR"
};

/**
  * Google Search Console Verification Tag Placeholder
  * Para ativar a verificação do Google, cole a tag de meta verificação abaixo no index.html ou configure aqui.
  * Exemplo: <meta name="google-site-verification" content="SEU_CODIGO_AQUI" />
  */
export const GOOGLE_SITE_VERIFICATION = "";
