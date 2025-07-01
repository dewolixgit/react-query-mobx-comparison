import { makeAutoObservable } from 'mobx';

export class FilterStore {
  gender: string | undefined = undefined;
  type: string | undefined = undefined;
  search = '';
  minPrice: number | undefined = undefined;
  maxPrice: number | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  hydrateFromSearch(params: URLSearchParams) {
    this.gender = params.get('gender') || undefined;
    this.type = params.get('type') || undefined;
    this.search = params.get('search') || '';
    this.minPrice = params.get('minPrice') ? Number(params.get('minPrice')) : undefined;
    this.maxPrice = params.get('maxPrice') ? Number(params.get('maxPrice')) : undefined;
  }

  toSearchParams() {
    const params = new URLSearchParams();
    if (this.gender) params.set('gender', this.gender);
    if (this.type) params.set('type', this.type);
    if (this.search) params.set('search', this.search);
    if (this.minPrice != null) params.set('minPrice', String(this.minPrice));
    if (this.maxPrice != null) params.set('maxPrice', String(this.maxPrice));
    return params;
  }

  setGender(g: string | undefined) { this.gender = g; }
  setType(t: string | undefined) { this.type = t; }
  setSearch(s: string) { this.search = s; }
  setMinPrice(p?: number) { this.minPrice = p; }
  setMaxPrice(p?: number) { this.maxPrice = p; }
}

export const filterStore = new FilterStore();
export type FilterStoreType = FilterStore;
