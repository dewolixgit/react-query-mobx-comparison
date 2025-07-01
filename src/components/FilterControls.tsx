'use client';

import { observer } from 'mobx-react-lite';
import { FilterStoreType } from '../stores/FilterStore';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
  store: FilterStoreType;
}

export const FilterControls = observer(({ store }: Props) => {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const p = new URLSearchParams(params.toString());
    store.hydrateFromSearch(p);
  }, [params, store]);

  useEffect(() => {
    const p = store.toSearchParams();
    router.replace('?' + p.toString());
  }, [store.gender, store.type, store.search, store.minPrice, store.maxPrice, router, store]);

  return (
    <div>
      <input
        placeholder="Search"
        value={store.search}
        onChange={e => store.setSearch(e.target.value)}
      />
      <select value={store.type || ''} onChange={e => store.setType(e.target.value || undefined)}>
        <option value="">All Types</option>
        <option value="t-shirt">T-Shirts</option>
        <option value="pants">Pants</option>
        <option value="dress">Dresses</option>
      </select>
      <select value={store.gender || ''} onChange={e => store.setGender(e.target.value || undefined)}>
        <option value="">All Genders</option>
        <option value="men">Men</option>
        <option value="women">Women</option>
        <option value="unisex">Unisex</option>
      </select>
      <input
        type="number"
        placeholder="Min Price"
        value={store.minPrice ?? ''}
        onChange={e => store.setMinPrice(e.target.value ? Number(e.target.value) : undefined)}
      />
      <input
        type="number"
        placeholder="Max Price"
        value={store.maxPrice ?? ''}
        onChange={e => store.setMaxPrice(e.target.value ? Number(e.target.value) : undefined)}
      />
    </div>
  );
});
