'use client';

import { useEffect } from 'react';
import { FilterControls } from '../../src/components/FilterControls';
import { ProductList } from '../../src/components/ProductList';
import { useFilter } from '../../src/hooks/useFilter';

export default function UnisexPage() {
  const filterStore = useFilter();
  useEffect(() => {
    filterStore.setGender('unisex');
  }, []);

  return (
    <div>
      <h1>Unisex</h1>
      <FilterControls store={filterStore} />
      <ProductList filterStore={filterStore} />
    </div>
  );
}
