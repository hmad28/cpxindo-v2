'use client';
import { ProductCard } from '@/components/product-card';
import { Grid, List } from '@/components/icons';
import { sports, Product } from '@/lib/data';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div style={{ paddingTop: '150px', textAlign: 'center', minHeight: '80vh', font: '700 16px var(--font-inter)' }}>
        Loading Products Catalog...
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState<string>('All');
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products').then(r => r.json()).then(setItems);
  }, []);

  // Filter products by sport category AND search query
  const filteredProducts = items.filter(p => {
    // 1. Sport category match
    const categoryMatch = filter === 'All' || 
      p.type.toLowerCase().includes(filter.toLowerCase()) ||
      (p.suitableFor && p.suitableFor.some(s => s.toLowerCase() === filter.toLowerCase()));
      
    // 2. Search query match
    const searchMatch = !searchQuery || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    return categoryMatch && searchMatch;
  });

  return (
    <div className="page products-page" style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="page-header" style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <span className="kicker" style={{ color: '#e3262e' }}>CPX KATALOG</span>
            <h1 style={{ font: '700 clamp(32px, 4vw, 48px) var(--font-oswald)', letterSpacing: '-1px', margin: '5px 0 0' }}>
              {searchQuery ? `SEARCH RESULTS FOR "${searchQuery.toUpperCase()}"` : 'ALL PRODUCTS'}
            </h1>
          </div>
          <div className="view-controls" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ display: 'flex', border: '1px solid #eee', borderRadius: '4px', overflow: 'hidden' }}>
              <button 
                onClick={() => setViewMode('grid')} 
                className={viewMode === 'grid' ? 'active' : ''}
                style={{
                  padding: '10px 15px',
                  background: viewMode === 'grid' ? '#151515' : 'transparent',
                  color: viewMode === 'grid' ? '#fff' : '#111',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex'
                }}
              >
                <Grid style={{ width: '16px', height: '16px' }} />
              </button>
              <button 
                onClick={() => setViewMode('list')} 
                className={viewMode === 'list' ? 'active' : ''}
                style={{
                  padding: '10px 15px',
                  background: viewMode === 'list' ? '#151515' : 'transparent',
                  color: viewMode === 'list' ? '#fff' : '#111',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex'
                }}
              >
                <List style={{ width: '16px', height: '16px' }} />
              </button>
            </div>
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)} 
              className="filter-select"
              style={{
                padding: '10px 15px',
                border: '1px solid #eee',
                borderRadius: '4px',
                font: '600 13px var(--font-inter)',
                background: '#fff',
                cursor: 'pointer'
              }}
            >
              <option value="All">All Sports</option>
              {sports.filter(s => s !== 'All').map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={`product-list ${viewMode}`}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard product={product} key={product.id} />
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '80px 0', border: '1px dashed #ddd', borderRadius: '8px', width: '100%' }}>
              <p style={{ color: '#666', fontSize: '15px', margin: 0 }}>Tidak ada produk yang cocok dengan pencarian Anda.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}