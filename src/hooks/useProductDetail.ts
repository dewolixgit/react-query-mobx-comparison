import { useQuery } from '@tanstack/react-query';
import { fetchProductDetail, fetchProductShops, fetchSimilarProducts } from '../api/fakeDb';

export function useProductDetail(id: number) {
  return useQuery({
    queryKey: ['productDetail', id],
    queryFn: async () => {
      const [detail, shops, similar] = await Promise.all([
        fetchProductDetail(id),
        fetchProductShops(id),
        fetchSimilarProducts(id),
      ]);
      return { detail, shops, similar };
    },
  });
}
