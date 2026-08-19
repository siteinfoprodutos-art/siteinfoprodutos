import { X, CheckCircle2, ExternalLink, Sparkles, BookOpen } from 'lucide-react';
import { Product } from '../types';

interface TutorialModalProps {
  isOpen: boolean;
  product: Product | null;
  onClose: () => void;
  onOpenApp?: () => void;
}

export function TutorialModal({ isOpen, product, onClose, onOpenApp }: TutorialModalProps) {
  if (!isOpen || !product) return null;

  const defaultSteps = [
    { step: 1, title: "Acesse o gerador", description: "Clique no botão de acesso liberado na sua área de membros." },
    { step: 2, title: "Preencha seus dados", description: "Insira suas informações principais nos campos indicados." },
    { step: 3, title: "Adicione os detalhes", description: "Complete os campos com todas as informações necessárias." },
    { step: 4, title: "Configure preferências", description: "Ajuste opções de layout, estilo ou campos adicionais." },
    { step: 5, title: "Revise as informações", description: "Confira a pré-visualização em tempo real na tela." },
    { step: 6, title: "Gere seu documento", description: "O sistema processa e organiza os dados automaticamente." },
    { step: 7, title: "Salve ou utilize o resultado", description: "Exporte em PDF ou compartilhe diretamente." },
  ];

  const steps = product.tutorialSteps && product.tutorialSteps.length > 0
    ? product.tutorialSteps
    : defaultSteps;

  return (
    <div
      id="tutorial-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="tutorial-modal-card"
        className="relative w-full max-w-xl bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-200 dark:border-blue-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                Guia Rápido de Uso
              </span>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-tight">
                Como utilizar: {product.name}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Fechar tutorial"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps List */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-3.5 custom-scrollbar">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-[#0b0f17] border border-slate-200/80 dark:border-slate-800 transition-all hover:border-blue-300 dark:hover:border-blue-800/60"
            >
              <div className="w-7 h-7 rounded-xl bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                {s.step || idx + 1}
              </div>
              <div className="space-y-0.5 flex-1">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span>{s.title}</span>
                </h3>
                {s.description && (
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {s.description}
                  </p>
                )}
              </div>
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span>Ferramenta otimizada para celular e computador.</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl transition-colors"
            >
              Fechar
            </button>
            {onOpenApp && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenApp();
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
              >
                <span>Acessar agora</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
