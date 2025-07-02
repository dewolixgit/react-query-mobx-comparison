import { makeAutoObservable, runInAction } from 'mobx';
import { Product } from '../models/Product';
import { apiStore } from './ApiStore';

export interface ProductDetail extends Product {
  description: string;
  image: string;
}

class ProductDetailStore {
  product: ProductDetail | null = null;
  shops: string[] = [];
  similar: Product[] = [];
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchProduct(id: number) {
    this.isLoading = true;
    try {
      const [detail, shops, similar] = await Promise.all([
        apiStore.getProductDetail(id),
        apiStore.getProductShops(id),
        apiStore.getSimilarProducts(id),
      ]);
      runInAction(() => {
        this.product = detail;
        this.shops = shops;
        this.similar = similar;
      });
    } catch (e) {
      console.error('Failed to fetch product detail', e);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  clear() {
    this.product = null;
    this.shops = [];
    this.similar = [];
  }
}

export const productDetailStore = new ProductDetailStore();
export type ProductDetailStoreType = ProductDetailStore;
