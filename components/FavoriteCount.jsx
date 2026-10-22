'use client';
import { usePokemonStore } from '@/store/pokemonStore';

export const FavoriteCount = () => {
  const count = usePokemonStore((state) => state.favorites.length);
  return <div>{count}</div>;
};
