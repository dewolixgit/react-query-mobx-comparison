
'use client';

import { FilterControls } from '../src/components/FilterControls';
import { ProductList } from '../src/components/ProductList';
import { useFilter } from '../src/hooks/useFilter';

export default function HomePage() {
  const filterStore = useFilter();
  return (
    <div>
      <h1>Clothing Store</h1>
      <FilterControls store={filterStore} />
      <ProductList filterStore={filterStore} />
    </div>
  );
}
