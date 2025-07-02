import { makeAutoObservable, runInAction } from 'mobx';
import { Product } from '../models/Product';
import { apiStore } from './ApiStore';

class TrendingStore {
  items: Product[] = [];
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchTrending() {
    if (this.items.length || this.isLoading) return;
    this.isLoading = true;
    try {
      const data = await apiStore.getTrendingProducts();
      runInAction(() => {
        this.items = data;
      });
    } catch (e) {
      console.error('Failed to fetch trending products', e);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}

export const trendingStore = new TrendingStore();
export type TrendingStoreType = TrendingStore;
