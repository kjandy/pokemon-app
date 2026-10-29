'use client';

import { PokemonList } from '@/components/PokemonList';
import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { usePokemonStore } from '@/store/pokemonStore';
import { Heart } from 'lucide-react';
import Link from 'next/link';

export default function FavoritesPage() {
  const favorites = usePokemonStore((state) => state.favorites);
  console.log(favorites);
  return (
    <main className="mx-auto max-w-5xl space-y-6 px-4 py-10">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">お気に入り</h1>
        <p className="text-sm text-muted-foreground">
          {favorites.length}匹 登録されています
        </p>
      </div>
      {favorites.length > 0 ? (
        <PokemonList pokemons={favorites} />
      ) : (
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Heart />
            </EmptyMedia>
            <EmptyTitle>まだお気に入りがありません</EmptyTitle>
            <EmptyDescription>
              一覧や詳細ページの「お気に入り」ボタンで追加できます。
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button nativeButton={false} render={<Link href="/pokemon" />}>
              ポケモン一覧へ
            </Button>
          </EmptyContent>
        </Empty>
      )}
    </main>
  );
}
