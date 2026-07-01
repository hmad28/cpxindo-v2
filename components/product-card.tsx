'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Heart, Plus, X, ArrowLeft, ArrowRight, ShieldCheck, Check } from './icons';
import { useCart } from '@/lib/cart-context';
import { Product, formatPrice } from '@/lib/data';
import { getStoredWishlist, saveWishlist } from '@/lib/db';

export function ProductCard({ product }: { product: Product }) {
  const [liked, setLiked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [addedNotify, setAddedNotify] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const list = getStoredWishlist();
    setLiked(list.includes(product.id));
  }, [product.id]);

  const handleToggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    const list = getStoredWishlist();
    let updated: string[];
    if (liked) {
      updated = list.filter(id => id !== product.id);
    } else {
      updated = [...list, product.id];
    }
    saveWishlist(updated);
    setLiked(!liked);
    
    // Dispatch a custom event to update the header wishlist dot
    window.dispatchEvent(new Event('wishlist-update'));
  };

  const formattedPrice = formatPrice(product.discountPrice || product.price);
  const formattedOriginalPrice = formatPrice(product.price);

  const handleAddToCart = () => {
    addToCart({
      id: `${product.id}-${selectedSize}`,
      name: `${product.name} (${selectedSize})`,
      type: product.type,
      price: product.discountPrice || product.price,
      image: product.images[0] || product.image,
      colors: product.colors
    });

    setAddedNotify(true);
    setTimeout(() => setAddedNotify(false), 2000);
  };

  const handleNextImage = () => {
    if (product.images && product.images.length > 0) {
      setActiveImgIndex((activeImgIndex + 1) % product.images.length);
    }
  };

  const handlePrevImage = () => {
    if (product.images && product.images.length > 0) {
      setActiveImgIndex((activeImgIndex - 1 + product.images.length) % product.images.length);
    }
  };

  return (
    <>
      <article className="product-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div className="product-image" style={{ cursor: 'pointer', position: 'relative' }} onClick={() => setShowModal(true)}>
          {product.tag && <span className="tag">{product.tag}</span>}
          <button
            onClick={handleToggleLike}
            className={`heart ${liked ? 'liked' : ''}`}
            aria-label="Wishlist"
          >
            <Heart fill={liked ? 'currentColor' : 'none'} />
          </button>
          <Image src={product.image} alt={product.name} fill sizes="(max-width: 700px) 85vw, 25vw" style={{ objectFit: 'cover' }} />
        </div>
        <div className="product-meta" style={{ flexGrow: 1, padding: '15px 0' }}>
          <div>
            <p style={{ margin: '0 0 5px 0', fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{product.type}</p>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', cursor: 'pointer' }} onClick={() => setShowModal(true)}>{product.name}</h3>
          </div>
          <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <strong style={{ fontSize: '16px', color: '#e3262e' }}>{formattedPrice}</strong>
            {product.discountPrice && (
              <span style={{ fontSize: '13px', color: '#aaa', textDecoration: 'line-through' }}>{formattedOriginalPrice}</span>
            )}
          </div>
        </div>
        <div className="colors" style={{ paddingBottom: '15px' }}>
          <div className="color-dots">
            {product.colors.map(c => <span key={c} style={{ background: c, display: 'inline-block', width: '12px', height: '12px', borderRadius: '50%', border: '1px solid #ddd', marginRight: '4px' }} />)}
          </div>
          <span>{product.colors.length} colors</span>
        </div>
        <button className="btn primary add-to-cart" onClick={handleAddToCart}>
          {addedNotify ? 'ADDED TO SQUAD!' : 'ADD TO CART'} <Plus />
        </button>
      </article>

      {/* Lightbox / Product Detail Modal */}
      {showModal && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(5px)',
            padding: '20px',
            overflowY: 'auto'
          }}
          onClick={() => setShowModal(false)}
        >
          <div 
            style={{
              background: '#fff',
              width: '100%',
              maxWidth: '1050px',
              borderRadius: '12px',
              overflow: 'hidden',
              position: 'relative',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
              color: '#111'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: '#151515',
                border: 'none',
                color: '#fff',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#e3262e'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#151515'}
            >
              <X style={{ width: '20px', height: '20px' }} />
            </button>

            {/* Left Column: Image Viewer */}
            <div style={{ background: '#f9f9f9', padding: '40px', display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center' }}>
              <div style={{ position: 'relative', width: '100%', height: '420px', borderRadius: '8px', overflow: 'hidden' }}>
                <Image 
                  src={product.images[activeImgIndex] || product.image} 
                  alt={product.name} 
                  fill 
                  sizes="50vw" 
                  style={{ objectFit: 'cover' }}
                />
                
                {/* Navigation Arrows */}
                {product.images && product.images.length > 1 && (
                  <>
                    <button 
                      onClick={handlePrevImage}
                      style={{
                        position: 'absolute',
                        left: '15px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'rgba(255,255,255,0.9)',
                        border: 'none',
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                      }}
                    >
                      <ArrowLeft style={{ width: '16px', height: '16px', color: '#111' }} />
                    </button>
                    <button 
                      onClick={handleNextImage}
                      style={{
                        position: 'absolute',
                        right: '15px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'rgba(255,255,255,0.9)',
                        border: 'none',
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                      }}
                    >
                      <ArrowRight style={{ width: '16px', height: '16px', color: '#111' }} />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails (Sistem Multiple Images: 5-8 images support) */}
              {product.images && product.images.length > 1 && (
                <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '5px' }}>
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImgIndex(idx)}
                      style={{
                        position: 'relative',
                        width: '60px',
                        height: '60px',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        flexShrink: 0,
                        border: activeImgIndex === idx ? '2px solid #e3262e' : '2px solid transparent',
                        padding: 0,
                        cursor: 'pointer',
                        background: '#fff'
                      }}
                    >
                      <Image src={img} alt={`thumbnail-${idx}`} fill style={{ objectFit: 'cover' }} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Details & Custom Settings */}
            <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span className="kicker" style={{ color: '#e3262e', marginBottom: '10px', display: 'inline-block' }}>{product.type}</span>
                <h2 style={{ font: '700 32px/1.1 var(--font-oswald)', letterSpacing: '-1px', margin: '0 0 15px 0' }}>{product.name}</h2>
                
                {/* Pricing / Discount */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                  <span style={{ font: '700 24px var(--font-inter)', color: '#e3262e' }}>{formattedPrice}</span>
                  {product.discountPrice && (
                    <span style={{ fontSize: '16px', color: '#aaa', textDecoration: 'line-through' }}>{formattedOriginalPrice}</span>
                  )}
                  {product.tag && (
                    <span style={{ fontSize: '10px', fontWeight: '800', background: '#f5f4f0', padding: '4px 10px', borderRadius: '4px', letterSpacing: '0.5px' }}>{product.tag}</span>
                  )}
                </div>

                <p style={{ color: '#555', fontSize: '14px', lineHeight: '1.6', margin: '0 0 20px 0' }}>{product.description}</p>

                {/* Materials & Fabric Specifications */}
                {(product.materialJersey || product.materialCelana) && (
                  <div style={{ background: '#fdfdfd', border: '1px dashed #ddd', padding: '15px', borderRadius: '6px', marginBottom: '25px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#e3262e' }}>
                      <ShieldCheck style={{ width: '16px' }} />
                      <strong style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Spesifikasi Material Premium</strong>
                    </div>
                    {product.materialJersey && (
                      <p style={{ margin: '0 0 5px 0', fontSize: '12px', color: '#444' }}><strong>Jersey:</strong> {product.materialJersey}</p>
                    )}
                    {product.materialCelana && (
                      <p style={{ margin: 0, fontSize: '12px', color: '#444' }}><strong>Celana:</strong> {product.materialCelana}</p>
                    )}
                  </div>
                )}

                {/* Custom order warning */}
                {product.isCustom && (
                  <div style={{ background: '#fff5f5', borderLeft: '3px solid #e3262e', padding: '12px 15px', borderRadius: '4px', marginBottom: '25px', fontSize: '12px', color: '#c91b22' }}>
                    <strong>INFO CUSTOM:</strong> Minimal pemesanan adalah 6 pcs. Pemesanan di bawah batas minimal (1 pcs) dikenakan tambahan biaya desain Rp 10.000. Estimasi proses pengerjaan 10 hari kerja.
                  </div>
                )}

                {/* Color Dot Choices */}
                <div style={{ marginBottom: '25px' }}>
                  <span style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.5px', color: '#888', marginBottom: '8px' }}>Pilihan Warna</span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {product.colors.map(color => (
                      <span key={color} style={{ display: 'block', width: '22px', height: '22px', borderRadius: '50%', background: color, border: '2px solid #fff', boxShadow: '0 0 0 1px #ccc' }} />
                    ))}
                  </div>
                </div>

                {/* Size Choices */}
                <div style={{ marginBottom: '30px' }}>
                  <span style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.5px', color: '#888', marginBottom: '8px' }}>Pilih Ukuran</span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        style={{
                          width: '45px',
                          height: '45px',
                          border: selectedSize === size ? '2px solid #e3262e' : '1px solid #ccc',
                          background: selectedSize === size ? '#fff' : 'transparent',
                          color: selectedSize === size ? '#e3262e' : '#111',
                          fontWeight: '700',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Add to Cart Actions */}
              <div style={{ borderTop: '1px solid #eee', paddingTop: '20px', display: 'flex', gap: '15px' }}>
                <button 
                  onClick={handleAddToCart}
                  style={{
                    flexGrow: 1,
                    background: addedNotify ? '#4caf50' : '#151515',
                    color: '#fff',
                    border: 'none',
                    height: '50px',
                    borderRadius: '6px',
                    font: '700 13px/1 var(--font-inter)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => { if (!addedNotify) e.currentTarget.style.background = '#e3262e'; }}
                  onMouseLeave={(e) => { if (!addedNotify) e.currentTarget.style.background = '#151515'; }}
                >
                  {addedNotify ? (
                    <>
                      ADDED TO SQUAD! <Check style={{ width: '16px', height: '16px' }} />
                    </>
                  ) : (
                    <>
                      ADD TO CART <Plus style={{ width: '16px', height: '16px' }} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
