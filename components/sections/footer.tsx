import Image from 'next/image';
import { Instagram, Tiktok } from '../icons';
import type { CMSSettings } from '@/lib/db';

export function Footer({ cms }: { cms: CMSSettings }) {
  return (
    <footer>
      <div className="footer-top">
        <div className="footer-brand-col">
          <a className="logo" href="#top">
            <Image
              src="/images/logo/icon_cpx.jpeg"
              alt="CPX Sport Wear Premium logo"
              width={190}
              height={58}
              className="footer-logo-image"
            />
            <span className="sr-only">{cms.shopName}</span>
          </a>
          <p className="footer-slogan">
            {cms.slogan}<br />
            Made with passion in Bandung, Indonesia. 🇮🇩
          </p>
          <div className="social">
            <a href={cms.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram />
            </a>
            <a href={cms.tiktokUrl} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <Tiktok />
            </a>
          </div>
        </div>
        <div>
          <b>SHOP</b>
          <a href="/#products">New Drops</a>
          <a href="/#products">Jersey</a>
          <a href="/#products">Training</a>
          <a href="/#products">Accessories</a>
        </div>
        <div>
          <b>CUSTOM</b>
          <a href="/#custom">How It Works</a>
          <a href="/#custom">Custom Football</a>
          <a href="/#custom">Custom Cycling</a>
          <a href="/#custom">Size Guide</a>
        </div>
        <div>
          <b>OFFICIAL STORES</b>
          <a href={cms.shopeeUrl} target="_blank" rel="noopener noreferrer">Shopee Store</a>
          <a href={cms.tokopediaUrl} target="_blank" rel="noopener noreferrer">Tokopedia Store</a>
          <a href={cms.lazadaUrl} target="_blank" rel="noopener noreferrer">Lazada Store</a>
        </div>
        <div>
          <b>SUPPORT</b>
          <a href="/#faq">FAQ</a>
          <a href="/#faq">Track Order</a>
          <a href="/#faq">Contact Support</a>
        </div>
      </div>
      <div className="footer-bottom" style={{ borderTop: '1px solid #222', paddingTop: '20px', marginTop: '40px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '15px' }}>
        <span>© 2026 {cms.shopName.toUpperCase()}. ALL RIGHTS RESERVED.</span>
        <span>PRIVACY POLICY &nbsp; TERMS & CONDITIONS</span>
        <span>PROUDLY MADE IN BANDUNG 🇮🇩</span>
      </div>
    </footer>
  );
}
