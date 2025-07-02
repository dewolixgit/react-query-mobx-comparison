'use client';

import { useEffect, useRef } from 'react';
import { FilterHook } from '../hooks/useFilter';
import { useProducts } from '../hooks/useProducts';
import { useFavorites } from '../hooks/useFavorites';

interface Props {
  filterStore: FilterHook;
}

export const ProductList = ({ filterStore }: Props) => {
  const sentinel = useRef<HTMLDivElement | null>(null);
  const favorites = useFavorites();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProducts(filterStore);

  const products = data?.pages.flatMap(p => p.data) || [];

  useEffect(() => {
    const ob = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });
    if (sentinel.current) ob.observe(sentinel.current);
    return () => ob.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div>
      <div className="product-grid">
        {products.map(p => (
          <div key={p.id} className="product-card">
            <div>{p.name}</div>
            <div>${p.price}</div>
            <button onClick={() => favorites.toggle(p.id)}>
              {favorites.isFavorite(p.id) ? '★' : '☆'}
            </button>
          </div>
        ))}
      </div>
      {isFetchingNextPage && <div>Loading...</div>}
      <div ref={sentinel} />
    </div>
  );
};
