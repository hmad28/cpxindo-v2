'use client';
import { useState } from 'react';
import { ChevronDown } from '../icons';
import type { FAQ } from '@/lib/db';

export function FaqSection({ faqs }: { faqs: FAQ[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="section faq-section" id="faq">
      <div className="container">
        <div className="section-head text-center" style={{ display: 'block', textAlign: 'center', marginBottom: '50px' }}>
          <span className="kicker">ANY QUESTIONS?</span>
          <h2 style={{ fontSize: 'clamp(36px, 5vw, 60px)' }}>FREQUENTLY ASKED <em>QUESTIONS.</em></h2>
          <p style={{ color: '#666', marginTop: '10px' }}>Berikut beberapa pertanyaan yang sering diajukan seputar pemesanan jersey custom di CPX.</p>
        </div>

        <div className="faq-grid" style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div 
                key={faq.id} 
                className={`faq-item ${isOpen ? 'open' : ''}`}
                style={{ 
                  background: '#fff', 
                  borderRadius: '8px', 
                  border: '1px solid #eee',
                  overflow: 'hidden',
                  transition: 'all 0.3s'
                }}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  style={{
                    width: '100%',
                    padding: '20px 25px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    font: '600 16px var(--font-inter)',
                    color: '#111',
                    cursor: 'pointer'
                  }}
                >
                  <span>{faq.q}</span>
                  <ChevronDown 
                    style={{ 
                      width: '18px', 
                      height: '18px',
                      transform: isOpen ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.3s',
                      opacity: 0.5
                    }} 
                  />
                </button>
                <div
                  style={{
                    maxHeight: isOpen ? '250px' : '0',
                    opacity: isOpen ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'all 0.3s ease-in-out',
                    padding: isOpen ? '0 25px 20px' : '0 25px 0'
                  }}
                >
                  <p style={{ 
                    margin: 0, 
                    color: '#555', 
                    fontSize: '14px', 
                    lineHeight: '1.6' 
                  }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
