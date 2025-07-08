
'use client';

import { useEffect } from 'react';
import { FilterControls } from '../../src/components/FilterControls';
import { ProductList } from '../../src/components/ProductList';
import { useFilters } from '../../src/contexts/FilterContext';

export default function MenPage() {
  const filters = useFilters();
  useEffect(() => {
    filters.setGender('men');
  }, []);

  return (
    <div>
      <h1>Men</h1>
      <FilterControls />
      <ProductList />
    </div>
  );
}
