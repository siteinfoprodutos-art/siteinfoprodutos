const fs = require('fs');

let content = fs.readFileSync('src/components/PurchaseBlock.tsx', 'utf8');

// Fix mobile variant layout for the message
content = content.replace(
  /{isAvailable && product.checkoutUrl !== '' && product.checkoutProvider === 'kiwify' && \(\s*<p className="text-xs text-slate-500 font-medium text-center sm:text-left mt-1">Pagamento processado pela Kiwify\.<\/p>\s*\)}\s*<\/div>\s*\);\s*}/,
  `</div>\n    );\n  }`
);

// Instead of putting it outside, we might just omit the message on mobile if there is no space, or put it below the title.
// Actually, let's just leave the message out from the mobile sticky CTA or put it above. The sticky bar should be small.
// Let's replace the whole mobile return statement to be safe.
const mobileReturn = `
  if (variant === 'mobile') {
    return (
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0A0A0A]/95 backdrop-blur-md border-t border-white/10 p-4 z-40 flex flex-col gap-2 shadow-[0_-4px_10px_-1px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">{billingText}</div>
            <div className="flex items-baseline gap-2 mt-0.5">
              <div className="text-xl font-black text-white leading-none">{formatPrice(product.price)}</div>
              {product.oldPrice && product.oldPrice > product.price && (
                <span className="text-xs text-slate-500 line-through font-semibold">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={handlePurchase}
            disabled={isButtonDisabled}
            className={\`inline-flex items-center gap-2 px-6 py-2.5 font-bold text-sm rounded-xl transition-all shadow-sm \${
              isButtonDisabled 
                ? 'bg-slate-800 text-slate-400 cursor-not-allowed' 
                : 'bg-white hover:bg-slate-200 text-[#0A0A0A]'
            }\`}
          >
            {isAvailable && product.checkoutUrl !== '' && <ShoppingCart className="w-4 h-4" />}
            {buttonText}
          </button>
        </div>
        {isAvailable && product.checkoutUrl !== '' && product.checkoutProvider === 'kiwify' && (
          <div className="text-[10px] text-slate-500 font-medium text-center">Pagamento processado pela Kiwify.</div>
        )}
      </div>
    );
  }
`;

content = content.replace(/if \(variant === 'mobile'\) \{[\s\S]*?if \(variant === 'bottom'\) \{/, mobileReturn.trim() + '\n\n  if (variant === \'bottom\') {');

fs.writeFileSync('src/components/PurchaseBlock.tsx', content);
