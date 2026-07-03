'use client';
import { useState, useEffect } from 'react';
import { Plus, Trash2, Check, X } from '@/components/icons';

interface FAQ {
  id: string;
  q: string;
  a: string;
}

export default function AdminFaqsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<FAQ | null>(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    fetch('/api/faqs').then(r => r.json()).then(data => {
      if (Array.isArray(data)) setFaqs(data);
    });
  }, []);

  const openAdd = () => {
    setEditing(null);
    setQuestion('');
    setAnswer('');
    setShowForm(true);
  };

  const openEdit = (faq: FAQ) => {
    setEditing(faq);
    setQuestion(faq.q);
    setAnswer(faq.a);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus FAQ ini?')) return;
    await fetch(`/api/faqs/${id}`, { method: 'DELETE' });
    setFaqs(prev => prev.filter(f => f.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = editing ? editing.id : `faq-${Date.now()}`;
    const body = { id, q: question, a: answer };

    if (editing) {
      await fetch(`/api/faqs/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      setFaqs(prev => prev.map(f => f.id === id ? { ...f, q: question, a: answer } : f));
    } else {
      const res = await fetch('/api/faqs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const created = await res.json();
      setFaqs(prev => [...prev, created]);
    }
    setShowForm(false);
    setEditing(null);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ font: '700 24px var(--font-oswald)', textTransform: 'uppercase', letterSpacing: '-0.5px', margin: 0 }}>
            FAQ Manager
          </h1>
          <p style={{ color: '#888', fontSize: '13px', margin: '6px 0 0' }}>{faqs.length} FAQ</p>
        </div>
        <button onClick={openAdd} style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '10px 18px', background: '#151515', color: '#fff',
          border: 'none', borderRadius: '6px', font: '700 12px var(--font-inter)',
          cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.8px',
        }}>
          <Plus style={{ width: '14px' }} /> Tambah FAQ
        </button>
      </div>

      {showForm && (
        <div style={{
          background: '#fff', border: '1px solid #e1e0db', borderRadius: '10px',
          padding: '24px', marginBottom: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ font: '700 15px var(--font-inter)', margin: 0 }}>{editing ? 'Edit FAQ' : 'Tambah FAQ Baru'}</h3>
            <button onClick={() => { setShowForm(false); setEditing(null); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888' }}>
              <X style={{ width: '18px' }} />
            </button>
          </div>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ font: '600 12px var(--font-inter)', color: '#666', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Pertanyaan</label>
              <input value={question} onChange={e => setQuestion(e.target.value)} required
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: '6px', font: '14px var(--font-inter)', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ font: '600 12px var(--font-inter)', color: '#666', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Jawaban</label>
              <textarea value={answer} onChange={e => setAnswer(e.target.value)} required rows={4}
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: '6px', font: '14px var(--font-inter)', boxSizing: 'border-box', resize: 'vertical' }} />
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button type="button" onClick={() => { setShowForm(false); setEditing(null); }}
                style={{ padding: '10px 18px', background: '#f5f4f0', border: '1px solid #e1e0db', borderRadius: '6px', font: '700 12px var(--font-inter)', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Batal
              </button>
              <button type="submit" style={{
                padding: '10px 18px', background: '#e3262e', color: '#fff', border: 'none', borderRadius: '6px',
                font: '700 12px var(--font-inter)', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.5px',
                display: 'flex', alignItems: 'center', gap: '6px',
              }}>
                <Check style={{ width: '14px' }} /> {editing ? 'Update' : 'Simpan'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {faqs.map(faq => (
          <div key={faq.id} style={{
            background: '#fff', border: '1px solid #e1e0db', borderRadius: '8px',
            padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px',
          }}>
            <div style={{ flex: 1 }}>
              <p style={{ font: '700 14px var(--font-inter)', margin: '0 0 6px', color: '#151515' }}>Q: {faq.q}</p>
              <p style={{ font: '400 13px var(--font-inter)', margin: 0, color: '#666', lineHeight: '1.6' }}>A: {faq.a}</p>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
              <button onClick={() => openEdit(faq)} style={{
                padding: '6px 12px', background: '#f5f4f0', border: '1px solid #e1e0db', borderRadius: '5px',
                font: '600 11px var(--font-inter)', cursor: 'pointer', color: '#444', textTransform: 'uppercase',
              }}>Edit</button>
              <button onClick={() => handleDelete(faq.id)} style={{
                padding: '6px 12px', background: '#fff0f0', border: '1px solid #fecaca', borderRadius: '5px',
                font: '600 11px var(--font-inter)', cursor: 'pointer', color: '#e3262e', textTransform: 'uppercase',
              }}>
                <Trash2 style={{ width: '12px', verticalAlign: 'middle' }} />
              </button>
            </div>
          </div>
        ))}
        {faqs.length === 0 && (
          <p style={{ textAlign: 'center', color: '#aaa', padding: '40px', font: '400 14px var(--font-inter)' }}>Belum ada FAQ</p>
        )}
      </div>
    </div>
  );
}
