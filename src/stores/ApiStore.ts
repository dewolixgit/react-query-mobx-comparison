import axios, { AxiosAdapter, AxiosRequestConfig } from 'axios';
import { fetchProducts } from '../api/fakeDb';
import { Product, ProductSchema } from '../models/Product';

const fakeAdapter: AxiosAdapter = async (config: AxiosRequestConfig) => {
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
  return Promise.reject(new Error(`No mock for ${config.url}`));
};

class ApiStore {
  private axios = axios.create({ adapter: fakeAdapter });

  async getProducts(params: Record<string, any>): Promise<{ data: Product[]; hasMore: boolean }> {
    const response = await this.axios.get('/products', { params });
    const result = {
      data: response.data.data.map((item: unknown) => ProductSchema.parse(item)),
      hasMore: response.data.hasMore as boolean,
    };
    return result;
  }
}

export const apiStore = new ApiStore();
