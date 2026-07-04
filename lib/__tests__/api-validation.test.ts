import { ProductSchema, FAQSchema } from '../validations';

describe('api input validation', () => {
  it('rejects product payloads with invalid urls and prices', () => {
    const result = ProductSchema.safeParse({
      id: 'prod-1',
      name: 'Broken product',
      type: 'Jersey',
      price: -1,
      image: 'javascript:alert(1)',
      images: ['not-a-url'],
      colors: ['#111'],
      sizes: ['M'],
      description: 'Invalid payload',
    });

    expect(result.success).toBe(false);
  });

  it('requires an id for FAQ writes', () => {
    const result = FAQSchema.safeParse({ q: 'Question?', a: 'Answer.' });

    expect(result.success).toBe(false);
  });
});
