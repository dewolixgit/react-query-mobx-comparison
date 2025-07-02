
'use client';

import { FilterControls } from '../src/components/FilterControls';
import { ProductList } from '../src/components/ProductList';
import { useFilter } from '../src/hooks/useFilter';

export default function HomePage() {
  const filters = useFilter();
  return (
    <div>
      <h1>Clothing Store</h1>
      <FilterControls filters={filters} />
      <ProductList filters={filters} />
    </div>
  );
}
