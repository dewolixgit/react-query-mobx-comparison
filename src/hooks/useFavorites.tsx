import { createContext, useContext, useState, ReactNode } from 'react';

interface FavoriteContextType {
  toggle: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const toggle = (id: number) => {
    setFavorites(prev => {
      const set = new Set(prev);
      if (set.has(id)) set.delete(id); else set.add(id);
      return set;
    });
  };

  const isFavorite = (id: number) => favorites.has(id);

  return (
    <FavoriteContext.Provider value={{ toggle, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoriteContext);
  if (!ctx) throw new Error('useFavorites must be within FavoritesProvider');
  return ctx;
}
