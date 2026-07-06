import { pgTable, text, integer, boolean, timestamp } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  price: integer("price").notNull(),
  discountPrice: integer("discount_price"),
  image: text("image").notNull(),
  images: text("images").array().notNull().default([]),
  tag: text("tag"),
  colors: text("colors").array().notNull().default([]),
  sizes: text("sizes").array().notNull().default([]),
  description: text("description").notNull(),
  materialJersey: text("material_jersey"),
  materialCelana: text("material_celana"),
  isCustom: boolean("is_custom").default(false),
  minOrder: integer("min_order"),
  wholesalePrice: integer("wholesale_price"),
  suitableFor: text("suitable_for").array().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const testimonials = pgTable("testimonials", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  team: text("team").notNull(),
  text: text("text").notNull(),
  rating: integer("rating").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const heroSlides = pgTable("hero_slides", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),
  image: text("image").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const faqs = pgTable("faqs", {
  id: text("id").primaryKey(),
  q: text("q").notNull(),
  a: text("a").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const cmsSettings = pgTable("cms_settings", {
  id: text("id").primaryKey().default("singleton"),
  shopName: text("shop_name").notNull(),
  slogan: text("slogan").notNull(),
  address: text("address").notNull(),
  mapsUrl: text("maps_url").notNull(),
  instagramUrl: text("instagram_url").notNull(),
  tiktokUrl: text("tiktok_url").notNull(),
  shopeeUrl: text("shopee_url").notNull(),
  tokopediaUrl: text("tokopedia_url").notNull(),
  lazadaUrl: text("lazada_url").notNull(),
  aboutTitle: text("about_title").notNull(),
  aboutDesc1: text("about_desc1").notNull(),
  aboutDesc2: text("about_desc2").notNull(),
  customImage: text("custom_image").notNull(),
  customFabricChipTitle: text("custom_fabric_chip_title").notNull(),
  customFabricChipDesc: text("custom_fabric_chip_desc").notNull(),
  customTitle: text("custom_title").notNull(),
  customSubtitle: text("custom_subtitle").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const adminLoginAttempts = pgTable("admin_login_attempts", {
  ip: text("ip").primaryKey(),
  count: integer("count").notNull(),
  resetAt: timestamp("reset_at").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
