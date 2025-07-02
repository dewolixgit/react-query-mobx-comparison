'use client';

import { useEffect } from 'react';
import { FilterControls } from '../../src/components/FilterControls';
import { ProductList } from '../../src/components/ProductList';
import { useFilter } from '../../src/hooks/useFilter';

export default function WomenPage() {
  const filterStore = useFilter();
  useEffect(() => {
    filterStore.setGender('women');
  }, []);

  return (
    <div>
      <h1>Women</h1>
      <FilterControls store={filterStore} />
      <ProductList filterStore={filterStore} />
    </div>
  );
}
