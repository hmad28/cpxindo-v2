'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { User, Settings, LogOut } from '@/components/icons';
import { AdminPasscodePrompt } from './components/admin-login';
import { CustomerDashboard } from './components/customer-panel';
import { AdminPanel } from './components/admin-panel';

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div style={{ paddingTop: '150px', textAlign: 'center', minHeight: '90vh', font: '700 16px var(--font-inter)' }}>
        Loading Dashboard...
      </div>
    }>
      <DashboardPageContent />
    </Suspense>
  );
}

function DashboardPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabParam = searchParams.get('tab');
  const isAdminParam = searchParams.get('admin') === 'true';

  const [activeTab, setActiveTab] = useState<'customer' | 'admin'>('customer');
  const [customerSubTab, setCustomerSubTab] = useState<'profile' | 'orders' | 'wishlist'>('profile');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth = sessionStorage.getItem('cpx_admin_auth');
      if (auth === 'true') {
        setIsAdminAuthenticated(true);
      }
    }

    if (isAdminParam) {
      setActiveTab('admin');
    } else if (tabParam === 'wishlist') {
      setActiveTab('customer');
      setCustomerSubTab('wishlist');
    } else if (tabParam === 'orders') {
      setActiveTab('customer');
      setCustomerSubTab('orders');
    }
  }, [tabParam, isAdminParam]);

  const handleTabChange = (tab: 'customer' | 'admin') => {
    setActiveTab(tab);
    router.push(`/dashboard${tab === 'admin' ? '?admin=true' : ''}`, { scroll: false });
  };

  const handleAdminLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch {
      // ignore logout errors
    }
    setIsAdminAuthenticated(false);
    setActiveTab('customer');
    router.push('/dashboard', { scroll: false });
  };

  return (
    <div className="page dashboard-page" style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '90vh', background: '#f5f4f0' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '2px solid #e1e0db', paddingBottom: '15px', flexWrap: 'wrap', gap: '15px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => handleTabChange('customer')}
              style={{
                padding: '12px 24px',
                font: '700 13px var(--font-inter)',
                textTransform: 'uppercase',
                letterSpacing: '1.2px',
                border: 'none',
                background: activeTab === 'customer' ? '#e3262e' : 'transparent',
                color: activeTab === 'customer' ? '#fff' : '#444',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s',
                boxShadow: activeTab === 'customer' ? '0 4px 12px rgba(227, 38, 46, 0.25)' : 'none'
              }}
            >
              <User style={{ width: '16px' }} /> Customer Panel
            </button>
            <button
              onClick={() => handleTabChange('admin')}
              style={{
                padding: '12px 24px',
                font: '700 13px var(--font-inter)',
                textTransform: 'uppercase',
                letterSpacing: '1.2px',
                border: 'none',
                background: activeTab === 'admin' ? '#151515' : 'transparent',
                color: activeTab === 'admin' ? '#fff' : '#444',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s',
                boxShadow: activeTab === 'admin' ? '0 4px 12px rgba(21, 21, 21, 0.25)' : 'none'
              }}
            >
              <Settings style={{ width: '16px' }} /> CPX Admin Panel
            </button>
          </div>

          {activeTab === 'admin' && isAdminAuthenticated && (
            <button
              onClick={handleAdminLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: '#fff',
                border: '1px solid #e1e0db',
                color: '#e3262e',
                font: '700 11px var(--font-inter)',
                padding: '10px 18px',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textTransform: 'uppercase',
                letterSpacing: '0.8px'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#e3262e';
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.borderColor = '#e3262e';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#fff';
                e.currentTarget.style.color = '#e3262e';
                e.currentTarget.style.borderColor = '#e1e0db';
              }}
            >
              <LogOut style={{ width: '14px' }} /> KELUAR ADMIN
            </button>
          )}
        </div>

        {activeTab === 'customer' ? (
          <CustomerDashboard subTab={customerSubTab} setSubTab={setCustomerSubTab} />
        ) : (
          isAdminAuthenticated ? (
            <AdminPanel />
          ) : (
            <AdminPasscodePrompt
              onSuccess={() => setIsAdminAuthenticated(true)}
              onCancel={() => setActiveTab('customer')}
            />
          )
        )}

      </div>
    </div>
  );
}
