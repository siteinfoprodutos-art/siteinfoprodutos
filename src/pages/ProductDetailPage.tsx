import { useState } from 'react';
import {
  ArrowLeft, CheckCircle2, ShieldCheck,
  Zap, Smartphone, Layers, ChevronDown, Monitor,
  FileText, Plus, Search, Check, FileDown, Printer, MessageCircle,
  Palette, Layout, SunMoon, X, PackageOpen, Share2
} from 'lucide-react';
import { getProductBySlug, products } from '../data/products';
import { PurchaseBlock } from '../components/PurchaseBlock';
import { ProductCard } from '../components/ProductCard';
import { ProductMockup } from '../components/ProductMockup';
import { SEO } from '../components/SEO';
import { seoConfig } from '../config/seo';
import { NotFoundPage } from './NotFoundPage';

interface ProductDetailPageProps {
  slug: string;
  onBack: () => void;
  onNavigate: (path: string) => void;
}

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 dark:border-slate-800 last:border-0">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-left focus:outline-none"
      >
        <span className="font-bold text-slate-900 dark:text-white text-base">{question}</span>
        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
};

export function ProductDetailPage({ slug, onBack, onNavigate }: ProductDetailPageProps) {
  const product = getProductBySlug(slug);
  const [copied, setCopied] = useState(false);

  if (!product) {
    return <NotFoundPage onNavigate={onNavigate} />;
  }

  const relatedProducts = products.filter(
    p => p.id !== product.id && p.active && p.category === product.category
  ).slice(0, 3);

  const productUrl = `${seoConfig.siteUrl}/produto/${product.slug}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.shortDescription,
          url: productUrl,
        });
        return;
      } catch {
        // Fallback to clipboard if share was cancelled or failed
      }
    }

    try {
      await navigator.clipboard.writeText(productUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Ignore
    }
  };

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': product.name,
    'description': product.description || product.shortDescription,
    'image': product.image.startsWith('http') ? product.image : `${seoConfig.siteUrl}${product.image}`,
    'offers': {
      '@type': 'Offer',
      'price': product.price.toFixed(2),
      'priceCurrency': 'BRL',
      'availability': 'https://schema.org/InStock',
      'url': productUrl
    }
  };

  return (
    <div className="pb-24 bg-[var(--color-background)] selection:bg-blue-600 selection:text-white relative transition-colors">
      <SEO
        title={product.seoTitle || product.name}
        description={product.seoDescription || product.shortDescription}
        image={product.seoImage || product.image}
        canonical={`/produto/${product.slug}`}
        type="product"
        jsonLd={productSchema}
      />

      {/* Mobile Sticky CTA */}
      <PurchaseBlock product={product} variant="mobile" />

      {/* Top Nav Breadcrumb & Share */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Voltar para produtos</span>
        </button>

        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-semibold transition-all shadow-2xs"
          title="Compartilhar produto"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">Link copiado!</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5" />
              <span>Compartilhar</span>
            </>
          )}
        </button>
      </div>

      {/* 1. HERO - Bento Grid Style */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          <div className="bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-[#121824] dark:via-[#0b0f17] dark:to-[#121824] border border-slate-200 dark:border-slate-800/80 rounded-3xl p-8 sm:p-12 flex flex-col justify-center relative overflow-hidden shadow-xs">
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 space-y-6 sm:space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-white/10 border border-blue-200 dark:border-white/10 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-xs font-bold text-blue-700 dark:text-slate-200">Aplicativo • Destaque</span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
                Orçamentos profissionais em poucos minutos.
              </h1>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                Crie, organize e envie orçamentos profissionais diretamente pelo celular ou computador.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-end gap-6 w-full">
                <PurchaseBlock product={product} variant="hero" />
                <a
                  href="#como-funciona"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-900 dark:text-white font-bold rounded-xl border border-slate-200 dark:border-white/10 shadow-2xs transition-all h-[52px] w-full sm:w-auto"
                >
                  Ver como funciona
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 flex items-center justify-center relative overflow-hidden shadow-xs">
            <div className="relative z-10 w-full max-w-md mx-auto">
              <ProductMockup compact={false} />
            </div>
          </div>
        </div>
      </section>

      {/* 2. DESTAQUES RÁPIDOS */}
      <section className="bg-slate-100/80 dark:bg-white/5 border-y border-slate-200 dark:border-slate-800/80 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Compra única</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Sem mensalidade</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Fácil de usar</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Funciona no celular e computador</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Dados locais protegidos</div>
          </div>
        </div>
      </section>

      {/* 3. PROBLEMA - Bento Cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 text-center space-y-16">
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Pare de montar orçamentos do zero.
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Organizar valores, clientes e serviços não precisa tomar seu tempo. O Gerador foi criado para tornar esse processo simples e prático.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-white dark:bg-[#121824] p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-4">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Mais organização</h3>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
              Mantenha seus orçamentos em um único lugar, sempre acessíveis.
            </p>
          </div>
          <div className="bg-white dark:bg-[#121824] p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Mais agilidade</h3>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
              Crie novos orçamentos rapidamente a partir do celular ou computador.
            </p>
          </div>
          <div className="bg-white dark:bg-[#121824] p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="w-12 h-12 bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Profissionalismo</h3>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
              Apresente seus serviços e produtos de maneira organizada para o cliente.
            </p>
          </div>
        </div>
      </section>

      {/* 4. COMO FUNCIONA */}
      <section id="como-funciona" className="bg-slate-100/60 dark:bg-[#121824] py-20 sm:py-24 border-y border-slate-200 dark:border-slate-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Do orçamento ao cliente em poucos passos.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {[
              { num: "01", title: "Cadastre o cliente", desc: "Informe os dados necessários do cliente para o orçamento." },
              { num: "02", title: "Adicione itens", desc: "Escolha itens do segmento ou adicione personalizados." },
              { num: "03", title: "Gere o orçamento", desc: "O aplicativo calcula os valores e prepara o documento." },
              { num: "04", title: "Compartilhe", desc: "Gere o PDF ou prepare o envio direto pelo WhatsApp." }
            ].map((step, idx) => (
              <div key={idx} className="relative z-10 space-y-4 text-center md:text-left bg-white dark:bg-[#0b0f17] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
                <div className="w-16 h-16 mx-auto md:mx-0 bg-blue-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center border border-blue-200 dark:border-slate-700 text-xl font-black text-blue-600 dark:text-blue-400">
                  {step.num}
                </div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg">{step.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FUNCIONALIDADES - Bento Grid */}
      <section className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Tudo o que você precisa.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <FileText className="w-5 h-5" />, title: "Propostas claras", desc: "Crie propostas organizadas com informações do cliente, itens, e valores." },
              { icon: <Layers className="w-5 h-5" />, title: "Múltiplos itens", desc: "Adicione quantos produtos ou serviços forem necessários." },
              { icon: <Search className="w-5 h-5" />, title: "Catálogo inteligente", desc: "Sugestões de itens de acordo com a área de atuação." },
              { icon: <Plus className="w-5 h-5" />, title: "Customização total", desc: "Adicione qualquer produto ou serviço manualmente." },
              { icon: <Zap className="w-5 h-5" />, title: "Cálculos precisos", desc: "Subtotal, descontos e valor final são automáticos." },
              { icon: <FileDown className="w-5 h-5" />, title: "Geração de PDF", desc: "Exporte um PDF bonito, pronto para o cliente." },
              { icon: <Printer className="w-5 h-5" />, title: "Modo Impressão", desc: "Versão otimizada e limpa para enviar para a impressora." },
              { icon: <MessageCircle className="w-5 h-5" />, title: "Integração WhatsApp", desc: "Envie um resumo do orçamento direto para o WhatsApp do cliente." },
              { icon: <CheckCircle2 className="w-5 h-5" />, title: "Histórico", desc: "Mantenha seus orçamentos salvos para consultas futuras." }
            ].map((feat, idx) => (
              <div key={idx} className="bg-white dark:bg-[#121824] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col gap-3">
                <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-xl flex items-center justify-center text-slate-700 dark:text-slate-300">
                  {feat.icon}
                </div>
                <div>
                  <h4 className="font-extrabold text-base text-slate-900 dark:text-white mb-1">{feat.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bento specific larger cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
            <div className="lg:col-span-1 bg-white dark:bg-[#121824] p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center">
                <Layout className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-lg text-slate-900 dark:text-white">A sua Empresa</h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Configure nome, logo, telefone, WhatsApp, e-mail e Instagram para aparecerem no documento final.
              </p>
            </div>
            <div className="lg:col-span-1 bg-white dark:bg-[#121824] p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center">
                <Palette className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-lg text-slate-900 dark:text-white">Cores e Logo</h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                A identidade visual reflete nos PDFs e telas, transmitindo credibilidade imediata.
              </p>
            </div>
            <div className="lg:col-span-1 bg-white dark:bg-[#121824] p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <div className="w-12 h-12 bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center">
                <SunMoon className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-lg text-slate-900 dark:text-white">Modo Noturno</h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                A interface da ferramenta suporta tema claro ou escuro para se adaptar à sua preferência.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SEGMENTOS */}
      <section className="py-20 sm:py-24 border-y border-slate-200 dark:border-slate-800/80 bg-slate-100/60 dark:bg-[#121824]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Feito para diferentes negócios.
          </h2>
          <div className="flex flex-wrap justify-center gap-2.5 max-w-5xl mx-auto">
            {["Padarias", "Confeitarias", "Salões", "Barbearias", "Eletricistas", "Encanadores", "Mecânicos", "Fotógrafos", "Designers", "Prestadores de serviços", "Autônomos"].map(seg => (
              <span key={seg} className="px-4 py-2 bg-white dark:bg-[#0b0f17] border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-semibold rounded-full text-xs sm:text-sm shadow-2xs">
                {seg}
              </span>
            ))}
            <span className="px-4 py-2 bg-blue-600 text-white font-bold rounded-full text-xs sm:text-sm shadow-xs">
              E muito mais...
            </span>
          </div>
        </div>
      </section>

      {/* O QUE VOCÊ RECEBE & COMO RECEBO */}
      <section className="py-20 sm:py-24 border-b border-slate-200 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            <div className="space-y-6">
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">O que você recebe</h3>
              <ul className="space-y-3.5">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5"><Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /></div>
                  <span className="text-slate-700 dark:text-slate-300 font-medium text-xs sm:text-sm leading-relaxed">Acesso integral ao aplicativo ou ferramenta</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5"><Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /></div>
                  <span className="text-slate-700 dark:text-slate-300 font-medium text-xs sm:text-sm leading-relaxed">Todos os recursos descritos nesta página</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5"><Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /></div>
                  <span className="text-slate-700 dark:text-slate-300 font-medium text-xs sm:text-sm leading-relaxed">Atualizações da versão adquirida, quando disponibilizadas</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5"><Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /></div>
                  <span className="text-slate-700 dark:text-slate-300 font-medium text-xs sm:text-sm leading-relaxed">Instruções iniciais de uso</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-[#121824] p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-center">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-4">
                <PackageOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Como recebo o produto?</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium text-xs sm:text-sm">
                Após a confirmação do pagamento, você receberá as instruções de acesso e utilização do produto de forma segura e imediata.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. MOBILE FIRST */}
      <section className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="space-y-3 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Comece onde você estiver.
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-lg leading-relaxed">
              A interface adapta-se perfeitamente ao seu celular ou computador.
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-16 pt-4">
            <div className="w-72 h-[480px] bg-slate-100 dark:bg-[#121824] rounded-[2.5rem] border-[8px] border-slate-300 dark:border-slate-800 shadow-xl relative overflow-hidden flex items-center justify-center">
              <div className="text-slate-400 dark:text-slate-500 font-bold flex flex-col items-center gap-3">
                <Smartphone className="w-10 h-10" />
                <span>Visual Mobile</span>
              </div>
            </div>
            <div className="w-full max-w-2xl h-[380px] bg-slate-100 dark:bg-[#121824] rounded-2xl border-[8px] border-slate-300 dark:border-slate-800 shadow-xl relative overflow-hidden hidden md:flex items-center justify-center">
              <div className="text-slate-400 dark:text-slate-500 font-bold flex flex-col items-center gap-3">
                <Monitor className="w-10 h-10" />
                <span>Visual Desktop</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. PRIVACIDADE */}
      <section className="py-16 bg-slate-100/60 dark:bg-[#121824] border-y border-slate-200 dark:border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <ShieldCheck className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto" />
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Dados 100% no seu dispositivo.</h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            Esta ferramenta utiliza armazenamento local do navegador e não envia seus orçamentos para nossos servidores.
          </p>
        </div>
      </section>

      {/* 11. COMPARAÇÃO VISUAL */}
      <section className="py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 text-center">
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Menos improviso. Mais organização.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 text-left">
            <div className="bg-white dark:bg-[#121824] p-8 sm:p-10 rounded-3xl border border-rose-200 dark:border-rose-500/20 shadow-xs relative overflow-hidden">
              <h3 className="font-black text-xl text-rose-600 dark:text-rose-400 mb-6 tracking-tight">ANTES</h3>
              <ul className="space-y-4">
                {["Anotações espalhadas", "Cálculos manuais cansativos", "Orçamentos inconsistentes", "Informações desorganizadas"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-semibold text-xs sm:text-sm">
                    <div className="w-7 h-7 rounded-full bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center shrink-0"><X className="w-4 h-4 text-rose-600 dark:text-rose-400" /></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white dark:bg-[#121824] p-8 sm:p-10 rounded-3xl border border-emerald-200 dark:border-emerald-500/20 shadow-xs relative overflow-hidden">
              <h3 className="font-black text-xl text-emerald-600 dark:text-emerald-400 mb-6 tracking-tight">COM O APLICATIVO</h3>
              <ul className="space-y-4">
                {["Orçamentos padronizados", "Cálculos totalmente automáticos", "Visual incrivelmente profissional", "Geração de PDF limpo"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-900 dark:text-white font-semibold text-xs sm:text-sm">
                    <div className="w-7 h-7 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center shrink-0"><CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 dark:text-emerald-400" /></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 12. FAQ */}
      <section className="py-20 sm:py-24 bg-slate-100/60 dark:bg-[#121824] border-y border-slate-200 dark:border-slate-800/80">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight text-center">
            Perguntas frequentes
          </h2>
          <div className="border-t border-slate-200 dark:border-slate-800">
            <FAQItem question="Como é feito o pagamento?" answer="O pagamento é processado pela Kiwify através do checkout do produto." />
            <FAQItem question="Como recebo o acesso?" answer="Após a confirmação da compra, você receberá as instruções de acesso disponibilizadas pela Kiwify." />
            <FAQItem question="Preciso criar uma conta na AL Studio Tech?" answer="Não nesta versão. O acesso inicial será realizado conforme as instruções fornecidas após a compra." />
            <FAQItem question="Funciona no celular?" answer="Sim. A interface foi desenvolvida focada no uso via smartphone, mas funciona muito bem em desktops." />
            <FAQItem question="Existe mensalidade?" answer="Não para o Gerador de Orçamentos Profissionais. Ele é vendido como compra única." />
            <FAQItem question="Meus dados ficam na nuvem?" answer="Não, seus orçamentos e cadastros ficam salvos com segurança no cache (armazenamento local) do seu próprio dispositivo/navegador." />
            <FAQItem question="O PDF é enviado sozinho pelo WhatsApp?" answer="O aplicativo gera um PDF e também prepara um texto formatado para o WhatsApp, facilitando enormemente o envio." />
          </div>
        </div>
      </section>

      {/* 13. CTA FINAL */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-900 to-slate-950 dark:from-[#121824] dark:to-[#0b0f17] border border-slate-800 rounded-3xl p-8 sm:p-14 text-center relative overflow-hidden shadow-xl text-white">
          <div className="relative z-10 space-y-8">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Pronto para profissionalizar <br className="hidden sm:block" /> seus orçamentos?
            </h2>
            <PurchaseBlock product={product} variant="bottom" />
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="py-20 sm:py-24 border-t border-slate-200 dark:border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-2">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                Você também pode gostar
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Outras ferramentas que podem ajudar na sua rotina.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {relatedProducts.map(relProduct => (
                <ProductCard
                  key={relProduct.id}
                  product={relProduct}
                  onSelect={(s) => {
                    onNavigate('/produto/' + s);
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
