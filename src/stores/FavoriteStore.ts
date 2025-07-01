import { makeAutoObservable } from 'mobx';

class FavoriteStore {
  favorites = new Set<number>();

  constructor() {
    makeAutoObservable(this);
  }

  toggle(id: number) {
    if (this.favorites.has(id)) this.favorites.delete(id);
    else this.favorites.add(id);
  }

  isFavorite(id: number) {
    return this.favorites.has(id);
  }
}

export const favoriteStore = new FavoriteStore();
export type FavoriteStoreType = FavoriteStore;
