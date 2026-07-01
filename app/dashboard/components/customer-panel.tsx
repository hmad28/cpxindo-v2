'use client';
import { useState, useEffect } from 'react';
import { User, Package, Clock, MapPin, Heart, Trash2 } from '@/components/icons';
import { getStoredWishlist, saveWishlist } from '@/lib/db';
import { Product } from '@/lib/data';
import { useCart } from '@/lib/cart-context';

export function CustomerDashboard({
  subTab,
  setSubTab
}: {
  subTab: 'profile' | 'orders' | 'wishlist';
  setSubTab: (tab: 'profile' | 'orders' | 'wishlist') => void
}) {
  const { addToCart } = useCart();
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [addedNotifyId, setAddedNotifyId] = useState<string | null>(null);

  useEffect(() => {
    const listIds = getStoredWishlist();
    setWishlistIds(listIds);

    fetch('/api/products').then(r => r.json()).then((allProducts: Product[]) => {
      const filtered = allProducts.filter(p => listIds.includes(p.id));
      setWishlistItems(filtered);
    });
  }, []);

  const handleRemoveWishlist = (id: string) => {
    const updatedIds = wishlistIds.filter(itemId => itemId !== id);
    setWishlistIds(updatedIds);
    saveWishlist(updatedIds);

    const updatedItems = wishlistItems.filter(item => item.id !== id);
    setWishlistItems(updatedItems);

    window.dispatchEvent(new Event('wishlist-update'));
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: `${product.id}-M`,
      name: `${product.name} (M)`,
      type: product.type,
      price: product.discountPrice || product.price,
      image: product.image,
      colors: product.colors
    });
    setAddedNotifyId(product.id);
    setTimeout(() => setAddedNotifyId(null), 2000);
  };

  return (
    <div className="dashboard-layout-grid">
      {/* Sidebar navigation */}
      <div style={{ background: '#fff', padding: '25px', borderRadius: '8px', border: '1px solid #eee', display: 'flex', flexDirection: 'column', gap: '10px', boxShadow: '0 4px 20px -2px rgba(0,0,0,0.03)' }}>
        <h3 style={{ font: '700 18px var(--font-oswald)', borderBottom: '1px solid #eee', paddingBottom: '10px', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>MENU AKUN</h3>
        <button
          onClick={() => setSubTab('profile')}
          style={{
            padding: '12px 15px',
            textAlign: 'left',
            background: subTab === 'profile' ? '#f5f4f0' : 'none',
            border: 'none',
            font: '600 13px var(--font-inter)',
            color: '#111',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            transition: 'all 0.2s'
          }}
        >
          <User style={{ width: '16px' }} /> Profil Saya
        </button>
        <button
          onClick={() => setSubTab('orders')}
          style={{
            padding: '12px 15px',
            textAlign: 'left',
            background: subTab === 'orders' ? '#f5f4f0' : 'none',
            border: 'none',
            font: '600 13px var(--font-inter)',
            color: '#111',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            transition: 'all 0.2s'
          }}
        >
          <Package style={{ width: '16px' }} /> Pesanan Saya
        </button>
        <button
          onClick={() => setSubTab('wishlist')}
          style={{
            padding: '12px 15px',
            textAlign: 'left',
            background: subTab === 'wishlist' ? '#f5f4f0' : 'none',
            border: 'none',
            font: '600 13px var(--font-inter)',
            color: '#111',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            transition: 'all 0.2s'
          }}
        >
          <Heart style={{ width: '16px', color: '#e3262e', fill: subTab === 'wishlist' ? 'currentColor' : 'none' }} /> Wishlist ({wishlistIds.length})
        </button>
      </div>

      {/* Main Content Areas */}
      <div style={{ background: '#fff', padding: '30px', borderRadius: '8px', border: '1px solid #eee', minHeight: '400px', boxShadow: '0 4px 20px -2px rgba(0,0,0,0.03)' }}>

        {/* SUBTAB 1: PROFILE */}
        {subTab === 'profile' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#151515', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '24px' }}>G</div>
              <div>
                <h2 style={{ font: '700 24px var(--font-oswald)', margin: 0, textTransform: 'uppercase' }}>GUEST USER</h2>
                <p style={{ margin: 0, color: '#666', fontSize: '13px' }}>Selamat datang di panel pelanggan CPX Jersey.</p>
              </div>
            </div>
            <div className="profile-info-grid" style={{ borderTop: '1px solid #eee', paddingTop: '20px' }}>
              <div>
                <span style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: '#888', fontWeight: '700', marginBottom: '5px' }}>Nama Lengkap</span>
                <strong>Guest / Tamu</strong>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: '#888', fontWeight: '700', marginBottom: '5px' }}>No. Handphone</span>
                <strong>-</strong>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <span style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: '#888', fontWeight: '700', marginBottom: '5px' }}>Alamat Default Pengiriman</span>
                <strong>Belum ada alamat pengiriman yang terdaftar.</strong>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 2: ORDERS */}
        {subTab === 'orders' && (
          <div>
            <h2 style={{ font: '700 24px var(--font-oswald)', margin: '0 0 20px 0', textTransform: 'uppercase' }}>PESANAN SAYA</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="order-card" style={{ margin: 0 }}>
                <div className="order-header">
                  <span className="order-id">#ORD-2026-042</span>
                  <span className="order-status delivered">Delivered</span>
                </div>
                <div className="order-details">
                  <div className="order-item">
                    <span className="order-type">Set Jersey Sport + Celana &quot;Dont Quit&quot; (L)</span>
                    <span className="order-qty">x 1</span>
                    <span className="order-price">IDR 199.000</span>
                  </div>
                  <div className="order-meta">
                    <span><Clock /> Ordered: 15 Jun 2026</span>
                    <span><MapPin /> Delivered: 18 Jun 2026</span>
                  </div>
                </div>
              </div>
              <div className="order-card" style={{ margin: 0 }}>
                <div className="order-header">
                  <span className="order-id">#ORD-2026-074</span>
                  <span className="order-status transit">In Transit</span>
                </div>
                <div className="order-details">
                  <div className="order-item">
                    <span className="order-type">Jersey Custom XC (XL)</span>
                    <span className="order-qty">x 12</span>
                    <span className="order-price">IDR 1.500.000</span>
                  </div>
                  <div className="order-meta">
                    <span><Clock /> Ordered: 24 Jun 2026</span>
                    <span><MapPin /> Expected: 30 Jun 2026</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 3: WISHLIST */}
        {subTab === 'wishlist' && (
          <div>
            <h2 style={{ font: '700 24px var(--font-oswald)', margin: '0 0 25px 0', textTransform: 'uppercase' }}>WISHLIST SAYA</h2>
            {wishlistItems.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {wishlistItems.map(item => {
                  const priceText = `IDR ${(item.discountPrice || item.price).toLocaleString('id-ID')}`;
                  return (
                    <div
                      key={item.id}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '80px 1fr auto',
                        alignItems: 'center',
                        gap: '20px',
                        borderBottom: '1px solid #eee',
                        paddingBottom: '20px'
                      }}
                    >
                      <div style={{ position: 'relative', width: '80px', height: '80px', borderRadius: '6px', overflow: 'hidden' }}>
                        <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div>
                        <h4 style={{ margin: '0 0 5px 0', fontSize: '15px', fontWeight: '700' }}>{item.name}</h4>
                        <p style={{ margin: '0 0 5px 0', fontSize: '11px', color: '#666' }}>{item.type}</p>
                        <strong style={{ color: '#e3262e', fontSize: '14px' }}>{priceText}</strong>
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                          className="btn primary"
                          onClick={() => handleAddToCart(item)}
                          style={{ height: '36px', padding: '0 15px', fontSize: '10px', borderRadius: '4px' }}
                        >
                          {addedNotifyId === item.id ? 'ADDED!' : 'BUY'}
                        </button>
                        <button
                          onClick={() => handleRemoveWishlist(item.id)}
                          style={{
                            background: 'none',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            color: '#888',
                            padding: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.borderColor = '#e3262e';
                            e.currentTarget.style.color = '#e3262e';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.borderColor = '#ddd';
                            e.currentTarget.style.color = '#888';
                          }}
                        >
                          <Trash2 style={{ width: '14px' }} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ textDecoration: 'none', textAlign: 'center', padding: '60px 20px', border: '1px dashed #ddd', borderRadius: '8px' }}>
                <Heart style={{ width: '48px', height: '48px', opacity: 0.15, marginBottom: '15px' }} />
                <h3 style={{ font: '700 18px var(--font-oswald)', margin: '0 0 5px 0', textTransform: 'uppercase' }}>WISHLIST KOSONG</h3>
                <p style={{ color: '#666', fontSize: '13px', margin: '0 0 20px 0' }}>Anda belum menyukai produk apapun.</p>
                <a href="/products" className="btn primary" style={{ height: '38px', padding: '0 20px', borderRadius: '4px' }}>LIHAT PRODUK</a>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
