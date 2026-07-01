import type { Metadata } from 'next';
import { Inter, Oswald } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/lib/cart-context';
import { Header } from '@/components/header';
import { Footer } from '@/components/sections/footer';
import { ErrorBoundary } from '@/components/error-boundary';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald' });

export const metadata: Metadata = {
  title: 'CPX Jersey — Bikin Jersey Tim Yang Kelihatan Beda',
  description: 'Studio jersey custom untuk tim, komunitas, dan brand yang butuh tampilan kuat, bahan nyaman, dan proses produksi yang jelas.',
  openGraph: {
    title: 'CPX Jersey — Bikin Jersey Tim Yang Kelihatan Beda',
    description: 'Studio jersey custom untuk tim, komunitas, dan brand yang butuh tampilan kuat, bahan nyaman, dan proses produksi yang jelas.',
    url: 'https://cpxindo.id',
    siteName: 'CPX Jersey',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&h=630&q=80',
        width: 1200,
        height: 630,
        alt: 'CPX Jersey'
      }
    ],
    locale: 'id_ID',
    type: 'website'
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.variable} ${oswald.variable}`} suppressHydrationWarning>
        <CartProvider>
          <Header />
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
