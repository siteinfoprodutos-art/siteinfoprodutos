import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Zap, 
  BarChart3, 
  Rocket, 
  Bot, 
  FileSpreadsheet, 
  Package, 
  ShieldCheck, 
  Clock, 
  Cpu, 
  ChevronRight, 
  MessageSquare,
  Wrench,
  BadgePercent,
  Flame
} from 'lucide-react';
import { brand } from '../config/brand';
import { products, getFeaturedProduct } from '../data/products';
import { formatPrice } from '../utils/formatters';
import { SEO } from '../components/SEO';
import { seoConfig } from '../config/seo';
import { ProductCard } from '../components/ProductCard';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onSelectProduct: (slug: string) => void;
  onSelectCategory: (categoryName: string) => void;
}

export function HomePage({ onNavigate, onSelectProduct }: HomePageProps) {
  const featuredProduct = getFeaturedProduct();

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': brand.name,
    'url': seoConfig.siteUrl,
    'description': 'Encontre aplicativos, planilhas e automações para organizar sua rotina, automatizar tarefas e aumentar a produtividade do seu negócio.'
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div id="home-page" className="pb-20 space-y-16 sm:space-y-24">
      <SEO
        title="AL Studio Tech | Aplicativos, Planilhas e Automações"
        description="Encontre aplicativos, planilhas e automações para organizar sua rotina, automatizar tarefas e aumentar a produtividade do seu negócio."
        canonical="/"
        jsonLd={organizationSchema}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        
        {/* ================================================== */}
        {/* 2. HERO PRINCIPAL */}
        {/* ================================================== */}
        <section id="hero-section" className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 dark:from-[#0d121c] dark:via-[#080b12] dark:to-[#111827] border border-slate-800 p-8 sm:p-14 lg:p-16 text-white shadow-2xl">
          {/* Subtle glow background graphics */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/20 dark:bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-600/15 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 dark:bg-white/5 border border-white/15 text-xs font-bold text-blue-300 backdrop-blur-md shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Plataforma Oficial AL Studio Tech</span>
            </div>

            <div className="space-y-5">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-white">
                Ferramentas digitais para trabalhar melhor, vender mais e perder menos tempo.
              </h1>
              <p className="text-slate-300 dark:text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl font-normal">
                Planilhas, aplicativos e automações prontas para simplificar sua rotina e ajudar seu negócio a crescer.
              </p>
            </div>

            {/* HERO Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={() => scrollToSection('aplicativos-section')}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-black text-sm sm:text-base rounded-xl transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-600/40 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>🚀 Ver aplicativos</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('organize-section')}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base rounded-xl backdrop-blur-md border border-white/15 transition-all hover:-translate-y-0.5"
              >
                <span>📊 Ver planilhas</span>
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('automacoes-section')}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-transparent hover:bg-white/5 text-slate-300 hover:text-white font-semibold text-xs sm:text-sm rounded-xl border border-white/10 transition-colors"
              >
                <span>🤖 Conhecer automações</span>
              </button>
            </div>

            {/* Quick stats / trust signals */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-4 text-slate-400 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Sem mensalidade recorrente</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Acesso imediato</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>Checkout 100% seguro</span>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================== */}
        {/* 3. BLOCO ORGANIZE / AUTOMATIZE / ESCALE */}
        {/* ================================================== */}
        <section id="caminhos-section" className="mt-16 sm:mt-24 space-y-8">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Escolha a solução ideal para você
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              Comece simples ou leve seu negócio para o próximo nível.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            
            {/* CARD 1: ORGANIZE */}
            <div className="group bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 rounded-3xl p-8 flex flex-col justify-between hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all shadow-sm hover:shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-blue-500/20 transition-all" />
              <div className="space-y-6 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-2xl font-black shadow-xs">
                  📊
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
                    Caminho Inicial
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                    ORGANIZE
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
                    Planilhas e ferramentas prontas para controlar vendas, clientes, estoque, financeiro e muito mais.
                  </p>
                </div>
              </div>

              <div className="pt-8 relative z-10">
                <button
                  type="button"
                  onClick={() => scrollToSection('organize-section')}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 bg-slate-100 hover:bg-blue-600 text-slate-900 hover:text-white dark:bg-slate-800 dark:hover:bg-blue-600 dark:text-white font-extrabold text-sm rounded-xl transition-all shadow-2xs"
                >
                  <span>Ver ferramentas</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* CARD 2: AUTOMATIZE */}
            <div className="group bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 rounded-3xl p-8 flex flex-col justify-between hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all shadow-sm hover:shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/20 transition-all" />
              <div className="space-y-6 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-2xl font-black shadow-xs">
                  🚀
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                    Sistemas Web & Apps
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                    AUTOMATIZE
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
                    Aplicativos completos para substituir controles manuais e deixar sua rotina muito mais simples.
                  </p>
                </div>
              </div>

              <div className="pt-8 relative z-10">
                <button
                  type="button"
                  onClick={() => scrollToSection('aplicativos-section')}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl transition-all shadow-md shadow-emerald-500/20"
                >
                  <span>Ver aplicativos</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* CARD 3: ESCALE */}
            <div className="group bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 rounded-3xl p-8 flex flex-col justify-between hover:border-purple-500/50 dark:hover:border-purple-500/50 transition-all shadow-sm hover:shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-purple-500/20 transition-all" />
              <div className="space-y-6 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center text-2xl font-black shadow-xs">
                  🤖
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-black uppercase tracking-widest text-purple-600 dark:text-purple-400">
                    Alta Performance
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                    ESCALE
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
                    Automações inteligentes para economizar tempo, reduzir tarefas repetitivas e aumentar sua produtividade.
                  </p>
                </div>
              </div>

              <div className="pt-8 relative z-10">
                <button
                  type="button"
                  onClick={() => scrollToSection('automacoes-section')}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 bg-slate-100 hover:bg-purple-600 text-slate-900 hover:text-white dark:bg-slate-800 dark:hover:bg-purple-600 dark:text-white font-extrabold text-sm rounded-xl transition-all shadow-2xs"
                >
                  <span>Ver automações</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* ================================================== */}
        {/* STRATEGIC CALLOUT 1 */}
        {/* ================================================== */}
        <div className="mt-16 sm:mt-20 py-4 px-6 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-800/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-blue-600 text-white font-bold text-xs">Ponto de Entrada</span>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
              💡 Comece organizando sua rotina.
            </p>
          </div>
          <button
            type="button"
            onClick={() => scrollToSection('organize-section')}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>Ver planilhas e ferramentas</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* ================================================== */}
        {/* 5. SEÇÃO PLANILHAS (ORGANIZE SEU NEGÓCIO) */}
        {/* ================================================== */}
        <section id="organize-section" className="mt-16 sm:mt-24 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                <FileSpreadsheet className="w-4 h-4" />
                <span>Nível 1 • Organização</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                📊 Organize seu negócio
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
                Comece com ferramentas simples, práticas e acessíveis.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            
            {/* Spreadsheet Category 1 */}
            <div className="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-3 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
              <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-lg">
                  📈
                </span>
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  Planilha
                </span>
              </div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                Controle de Vendas
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Gestão prática de entradas diárias, formas de pagamento e comissões.
              </p>
              <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80">
                <span className="text-xs font-bold text-slate-500">Pronta para uso</span>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400">Em breve</span>
              </div>
            </div>

            {/* Spreadsheet Category 2 */}
            <div className="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-3 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
              <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-lg">
                  💰
                </span>
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  Planilha
                </span>
              </div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                Fluxo de Caixa
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Acompanhamento mensal de entradas, saídas e projeção de saldo.
              </p>
              <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80">
                <span className="text-xs font-bold text-slate-500">Sem mensalidade</span>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400">Em breve</span>
              </div>
            </div>

            {/* Spreadsheet Category 3 */}
            <div className="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-3 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
              <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-lg">
                  📦
                </span>
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  Planilha
                </span>
              </div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                Controle de Estoque
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Relatório de entradas, saídas e alerta visual de reposição mínima.
              </p>
              <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80">
                <span className="text-xs font-bold text-slate-500">Alerta de estoque</span>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400">Em breve</span>
              </div>
            </div>

            {/* Spreadsheet Category 4 */}
            <div className="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-3 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
              <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold text-lg">
                  👥
                </span>
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  Planilha
                </span>
              </div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                Controle de Clientes (CRM)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Cadastro centralizado de contatos, histórico de compras e retorno.
              </p>
              <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80">
                <span className="text-xs font-bold text-slate-500">Fácil de usar</span>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400">Em breve</span>
              </div>
            </div>

          </div>

          <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base">
                Precisa de uma ferramenta pronta agora?
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Você também pode explorar nossos aplicativos interativos com banco de dados próprio e interface web.
              </p>
            </div>
            <button
              type="button"
              onClick={() => scrollToSection('aplicativos-section')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all whitespace-nowrap"
            >
              <span>Ver Aplicativos Disponíveis</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* ================================================== */}
        {/* STRATEGIC CALLOUT 2 */}
        {/* ================================================== */}
        <div className="mt-16 sm:mt-20 py-4 px-6 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-emerald-600 text-white font-bold text-xs">Próximo Passo</span>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
              ⚡ Pronto para deixar o trabalho manual para trás?
            </p>
          </div>
          <button
            type="button"
            onClick={() => scrollToSection('aplicativos-section')}
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>Conhecer nossos aplicativos web</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* ================================================== */}
        {/* 4. SEÇÃO APLICATIVOS (EM DESTAQUE) */}
        {/* ================================================== */}
        <section id="aplicativos-section" className="mt-16 sm:mt-24 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                <Rocket className="w-4 h-4" />
                <span>Nível 2 • Sistemas Inteligentes</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                🚀 Aplicativos em destaque
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
                Soluções prontas para transformar tarefas do dia a dia em processos simples.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/produtos')}
              className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors whitespace-nowrap"
            >
              <span>Ver todos os aplicativos ({products.filter(p => p.active && p.category !== 'Kits').length})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.filter(p => p.active && p.category !== 'Kits').map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
              />
            ))}
          </div>
        </section>

        {/* ================================================== */}
        {/* STRATEGIC CALLOUT 3 */}
        {/* ================================================== */}
        <div className="mt-16 sm:mt-20 py-4 px-6 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200/80 dark:border-purple-800/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-purple-600 text-white font-bold text-xs">Alta Produtividade</span>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
              🤖 Quer economizar ainda mais tempo?
            </p>
          </div>
          <button
            type="button"
            onClick={() => scrollToSection('automacoes-section')}
            className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
          >
            <span>Conhecer nossas automações</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* ================================================== */}
        {/* 6. SEÇÃO AUTOMAÇÕES (AUTOMATIZE TAREFAS REPETITIVAS) */}
        {/* ================================================== */}
        <section id="automacoes-section" className="mt-16 sm:mt-24 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                <Bot className="w-4 h-4" />
                <span>Nível 3 • Escala & Automação</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                🤖 Automatize tarefas repetitivas
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
                Deixe a tecnologia cuidar das tarefas que consomem seu tempo.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Automation Card 1 */}
            <div className="bg-gradient-to-br from-white to-purple-50/50 dark:from-[#121824] dark:to-purple-950/20 border border-slate-200 dark:border-slate-800 rounded-3xl p-7 space-y-4 shadow-sm hover:border-purple-500/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-xl">
                ⚡
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300">
                  Em Desenvolvimento
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  Automação de WhatsApp
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Lembretes automáticos de agendamentos, confirmações de ordens de serviço e mensagens de pós-venda.
                </p>
              </div>
              <ul className="space-y-2 pt-2 border-t border-slate-200/60 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-500" />
                  <span>Sem digitação manual</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-500" />
                  <span>Redução de faltas em 80%</span>
                </li>
              </ul>
            </div>

            {/* Automation Card 2 */}
            <div className="bg-gradient-to-br from-white to-purple-50/50 dark:from-[#121824] dark:to-purple-950/20 border border-slate-200 dark:border-slate-800 rounded-3xl p-7 space-y-4 shadow-sm hover:border-purple-500/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-xl">
                📄
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300">
                  Em Desenvolvimento
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  Automação de Orçamentos
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Criação e envio imediato de PDF de orçamentos com calculadoras automáticas e integração de propostas.
                </p>
              </div>
              <ul className="space-y-2 pt-2 border-t border-slate-200/60 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-500" />
                  <span>Respostas em menos de 1 minuto</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-500" />
                  <span>Cálculo automático de margens</span>
                </li>
              </ul>
            </div>

            {/* Automation Card 3 */}
            <div className="bg-gradient-to-br from-white to-purple-50/50 dark:from-[#121824] dark:to-purple-950/20 border border-slate-200 dark:border-slate-800 rounded-3xl p-7 space-y-4 shadow-sm hover:border-purple-500/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-xl">
                📊
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300">
                  Em Desenvolvimento
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  Automação de Relatórios
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Consolidação diária e semanal do seu faturamento enviada diretamente para seu e-mail ou aplicativo.
                </p>
              </div>
              <ul className="space-y-2 pt-2 border-t border-slate-200/60 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-500" />
                  <span>Visão clara do seu negócio</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-500" />
                  <span>Relatórios executivos prontos</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="bg-purple-900/10 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base">
                Precisa de uma automação personalizada para sua empresa?
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Fale diretamente com nossa equipe técnica da AL Studio Tech.
              </p>
            </div>
            <a
              href={brand.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-purple-500/20 whitespace-nowrap"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Solicitar automação sob medida</span>
            </a>
          </div>
        </section>

        {/* ================================================== */}
        {/* 7. SEÇÃO COMBOS / KITS */}
        {/* ================================================== */}
        <section id="kits-section" className="mt-16 sm:mt-24 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                <Package className="w-4 h-4" />
                <span>Combos Especiais</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                📦 Kits completos
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
                Mais ferramentas, mais economia.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Kit 1 - Active Product */}
            {products.filter(p => p.active && (p.category === 'Kits' || p.category === 'kit' || p.id === 'kit-pequeno-negocio')).map((kitProduct) => (
              <ProductCard
                key={kitProduct.id}
                product={kitProduct}
                onSelect={onSelectProduct}
              />
            ))}

            {/* Kit 2 */}
            <div className="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm hover:border-amber-500/40 transition-all">
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-base">
                  🛠️
                </span>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                  Em Breve
                </span>
              </div>
              <h3 className="font-black text-slate-900 dark:text-white text-base">
                Kit Prestador de Serviços
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Conjunto com Gerador de Orçamentos + AL Studio Agenda para autônomos e consultores.
              </p>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-amber-600 dark:text-amber-400">
                Combo Agendamento + Orçamento
              </div>
            </div>

            {/* Kit 3 */}
            <div className="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm hover:border-amber-500/40 transition-all">
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-base">
                  🛍️
                </span>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                  Em Breve
                </span>
              </div>
              <h3 className="font-black text-slate-900 dark:text-white text-base">
                Kit Vendedor Online
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Conjunto completo para quem vende pelo Instagram, WhatsApp ou e-commerce.
              </p>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-amber-600 dark:text-amber-400">
                Combo Vendas + Estoque
              </div>
            </div>

            {/* Kit 4 */}
            <div className="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm hover:border-amber-500/40 transition-all">
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-base">
                  🚀
                </span>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                  Em Breve
                </span>
              </div>
              <h3 className="font-black text-slate-900 dark:text-white text-base">
                Kit Gestão Completa
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Acesso unificado a todas as soluções digitais da AL Studio Tech com desconto acumulado.
              </p>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-amber-600 dark:text-amber-400">
                Acesso Master Completo
              </div>
            </div>

          </div>
        </section>

        {/* ================================================== */}
        {/* 9. SEÇÃO POR QUE AL STUDIO TECH? */}
        {/* ================================================== */}
        <section id="diferenciais-section" className="mt-16 sm:mt-24 bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-14 shadow-sm">
          <div className="text-center space-y-3 max-w-3xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
              Diferenciais AL Studio Tech
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Por que escolher a AL Studio Tech?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              Soluções criadas por quem entende as dores reais do seu negócio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            
            {/* Benefit 1 */}
            <div className="space-y-3 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-black text-slate-900 dark:text-white text-lg">
                ⚡ Pronto para usar
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Ferramentas desenvolvidas para você começar rapidamente sem perda de tempo.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="space-y-3 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <BadgePercent className="w-6 h-6" />
              </div>
              <h3 className="font-black text-slate-900 dark:text-white text-lg">
                💰 Acessível
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Soluções digitais sem a complexidade e o custo de sistemas tradicionais.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="space-y-3 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="font-black text-slate-900 dark:text-white text-lg">
                🎯 Foco no resultado
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Ferramentas criadas para resolver problemas reais e práticos do dia a dia.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="space-y-3 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Rocket className="w-6 h-6" />
              </div>
              <h3 className="font-black text-slate-900 dark:text-white text-lg">
                🚀 Evolução constante
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Novos aplicativos, planilhas e automações sendo adicionados constantemente.
              </p>
            </div>

          </div>
        </section>

        {/* ================================================== */}
        {/* 10. CTA FINAL */}
        {/* ================================================== */}
        <section id="cta-final-section" className="mt-16 sm:mt-24">
          <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 dark:from-[#0f172a] dark:to-[#090d16] border border-slate-800 rounded-3xl p-8 sm:p-14 lg:p-16 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                Qual tarefa você quer simplificar hoje?
              </h2>
              <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
                Escolha uma ferramenta e comece a transformar sua rotina.
              </p>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-3.5">
                <button
                  type="button"
                  onClick={() => scrollToSection('organize-section')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-slate-950 font-black text-sm rounded-xl hover:bg-slate-100 transition-all shadow-md hover:-translate-y-0.5"
                >
                  <span>📊 Quero organizar</span>
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('aplicativos-section')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-black text-sm rounded-xl transition-all shadow-md hover:-translate-y-0.5"
                >
                  <span>🚀 Quero automatizar</span>
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('automacoes-section')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-purple-600 hover:bg-purple-500 text-white font-black text-sm rounded-xl transition-all shadow-md hover:-translate-y-0.5"
                >
                  <span>🤖 Quero escalar</span>
                </button>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
