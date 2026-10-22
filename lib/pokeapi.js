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
