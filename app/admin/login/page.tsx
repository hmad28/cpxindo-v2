'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, KeyRound, Check } from '@/components/icons';

export default function AdminLoginPage() {
  const router = useRouter();
  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode }),
      });
      const data = await res.json();

      if (res.ok) {
        router.push('/admin');
      } else {
        setErrorMsg(data.error || 'Passcode admin salah. Silakan coba lagi.');
        setPasscode('');
      }
    } catch {
      setErrorMsg('Gagal menghubungi server. Coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f5f4f0',
      padding: '20px',
    }}>
      <div style={{
        maxWidth: '440px',
        width: '100%',
        background: '#fff',
        border: '1px solid #e1e0db',
        borderRadius: '12px',
        padding: '40px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
        textAlign: 'center',
      }}>
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: '#fff0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
          color: '#e3262e',
        }}>
          <Lock style={{ width: '24px', height: '24px' }} />
        </div>
        <h1 style={{ font: '700 22px var(--font-oswald)', letterSpacing: '-0.5px', margin: '0 0 8px', textTransform: 'uppercase' }}>
          CPX Secure Access
        </h1>
        <p style={{ color: '#666', fontSize: '13px', lineHeight: '1.6', margin: '0 0 28px' }}>
          Masukkan kode sandi admin untuk mengakses panel manajemen.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ position: 'relative' }}>
            <input
              type="password"
              value={passcode}
              onChange={e => { setPasscode(e.target.value); setErrorMsg(''); }}
              placeholder="Masukkan Passcode..."
              required
              autoFocus
              style={{
                width: '100%',
                padding: '12px 15px 12px 42px',
                border: errorMsg ? '2px solid #e3262e' : '1px solid #ddd',
                borderRadius: '6px',
                font: '14px var(--font-inter)',
                background: '#fafafa',
                outline: 'none',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box',
              }}
            />
            <KeyRound style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', width: '16px', color: '#aaa' }} />
          </div>

          {errorMsg && (
            <span style={{ fontSize: '12px', color: '#e3262e', textAlign: 'left', fontWeight: '700' }}>
              {errorMsg}
            </span>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              background: '#151515',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              font: '700 12px var(--font-inter)',
              cursor: 'pointer',
              opacity: isSubmitting ? 0.7 : 1,
              letterSpacing: '0.8px',
              textTransform: 'uppercase',
            }}
          >
            {isSubmitting ? 'MEMVERIFIKASI...' : 'MASUK'} <Check style={{ width: '15px' }} />
          </button>
        </form>
      </div>
    </div>
  );
}
