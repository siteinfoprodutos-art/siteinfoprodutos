import { Mail, Instagram, MessageCircle } from 'lucide-react';
import { brand } from '../config/brand';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenLegal: (type: 'termos' | 'privacidade') => void;
}

export function Footer({ onNavigate, onOpenLegal }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="main-footer"
      className="bg-slate-100 dark:bg-[#0d121c] text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800/80 mt-auto transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-slate-200 dark:border-slate-800/80">
          {/* Brand Info Column */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo onClick={() => onNavigate('/')} />
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              {brand.description}
            </p>
            <div className="pt-2 flex items-center gap-2.5">
              <a
                id="footer-social-whatsapp"
                href={brand.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors shadow-2xs"
                aria-label="WhatsApp AL Studio Tech"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                id="footer-social-instagram"
                href={brand.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 hover:bg-pink-600 hover:text-white dark:hover:bg-pink-600 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors shadow-2xs"
                aria-label="Instagram AL Studio Tech"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                id="footer-social-email"
                href={`mailto:${brand.contact.email}`}
                className="w-9 h-9 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors shadow-2xs"
                aria-label="Email AL Studio Tech"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Categorias Column */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Categorias
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/produtos?categoria=aplicativos')}
                  className="hover:text-blue-600 dark:hover:text-white transition-colors"
                >
                  Aplicativos
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/produtos?categoria=planilhas')}
                  className="hover:text-blue-600 dark:hover:text-white transition-colors"
                >
                  Planilhas
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/produtos?categoria=automacoes')}
                  className="hover:text-blue-600 dark:hover:text-white transition-colors"
                >
                  Automações
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/produtos?categoria=kits')}
                  className="hover:text-blue-600 dark:hover:text-white transition-colors"
                >
                  Kits Completo
                </button>
              </li>
            </ul>
          </div>

          {/* Empresa Column */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Empresa
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/sobre')}
                  className="hover:text-blue-600 dark:hover:text-white transition-colors"
                >
                  Sobre a AL Studio Tech
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/contato')}
                  className="hover:text-blue-600 dark:hover:text-white transition-colors"
                >
                  Contato & Suporte
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Legal
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('termos')}
                  className="hover:text-blue-600 dark:hover:text-white transition-colors text-left"
                >
                  Termos de Uso
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('privacidade')}
                  className="hover:text-blue-600 dark:hover:text-white transition-colors text-left"
                >
                  Política de Privacidade
                </button>
              </li>
              <li className="pt-2 text-xs text-slate-500">
                <span>{brand.contact.email}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4">
          <p>© {currentYear} {brand.name}. Todos os direitos reservados.</p>
          <div className="flex items-center gap-2">
            <span>{brand.slogan}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
