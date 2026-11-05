'use client';
import { PokemonList } from '@/components/PokemonList';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useState } from 'react';

// Pokemon Nameで絞り込む検索ボックス
// 検索キーワードは、この画面の中だけで使う Client Stateなので
// Zustandではなく　useStateで十分です。

export const PokemonSearch = ({ pokemons }) => {
  const [keyword, setKeyword] = useState('');
  const filtered = pokemons.filter((pokemon) =>
    pokemon.name.includes(keyword.trim().toLowerCase()),
  );
  return (
    <div className="space-y-6">
      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="名前で検索（例：pika）"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="pl-8"
          aria-label="ポケモンを名前で検索"
        />
      </div>

      {filtered.length > 0 ? (
        <PokemonList pokemons={filtered} />
      ) : (
        <p className="text-sm text-muted-foreground">
          「{keyword}」に一致するポケモンはいません。
        </p>
      )}
    </div>
  );
};
