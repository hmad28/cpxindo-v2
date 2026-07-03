import { cookies } from 'next/headers';
import { AdminSidebar } from './components/admin-sidebar';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const session = cookieStore.get('cpx_admin_session');
  const isAuthenticated = session?.value === 'authenticated';

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
