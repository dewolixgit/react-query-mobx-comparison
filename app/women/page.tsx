'use client';

import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { FilterControls } from '../../src/components/FilterControls';
import { ProductList } from '../../src/components/ProductList';
import { filterStore } from '../../src/stores/FilterStore';
import { productStore } from '../../src/stores/ProductStore';

export default observer(function WomenPage() {
  useEffect(() => {
    filterStore.setGender('women');
  }, []);

  return (
    <div>
      <h1>Women</h1>
      <FilterControls store={filterStore} />
      <ProductList productStore={productStore} filterStore={filterStore} />
    </div>
  );
});
