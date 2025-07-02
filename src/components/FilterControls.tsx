'use client';

import { FilterHook } from '../hooks/useFilter';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
  filters: FilterHook;
}

export const FilterControls = ({ filters }: Props) => {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const p = new URLSearchParams(params.toString());
    filters.hydrateFromSearch(p);
  }, [params]);

  useEffect(() => {
    const p = filters.toSearchParams();
    router.replace('?' + p.toString());
  }, [filters.gender, filters.type, filters.search, filters.minPrice, filters.maxPrice, router]);

  return (
    <div>
      <input
        placeholder="Search"
        value={filters.search}
        onChange={e => filters.setSearch(e.target.value)}
      />
      <select value={filters.type || ''} onChange={e => filters.setType(e.target.value || undefined)}>
        <option value="">All Types</option>
        <option value="t-shirt">T-Shirts</option>
        <option value="pants">Pants</option>
        <option value="dress">Dresses</option>
      </select>
      <select value={filters.gender || ''} onChange={e => filters.setGender(e.target.value || undefined)}>
        <option value="">All Genders</option>
        <option value="men">Men</option>
        <option value="women">Women</option>
        <option value="unisex">Unisex</option>
      </select>
      <input
        type="number"
        placeholder="Min Price"
        value={filters.minPrice ?? ''}
        onChange={e => filters.setMinPrice(e.target.value ? Number(e.target.value) : undefined)}
      />
      <input
        type="number"
        placeholder="Max Price"
        value={filters.maxPrice ?? ''}
        onChange={e => filters.setMaxPrice(e.target.value ? Number(e.target.value) : undefined)}
      />
    </div>
  );
};
