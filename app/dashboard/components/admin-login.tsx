'use client';
import { useState } from 'react';
import { Lock, KeyRound, Check } from '@/components/icons';

export function AdminPasscodePrompt({
  onSuccess,
  onCancel
}: {
  onSuccess: () => void;
  onCancel: () => void
}) {
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
        onSuccess();
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
    <div style={{ maxWidth: '460px', margin: '40px auto 80px', background: '#fff', border: '1px solid #e1e0db', borderRadius: '12px', padding: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', textAlign: 'center' }}>
      <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#fff0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: '#e3262e' }}>
        <Lock style={{ width: '26px', height: '26px' }} />
      </div>
      <h2 style={{ font: '700 24px var(--font-oswald)', letterSpacing: '-0.5px', margin: '0 0 10px 0', textTransform: 'uppercase' }}>CPX SECURE ACCESS GATE</h2>
      <p style={{ color: '#666', fontSize: '13px', lineHeight: '1.6', margin: '0 0 25px 0' }}>
        Area administrasi dilindungi sandi sesi enkripsi browser. Masukkan kode sandi resmi untuk melanjutkan.
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div style={{ position: 'relative' }}>
          <input
            type="password"
            value={passcode}
            onChange={e => {
              setPasscode(e.target.value);
              setErrorMsg('');
            }}
            placeholder="Masukkan Passcode Admin..."
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
              transition: 'border-color 0.2s'
            }}
          />
          <KeyRound style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', width: '16px', color: '#aaa' }} />
        </div>

        {errorMsg && (
          <span style={{ display: 'block', fontSize: '12px', color: '#e3262e', textAlign: 'left', fontWeight: '700' }}>
            {errorMsg}
          </span>
        )}

        <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
          <button
            type="submit"
            className="btn primary"
            disabled={isSubmitting}
            style={{ flexGrow: 1, height: '46px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '12px', borderRadius: '6px', opacity: isSubmitting ? 0.7 : 1 }}
          >
            {isSubmitting ? 'MEMVERIFIKASI...' : 'OTENTIKASI MASUK'} <Check style={{ width: '15px' }} />
          </button>
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: '0 20px',
              background: '#fff',
              border: '1px solid #ddd',
              color: '#333',
              borderRadius: '6px',
              font: '700 12px var(--font-inter)',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            BATAL
          </button>
        </div>
      </form>
    </div>
  );
}
