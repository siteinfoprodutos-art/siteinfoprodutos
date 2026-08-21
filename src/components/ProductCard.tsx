import { useState } from 'react';
import { ArrowRight, Sparkles, Check, Layers, Cpu, AppWindow, Wrench, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { formatPrice } from '../utils/formatters';
import { openCheckout } from '../utils/checkout';

interface ProductCardProps {
  key?: string;
  product: Product;
  onSelect: (slug: string) => void;
  featured?: boolean;
}

export function ProductCard({ product, onSelect, featured = false }: ProductCardProps) {
  const [imgError, setImgError] = useState(false);

  const categoryLabels: Record<string, string> = {
    app: 'Aplicativo',
    automation: 'Automação',
    template: 'Template',
    kit: 'Kit',
  };

  const categoryIcons: Record<string, typeof AppWindow> = {
    app: AppWindow,
    automation: Cpu,
    template: Layers,
    kit: Wrench,
  };

  const categoryLabel = categoryLabels[product.category] || product.category;
  const CategoryIcon = categoryIcons[product.category] || AppWindow;

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => onSelect(product.slug)}
      className={`group relative rounded-2xl bg-white dark:bg-[#121824] border cursor-pointer transition-all duration-200 flex flex-col justify-between overflow-hidden ${
        featured
          ? 'border-blue-500/40 dark:border-blue-500/30 shadow-lg shadow-blue-500/10 ring-1 ring-blue-500/20'
          : 'border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md'
      }`}
    >
      <div>
        {/* Visual Preview Header with aspect ratio constraint */}
        <div className="relative aspect-[16/10] bg-slate-900 dark:bg-[#0d121c] overflow-hidden flex items-center justify-center border-b border-slate-200/60 dark:border-slate-800/60">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-emerald-500/5 z-0 pointer-events-none" />

          {!imgError && product.image ? (
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              referrerPolicy="no-referrer"
              className={`w-full h-full relative z-10 transform group-hover:scale-[1.03] transition-transform duration-300 ${
                product.image.endsWith('.svg') ? 'object-contain p-4' : 'object-cover'
              }`}
              onError={() => setImgError(true)}
            />
          ) : (
            /* Premium Fallback Placeholder */
            <div className="relative z-10 text-center space-y-2 p-4 flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-200 dark:border-blue-800/40">
                <CategoryIcon className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-slate-900 dark:text-white block line-clamp-1">
                  {product.name}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium block">
                  AL Studio Tech
                </span>
              </div>
            </div>
          )}

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3 z-20 bg-blue-600 text-white font-bold text-[11px] px-2.5 py-1 rounded-md shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>{product.badge}</span>
            </div>
          )}

          {/* Category Tag */}
          <div className="absolute top-3 right-3 z-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-700 dark:text-slate-200 font-bold text-[11px] px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700 shadow-xs">
            {categoryLabel}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-3">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              {categoryLabel}
            </span>
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {product.name}
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
            {product.shortDescription}
          </p>

          {/* Highlights */}
          {product.highlights && product.highlights.length > 0 && (
            <div className="pt-1 flex flex-wrap gap-1.5">
              {product.highlights.slice(0, 2).map((hl, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 text-[10px] text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 px-2 py-0.5 rounded-md font-medium"
                >
                  <Check className="w-3 h-3 text-emerald-500" />
                  {hl}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer / Price & Action Buttons */}
      <div className="p-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 mt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase font-bold tracking-wider">
            {product.billingType === 'subscription' ? 'Assinatura' : 'Compra única'}
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-xs text-slate-400 dark:text-slate-500 line-through font-semibold">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            id={`btn-view-${product.id}`}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product.slug);
            }}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-xs font-bold rounded-xl transition-all border border-slate-200 dark:border-slate-700"
          >
            <span>Conhecer</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            id={`btn-buy-${product.id}`}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openCheckout(product.checkoutUrl);
            }}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold rounded-xl transition-all shadow-xs"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Comprar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
