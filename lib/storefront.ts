import { unstable_cache } from "next/cache";
import {
  getStoredCMS,
  getStoredFAQs,
  getStoredProducts,
  getStoredSlides,
  getStoredTestimonials,
  type CMSSettings,
  type FAQ,
  type HeroSlide,
  type Testimonial,
} from "./db";
import type { Product } from "./data";

export const STOREFRONT_REVALIDATE_SECONDS = 300;

export const storefrontTags = {
  all: "storefront",
  cms: "storefront:cms",
  faqs: "storefront:faqs",
  products: "storefront:products",
  slides: "storefront:slides",
  testimonials: "storefront:testimonials",
} as const;

export type StorefrontData = {
  cms: CMSSettings;
  faqs: FAQ[];
  products: Product[];
  slides: HeroSlide[];
  testimonials: Testimonial[];
};

export const getCachedCMS = unstable_cache(
  async () => getStoredCMS(),
  ["storefront-cms"],
  { revalidate: STOREFRONT_REVALIDATE_SECONDS, tags: [storefrontTags.all, storefrontTags.cms] }
);

export const getCachedFAQs = unstable_cache(
  async () => getStoredFAQs(),
  ["storefront-faqs"],
  { revalidate: STOREFRONT_REVALIDATE_SECONDS, tags: [storefrontTags.all, storefrontTags.faqs] }
);

export const getCachedProducts = unstable_cache(
  async () => getStoredProducts(),
  ["storefront-products"],
  { revalidate: STOREFRONT_REVALIDATE_SECONDS, tags: [storefrontTags.all, storefrontTags.products] }
);

export const getCachedSlides = unstable_cache(
  async () => getStoredSlides(),
  ["storefront-slides"],
  { revalidate: STOREFRONT_REVALIDATE_SECONDS, tags: [storefrontTags.all, storefrontTags.slides] }
);

export const getCachedTestimonials = unstable_cache(
  async () => getStoredTestimonials(),
  ["storefront-testimonials"],
  { revalidate: STOREFRONT_REVALIDATE_SECONDS, tags: [storefrontTags.all, storefrontTags.testimonials] }
);

export async function getStorefrontData(): Promise<StorefrontData> {
  const [cms, faqs, products, slides, testimonials] = await Promise.all([
    getCachedCMS(),
    getCachedFAQs(),
    getCachedProducts(),
    getCachedSlides(),
    getCachedTestimonials(),
  ]);

  return { cms, faqs, products, slides, testimonials };
}
