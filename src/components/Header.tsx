import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { brand } from '../config/brand';
import { BrandLogo } from './BrandLogo';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export function Header({ currentPath, onNavigate }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(href);
  };

  const isActive = (href: string) => {
    if (href === '/' && currentPath === '/') return true;
    if (href !== '/' && currentPath.startsWith(href)) return true;
    return false;
  };

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-50 transition-all duration-200 pt-safe ${
        isScrolled
          ? 'bg-white/85 dark:bg-[#0b0f17]/85 backdrop-blur-md border-b border-slate-200/80 dark:border-white/10 shadow-sm'
          : 'bg-white dark:bg-[#0b0f17] border-b border-slate-200/50 dark:border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo / Brand Name */}
          <BrandLogo onClick={() => handleNavClick('/')} />

          {/* Desktop Navigation Links */}
          <nav id="desktop-navigation" className="hidden md:flex items-center space-x-1 lg:space-x-1.5">
            {brand.navigation.links.map((link) => {
              const active = isActive(link.href);
              return (
                <button
                  key={link.href}
                  id={`nav-link-${link.label.toLowerCase()}`}
                  type="button"
                  onClick={() => handleNavClick(link.href)}
                  className={`px-3 py-2 text-xs lg:text-sm font-semibold rounded-xl transition-all ${
                    active
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop Right Actions: Theme Toggle & CTA */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />

            <button
              id="header-cta-button"
              type="button"
              onClick={() => handleNavClick(brand.navigation.cta.href)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 text-xs sm:text-sm font-bold rounded-xl shadow-sm hover:shadow transition-all group"
            >
              <span>{brand.navigation.cta.label}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Right Controls: Theme Toggle & Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />

            <button
              id="mobile-menu-toggle"
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu de navegação'}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-rose-500" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="fixed inset-x-0 top-[65px] bottom-0 z-50 bg-white/95 dark:bg-[#0b0f17]/95 backdrop-blur-xl border-t border-slate-200 dark:border-white/10 px-4 pt-4 pb-12 flex flex-col justify-between shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 overflow-y-auto pb-safe"
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200 dark:border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Menu de Navegação
              </span>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 text-xs font-semibold"
              >
                <X className="w-4 h-4" />
                <span>Fechar</span>
              </button>
            </div>

            {brand.navigation.links.map((link) => {
              const active = isActive(link.href);
              return (
                <button
                  key={link.href}
                  id={`mobile-nav-${link.label.toLowerCase()}`}
                  type="button"
                  onClick={() => handleNavClick(link.href)}
                  className={`w-full text-left px-4 py-3.5 rounded-xl text-base font-semibold transition-colors flex items-center justify-between ${
                    active
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-bold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.category && (
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-md font-medium ${
                        active
                          ? 'bg-blue-100 dark:bg-blue-800/40 text-blue-700 dark:text-blue-300'
                          : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {link.category}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-6 space-y-4 border-t border-slate-200 dark:border-white/10">
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                Aparência Visual
              </span>
              <ThemeToggle compact />
            </div>

            <button
              id="mobile-nav-cta"
              type="button"
              onClick={() => handleNavClick(brand.navigation.cta.href)}
              className="w-full py-4 px-4 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold rounded-xl text-center flex items-center justify-center gap-2 shadow-md hover:opacity-90 transition-opacity"
            >
              <span>{brand.navigation.cta.label}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
