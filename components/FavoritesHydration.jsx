'use client'; // useEffect（ブラウザでだけ動く処理）を使うので Client Component

import { useEffect } from 'react';
import { usePokemonStore } from '@/store/pokemonStore';

// localStorage に保存されたお気に入りを、ストアへ読み込むだけのコンポーネント（画面には何も出さない）
// ストアは skipHydration: true にしてあるので、ここで読み込むまでは「0件」のまま。
// useEffect は「サーバーの HTML とのすり合わせ（ハイドレーション）が終わった後」に
// ブラウザで1回だけ動くので、食い違いのエラーが起きない。
// どのページから開いても読み込まれるよう、layout.js に置いて使う。
export default function FavoritesHydration() {
  useEffect(() => {
    usePokemonStore.persist.rehydrate();
  }, []);

  return null;
}
