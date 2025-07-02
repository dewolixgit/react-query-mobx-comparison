import axios, { AxiosAdapter, AxiosRequestConfig } from 'axios';
import {
  fetchProducts,
  fetchTrendingProducts,
  fetchProductDetail,
  fetchProductShops,
  fetchSimilarProducts,
} from '../api/fakeDb';
import { Product, ProductSchema } from '../models/Product';
import { z } from 'zod';

const fakeAdapter = async (config: AxiosRequestConfig) => {
  if (config.url === '/products' && config.method === 'get') {
    const params = config.params || {};
    const result = await fetchProducts({
      page: Number(params.page ?? 1),
      limit: Number(params.limit ?? 10),
      gender: params.gender,
      type: params.type,
      search: params.search,
      minPrice: params.minPrice != null ? Number(params.minPrice) : undefined,
      maxPrice: params.maxPrice != null ? Number(params.maxPrice) : undefined,
    });
    return {
      config,
      status: 200,
      statusText: 'OK',
      headers: {},
      data: result,
    };
  }
  if (config.url === '/trending' && config.method === 'get') {
    const data = await fetchTrendingProducts();
    return {
      config,
      status: 200,
      statusText: 'OK',
      headers: {},
      data,
    };
  }
  const productDetailMatch = config.url?.match(/^\/products\/(\d+)$/);
  if (productDetailMatch && config.method === 'get') {
    const id = Number(productDetailMatch[1]);
    const data = await fetchProductDetail(id);
    return {
      config,
      status: 200,
      statusText: 'OK',
      headers: {},
      data,
    };
  }
  const shopsMatch = config.url?.match(/^\/products\/(\d+)\/shops$/);
  if (shopsMatch && config.method === 'get') {
    const id = Number(shopsMatch[1]);
    const data = await fetchProductShops(id);
    return {
      config,
      status: 200,
      statusText: 'OK',
      headers: {},
      data,
    };
  }
  const similarMatch = config.url?.match(/^\/products\/(\d+)\/similar$/);
  if (similarMatch && config.method === 'get') {
    const id = Number(similarMatch[1]);
    const data = await fetchSimilarProducts(id);
    return {
      config,
      status: 200,
      statusText: 'OK',
      headers: {},
      data,
    };
  }
  return Promise.reject(new Error(`No mock for ${config.url}`));
};

class ApiStore {
  private axios = axios.create({ adapter: fakeAdapter as AxiosAdapter });

  async getProducts(params: Record<string, any>): Promise<{ data: Product[]; hasMore: boolean }> {
    const response = await this.axios.get('/products', { params });
    const result = {
      data: response.data.data.map((item: unknown) => ProductSchema.parse(item)),
      hasMore: response.data.hasMore as boolean,
    };
    return result;
  }

  async getTrendingProducts(): Promise<Product[]> {
    const response = await this.axios.get('/trending');
    return (response.data as unknown[]).map(item => ProductSchema.parse(item));
  }

  async getProductDetail(id: number): Promise<z.infer<typeof ProductSchema> & { description: string; image: string }> {
    const response = await this.axios.get(`/products/${id}`);
    const base = ProductSchema.parse(response.data);
    return { ...base, description: response.data.description as string, image: response.data.image as string };
  }

  async getProductShops(id: number): Promise<string[]> {
    const response = await this.axios.get(`/products/${id}/shops`);
    return response.data as string[];
  }

  async getSimilarProducts(id: number): Promise<Product[]> {
    const response = await this.axios.get(`/products/${id}/similar`);
    return (response.data as unknown[]).map(item => ProductSchema.parse(item));
  }
}

export const apiStore = new ApiStore();
