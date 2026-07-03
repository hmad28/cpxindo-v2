'use client';
import { useState, useEffect } from 'react';
import { Phone, Check } from '@/components/icons';

function getStoredAdmins(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem('cpx_whatsapp_admins') || '[]');
  } catch {
    return [];
  }
}

function saveAdmins(admins: string[]) {
  localStorage.setItem('cpx_whatsapp_admins', JSON.stringify(admins));
}

export default function AdminWhatsappPage() {
  const [numbers, setNumbers] = useState<string[]>(['', '', '']);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = getStoredAdmins();
    if (stored.length > 0) {
      setNumbers([...stored, '', '', ''].slice(0, 3));
    }
  }, []);

  const activeCount = numbers.filter(n => n.trim() !== '').length;

  const handleChange = (index: number, value: string) => {
    setNumbers(prev => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveAdmins(numbers);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ font: '700 24px var(--font-oswald)', textTransform: 'uppercase', letterSpacing: '-0.5px', margin: 0 }}>
          <Phone style={{ width: '22px', verticalAlign: 'middle', marginRight: '10px', color: '#e3262e' }} />
          WhatsApp Admin
        </h1>
        <p style={{ color: '#888', fontSize: '13px', margin: '6px 0 0' }}>Kelola nomor WhatsApp admin (maks. 3)</p>
      </div>

      <div style={{
        background: '#fff', border: '1px solid #e1e0db', borderRadius: '10px',
        padding: '24px', maxWidth: '500px',
      }}>
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {numbers.map((num, i) => (
            <div key={i}>
              <label style={{ font: '600 11px var(--font-inter)', color: '#888', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Nomor {i + 1}
              </label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input
                  value={num}
                  onChange={e => handleChange(i, e.target.value)}
                  placeholder="628xxxxxxxxxx"
                  style={{
                    flex: 1, padding: '10px 12px', border: '1px solid #ddd', borderRadius: '6px',
                    font: '14px var(--font-inter)', boxSizing: 'border-box',
                  }}
                />
                {num.trim() && (
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', flexShrink: 0 }} />
                )}
              </div>
            </div>
          ))}

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px' }}>
            <button type="submit" style={{
              padding: '10px 20px', background: '#151515', color: '#fff', border: 'none', borderRadius: '6px',
              font: '700 12px var(--font-inter)', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.8px',
              display: 'flex', alignItems: 'center', gap: '6px',
            }}>
              {saved ? <><Check style={{ width: '14px' }} /> Tersimpan!</> : 'Simpan'}
            </button>
            <span style={{ font: '400 12px var(--font-inter)', color: '#888' }}>{activeCount}/3 aktif</span>
          </div>
        </form>
      </div>
    </div>
  );
}
