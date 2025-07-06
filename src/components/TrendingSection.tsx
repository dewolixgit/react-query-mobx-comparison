'use client';

import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { trendingStore } from '../stores/TrendingStore';

export const TrendingSection = observer(() => {
  useEffect(() => {
    trendingStore.fetchTrending();
  }, []);

  if (!trendingStore.items.length) return null;

  return (
    <div>
      <h2>Trending Now</h2>
      <div className="product-grid">
        {trendingStore.items.map(p => (
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
});
