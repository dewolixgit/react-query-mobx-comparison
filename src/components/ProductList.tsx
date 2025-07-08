'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useFavorites } from '../hooks/useFavorites';
import { useFilters } from '../contexts/FilterContext';
import { useProducts } from '../hooks/useProducts';

export const ProductList = () => {
  const filters = useFilters();
  const { toggle, isFavorite } = useFavorites();
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useProducts(filters);
  const sentinel = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ob = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    });
    if (sentinel.current) ob.observe(sentinel.current);
    return () => ob.disconnect();
  }, [fetchNextPage]);

  return (
    <div>
      <div className="product-grid">
        {data?.pages.flatMap(page => page.data).map(p => (
          <div key={p.id} className="product-card">
            <Link href={`/product/${p.id}`}>{p.name}</Link>
            <div>${p.price}</div>
            <button onClick={() => toggle(p.id)}>
              {isFavorite(p.id) ? '★' : '☆'}
            </button>
          </div>
        ))}
      </div>
      {(isLoading || isFetchingNextPage) && <div>Loading...</div>}
      <div ref={sentinel} />
    </div>
  );
};
