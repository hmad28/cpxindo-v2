'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, Check, ChevronDown, Zap } from '../icons';
import type { CMSSettings } from '@/lib/db';

export function CustomSection() {
  const [cms, setCms] = useState<CMSSettings | null>(null);

  useEffect(() => {
    fetch('/api/cms').then(r => r.json()).then(setCms);
  }, []);

  const steps = [
    ['01', 'Pilih Model', 'Tentukan model, warna, dan material favoritmu.', true],
    ['02', 'Kirim Desain', 'Punya desain sendiri? Kirim. Belum? Kami bantu.', false],
    ['03', 'Review & Produce', 'Approve mockup, lalu kami mulai produksi.', false],
    ['04', 'Ready to Win', 'Jersey dikirim. Saatnya bawa timmu menang.', false]
  ];

  const customImg = cms?.customImage || 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=1400&q=90';
  const customFabTitle = cms?.customFabricChipTitle || 'DRY-X™ FABRIC';
  const customFabDesc = cms?.customFabricChipDesc || 'Stay cool. Play harder.';
  const customTitle = cms?.customTitle || 'YOUR TEAM. YOUR RULES.';
  const customSubtitle = cms?.customSubtitle || 'Dari ide pertama sampai jersey siap tanding, tim desain kami bantu wujudkan identitas tim kamu dengan detail yang presisi.';

  return (
    <section className="custom" id="custom">
      <div className="custom-photo">
        <Image
          src={customImg}
          fill
          sizes="50vw"
          alt="Custom jersey production"
        />
        <div className="fabric-chip">
          <Zap />
          <span>
            <b>{customFabTitle}</b>
            <small>{customFabDesc}</small>
          </span>
        </div>
      </div>
      <div className="custom-copy">
        <span className="kicker light">MAKE IT YOURS</span>
        <h2>
          {customTitle.split(' ').map((word, idx) => {
            const isEmphasized = word.includes('RULES') || word.includes('TEAM') || word.includes('YOUR');
            return (
              <span key={idx} style={{ marginRight: '8px', display: 'inline-block' }}>
                {isEmphasized ? <em style={{ color: '#e3262e', fontStyle: 'italic' }}>{word}</em> : word}
              </span>
            );
          })}
        </h2>
        <p>
          {customSubtitle}
        </p>
        <div className="steps">
          {steps.map(([n, t, d, open], i) => (
            <div className={i === 0 ? 'open' : ''} key={n as string}>
              <b>{n}</b>
              <span>
                <strong>{t}</strong>
                {i === 0 && <small>{d}</small>}
              </span>
              {i === 0 ? <Check /> : <ChevronDown />}
            </div>
          ))}
        </div>
        <a className="btn white" href="#start">
          START CUSTOMIZING <ArrowRight />
        </a>
      </div>
    </section>
  );
}