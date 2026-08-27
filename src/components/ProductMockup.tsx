import { FileText, Send, CheckCircle, Smartphone, Sparkles, Download, User, Briefcase, GraduationCap, Award } from 'lucide-react';

interface ProductMockupProps {
  compact?: boolean;
  productId?: string;
}

export function ProductMockup({ compact = false, productId = 'gerador-orcamentos' }: ProductMockupProps) {
  const isCurriculo = productId === 'gerador-curriculo' || productId === 'gerador-de-curriculo-profissional';
  const isGestao = productId === 'al-studio-gestao';
  const isAgenda = productId === 'al-studio-agenda';
  const isKitPequenoNegocio = productId === 'kit-pequeno-negocio';
  const isFoco = productId === 'al-studio-foco';

  if (isFoco) {
    return (
      <div
        id="product-mockup-foco-wrapper"
        className={`relative w-full rounded-3xl bg-gradient-to-br from-indigo-950 via-[#0b0f17] to-slate-950 p-2 sm:p-3 shadow-2xl border border-indigo-500/40 overflow-hidden ${
          compact ? 'max-w-md' : 'max-w-2xl mx-auto'
        }`}
      >
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-500/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative rounded-2xl bg-[#070b12] border border-indigo-500/30 shadow-2xl overflow-hidden group">
          <img
            src="/assets/al-studio-foco-preview.svg"
            alt="AL Studio Foco - Aplicativo de Estudos e Pomodoro"
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-auto object-cover transform group-hover:scale-[1.01] transition-transform duration-300 rounded-xl"
          />
        </div>
      </div>
    );
  }

  if (isKitPequenoNegocio) {
    return (
      <div
        id="product-mockup-kit-pequeno-negocio-wrapper"
        className={`relative w-full rounded-2xl bg-gradient-to-br from-slate-900 via-[#0b0f17] to-slate-950 p-2 sm:p-3 shadow-2xl border border-slate-700/60 overflow-hidden ${
          compact ? 'max-w-md' : 'max-w-2xl mx-auto'
        }`}
      >
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative rounded-xl bg-[#070b12] border border-slate-700/70 shadow-2xl overflow-hidden group">
          <img
            src="/assets/kit-pequeno-negocio-preview.svg"
            alt="Kit Pequeno Negócio - Prévia das Ferramentas Integradas"
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-auto object-cover transform group-hover:scale-[1.01] transition-transform duration-300 rounded-lg"
          />
        </div>
      </div>
    );
  }

  if (isCurriculo) {
    return (
      <div
        id="product-mockup-curriculo-wrapper"
        className={`relative w-full rounded-2xl bg-gradient-to-br from-slate-900 via-[#0b0f17] to-slate-950 p-2 sm:p-3 shadow-2xl border border-slate-700/60 overflow-hidden ${
          compact ? 'max-w-md' : 'max-w-2xl mx-auto'
        }`}
      >
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative rounded-xl bg-[#070b12] border border-slate-700/70 shadow-2xl overflow-hidden group">
          <img
            src="/assets/gerador-curriculo-preview.svg"
            alt="Gerador de Currículo Profissional - Prévia da Interface"
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-auto object-cover transform group-hover:scale-[1.01] transition-transform duration-300 rounded-lg"
          />
        </div>
      </div>
    );
  }

  if (isGestao) {
    return (
      <div
        id="product-mockup-gestao-wrapper"
        className={`relative w-full rounded-2xl bg-gradient-to-br from-slate-900 via-[#0b0f17] to-slate-950 p-2 sm:p-3 shadow-2xl border border-slate-700/60 overflow-hidden ${
          compact ? 'max-w-md' : 'max-w-2xl mx-auto'
        }`}
      >
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative rounded-xl bg-[#070b12] border border-slate-700/70 shadow-2xl overflow-hidden group">
          <img
            src="/assets/al-studio-gestao-preview.svg"
            alt="AL Studio Gestão - Interface Vendas & Estoque"
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-auto object-cover transform group-hover:scale-[1.01] transition-transform duration-300 rounded-lg"
          />
        </div>
      </div>
    );
  }

  if (isAgenda) {
    return (
      <div
        id="product-mockup-agenda-wrapper"
        className={`relative w-full rounded-2xl bg-gradient-to-br from-slate-900 via-[#0b0f17] to-slate-950 p-2 sm:p-3 shadow-2xl border border-slate-700/60 overflow-hidden ${
          compact ? 'max-w-md' : 'max-w-2xl mx-auto'
        }`}
      >
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative rounded-xl bg-[#070b12] border border-slate-700/70 shadow-2xl overflow-hidden group">
          <img
            src="/assets/al-studio-agenda-preview.svg"
            alt="AL Studio Agenda - Agendamentos & Clientes"
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-auto object-cover transform group-hover:scale-[1.01] transition-transform duration-300 rounded-lg"
          />
        </div>
      </div>
    );
  }

  // Default: Quote Generator Mockup
  return (
    <div
      id="product-mockup-wrapper"
      className={`relative w-full rounded-2xl bg-gradient-to-br from-slate-100 via-white to-slate-100 dark:from-[#121824] dark:via-[#0b0f17] dark:to-[#121824] p-3 sm:p-5 shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden ${
        compact ? 'max-w-md' : 'max-w-2xl mx-auto'
      }`}
    >
      {/* Background radial glow */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-500/10 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* App Window Chrome */}
      <div className="relative rounded-xl bg-white dark:bg-[#0b0f17] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
        {/* Top title bar */}
        <div className="bg-slate-100 dark:bg-[#121824] px-4 py-2.5 flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/90 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/90 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/90 inline-block" />
          </div>
          <div className="flex items-center space-x-1.5 text-xs text-slate-700 dark:text-slate-300 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>AL Studio Tech • Gerador de Orçamentos</span>
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded font-semibold">
            v1.0
          </div>
        </div>

        {/* Interior layout */}
        <div className="p-3 sm:p-4 grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 bg-slate-50 dark:bg-[#0b0f17]">
          {/* Left panel: Quick form */}
          <div className="md:col-span-6 bg-white dark:bg-[#121824] p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  Nova Proposta
                </span>
                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-500/20">
                  Em edição
                </span>
              </div>

              {/* Client field */}
              <div className="mt-2.5 space-y-2">
                <div className="bg-slate-50 dark:bg-[#0b0f17] p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">Cliente</span>
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    Mariana Souza • Clínica Vitalle
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center bg-slate-50 dark:bg-[#0b0f17] p-2 rounded-lg text-xs border border-slate-200 dark:border-slate-800">
                    <div>
                      <div className="font-semibold text-slate-800 dark:text-slate-200 text-[11px]">
                        Diagnóstico & Planejamento
                      </div>
                      <div className="text-[10px] text-slate-500">1 un • R$ 450,00</div>
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white text-xs">R$ 450,00</span>
                  </div>

                  <div className="flex justify-between items-center bg-slate-50 dark:bg-[#0b0f17] p-2 rounded-lg text-xs border border-slate-200 dark:border-slate-800">
                    <div>
                      <div className="font-semibold text-slate-800 dark:text-slate-200 text-[11px]">
                        Implementação Digital
                      </div>
                      <div className="text-[10px] text-slate-500">2 etapas • R$ 600,00</div>
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white text-xs">R$ 1.200,00</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-1">
              <div className="w-full py-1.5 bg-blue-50 dark:bg-blue-500/10 hover:bg-blue-100 dark:hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 font-bold text-xs rounded-lg border border-blue-200 dark:border-blue-500/20 text-center flex items-center justify-center gap-1 transition-colors">
                <Sparkles className="w-3 h-3" />
                <span>+ Adicionar Serviço</span>
              </div>
            </div>
          </div>

          {/* Right panel: Live Document Preview */}
          <div className="md:col-span-6 bg-white dark:bg-[#121824] p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-2.5">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded bg-slate-900 dark:bg-white text-white dark:text-slate-950 flex items-center justify-center text-[10px] font-black">
                    AL
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-900 dark:text-white leading-none">
                      Orçamento #2026-084
                    </div>
                    <div className="text-[9px] text-slate-500 dark:text-slate-400">Pronto para envio</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-500/20">
                  <CheckCircle className="w-3 h-3 text-emerald-500" />
                  <span>Formatado</span>
                </div>
              </div>

              {/* Total Calculation Card */}
              <div className="mt-2.5 bg-slate-50 dark:bg-slate-800/40 text-slate-900 dark:text-white p-2.5 rounded-lg border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400">
                  <span>Subtotal:</span>
                  <span>R$ 1.650,00</span>
                </div>
                <div className="flex justify-between text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                  <span>Desconto à vista (5%):</span>
                  <span>- R$ 82,50</span>
                </div>
                <div className="pt-1.5 border-t border-slate-200 dark:border-slate-700/60 flex justify-between items-baseline">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200">VALOR TOTAL:</span>
                  <span className="text-sm font-black text-blue-600 dark:text-blue-400 tracking-tight">
                    R$ 1.567,50
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-1.5">
              <div className="w-full py-2 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 shadow-xs">
                <Send className="w-3.5 h-3.5" />
                <span>Enviar pelo WhatsApp</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                <div className="py-1 bg-slate-50 dark:bg-[#0b0f17] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-semibold rounded text-center flex items-center justify-center gap-1">
                  <Download className="w-3 h-3 text-slate-400" />
                  PDF Gerado
                </div>
                <div className="py-1 bg-slate-50 dark:bg-[#0b0f17] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-semibold rounded text-center flex items-center justify-center gap-1">
                  <Smartphone className="w-3 h-3 text-slate-400" />
                  Mobile OK
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

