import { CheckCircle2, MessageCircle, Home } from 'lucide-react';
import { brand } from '../config/brand';
import { SEO } from '../components/SEO';

interface PurchaseSuccessPageProps {
  onNavigate: (path: string) => void;
}

export function PurchaseSuccessPage({ onNavigate }: PurchaseSuccessPageProps) {
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
              Para acessar o produto adquirido, siga as instruções fornecidas pela Kiwify através do e-mail de confirmação.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-colors shadow-xs"
            >
              <Home className="w-4 h-4" />
              <span>Voltar para a {brand.name}</span>
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
