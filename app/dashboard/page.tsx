'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CustomerDashboard } from './components/customer-panel';

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
  const tabParam = searchParams.get('tab');

  const [customerSubTab, setCustomerSubTab] = useState<'profile' | 'orders' | 'wishlist'>('profile');

  useEffect(() => {
    if (tabParam === 'wishlist') {
      setCustomerSubTab('wishlist');
    } else if (tabParam === 'orders') {
      setCustomerSubTab('orders');
    }
  }, [tabParam]);

  return (
    <div className="page dashboard-page" style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '90vh', background: '#f5f4f0' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <CustomerDashboard subTab={customerSubTab} setSubTab={setCustomerSubTab} />
      </div>
    </div>
  );
}
