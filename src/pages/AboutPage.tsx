import { ArrowRight, Cpu, Sparkles, Target, Users } from 'lucide-react';
import { brand } from '../config/brand';
import { SEO } from '../components/SEO';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div id="about-page" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      <SEO
        title="Sobre"
        description="Conheça a AL Studio Tech: ferramentas, planilhas e aplicativos criados para simplificar suas tarefas do dia a dia."
        canonical="/sobre"
      />
      {/* Page Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider bg-blue-50 dark:bg-white/5 border border-blue-200 dark:border-white/10 px-3 py-1 rounded-full">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Sobre Nós</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          {brand.name}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-medium">
          "{brand.slogan}"
        </p>
      </div>

      {/* Main Philosophy Card */}
      <div className="bg-white dark:bg-[#121824] p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Nossa Proposta
        </h2>
        <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 font-semibold">
            {brand.presentation}
          </p>
          <p>
            O mundo da tecnologia muitas vezes complica o que deveria ser simples. Ferramentas repletas de menus desnecessários, assinaturas caras e interfaces confusas acabam atrapalhando quem só quer resolver uma tarefa rápida.
          </p>
          <p>
            A <strong className="text-slate-900 dark:text-white font-bold">{brand.name}</strong> nasceu para fazer o oposto: projetamos cada produto de forma dedicada, leve e focada na utilidade real. Sem barreiras, sem configurações intermináveis e com funcionamento impecável tanto no celular quanto no computador.
          </p>
        </div>
      </div>

      {/* 3 Pillars */}
      <div className="space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Nossos Pilares
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Como construímos nossas ferramentas
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-[#121824] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Foco no Essencial</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Cada aplicativo resolve um problema com excelência, sem recursos inúteis que só servem para poluir a tela.
            </p>
          </div>

          <div className="bg-white dark:bg-[#121824] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-200 dark:border-blue-500/20">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Independência Técnica</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Nossos produtos são desenvolvidos de maneira modular e autônoma, garantindo alta velocidade e confiabilidade.
            </p>
          </div>

          <div className="bg-white dark:bg-[#121824] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-200 dark:border-emerald-500/20">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Acessibilidade Real</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Preços justos, pagamento único sem mensalidades abusivas e interface pensada para qualquer usuário.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-slate-900 dark:bg-[#121824] border border-slate-800 text-white p-8 sm:p-10 rounded-3xl text-center space-y-4 shadow-md">
        <h3 className="text-xl sm:text-2xl font-black">
          Pronto para experimentar a simplicidade?
        </h3>
        <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto">
          Conheça nosso catálogo e descubra ferramentas criadas para acelerar o seu dia.
        </p>
        <div className="pt-2">
          <button
            type="button"
            onClick={() => onNavigate('/produtos')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-950 font-bold text-xs sm:text-sm rounded-xl hover:bg-slate-100 transition-colors shadow-sm"
          >
            <span>Explorar produtos</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
