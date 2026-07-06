'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductCard } from '../product-card';
import { ArrowLeft, ArrowRight } from '../icons';
import { sports, Sport, Product } from '../../lib/data';

const PRODUCTS_PER_PAGE = 8;

export function Products() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const [sport, setSport] = useState<Sport>('All');
  const [items, setItems] = useState<Product[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch('/api/products').then(r => r.json()).then(setItems);
  }, []);

  useEffect(() => {
    setPage(1);
  }, [sport, searchQuery]);

  const filteredProducts = items.filter((product) => {
    const sportMatch = sport === 'All' ||
      product.type.toLowerCase().includes(sport.toLowerCase()) ||
      (product.suitableFor && product.suitableFor.some((item) => item.toLowerCase() === sport.toLowerCase()));

    const searchMatch = !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    return sportMatch && searchMatch;
  });

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const visibleProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  return (
    <section className="section products" id="products">
      <div className="section-head">
        <div>
          <span className="kicker">LATEST COLLECTION</span>
          <h2>{searchQuery ? `SEARCH: ${searchQuery.toUpperCase()}` : <>GEAR UP. <em>STAND OUT.</em></>}</h2>
        </div>
        <span className="products-count">{filteredProducts.length} PRODUCTS</span>
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
        {visibleProducts.map(p => <ProductCard product={p} key={p.id} />)}
      </div>
      {filteredProducts.length === 0 && (
        <p className="products-empty">Tidak ada produk yang cocok.</p>
      )}
      {totalPages > 1 && (
        <div className="products-pagination" aria-label="Products pagination">
          <button
            type="button"
            aria-label="Previous products page"
            onClick={() => setPage((value) => Math.max(1, value - 1))}
            disabled={currentPage === 1}
          >
            <ArrowLeft />
          </button>
          <span>{currentPage} / {totalPages}</span>
          <button
            type="button"
            aria-label="Next products page"
            onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
            disabled={currentPage === totalPages}
          >
            <ArrowRight />
          </button>
        </div>
      )}
    </section>
  );
}
