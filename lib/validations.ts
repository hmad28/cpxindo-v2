import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(200),
  type: z.string().min(1).max(100),
  price: z.number().positive(),
  discountPrice: z.number().positive().optional(),
  image: z.string().url(),
  images: z.array(z.string().url()).min(1),
  tag: z.string().max(50).optional(),
  colors: z.array(z.string()).min(1),
  sizes: z.array(z.string()).min(1),
  description: z.string().min(1).max(2000),
  materialJersey: z.string().max(500).optional(),
  materialCelana: z.string().max(500).optional(),
  isCustom: z.boolean().optional(),
  minOrder: z.number().int().positive().optional(),
  wholesalePrice: z.number().positive().optional(),
  suitableFor: z.array(z.string()).optional(),
});

export const TestimonialSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(100),
  team: z.string().min(1).max(100),
  text: z.string().min(1).max(1000),
  rating: z.number().int().min(1).max(5),
});

export const HeroSlideSchema = z.object({
  id: z.string().min(1),
  kicker: z.string().max(100),
  title: z.string().min(1).max(200),
  subtitle: z.string().max(500),
  image: z.string().url(),
  cta: z.string().max(50),
  ctaLink: z.string().max(200),
});

export const FAQSchema = z.object({
  q: z.string().min(1).max(500),
  a: z.string().min(1).max(2000),
});

export const CMSSettingsSchema = z.object({
  brandName: z.string().max(100),
  heroTitle: z.string().max(200),
  heroSubtitle: z.string().max(500),
  storyTitle: z.string().max(200),
  storyText: z.string().max(2000),
  storyImage: z.string().url(),
  mapsUrl: z.string().url().optional().or(z.literal('')),
  whatsappNumber: z.string().max(20),
  email: z.string().email().max(100),
  address: z.string().max(500),
  instagram: z.string().max(100),
  facebook: z.string().max(100),
  youtube: z.string().max(100),
  tiktok: z.string().max(100),
});

export type ValidatedProduct = z.infer<typeof ProductSchema>;
export type ValidatedTestimonial = z.infer<typeof TestimonialSchema>;
export type ValidatedHeroSlide = z.infer<typeof HeroSlideSchema>;
export type ValidatedFAQ = z.infer<typeof FAQSchema>;
export type ValidatedCMSSettings = z.infer<typeof CMSSettingsSchema>;
