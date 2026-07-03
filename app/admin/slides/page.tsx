'use client';
import { useState, useEffect } from 'react';
import { Plus, Trash2, Check, X, Share2 } from '@/components/icons';

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

export default function AdminSlidesPage() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<HeroSlide | null>(null);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    fetch('/api/slides').then(r => r.json()).then(data => {
      if (Array.isArray(data)) setSlides(data);
    });
  }, []);

  const openAdd = () => {
    setEditing(null);
    setTitle('');
    setSubtitle('');
    setImage('https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1600&q=80');
    setShowForm(true);
  };

  const openEdit = (slide: HeroSlide) => {
    setEditing(slide);
    setTitle(slide.title);
    setSubtitle(slide.subtitle);
    setImage(slide.image);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus slide banner ini?')) return;
    await fetch(`/api/slides/${id}`, { method: 'DELETE' });
    setSlides(prev => prev.filter(s => s.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = editing ? editing.id : `slide-${Date.now()}`;
    const body = { id, title, subtitle, image };

    if (editing) {
      await fetch(`/api/slides/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      setSlides(prev => prev.map(s => s.id === id ? { ...s, title, subtitle, image } : s));
    } else {
      const res = await fetch('/api/slides', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const created = await res.json();
      setSlides(prev => [...prev, created]);
    }
    setShowForm(false);
    setEditing(null);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ font: '700 24px var(--font-oswald)', textTransform: 'uppercase', letterSpacing: '-0.5px', margin: 0 }}>
            <Share2 style={{ width: '22px', verticalAlign: 'middle', marginRight: '10px', color: '#e3262e' }} />
            Banner Slider
          </h1>
          <p style={{ color: '#888', fontSize: '13px', margin: '6px 0 0' }}>{slides.length} slide</p>
        </div>
        <button onClick={openAdd} style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '10px 18px', background: '#151515', color: '#fff',
          border: 'none', borderRadius: '6px', font: '700 12px var(--font-inter)',
          cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.8px',
        }}>
          <Plus style={{ width: '14px' }} /> Tambah Slide
        </button>
      </div>

      {showForm && (
        <div style={{
          background: '#fff', border: '1px solid #e1e0db', borderRadius: '10px',
          padding: '24px', marginBottom: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ font: '700 15px var(--font-inter)', margin: 0 }}>{editing ? 'Edit Slide' : 'Tambah Slide Baru'}</h3>
            <button onClick={() => { setShowForm(false); setEditing(null); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888' }}>
              <X style={{ width: '18px' }} />
            </button>
          </div>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ font: '600 12px var(--font-inter)', color: '#666', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Judul</label>
              <input value={title} onChange={e => setTitle(e.target.value)} required
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: '6px', font: '14px var(--font-inter)', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ font: '600 12px var(--font-inter)', color: '#666', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Subjudul</label>
              <input value={subtitle} onChange={e => setSubtitle(e.target.value)} required
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: '6px', font: '14px var(--font-inter)', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ font: '600 12px var(--font-inter)', color: '#666', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>URL Gambar</label>
              <input value={image} onChange={e => setImage(e.target.value)} required
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: '6px', font: '14px var(--font-inter)', boxSizing: 'border-box' }} />
            </div>
            {image && (
              <div style={{ borderRadius: '8px', overflow: 'hidden', height: '180px', background: '#f5f4f0' }}>
                <img src={image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}
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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
        {slides.map(slide => (
          <div key={slide.id} style={{
            background: '#fff', border: '1px solid #e1e0db', borderRadius: '10px',
            overflow: 'hidden',
          }}>
            <div style={{ height: '160px', background: '#f5f4f0', position: 'relative' }}>
              <img src={slide.image} alt={slide.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 16px 12px', background: 'linear-gradient(transparent, rgba(0,0,0,0.7))', color: '#fff' }}>
                <p style={{ font: '700 15px var(--font-oswald)', margin: 0, textTransform: 'uppercase' }}>{slide.title}</p>
                <p style={{ font: '400 12px var(--font-inter)', margin: '4px 0 0', opacity: 0.85 }}>{slide.subtitle}</p>
              </div>
            </div>
            <div style={{ padding: '12px 16px', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button onClick={() => openEdit(slide)} style={{
                padding: '6px 12px', background: '#f5f4f0', border: '1px solid #e1e0db', borderRadius: '5px',
                font: '600 11px var(--font-inter)', cursor: 'pointer', color: '#444', textTransform: 'uppercase',
              }}>Edit</button>
              <button onClick={() => handleDelete(slide.id)} style={{
                padding: '6px 12px', background: '#fff0f0', border: '1px solid #fecaca', borderRadius: '5px',
                font: '600 11px var(--font-inter)', cursor: 'pointer', color: '#e3262e', textTransform: 'uppercase',
              }}>
                <Trash2 style={{ width: '12px', verticalAlign: 'middle' }} />
              </button>
            </div>
          </div>
        ))}
        {slides.length === 0 && (
          <p style={{ textAlign: 'center', color: '#aaa', padding: '40px', gridColumn: '1 / -1' }}>Belum ada slide</p>
        )}
      </div>
    </div>
  );
}
