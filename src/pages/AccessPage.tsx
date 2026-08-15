import { useState, FormEvent } from 'react';
import { KeyRound, ArrowRight, ShieldAlert } from 'lucide-react';
import { SEO } from '../components/SEO';

interface AccessPageProps {
  onNavigate: (path: string) => void;
}

export function AccessPage({ onNavigate }: AccessPageProps) {
  const [email, setEmail] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[var(--color-background)] px-4 py-16 relative transition-colors">
      <SEO title="Acessar" noindex={true} />
      
      <div className="max-w-md w-full relative z-10 space-y-6">
        <div className="text-center space-y-2.5">
          <div className="w-14 h-14 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-200 dark:border-blue-500/20">
            <KeyRound className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Acesse seus produtos</h1>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm font-medium">
            O acesso aos produtos adquiridos será disponibilizado conforme as instruções recebidas após a compra.
          </p>
        </div>

        <div className="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                E-mail de Compra
              </label>
              <input
                type="email"
                id="email"
                placeholder="Seu e-mail de compra..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#0b0f17] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors"
              />
            </div>
            
            <button 
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold transition-colors shadow-xs"
            >
              <span>Continuar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {showToast && (
            <div className="mt-4 p-3.5 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-xl flex items-start gap-3">
              <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <p className="text-xs font-medium text-amber-800 dark:text-amber-300">
                O acesso direto aos produtos é feito via e-mail enviado após a confirmação do pagamento.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
