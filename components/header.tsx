'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CircleUserRound, Heart, Menu, Search, ShoppingBag, X } from './icons';
import { useCart } from '@/lib/cart-context';
import { getStoredWishlist, CMSSettings } from '@/lib/db';

const links = ['New Drops', 'Products', 'Custom Jersey', 'Teams', 'About Us'];

export function Header() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cms, setCms] = useState<CMSSettings | null>(null);
  const { getTotalItems } = useCart();

  const updateWishlistCount = () => {
    const list = getStoredWishlist();
    setWishlistCount(list.length);
  };

  useEffect(() => {
    updateWishlistCount();
    fetch('/api/cms').then(r => r.json()).then(setCms);

    // Listen to custom wishlist updates from Product Cards
    window.addEventListener('wishlist-update', updateWishlistCount);

    // Listen to custom CMS updates
    const handleCmsUpdate = () => {
      fetch('/api/cms').then(r => r.json()).then(setCms);
    };
    window.addEventListener('cms-update', handleCmsUpdate);

    return () => {
      window.removeEventListener('wishlist-update', updateWishlistCount);
      window.removeEventListener('cms-update', handleCmsUpdate);
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const shopName = cms?.shopName || 'CPX JERSEY';
  const logoInitial = shopName.charAt(0);
  const logoFirstWord = shopName.split(' ')[0];
  const logoSubText = shopName.split(' ').slice(1).join(' ') || 'JERSEY';

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
          <span className="logo-mark">{logoInitial}</span>
          <span>{logoFirstWord}<small>{logoSubText}</small></span>
        </a>

        {/* Desktop Navigation */}
        <nav>
          {links.map(x => (
            <a 
              key={x} 
              href={x === 'Custom Jersey' ? '/#custom' : x === 'Products' || x === 'New Drops' ? '/products' : x === 'About Us' ? '/#story' : '/#teams'}
            >
              {x}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="actions">
          {/* Search Toggle */}
          <button 
            aria-label="Search" 
            onClick={() => setSearchOpen(!searchOpen)}
            style={{ color: searchOpen ? '#e3262e' : '#fff' }}
          >
            <Search />
          </button>

          {/* Wishlist Button with Indicator Dot */}
          <a 
            href="/dashboard?tab=wishlist" 
            aria-label="Wishlist" 
            className="desktop-icon" 
            style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
          >
            <Heart />
            {wishlistCount > 0 && (
              <span 
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#e3262e',
                  border: '1px solid #0c0c0d'
                }}
              />
            )}
          </a>

          {/* Account Button */}
          <a
            href="/admin"
            aria-label="Admin Panel"
            className="desktop-icon"
          >
            <CircleUserRound />
          </a>

          {/* Bag Cart Button */}
          <a href="/cart" className="bag" aria-label="Cart">
            <ShoppingBag />
            <b>{getTotalItems()}</b>
          </a>
        </div>

        {/* Expandable Search Bar Overlay */}
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

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <button onClick={() => setMenuOpen(false)}>
            <X />
          </button>
          {links.map(x => (
            <a 
              href={x === 'Custom Jersey' ? '/#custom' : x === 'Products' || x === 'New Drops' ? '/products' : x === 'About Us' ? '/#story' : '/#teams'} 
              onClick={() => setMenuOpen(false)} 
              key={x}
            >
              {x}
            </a>
          ))}
          <a href="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</a>
          <a href="/cart" onClick={() => setMenuOpen(false)}>Shopping Cart ({getTotalItems()})</a>
        </div>
      )}
    </>
  );
}
