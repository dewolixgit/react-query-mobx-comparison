'use client';

import { FilterControls } from '../src/components/FilterControls';
import { ProductList } from '../src/components/ProductList';
import { TrendingSection } from '../src/components/TrendingSection';

export default function HomePage() {
  return (
    <div>
      <h1>Clothing Store</h1>
      <TrendingSection />
      <FilterControls />
      <ProductList />
    </div>
  );
}
