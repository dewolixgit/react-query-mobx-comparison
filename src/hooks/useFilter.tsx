import { useState } from 'react';

export function useFilter() {
  const [gender, setGender] = useState<string | undefined>();
  const [type, setType] = useState<string | undefined>();
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();

  const hydrateFromSearch = (params: URLSearchParams) => {
    setGender(params.get('gender') || undefined);
    setType(params.get('type') || undefined);
    setSearch(params.get('search') || '');
    setMinPrice(params.get('minPrice') ? Number(params.get('minPrice')) : undefined);
    setMaxPrice(params.get('maxPrice') ? Number(params.get('maxPrice')) : undefined);
  };

  const toSearchParams = () => {
    const params = new URLSearchParams();
    if (gender) params.set('gender', gender);
    if (type) params.set('type', type);
    if (search) params.set('search', search);
    if (minPrice != null) params.set('minPrice', String(minPrice));
    if (maxPrice != null) params.set('maxPrice', String(maxPrice));
    return params;
  };

  return {
    gender,
    type,
    search,
    minPrice,
    maxPrice,
    setGender,
    setType,
    setSearch,
    setMinPrice,
    setMaxPrice,
    hydrateFromSearch,
    toSearchParams,
  };
}

export type FilterHook = ReturnType<typeof useFilter>;
