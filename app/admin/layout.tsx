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
    <div className="admin-shell">
      <AdminSidebar />
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}
