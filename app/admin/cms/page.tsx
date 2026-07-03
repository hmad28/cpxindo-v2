'use client';
import { useState, useEffect } from 'react';
import { FileText, Check } from '@/components/icons';

interface CMSSettings {
  shopName: string;
  slogan: string;
  address: string;
  mapsUrl: string;
  instagramUrl: string;
  tiktokUrl: string;
  shopeeUrl: string;
  tokopediaUrl: string;
  lazadaUrl: string;
  aboutTitle: string;
  aboutDesc1: string;
  aboutDesc2: string;
  customImage: string;
  customFabricChipTitle: string;
  customFabricChipDesc: string;
  customTitle: string;
  customSubtitle: string;
}

const emptyCMS: CMSSettings = {
  shopName: '', slogan: '', address: '', mapsUrl: '',
  instagramUrl: '', tiktokUrl: '', shopeeUrl: '', tokopediaUrl: '', lazadaUrl: '',
  aboutTitle: '', aboutDesc1: '', aboutDesc2: '',
  customImage: '', customFabricChipTitle: '', customFabricChipDesc: '',
  customTitle: '', customSubtitle: '',
};

export default function AdminCmsPage() {
  const [cms, setCms] = useState<CMSSettings>(emptyCMS);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/cms').then(r => r.json()).then(data => {
      if (data) setCms({
        shopName: data.shopName || '',
        slogan: data.slogan || '',
        address: data.address || '',
        mapsUrl: data.mapsUrl || '',
        instagramUrl: data.instagramUrl || '',
        tiktokUrl: data.tiktokUrl || '',
        shopeeUrl: data.shopeeUrl || '',
        tokopediaUrl: data.tokopediaUrl || '',
        lazadaUrl: data.lazadaUrl || '',
        aboutTitle: data.aboutTitle || '',
        aboutDesc1: data.aboutDesc1 || '',
        aboutDesc2: data.aboutDesc2 || '',
        customImage: data.customImage || '',
        customFabricChipTitle: data.customFabricChipTitle || '',
        customFabricChipDesc: data.customFabricChipDesc || '',
        customTitle: data.customTitle || '',
        customSubtitle: data.customSubtitle || '',
      });
      setLoading(false);
    });
  }, []);

  const update = (field: keyof CMSSettings, value: string) => {
    setCms(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/cms', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cms),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    window.dispatchEvent(new Event('cms-update'));
  };

  if (loading) {
    return <p style={{ color: '#888', padding: '40px', textAlign: 'center' }}>Loading...</p>;
  }

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
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ font: '700 24px var(--font-oswald)', textTransform: 'uppercase', letterSpacing: '-0.5px', margin: 0 }}>
          <FileText style={{ width: '22px', verticalAlign: 'middle', marginRight: '10px', color: '#e3262e' }} />
          CMS Settings
        </h1>
        <p style={{ color: '#888', fontSize: '13px', margin: '6px 0 0' }}>Pengaturan konten website</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '700px' }}>
        {/* Store Info */}
        <section style={{ background: '#fff', border: '1px solid #e1e0db', borderRadius: '10px', padding: '24px' }}>
          <h3 style={{ font: '700 14px var(--font-inter)', margin: '0 0 16px', color: '#151515', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Info Toko</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={labelStyle}>Nama Toko</label>
              <input value={cms.shopName} onChange={e => update('shopName', e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Slogan</label>
              <input value={cms.slogan} onChange={e => update('slogan', e.target.value)} style={inputStyle} />
            </div>
          </div>
          <div style={{ marginTop: '14px' }}>
            <label style={labelStyle}>Alamat</label>
            <textarea value={cms.address} onChange={e => update('address', e.target.value)} rows={2} style={{ ...inputStyle, resize: 'vertical' }} />
          </div>
          <div style={{ marginTop: '14px' }}>
            <label style={labelStyle}>Google Maps URL</label>
            <input value={cms.mapsUrl} onChange={e => update('mapsUrl', e.target.value)} style={inputStyle} />
          </div>
        </section>

        {/* Social Links */}
        <section style={{ background: '#fff', border: '1px solid #e1e0db', borderRadius: '10px', padding: '24px' }}>
          <h3 style={{ font: '700 14px var(--font-inter)', margin: '0 0 16px', color: '#151515', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Social & Marketplace</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            {([
              ['instagramUrl', 'Instagram'],
              ['tiktokUrl', 'TikTok'],
              ['shopeeUrl', 'Shopee'],
              ['tokopediaUrl', 'Tokopedia'],
              ['lazadaUrl', 'Lazada'],
            ] as const).map(([field, label]) => (
              <div key={field}>
                <label style={labelStyle}>{label}</label>
                <input value={cms[field]} onChange={e => update(field, e.target.value)} style={inputStyle} />
              </div>
            ))}
          </div>
        </section>

        {/* About */}
        <section style={{ background: '#fff', border: '1px solid #e1e0db', borderRadius: '10px', padding: '24px' }}>
          <h3 style={{ font: '700 14px var(--font-inter)', margin: '0 0 16px', color: '#151515', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tentang Kami</h3>
          <div style={{ marginBottom: '14px' }}>
            <label style={labelStyle}>Judul About</label>
            <input value={cms.aboutTitle} onChange={e => update('aboutTitle', e.target.value)} style={inputStyle} />
          </div>
          <div style={{ marginBottom: '14px' }}>
            <label style={labelStyle}>Deskripsi 1</label>
            <textarea value={cms.aboutDesc1} onChange={e => update('aboutDesc1', e.target.value)} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
          </div>
          <div>
            <label style={labelStyle}>Deskripsi 2</label>
            <textarea value={cms.aboutDesc2} onChange={e => update('aboutDesc2', e.target.value)} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
          </div>
        </section>

        {/* Custom Section */}
        <section style={{ background: '#fff', border: '1px solid #e1e0db', borderRadius: '10px', padding: '24px' }}>
          <h3 style={{ font: '700 14px var(--font-inter)', margin: '0 0 16px', color: '#151515', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Custom Jersey Section</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Image URL</label>
              <input value={cms.customImage} onChange={e => update('customImage', e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Fabric Chip Title</label>
              <input value={cms.customFabricChipTitle} onChange={e => update('customFabricChipTitle', e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Fabric Chip Desc</label>
              <input value={cms.customFabricChipDesc} onChange={e => update('customFabricChipDesc', e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Custom Title</label>
              <input value={cms.customTitle} onChange={e => update('customTitle', e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Custom Subtitle</label>
              <input value={cms.customSubtitle} onChange={e => update('customSubtitle', e.target.value)} style={inputStyle} />
            </div>
          </div>
        </section>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button type="submit" style={{
            padding: '12px 24px', background: '#151515', color: '#fff', border: 'none', borderRadius: '6px',
            font: '700 12px var(--font-inter)', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.8px',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            {saved ? <><Check style={{ width: '14px' }} /> Tersimpan!</> : 'Simpan Semua'}
          </button>
          {saved && <span style={{ font: '400 12px var(--font-inter)', color: '#10b981' }}>Perubahan berhasil disimpan</span>}
        </div>
      </form>
    </div>
  );
}
