import { X, ShieldCheck, FileText } from 'lucide-react';
import { brand } from '../config/brand';

interface LegalModalProps {
  isOpen: boolean;
  type: 'termos' | 'privacidade' | null;
  onClose: () => void;
}

export function LegalModal({ isOpen, type, onClose }: LegalModalProps) {
  if (!isOpen || !type) return null;

  const isTerms = type === 'termos';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        id="legal-modal-container"
        className="bg-white dark:bg-[#121824] rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors"
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-slate-50 dark:bg-[#0b0f17] border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-200/80 dark:bg-slate-800 text-slate-800 dark:text-white flex items-center justify-center border border-slate-300/80 dark:border-slate-700">
              {isTerms ? <FileText className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
            </div>
            <div>
              <h2 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                {isTerms ? 'Termos de Uso' : 'Política de Privacidade'}
              </h2>
              <span className="text-xs text-slate-500 dark:text-slate-400">{brand.name} • Atualizado em 2026</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed scrollbar-thin">
          {isTerms ? (
            <>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">1. Visão Geral</h3>
              <p>
                Bem-vindo à <strong className="text-slate-900 dark:text-white">{brand.name}</strong>. Ao acessar nossa vitrine digital e adquirir
                nossos aplicativos, planilhas e ferramentas digitais, você concorda com estes Termos de Uso.
              </p>

              <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">2. Licença e Uso dos Produtos</h3>
              <p>
                Cada aplicativo ou produto digital adquirido concede ao comprador uma licença individual
                de uso. Nossos aplicativos são mantidos em repositórios e ambientes independentes.
                É proibida a revenda não autorizada, redistribuição do código-fonte ou engenharia reversa.
              </p>

              <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">3. Suporte e Atualizações</h3>
              <p>
                Disponibilizamos suporte e esclarecimentos através de nossos canais oficiais
                ({brand.contact.email} e WhatsApp {brand.contact.whatsappFormatted}).
              </p>

              <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">4. Isenção de Responsabilidade</h3>
              <p>
                Nossos produtos são desenvolvidos com rigor técnico para simplificar rotinas. Não nos
                responsabilizamos por má utilização de dados inseridos pelos próprios usuários.
              </p>
            </>
          ) : (
            <>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">1. Compromisso com a Privacidade</h3>
              <p>
                A <strong className="text-slate-900 dark:text-white">{brand.name}</strong> valoriza a simplicidade e a proteção de dados.
                Esta política detalha como tratamos informações em nossa vitrine e em nossos produtos.
              </p>

              <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">2. Coleta de Informações</h3>
              <p>
                Não realizamos rastreamento invasivo. As informações fornecidas voluntariamente ao entrar
                em contato conosco (como e-mail ou mensagens no WhatsApp) são utilizadas exclusivamente
                para atendimento ao cliente e suporte técnico.
              </p>

              <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">3. Armazenamento e Segurança</h3>
              <p>
                Nossos aplicativos priorizam arquitetura leve e armazenamento local (no dispositivo do usuário)
                sempre que aplicável, garantindo privacidade e controle total dos seus dados.
              </p>

              <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">4. Contato</h3>
              <p>
                Para dúvidas sobre privacidade, entre em contato pelo e-mail{' '}
                <a href={`mailto:${brand.contact.email}`} className="text-blue-600 dark:text-blue-400 underline font-medium">
                  {brand.contact.email}
                </a>.
              </p>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 dark:bg-[#0b0f17] border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 text-xs font-bold rounded-xl transition-colors shadow-xs"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
