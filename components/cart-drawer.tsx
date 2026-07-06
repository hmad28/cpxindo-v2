'use client';
import { useEffect, useState } from 'react';
import { CreditCard, Minus, Plus, ShoppingBag, Trash2, X } from './icons';
import { useCart } from '@/lib/cart-context';
import { getStoredAdmins } from '@/lib/db';
import { formatPrice } from '@/lib/data';

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, getTotalItems, clearCart } = useCart();
  const [adminNumbers, setAdminNumbers] = useState<string[]>([]);

  useEffect(() => {
    setAdminNumbers(getStoredAdmins());
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeydown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [open, onClose]);

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const rawNumber = adminNumbers.length > 0 ? adminNumbers[Math.floor(Math.random() * adminNumbers.length)] : '085172003667';
    let waNumber = rawNumber.replace(/[^0-9]/g, '');
    if (waNumber.startsWith('0')) {
      waNumber = `62${waNumber.substring(1)}`;
    }

    let orderDetails = 'Halo Admin CPX Jersey, saya ingin melakukan pemesanan:\n\n*Detail Pesanan:*\n';
    cart.forEach((item, index) => {
      orderDetails += `${index + 1}. *${item.name}* (Qty: ${item.quantity}) - ${formatPrice(item.price)}\n`;
    });
    orderDetails += `\n*Subtotal:* ${formatPrice(getTotalPrice())}`;
    orderDetails += `\n*Pengiriman:* FREE (Seluruh Indonesia)`;
    orderDetails += `\n*Total Bayar:* ${formatPrice(getTotalPrice())}`;
    orderDetails += `\n\nMohon dibantu proses order saya ini. Terima kasih!`;

    window.open(`https://api.whatsapp.com/send?phone=${waNumber}&text=${encodeURIComponent(orderDetails)}`, '_blank');
    clearCart();
    onClose();
  };

  if (!open) return null;

  return (
    <div className="cart-drawer-root">
      <button className="cart-drawer-backdrop" type="button" aria-label="Close cart" onClick={onClose} />
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-label="Shopping cart">
        <div className="cart-drawer-header">
          <div>
            <span className="cart-drawer-kicker">CPX CHECKOUT</span>
            <h2>YOUR CART</h2>
          </div>
          <button type="button" className="cart-drawer-close" aria-label="Close cart" onClick={onClose}>
            <X />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-drawer-empty">
            <ShoppingBag />
            <strong>Keranjang masih kosong</strong>
            <p>Tambahkan produk dari katalog, lalu checkout via WhatsApp.</p>
            <a href="/#products" onClick={onClose}>SHOP NOW</a>
          </div>
        ) : (
          <>
            <div className="cart-drawer-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-drawer-item">
                  <div className="cart-drawer-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="cart-drawer-details">
                    <h3>{item.name}</h3>
                    <p>{item.type}</p>
                    <strong>{formatPrice(item.price)}</strong>
                    <div className="cart-drawer-quantity">
                      <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity">
                        <Minus />
                      </button>
                      <span>{item.quantity}</span>
                      <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity">
                        <Plus />
                      </button>
                    </div>
                  </div>
                  <button type="button" className="cart-drawer-remove" onClick={() => removeFromCart(item.id)} aria-label="Remove item">
                    <Trash2 />
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-drawer-summary">
              <div>
                <span>Items</span>
                <strong>{getTotalItems()}</strong>
              </div>
              <div>
                <span>Shipping</span>
                <strong className="free">FREE</strong>
              </div>
              <div className="cart-drawer-total">
                <span>Total</span>
                <strong>{formatPrice(getTotalPrice())}</strong>
              </div>
              <button type="button" className="btn primary cart-drawer-checkout" onClick={handleCheckout}>
                ORDER VIA WHATSAPP <CreditCard />
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

