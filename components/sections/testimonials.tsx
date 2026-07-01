'use client';
import { useState, useEffect } from 'react';
import type { Testimonial } from '@/lib/db';
import { Star } from '../icons';

export function TestimonialsSection() {
  const [list, setList] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetch('/api/testimonials').then(r => r.json()).then(setList);
  }, []);

  return (
    <section className="section testimonials-section" id="testimonials" style={{ background: '#fff', borderTop: '1px solid #eaeae5' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="section-head text-center" style={{ display: 'block', textAlign: 'center', marginBottom: '50px' }}>
          <span className="kicker" style={{ color: '#e3262e' }}>KATA MEREKA</span>
          <h2 style={{ fontSize: 'clamp(36px, 5vw, 60px)', margin: '10px 0' }}>CLIENT <em>TESTIMONIALS.</em></h2>
          <p style={{ color: '#666' }}>Apa kata tim dan komunitas yang telah mempercayakan jersey mereka kepada CPX.</p>
        </div>

        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '30px', 
            marginTop: '20px' 
          }}
        >
          {list.map((t) => (
            <div 
              key={t.id} 
              style={{ 
                background: '#fcfcf9', 
                padding: '30px', 
                borderRadius: '8px', 
                border: '1px solid #eee',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)'
              }}
            >
              <div>
                {/* Rating stars */}
                <div style={{ display: 'flex', gap: '3px', color: '#ffb300', marginBottom: '15px' }}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} fill="currentColor" style={{ width: '16px', height: '16px', stroke: 'none' }} />
                  ))}
                </div>
                <p style={{ fontStyle: 'italic', color: '#333', fontSize: '15px', lineHeight: '1.7', margin: '0 0 20px 0' }}>
                  "{t.text}"
                </p>
              </div>
              <div style={{ borderTop: '1px solid #eee', paddingTop: '15px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div 
                  style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '50%', 
                    background: '#e3262e', 
                    color: '#fff', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontWeight: '700',
                    fontSize: '16px'
                  }}
                >
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#111' }}>{t.name}</h4>
                  <span style={{ fontSize: '12px', color: '#666' }}>{t.team}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
