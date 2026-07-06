'use client';
import { useEffect, useState } from 'react';
import { Heart, ShoppingBag, Trash2, X } from './icons';
import { useCart } from '@/lib/cart-context';
import { getStoredWishlist, saveWishlist } from '@/lib/db';
import { formatPrice, Product } from '@/lib/data';

export function WishlistDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { addToCart } = useCart();
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [items, setItems] = useState<Product[]>([]);

  const refreshWishlistIds = () => {
    setWishlistIds(getStoredWishlist());
  };

  const loadWishlistItems = () => {
    const ids = getStoredWishlist();
    setWishlistIds(ids);
    if (ids.length === 0) {
      setItems([]);
      return;
    }
    fetch('/api/products')
      .then((response) => response.json())
      .then((products: Product[] | unknown) => {
        if (!Array.isArray(products)) {
          setItems([]);
          return;
        }
        setItems(products.filter((product) => ids.includes(product.id)));
      })
      .catch(() => setItems([]));
  };

  useEffect(() => {
    refreshWishlistIds();
    window.addEventListener('wishlist-update', refreshWishlistIds);
    return () => window.removeEventListener('wishlist-update', refreshWishlistIds);
  }, []);

  useEffect(() => {
    if (!open) return;
    loadWishlistItems();
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

  const removeItem = (id: string) => {
    const nextIds = wishlistIds.filter((itemId) => itemId !== id);
    saveWishlist(nextIds);
    setWishlistIds(nextIds);
    setItems((current) => current.filter((item) => item.id !== id));
    window.dispatchEvent(new Event('wishlist-update'));
  };

  const moveToCart = (product: Product) => {
    addToCart({
      id: `${product.id}-M`,
      name: `${product.name} (M)`,
      type: product.type,
      price: product.discountPrice || product.price,
      image: product.images[0] || product.image,
      colors: product.colors,
    });
    onClose();
    window.dispatchEvent(new Event('cart-open'));
  };

  if (!open) return null;

  return (
    <div className="wishlist-drawer-root">
      <button className="wishlist-drawer-backdrop" type="button" aria-label="Close wishlist" onClick={onClose} />
      <aside className="wishlist-drawer" role="dialog" aria-modal="true" aria-label="Wishlist">
        <div className="wishlist-drawer-header">
          <div>
            <span className="wishlist-drawer-kicker">CPX FAVORITES</span>
            <h2>WISHLIST</h2>
          </div>
          <button type="button" className="wishlist-drawer-close" aria-label="Close wishlist" onClick={onClose}>
            <X />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="wishlist-drawer-empty">
            <Heart />
            <strong>Wishlist kosong</strong>
            <p>Simpan produk favorit dari katalog untuk dilihat lagi nanti.</p>
            <a href="/#products" onClick={onClose}>LIHAT PRODUK</a>
          </div>
        ) : (
          <div className="wishlist-drawer-items">
            {items.map((item) => (
              <div key={item.id} className="wishlist-drawer-item">
                <div className="wishlist-drawer-image">
                  <img src={item.images[0] || item.image} alt={item.name} />
                </div>
                <div className="wishlist-drawer-details">
                  <h3>{item.name}</h3>
                  <p>{item.type}</p>
                  <strong>{formatPrice(item.discountPrice || item.price)}</strong>
                  <div className="wishlist-drawer-actions-row">
                    <button type="button" onClick={() => moveToCart(item)}>
                      ADD TO CART <ShoppingBag />
                    </button>
                    <button type="button" className="wishlist-drawer-remove" onClick={() => removeItem(item.id)} aria-label="Remove wishlist item">
                      <Trash2 />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </aside>
    </div>
  );
}




