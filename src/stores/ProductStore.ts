import { makeAutoObservable, runInAction } from 'mobx';
import { apiStore } from './ApiStore';
import { FilterStore } from './FilterStore';
import { Product } from '../models/Product';

class ProductStore {
  products: Product[] = [];
  page = 1;
  hasMore = true;
  isLoading = false;
  limit = 10;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchNextPage(filters: FilterStore) {
    if (this.isLoading || !this.hasMore) return;
    this.isLoading = true;
    const params = {
      page: this.page,
      limit: this.limit,
      gender: filters.gender,
      type: filters.type,
      search: filters.search,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
    };
    const result = await apiStore.getProducts(params);
    runInAction(() => {
      this.products.push(...result.data);
      this.page += 1;
      this.hasMore = result.hasMore;
      this.isLoading = false;
    });
  }

  reset() {
    this.products = [];
    this.page = 1;
    this.hasMore = true;
  }
}

export const productStore = new ProductStore();
export type ProductStoreType = ProductStore;
