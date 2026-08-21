import { ArrowRight, Sparkles, CheckCircle2, Zap, Smartphone, HeartHandshake, Package } from 'lucide-react';
import { brand } from '../config/brand';
import { categories, products, getFeaturedProduct } from '../data/products';
import { formatPrice } from '../utils/formatters';
import { SEO } from '../components/SEO';
import { seoConfig } from '../config/seo';
import { ProductCard } from '../components/ProductCard';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onSelectProduct: (slug: string) => void;
  onSelectCategory: (categoryName: string) => void;
}

export function HomePage({ onNavigate, onSelectProduct, onSelectCategory }: HomePageProps) {
  const featuredProduct = getFeaturedProduct();

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': brand.name,
    'url': seoConfig.siteUrl,
    'description': 'Aplicativos, automações e ferramentas digitais criados para simplificar tarefas de pessoas, profissionais e pequenos negócios.'
  };

  return (
    <div id="home-page" className="pb-16">
      <SEO
        title="AL Studio Tech | Aplicativos e Ferramentas Digitais"
        description="Aplicativos, automações e ferramentas digitais criados para simplificar tarefas de pessoas, profissionais e pequenos negócios."
        canonical="/"
        jsonLd={organizationSchema}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-[minmax(180px,auto)]">
          
          {/* HERO: Col span 2, Row span 2 */}
          <div className="md:col-span-2 lg:col-span-2 lg:row-span-2 bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-[#121824] dark:via-[#0b0f17] dark:to-[#121824] border border-slate-200 dark:border-slate-800/80 rounded-3xl p-8 sm:p-10 flex flex-col justify-center relative overflow-hidden shadow-sm dark:shadow-none group transition-colors">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 space-y-6 sm:space-y-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-white/10 border border-blue-200 dark:border-white/10 text-xs font-bold text-blue-700 dark:text-slate-200 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span>AL Studio Tech • Soluções Diretas</span>
              </div>
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
                  Tecnologia simples para facilitar seu dia.
                </h1>
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-md">
                  Aplicativos, automações e ferramentas digitais criados para economizar tempo e tornar sua rotina mais eficiente.
                </p>
              </div>
              <button 
                type="button"
                onClick={() => onNavigate('/produtos')} 
                className="inline-flex w-max items-center justify-center gap-2 px-7 py-3.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-extrabold text-sm rounded-xl transition-all shadow-md hover:shadow-lg"
              >
                <span>Explorar catálogo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* FEATURED: Col span 2, Row span 1 */}
          {featuredProduct && (
            <div className="md:col-span-2 lg:col-span-2 lg:row-span-1 bg-blue-50/70 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-500/20 rounded-3xl p-6 sm:p-8 flex flex-col justify-center relative overflow-hidden transition-colors">
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-500/10 dark:bg-blue-600/20 rounded-full blur-2xl pointer-events-none" />
              <div className="relative z-10 flex items-start justify-between gap-4 mb-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-blue-600 text-white px-2.5 py-1 rounded-md shadow-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Produto em Destaque</span>
                </span>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300 bg-white/80 dark:bg-white/5 px-2.5 py-1 rounded-md border border-slate-200 dark:border-white/10">
                  {featuredProduct.category}
                </span>
              </div>
              <div className="relative z-10 space-y-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  {featuredProduct.name}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 max-w-md">
                  {featuredProduct.shortDescription}
                </p>
                <div className="pt-4 flex items-center justify-between border-t border-blue-200/60 dark:border-white/10 mt-2">
                  <span className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                    {formatPrice(featuredProduct.price)}
                  </span>
                  <button 
                    type="button"
                    onClick={() => onSelectProduct(featuredProduct.slug)} 
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors shadow-xs"
                  >
                    <span>Ver Detalhes</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* BENEFIT 1: Col span 1, Row span 1 */}
          <div className="md:col-span-1 lg:col-span-1 lg:row-span-1 bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg mb-1.5">Simples</h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Telas limpas e intuitivas que vão direto ao ponto sem complicações.
              </p>
            </div>
          </div>

          {/* BENEFIT 2: Col span 1, Row span 1 */}
          <div className="md:col-span-1 lg:col-span-1 lg:row-span-1 bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-6">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg mb-1.5">Prático</h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Ferramentas pensadas para seu uso real nos desafios diários.
              </p>
            </div>
          </div>

          {/* CATEGORIES: Col span 3, Row span 1 */}
          <div className="md:col-span-2 lg:col-span-3 lg:row-span-1 bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-center shadow-xs">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-1.5 lg:max-w-sm">
                <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">Soluções por categoria</h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Escolha o formato ideal para as necessidades da sua rotina.</p>
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {categories.map(cat => (
                  <button 
                    key={cat.id} 
                    type="button"
                    onClick={() => onSelectCategory(cat.name)} 
                    className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 transition-all shadow-2xs"
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* BENEFIT 3: Col span 1, Row span 1 */}
          <div className="md:col-span-1 lg:col-span-1 lg:row-span-1 bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg mb-1.5">Mobile First</h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Layouts responsivos e otimizados para qualquer tela ou smartphone.
              </p>
            </div>
          </div>

          {/* ABOUT: Col span 2, Row span 1 */}
          <div className="md:col-span-1 lg:col-span-2 lg:row-span-1 bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-center relative overflow-hidden shadow-xs">
            <div className="space-y-3 relative z-10">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <HeartHandshake className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Nossa Missão</span>
              </div>
              <h2 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
                {brand.presentation}
              </h2>
              <button 
                type="button"
                onClick={() => onNavigate('/sobre')} 
                className="text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1.5 transition-all pt-1"
              >
                <span>Conhecer a {brand.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* CTA: Col span 2, Row span 1 */}
          <div className="md:col-span-1 lg:col-span-2 lg:row-span-1 bg-slate-900 dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center text-center shadow-md overflow-hidden relative text-white">
            <div className="relative z-10 space-y-3">
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">Pronto para começar?</h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Explore nossas ferramentas digitais e encontre a solução perfeita para simplificar sua rotina.
              </p>
              <button 
                type="button"
                onClick={() => onNavigate('/produtos')} 
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-950 font-extrabold text-xs sm:text-sm rounded-xl hover:bg-slate-100 transition-all shadow-md"
              >
                <span>Ver todos os produtos</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* SECTION: Conheça nossos aplicativos */}
        <div id="home-featured-apps-section" className="mt-12 sm:mt-16 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-5">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                <Package className="w-4 h-4" />
                <span>Soluções Práticas</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Conheça nossos aplicativos
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
                Ferramentas digitais projetadas para simplificar a gestão, organização e vendas da sua empresa ou carreira.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/produtos')}
              className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors whitespace-nowrap"
            >
              <span>Ver catálogo completo ({products.filter(p => p.active).length})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.filter(p => p.active).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
