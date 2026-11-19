import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const usePokemonStore = create(
  persist(
    (set) => ({
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
    }),
    {
      // localStorageに保存するときのキー名
      name: 'pokemon-favorites',
      // 保存するのはデータ(favorites)だけ。関数は保存しない。
      partialize: (state) => ({ favorites: state.favorites }),
      // [Next.jsで大事なポイント]
      // サーバーはlocalStorageを読めないので、サーバーが作るHTMLは「お気に入り 0件」。
      // ブラウザ側が最初の描画からすぐにlocalStorageの中身を使うと
      // サーバーのHTMLと食い違ってハイドレーションエラーになる。
      // そこで自動の読込みを止めておき、画面が表示された後に
      // FavoritesHydrationコンポーネントから rehydrate()(読込み)を呼ぶ。
      skipHydration: true,
    },
  ),
);
