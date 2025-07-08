import { useQuery } from '@tanstack/react-query';
import { fetchTrendingProducts } from '../api/fakeDb';

export function useTrending() {
  return useQuery({ queryKey: ['trending'], queryFn: fetchTrendingProducts });
}
