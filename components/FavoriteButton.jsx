'use client';
import { Button } from '@/components/ui/button';
import { usePokemonStore } from '@/store/pokemonStore';
import { Heart } from 'lucide-react';
// import { useState } from 'react';

// size は省略可能。カード内では小さめの sm、詳細ページでは lg を指定して使う
export const FavoriteButton = ({ pokemon, size = 'sm' }) => {
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
      size={size}
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
