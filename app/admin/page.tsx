'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { ArrowRight, Check, Package, Share2, Star } from '@/components/icons';
import type { Product } from '@/lib/data';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

type Testimonial = { id: string; rating: number };

interface DashboardData {
  products: Product[];
  slides: unknown[];
  testimonials: Testimonial[];
  faqs: unknown[];
}

const emptyData: DashboardData = { products: [], slides: [], testimonials: [], faqs: [] };

const quickCards = [
  { key: 'products', label: 'Produk aktif', href: '/admin/products', icon: Package, tone: 'red' },
  { key: 'slides', label: 'Banner tayang', href: '/admin/slides', icon: Share2, tone: 'blue' },
  { key: 'testimonials', label: 'Testimonial', href: '/admin/testimonials', icon: Star, tone: 'amber' },
  { key: 'faqs', label: 'FAQ terbit', href: '/admin/faqs', icon: Check, tone: 'green' },
] as const;

const chartColors = ['#e3262e', '#171717', '#f0a129', '#315c8c', '#8f9389'];

export default function AdminOverviewPage() {
  const [data, setData] = useState<DashboardData>(emptyData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/products').then(r => r.json()),
      fetch('/api/slides').then(r => r.json()),
      fetch('/api/testimonials').then(r => r.json()),
      fetch('/api/faqs').then(r => r.json()),
    ])
      .then(([products, slides, testimonials, faqs]) => {
        setData({
          products: Array.isArray(products) ? products : [],
          slides: Array.isArray(slides) ? slides : [],
          testimonials: Array.isArray(testimonials) ? testimonials : [],
          faqs: Array.isArray(faqs) ? faqs : [],
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const counts = {
    products: data.products.length,
    slides: data.slides.length,
    testimonials: data.testimonials.length,
    faqs: data.faqs.length,
  };

  const customCount = data.products.filter(product => product.isCustom).length;
  const discountedCount = data.products.filter(product => product.discountPrice).length;
  const averageRating = data.testimonials.length
    ? data.testimonials.reduce((sum, item) => sum + (item.rating || 0), 0) / data.testimonials.length
    : 0;

  const categoryChart = useMemo(() => {
    const categories = data.products.reduce<Record<string, number>>((result, product) => {
      result[product.type || 'Lainnya'] = (result[product.type || 'Lainnya'] || 0) + 1;
      return result;
    }, {});
    const sorted = Object.entries(categories).sort((a, b) => b[1] - a[1]).slice(0, 5);
    return {
      labels: sorted.map(([label]) => label),
      datasets: [{ data: sorted.map(([, value]) => value), backgroundColor: chartColors, borderWidth: 0 }],
    };
  }, [data.products]);

  const contentChart = {
    labels: ['Produk', 'Banner', 'Testimonial', 'FAQ'],
    datasets: [{
      label: 'Jumlah konten',
      data: [counts.products, counts.slides, counts.testimonials, counts.faqs],
      backgroundColor: ['#e3262e', '#315c8c', '#f0a129', '#26735b'],
      borderRadius: 4,
      borderSkipped: false,
      barThickness: 24,
    }],
  };

  const recentProducts = [...data.products].slice(-4).reverse();

  return (
    <div className="admin-overview">
      <header className="admin-overview__header">
        <div>
          <p className="admin-eyebrow">CPX / CONTROL ROOM</p>
          <h1>Ringkasan operasional</h1>
          <p className="admin-overview__intro">Pantau katalog dan konten toko dari satu tampilan.</p>
        </div>
        <div className="admin-live"><span /> Data terhubung</div>
      </header>

      <section className="admin-metrics" aria-label="Ringkasan data">
        {quickCards.map(card => {
          const Icon = card.icon;
          return (
            <Link className={`admin-metric admin-metric--${card.tone}`} href={card.href} key={card.key}>
              <span className="admin-metric__icon"><Icon aria-hidden="true" /></span>
              <span className="admin-metric__value">{loading ? '—' : counts[card.key]}</span>
              <span className="admin-metric__label">{card.label}</span>
              <ArrowRight className="admin-metric__arrow" aria-hidden="true" />
            </Link>
          );
        })}
      </section>

      <section className="admin-chart-grid">
        <article className="admin-panel admin-panel--wide">
          <div className="admin-panel__head">
            <div><p>Komposisi konten</p><h2>Volume per modul</h2></div>
            <span>Live API</span>
          </div>
          <div className="admin-chart admin-chart--bar">
            <Bar data={contentChart} options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { display: false }, tooltip: { displayColors: false } },
              scales: {
                x: { grid: { display: false }, ticks: { color: '#72726d', font: { size: 11, weight: 600 } }, border: { display: false } },
                y: { beginAtZero: true, ticks: { precision: 0, color: '#94948e' }, grid: { color: '#ebe9e2' }, border: { display: false } },
              },
            }} />
          </div>
        </article>

        <article className="admin-panel">
          <div className="admin-panel__head">
            <div><p>Katalog</p><h2>5 tipe teratas</h2></div>
          </div>
          <div className="admin-doughnut-wrap">
            <div className="admin-chart admin-chart--doughnut">
              <Doughnut data={categoryChart} options={{
                responsive: true,
                maintainAspectRatio: false,
                cutout: '72%',
                plugins: { legend: { display: false }, tooltip: { displayColors: false } },
              }} />
              <div className="admin-chart-total"><strong>{counts.products}</strong><span>produk</span></div>
            </div>
            <div className="admin-chart-legend">
              {categoryChart.labels.map((label, index) => (
                <div key={label}><i style={{ backgroundColor: chartColors[index] }} /><span>{label}</span><b>{categoryChart.datasets[0].data[index]}</b></div>
              ))}
            </div>
          </div>
        </article>
      </section>

      <section className="admin-lower-grid">
        <article className="admin-panel">
          <div className="admin-panel__head">
            <div><p>Update terbaru</p><h2>Produk terakhir</h2></div>
            <Link href="/admin/products">Kelola <ArrowRight /></Link>
          </div>
          <div className="admin-product-list">
            {recentProducts.map(product => (
              <div className="admin-product-row" key={product.id}>
                <img src={product.image} alt="" />
                <div><strong>{product.name}</strong><span>{product.type}</span></div>
                <b>Rp {(product.discountPrice || product.price).toLocaleString('id-ID')}</b>
              </div>
            ))}
            {!loading && recentProducts.length === 0 && <p className="admin-empty">Belum ada produk.</p>}
          </div>
        </article>

        <article className="admin-panel admin-snapshot">
          <div className="admin-panel__head"><div><p>Kondisi katalog</p><h2>Snapshot</h2></div></div>
          <dl>
            <div><dt>Produk custom</dt><dd>{customCount}</dd></div>
            <div><dt>Harga promo</dt><dd>{discountedCount}</dd></div>
            <div><dt>Rating rata-rata</dt><dd>{averageRating ? averageRating.toFixed(1) : '—'}<small>/5</small></dd></div>
          </dl>
          <Link className="admin-primary-link" href="/admin/cms">Buka pengaturan CMS <ArrowRight /></Link>
        </article>
      </section>
    </div>
  );
}
