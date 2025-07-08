
'use client';

import { useEffect } from 'react';
import { FilterControls } from '../../src/components/FilterControls';
import { ProductList } from '../../src/components/ProductList';
import { useFilters } from '../../src/contexts/FilterContext';

export default function WomenPage() {
  const filters = useFilters();
  useEffect(() => {
    filters.setGender('women');
  }, []);

  return (
    <div>
      <h1>Women</h1>
      <FilterControls />
      <ProductList />
    </div>
  );
}
