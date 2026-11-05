// PokéAPI からデータを取ってくる関数をまとめたファイル（Server State の入口）
// 各ページやコンポーネントからfetchを直接書かず、ここの関数を呼び出して使う。

import { cacheLife } from 'next/cache';

const BASE_URL = 'https://pokeapi.co/api/v2';

// 公式アートワーク画像のURLを、図鑑番号(id)から組み立てる
export function getArtworkUrl(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

// 一覧APIの url（例: <https://pokeapi.co/api/v2/pokemon/25/）から> id を取り出す
function getIdFromUrl(url) {
  // .filter(Boolean)はfalse, Boolean("25")はtrueになるので中身のある文字だけが残る
  const parts = url.split('/').filter(Boolean);
  return Number(parts[parts.length - 1]);
}

// ポケモン一覧を取得する
export async function getPokemonList(limit = 20) {
  'use cache';
  cacheLife('days'); // ポケモンのデータはほぼ変わらないので「日」単位でキャッシュ

  // fetchしてAPIにリクエストを送る
  const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}`);

  if (!response.ok) {
    throw new Error('ポケモン一覧の取得に失敗しました');
  }
  // JSONデータ(String)をObjectに変換
  const data = await response.json();

  // 画面で使いやすい形 { id, name, image } に変換して返す
  return data.results.map((pokemon) => {
    const id = getIdFromUrl(pokemon.url);
    return { id, name: pokemon.name, image: getArtworkUrl(id) };
  });
}

// ポケモン1匹の詳細を取得する（見つからなければ null）
export async function getPokemon(name) {
  'use cache';
  cacheLife('days');

  const response = await fetch(`${BASE_URL}/pokemon/${name}`);

  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new Error('ポケモンの取得に失敗しました');
  }

  return response.json();
}

// 種族データ（日本語名・図鑑説明文）を取得する【発展】
export async function getPokemonSpecies(name) {
  'use cache';
  cacheLife('days');

  const response = await fetch(`${BASE_URL}/pokemon-species/${name}`);

  // 説明文はおまけ情報なので、取れなくてもページ全体はエラーにしない
  if (!response.ok) {
    return null;
  }

  const species = await response.json();

  // species.names には色々な言語の名前が入っている
  // 例: [{ name: "Pikachu", language: { name: "en" } }, { name: "ピカチュウ", language: { name: "ja-Hrkt" } }, ...]
  // .find() は条件に合う「最初の1つ」を探すメソッド（見つからなければ undefined）
  // "ja-Hrkt" は PokéAPI での「日本語（ひらがな・カタカナ）」を表すコード
  // ?. は「左側が undefined なら、エラーにせず undefined を返す」書き方（オプショナルチェーン）
  const japaneseName = species.names.find(
    (n) => n.language.name === 'ja-Hrkt',
  )?.name;

  // 図鑑の説明文も同じように、日本語のものを探して取り出す
  // .replace(/\s+/g, " ") … 説明文に混ざっている改行や連続した空白を、半角スペース1つに置き換える
  //   /\s+/ は「空白文字（スペース・改行など）が1つ以上続く部分」、g は「全部置き換える」という意味
  const flavorText = species.flavor_text_entries
    .find((entry) => entry.language.name === 'ja-Hrkt')
    ?.flavor_text.replace(/\s+/g, ' ');

  // { japaneseName, flavorText } は { japaneseName: japaneseName, flavorText: flavorText } の省略形
  return { japaneseName, flavorText };
}
