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
    <aside className="admin-sidebar">
      <div className="admin-sidebar__brand">
        <span>CPX MANAGEMENT</span>
        <h2>Admin</h2>
      </div>

      <nav aria-label="Navigasi admin">
        {navItems.map(item => {
          const isActive = item.href === '/admin'
            ? pathname === '/admin'
            : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <a
              key={item.href}
              href={item.href}
              className={`admin-sidebar__link${isActive ? ' is-active' : ''}`}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon style={{ width: '16px' }} />
              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        className="admin-sidebar__logout"
      >
        <LogOut style={{ width: '16px' }} />
        <span>Keluar</span>
      </button>
    </aside>
  );
}
