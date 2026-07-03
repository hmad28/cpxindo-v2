'use client';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, List, Share2, Star, Check, FileText, Phone, LogOut
} from '@/components/icons';

const navItems = [
  { href: '/admin', label: 'Ringkasan', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Katalog Produk', icon: List },
  { href: '/admin/slides', label: 'Banner Slider', icon: Share2 },
  { href: '/admin/testimonials', label: 'Testimonial', icon: Star },
  { href: '/admin/faqs', label: 'FAQ Manager', icon: Check },
  { href: '/admin/cms', label: 'CMS Settings', icon: FileText },
  { href: '/admin/whatsapp', label: 'WhatsApp', icon: Phone },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/');
  };

  return (
    <aside style={{
      width: '240px',
      minHeight: '100vh',
      background: '#fff',
      borderRight: '1px solid #e1e0db',
      padding: '24px 16px',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 50,
    }}>
      <div style={{ marginBottom: '32px', padding: '0 8px' }}>
        <span style={{ color: '#e3262e', fontSize: '10px', fontWeight: '800', letterSpacing: '1.2px' }}>CPX MANAGEMENT</span>
        <h2 style={{ font: '700 18px var(--font-oswald)', margin: '4px 0 0', textTransform: 'uppercase', letterSpacing: '-0.3px' }}>Admin Panel</h2>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
        {navItems.map(item => {
          const isActive = item.href === '/admin'
            ? pathname === '/admin'
            : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <a
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '11px 12px',
                borderRadius: '6px',
                textDecoration: 'none',
                font: '700 13px var(--font-inter)',
                color: isActive ? '#e3262e' : '#444',
                background: isActive ? '#f5f4f0' : 'transparent',
                transition: 'all 0.15s',
              }}
            >
              <Icon style={{ width: '16px' }} />
              {item.label}
            </a>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '11px 12px',
          borderRadius: '6px',
          border: 'none',
          background: 'none',
          font: '700 13px var(--font-inter)',
          color: '#e3262e',
          cursor: 'pointer',
          marginTop: '8px',
          transition: 'all 0.15s',
        }}
      >
        <LogOut style={{ width: '16px' }} />
        Keluar
      </button>
    </aside>
  );
}
