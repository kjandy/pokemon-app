import Image from 'next/image';
import { getPokemon } from '@/lib/pokeapi';
import { FavoriteCount } from '@/components/FavoriteCount';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
// import { Counter } from '@/components/Counter';

export default async function Home() {
  // 'use cache';
  // const response = await fetch('https://pokeapi.co/api/v2/pokemon/pikachu');
  // const pokemon = await response.json();
  const pokemon = await getPokemon('pikachu');

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div className="space-y-5">
          <p className="text-sm font-medium text-muted-foreground">
            Next.js × PokéAPI ハンズオン
          </p>
          <h1 className="text-4xl font-bold tracking-tight">
            ポケモン図鑑を
            <br />
            つくってみよう
          </h1>
          <p className="text-muted-foreground">
            Server Component でデータを取得し、Client Component と Zustand
            でお気に入りを管理します。
          </p>
          <Button
            size="lg"
            nativeButton={false}
            render={<Link href="/pokemon" />}
          >
            ポケモン一覧を見る
            <ArrowRight data-icon="inline-end" />
          </Button>
        </div>

        <Card>
          <CardContent className="flex flex-col items-center gap-2">
            <Image
              src={pokemon.sprites.other['official-artwork'].front_default}
              alt={pokemon.name}
              width={240}
              height={240}
              priority
            />
            <p className="text-sm text-muted-foreground">
              {/* {formatNumber(pokemon.id)} */}
            </p>
            <p className="text-xl font-bold capitalize">{pokemon.name}</p>
            <p className="text-sm text-muted-foreground">
              高さ {pokemon.height / 10}m ／ 重さ {pokemon.weight / 10}kg
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
