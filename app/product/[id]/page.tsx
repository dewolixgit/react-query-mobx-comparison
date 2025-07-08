'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useProductDetail } from '../../../src/hooks/useProductDetail';
import { useFavorites } from '../../../src/hooks/useFavorites';

export default function ProductDetailPage() {
  const params = useParams();
  const id = Number(params.id);

  const { data, isLoading } = useProductDetail(id);
  const { toggle, isFavorite } = useFavorites();

  if (isLoading || !data) return <div>Loading...</div>;

  const { detail: product, shops, similar } = data;

  return (
    <div>
      <h1>{product.name}</h1>
      <button onClick={() => toggle(product.id)}>
        {isFavorite(product.id) ? '★' : '☆'}
      </button>
      <img src={product.image} alt={product.name} width={600} height={400} />
      <p>{product.description}</p>
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
}
