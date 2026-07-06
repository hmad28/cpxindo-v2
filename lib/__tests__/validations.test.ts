import {
  ProductSchema,
  TestimonialSchema,
  HeroSlideSchema,
  FAQSchema,
  CMSSettingsSchema,
} from '../validations';

describe('ProductSchema', () => {
  const validProduct = {
    id: 'prod-1',
    name: 'Test Jersey',
    type: 'Football Set',
    price: 250000,
    image: 'https://images.unsplash.com/photo-123?auto=format&fit=crop&w=900&q=85',
    images: ['https://images.unsplash.com/photo-123?auto=format&fit=crop&w=900&q=85'],
    colors: ['#151515', '#ffffff'],
    sizes: ['M', 'L', 'XL'],
    description: 'A premium jersey set for testing.',
  };

  it('accepts valid product', () => {
    const result = ProductSchema.safeParse(validProduct);
    expect(result.success).toBe(true);
  });

  it('accepts product with optional fields', () => {
    const result = ProductSchema.safeParse({
      ...validProduct,
      discountPrice: 199000,
      tag: 'BEST SELLER',
      materialJersey: 'Dryfit Milano',
      materialCelana: 'Scuba Premium',
      isCustom: true,
      minOrder: 6,
      wholesalePrice: 180000,
      suitableFor: ['Running', 'Futsal'],
    });
    expect(result.success).toBe(true);
  });

  it('rejects empty name', () => {
    const result = ProductSchema.safeParse({ ...validProduct, name: '' });
    expect(result.success).toBe(false);
  });

  it('rejects negative price', () => {
    const result = ProductSchema.safeParse({ ...validProduct, price: -100 });
    expect(result.success).toBe(false);
  });

  it('rejects zero price', () => {
    const result = ProductSchema.safeParse({ ...validProduct, price: 0 });
    expect(result.success).toBe(false);
  });

  it('rejects empty images array', () => {
    const result = ProductSchema.safeParse({ ...validProduct, images: [] });
    expect(result.success).toBe(false);
  });

  it('rejects empty colors array', () => {
    const result = ProductSchema.safeParse({ ...validProduct, colors: [] });
    expect(result.success).toBe(false);
  });

  it('rejects empty sizes array', () => {
    const result = ProductSchema.safeParse({ ...validProduct, sizes: [] });
    expect(result.success).toBe(false);
  });

  it('rejects invalid image URL', () => {
    const result = ProductSchema.safeParse({ ...validProduct, image: 'not-a-url' });
    expect(result.success).toBe(false);
  });

  it('rejects remote image hosts not configured for Next image rendering', () => {
    const result = ProductSchema.safeParse({
      ...validProduct,
      image: 'https://example.com/photo.jpg',
      images: ['https://example.com/photo.jpg'],
    });
    expect(result.success).toBe(false);
  });

  it('accepts local product images', () => {
    const result = ProductSchema.safeParse({
      ...validProduct,
      image: '/images/products/jersey.jpg',
      images: ['/images/products/jersey.jpg'],
    });
    expect(result.success).toBe(true);
  });

  it('rejects missing required fields', () => {
    const result = ProductSchema.safeParse({ id: 'prod-1' });
    expect(result.success).toBe(false);
  });
});

describe('TestimonialSchema', () => {
  const validTestimonial = {
    id: 'test-1',
    name: 'Budi Santoso',
    team: 'FC Garuda',
    text: 'Jersey kualitas bagus, nyaman dipakai.',
    rating: 5,
  };

  it('accepts valid testimonial', () => {
    const result = TestimonialSchema.safeParse(validTestimonial);
    expect(result.success).toBe(true);
  });

  it('rejects rating below 1', () => {
    const result = TestimonialSchema.safeParse({ ...validTestimonial, rating: 0 });
    expect(result.success).toBe(false);
  });

  it('rejects rating above 5', () => {
    const result = TestimonialSchema.safeParse({ ...validTestimonial, rating: 6 });
    expect(result.success).toBe(false);
  });

  it('rejects non-integer rating', () => {
    const result = TestimonialSchema.safeParse({ ...validTestimonial, rating: 4.5 });
    expect(result.success).toBe(false);
  });

  it('rejects empty text', () => {
    const result = TestimonialSchema.safeParse({ ...validTestimonial, text: '' });
    expect(result.success).toBe(false);
  });
});

describe('HeroSlideSchema', () => {
  const validSlide = {
    id: 'slide-1',
    kicker: 'NEW COLLECTION',
    title: 'BIKIN JERSEY TIM YANG KELIHATAN BEDA.',
    subtitle: 'Studio jersey custom untuk tim.',
    image: 'https://images.unsplash.com/photo-123?auto=format&fit=crop&w=1600&q=80',
    cta: 'LIHAT KATALOG',
    ctaLink: '/products',
  };

  it('accepts valid slide', () => {
    const result = HeroSlideSchema.safeParse(validSlide);
    expect(result.success).toBe(true);
  });

  it('rejects empty title', () => {
    const result = HeroSlideSchema.safeParse({ ...validSlide, title: '' });
    expect(result.success).toBe(false);
  });

  it('rejects invalid image URL', () => {
    const result = HeroSlideSchema.safeParse({ ...validSlide, image: 'bad-url' });
    expect(result.success).toBe(false);
  });
});

describe('FAQSchema', () => {
  const validFAQ = {
    id: 'faq-1',
    q: 'Apakah bisa pesan jersey satuan?',
    a: 'Bisa, CPX melayani pemesanan jersey satuan.',
  };

  it('accepts valid FAQ', () => {
    const result = FAQSchema.safeParse(validFAQ);
    expect(result.success).toBe(true);
  });

  it('rejects empty question', () => {
    const result = FAQSchema.safeParse({ ...validFAQ, q: '' });
    expect(result.success).toBe(false);
  });

  it('rejects empty answer', () => {
    const result = FAQSchema.safeParse({ ...validFAQ, a: '' });
    expect(result.success).toBe(false);
  });
});

describe('CMSSettingsSchema', () => {
  const validCMS = {
    shopName: 'CPX JERSEY',
    slogan: 'Bikin jersey tim yang kelihatan beda.',
    address: 'Jl. Test No. 123, Bandung',
    mapsUrl: 'https://www.google.com/maps/embed?cid=123',
    instagramUrl: 'https://www.instagram.com/cpx.sportswear/',
    tiktokUrl: 'https://www.tiktok.com/@cpx.sportswear',
    shopeeUrl: 'https://shopee.co.id/cpxonline',
    tokopediaUrl: 'https://www.tokopedia.com/abaholot',
    lazadaUrl: 'https://www.lazada.co.id/shop/tojerbike',
    aboutTitle: 'TENTANG CPX.',
    aboutDesc1: 'CPX hadir untuk mewadahi semangat sportivitas.',
    aboutDesc2: 'Dipercaya ratusan tim dan komunitas.',
    customImage: 'https://images.unsplash.com/photo-123?auto=format&fit=crop&w=1400&q=90',
    customFabricChipTitle: 'DRY-X FABRIC',
    customFabricChipDesc: 'Stay cool. Play harder.',
    customTitle: 'YOUR TEAM. YOUR RULES.',
    customSubtitle: 'Tim desain kami bantu wujudkan identitas tim kamu.',
  };

  it('accepts valid CMS settings', () => {
    const result = CMSSettingsSchema.safeParse(validCMS);
    expect(result.success).toBe(true);
  });

  it('accepts empty mapsUrl', () => {
    const result = CMSSettingsSchema.safeParse({ ...validCMS, mapsUrl: '' });
    expect(result.success).toBe(true);
  });

  it('rejects invalid marketplace URL', () => {
    const result = CMSSettingsSchema.safeParse({ ...validCMS, shopeeUrl: 'not-a-url' });
    expect(result.success).toBe(false);
  });

  it('rejects javascript URLs in public links', () => {
    const result = CMSSettingsSchema.safeParse({ ...validCMS, instagramUrl: 'javascript:alert(1)' });
    expect(result.success).toBe(false);
  });

  it('rejects non-HTTPS public links', () => {
    const result = CMSSettingsSchema.safeParse({ ...validCMS, tokopediaUrl: 'http://www.tokopedia.com/abaholot' });
    expect(result.success).toBe(false);
  });

  it('rejects invalid customImage URL', () => {
    const result = CMSSettingsSchema.safeParse({ ...validCMS, customImage: 'bad' });
    expect(result.success).toBe(false);
  });

  it('rejects customImage hosts not configured for Next image rendering', () => {
    const result = CMSSettingsSchema.safeParse({ ...validCMS, customImage: 'https://example.com/photo.jpg' });
    expect(result.success).toBe(false);
  });
});
