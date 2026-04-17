const CART_KEY = 'techstore_cart';

export function loadCart() {
  const stored = sessionStorage.getItem(CART_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return {};
    }
  }
  return {};
}

export function saveCart(cart) {
  sessionStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function clearCart() {
  sessionStorage.removeItem(CART_KEY);
}