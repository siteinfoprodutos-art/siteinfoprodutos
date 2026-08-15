export function openCheckout(checkoutUrl: string) {
  if (!checkoutUrl) return;
  
  try {
    const url = new URL(checkoutUrl);
    // ensure valid http/https protocol
    if (url.protocol === 'http:' || url.protocol === 'https:') {
      window.open(url.toString(), '_blank', 'noopener,noreferrer');
    }
  } catch (error) {
    console.error('Invalid checkout URL', error);
  }
}
