'use client';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, Menu, Search, ShoppingBag, X } from './icons';
import { useCart } from '@/lib/cart-context';
import { getStoredWishlist, CMSSettings } from '@/lib/db';
import { CartDrawer } from './cart-drawer';
import { WishlistDrawer } from './wishlist-drawer';

const links = ['New Drops', 'Products', 'Custom Jersey', 'Teams', 'About Us'];

export function Header({ initialCms }: { initialCms: CMSSettings }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const { getTotalItems } = useCart();
  const closeCart = useCallback(() => setCartOpen(false), []);
  const closeWishlist = useCallback(() => setWishlistOpen(false), []);

  const updateWishlistCount = () => {
    const list = getStoredWishlist();
    setWishlistCount(list.length);
  };

  useEffect(() => {
    updateWishlistCount();

    window.addEventListener('wishlist-update', updateWishlistCount);

    const handleCartOpen = () => setCartOpen(true);
    window.addEventListener('cart-open', handleCartOpen);

    return () => {
      window.removeEventListener('wishlist-update', updateWishlistCount);
      window.removeEventListener('cart-open', handleCartOpen);
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}#products`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const shopName = initialCms.shopName || 'CPX JERSEY';

  return (
    <>
      <div className="topbar">
        <span>FREE SHIPPING FOR ORDERS OVER IDR 500K</span>
        <span className="topbar-right">100% ORIGINAL · MADE IN INDONESIA</span>
      </div>

      <header className="header" style={{ position: 'relative' }}>
        <button
          className="icon-btn mobile-only"
          aria-label="Menu"
          onClick={() => setMenuOpen(true)}
        >
          <Menu />
        </button>

        <a className="logo" href="/" aria-label="CPX home">
          <Image
            src="/images/logo/icon_cpx.jpeg"
            alt="CPX Sport Wear Premium logo"
            width={150}
            height={46}
            priority
            className="brand-logo-image"
          />
          <span className="sr-only">{shopName}</span>
        </a>

        <nav>
          {links.map(x => (
            <a
              key={x}
              href={x === 'Custom Jersey' ? '/#custom' : x === 'Products' || x === 'New Drops' ? '/#products' : x === 'About Us' ? '/#story' : '/#teams'}
            >
              {x}
            </a>
          ))}
        </nav>

        <div className="actions">
          <button
            aria-label="Search"
            onClick={() => setSearchOpen(!searchOpen)}
            style={{ color: searchOpen ? '#e3262e' : '#fff' }}
          >
            <Search />
          </button>

          <button
            type="button"
            aria-label="Open wishlist"
            className="wishlist-button"
            onClick={() => setWishlistOpen(true)}
          >
            <Heart />
            {wishlistCount > 0 && <b>{wishlistCount}</b>}
          </button>

          <button type="button" className="bag" aria-label="Open cart" onClick={() => setCartOpen(true)}>
            <ShoppingBag />
            <b>{getTotalItems()}</b>
          </button>
        </div>

        {searchOpen && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: '#0c0c0d',
              borderTop: '1px solid #222',
              padding: '15px 4vw',
              zIndex: 99,
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <form onSubmit={handleSearchSubmit} style={{ width: '100%', display: 'flex', gap: '15px' }}>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Cari produk jersey, setelan, topi..."
                autoFocus
                style={{
                  flexGrow: 1,
                  background: '#151515',
                  border: '1px solid #333',
                  padding: '12px 20px',
                  borderRadius: '4px',
                  color: '#fff',
                  font: '14px var(--font-inter)'
                }}
              />
              <button
                type="submit"
                className="btn red"
                style={{ height: '44px', padding: '0 25px' }}
              >
                CARI
              </button>
            </form>
          </div>
        )}
      </header>

      {menuOpen && (
        <div className="mobile-menu">
          <button className="mobile-menu-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <X />
          </button>
          {links.map(x => (
            <a
              href={x === 'Custom Jersey' ? '/#custom' : x === 'Products' || x === 'New Drops' ? '/#products' : x === 'About Us' ? '/#story' : '/#teams'}
              onClick={() => setMenuOpen(false)}
              key={x}
            >
              {x}
            </a>
          ))}
          <button className="mobile-menu-link" type="button" onClick={() => { setMenuOpen(false); setWishlistOpen(true); }}>Wishlist ({wishlistCount})</button>
          <button className="mobile-menu-link" type="button" onClick={() => { setMenuOpen(false); setCartOpen(true); }}>Shopping Cart ({getTotalItems()})</button>
        </div>
      )}

      <WishlistDrawer open={wishlistOpen} onClose={closeWishlist} />
      <CartDrawer open={cartOpen} onClose={closeCart} />
    </>
  );
}
