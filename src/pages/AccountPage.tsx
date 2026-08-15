import { User, LayoutGrid } from 'lucide-react';
import { SEO } from '../components/SEO';

interface AccountPageProps {
  onNavigate: (path: string) => void;
}

export function AccountPage({ onNavigate }: AccountPageProps) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[var(--color-background)] px-4 py-16 relative transition-colors">
      <SEO title="Minha Conta" noindex={true} />
      <div className="max-w-md w-full text-center space-y-6">
        
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl flex items-center justify-center border border-slate-200 dark:border-slate-700/60 shadow-xs">
            <User className="w-8 h-8" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Área do cliente
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium max-w-sm mx-auto leading-relaxed">
            Em breve você poderá acessar e gerenciar seus produtos da AL Studio Tech em uma área unificada.
          </p>
        </div>

        <div className="pt-2">
          <button 
            type="button"
            onClick={() => onNavigate('/produtos')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 text-xs sm:text-sm font-bold rounded-xl transition-colors shadow-xs"
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Explorar produtos</span>
          </button>
        </div>

      </div>
    </div>
  );
}
