/**
 * @jest-environment jsdom
 */

// Mock the drizzle module before importing db
const mockSelect = jest.fn();
const mockDelete = jest.fn();
const mockInsert = jest.fn();

jest.mock('../db/drizzle', () => ({
  getDb: () => ({
    select: mockSelect,
    delete: mockDelete,
    insert: mockInsert,
  }),
}));

import {
  getStoredProducts,
  saveProducts,
  getStoredTestimonials,
  saveTestimonials,
  getStoredSlides,
  saveSlides,
  getStoredWishlist,
  saveWishlist,
  getStoredCMS,
  saveCMS,
  getStoredFAQs,
  saveFAQs,
  getStoredAdmins,
  saveAdmins,
} from '../db';

// Helper to build a chainable mock that resolves to `rows`
function chainMock(rows: any[]) {
  const chain: any = {
    from: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    values: jest.fn().mockResolvedValue(undefined),
    onConflictDoUpdate: jest.fn().mockResolvedValue(undefined),
  };
  // Make it thenable so `await db.select().from(table)` resolves to `rows`
  chain.then = function (resolve: any, reject: any) {
    return Promise.resolve(rows).then(resolve, reject);
  };
  return chain;
}

beforeEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
});

describe('getStoredProducts / saveProducts', () => {
  it('returns default products when DB is empty', async () => {
    mockSelect.mockReturnValue(chainMock([]));
    const products = await getStoredProducts();
    expect(products.length).toBeGreaterThan(0);
    expect(products[0]).toHaveProperty('id');
    expect(products[0]).toHaveProperty('name');
    expect(products[0]).toHaveProperty('price');
  });

  it('returns mapped products from DB rows', async () => {
    const rows = [
      { id: 'p1', name: 'Test Jersey', type: 'Jersey', price: 100000, discountPrice: null, image: 'img.jpg', images: [], tag: null, colors: ['Red'], sizes: ['M'], description: 'Desc', materialJersey: null, materialCelana: null, isCustom: false, minOrder: null, wholesalePrice: null, suitableFor: null },
    ];
    mockSelect.mockReturnValue(chainMock(rows));
    const products = await getStoredProducts();
    expect(products).toHaveLength(1);
    expect(products[0].id).toBe('p1');
    expect(products[0].name).toBe('Test Jersey');
  });

  it('deletes then inserts on save', async () => {
    mockDelete.mockReturnValue(chainMock([]));
    mockInsert.mockReturnValue({ values: jest.fn().mockResolvedValue(undefined) });

    await saveProducts([{ id: 'p1', name: 'Test', type: 'Jersey', price: 100000, image: 'img.jpg', images: [], colors: ['Red'], sizes: ['M'], description: 'Desc' }]);

    expect(mockDelete).toHaveBeenCalled();
    expect(mockInsert).toHaveBeenCalled();
  });
});

describe('getStoredTestimonials / saveTestimonials', () => {
  it('returns defaults when empty', async () => {
    mockSelect.mockReturnValue(chainMock([]));
    const list = await getStoredTestimonials();
    expect(list.length).toBeGreaterThan(0);
    expect(list[0]).toHaveProperty('name');
  });

  it('returns mapped testimonials from DB', async () => {
    const rows = [{ id: 't1', name: 'Budi', team: 'FC Test', text: 'Bagus!', rating: 5 }];
    mockSelect.mockReturnValue(chainMock(rows));
    const list = await getStoredTestimonials();
    expect(list).toEqual(rows);
  });
});

describe('getStoredSlides / saveSlides', () => {
  it('returns defaults when empty', async () => {
    mockSelect.mockReturnValue(chainMock([]));
    const slides = await getStoredSlides();
    expect(slides.length).toBeGreaterThan(0);
    expect(slides[0]).toHaveProperty('title');
    expect(slides.every((slide) => slide.image.startsWith('/images/'))).toBe(true);
  });

  it('returns mapped slides from DB', async () => {
    const rows = [{ id: 's1', title: 'Test Slide', subtitle: 'Sub', image: 'https://example.com/img.jpg' }];
    mockSelect.mockReturnValue(chainMock(rows));
    const slides = await getStoredSlides();
    expect(slides).toEqual(rows);
  });
});

describe('getStoredCMS / saveCMS', () => {
  it('returns default CMS settings when DB is empty', async () => {
    mockSelect.mockReturnValue(chainMock([]));
    const cms = await getStoredCMS();
    expect(cms.shopName).toBe('CPX JERSEY');
    expect(cms).toHaveProperty('slogan');
    expect(cms).toHaveProperty('address');
  });

  it('returns mapped CMS from DB row', async () => {
    const row = {
      id: 'singleton', shopName: 'CUSTOM NAME', slogan: 'Test slogan',
      address: '', mapsUrl: '', instagramUrl: '', tiktokUrl: '', shopeeUrl: '',
      tokopediaUrl: '', lazadaUrl: '', aboutTitle: '', aboutDesc1: '', aboutDesc2: '',
      customImage: '', customFabricChipTitle: '', customFabricChipDesc: '',
      customTitle: '', customSubtitle: '', updatedAt: new Date(),
    };
    mockSelect.mockReturnValue(chainMock([row]));
    const cms = await getStoredCMS();
    expect(cms.shopName).toBe('CUSTOM NAME');
    expect(cms.slogan).toBe('Test slogan');
  });
});

describe('getStoredFAQs / saveFAQs', () => {
  it('returns defaults when empty', async () => {
    mockSelect.mockReturnValue(chainMock([]));
    const faqs = await getStoredFAQs();
    expect(faqs.length).toBeGreaterThan(0);
    expect(faqs[0]).toHaveProperty('q');
    expect(faqs[0]).toHaveProperty('a');
  });

  it('returns mapped FAQs from DB', async () => {
    const rows = [{ id: 'faq-1', q: 'Test?', a: 'Yes.' }];
    mockSelect.mockReturnValue(chainMock(rows));
    const faqs = await getStoredFAQs();
    expect(faqs).toEqual(rows);
  });
});

// Wishlist and Admins still use localStorage
describe('getStoredWishlist / saveWishlist', () => {
  it('returns empty array when empty', () => {
    expect(getStoredWishlist()).toEqual([]);
  });

  it('saves and retrieves wishlist', () => {
    saveWishlist(['prod-1', 'prod-2']);
    expect(getStoredWishlist()).toEqual(['prod-1', 'prod-2']);
  });

  it('handles corrupted JSON', () => {
    localStorage.setItem('cpx_wishlist', '{bad');
    expect(getStoredWishlist()).toEqual([]);
  });
});

describe('getStoredAdmins / saveAdmins', () => {
  it('returns defaults when empty', () => {
    const admins = getStoredAdmins();
    expect(admins.length).toBeGreaterThan(0);
  });

  it('saves and retrieves admins', () => {
    saveAdmins(['08123456789']);
    expect(getStoredAdmins()).toEqual(['08123456789']);
  });
});
