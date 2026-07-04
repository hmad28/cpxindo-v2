import { z } from 'zod';

const ImageRefSchema = z.string().url().or(z.string().regex(/^\/images\/[A-Za-z0-9._~:/?#[\]@!$&'()*+,;=%-]+$/));

export const ProductSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(200),
  type: z.string().min(1).max(100),
  price: z.number().positive(),
  discountPrice: z.number().positive().optional(),
  image: ImageRefSchema,
  images: z.array(ImageRefSchema).min(1),
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
  title: z.string().min(1).max(200),
  subtitle: z.string().max(500),
  image: ImageRefSchema,
});

export const FAQSchema = z.object({
  id: z.string().min(1),
  q: z.string().min(1).max(500),
  a: z.string().min(1).max(2000),
});

export const CMSSettingsSchema = z.object({
  shopName: z.string().min(1).max(100),
  slogan: z.string().min(1).max(200),
  address: z.string().min(1).max(1000),
  mapsUrl: z.string().url().or(z.literal('')),
  instagramUrl: z.string().url().or(z.literal('')),
  tiktokUrl: z.string().url().or(z.literal('')),
  shopeeUrl: z.string().url().or(z.literal('')),
  tokopediaUrl: z.string().url().or(z.literal('')),
  lazadaUrl: z.string().url().or(z.literal('')),
  aboutTitle: z.string().min(1).max(200),
  aboutDesc1: z.string().min(1).max(2000),
  aboutDesc2: z.string().min(1).max(2000),
  customImage: ImageRefSchema,
  customFabricChipTitle: z.string().min(1).max(100),
  customFabricChipDesc: z.string().min(1).max(200),
  customTitle: z.string().min(1).max(200),
  customSubtitle: z.string().min(1).max(500),
});

export type ValidatedProduct = z.infer<typeof ProductSchema>;
export type ValidatedTestimonial = z.infer<typeof TestimonialSchema>;
export type ValidatedHeroSlide = z.infer<typeof HeroSlideSchema>;
export type ValidatedFAQ = z.infer<typeof FAQSchema>;
export type ValidatedCMSSettings = z.infer<typeof CMSSettingsSchema>;
