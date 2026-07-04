'use client';
import { useState, useEffect } from 'react';
import { Plus, Trash2, Check, X, Star } from '@/components/icons';
import { adminFetch } from '@/lib/admin-fetch';

interface Testimonial {
  id: string;
  name: string;
  team: string;
  text: string;
  rating: number;
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [name, setName] = useState('');
  const [team, setTeam] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/testimonials').then(r => r.json()).then(data => {
      if (Array.isArray(data)) setTestimonials(data);
    });
  }, []);

  const openAdd = () => {
    setEditing(null);
    setName('');
    setTeam('');
    setText('');
    setRating(5);
    setShowForm(true);
  };

  const openEdit = (test: Testimonial) => {
    setEditing(test);
    setName(test.name);
    setTeam(test.team);
    setText(test.text);
    setRating(test.rating);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus testimonial ini?')) return;
    try {
      setError('');
      await adminFetch(`/api/testimonials/${id}`, { method: 'DELETE' });
      setTestimonials(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal menghapus testimonial');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = editing ? editing.id : `test-${Date.now()}`;
    const body = { id, name, team, text, rating };

    if (editing) {
      try {
        setError('');
        const updated = await adminFetch<Testimonial>(`/api/testimonials/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
        setTestimonials(prev => prev.map(t => t.id === id ? updated : t));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Gagal menyimpan testimonial');
        return;
      }
    } else {
      try {
        setError('');
        const created = await adminFetch<Testimonial>('/api/testimonials', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
        setTestimonials(prev => [...prev, created]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Gagal menyimpan testimonial');
        return;
      }
    }
    setShowForm(false);
    setEditing(null);
  };

  const renderStars = (count: number) => (
    Array.from({ length: 5 }, (_, i) => (
      <Star key={i} style={{ width: '14px', fill: i < count ? '#f59e0b' : 'none', color: i < count ? '#f59e0b' : '#ddd' }} />
    ))
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ font: '700 24px var(--font-oswald)', textTransform: 'uppercase', letterSpacing: '-0.5px', margin: 0 }}>
            Testimonial
          </h1>
          <p style={{ color: '#888', fontSize: '13px', margin: '6px 0 0' }}>{testimonials.length} testimonial</p>
        </div>
        <button onClick={openAdd} style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '10px 18px', background: '#151515', color: '#fff',
          border: 'none', borderRadius: '6px', font: '700 12px var(--font-inter)',
          cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.8px',
        }}>
          <Plus style={{ width: '14px' }} /> Tambah Testimonial
        </button>
      </div>

      {showForm && (
        <div style={{
          background: '#fff', border: '1px solid #e1e0db', borderRadius: '10px',
          padding: '24px', marginBottom: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ font: '700 15px var(--font-inter)', margin: 0 }}>{editing ? 'Edit Testimonial' : 'Tambah Testimonial Baru'}</h3>
            <button onClick={() => { setShowForm(false); setEditing(null); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888' }}>
              <X style={{ width: '18px' }} />
            </button>
          </div>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ font: '600 12px var(--font-inter)', color: '#666', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Nama</label>
                <input value={name} onChange={e => setName(e.target.value)} required
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: '6px', font: '14px var(--font-inter)', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ font: '600 12px var(--font-inter)', color: '#666', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tim/Organisasi</label>
                <input value={team} onChange={e => setTeam(e.target.value)} required
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: '6px', font: '14px var(--font-inter)', boxSizing: 'border-box' }} />
              </div>
            </div>
            <div>
              <label style={{ font: '600 12px var(--font-inter)', color: '#666', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Rating</label>
              <div style={{ display: 'flex', gap: '4px' }}>
                {[1, 2, 3, 4, 5].map(n => (
                  <button key={n} type="button" onClick={() => setRating(n)} style={{
                    background: 'none', border: 'none', cursor: 'pointer', padding: '2px',
                  }}>
                    <Star style={{ width: '24px', fill: n <= rating ? '#f59e0b' : 'none', color: n <= rating ? '#f59e0b' : '#ddd' }} />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ font: '600 12px var(--font-inter)', color: '#666', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Testimoni</label>
              <textarea value={text} onChange={e => setText(e.target.value)} required rows={3}
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: '6px', font: '14px var(--font-inter)', boxSizing: 'border-box', resize: 'vertical' }} />
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button type="button" onClick={() => { setShowForm(false); setEditing(null); }}
                style={{ padding: '10px 18px', background: '#f5f4f0', border: '1px solid #e1e0db', borderRadius: '6px', font: '700 12px var(--font-inter)', cursor: 'pointer', textTransform: 'uppercase' }}>
                Batal
              </button>
              <button type="submit" style={{
                padding: '10px 18px', background: '#e3262e', color: '#fff', border: 'none', borderRadius: '6px',
                font: '700 12px var(--font-inter)', cursor: 'pointer', textTransform: 'uppercase',
                display: 'flex', alignItems: 'center', gap: '6px',
              }}>
                <Check style={{ width: '14px' }} /> {editing ? 'Update' : 'Simpan'}
              </button>
            </div>
          </form>
        </div>
      )}
      {error && <p style={{ color: '#e3262e', font: '600 13px var(--font-inter)', marginBottom: '16px' }}>{error}</p>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
        {testimonials.map(test => (
          <div key={test.id} style={{
            background: '#fff', border: '1px solid #e1e0db', borderRadius: '10px',
            padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ font: '700 14px var(--font-inter)', margin: 0, color: '#151515' }}>{test.name}</p>
                <p style={{ font: '400 12px var(--font-inter)', margin: '2px 0 0', color: '#888' }}>{test.team}</p>
              </div>
              <div style={{ display: 'flex', gap: '2px' }}>{renderStars(test.rating)}</div>
            </div>
            <p style={{ font: '400 13px var(--font-inter)', margin: 0, color: '#555', lineHeight: '1.6', fontStyle: 'italic' }}>&ldquo;{test.text}&rdquo;</p>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '4px' }}>
              <button onClick={() => openEdit(test)} style={{
                padding: '5px 10px', background: '#f5f4f0', border: '1px solid #e1e0db', borderRadius: '5px',
                font: '600 11px var(--font-inter)', cursor: 'pointer', color: '#444', textTransform: 'uppercase',
              }}>Edit</button>
              <button onClick={() => handleDelete(test.id)} style={{
                padding: '5px 10px', background: '#fff0f0', border: '1px solid #fecaca', borderRadius: '5px',
                font: '600 11px var(--font-inter)', cursor: 'pointer', color: '#e3262e', textTransform: 'uppercase',
              }}>
                <Trash2 style={{ width: '12px', verticalAlign: 'middle' }} />
              </button>
            </div>
          </div>
        ))}
        {testimonials.length === 0 && (
          <p style={{ textAlign: 'center', color: '#aaa', padding: '40px', gridColumn: '1 / -1' }}>Belum ada testimonial</p>
        )}
      </div>
    </div>
  );
}
