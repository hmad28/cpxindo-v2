import { cookies } from 'next/headers';
import { AdminSidebar } from './components/admin-sidebar';
import { verifyAdminSession } from '@/lib/admin-session';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const session = cookieStore.get('cpx_admin_session');
  const isAuthenticated = await verifyAdminSession(session?.value, process.env.SESSION_SECRET);

  if (!isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f4f0' }}>
      <AdminSidebar />
      <main style={{ flex: 1, marginLeft: '240px', padding: '32px 40px' }}>
        {children}
      </main>
    </div>
  );
}
