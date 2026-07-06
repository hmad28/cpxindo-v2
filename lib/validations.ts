import { z } from 'zod';

const LOCAL_IMAGE_PATTERN = /^\/images\/[A-Za-z0-9._~:/?#[\]@!$&'()*+,;=%-]+$/;
const ALLOWED_REMOTE_IMAGE_HOSTS = new Set(["images.unsplash.com"]);

function isHttpsUrl(value: string) {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

function isAllowedImageRef(value: string) {
  if (LOCAL_IMAGE_PATTERN.test(value)) return true;

  try {
    const url = new URL(value);
    return url.protocol === "https:" && ALLOWED_REMOTE_IMAGE_HOSTS.has(url.hostname);
  } catch {
    return false;
  }
}

const ImageRefSchema = z.string().refine(isAllowedImageRef, {
  message: "Image must be a local /images path or an allowed HTTPS image host",
});

const PublicHttpsUrlSchema = z.string().refine(isHttpsUrl, {
  message: "URL must use https",
});

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
  mapsUrl: PublicHttpsUrlSchema.or(z.literal('')),
  instagramUrl: PublicHttpsUrlSchema.or(z.literal('')),
  tiktokUrl: PublicHttpsUrlSchema.or(z.literal('')),
  shopeeUrl: PublicHttpsUrlSchema.or(z.literal('')),
  tokopediaUrl: PublicHttpsUrlSchema.or(z.literal('')),
  lazadaUrl: PublicHttpsUrlSchema.or(z.literal('')),
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
