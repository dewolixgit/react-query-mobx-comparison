'use client';

import { useEffect } from 'react';
import { FilterControls } from '../../src/components/FilterControls';
import { ProductList } from '../../src/components/ProductList';
import { useFilter } from '../../src/hooks/useFilter';

export default function MenPage() {
  const filters = useFilter();
  useEffect(() => {
    filters.setGender('men');
  }, []);

  return (
    <div>
      <h1>Men</h1>
      <FilterControls filters={filters} />
      <ProductList filters={filters} />
    </div>
  );
}
