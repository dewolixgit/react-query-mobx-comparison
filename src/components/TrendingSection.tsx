'use client';

import Link from 'next/link';
import { useTrending } from '../hooks/useTrending';

export const TrendingSection = () => {
  const { data } = useTrending();

  if (!data || !data.length) return null;

  return (
    <div>
      <h2>Trending Now</h2>
      <div className="product-grid">
        {data.map(p => (
          <Link href={`/product/${p.id}`} key={p.id} className="product-card">
            <img
              src="https://placehold.co/600x400"
              alt={p.name}
              width={200}
              height={133}
            />
            <div>{p.name}</div>
            <div>${p.price}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};
