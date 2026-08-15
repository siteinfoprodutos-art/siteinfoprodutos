const fs = require('fs');

let content = fs.readFileSync('src/pages/ProductDetailPage.tsx', 'utf8');

// 1. Add "Como funciona a compra" and update "Como recebo o produto"
// Looking for "Como recebo o produto?" section.
const howToReceiveIndex = content.indexOf('<h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-3">Como recebo o produto?</h3>');

if (howToReceiveIndex !== -1) {
  const sectionStart = content.lastIndexOf('<div className="bg-[#121212]', howToReceiveIndex);
  
  const howToBuyContent = `
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Como funciona a compra */}
            <div className="bg-[#121212] p-8 sm:p-12 rounded-[2.5rem] md:rounded-l-[3rem] md:rounded-r-xl border border-white/10 shadow-sm flex flex-col justify-center">
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center mb-6">
                 <ShoppingCart className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-6">Como funciona a compra</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-sm shrink-0">1</div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Compre pela Kiwify</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">Ao clicar em "Comprar agora", você será direcionado para o checkout da Kiwify.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-sm shrink-0">2</div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Finalize o pagamento</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">Escolha uma das formas de pagamento disponibilizadas no checkout.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-sm shrink-0">3</div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Receba o acesso</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">Após a confirmação da compra, siga as instruções de acesso fornecidas pela plataforma.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Como recebo o produto? */}
            <div className="bg-[#121212] p-8 sm:p-12 rounded-[2.5rem] md:rounded-r-[3rem] md:rounded-l-xl border border-white/10 shadow-sm flex flex-col justify-center">
              <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center mb-6">
                 <PackageOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-3">Como recebo o produto?</h3>
              <p className="text-slate-400 leading-relaxed font-medium">
                Após a confirmação do pagamento, você receberá pela Kiwify as instruções para acessar o produto adquirido.
              </p>
            </div>
          </div>
  `;

  // Find the end of the previous structure
  const endOfSection = content.indexOf('</section>', sectionStart);
  
  // Replace the whole container inside the section
  const sectionContentStart = content.lastIndexOf('<div', sectionStart); // This is likely <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
  // We need to carefully replace just the old "Como recebo o produto" card
  // Let's use regex
  content = content.replace(
    /<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">[\s\S]*?<div className="bg-\[#121212\] p-8 sm:p-12 rounded-\[2\.5rem\] border border-white\/10 shadow-sm flex flex-col justify-center">[\s\S]*?<\/div>\s*<\/div>/,
    `<div className="px-4 sm:px-6 lg:px-8">\n${howToBuyContent}\n        </div>`
  );
}

// 2. Update FAQ
content = content.replace(
  '<FAQItem question="Preciso instalar alguma coisa?" answer="O produto funciona como uma aplicação web acessada pelo navegador. Instruções detalhadas serão fornecidas após a compra." />',
  `<FAQItem question="Como é feito o pagamento?" answer="O pagamento é processado pela Kiwify através do checkout do produto." />
               <FAQItem question="Como recebo o acesso?" answer="Após a confirmação da compra, você receberá as instruções de acesso disponibilizadas pela Kiwify." />
               <FAQItem question="Preciso criar uma conta na AL Studio Tech?" answer="Não nesta versão. O acesso inicial será realizado conforme as instruções fornecidas após a compra." />`
);

content = content.replace(
  '<FAQItem question="Existe mensalidade?" answer="Não. O valor pago garante o acesso à ferramenta sem taxas extras mensais." />',
  '<FAQItem question="Existe mensalidade?" answer="Não para o Gerador de Orçamentos Profissionais. Ele é vendido como compra única." />'
);

fs.writeFileSync('src/pages/ProductDetailPage.tsx', content);
