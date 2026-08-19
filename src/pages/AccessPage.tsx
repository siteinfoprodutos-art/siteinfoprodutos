import { useState, FormEvent } from 'react';
import { KeyRound, ArrowRight } from 'lucide-react';
import { SEO } from '../components/SEO';
import { setMemberEmail } from '../utils/memberAccess';

interface AccessPageProps {
  onNavigate: (path: string) => void;
}

export function AccessPage({ onNavigate }: AccessPageProps) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setMemberEmail(email.trim());
      onNavigate('/minha-conta');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[var(--color-background)] px-4 py-16 relative transition-colors">
      <SEO title="Acessar Área de Membros" noindex={true} />
      
      <div className="max-w-md w-full relative z-10 space-y-6">
        <div className="text-center space-y-2.5">
          <div className="w-14 h-14 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-200 dark:border-blue-500/20">
            <KeyRound className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Acesse seus produtos</h1>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm font-medium">
            Digite o e-mail cadastrado na sua compra para acessar sua área de membros e ferramentas liberadas.
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
                required
                placeholder="seu-email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#0b0f17] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors"
              />
            </div>
            
            <button 
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md shadow-blue-500/20"
            >
              <span>Acessar Área de Membros</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
