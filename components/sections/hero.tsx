'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, ArrowLeft } from '../icons';
import type { HeroSlide } from '@/lib/db';

export function Hero() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetch('/api/slides').then(r => r.json()).then(setSlides);
  }, []);

  // Autoplay slider every 6 seconds
  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides]);

  const handleNext = () => {
    setActiveIndex(prev => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setActiveIndex(prev => (prev - 1 + slides.length) % slides.length);
  };

  if (slides.length === 0) {
    return (
      <section className="hero-loading" style={{ height: '70vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#fff' }}>Loading hero banners...</p>
      </section>
    );
  }

  return (
    <section className="hero">
      
      {/* Slides Container */}
      {slides.map((slide, idx) => {
        const isActive = activeIndex === idx;
        return (
          <div
            key={slide.id}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: isActive ? 1 : 0,
              visibility: isActive ? 'visible' : 'hidden',
              transition: 'opacity 1s ease-in-out, visibility 1s ease-in-out',
              zIndex: isActive ? 1 : 0
            }}
          >
            {/* Background Image */}
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={idx === 0}
              sizes="100vw"
              style={{ objectFit: 'cover', objectPosition: 'center 38%', filter: 'grayscale(25%)' }}
            />
            
            {/* Gradient Overlays */}
            <div className="hero-overlay" />

            {/* Content Box */}
            <div className="hero-content">
              <div className="eyebrow">
                <span />
                CPX SPORTSWEAR BANDUNG
              </div>
              <h1>
                {slide.title.split(' ').map((word, wIdx) => {
                  const isEmphasized = word.startsWith('_') || word.includes('BEDA') || word.includes('VICTORY') || word.includes('SETTLE');
                  const cleanWord = word.replace(/_/g, '');
                  return (
                    <span key={wIdx} style={{ marginRight: '10px', display: 'inline-block' }}>
                      {isEmphasized ? <em style={{ color: '#e3262e', fontStyle: 'italic' }}>{cleanWord}</em> : cleanWord}
                    </span>
                  );
                })}
              </h1>
              <p>
                {slide.subtitle}
              </p>
              <div className="hero-buttons">
                <a href="/#custom" className="btn red" style={{ textDecoration: 'none' }}>
                  CUSTOM YOUR JERSEY <ArrowRight />
                </a>
                <a href="/products" className="btn glass" style={{ textDecoration: 'none' }}>
                  EXPLORE PRODUCTS <ArrowRight />
                </a>
              </div>
            </div>
          </div>
        );
      })}

      {/* Navigation Arrow Controls */}
      {slides.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            style={{
              position: 'absolute',
              left: '3vw',
              bottom: '50px',
              zIndex: 4,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#fff',
              width: '45px',
              height: '45px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#e3262e'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
          >
            <ArrowLeft style={{ width: '18px' }} />
          </button>
          <button
            onClick={handleNext}
            style={{
              position: 'absolute',
              left: 'calc(3vw + 60px)',
              bottom: '50px',
              zIndex: 4,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#fff',
              width: '45px',
              height: '45px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#e3262e'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
          >
            <ArrowRight style={{ width: '18px' }} />
          </button>
        </>
      )}

      {/* Slider Carousel Indicator Dots */}
      {slides.length > 1 && (
        <div style={{ position: 'absolute', right: '4vw', bottom: '50px', zIndex: 4, display: 'flex', gap: '8px' }}>
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              style={{
                width: '30px',
                height: '3px',
                border: 'none',
                background: activeIndex === idx ? '#e3262e' : 'rgba(255,255,255,0.2)',
                cursor: 'pointer',
                transition: 'background 0.3s'
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}

    </section>
  );
}