import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AdminSidebar } from './components/admin-sidebar';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const session = cookieStore.get('cpx_admin_session');

  if (!session || session.value !== 'authenticated') {
    redirect('/admin/login');
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
