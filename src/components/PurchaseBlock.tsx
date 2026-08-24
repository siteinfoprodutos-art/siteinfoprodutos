import { ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { formatPrice } from '../utils/formatters';
import { openCheckout } from '../utils/checkout';
import { trackEvent } from '../utils/analytics';

interface PurchaseBlockProps {
  product: Product;
  variant?: 'hero' | 'bottom' | 'mobile';
}

export function PurchaseBlock({ product, variant = 'hero' }: PurchaseBlockProps) {
  const isAvailable = product.availability === 'available';
  const isComingSoon = product.availability === 'comingSoon';

  const billingText = product.billingType === 'subscription' ? 'Assinatura' : 'Compra única';

  let buttonText = product.ctaText || 'Comprar agora';
  if (isComingSoon || (!isAvailable && product.checkoutUrl === '')) {
    buttonText = 'Em breve';
  } else if (!isAvailable) {
    buttonText = 'Indisponível no momento';
  } else if (product.checkoutUrl === '') {
    buttonText = 'Em breve';
  }

  const isButtonDisabled = !isAvailable || product.checkoutUrl === '';

  const handlePurchase = () => {
    trackEvent('checkout_click', { productId: product.id, provider: product.checkoutProvider });
    if (!isButtonDisabled) {
      openCheckout(product.checkoutUrl);
    }
  };

  if (variant === 'mobile') {
    return (
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-[#0b0f17]/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 p-3.5 z-40 flex flex-col gap-1.5 shadow-[0_-4px_16px_-1px_rgba(0,0,0,0.1)] pb-safe">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">
              {billingText}
            </div>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <div className="text-xl font-black text-slate-900 dark:text-white leading-none">
                {formatPrice(product.price)}
              </div>
              {product.oldPrice && product.oldPrice > product.price && (
                <span className="text-xs text-slate-400 dark:text-slate-500 line-through font-semibold">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>
          </div>
          {isButtonDisabled ? (
            <button
              type="button"
              disabled
              className="inline-flex items-center gap-2 px-5 py-2.5 font-bold text-sm rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed"
            >
              <span>{buttonText}</span>
            </button>
          ) : (
            <a
              href={product.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('checkout_click', { productId: product.id, provider: product.checkoutProvider })}
              className="inline-flex items-center gap-2 px-5 py-2.5 font-bold text-sm rounded-xl transition-all shadow-sm bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>{buttonText}</span>
            </a>
          )}
        </div>
        {isAvailable && product.checkoutUrl !== '' && product.checkoutProvider === 'kiwify' && (
          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium text-center">
            Pagamento seguro processado pela Kiwify.
          </div>
        )}
      </div>
    );
  }

  if (variant === 'bottom') {
    return (
      <div className="flex flex-col items-center gap-6 w-full">
        <div className="bg-slate-50 dark:bg-[#121824] p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm w-full max-w-sm text-center">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block mb-2">
            {billingText}
          </span>
          <div className="flex flex-col items-center gap-1">
            <span className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && product.oldPrice > product.price && (
              <span className="text-base text-slate-400 dark:text-slate-500 line-through font-semibold">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center gap-3 w-full sm:w-auto">
          {isButtonDisabled ? (
            <button
              type="button"
              disabled
              className="inline-flex items-center justify-center gap-3 px-10 py-4 font-extrabold text-base sm:text-lg rounded-2xl transition-all w-full sm:w-auto bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed border border-slate-300 dark:border-slate-700"
            >
              <span>{buttonText}</span>
            </button>
          ) : (
            <a
              href={product.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('checkout_click', { productId: product.id, provider: product.checkoutProvider })}
              className="inline-flex items-center justify-center gap-3 px-10 py-4 font-extrabold text-base sm:text-lg rounded-2xl transition-all w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>{buttonText}</span>
            </a>
          )}
          {isAvailable && product.checkoutUrl !== '' && product.checkoutProvider === 'kiwify' && (
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium text-center">
              Pagamento processado com segurança pela Kiwify.
            </p>
          )}

          {isButtonDisabled && isAvailable && (
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium text-center">
              Este produto estará disponível para compra em breve.
            </p>
          )}

          <div className="flex flex-wrap justify-center items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 font-medium pt-2">
            <span className="inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> {billingText}
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Produto digital
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> Acesso imediato via e-mail
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Hero variant
  return (
    <div className="pt-2 flex flex-col items-start gap-5">
      <div>
        <div className="flex items-baseline gap-3">
          <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {formatPrice(product.price)}
          </span>
          {product.oldPrice && product.oldPrice > product.price && (
            <span className="text-base text-slate-400 dark:text-slate-500 line-through font-semibold">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>
        <span className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1">
          {billingText}
        </span>
      </div>

      <div className="flex flex-col gap-2 w-full sm:w-auto">
        {isButtonDisabled ? (
          <button
            type="button"
            disabled
            className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 font-extrabold text-sm sm:text-base rounded-xl transition-all w-full sm:w-auto bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed border border-slate-300 dark:border-slate-700"
          >
            <span>{buttonText}</span>
          </button>
        ) : (
          <a
            href={product.checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('checkout_click', { productId: product.id, provider: product.checkoutProvider })}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 font-extrabold text-sm sm:text-base rounded-xl transition-all w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 hover:shadow-lg"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>{buttonText}</span>
          </a>
        )}
        {isAvailable && product.checkoutUrl !== '' && product.checkoutProvider === 'kiwify' && (
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium text-center sm:text-left mt-0.5">
            Pagamento processado pela Kiwify.
          </p>
        )}

        {isButtonDisabled && isAvailable && (
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium text-center sm:text-left">
            Este produto estará disponível para compra em breve.
          </p>
        )}
      </div>
    </div>
  );
}
