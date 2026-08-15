import re

with open("src/components/PurchaseBlock.tsx", "r") as f:
    content = f.read()

# Update handlePurchase
content = content.replace("trackEvent('checkout_click', { productId: product.id });", "trackEvent('checkout_click', { productId: product.id, provider: product.checkoutProvider });")

# Update button text logic
content = content.replace("buttonText = 'Compra disponível em breve';", "buttonText = 'Em breve';")

# Replace "Estamos preparando o checkout deste produto."
content = content.replace("Estamos preparando o checkout deste produto.", "Este produto estará disponível para compra em breve.")

# In hero variant
hero_provider = """
        {isAvailable && product.checkoutUrl !== '' && product.checkoutProvider === 'kiwify' && (
          <p className="text-xs text-slate-500 font-medium text-center sm:text-left mt-1">Pagamento processado pela Kiwify.</p>
        )}
"""
content = re.sub(
    r"(<button\s*onClick=\{handlePurchase\}[\s\S]*?<\/button>)",
    r"\1" + hero_provider,
    content
)

with open("src/components/PurchaseBlock.tsx", "w") as f:
    f.write(content)
