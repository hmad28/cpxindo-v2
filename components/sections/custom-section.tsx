import Image from 'next/image';
import { ArrowRight, Check, ChevronDown, Zap } from '../icons';
import type { CMSSettings } from '@/lib/db';

export function CustomSection({ cms }: { cms: CMSSettings }) {
  const steps = [
    ['01', 'Pilih Model', 'Tentukan model, warna, dan material favoritmu.', true],
    ['02', 'Kirim Desain', 'Punya desain sendiri? Kirim. Belum? Kami bantu.', false],
    ['03', 'Review & Produce', 'Approve mockup, lalu kami mulai produksi.', false],
    ['04', 'Ready to Win', 'Jersey dikirim. Saatnya bawa timmu menang.', false]
  ];

  return (
    <section className="custom" id="custom">
      <div className="custom-photo">
        <Image
          src={cms.customImage}
          fill
          sizes="50vw"
          alt="Custom jersey production"
        />
        <div className="fabric-chip">
          <Zap />
          <span>
            <b>{cms.customFabricChipTitle}</b>
            <small>{cms.customFabricChipDesc}</small>
          </span>
        </div>
      </div>
      <div className="custom-copy">
        <span className="kicker light">MAKE IT YOURS</span>
        <h2>
          {cms.customTitle.split(' ').map((word, idx) => {
            const isEmphasized = word.includes('RULES') || word.includes('TEAM') || word.includes('YOUR');
            return (
              <span key={idx} style={{ marginRight: '8px', display: 'inline-block' }}>
                {isEmphasized ? <em style={{ color: '#e3262e', fontStyle: 'italic' }}>{word}</em> : word}
              </span>
            );
          })}
        </h2>
        <p>{cms.customSubtitle}</p>
        <div className="steps">
          {steps.map(([n, t, d], i) => (
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
