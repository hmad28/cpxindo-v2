'use client';
import { useState, useEffect } from 'react';
import {
  Plus, Trash2, Check, List, Star, Image as ImageIcon,
  Phone, LayoutDashboard, Share2, FileText, Package
} from '@/components/icons';
import {
  getStoredAdmins, saveAdmins,
  HeroSlide, CMSSettings, FAQ, Testimonial
} from '@/lib/db';
import { Product } from '@/lib/data';

export function AdminPanel() {
  const [adminSubTab, setAdminSubTab] = useState<'overview' | 'whatsapp_slides' | 'products' | 'testimonials' | 'cms' | 'faqs'>('overview');

  const [wa1, setWa1] = useState('');
  const [wa2, setWa2] = useState('');
  const [wa3, setWa3] = useState('');
  const [waSaved, setWaSaved] = useState(false);
  const activeWACount = [wa1, wa2, wa3].filter(num => num.trim() !== '').length;

  // Products CRUD states
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Product form states
  const [pId, setPId] = useState('');
  const [pName, setPName] = useState('');
  const [pType, setPType] = useState('');
  const [pPrice, setPPrice] = useState(150000);
  const [pDiscountPrice, setPDiscountPrice] = useState('');
  const [pTag, setPTag] = useState('');
  const [pColors, setPColors] = useState('');
  const [pSizes, setPSizes] = useState('M, L, XL, XXL');
  const [pDesc, setPDesc] = useState('');
  const [pMatJersey, setPMatJersey] = useState('');
  const [pMatCelana, setPMatCelana] = useState('');
  const [pIsCustom, setPIsCustom] = useState(false);
  const [pMinOrder, setPMinOrder] = useState(6);
  const [pWholesale, setPWholesale] = useState('');
  const [pMainImg, setPMainImg] = useState('');
  const [pAllImgs, setPAllImgs] = useState('');

  // Testimonials CRUD states
  const [testimonialsList, setTestimonialsList] = useState<Testimonial[]>([]);
  const [showTestForm, setShowTestForm] = useState(false);
  const [editingTest, setEditingTest] = useState<Testimonial | null>(null);

  // Testimonial form states
  const [tName, setTName] = useState('');
  const [tTeam, setTTeam] = useState('');
  const [tText, setTText] = useState('');
  const [tRating, setTRating] = useState(5);

  // Banner slider CRUD states
  const [slidesList, setSlidesList] = useState<HeroSlide[]>([]);
  const [showSlideForm, setShowSlideForm] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);

  // Slide form states
  const [sId, setSId] = useState('');
  const [sTitle, setSTitle] = useState('');
  const [sSubtitle, setSSubtitle] = useState('');
  const [sImage, setSImage] = useState('');

  // CMS Web settings states
  const [cmsShopName, setCmsShopName] = useState('');
  const [cmsSlogan, setCmsSlogan] = useState('');
  const [cmsAddress, setCmsAddress] = useState('');
  const [cmsMapsUrl, setCmsMapsUrl] = useState('');
  const [cmsInstagramUrl, setCmsInstagramUrl] = useState('');
  const [cmsTiktokUrl, setCmsTiktokUrl] = useState('');
  const [cmsShopeeUrl, setCmsShopeeUrl] = useState('');
  const [cmsTokopediaUrl, setCmsTokopediaUrl] = useState('');
  const [cmsLazadaUrl, setCmsLazadaUrl] = useState('');
  const [cmsAboutTitle, setCmsAboutTitle] = useState('');
  const [cmsAboutDesc1, setCmsAboutDesc1] = useState('');
  const [cmsAboutDesc2, setCmsAboutDesc2] = useState('');

  // Custom Section CMS settings states
  const [cmsCustomImg, setCmsCustomImg] = useState('');
  const [cmsCustomFabTitle, setCmsCustomFabTitle] = useState('');
  const [cmsCustomFabDesc, setCmsCustomFabDesc] = useState('');
  const [cmsCustomTitle, setCmsCustomTitle] = useState('');
  const [cmsCustomSubtitle, setCmsCustomSubtitle] = useState('');

  const [cmsSaved, setCmsSaved] = useState(false);

  // FAQ CRUD States
  const [faqsList, setFaqsList] = useState<FAQ[]>([]);
  const [showFaqForm, setShowFaqForm] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);

  // FAQ form states
  const [fQuestion, setFQuestion] = useState('');
  const [fAnswer, setFAnswer] = useState('');

  useEffect(() => {
    const admins = getStoredAdmins();
    setWa1(admins[0] || '');
    setWa2(admins[1] || '');
    setWa3(admins[2] || '');

    fetch('/api/products').then(r => r.json()).then(setProductsList);
    fetch('/api/testimonials').then(r => r.json()).then(setTestimonialsList);
    fetch('/api/slides').then(r => r.json()).then(setSlidesList);
    fetch('/api/faqs').then(r => r.json()).then(setFaqsList);

    fetch('/api/cms').then(r => r.json()).then(cms => {
      setCmsShopName(cms.shopName);
      setCmsSlogan(cms.slogan);
      setCmsAddress(cms.address);
      setCmsMapsUrl(cms.mapsUrl);
      setCmsInstagramUrl(cms.instagramUrl);
      setCmsTiktokUrl(cms.tiktokUrl);
      setCmsShopeeUrl(cms.shopeeUrl);
      setCmsTokopediaUrl(cms.tokopediaUrl);
      setCmsLazadaUrl(cms.lazadaUrl);
      setCmsAboutTitle(cms.aboutTitle);
      setCmsAboutDesc1(cms.aboutDesc1);
      setCmsAboutDesc2(cms.aboutDesc2);

      setCmsCustomImg(cms.customImage || '');
      setCmsCustomFabTitle(cms.customFabricChipTitle || '');
      setCmsCustomFabDesc(cms.customFabricChipDesc || '');
      setCmsCustomTitle(cms.customTitle || '');
      setCmsCustomSubtitle(cms.customSubtitle || '');
    });
  }, []);

  const handleSaveWA = (e: React.FormEvent) => {
    e.preventDefault();
    saveAdmins([wa1, wa2, wa3]);
    setWaSaved(true);
    setTimeout(() => setWaSaved(false), 2000);
  };

  // Product CRUD Handlers
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setPId(`prod-${Date.now()}`);
    setPName('');
    setPType('');
    setPPrice(150000);
    setPDiscountPrice('');
    setPTag('');
    setPColors('#e3262e, #111');
    setPSizes('M, L, XL, XXL');
    setPDesc('');
    setPMatJersey('Jersey Dryfit Milano');
    setPMatCelana('');
    setPIsCustom(false);
    setPMinOrder(6);
    setPWholesale('');
    setPMainImg('https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1000&q=85');
    setPAllImgs('https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1000&q=85');
    setShowProductForm(true);
  };

  const handleEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setPId(prod.id);
    setPName(prod.name);
    setPType(prod.type);
    setPPrice(prod.price);
    setPDiscountPrice(prod.discountPrice ? prod.discountPrice.toString() : '');
    setPTag(prod.tag || '');
    setPColors(prod.colors.join(', '));
    setPSizes(prod.sizes.join(', '));
    setPDesc(prod.description);
    setPMatJersey(prod.materialJersey || '');
    setPMatCelana(prod.materialCelana || '');
    setPIsCustom(!!prod.isCustom);
    setPMinOrder(prod.minOrder || 6);
    setPWholesale(prod.wholesalePrice ? prod.wholesalePrice.toString() : '');
    setPMainImg(prod.image);
    setPAllImgs(prod.images ? prod.images.join(', ') : prod.image);
    setShowProductForm(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      setProductsList(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const colorsArr = pColors.split(',').map(c => c.trim()).filter(Boolean);
    const sizesArr = pSizes.split(',').map(s => s.trim()).filter(Boolean);
    const imagesArr = pAllImgs.split(',').map(img => img.trim()).filter(Boolean);

    const newProd: Product = {
      id: pId,
      name: pName,
      type: pType,
      price: pPrice,
      discountPrice: pDiscountPrice ? parseInt(pDiscountPrice, 10) : undefined,
      image: pMainImg,
      images: imagesArr.length > 0 ? imagesArr : [pMainImg],
      tag: pTag || undefined,
      colors: colorsArr,
      sizes: sizesArr,
      description: pDesc,
      materialJersey: pMatJersey || undefined,
      materialCelana: pMatCelana || undefined,
      isCustom: pIsCustom,
      minOrder: pIsCustom ? pMinOrder : undefined,
      wholesalePrice: pWholesale ? parseInt(pWholesale, 10) : undefined,
      suitableFor: pType ? [pType.split(' ')[0]] : []
    };

    let updatedList: Product[];
    if (editingProduct) {
      updatedList = productsList.map(p => p.id === pId ? newProd : p);
    } else {
      updatedList = [...productsList, newProd];
    }

    if (editingProduct) {
      await fetch(`/api/products/${pId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newProd) });
      setProductsList(updatedList);
    } else {
      const res = await fetch('/api/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newProd) });
      const created = await res.json();
      setProductsList(prev => [...prev, created]);
    }
    setShowProductForm(false);
    setEditingProduct(null);
  };

  // Testimonials CRUD Handlers
  const handleOpenAddTest = () => {
    setEditingTest(null);
    setTName('');
    setTTeam('');
    setTText('');
    setTRating(5);
    setShowTestForm(true);
  };

  const handleEditTest = (test: Testimonial) => {
    setEditingTest(test);
    setTName(test.name);
    setTTeam(test.team);
    setTText(test.text);
    setTRating(test.rating);
    setShowTestForm(true);
  };

  const handleDeleteTest = async (id: string) => {
    if (confirm('Hapus testimonial ini?')) {
      await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
      setTestimonialsList(prev => prev.filter(t => t.id !== id));
    }
  };

  const handleTestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = editingTest ? editingTest.id : `test-${Date.now()}`;
    const newTest: Testimonial = {
      id,
      name: tName,
      team: tTeam,
      text: tText,
      rating: tRating
    };

    let updatedList: Testimonial[];
    if (editingTest) {
      updatedList = testimonialsList.map(t => t.id === id ? newTest : t);
    } else {
      updatedList = [...testimonialsList, newTest];
    }

    if (editingTest) {
      await fetch(`/api/testimonials/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newTest) });
      setTestimonialsList(updatedList);
    } else {
      const res = await fetch('/api/testimonials', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newTest) });
      const created = await res.json();
      setTestimonialsList(prev => [...prev, created]);
    }
    setShowTestForm(false);
    setEditingTest(null);
  };

  // Slides CRUD Handlers
  const handleOpenAddSlide = () => {
    setEditingSlide(null);
    setSId(`slide-${Date.now()}`);
    setSTitle('');
    setSSubtitle('');
    setSImage('/images/cpx_welcome.png');
    setShowSlideForm(true);
  };

  const handleEditSlide = (slide: HeroSlide) => {
    setEditingSlide(slide);
    setSId(slide.id);
    setSTitle(slide.title);
    setSSubtitle(slide.subtitle);
    setSImage(slide.image);
    setShowSlideForm(true);
  };

  const handleDeleteSlide = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus slide banner ini?')) {
      await fetch(`/api/slides/${id}`, { method: 'DELETE' });
      setSlidesList(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleSlideSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newSlide: HeroSlide = {
      id: sId,
      title: sTitle,
      subtitle: sSubtitle,
      image: sImage
    };

    let updatedList: HeroSlide[];
    if (editingSlide) {
      updatedList = slidesList.map(s => s.id === sId ? newSlide : s);
    } else {
      updatedList = [...slidesList, newSlide];
    }

    if (editingSlide) {
      await fetch(`/api/slides/${sId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newSlide) });
      setSlidesList(updatedList);
    } else {
      const res = await fetch('/api/slides', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newSlide) });
      const created = await res.json();
      setSlidesList(prev => [...prev, created]);
    }
    setShowSlideForm(false);
    setEditingSlide(null);
  };

  // FAQ CRUD Handlers
  const handleOpenAddFaq = () => {
    setEditingFaq(null);
    setFQuestion('');
    setFAnswer('');
    setShowFaqForm(true);
  };

  const handleEditFaq = (faq: FAQ) => {
    setEditingFaq(faq);
    setFQuestion(faq.q);
    setFAnswer(faq.a);
    setShowFaqForm(true);
  };

  const handleDeleteFaq = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus FAQ ini?')) {
      await fetch(`/api/faqs/${id}`, { method: 'DELETE' });
      setFaqsList(prev => prev.filter(f => f.id !== id));
      window.dispatchEvent(new Event('faq-update'));
    }
  };

  const handleFaqSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = editingFaq ? editingFaq.id : `faq-${Date.now()}`;
    const newFaq: FAQ = {
      id,
      q: fQuestion,
      a: fAnswer
    };

    let updatedList: FAQ[];
    if (editingFaq) {
      updatedList = faqsList.map(f => f.id === id ? newFaq : f);
    } else {
      updatedList = [...faqsList, newFaq];
    }

    if (editingFaq) {
      await fetch(`/api/faqs/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newFaq) });
      setFaqsList(updatedList);
    } else {
      const res = await fetch('/api/faqs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newFaq) });
      const created = await res.json();
      setFaqsList(prev => [...prev, created]);
    }
    setShowFaqForm(false);
    setEditingFaq(null);

    window.dispatchEvent(new Event('faq-update'));
  };

  // CMS Submit Handler
  const handleSaveCMS = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated: CMSSettings = {
      shopName: cmsShopName,
      slogan: cmsSlogan,
      address: cmsAddress,
      mapsUrl: cmsMapsUrl,
      instagramUrl: cmsInstagramUrl,
      tiktokUrl: cmsTiktokUrl,
      shopeeUrl: cmsShopeeUrl,
      tokopediaUrl: cmsTokopediaUrl,
      lazadaUrl: cmsLazadaUrl,
      aboutTitle: cmsAboutTitle,
      aboutDesc1: cmsAboutDesc1,
      aboutDesc2: cmsAboutDesc2,

      customImage: cmsCustomImg,
      customFabricChipTitle: cmsCustomFabTitle,
      customFabricChipDesc: cmsCustomFabDesc,
      customTitle: cmsCustomTitle,
      customSubtitle: cmsCustomSubtitle
    };
    await fetch('/api/cms', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updated) });
    setCmsSaved(true);
    setTimeout(() => setCmsSaved(false), 2000);

    window.dispatchEvent(new Event('cms-update'));
  };

  return (
    <div className="admin-layout-grid">

      {/* Side Tab Navigation */}
      <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e1e0db', display: 'flex', flexDirection: 'column', gap: '8px', boxShadow: '0 4px 20px -2px rgba(0,0,0,0.02)' }}>
        <h4 style={{ font: '700 13px var(--font-inter)', letterSpacing: '0.8px', color: '#888', margin: '5px 0 10px 10px', textTransform: 'uppercase' }}>CPX MANAGEMENT</h4>

        <button
          onClick={() => setAdminSubTab('overview')}
          style={{
            padding: '12px 15px',
            textAlign: 'left',
            background: adminSubTab === 'overview' ? '#f5f4f0' : 'none',
            border: 'none',
            font: '700 13px var(--font-inter)',
            color: adminSubTab === 'overview' ? '#e3262e' : '#444',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            transition: 'all 0.2s'
          }}
        >
          <LayoutDashboard style={{ width: '16px' }} /> Ringkasan
        </button>

        <button
          onClick={() => setAdminSubTab('products')}
          style={{
            padding: '12px 15px',
            textAlign: 'left',
            background: adminSubTab === 'products' ? '#f5f4f0' : 'none',
            border: 'none',
            font: '700 13px var(--font-inter)',
            color: adminSubTab === 'products' ? '#e3262e' : '#444',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            transition: 'all 0.2s'
          }}
        >
          <List style={{ width: '16px' }} /> Katalog Produk
        </button>

        <button
          onClick={() => setAdminSubTab('whatsapp_slides')}
          style={{
            padding: '12px 15px',
            textAlign: 'left',
            background: adminSubTab === 'whatsapp_slides' ? '#f5f4f0' : 'none',
            border: 'none',
            font: '700 13px var(--font-inter)',
            color: adminSubTab === 'whatsapp_slides' ? '#e3262e' : '#444',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            transition: 'all 0.2s'
          }}
        >
          <Share2 style={{ width: '16px' }} /> WhatsApp & Banner
        </button>

        <button
          onClick={() => setAdminSubTab('testimonials')}
          style={{
            padding: '12px 15px',
            textAlign: 'left',
            background: adminSubTab === 'testimonials' ? '#f5f4f0' : 'none',
            border: 'none',
            font: '700 13px var(--font-inter)',
            color: adminSubTab === 'testimonials' ? '#e3262e' : '#444',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            transition: 'all 0.2s'
          }}
        >
          <Star style={{ width: '16px' }} /> Testimonial Klien
        </button>

        <button
          onClick={() => setAdminSubTab('faqs')}
          style={{
            padding: '12px 15px',
            textAlign: 'left',
            background: adminSubTab === 'faqs' ? '#f5f4f0' : 'none',
            border: 'none',
            font: '700 13px var(--font-inter)',
            color: adminSubTab === 'faqs' ? '#e3262e' : '#444',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            transition: 'all 0.2s'
          }}
        >
          <Phone style={{ width: '16px' }} /> FAQ Manager
        </button>

        <button
          onClick={() => setAdminSubTab('cms')}
          style={{
            padding: '12px 15px',
            textAlign: 'left',
            background: adminSubTab === 'cms' ? '#f5f4f0' : 'none',
            border: 'none',
            font: '700 13px var(--font-inter)',
            color: adminSubTab === 'cms' ? '#e3262e' : '#444',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            transition: 'all 0.2s'
          }}
        >
          <FileText style={{ width: '16px' }} /> CMS Web Settings
        </button>
      </div>

      {/* Main Management Panels */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>

        {/* SUBTAB A: OVERVIEW / STATS SUMMARY */}
        {adminSubTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div style={{ background: '#fff', border: '1px solid #e1e0db', borderRadius: '8px', padding: '30px', boxShadow: '0 4px 20px -2px rgba(0,0,0,0.02)' }}>
              <span style={{ color: '#e3262e', fontSize: '11px', fontWeight: '800', letterSpacing: '1px' }}>DASHBOARD UTAMA</span>
              <h2 style={{ font: '700 28px var(--font-oswald)', letterSpacing: '-0.5px', margin: '5px 0 10px 0', textTransform: 'uppercase' }}>Selamat Datang, Admin CPX!</h2>
              <p style={{ margin: 0, color: '#666', fontSize: '14px', lineHeight: '1.6' }}>
                Gunakan menu sebelah kiri untuk mengelola katalog e-commerce, mengedit slider promosi secara visual, mengubah nomor admin tujuan checkout WhatsApp, serta mengelola testimonial klien.
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>

              <div
                onClick={() => setAdminSubTab('products')}
                style={{ background: '#fff', border: '1px solid #e1e0db', padding: '25px', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 20px -2px rgba(0,0,0,0.02)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#151515'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#e1e0db'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <span style={{ font: '700 11px var(--font-inter)', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Produk</span>
                  <Package style={{ color: '#e3262e', width: '20px' }} />
                </div>
                <strong style={{ font: '700 36px var(--font-oswald)', color: '#111' }}>{productsList.length}</strong>
                <span style={{ display: 'block', fontSize: '12px', color: '#666', marginTop: '5px' }}>Jersey & Aksesoris Aktif</span>
              </div>

              <div
                onClick={() => setAdminSubTab('whatsapp_slides')}
                style={{ background: '#fff', border: '1px solid #e1e0db', padding: '25px', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 20px -2px rgba(0,0,0,0.02)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#151515'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#e1e0db'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <span style={{ font: '700 11px var(--font-inter)', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Slide Hero</span>
                  <ImageIcon style={{ color: '#e3262e', width: '20px' }} />
                </div>
                <strong style={{ font: '700 36px var(--font-oswald)', color: '#111' }}>{slidesList.length}</strong>
                <span style={{ display: 'block', fontSize: '12px', color: '#666', marginTop: '5px' }}>Banner Promo Carousel</span>
              </div>

              <div
                onClick={() => setAdminSubTab('whatsapp_slides')}
                style={{ background: '#fff', border: '1px solid #e1e0db', padding: '25px', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 20px -2px rgba(0,0,0,0.02)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#151515'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#e1e0db'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <span style={{ font: '700 11px var(--font-inter)', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Admin WhatsApp</span>
                  <Phone style={{ color: '#e3262e', width: '20px' }} />
                </div>
                <strong style={{ font: '700 36px var(--font-oswald)', color: '#111' }}>{activeWACount}</strong>
                <span style={{ display: 'block', fontSize: '12px', color: '#666', marginTop: '5px' }}>Nomor Penerima Order</span>
              </div>

              <div
                onClick={() => setAdminSubTab('faqs')}
                style={{ background: '#fff', border: '1px solid #e1e0db', padding: '25px', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 20px -2px rgba(0,0,0,0.02)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#151515'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#e1e0db'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <span style={{ font: '700 11px var(--font-inter)', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tanya Jawab (FAQ)</span>
                  <Check style={{ color: '#2e7d32', width: '20px' }} />
                </div>
                <strong style={{ font: '700 36px var(--font-oswald)', color: '#111' }}>{faqsList.length}</strong>
                <span style={{ display: 'block', fontSize: '12px', color: '#666', marginTop: '5px' }}>Daftar Pertanyaan FAQ</span>
              </div>

            </div>
          </div>
        )}

        {/* SUBTAB B: PRODUCTS CRUD */}
        {adminSubTab === 'products' && (
          <section style={{ background: '#fff', padding: '30px', borderRadius: '8px', border: '1px solid #e1e0db', boxShadow: '0 4px 20px -2px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
              <div>
                <span style={{ color: '#e3262e', fontSize: '11px', fontWeight: '800', letterSpacing: '1px' }}>MANAJEMEN KATALOG</span>
                <h2 style={{ font: '700 24px var(--font-oswald)', letterSpacing: '-0.5px', margin: '3px 0 0 0', textTransform: 'uppercase' }}>Katalog Produk CPX</h2>
              </div>
              {!showProductForm && (
                <button className="btn primary" onClick={handleOpenAddProduct} style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '42px', borderRadius: '6px' }}>
                  ADD NEW PRODUCT <Plus style={{ width: '16px' }} />
                </button>
              )}
            </div>

            {/* Product Add/Edit Form */}
            {showProductForm && (
              <div style={{ background: '#fafafa', border: '1px solid #e1e0db', padding: '30px', borderRadius: '8px', marginBottom: '35px' }}>
                <h3 style={{ font: '700 20px var(--font-oswald)', marginBottom: '25px', color: '#111', textTransform: 'uppercase' }}>
                  {editingProduct ? '📝 EDIT PRODUK CPX' : '✨ TAMBAH PRODUK BARU'}
                </h3>
                <form onSubmit={handleProductSubmit} className="admin-form-grid">
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', color: '#666', marginBottom: '6px' }}>Nama Produk *</label>
                    <input type="text" value={pName} onChange={e => setPName(e.target.value)} placeholder="Contoh: Set Jersey Futsal Dont Quit" required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', outline: 'none' }} />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', color: '#666', marginBottom: '6px' }}>Kategori/Tipe (e.g. Football Set, Cycling Jersey) *</label>
                    <input type="text" value={pType} onChange={e => setPType(e.target.value)} placeholder="Contoh: Football Set" required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', outline: 'none' }} />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', color: '#666', marginBottom: '6px' }}>Harga Normal (IDR) *</label>
                    <input type="number" value={pPrice} onChange={e => setPPrice(parseInt(e.target.value, 10))} placeholder="Contoh: 199000" required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', outline: 'none' }} />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', color: '#666', marginBottom: '6px' }}>Harga Diskon (IDR - Opsional)</label>
                    <input type="number" value={pDiscountPrice} onChange={e => setPDiscountPrice(e.target.value)} placeholder="Contoh: 150000" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', outline: 'none' }} />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', color: '#666', marginBottom: '6px' }}>Warna (Pisahkan koma, e.g. #df2028, #111)</label>
                    <input type="text" value={pColors} onChange={e => setPColors(e.target.value)} required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', outline: 'none' }} />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', color: '#666', marginBottom: '6px' }}>Ukuran (Pisahkan koma, e.g. M, L, XL, XXL)</label>
                    <input type="text" value={pSizes} onChange={e => setPSizes(e.target.value)} required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', outline: 'none' }} />
                  </div>

                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', color: '#666', marginBottom: '6px' }}>Deskripsi Produk *</label>
                    <textarea value={pDesc} onChange={e => setPDesc(e.target.value)} required rows={4} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', font: '14px var(--font-inter)', outline: 'none' }} />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', color: '#666', marginBottom: '6px' }}>Material Jersey</label>
                    <input type="text" value={pMatJersey} onChange={e => setPMatJersey(e.target.value)} placeholder="e.g. Jersey Dryfit Milano" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', outline: 'none' }} />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', color: '#666', marginBottom: '6px' }}>Material Celana (Opsional)</label>
                    <input type="text" value={pMatCelana} onChange={e => setPMatCelana(e.target.value)} placeholder="e.g. Scuba" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', outline: 'none' }} />
                  </div>

                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '700', color: '#111', cursor: 'pointer', margin: '5px 0' }}>
                      <input type="checkbox" checked={pIsCustom} onChange={e => setPIsCustom(e.target.checked)} style={{ width: '16px', height: '16px', cursor: 'pointer' }} />
                      Ini Produk Custom (Pemesanan Minimal 6 Pcs)
                    </label>
                  </div>

                  {pIsCustom && (
                    <>
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', color: '#666', marginBottom: '6px' }}>Min Order (pcs)</label>
                        <input type="number" value={pMinOrder} onChange={e => setPMinOrder(parseInt(e.target.value, 10))} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', outline: 'none' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', color: '#666', marginBottom: '6px' }}>Harga Grosir (IDR)</label>
                        <input type="number" value={pWholesale} onChange={e => setPWholesale(e.target.value)} placeholder="e.g. 125000" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', outline: 'none' }} />
                      </div>
                    </>
                  )}

                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', color: '#666', marginBottom: '6px' }}>Foto Utama (URL) *</label>
                    <input type="text" value={pMainImg} onChange={e => setPMainImg(e.target.value)} required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', outline: 'none' }} />
                  </div>

                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', color: '#666', marginBottom: '6px' }}>Foto Lainnya (Multiple Images, pisahkan koma - minimal 5 hingga 8 gambar)</label>
                    <input type="text" value={pAllImgs} onChange={e => setPAllImgs(e.target.value)} placeholder="URL1, URL2, URL3..." style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', outline: 'none' }} />
                  </div>

                  <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '10px', marginTop: '15px' }}>
                    <button type="submit" className="btn primary" style={{ height: '44px', padding: '0 25px', borderRadius: '6px' }}>SIMPAN PRODUK</button>
                    <button type="button" className="btn" onClick={() => setShowProductForm(false)} style={{ background: '#eee', color: '#111', height: '44px', padding: '0 25px', borderRadius: '6px' }}>BATAL</button>
                  </div>

                </form>
              </div>
            )}

            {/* Product Table List */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e1e0db', fontSize: '11px', textTransform: 'uppercase', color: '#888' }}>
                    <th style={{ padding: '15px 12px' }}>Foto</th>
                    <th style={{ padding: '15px 12px' }}>Nama Produk</th>
                    <th style={{ padding: '15px 12px' }}>Tipe</th>
                    <th style={{ padding: '15px 12px' }}>Harga</th>
                    <th style={{ padding: '15px 12px' }}>Custom</th>
                    <th style={{ padding: '15px 12px', textAlign: 'right' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {productsList.map(p => (
                    <tr key={p.id} className="admin-table-row" style={{ borderBottom: '1px solid #eee', fontSize: '14px', transition: 'background 0.2s' }}>
                      <td style={{ padding: '12px' }}>
                        <img src={p.image} alt={p.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #eee' }} />
                      </td>
                      <td style={{ padding: '12px', fontWeight: '700', color: '#111' }}>{p.name}</td>
                      <td style={{ padding: '12px', color: '#666', fontSize: '13px' }}>{p.type}</td>
                      <td style={{ padding: '12px' }}>
                        {p.discountPrice ? (
                          <div>
                            <span style={{ color: '#e3262e', fontWeight: '700' }}>IDR {p.discountPrice.toLocaleString('id-ID')}</span>
                            <span style={{ color: '#aaa', textDecoration: 'line-through', fontSize: '11px', marginLeft: '5px' }}>IDR {p.price.toLocaleString('id-ID')}</span>
                          </div>
                        ) : (
                          <strong style={{ color: '#111' }}>IDR {p.price.toLocaleString('id-ID')}</strong>
                        )}
                      </td>
                      <td style={{ padding: '12px' }}>
                        {p.isCustom ? (
                          <span style={{ background: '#fff5f5', color: '#e3262e', fontSize: '10px', padding: '4px 10px', borderRadius: '20px', fontWeight: '800', border: '1px solid rgba(227,38,46,0.1)' }}>CUSTOM</span>
                        ) : (
                          <span style={{ background: '#f0faf0', color: '#2e7d32', fontSize: '10px', padding: '4px 10px', borderRadius: '20px', fontWeight: '800', border: '1px solid rgba(46,125,50,0.1)' }}>READY</span>
                        )}
                      </td>
                      <td style={{ padding: '12px', textAlign: 'right' }}>
                        <button
                          onClick={() => handleEditProduct(p)}
                          style={{ background: 'none', border: 'none', color: '#151515', cursor: 'pointer', fontWeight: '700', fontSize: '12px', marginRight: '15px' }}
                        >
                          EDIT
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          style={{ background: 'none', border: 'none', color: '#e3262e', cursor: 'pointer', fontWeight: '700', fontSize: '12px' }}
                        >
                          DELETE
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* SUBTAB C: WHATSAPP CONFIG & HERO BANNER SLIDES */}
        {adminSubTab === 'whatsapp_slides' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>

            {/* 1. WHATSAPP CONFIG */}
            <section style={{ background: '#fff', padding: '30px', borderRadius: '8px', border: '1px solid #e1e0db', boxShadow: '0 4px 20px -2px rgba(0,0,0,0.02)' }}>
              <div>
                <span style={{ color: '#e3262e', fontSize: '11px', fontWeight: '800', letterSpacing: '1px' }}>KONFIGURASI</span>
                <h2 style={{ font: '700 24px var(--font-oswald)', letterSpacing: '-0.5px', margin: '3px 0 20px 0', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Phone style={{ color: '#e3262e', width: '22px' }} /> WhatsApp Admin Multi-User
                </h2>
              </div>
              <p style={{ color: '#666', fontSize: '14px', marginBottom: '25px', lineHeight: '1.5' }}>
                Kelola hingga maksimal 3 nomor WhatsApp admin penerima pesanan. Sistem akan mengalihkan checkout ke salah satu nomor ini secara dinamis (round-robin/acak).
              </p>
              <form onSubmit={handleSaveWA} style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: '500px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', color: '#666', marginBottom: '6px' }}>Admin WhatsApp 1 *</label>
                  <input
                    type="text"
                    value={wa1}
                    onChange={e => setWa1(e.target.value)}
                    placeholder="Contoh: 6285172003667"
                    required
                    style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', font: '14px var(--font-inter)', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', color: '#666', marginBottom: '6px' }}>Admin WhatsApp 2 (Opsional)</label>
                  <input
                    type="text"
                    value={wa2}
                    onChange={e => setWa2(e.target.value)}
                    placeholder="Contoh: 6285172003668"
                    style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', font: '14px var(--font-inter)', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', color: '#666', marginBottom: '6px' }}>Admin WhatsApp 3 (Opsional)</label>
                  <input
                    type="text"
                    value={wa3}
                    onChange={e => setWa3(e.target.value)}
                    placeholder="Contoh: 6285172003669"
                    style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', font: '14px var(--font-inter)', outline: 'none' }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn primary"
                  style={{
                    alignSelf: 'flex-start',
                    background: waSaved ? '#2e7d32' : '#151515',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    height: '44px',
                    padding: '0 25px',
                    borderRadius: '6px'
                  }}
                >
                  {waSaved ? 'Tersimpan!' : 'SIMPAN KONFIGURASI'} <Check style={{ width: '16px' }} />
                </button>
              </form>
            </section>

            {/* 2. HERO SLIDES */}
            <section style={{ background: '#fff', padding: '30px', borderRadius: '8px', border: '1px solid #e1e0db', boxShadow: '0 4px 20px -2px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
                <div>
                  <span style={{ color: '#e3262e', fontSize: '11px', fontWeight: '800', letterSpacing: '1px' }}>MANAJEMEN VISUAL</span>
                  <h2 style={{ font: '700 24px var(--font-oswald)', letterSpacing: '-0.5px', margin: '3px 0 0 0', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <ImageIcon style={{ color: '#e3262e', width: '22px' }} /> Manajemen Banner Slider Hero
                  </h2>
                </div>
                {!showSlideForm && (
                  <button className="btn primary" onClick={handleOpenAddSlide} style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '42px', borderRadius: '6px' }}>
                    ADD NEW BANNER SLIDE <Plus style={{ width: '16px' }} />
                  </button>
                )}
              </div>

              {/* Slide Add/Edit Form */}
              {showSlideForm && (
                <div style={{ background: '#fafafa', border: '1px solid #e1e0db', padding: '25px', borderRadius: '8px', marginBottom: '35px', maxWidth: '600px' }}>
                  <h3 style={{ font: '700 18px var(--font-oswald)', marginBottom: '20px', textTransform: 'uppercase' }}>
                    {editingSlide ? '📝 EDIT SLIDE BANNER' : '✨ TAMBAH SLIDE BANNER'}
                  </h3>
                  <form onSubmit={handleSlideSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', color: '#666', marginBottom: '6px' }}>Judul Banner (Slogan) *</label>
                      <input type="text" value={sTitle} onChange={e => setSTitle(e.target.value)} required placeholder="Gunakan kata BEDA/VICTORY/SETTLE untuk warna merah" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', outline: 'none' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', color: '#666', marginBottom: '6px' }}>Deskripsi Ringkas *</label>
                      <textarea value={sSubtitle} onChange={e => setSSubtitle(e.target.value)} required rows={3} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', font: '14px var(--font-inter)', outline: 'none' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', color: '#666', marginBottom: '6px' }}>Gambar Latar Belakang (URL) *</label>
                      <input type="text" value={sImage} onChange={e => setSImage(e.target.value)} required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', outline: 'none' }} />
                    </div>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                      <button type="submit" className="btn primary" style={{ height: '42px', padding: '0 20px', borderRadius: '6px' }}>SIMPAN SLIDE</button>
                      <button type="button" className="btn" onClick={() => setShowSlideForm(false)} style={{ background: '#eee', color: '#111', height: '42px', padding: '0 20px', borderRadius: '6px' }}>BATAL</button>
                    </div>
                  </form>
                </div>
              )}

              {/* Slide List Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
                {slidesList.map(s => (
                  <div key={s.id} style={{ border: '1px solid #e1e0db', borderRadius: '8px', overflow: 'hidden', background: '#fff', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 15px rgba(0,0,0,0.01)' }}>
                    <div style={{ position: 'relative', height: '140px', width: '100%' }}>
                      <img src={s.image} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 100%)', padding: '15px', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                        <h4 style={{ margin: 0, fontSize: '15px', fontStyle: 'italic', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '-0.5px' }}>{s.title}</h4>
                      </div>
                    </div>
                    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px', flexGrow: 1, justifyContent: 'space-between' }}>
                      <p style={{ margin: 0, fontSize: '13px', color: '#666', lineHeight: '1.6' }}>{s.subtitle}</p>
                      <div style={{ display: 'flex', gap: '15px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
                        <button onClick={() => handleEditSlide(s)} style={{ background: 'none', border: 'none', color: '#111', cursor: 'pointer', fontWeight: '700', fontSize: '12px' }}>EDIT</button>
                        <button onClick={() => handleDeleteSlide(s.id)} style={{ background: 'none', border: 'none', color: '#e3262e', cursor: 'pointer', fontWeight: '700', fontSize: '12px' }}>DELETE</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        )}

        {/* SUBTAB D: TESTIMONIALS CRUD */}
        {adminSubTab === 'testimonials' && (
          <section style={{ background: '#fff', padding: '30px', borderRadius: '8px', border: '1px solid #e1e0db', boxShadow: '0 4px 20px -2px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
              <div>
                <span style={{ color: '#e3262e', fontSize: '11px', fontWeight: '800', letterSpacing: '1px' }}>ULASAN PELANGGAN</span>
                <h2 style={{ font: '700 24px var(--font-oswald)', letterSpacing: '-0.5px', margin: '3px 0 0 0', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Star style={{ color: '#ffb300', width: '22px', fill: 'currentColor' }} /> Testimonial Klien CPX
                </h2>
              </div>
              {!showTestForm && (
                <button className="btn primary" onClick={handleOpenAddTest} style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '42px', borderRadius: '6px' }}>
                  ADD TESTIMONIAL <Plus style={{ width: '16px' }} />
                </button>
              )}
            </div>

            {/* Testimonial Add/Edit Form */}
            {showTestForm && (
              <div style={{ background: '#fafafa', border: '1px solid #e1e0db', padding: '25px', borderRadius: '8px', marginBottom: '35px', maxWidth: '600px' }}>
                <h3 style={{ font: '700 18px var(--font-oswald)', marginBottom: '20px', textTransform: 'uppercase' }}>
                  {editingTest ? '📝 EDIT TESTIMONIAL' : '✨ TAMBAH TESTIMONIAL'}
                </h3>
                <form onSubmit={handleTestSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', color: '#666', marginBottom: '6px' }}>Nama Klien *</label>
                    <input type="text" value={tName} onChange={e => setTName(e.target.value)} placeholder="Contoh: Anwar Abu Habibi" required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', color: '#666', marginBottom: '6px' }}>Tim / Komunitas *</label>
                    <input type="text" value={tTeam} onChange={e => setTTeam(e.target.value)} placeholder="Contoh: CPX FC Bandung" required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', color: '#666', marginBottom: '6px' }}>Bintang Rating (1-5) *</label>
                    <input type="number" min={1} max={5} value={tRating} onChange={e => setTRating(parseInt(e.target.value, 10))} required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', color: '#666', marginBottom: '6px' }}>Teks Testimonial *</label>
                    <textarea value={tText} onChange={e => setTText(e.target.value)} required rows={3} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', font: '14px var(--font-inter)', outline: 'none' }} />
                  </div>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <button type="submit" className="btn primary" style={{ height: '42px', padding: '0 20px', borderRadius: '6px' }}>SIMPAN TESTIMONIAL</button>
                    <button type="button" className="btn" onClick={() => setShowTestForm(false)} style={{ background: '#eee', color: '#111', height: '42px', padding: '0 20px', borderRadius: '6px' }}>BATAL</button>
                  </div>
                </form>
              </div>
            )}

            {/* Testimonial List Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
              {testimonialsList.map(t => (
                <div key={t.id} style={{ border: '1px solid #e1e0db', padding: '25px', borderRadius: '8px', background: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 4px 15px rgba(0,0,0,0.01)' }}>
                  <div>
                    <div style={{ display: 'flex', gap: '3px', color: '#ffb300', marginBottom: '15px' }}>
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} fill="currentColor" style={{ width: '14px', height: '14px', stroke: 'none' }} />
                      ))}
                    </div>
                    <p style={{ margin: '0 0 20px 0', fontSize: '13px', color: '#444', fontStyle: 'italic', lineHeight: '1.6' }}>&quot;{t.text}&quot;</p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #eee', paddingTop: '15px', marginTop: '10px' }}>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#111' }}>{t.name}</h4>
                      <span style={{ fontSize: '12px', color: '#777' }}>{t.team}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '15px' }}>
                      <button onClick={() => handleEditTest(t)} style={{ background: 'none', border: 'none', color: '#111', cursor: 'pointer', fontWeight: '700', fontSize: '12px' }}>EDIT</button>
                      <button onClick={() => handleDeleteTest(t.id)} style={{ background: 'none', border: 'none', color: '#e3262e', cursor: 'pointer', fontWeight: '700', fontSize: '12px' }}>DELETE</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SUBTAB E: FAQ MANAGER */}
        {adminSubTab === 'faqs' && (
          <section style={{ background: '#fff', padding: '30px', borderRadius: '8px', border: '1px solid #e1e0db', boxShadow: '0 4px 20px -2px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
              <div>
                <span style={{ color: '#e3262e', fontSize: '11px', fontWeight: '800', letterSpacing: '1px' }}>TANYA JAWAB</span>
                <h2 style={{ font: '700 24px var(--font-oswald)', letterSpacing: '-0.5px', margin: '3px 0 0 0', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Check style={{ color: '#2e7d32', width: '22px' }} /> FAQ Manager
                </h2>
              </div>
              {!showFaqForm && (
                <button className="btn primary" onClick={handleOpenAddFaq} style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '42px', borderRadius: '6px' }}>
                  ADD NEW FAQ <Plus style={{ width: '16px' }} />
                </button>
              )}
            </div>

            {/* FAQ Add/Edit Form */}
            {showFaqForm && (
              <div style={{ background: '#fafafa', border: '1px solid #e1e0db', padding: '25px', borderRadius: '8px', marginBottom: '35px', maxWidth: '600px' }}>
                <h3 style={{ font: '700 18px var(--font-oswald)', marginBottom: '20px', textTransform: 'uppercase' }}>
                  {editingFaq ? '📝 EDIT PERTANYAAN FAQ' : '✨ TAMBAH PERTANYAAN FAQ'}
                </h3>
                <form onSubmit={handleFaqSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', color: '#666', marginBottom: '6px' }}>Pertanyaan *</label>
                    <input type="text" value={fQuestion} onChange={e => setFQuestion(e.target.value)} placeholder="Contoh: Apakah bisa memesan jersey satuan?" required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', color: '#666', marginBottom: '6px' }}>Jawaban *</label>
                    <textarea value={fAnswer} onChange={e => setFAnswer(e.target.value)} required rows={4} placeholder="Tuliskan jawaban yang rinci..." style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', font: '14px var(--font-inter)', outline: 'none' }} />
                  </div>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <button type="submit" className="btn primary" style={{ height: '42px', padding: '0 20px', borderRadius: '6px' }}>SIMPAN FAQ</button>
                    <button type="button" className="btn" onClick={() => setShowFaqForm(false)} style={{ background: '#eee', color: '#111', height: '42px', padding: '0 20px', borderRadius: '6px' }}>BATAL</button>
                  </div>
                </form>
              </div>
            )}

            {/* FAQ List Grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {faqsList.map(faq => (
                <div key={faq.id} style={{ border: '1px solid #e1e0db', padding: '20px', borderRadius: '8px', background: '#fff', display: 'flex', flexDirection: 'column', gap: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.01)' }}>
                  <div>
                    <h4 style={{ margin: '0 0 5px 0', fontSize: '15px', fontWeight: '700', color: '#111' }}>{faq.q}</h4>
                    <p style={{ margin: 0, fontSize: '13px', color: '#555', lineHeight: '1.6' }}>{faq.a}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '15px', borderTop: '1px solid #eee', paddingTop: '12px', marginTop: '5px' }}>
                    <button onClick={() => handleEditFaq(faq)} style={{ background: 'none', border: 'none', color: '#111', cursor: 'pointer', fontWeight: '700', fontSize: '12px' }}>EDIT</button>
                    <button onClick={() => handleDeleteFaq(faq.id)} style={{ background: 'none', border: 'none', color: '#e3262e', cursor: 'pointer', fontWeight: '700', fontSize: '12px' }}>DELETE</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SUBTAB F: WEBSITE CMS SETTINGS */}
        {adminSubTab === 'cms' && (
          <section style={{ background: '#fff', padding: '30px', borderRadius: '8px', border: '1px solid #e1e0db', boxShadow: '0 4px 20px -2px rgba(0,0,0,0.02)' }}>
            <div>
              <span style={{ color: '#e3262e', fontSize: '11px', fontWeight: '800', letterSpacing: '1px' }}>KONTEN WEB</span>
              <h2 style={{ font: '700 24px var(--font-oswald)', letterSpacing: '-0.5px', margin: '3px 0 25px 0', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FileText style={{ color: '#e3262e', width: '22px' }} /> Website CMS Settings
              </h2>
            </div>

            <form onSubmit={handleSaveCMS} style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>

              {/* Section 1: Toko & Alamat */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', borderBottom: '1px solid #eee', paddingBottom: '25px' }}>
                <h3 style={{ font: '700 16px var(--font-oswald)', margin: 0, textTransform: 'uppercase', color: '#111' }}>1. Profil Toko & Kontak</h3>
                <div className="admin-form-grid">
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', color: '#666', marginBottom: '6px' }}>Nama Toko / Brand *</label>
                    <input type="text" value={cmsShopName} onChange={e => setCmsShopName(e.target.value)} required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', color: '#666', marginBottom: '6px' }}>Slogan Toko (Footer) *</label>
                    <input type="text" value={cmsSlogan} onChange={e => setCmsSlogan(e.target.value)} required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', outline: 'none' }} />
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', color: '#666', marginBottom: '6px' }}>Alamat Lengkap Workshop & Office *</label>
                    <textarea value={cmsAddress} onChange={e => setCmsAddress(e.target.value)} required rows={3} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', font: '14px var(--font-inter)', outline: 'none' }} />
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', color: '#666', marginBottom: '6px' }}>Google Maps Embed URL (src link dari iframe embed) *</label>
                    <input type="text" value={cmsMapsUrl} onChange={e => setCmsMapsUrl(e.target.value)} required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', outline: 'none' }} />
                  </div>
                </div>
              </div>

              {/* Section 2: Halaman Tentang Kami */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', borderBottom: '1px solid #eee', paddingBottom: '25px' }}>
                <h3 style={{ font: '700 16px var(--font-oswald)', margin: 0, textTransform: 'uppercase', color: '#111' }}>2. Halaman Tentang Kami (About Us)</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', color: '#666', marginBottom: '6px' }}>Judul Halaman Tentang Kami *</label>
                    <input type="text" value={cmsAboutTitle} onChange={e => setCmsAboutTitle(e.target.value)} required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', color: '#666', marginBottom: '6px' }}>Paragraf Deskripsi 1 *</label>
                    <textarea value={cmsAboutDesc1} onChange={e => setCmsAboutDesc1(e.target.value)} required rows={3} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', font: '14px var(--font-inter)', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', color: '#666', marginBottom: '6px' }}>Paragraf Deskripsi 2 *</label>
                    <textarea value={cmsAboutDesc2} onChange={e => setCmsAboutDesc2(e.target.value)} required rows={3} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', font: '14px var(--font-inter)', outline: 'none' }} />
                  </div>
                </div>
              </div>

              {/* Section 3: Custom Section (Cara Kustom) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', borderBottom: '1px solid #eee', paddingBottom: '25px' }}>
                <h3 style={{ font: '700 16px var(--font-oswald)', margin: 0, textTransform: 'uppercase', color: '#111' }}>3. Area Desain Kustom (Beranda)</h3>
                <div className="admin-form-grid">
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', color: '#666', marginBottom: '6px' }}>Judul Bagian Kustom *</label>
                    <input type="text" value={cmsCustomTitle} onChange={e => setCmsCustomTitle(e.target.value)} required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', color: '#666', marginBottom: '6px' }}>Sub-Judul/Penjelasan *</label>
                    <input type="text" value={cmsCustomSubtitle} onChange={e => setCmsCustomSubtitle(e.target.value)} required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', color: '#666', marginBottom: '6px' }}>Bahan Chip Title *</label>
                    <input type="text" value={cmsCustomFabTitle} onChange={e => setCmsCustomFabTitle(e.target.value)} required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', color: '#666', marginBottom: '6px' }}>Bahan Chip Description *</label>
                    <input type="text" value={cmsCustomFabDesc} onChange={e => setCmsCustomFabDesc(e.target.value)} required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', outline: 'none' }} />
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', color: '#666', marginBottom: '6px' }}>Gambar Ilustrasi Kustom (URL) *</label>
                    <input type="text" value={cmsCustomImg} onChange={e => setCmsCustomImg(e.target.value)} required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', outline: 'none' }} />
                  </div>
                </div>
              </div>

              {/* Section 4: Sosial Media & Marketplaces */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <h3 style={{ font: '700 16px var(--font-oswald)', margin: 0, textTransform: 'uppercase', color: '#111' }}>4. Tautan Sosial Media & Toko Resmi</h3>
                <div className="admin-form-grid">
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', color: '#666', marginBottom: '6px' }}>Instagram URL *</label>
                    <input type="text" value={cmsInstagramUrl} onChange={e => setCmsInstagramUrl(e.target.value)} required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', color: '#666', marginBottom: '6px' }}>TikTok URL *</label>
                    <input type="text" value={cmsTiktokUrl} onChange={e => setCmsTiktokUrl(e.target.value)} required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', color: '#666', marginBottom: '6px' }}>Shopee Store URL *</label>
                    <input type="text" value={cmsShopeeUrl} onChange={e => setCmsShopeeUrl(e.target.value)} required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', color: '#666', marginBottom: '6px' }}>Tokopedia Store URL *</label>
                    <input type="text" value={cmsTokopediaUrl} onChange={e => setCmsTokopediaUrl(e.target.value)} required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', outline: 'none' }} />
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', color: '#666', marginBottom: '6px' }}>Lazada Store URL *</label>
                    <input type="text" value={cmsLazadaUrl} onChange={e => setCmsLazadaUrl(e.target.value)} required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', outline: 'none' }} />
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #eee', paddingTop: '20px', display: 'flex', gap: '15px' }}>
                <button
                  type="submit"
                  className="btn primary"
                  style={{
                    background: cmsSaved ? '#2e7d32' : '#151515',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    height: '46px',
                    padding: '0 30px',
                    borderRadius: '6px'
                  }}
                >
                  {cmsSaved ? 'Konten Berhasil Disimpan!' : 'SIMPAN SEMUA PENGATURAN'} <Check style={{ width: '16px' }} />
                </button>
              </div>

            </form>
          </section>
        )}

      </div>
    </div>
  );
}
