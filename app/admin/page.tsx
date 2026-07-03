'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Package, Share2, Star, Check, FileText, Phone, LayoutDashboard } from '@/components/icons';

interface Counts {
  products: number;
  slides: number;
  testimonials: number;
  faqs: number;
}

const cards = [
  { key: 'products', label: 'Katalog Produk', href: '/admin/products', icon: Package, color: '#e3262e' },
  { key: 'slides', label: 'Banner Slider', href: '/admin/slides', icon: Share2, color: '#2563eb' },
  { key: 'testimonials', label: 'Testimonial', href: '/admin/testimonials', icon: Star, color: '#f59e0b' },
  { key: 'faqs', label: 'FAQ Manager', href: '/admin/faqs', icon: Check, color: '#10b981' },
] as const;

const links = [
  { label: 'CMS Settings', href: '/admin/cms', icon: FileText },
  { label: 'WhatsApp', href: '/admin/whatsapp', icon: Phone },
];

export default function AdminOverviewPage() {
  const [counts, setCounts] = useState<Counts>({ products: 0, slides: 0, testimonials: 0, faqs: 0 });

  useEffect(() => {
    Promise.all([
      fetch('/api/products').then(r => r.json()),
      fetch('/api/slides').then(r => r.json()),
      fetch('/api/testimonials').then(r => r.json()),
      fetch('/api/faqs').then(r => r.json()),
    ]).then(([products, slides, testimonials, faqs]) => {
      setCounts({
        products: Array.isArray(products) ? products.length : 0,
        slides: Array.isArray(slides) ? slides.length : 0,
        testimonials: Array.isArray(testimonials) ? testimonials.length : 0,
        faqs: Array.isArray(faqs) ? faqs.length : 0,
      });
    });
  }, []);

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ font: '700 24px var(--font-oswald)', textTransform: 'uppercase', letterSpacing: '-0.5px', margin: 0 }}>
          <LayoutDashboard style={{ width: '22px', verticalAlign: 'middle', marginRight: '10px', color: '#e3262e' }} />
          Ringkasan
        </h1>
        <p style={{ color: '#888', fontSize: '13px', margin: '6px 0 0' }}>Overview data CPX Indo</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {cards.map(c => {
          const Icon = c.icon;
          return (
            <Link key={c.key} href={c.href} style={{ textDecoration: 'none' }}>
              <div style={{
                background: '#fff',
                border: '1px solid #e1e0db',
                borderRadius: '10px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                transition: 'box-shadow 0.2s, transform 0.2s',
                cursor: 'pointer',
              }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.06)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}
              >
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: `${c.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.color }}>
                  <Icon style={{ width: '18px' }} />
                </div>
                <span style={{ font: '700 28px var(--font-oswald)', color: '#151515' }}>{counts[c.key]}</span>
                <span style={{ font: '600 12px var(--font-inter)', color: '#888', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{c.label}</span>
              </div>
            </Link>
          );
        })}
      </div>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        {links.map(l => {
          const Icon = l.icon;
          return (
            <Link key={l.href} href={l.href} style={{ textDecoration: 'none' }}>
              <div style={{
                background: '#fff',
                border: '1px solid #e1e0db',
                borderRadius: '8px',
                padding: '14px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                font: '700 13px var(--font-inter)',
                color: '#444',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#e3262e'; e.currentTarget.style.color = '#e3262e'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#e1e0db'; e.currentTarget.style.color = '#444'; }}
              >
                <Icon style={{ width: '16px' }} /> {l.label}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
