import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addFavorite, fetchFavorites, removeFavorite } from '../api/fakeDb';

export function useFavorites() {
  const queryClient = useQueryClient();
  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ['favorites'],
    queryFn: fetchFavorites,
  });

  const addMut = useMutation({
    mutationFn: addFavorite,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['favorites'] }),
  });

  const removeMut = useMutation({
    mutationFn: removeFavorite,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['favorites'] }),
  });

  function toggle(id: number) {
    if (favorites.includes(id)) removeMut.mutate(id);
    else addMut.mutate(id);
  }

  function isFavorite(id: number) {
    return favorites.includes(id);
  }

  return { favorites, isLoading, toggle, isFavorite };
}
