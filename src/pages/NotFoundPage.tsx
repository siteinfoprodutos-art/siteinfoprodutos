import { FileQuestion, Home, LayoutGrid } from 'lucide-react';
import { SEO } from '../components/SEO';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
}

export function NotFoundPage({ onNavigate }: NotFoundPageProps) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[var(--color-background)] px-4 py-16 relative transition-colors">
      <SEO
        title="Página não encontrada"
        description="O endereço que você tentou acessar não existe ou foi alterado."
        noindex={true}
      />

      <div className="max-w-md w-full text-center space-y-6 relative z-10">
        <div className="w-16 h-16 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-2xl flex items-center justify-center mx-auto border border-rose-200 dark:border-rose-500/20 shadow-xs">
          <FileQuestion className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 px-3 py-1 rounded-full border border-rose-200 dark:border-rose-500/20">
            Erro 404
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Página não encontrada
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm font-medium leading-relaxed">
            O endereço que você tentou acessar não existe ou foi alterado.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-colors shadow-xs"
          >
            <Home className="w-4 h-4" />
            <span>Voltar ao início</span>
          </button>
          
          <button
            type="button"
            onClick={() => onNavigate('/produtos')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/60 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-colors"
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Ver produtos</span>
          </button>
        </div>
      </div>
    </div>
  );
}
