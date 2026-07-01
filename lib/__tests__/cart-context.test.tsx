/**
 * @jest-environment jsdom
 */
import { render, act } from '@testing-library/react';
import { CartProvider, useCart, CartItem } from '../cart-context';
import { ReactNode } from 'react';

function TestConsumer({ onReady }: { onReady: (ctx: ReturnType<typeof useCart>) => void }) {
  const ctx = useCart();
  onReady(ctx);
  return null;
}

function renderWithProvider(onReady: (ctx: ReturnType<typeof useCart>) => void) {
  return render(
    <CartProvider>
      <TestConsumer onReady={onReady} />
    </CartProvider>
  );
}

const mockItem: Omit<CartItem, 'quantity'> = {
  id: 'prod-1-M',
  name: 'Test Jersey (M)',
  type: 'Football Set',
  price: 250000,
  image: 'https://example.com/img.jpg',
  colors: ['#151515'],
};

beforeEach(() => {
  localStorage.clear();
});

describe('CartProvider', () => {
  it('starts with empty cart', () => {
    let cartCtx: ReturnType<typeof useCart>;
    renderWithProvider((ctx) => { cartCtx = ctx; });
    expect(cartCtx!.cart).toEqual([]);
    expect(cartCtx!.getTotalItems()).toBe(0);
    expect(cartCtx!.getTotalPrice()).toBe(0);
  });

  it('adds item to cart', () => {
    let cartCtx: ReturnType<typeof useCart>;
    renderWithProvider((ctx) => { cartCtx = ctx; });

    act(() => { cartCtx!.addToCart(mockItem); });

    expect(cartCtx!.cart).toHaveLength(1);
    expect(cartCtx!.cart[0].id).toBe('prod-1-M');
    expect(cartCtx!.cart[0].quantity).toBe(1);
    expect(cartCtx!.getTotalItems()).toBe(1);
    expect(cartCtx!.getTotalPrice()).toBe(250000);
  });

  it('increments quantity for existing item', () => {
    let cartCtx: ReturnType<typeof useCart>;
    renderWithProvider((ctx) => { cartCtx = ctx; });

    act(() => { cartCtx!.addToCart(mockItem); });
    act(() => { cartCtx!.addToCart(mockItem); });

    expect(cartCtx!.cart).toHaveLength(1);
    expect(cartCtx!.cart[0].quantity).toBe(2);
    expect(cartCtx!.getTotalItems()).toBe(2);
    expect(cartCtx!.getTotalPrice()).toBe(500000);
  });

  it('adds multiple different items', () => {
    let cartCtx: ReturnType<typeof useCart>;
    renderWithProvider((ctx) => { cartCtx = ctx; });

    const item2: Omit<CartItem, 'quantity'> = { ...mockItem, id: 'prod-2-L', name: 'Other (L)', price: 195000 };

    act(() => { cartCtx!.addToCart(mockItem); });
    act(() => { cartCtx!.addToCart(item2); });

    expect(cartCtx!.cart).toHaveLength(2);
    expect(cartCtx!.getTotalItems()).toBe(2);
    expect(cartCtx!.getTotalPrice()).toBe(445000);
  });

  it('removes item from cart', () => {
    let cartCtx: ReturnType<typeof useCart>;
    renderWithProvider((ctx) => { cartCtx = ctx; });

    act(() => { cartCtx!.addToCart(mockItem); });
    act(() => { cartCtx!.removeFromCart('prod-1-M'); });

    expect(cartCtx!.cart).toHaveLength(0);
    expect(cartCtx!.getTotalItems()).toBe(0);
  });

  it('updates quantity', () => {
    let cartCtx: ReturnType<typeof useCart>;
    renderWithProvider((ctx) => { cartCtx = ctx; });

    act(() => { cartCtx!.addToCart(mockItem); });
    act(() => { cartCtx!.updateQuantity('prod-1-M', 3); });

    expect(cartCtx!.cart[0].quantity).toBe(3);
    expect(cartCtx!.getTotalPrice()).toBe(750000);
  });

  it('removes item when quantity set to 0', () => {
    let cartCtx: ReturnType<typeof useCart>;
    renderWithProvider((ctx) => { cartCtx = ctx; });

    act(() => { cartCtx!.addToCart(mockItem); });
    act(() => { cartCtx!.updateQuantity('prod-1-M', 0); });

    expect(cartCtx!.cart).toHaveLength(0);
  });

  it('removes item when quantity set to negative', () => {
    let cartCtx: ReturnType<typeof useCart>;
    renderWithProvider((ctx) => { cartCtx = ctx; });

    act(() => { cartCtx!.addToCart(mockItem); });
    act(() => { cartCtx!.updateQuantity('prod-1-M', -1); });

    expect(cartCtx!.cart).toHaveLength(0);
  });

  it('clears entire cart', () => {
    let cartCtx: ReturnType<typeof useCart>;
    renderWithProvider((ctx) => { cartCtx = ctx; });

    act(() => { cartCtx!.addToCart(mockItem); });
    act(() => { cartCtx!.addToCart({ ...mockItem, id: 'prod-2' }); });
    act(() => { cartCtx!.clearCart(); });

    expect(cartCtx!.cart).toHaveLength(0);
    expect(cartCtx!.getTotalItems()).toBe(0);
    expect(cartCtx!.getTotalPrice()).toBe(0);
  });

  it('calculates total price correctly with mixed quantities', () => {
    let cartCtx: ReturnType<typeof useCart>;
    renderWithProvider((ctx) => { cartCtx = ctx; });

    act(() => { cartCtx!.addToCart(mockItem); });
    act(() => { cartCtx!.addToCart(mockItem); });
    act(() => { cartCtx!.addToCart({ ...mockItem, id: 'prod-2', price: 100000 }); });

    expect(cartCtx!.getTotalPrice()).toBe(600000);
    expect(cartCtx!.getTotalItems()).toBe(3);
  });
});

describe('CartProvider localStorage persistence', () => {
  it('persists cart to localStorage', () => {
    let cartCtx: ReturnType<typeof useCart>;
    renderWithProvider((ctx) => { cartCtx = ctx; });

    act(() => { cartCtx!.addToCart(mockItem); });

    const stored = JSON.parse(localStorage.getItem('cart') || '[]');
    expect(stored).toHaveLength(1);
    expect(stored[0].id).toBe('prod-1-M');
  });

  it('restores cart from localStorage on mount', () => {
    localStorage.setItem('cart', JSON.stringify([{ ...mockItem, quantity: 3 }]));

    let cartCtx: ReturnType<typeof useCart>;
    renderWithProvider((ctx) => { cartCtx = ctx; });

    expect(cartCtx!.cart).toHaveLength(1);
    expect(cartCtx!.cart[0].quantity).toBe(3);
  });

  it('migrates string prices to numbers on load', () => {
    localStorage.setItem('cart', JSON.stringify([
      { ...mockItem, price: 'Rp 250.000', quantity: 1 },
    ]));

    let cartCtx: ReturnType<typeof useCart>;
    renderWithProvider((ctx) => { cartCtx = ctx; });

    expect(cartCtx!.cart[0].price).toBe(250000);
  });
});

describe('useCart outside provider', () => {
  it('throws error when used outside CartProvider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => {
      render(<TestConsumer onReady={() => {}} />);
    }).toThrow('useCart must be used within a CartProvider');
    spy.mockRestore();
  });
});
