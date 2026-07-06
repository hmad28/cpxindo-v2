'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, ArrowLeft } from '../icons';
import type { HeroSlide } from '@/lib/db';

export function Hero({ initialSlides }: { initialSlides: HeroSlide[] }) {
  const [slides] = useState<HeroSlide[]>(initialSlides);
  const [activeIndex, setActiveIndex] = useState(0);

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
        <p style={{ color: '#fff' }}>Hero banners belum tersedia.</p>
      </section>
    );
  }

  return (
    <section className="hero">
      {slides.map((slide, idx) => {
        const isActive = activeIndex === idx;
        return (
          <div key={slide.id} className={`hero-slide ${isActive ? 'active' : ''}`}>
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={idx === 0}
              sizes="100vw"
              className="hero-slide-image"
            />
            <div className="hero-overlay" />
            <div className="hero-content">
              <div className="eyebrow">
                <span />
                CPX SPORTSWEAR BANDUNG
              </div>
              <h1>{slide.title}</h1>
              <p>{slide.subtitle}</p>
              <div className="hero-buttons">
                <a href="/#custom" className="btn red" style={{ textDecoration: 'none' }}>
                  CUSTOM YOUR JERSEY <ArrowRight />
                </a>
                <a href="/#products" className="btn glass" style={{ textDecoration: 'none' }}>
                  EXPLORE PRODUCTS <ArrowRight />
                </a>
              </div>
            </div>
          </div>
        );
      })}

      {slides.length > 1 && (
        <div className="hero-controls">
          <div className="hero-arrows">
            <button onClick={handlePrev} aria-label="Previous slide">
              <ArrowLeft />
            </button>
            <button onClick={handleNext} aria-label="Next slide">
              <ArrowRight />
            </button>
          </div>
          <div className="hero-dots" aria-label="Hero slides">
            {slides.map((_, idx) => (
              <button
                key={idx}
                className={activeIndex === idx ? 'active' : ''}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
          <span className="hero-counter">
            {String(activeIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </span>
        </div>
      )}
    </section>
  );
}
