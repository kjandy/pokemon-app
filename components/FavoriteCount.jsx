'use client';
import { Badge } from '@/components/ui/badge';
import { usePokemonStore } from '@/store/pokemonStore';

export const FavoriteCount = () => {
  const count = usePokemonStore((state) => state.favorites.length);
  return <Badge>{count}</Badge>;
};
