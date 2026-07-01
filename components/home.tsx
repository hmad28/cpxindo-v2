'use client';
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

export function Home() {
  return (
    <main id="top">
      <Hero />
      <Marquee />
      <Products />
      <CustomSection />
      <Story />
      <Teams />
      <Benefits />
      <TestimonialsSection />
      <FaqSection />
      <Newsletter />
    </main>
  );
}