import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/fakeDb';
import { Filters } from '../contexts/FilterContext';

export function useProducts(filters: Filters) {
  return useInfiniteQuery({
    queryKey: ['products', filters],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const result = await fetchProducts({
        page: pageParam,
        limit: 10,
        gender: filters.gender,
        type: filters.type,
        search: filters.search,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
      });
      return { ...result, nextPage: pageParam + 1 };
    },
    getNextPageParam: lastPage => (lastPage.hasMore ? lastPage.nextPage : undefined),
  });
}
