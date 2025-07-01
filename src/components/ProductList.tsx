'use client';

import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import { ProductStoreType } from '../stores/ProductStore';
import { FilterStoreType } from '../stores/FilterStore';
import { favoriteStore } from '../stores/FavoriteStore';

interface Props {
  productStore: ProductStoreType;
  filterStore: FilterStoreType;
}

export const ProductList = observer(({ productStore, filterStore }: Props) => {
  const sentinel = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    productStore.reset();
    productStore.fetchNextPage(filterStore);
  }, [filterStore.gender, filterStore.type, filterStore.search, filterStore.minPrice, filterStore.maxPrice]);

  useEffect(() => {
    const ob = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        productStore.fetchNextPage(filterStore);
      }
    });
    if (sentinel.current) ob.observe(sentinel.current);
    return () => ob.disconnect();
  }, [productStore, filterStore]);

  return (
    <div>
      <div className="product-grid">
        {productStore.products.map(p => (
          <div key={p.id} className="product-card">
            <div>{p.name}</div>
            <div>${p.price}</div>
            <button onClick={() => favoriteStore.toggle(p.id)}>
              {favoriteStore.isFavorite(p.id) ? '★' : '☆'}
            </button>
          </div>
        ))}
      </div>
      {productStore.isLoading && <div>Loading...</div>}
      <div ref={sentinel} />
    </div>
  );
});
