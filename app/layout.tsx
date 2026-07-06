import type { Metadata, Viewport } from 'next';
import { Inter, Oswald } from 'next/font/google';
import { headers } from 'next/headers';
import './globals.css';
import { CartProvider } from '@/lib/cart-context';
import { Header } from '@/components/header';
import { Footer } from '@/components/sections/footer';
import { ErrorBoundary } from '@/components/error-boundary';
import { getCachedCMS } from '@/lib/storefront';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald' });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://cpxindo.id'),
  title: 'CPX Jersey — Bikin Jersey Tim Yang Kelihatan Beda',
  description: 'Studio jersey custom untuk tim, komunitas, dan brand yang butuh tampilan kuat, bahan nyaman, dan proses produksi yang jelas.',
  icons: {
    icon: '/images/logo/cpx_logo_01.png',
    shortcut: '/images/logo/cpx_logo_01.png',
    apple: '/images/logo/cpx_logo_01.png',
  },
  openGraph: {
    title: 'CPX Jersey — Bikin Jersey Tim Yang Kelihatan Beda',
    description: 'Studio jersey custom untuk tim, komunitas, dan brand yang butuh tampilan kuat, bahan nyaman, dan proses produksi yang jelas.',
    url: 'https://cpxindo.id',
    siteName: 'CPX Jersey',
    images: [
      {
        url: '/images/cpx_welcome.png',
        width: 1200,
        height: 630,
        alt: 'CPX Jersey'
      }
    ],
    locale: 'id_ID',
    type: 'website'
  }
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const hdrs = await headers();
  const isAdmin = hdrs.get('x-admin-route') === '1';
  const cms = isAdmin ? null : await getCachedCMS();

  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.variable} ${oswald.variable}`} suppressHydrationWarning>
        <CartProvider>
          {!isAdmin && cms && <Header initialCms={cms} />}
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
          {!isAdmin && cms && <Footer cms={cms} />}
        </CartProvider>
      </body>
    </html>
  );
}


