'use client';
import { useState, useEffect } from 'react';
import { ArrowRight, ShieldCheck, Zap, Clock, Headphones } from '../icons';
import type { CMSSettings } from '@/lib/db';

export function Story() {
  const [cms, setCms] = useState<CMSSettings | null>(null);

  useEffect(() => {
    fetch('/api/cms').then(r => r.json()).then(setCms);
  }, []);

  const missions = [
    { icon: <Zap />, text: 'Memberikan kebebasan desain agar setiap tim punya ciri khas unik.' },
    { icon: <ShieldCheck />, text: 'Menggunakan bahan premium dan sangat nyaman dipakai.' },
    { icon: <Clock />, text: 'Menjamin proses produksi cepat dan pengiriman tepat waktu.' },
    { icon: <Headphones />, text: 'Memberikan pelayanan yang ramah dan konsultasi desain gratis.' }
  ];

  if (!cms) {
    return (
      <section className="section story-about" id="story" style={{ background: '#fcfcf9', padding: '60px 0', borderTop: '1px solid #eaeae5', textAlign: 'center' }}>
        <p>Loading brand story...</p>
      </section>
    );
  }

  return (
    <section className="section story-about" id="story" style={{ background: '#fcfcf9', borderTop: '1px solid #eaeae5' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }}>
          <div>
            <span className="kicker">ABOUT CPX JERSEY</span>
            <h2 style={{ font: '700 clamp(36px, 5vw, 54px)/1.1 var(--font-oswald)', letterSpacing: '-2px', margin: '20px 0', textTransform: 'uppercase' }}>
              {cms.aboutTitle.split(' ').map((word, idx) => {
                const isEmphasized = word.includes('SPORTIVITAS') || word.includes('GAYA') || word.includes('BEDA') || word.startsWith('_');
                const cleanWord = word.replace(/_/g, '');
                return (
                  <span key={idx} style={{ marginRight: '8px', display: 'inline-block' }}>
                    {isEmphasized ? <em style={{ color: '#e3262e', fontStyle: 'italic' }}>{cleanWord}</em> : cleanWord}
                  </span>
                );
              })}
            </h2>
            <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#555', marginBottom: '25px' }}>
              {cms.aboutDesc1}
            </p>
            <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#555', marginBottom: '35px' }}>
              {cms.aboutDesc2}
            </p>
            
            <div style={{ borderTop: '1px solid #ddd', paddingTop: '25px' }}>
              <strong style={{ display: 'block', fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '10px' }}>Workshop & Office Bandung</strong>
              <p style={{ fontStyle: 'normal', color: '#666', fontSize: '14px', lineHeight: '1.6', margin: '0 0 20px 0', whiteSpace: 'pre-line' }}>
                {cms.address}
              </p>

              {/* Google Maps Embed */}
              {cms.mapsUrl && cms.mapsUrl.startsWith('https://www.google.com/maps') && (
                <div style={{ borderRadius: '8px', overflow: 'hidden', height: '200px', border: '1px solid #eee' }}>
                  <iframe
                    src={cms.mapsUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              )}
            </div>
          </div>

          <div style={{ background: '#151515', color: '#fff', padding: '40px', borderRadius: '8px' }}>
            <span className="kicker light" style={{ color: '#e3262e' }}>OUR MISSION</span>
            <h3 style={{ font: '700 32px var(--font-oswald)', letterSpacing: '-1px', margin: '15px 0 30px' }}>KOMITMEN PRODUKSI CPX</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              {missions.map((m, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                  <div style={{ color: '#e3262e', marginTop: '3px', display: 'flex' }}>
                    {m.icon}
                  </div>
                  <p style={{ margin: 0, fontSize: '14px', color: '#ccc', lineHeight: '1.6' }}>
                    {m.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}