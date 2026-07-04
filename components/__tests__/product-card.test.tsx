/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from '../product-card';
import { CartProvider } from '@/lib/cart-context';
import { Product } from '@/lib/data';

// Mock drizzle to avoid @neondatabase/serverless TextDecoder requirement
jest.mock('@/lib/db/drizzle', () => ({
  getDb: () => ({
    select: jest.fn().mockReturnValue({
      from: jest.fn().mockReturnValue({
        then: (resolve: any) => resolve([]),
      }),
    }),
    delete: jest.fn().mockReturnValue({
      then: (resolve: any) => resolve(undefined),
    }),
    insert: jest.fn().mockReturnValue({
      values: jest.fn().mockResolvedValue(undefined),
    }),
  }),
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { fill: _fill, priority: _priority, ...imgProps } = props;
    return <img {...imgProps} alt={props.alt || ''} />;
  },
}));

// Mock icons
jest.mock('../icons', () => ({
  Heart: (props: any) => <svg data-testid="heart" {...props} />,
  Plus: (props: any) => <svg data-testid="plus" {...props} />,
  X: (props: any) => <svg data-testid="x-icon" {...props} />,
  ArrowLeft: (props: any) => <svg data-testid="arrow-left" {...props} />,
  ArrowRight: (props: any) => <svg data-testid="arrow-right" {...props} />,
  ShieldCheck: (props: any) => <svg data-testid="shield-check" {...props} />,
  Check: (props: any) => <svg data-testid="check" {...props} />,
}));

const mockProduct: Product = {
  id: 'test-jersey-1',
  name: 'Test Jersey Premium',
  type: 'Football Set',
  price: 250000,
  discountPrice: 199000,
  image: 'https://images.unsplash.com/photo-123?auto=format&fit=crop&w=900&q=85',
  images: [
    'https://images.unsplash.com/photo-123?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-456?auto=format&fit=crop&w=900&q=85',
  ],
  tag: 'BEST SELLER',
  colors: ['#151515', '#e3262e'],
  sizes: ['M', 'L', 'XL'],
  description: 'A premium test jersey.',
};

function renderWithCart(ui: React.ReactElement) {
  return render(<CartProvider>{ui}</CartProvider>);
}

beforeEach(() => {
  localStorage.clear();
});

describe('ProductCard', () => {
  it('renders product name and type', () => {
    renderWithCart(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Test Jersey Premium')).toBeTruthy();
    expect(screen.getByText('Football Set')).toBeTruthy();
  });

  it('renders discounted price', () => {
    renderWithCart(<ProductCard product={mockProduct} />);
    expect(screen.getByText(/199\.000/)).toBeTruthy();
  });

  it('renders original price when discount exists', () => {
    renderWithCart(<ProductCard product={mockProduct} />);
    expect(screen.getByText(/250\.000/)).toBeTruthy();
  });

  it('renders tag badge', () => {
    renderWithCart(<ProductCard product={mockProduct} />);
    expect(screen.getByText('BEST SELLER')).toBeTruthy();
  });

  it('renders color dots count', () => {
    renderWithCart(<ProductCard product={mockProduct} />);
    expect(screen.getByText('2 colors')).toBeTruthy();
  });

  it('renders add to cart button', () => {
    renderWithCart(<ProductCard product={mockProduct} />);
    expect(screen.getByText('ADD TO CART')).toBeTruthy();
  });

  it('adds item to cart on button click', () => {
    renderWithCart(<ProductCard product={mockProduct} />);
    const btn = screen.getByText('ADD TO CART');
    fireEvent.click(btn);

    const stored = JSON.parse(localStorage.getItem('cart') || '[]');
    expect(stored).toHaveLength(1);
    expect(stored[0].name).toContain('Test Jersey Premium');
    expect(stored[0].price).toBe(199000); // uses discountPrice
  });

  it('shows "ADDED TO SQUAD!" after adding to cart', () => {
    renderWithCart(<ProductCard product={mockProduct} />);
    fireEvent.click(screen.getByText('ADD TO CART'));
    expect(screen.getByText(/ADDED TO SQUAD/)).toBeTruthy();
  });

  it('toggles wishlist on heart click', () => {
    renderWithCart(<ProductCard product={mockProduct} />);
    const heartBtn = screen.getByLabelText('Wishlist');
    fireEvent.click(heartBtn);

    const wishlist = JSON.parse(localStorage.getItem('cpx_wishlist') || '[]');
    expect(wishlist).toContain('test-jersey-1');
  });

  it('opens modal on image click', () => {
    renderWithCart(<ProductCard product={mockProduct} />);
    const imageContainer = document.querySelector('.product-image')!;
    fireEvent.click(imageContainer);

    expect(screen.getByText('A premium test jersey.')).toBeTruthy();
  });

  it('renders product without discount price', () => {
    const noDiscount = { ...mockProduct, discountPrice: undefined };
    renderWithCart(<ProductCard product={noDiscount} />);
    expect(screen.getByText(/250\.000/)).toBeTruthy();
  });
});
