import { useEffect } from 'react';
import { seoConfig, GOOGLE_SITE_VERIFICATION } from '../config/seo';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  type?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export function SEO({
  title,
  description,
  canonical,
  image,
  type = 'website',
  noindex = false,
  jsonLd
}: SEOProps) {
  useEffect(() => {
    // Determine Page Title
    const finalTitle = title
      ? (title.includes('AL Studio Tech') ? title : seoConfig.titleTemplate.replace('%s', title))
      : seoConfig.defaultTitle;

    document.title = finalTitle;

    // Helper function to update or create meta tag
    const updateMeta = (nameAttr: 'name' | 'property', attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${nameAttr}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(nameAttr, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const removeMeta = (nameAttr: 'name' | 'property', attrValue: string) => {
      const element = document.querySelector(`meta[${nameAttr}="${attrValue}"]`);
      if (element) {
        element.remove();
      }
    };

    // Helper function to update or create link tag
    const updateLink = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    const removeLink = (rel: string) => {
      const element = document.querySelector(`link[rel="${rel}"]`);
      if (element) {
        element.remove();
      }
    };

    // Description
    const finalDescription = description || seoConfig.defaultDescription;
    updateMeta('name', 'description', finalDescription);

    // Image
    const rawImage = image || seoConfig.defaultImage;
    const finalImage = rawImage.startsWith('http')
      ? rawImage
      : `${seoConfig.siteUrl}${rawImage.startsWith('/') ? '' : '/'}${rawImage}`;

    // Robots
    if (noindex) {
      updateMeta('name', 'robots', 'noindex, nofollow');
    } else {
      updateMeta('name', 'robots', 'index, follow');
    }

    // Google Search Console Verification
    if (GOOGLE_SITE_VERIFICATION) {
      updateMeta('name', 'google-site-verification', GOOGLE_SITE_VERIFICATION);
    }

    // Canonical URL
    const finalCanonical = canonical
      ? (canonical.startsWith('http') ? canonical : `${seoConfig.siteUrl}${canonical.startsWith('/') ? '' : '/'}${canonical}`)
      : `${seoConfig.siteUrl}${window.location.pathname}`;

    if (finalCanonical) {
      updateLink('canonical', finalCanonical);
    } else {
      removeLink('canonical');
    }

    // Open Graph
    updateMeta('property', 'og:site_name', seoConfig.siteName);
    updateMeta('property', 'og:locale', seoConfig.locale);
    updateMeta('property', 'og:title', finalTitle);
    updateMeta('property', 'og:description', finalDescription);
    updateMeta('property', 'og:image', finalImage);
    updateMeta('property', 'og:url', finalCanonical);
    updateMeta('property', 'og:type', type);

    // Twitter Card
    updateMeta('name', 'twitter:card', 'summary_large_image');
    updateMeta('name', 'twitter:title', finalTitle);
    updateMeta('name', 'twitter:description', finalDescription);
    updateMeta('name', 'twitter:image', finalImage);

    // Structured Data (JSON-LD)
    const jsonLdScriptId = 'seo-json-ld';
    let scriptElement = document.getElementById(jsonLdScriptId) as HTMLScriptElement | null;

    if (jsonLd) {
      if (!scriptElement) {
        scriptElement = document.createElement('script');
        scriptElement.id = jsonLdScriptId;
        scriptElement.type = 'application/ld+json';
        document.head.appendChild(scriptElement);
      }
      scriptElement.textContent = JSON.stringify(jsonLd);
    } else if (scriptElement) {
      scriptElement.remove();
    }

    return () => {
      // Optional cleanup if needed when switching pages
    };
  }, [title, description, canonical, image, type, noindex, jsonLd]);

  return null;
}
