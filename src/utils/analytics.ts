export function trackEvent(eventName: string, data?: any) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics] Event: ${eventName}`, data || '');
  }
  // In the future, this can be wired to GA, Meta Pixel, etc.
}
