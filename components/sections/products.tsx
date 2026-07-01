'use client';
import { useState, useEffect } from 'react';
import { ProductCard } from '../product-card';
import { ArrowRight } from '../icons';
import { sports, Sport, Product } from '../../lib/data';

export function Products() {
  const [sport, setSport] = useState<Sport>('All');
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products').then(r => r.json()).then(setItems);
  }, []);

  const filteredProducts = sport === 'All'
    ? items
    : items.filter(p => 
        p.type.toLowerCase().includes(sport.toLowerCase()) ||
        (p.suitableFor && p.suitableFor.some(s => s.toLowerCase() === sport.toLowerCase()))
      );

  return (
    <section className="section products" id="products">
      <div className="section-head">
        <div>
          <span className="kicker">LATEST COLLECTION</span>
          <h2>GEAR UP. <em>STAND OUT.</em></h2>
        </div>
        <a href="/products">VIEW ALL PRODUCTS <ArrowRight /></a>
      </div>
      <div className="filters">
        {sports.map(s => (
          <button
            className={sport === s ? 'active' : ''}
            onClick={() => setSport(s)}
            key={s}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="product-grid">
        {filteredProducts.map(p => <ProductCard product={p} key={p.id} />)}
      </div>
    </section>
  );
}