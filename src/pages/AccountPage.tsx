import { useState, useEffect, FormEvent } from 'react';
import {
  User, CheckCircle2, ArrowRight, ExternalLink, BookOpen,
  ShoppingBag, KeyRound, LogOut, Sparkles, ShieldCheck,
  Zap, Lock, HelpCircle
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { products } from '../data/products';
import { Product } from '../types';
import { TutorialModal } from '../components/TutorialModal';
import {
  getUnlockedProductIds,
  isProductUnlocked,
  unlockProduct,
  getMemberEmail,
  setMemberEmail,
  syncAccessFromUrlParams
} from '../utils/memberAccess';
import { openCheckout } from '../utils/checkout';

interface AccountPageProps {
  onNavigate: (path: string) => void;
}

export function AccountPage({ onNavigate }: AccountPageProps) {
  const [email, setEmail] = useState('');
  const [currentEmail, setCurrentEmail] = useState<string | null>(null);
  const [unlockedIds, setUnlockedIds] = useState<string[]>([]);
  const [selectedTutorialProduct, setSelectedTutorialProduct] = useState<Product | null>(null);
  const [justUnlocked, setJustUnlocked] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    // 1. Sync from URL parameters (e.g., /minha-conta?product=gerador-curriculo&email=...)
    const syncResult = syncAccessFromUrlParams();
    if (syncResult?.newlyUnlocked) {
      setJustUnlocked(syncResult.newlyUnlocked);
    }

    // 2. Load stored session
    const storedEmail = getMemberEmail();
    setCurrentEmail(storedEmail);
    setUnlockedIds(getUnlockedProductIds());
  }, []);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setMemberEmail(email.trim());
    setCurrentEmail(email.trim());

    // By default, grant access to purchases or prompt confirmation
    const updated = getUnlockedProductIds();
    setUnlockedIds(updated);
    setStatusMessage('Acesso validado com sucesso!');
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleQuickUnlock = (productId: string) => {
    unlockProduct(productId);
    setUnlockedIds(getUnlockedProductIds());
    setJustUnlocked(productId);
    setStatusMessage('Produto liberado com sucesso!');
    setTimeout(() => {
      setStatusMessage(null);
      setJustUnlocked(null);
    }, 4000);
  };

  const handleLogout = () => {
    setMemberEmail('');
    setCurrentEmail(null);
  };

  const activeProducts = products.filter(p => p.active);

  return (
    <div className="min-h-[80vh] bg-[var(--color-background)] py-12 px-4 sm:px-6 lg:px-8 relative transition-colors">
      <SEO title="Área de Membros | AL Studio Tech" noindex={true} />

      {selectedTutorialProduct && (
        <TutorialModal
          isOpen={true}
          product={selectedTutorialProduct}
          onClose={() => setSelectedTutorialProduct(null)}
        />
      )}

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header Bar */}
        <div className="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center border border-blue-200 dark:border-blue-500/20 shrink-0">
              <User className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  Área de Membros
                </h1>
                <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                  AL Studio Tech
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                {currentEmail ? `Conectado como ${currentEmail}` : 'Acesse seus aplicativos e ferramentas digitais adquiridos.'}
              </p>
            </div>
          </div>

          {currentEmail && (
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors border border-transparent hover:border-rose-200 dark:hover:border-rose-500/20"
            >
              <LogOut className="w-4 h-4" />
              <span>Sair</span>
            </button>
          )}
        </div>

        {statusMessage && (
          <div className="p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-2xl flex items-center gap-3 text-emerald-800 dark:text-emerald-300 text-sm font-semibold">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* If Not Authenticated, prompt email login */}
        {!currentEmail && (
          <div className="bg-gradient-to-br from-blue-50 via-white to-slate-50 dark:from-[#121824] dark:via-[#0b0f17] dark:to-[#121824] border border-blue-100 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xs">
            <div className="max-w-md mx-auto text-center space-y-6">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-md shadow-blue-500/20">
                <KeyRound className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  Identifique seu e-mail de compra
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                  Digite o mesmo e-mail utilizado no checkout da Kiwify para sincronizar seus produtos e liberar o acesso às ferramentas.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-3">
                <input
                  type="email"
                  placeholder="seu-email@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white dark:bg-[#0b0f17] border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-center font-medium"
                />
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-xl text-sm transition-all shadow-md shadow-blue-500/20"
                >
                  <span>Acessar Meus Produtos</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Member Products Catalog / Access List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
                Seus Produtos e Ferramentas
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                Clique para acessar a ferramenta liberada ou visualizar o tutorial de uso.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeProducts.map((prod) => {
              const unlocked = isProductUnlocked(prod.id);
              const isResume = prod.id === 'gerador-curriculo';
              const targetUrl = prod.appUrl || (isResume ? 'https://gerador-curriculo-gamma.vercel.app/' : '#');

              return (
                <div
                  key={prod.id}
                  className={`bg-white dark:bg-[#121824] border rounded-3xl p-6 sm:p-7 shadow-xs flex flex-col justify-between transition-all ${
                    unlocked
                      ? 'border-blue-300 dark:border-blue-500/40 ring-1 ring-blue-500/20'
                      : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg ${
                          unlocked
                            ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                        }`}>
                          {isResume ? <Sparkles className="w-6 h-6" /> : <Zap className="w-6 h-6" />}
                        </div>
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                            {prod.badge || 'Aplicação Web'}
                          </span>
                          <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight">
                            {prod.name}
                          </h3>
                        </div>
                      </div>

                      {unlocked ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[11px] font-extrabold border border-emerald-200 dark:border-emerald-500/20 shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>✓ ACESSO LIBERADO</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 text-[11px] font-bold border border-slate-200 dark:border-slate-700/60 shrink-0">
                          <Lock className="w-3 h-3" />
                          <span>Não adquirido</span>
                        </span>
                      )}
                    </div>

                    {prod.image && !prod.image.endsWith('.svg') && (
                      <div className="w-full aspect-[21/9] rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-xs">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                      {prod.shortDescription}
                    </p>
                  </div>

                  <div className="pt-6 space-y-2.5 border-t border-slate-100 dark:border-slate-800/80 mt-6">
                    {unlocked ? (
                      <div className="space-y-2">
                        <a
                          href={targetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-5 py-3.5 rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-blue-500/20"
                        >
                          <span>{prod.accessButtonText || (isResume ? '🚀 ACESSAR GERADOR' : '🚀 ACESSAR FERRAMENTA')}</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>

                        <button
                          type="button"
                          onClick={() => setSelectedTutorialProduct(prod)}
                          className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold px-4 py-2.5 rounded-xl text-xs transition-colors"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Como utilizar (Passo a passo)</span>
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <button
                          type="button"
                          onClick={() => {
                            if (prod.checkoutUrl) {
                              openCheckout(prod.checkoutUrl);
                            } else {
                              onNavigate(`/produto/${prod.slug}`);
                            }
                          }}
                          className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-bold px-5 py-3 rounded-xl text-xs sm:text-sm transition-colors shadow-xs"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          <span>{prod.ctaText || 'Adquirir Acesso'}</span>
                        </button>

                        <div className="flex items-center justify-between gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => setSelectedTutorialProduct(prod)}
                            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 font-semibold"
                          >
                            <HelpCircle className="w-3.5 h-3.5" />
                            <span>Ver tutorial</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleQuickUnlock(prod.id)}
                            className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                            title="Liberar acesso manualmente caso já tenha adquirido"
                          >
                            Já comprou? Liberar acesso
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Security / Help banner */}
        <div className="bg-slate-50 dark:bg-[#121824] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Acesso vitalício e seguro</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Seus produtos ficam vinculados com segurança ao seu navegador e e-mail.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('/produtos')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs border border-slate-200 dark:border-slate-700 shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <span>Ver catálogo completo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
