'use client';
import { useCart } from '@/lib/cart-context';
import { ArrowLeft, Trash2, Plus, Minus, CreditCard, ShoppingBag } from '@/components/icons';
import { getStoredAdmins } from '@/lib/db';
import { formatPrice } from '@/lib/data';
import { useEffect, useState } from 'react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, getTotalItems, clearCart } = useCart();
  const [adminNumbers, setAdminNumbers] = useState<string[]>([]);

  useEffect(() => {
    setAdminNumbers(getStoredAdmins());
  }, []);

  const handleCheckout = () => {
    if (cart.length === 0) return;

    // Pick one admin number randomly (or rotate)
    const rawNumber = adminNumbers.length > 0 ? adminNumbers[Math.floor(Math.random() * adminNumbers.length)] : '085172003667';
    
    // Sanitize phone number for WhatsApp API (replace 08... with 628...)
    let waNumber = rawNumber.replace(/[^0-9]/g, '');
    if (waNumber.startsWith('0')) {
      waNumber = '62' + waNumber.substring(1);
    }

    // Build the order detail text
    let orderDetails = 'Halo Admin CPX Jersey, saya ingin melakukan pemesanan:\n\n*Detail Pesanan:*\n';
    
    cart.forEach((item, index) => {
      orderDetails += `${index + 1}. *${item.name}* (Qty: ${item.quantity}) - ${formatPrice(item.price)}\n`;
    });

    orderDetails += `\n*Subtotal:* ${formatPrice(getTotalPrice())}`;
    orderDetails += `\n*Pengiriman:* FREE (Seluruh Indonesia)`;
    orderDetails += `\n*Total Bayar:* ${formatPrice(getTotalPrice())}`;
    orderDetails += `\n\nMohon dibantu proses order saya ini. Terima kasih!`;

    const encodedText = encodeURIComponent(orderDetails);
    const waUrl = `https://api.whatsapp.com/send?phone=${waNumber}&text=${encodedText}`;

    // Redirect to WhatsApp
    window.open(waUrl, '_blank');

    // Clear the cart!
    clearCart();
  };

  if (cart.length === 0) {
    return (
      <div className="page cart-page" style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '80vh' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="cart-empty" style={{ textAlign: 'center', padding: '80px 20px' }}>
            <ShoppingBag style={{ width: '64px', height: '64px', opacity: 0.15, marginBottom: '20px' }} />
            <h2 style={{ font: '700 32px var(--font-oswald)', marginBottom: '10px' }}>YOUR CART IS EMPTY</h2>
            <p style={{ color: '#666', marginBottom: '30px' }}>Tambahkan beberapa produk menarik ke keranjang belanja Anda.</p>
            <a href="/products" className="btn primary">
              SHOP NOW
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page cart-page" style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ font: '700 clamp(32px, 4vw, 48px) var(--font-oswald)', letterSpacing: '-1px', marginBottom: '30px' }}>
          SHOPPING CART ({getTotalItems()})
        </h1>
        <div className="cart-content">
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>{item.type}</p>
                  <strong style={{ color: '#e3262e', fontSize: '15px' }}>{formatPrice(item.price)}</strong>
                </div>
                <div className="cart-item-quantity">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity">
                    <Minus style={{ width: '12px' }} />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity">
                    <Plus style={{ width: '12px' }} />
                  </button>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="remove-btn" aria-label="Remove item">
                  <Trash2 style={{ width: '18px' }} />
                </button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h2 style={{ font: '700 24px var(--font-oswald)', letterSpacing: '-0.5px', marginBottom: '20px' }}>ORDER SUMMARY</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <strong>{formatPrice(getTotalPrice())}</strong>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <strong style={{ color: '#4caf50' }}>FREE</strong>
            </div>
            <div className="summary-row total" style={{ borderTop: '2px solid #333', paddingTop: '20px', marginTop: '10px' }}>
              <span>Total</span>
              <strong style={{ color: '#e3262e', fontSize: '20px' }}>{formatPrice(getTotalPrice())}</strong>
            </div>
            <button className="btn primary checkout-btn" onClick={handleCheckout} style={{ marginTop: '20px' }}>
              ORDER VIA WHATSAPP <CreditCard />
            </button>
            <a href="/products" className="continue-shopping">
              Continue Shopping <ArrowLeft />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}