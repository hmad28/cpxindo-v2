'use client';
import { useState, useEffect } from 'react';
import { Plus, Trash2, Check, X } from '@/components/icons';

interface Product {
  id: string;
  name: string;
  type: string;
  price: number;
  discountPrice?: number;
  image: string;
  images: string[];
  tag?: string;
  colors: string[];
  sizes: string[];
  description: string;
  materialJersey?: string;
  materialCelana?: string;
  isCustom?: boolean;
  minOrder?: number;
  wholesalePrice?: number;
  suitableFor?: string[];
}

const emptyProduct = {
  name: '', type: '', price: 150000, discountPrice: '', image: '',
  images: '', tag: '', colors: '#e3262e, #111', sizes: 'M, L, XL, XXL',
  description: '', materialJersey: 'Jersey Dryfit Milano', materialCelana: '',
  isCustom: false, minOrder: 6, wholesale: '',
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState(emptyProduct);

  useEffect(() => {
    fetch('/api/products').then(r => r.json()).then(data => {
      if (Array.isArray(data)) setProducts(data);
    });
  }, []);

  const updateField = (field: string, value: string | number | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const openAdd = () => {
    setEditing(null);
    setForm({ ...emptyProduct, image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1000&q=85', images: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1000&q=85' });
    setShowForm(true);
  };

  const openEdit = (prod: Product) => {
    setEditing(prod);
    setForm({
      name: prod.name, type: prod.type, price: prod.price,
      discountPrice: prod.discountPrice?.toString() || '',
      image: prod.image, images: prod.images?.join(', ') || prod.image,
      tag: prod.tag || '', colors: prod.colors.join(', '),
      sizes: prod.sizes.join(', '), description: prod.description,
      materialJersey: prod.materialJersey || '', materialCelana: prod.materialCelana || '',
      isCustom: !!prod.isCustom, minOrder: prod.minOrder || 6,
      wholesale: prod.wholesalePrice?.toString() || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus produk ini?')) return;
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = editing ? editing.id : `prod-${Date.now()}`;
    const colorsArr = form.colors.split(',').map(c => c.trim()).filter(Boolean);
    const sizesArr = form.sizes.split(',').map(s => s.trim()).filter(Boolean);
    const imagesArr = form.images.split(',').map(i => i.trim()).filter(Boolean);

    const body = {
      id, name: form.name, type: form.type, price: form.price,
      discountPrice: form.discountPrice ? parseInt(form.discountPrice as string, 10) : undefined,
      image: form.image, images: imagesArr.length > 0 ? imagesArr : [form.image],
      tag: form.tag || undefined, colors: colorsArr, sizes: sizesArr,
      description: form.description, materialJersey: form.materialJersey || undefined,
      materialCelana: form.materialCelana || undefined, isCustom: form.isCustom,
      minOrder: form.isCustom ? form.minOrder : undefined,
      wholesalePrice: form.wholesale ? parseInt(form.wholesale as string, 10) : undefined,
      suitableFor: form.type ? [form.type.split(' ')[0]] : [],
    };

    if (editing) {
      await fetch(`/api/products/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      setProducts(prev => prev.map(p => p.id === id ? { ...p, ...body } : p));
    } else {
      const res = await fetch('/api/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const created = await res.json();
      setProducts(prev => [...prev, created]);
    }
    setShowForm(false);
    setEditing(null);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: '6px',
    font: '14px var(--font-inter)', boxSizing: 'border-box',
  };
  const labelStyle: React.CSSProperties = {
    font: '600 11px var(--font-inter)', color: '#666', display: 'block', marginBottom: '6px',
    textTransform: 'uppercase', letterSpacing: '0.5px',
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ font: '700 24px var(--font-oswald)', textTransform: 'uppercase', letterSpacing: '-0.5px', margin: 0 }}>
            Katalog Produk
          </h1>
          <p style={{ color: '#888', fontSize: '13px', margin: '6px 0 0' }}>{products.length} produk</p>
        </div>
        <button onClick={openAdd} style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '10px 18px', background: '#151515', color: '#fff',
          border: 'none', borderRadius: '6px', font: '700 12px var(--font-inter)',
          cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.8px',
        }}>
          <Plus style={{ width: '14px' }} /> Tambah Produk
        </button>
      </div>

      {showForm && (
        <div style={{
          background: '#fff', border: '1px solid #e1e0db', borderRadius: '10px',
          padding: '24px', marginBottom: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ font: '700 15px var(--font-inter)', margin: 0 }}>{editing ? 'Edit Produk' : 'Tambah Produk Baru'}</h3>
            <button onClick={() => { setShowForm(false); setEditing(null); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888' }}>
              <X style={{ width: '18px' }} />
            </button>
          </div>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={labelStyle}>Nama Produk</label>
                <input value={form.name} onChange={e => updateField('name', e.target.value)} required style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Tipe</label>
                <input value={form.type} onChange={e => updateField('type', e.target.value)} required placeholder="Jersey, Celana, dll" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Harga (Rp)</label>
                <input type="number" value={form.price} onChange={e => updateField('price', parseInt(e.target.value) || 0)} required style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Harga Diskon (Rp, opsional)</label>
                <input type="number" value={form.discountPrice} onChange={e => updateField('discountPrice', e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Warna (koma)</label>
                <input value={form.colors} onChange={e => updateField('colors', e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Ukuran (koma)</label>
                <input value={form.sizes} onChange={e => updateField('sizes', e.target.value)} style={inputStyle} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Deskripsi</label>
                <textarea value={form.description} onChange={e => updateField('description', e.target.value)} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>URL Gambar Utama</label>
                <input value={form.image} onChange={e => updateField('image', e.target.value)} required style={inputStyle} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Semua Gambar (URL, koma)</label>
                <input value={form.images} onChange={e => updateField('images', e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Tag</label>
                <input value={form.tag} onChange={e => updateField('tag', e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Material Jersey</label>
                <input value={form.materialJersey} onChange={e => updateField('materialJersey', e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Material Celana</label>
                <input value={form.materialCelana} onChange={e => updateField('materialCelana', e.target.value)} style={inputStyle} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '20px' }}>
                <input type="checkbox" checked={form.isCustom} onChange={e => updateField('isCustom', e.target.checked)} id="isCustom" />
                <label htmlFor="isCustom" style={{ font: '600 12px var(--font-inter)', color: '#444' }}>Custom Jersey</label>
              </div>
              {form.isCustom && (
                <>
                  <div>
                    <label style={labelStyle}>Min Order</label>
                    <input type="number" value={form.minOrder} onChange={e => updateField('minOrder', parseInt(e.target.value) || 1)} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Harga Grosir (Rp)</label>
                    <input type="number" value={form.wholesale} onChange={e => updateField('wholesale', e.target.value)} style={inputStyle} />
                  </div>
                </>
              )}
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

      {/* Product Table */}
      <div style={{ background: '#fff', border: '1px solid #e1e0db', borderRadius: '10px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', font: '13px var(--font-inter)' }}>
          <thead>
            <tr style={{ background: '#f5f4f0', borderBottom: '1px solid #e1e0db' }}>
              <th style={{ padding: '12px 16px', textAlign: 'left', font: '700 11px var(--font-inter)', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Produk</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', font: '700 11px var(--font-inter)', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tipe</th>
              <th style={{ padding: '12px 16px', textAlign: 'right', font: '700 11px var(--font-inter)', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Harga</th>
              <th style={{ padding: '12px 16px', textAlign: 'center', font: '700 11px var(--font-inter)', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.map(prod => (
              <tr key={prod.id} style={{ borderBottom: '1px solid #f0efec' }}>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={prod.image} alt={prod.name} style={{ width: '36px', height: '36px', borderRadius: '4px', objectFit: 'cover' }} />
                    <span style={{ fontWeight: 600 }}>{prod.name}</span>
                  </div>
                </td>
                <td style={{ padding: '12px 16px', color: '#666' }}>{prod.type}</td>
                <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 600 }}>
                  {prod.discountPrice ? (
                    <><span style={{ textDecoration: 'line-through', color: '#aaa', fontWeight: 400, marginRight: '6px' }}>Rp{prod.price.toLocaleString()}</span>Rp{prod.discountPrice.toLocaleString()}</>
                  ) : `Rp${prod.price.toLocaleString()}`}
                </td>
                <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                  <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                    <button onClick={() => openEdit(prod)} style={{
                      padding: '5px 10px', background: '#f5f4f0', border: '1px solid #e1e0db', borderRadius: '4px',
                      font: '600 11px var(--font-inter)', cursor: 'pointer', color: '#444',
                    }}>Edit</button>
                    <button onClick={() => handleDelete(prod.id)} style={{
                      padding: '5px 10px', background: '#fff0f0', border: '1px solid #fecaca', borderRadius: '4px',
                      font: '600 11px var(--font-inter)', cursor: 'pointer', color: '#e3262e',
                    }}><Trash2 style={{ width: '12px' }} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && (
          <p style={{ textAlign: 'center', color: '#aaa', padding: '40px' }}>Belum ada produk</p>
        )}
      </div>
    </div>
  );
}
