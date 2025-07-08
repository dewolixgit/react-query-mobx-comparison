'use client';

import { useEffect } from 'react';
import { FilterControls } from '../../src/components/FilterControls';
import { ProductList } from '../../src/components/ProductList';
import { useFilters } from '../../src/contexts/FilterContext';

export default function UnisexPage() {
  const filters = useFilters();
  useEffect(() => {
    filters.setGender('unisex');
  }, []);

  return (
    <div>
      <h1>Unisex</h1>
      <FilterControls />
      <ProductList />
    </div>
  );
}
