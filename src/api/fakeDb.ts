export interface FakeProduct {
  id: number;
  name: string;
  price: number;
  type: string;
  gender: 'men' | 'women' | 'unisex';
}

const products: FakeProduct[] = [];

for (let i = 1; i <= 50; i++) {
  const gender = i % 3 === 0 ? 'men' : i % 3 === 1 ? 'women' : 'unisex';
  const type = ['t-shirt', 'pants', 'dress'][i % 3];
  products.push({
    id: i,
    name: `${gender} ${type} ${i}`,
    price: Math.round(Math.random() * 100),
    type,
    gender,
  });
}

export function fetchProducts(params: {
  page: number;
  limit: number;
  gender?: string;
  type?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
}) {
  let result = products.slice();
  if (params.gender) result = result.filter(p => p.gender === params.gender);
  if (params.type) result = result.filter(p => p.type === params.type);
  if (params.search)
    result = result.filter(p => p.name.toLowerCase().includes(params.search!.toLowerCase()));
  if (params.minPrice != null) result = result.filter(p => p.price >= params.minPrice!);
  if (params.maxPrice != null) result = result.filter(p => p.price <= params.maxPrice!);

  const start = (params.page - 1) * params.limit;
  const end = start + params.limit;
  const data = result.slice(start, end);
  const hasMore = end < result.length;
  return Promise.resolve({ data, hasMore });
}
