import axios from 'axios';
import { Product, ProductSchema } from '../models/Product';

class ApiStore {
  private axios = axios.create();

  async getProducts(params: Record<string, any>): Promise<{ data: Product[]; hasMore: boolean }> {
    const response = await this.axios.get('/api/products', { params });
    const result = {
      data: response.data.data.map((item: unknown) => ProductSchema.parse(item)),
      hasMore: response.data.hasMore as boolean,
    };
    return result;
  }
}

export const apiStore = new ApiStore();
