'use client';

import { observer } from 'mobx-react-lite';
import { FilterControls } from '../src/components/FilterControls';
import { ProductList } from '../src/components/ProductList';
import { TrendingSection } from '../src/components/TrendingSection';
import { filterStore } from '../src/stores/FilterStore';
import { productStore } from '../src/stores/ProductStore';

export default observer(function HomePage() {
  return (
    <div>
      <h1>Clothing Store</h1>
      <TrendingSection />
      <FilterControls store={filterStore} />
      <ProductList productStore={productStore} filterStore={filterStore} />
    </div>
  );
});
