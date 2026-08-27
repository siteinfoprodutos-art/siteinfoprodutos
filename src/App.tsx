import { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LegalModal } from './components/LegalModal';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PurchaseSuccessPage } from './pages/PurchaseSuccessPage';
import { AccessPage } from './pages/AccessPage';
import { AccountPage } from './pages/AccountPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { FocoApp } from './pages/foco/FocoApp';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const [legalModalType, setLegalModalType] = useState<'termos' | 'privacidade' | null>(null);

  // Sync state with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (path.startsWith('http://') || path.startsWith('https://')) {
      window.open(path, '_blank', 'noopener,noreferrer');
      return;
    }

    try {
      window.history.pushState({}, '', path);
    } catch {
      // Fallback for sandboxed frames
    }

    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (slug: string) => {
    navigate(`/produto/${slug}`);
  };

  const handleSelectCategory = (categoryName: string) => {
    navigate(`/produtos?categoria=${encodeURIComponent(categoryName.toLowerCase())}`);
  };

  // Determine active view
  const renderView = () => {
    const cleanPath = currentPath.split('?')[0];

    // Route: /produto/:slug or /apps/:slug
    if (cleanPath.startsWith('/produto/') || cleanPath.startsWith('/apps/')) {
      const slug = cleanPath
        .replace('/produto/', '')
        .replace('/apps/', '')
        .replace(/\/$/, '');
      return (
        <ProductDetailPage
          slug={slug}
          onBack={() => navigate('/produtos')}
          onNavigate={navigate}
        />
      );
    }

    // Route: /produtos
    if (cleanPath === '/produtos') {
      const urlParams = new URLSearchParams(
        currentPath.includes('?') ? currentPath.split('?')[1] : window.location.search
      );
      const catParam = urlParams.get('categoria') || undefined;

      return (
        <ProductsPage
          initialCategory={catParam}
          onSelectProduct={handleSelectProduct}
        />
      );
    }

    // Route: /sobre
    if (cleanPath === '/sobre') {
      return <AboutPage onNavigate={navigate} />;
    }

    // Route: /contato
    if (cleanPath === '/contato') {
      return <ContactPage />;
    }

    if (cleanPath === '/compra-concluida') {
      return <PurchaseSuccessPage onNavigate={navigate} />;
    }

    if (cleanPath === '/acessar') {
      return <AccessPage onNavigate={navigate} />;
    }

    if (cleanPath === '/minha-conta') {
      return <AccountPage onNavigate={navigate} />;
    }

    if (cleanPath === '/app/foco' || cleanPath === '/foco') {
      return <FocoApp onBackToStore={() => navigate('/')} />;
    }

    if (cleanPath === '/' || cleanPath === '') {
      return (
        <HomePage
          onNavigate={navigate}
          onSelectProduct={handleSelectProduct}
          onSelectCategory={handleSelectCategory}
        />
      );
    }

    // Default fallback: 404 Not Found Page
    return <NotFoundPage onNavigate={navigate} />;
  };

  const cleanPath = currentPath.split('?')[0];
  const isStandaloneApp = cleanPath === '/app/foco' || cleanPath === '/foco';

  if (isStandaloneApp) {
    return <FocoApp onBackToStore={() => navigate('/')} />;
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-[var(--color-background)] text-[var(--color-text)] selection:bg-blue-600 selection:text-white transition-colors">
        {/* Central Header */}
        <Header currentPath={currentPath} onNavigate={navigate} />

        {/* Main Content Area */}
        <main className="flex-1">
          {renderView()}
        </main>

        {/* Central Footer */}
        <Footer
          onNavigate={navigate}
          onOpenLegal={(type) => setLegalModalType(type)}
        />

        {/* Legal & Privacy Modal */}
        <LegalModal
          isOpen={legalModalType !== null}
          type={legalModalType}
          onClose={() => setLegalModalType(null)}
        />
      </div>
    </ThemeProvider>
  );
}
