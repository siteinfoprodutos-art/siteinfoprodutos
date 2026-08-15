const fs = require('fs');

let content = fs.readFileSync('src/pages/ProductDetailPage.tsx', 'utf8');

// Replace mobile CTA
const mobileRegex = /\{\/\* Mobile Sticky CTA \*\/\}[\s\S]*?(?=<\/div>\s*\{\/\* 1\. HERO \*\/)/g;
content = content.replace(mobileRegex, '<PurchaseBlock product={product} variant="mobile" />\n\n');

// Replace hero CTA
const heroCtaRegex = /<div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-6">[\s\S]*?<\/div>[\s\S]*?<\/div>[\s\S]*?<\/div>[\s\S]*?(?=<\/div>\s*<\/div>\s*\{\/\* Visual Preview \*\/)/;
content = content.replace(heroCtaRegex, '<PurchaseBlock product={product} variant="hero" />\n</div>');

// Replace bottom CTA
const bottomCtaRegex = /<div className="flex flex-col items-center gap-6">[\s\S]*?<div className="bg-\[#0A0A0A\] p-6 rounded-3xl border border-white\/10 shadow-inner">[\s\S]*?<\/div>\s*<\/div>/;
content = content.replace(bottomCtaRegex, '<PurchaseBlock product={product} variant="bottom" />');

// Insert new sections before "8. MOBILE FIRST"
const deliverySections = `
      {/* O QUE VOCÊ RECEBE & COMO RECEBO */}
      <section className="py-24 bg-[#121212] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            <div className="space-y-6">
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">O que você recebe</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5"><Check className="w-3.5 h-3.5 text-emerald-500"/></div>
                  <span className="text-slate-300 font-medium leading-relaxed">Acesso integral ao aplicativo ou ferramenta</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5"><Check className="w-3.5 h-3.5 text-emerald-500"/></div>
                  <span className="text-slate-300 font-medium leading-relaxed">Todos os recursos descritos nesta página</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5"><Check className="w-3.5 h-3.5 text-emerald-500"/></div>
                  <span className="text-slate-300 font-medium leading-relaxed">Atualizações da versão adquirida, quando disponibilizadas</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5"><Check className="w-3.5 h-3.5 text-emerald-500"/></div>
                  <span className="text-slate-300 font-medium leading-relaxed">Instruções iniciais de uso</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-[#0A0A0A] p-8 rounded-3xl border border-white/10 shadow-sm flex flex-col justify-center">
              <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center mb-6">
                 <PackageOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-3">Como recebo o produto?</h3>
              <p className="text-slate-400 leading-relaxed font-medium">
                Após a confirmação do pagamento, você receberá as instruções de acesso e utilização do produto de forma segura e imediata.
              </p>
            </div>
          </div>
        </div>
      </section>
`;
content = content.replace('{/* 8. MOBILE FIRST */}', deliverySections + '\n      {/* 8. MOBILE FIRST */}');


// Ensure PackageOpen is imported
if (!content.includes('PackageOpen')) {
  content = content.replace('X} from \'lucide-react\';', 'X, PackageOpen} from \'lucide-react\';');
}

fs.writeFileSync('src/pages/ProductDetailPage.tsx', content);
