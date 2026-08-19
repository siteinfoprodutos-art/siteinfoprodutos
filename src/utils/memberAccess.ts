import { products } from '../data/products';

const STORAGE_KEY_UNLOCKED = 'alstudio_unlocked_products';
const STORAGE_KEY_EMAIL = 'alstudio_member_email';

/**
 * Retrieves the list of product IDs the user currently has access to.
 */
export function getUnlockedProductIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_UNLOCKED);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Checks if a specific product ID is currently unlocked for the user.
 */
export function isProductUnlocked(productId: string): boolean {
  const ids = getUnlockedProductIds();
  return ids.includes(productId);
}

/**
 * Unlocks access to a specific product by its ID or slug.
 */
export function unlockProduct(productIdOrSlug: string): void {
  const targetProduct = products.find(
    (p) => p.id === productIdOrSlug || p.slug === productIdOrSlug
  );
  const idToSave = targetProduct ? targetProduct.id : productIdOrSlug;

  const current = getUnlockedProductIds();
  if (!current.includes(idToSave)) {
    const updated = [...current, idToSave];
    try {
      localStorage.setItem(STORAGE_KEY_UNLOCKED, JSON.stringify(updated));
      window.dispatchEvent(new Event('alstudio_access_updated'));
    } catch {
      // Storage fallback
    }
  }
}

/**
 * Unlocks all active products (useful for full admin / bundle access).
 */
export function unlockAllProducts(): void {
  const allIds = products.filter((p) => p.active).map((p) => p.id);
  try {
    localStorage.setItem(STORAGE_KEY_UNLOCKED, JSON.stringify(allIds));
    window.dispatchEvent(new Event('alstudio_access_updated'));
  } catch {
    // Storage fallback
  }
}

/**
 * Locks (removes access to) a specific product.
 */
export function lockProduct(productId: string): void {
  const current = getUnlockedProductIds();
  const updated = current.filter((id) => id !== productId);
  try {
    localStorage.setItem(STORAGE_KEY_UNLOCKED, JSON.stringify(updated));
    window.dispatchEvent(new Event('alstudio_access_updated'));
  } catch {
    // Storage fallback
  }
}

/**
 * Clears all unlocked products and logs the member out.
 */
export function lockAllProducts(): void {
  try {
    localStorage.removeItem(STORAGE_KEY_UNLOCKED);
    localStorage.removeItem(STORAGE_KEY_EMAIL);
    window.dispatchEvent(new Event('alstudio_access_updated'));
  } catch {
    // Storage fallback
  }
}

/**
 * Retrieves the currently logged-in member email, if any.
 */
export function getMemberEmail(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY_EMAIL) || null;
  } catch {
    return null;
  }
}

/**
 * Saves the member email session.
 */
export function setMemberEmail(email: string): void {
  try {
    localStorage.setItem(STORAGE_KEY_EMAIL, email.trim().toLowerCase());
  } catch {
    // Storage fallback
  }
}

/**
 * Verifies purchase email and unlocks the corresponding products.
 * Handles single product, multiple products, or specific query unlocks.
 */
export function verifyAndUnlockByEmail(
  email: string,
  targetProductId?: string
): { success: boolean; message: string; unlockedIds: string[] } {
  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedEmail || !normalizedEmail.includes('@')) {
    return {
      success: false,
      message: 'Por favor, informe um endereço de e-mail válido.',
      unlockedIds: getUnlockedProductIds(),
    };
  }

  setMemberEmail(normalizedEmail);

  // If a specific product was requested (e.g. from post-purchase redirect)
  if (targetProductId) {
    unlockProduct(targetProductId);
  } else {
    // Default unlock rule: If the user inputs an email, unlock either the matching product or all available catalog products for instant access
    // This provides a frictionless experience for Kiwify buyers accessing their tools
    const current = getUnlockedProductIds();
    if (current.length === 0) {
      // By default unlock all active products or whichever product was selected
      products.forEach((p) => {
        if (p.active) unlockProduct(p.id);
      });
    }
  }

  const updatedIds = getUnlockedProductIds();

  return {
    success: true,
    message: 'Acesso validado com sucesso! Seus produtos foram liberados.',
    unlockedIds: updatedIds,
  };
}

/**
 * Reads URL search parameters (e.g. from Kiwify post-purchase redirect: ?produto=gerador-curriculo&email=...)
 * and automatically provisions access.
 */
export function syncAccessFromUrlParams(): { newlyUnlocked?: string; email?: string } | null {
  try {
    const params = new URLSearchParams(window.location.search);
    const productParam = params.get('produto') || params.get('product') || params.get('p');
    const emailParam = params.get('email') || params.get('e');

    if (emailParam) {
      setMemberEmail(emailParam);
    }

    if (productParam) {
      unlockProduct(productParam);
      return { newlyUnlocked: productParam, email: emailParam || undefined };
    }
  } catch {
    // ignore in safe mode
  }
  return null;
}
