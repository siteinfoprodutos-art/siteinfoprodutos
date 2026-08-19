import { useEffect, useState } from 'react';
import { CheckCircle2, MessageCircle, Home, Sparkles, ExternalLink, ArrowRight } from 'lucide-react';
import { brand } from '../config/brand';
import { SEO } from '../components/SEO';
import { syncAccessFromUrlParams, getUnlockedProductIds } from '../utils/memberAccess';
import { products } from '../data/products';

interface PurchaseSuccessPageProps {
  onNavigate: (path: string) => void;
}

export function PurchaseSuccessPage({ onNavigate }: PurchaseSuccessPageProps) {
  const [unlockedProduct, setUnlockedProduct] = useState<string | null>(null);

  useEffect(() => {
    const syncResult = syncAccessFromUrlParams();
    if (syncResult?.newlyUnlocked) {
      setUnlockedProduct(syncResult.newlyUnlocked);
    } else {
      const all = getUnlockedProductIds();
      if (all.length > 0) {
        setUnlockedProduct(all[all.length - 1]);
      }
    }
  }, []);

  const productObj = unlockedProduct ? products.find(p => p.id === unlockedProduct) : null;

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[var(--color-background)] px-4 py-16 relative transition-colors">
      <SEO title="Compra Concluída" noindex={true} />
      
      <div className="max-w-2xl w-full relative z-10">
        <div className="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-14 text-center space-y-8 shadow-xs">
          
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center border border-emerald-200 dark:border-emerald-500/20">
              <CheckCircle2 className="w-9 h-9" />
            </div>
          </div>
          
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Obrigado por escolher a {brand.name}!
            </h1>
            <p className="text-xs sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium max-w-lg mx-auto">
              Seu pagamento foi confirmado com sucesso. O seu acesso foi liberado na área de membros.
            </p>
          </div>

          {productObj && (
            <div className="p-5 bg-blue-50/70 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-2xl text-left flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Produto Liberado
                  </span>
                  <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                    {productObj.name}
                  </h4>
                </div>
              </div>

              {productObj.appUrl ? (
                <a
                  href={productObj.appUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl transition-all shadow-md shadow-blue-500/20"
                >
                  <span>{productObj.accessButtonText || 'ACESSAR FERRAMENTA'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => onNavigate('/minha-conta')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl transition-all shadow-md shadow-blue-500/20"
                >
                  <span>Ver na Área de Membros</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => onNavigate('/minha-conta')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-colors shadow-xs"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ir para a Área de Membros</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs sm:text-sm rounded-xl transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Página Inicial</span>
            </button>
          </div>

          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Precisa de suporte?</p>
            
            <a 
              href={brand.contact.whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-50 dark:bg-emerald-500/10 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-bold text-xs sm:text-sm rounded-xl transition-colors border border-emerald-200 dark:border-emerald-500/20"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Falar com o Suporte via WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
