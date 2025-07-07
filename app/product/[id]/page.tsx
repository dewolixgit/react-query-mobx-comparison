'use client';

import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { productDetailStore } from '../../../src/stores/ProductDetailStore';
import { favoriteStore } from '../../../src/stores/FavoriteStore';

export default observer(function ProductDetailPage() {
  const params = useParams();
  const id = Number(params.id);

  useEffect(() => {
    productDetailStore.fetchProduct(id);
    favoriteStore.fetchFavorites();
    return () => productDetailStore.clear();
  }, [id]);

  if (productDetailStore.isLoading || !productDetailStore.product)
    return <div>Loading...</div>;

  const { product, shops, similar } = productDetailStore;

  return (
    <div>
      <h1>{product!.name}</h1>
      <button onClick={() => favoriteStore.toggle(product!.id)}>
        {favoriteStore.isFavorite(product!.id) ? '★' : '☆'}
      </button>
      <img src={product!.image} alt={product!.name} width={600} height={400} />
      <p>{product!.description}</p>
      <h3>Available at:</h3>
      <ul>
        {shops.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
      <h3>Similar Items</h3>
      <div className="product-grid">
        {similar.map(item => (
          <Link href={`/product/${item.id}`} key={item.id} className="product-card">
            <div>{item.name}</div>
            <div>${item.price}</div>
          </Link>
        ))}
      </div>
    </div>
  );
});
