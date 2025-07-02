'use client';

import { useEffect } from 'react';
import { FilterControls } from '../../src/components/FilterControls';
import { ProductList } from '../../src/components/ProductList';
import { useFilter } from '../../src/hooks/useFilter';

export default function WomenPage() {
  const filters = useFilter();
  useEffect(() => {
    filters.setGender('women');
  }, []);

  return (
    <div>
      <h1>Women</h1>
      <FilterControls filters={filters} />
      <ProductList filters={filters} />
    </div>
  );
}
