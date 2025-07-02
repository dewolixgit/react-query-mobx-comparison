export interface FakeProduct {
  id: number;
  name: string;
  price: number;
  type: string;
  gender: 'men' | 'women' | 'unisex';
}

export interface FakeProductDetail extends FakeProduct {
  description: string;
  image: string;
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

const productDetails: FakeProductDetail[] = products.map(p => ({
  ...p,
  description: `Description for ${p.name}`,
  image: `https://via.placeholder.com/300?text=${encodeURIComponent(p.name)}`,
}));

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

export function fetchTrendingProducts() {
  return Promise.resolve(products.slice(0, 5));
}

export function fetchProductDetail(id: number) {
  const detail = productDetails.find(p => p.id === id);
  if (!detail) throw new Error('Product not found');
  return Promise.resolve(detail);
}

export function fetchProductShops(id: number) {
  const shops = ['Fashion Co', 'Style Hub', 'Clothing Store'].map(s => `${s} #${id}`);
  return Promise.resolve(shops);
}

export function fetchSimilarProducts(id: number) {
  const product = products.find(p => p.id === id);
  if (!product) return Promise.resolve([]);
  const similar = products.filter(p => p.type === product.type && p.id !== id).slice(0, 3);
  return Promise.resolve(similar);
}
