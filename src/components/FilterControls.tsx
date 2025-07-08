'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useFilters } from '../contexts/FilterContext';

export const FilterControls = () => {
  const filters = useFilters();
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const p = new URLSearchParams(params.toString());
    filters.setGender(p.get('gender') || undefined);
    filters.setType(p.get('type') || undefined);
    filters.setSearch(p.get('search') || '');
    filters.setMinPrice(p.get('minPrice') ? Number(p.get('minPrice')) : undefined);
    filters.setMaxPrice(p.get('maxPrice') ? Number(p.get('maxPrice')) : undefined);
  }, [params]);

  useEffect(() => {
    const p = new URLSearchParams();
    if (filters.gender) p.set('gender', filters.gender);
    if (filters.type) p.set('type', filters.type);
    if (filters.search) p.set('search', filters.search);
    if (filters.minPrice != null) p.set('minPrice', String(filters.minPrice));
    if (filters.maxPrice != null) p.set('maxPrice', String(filters.maxPrice));
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
        <option value="trousers">Trousers</option>
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
