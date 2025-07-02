import { useInfiniteQuery } from '@tanstack/react-query';
import { apiStore } from '../stores/ApiStore';
import { FilterHook } from './useFilter';

export function useProducts(filters: FilterHook) {
  return useInfiniteQuery({
    queryKey: [
      'products',
      {
        gender: filters.gender,
        type: filters.type,
        search: filters.search,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
      },
    ],
    queryFn: ({ pageParam = 1 }) =>
      apiStore.getProducts({
        page: pageParam,
        limit: 10,
        gender: filters.gender,
        type: filters.type,
        search: filters.search,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
      }),
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
  });
}
