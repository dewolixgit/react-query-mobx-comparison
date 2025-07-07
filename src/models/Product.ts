import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  type: z.string(),
  gender: z.enum(['men', 'women', 'unisex']),
});

export type Product = z.infer<typeof ProductSchema>;

export const ProductDetailSchema = ProductSchema.extend({
  description: z.string(),
  image: z.string().url(),
});

export type ProductDetail = z.infer<typeof ProductDetailSchema>;
