import { Suspense } from 'react';
import { Hero } from './sections/hero';
import { Marquee } from './sections/marquee';
import { Products } from './sections/products';
import { CustomSection } from './sections/custom-section';
import { Story } from './sections/story';
import { Teams } from './sections/teams';
import { Benefits } from './sections/benefits';
import { TestimonialsSection } from './sections/testimonials';
import { FaqSection } from './sections/faq';
import { Newsletter } from './sections/newsletter';
import type { StorefrontData } from '@/lib/storefront';

export function Home({ data }: { data: StorefrontData }) {
  return (
    <main id="top">
      <Hero initialSlides={data.slides} />
      <Marquee />
      <Suspense fallback={<section className="section products" id="products" />}>
        <Products initialProducts={data.products} />
      </Suspense>
      <CustomSection cms={data.cms} />
      <Story cms={data.cms} />
      <Teams />
      <Benefits />
      <TestimonialsSection testimonials={data.testimonials} />
      <FaqSection faqs={data.faqs} />
      <Newsletter />
    </main>
  );
}
