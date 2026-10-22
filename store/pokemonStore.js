import { create } from 'zustand';

export const usePokemonStore = create((set) => ({
  // お気に入りに入れたポケモン {id, name, image}の配列
  favorites: [],
  // 追加する（既に入っていたら何もしない）
  addFavorite: (pokemon) =>
    set((state) => {
      if (state.favorites.some((p) => p.id === pokemon.id)) {
        return state;
      }
      return { favorites: [...state.favorites, pokemon] };
    }),
  // idを指定して外す
  removeFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.filter((p) => p.id !== id),
    })),
}));
