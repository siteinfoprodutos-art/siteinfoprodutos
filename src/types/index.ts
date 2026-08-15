export type ProductCategory = "app" | "automation" | "template" | "kit";

export type DeliveryType = "webapp" | "download" | "external" | "instructions";
export type AccessType = "public" | "protected" | "download" | "external";
export type PurchasedProductStatus = "active" | "expired" | "suspended";
export type CheckoutProvider = "kiwify" | "external";

export interface ProductDeliveryConfig {
  instructions?: string;
  downloadUrl?: string;
  externalUrl?: string;
}

export interface ProductFeature {
  title: string;
  description?: string;
}

export interface ProductBenefit {
  title: string;
  description: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  shortDescription: string;
  description: string;
  price: number;
  oldPrice?: number;
  billingType: "oneTime" | "subscription";
  availability: "available" | "comingSoon" | "unavailable";
  
  // Checkout
  checkoutProvider: CheckoutProvider;
  checkoutUrl: string;

  // Entrega e Acesso
  deliveryType: DeliveryType;
  accessType: AccessType;
  delivery?: ProductDeliveryConfig;
  
  image: string;
  gallery?: string[];
  badge?: string;
  features: (string | ProductFeature)[];
  benefits?: (string | ProductBenefit)[];
  appUrl: string;
  featured: boolean;
  active: boolean;
  createdAt: string;
  updatedAt?: string;
  
  targetAudience?: string;
  highlights?: string[];
  version?: string;

  // SEO Opcional
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: string;
}

export interface CategoryInfo {
  id: string;
  name: ProductCategory;
  label: string;
  title: string;
  description: string;
  icon: string;
  badge?: string;
}
