import { makeAutoObservable, runInAction } from 'mobx';
import { apiStore } from './ApiStore';

class FavoriteStore {
  favorites = new Set<number>();
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchFavorites() {
    if (this.isLoading) return;
    this.isLoading = true;
    try {
      const data = await apiStore.getFavorites();
      runInAction(() => {
        this.favorites = new Set(data);
      });
    } catch (e) {
      console.error('Failed to fetch favorites', e);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async toggle(id: number) {
    if (this.isLoading) return;
    this.isLoading = true;
    try {
      let data: number[];
      if (this.favorites.has(id)) data = await apiStore.removeFavorite(id);
      else data = await apiStore.addFavorite(id);
      runInAction(() => {
        this.favorites = new Set(data);
      });
    } catch (e) {
      console.error('Failed to update favorites', e);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  isFavorite(id: number) {
    return this.favorites.has(id);
  }
}

export const favoriteStore = new FavoriteStore();
export type FavoriteStoreType = FavoriteStore;
