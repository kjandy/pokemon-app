'use client';
import { Button } from '@/components/ui/button';
import { usePokemonStore } from '@/store/pokemonStore';
import { Heart } from 'lucide-react';
// import { useState } from 'react';

export const FavoriteButton = ({ pokemon }) => {
  // const [isFavorite, setIsFavorite] = useState(false);
  const isFavorite = usePokemonStore((state) =>
    state.favorites.some((p) => p.id === pokemon.id),
  );
  const addFavorite = usePokemonStore((state) => state.addFavorite);
  const removeFavorite = usePokemonStore((state) => state.removeFavorite);
  const handleClick = () => {
    if (isFavorite) {
      removeFavorite(pokemon.id);
    } else {
      addFavorite(pokemon);
    }
  };
  return (
    <Button
      variant={isFavorite ? 'secondary' : 'outline'}
      size="sm"
      // onClick={() => setIsFavorite(!isFavorite)}
      onClick={handleClick}
      aria-pressed={isFavorite}
    >
      <Heart
        data-icon="inline-start"
        className={isFavorite ? 'fill-red-500 text-red-500' : ''}
      />
      {isFavorite ? 'お気に入り済み' : 'お気に入り'}
    </Button>
  );
};
