// 'use client';
import { getPokemonList } from '@/lib/pokeapi';
import { PokemonList } from '@/components/PokemonList';
import Link from 'next/link';
// import useCounterStore from '@/store/counterStore';

export const metadata = { title: 'ポケモン一覧 | ポケモン図鑑' };

export default async function PokemonPage() {
  // export default function PokemonPage() {
  // const { count } = useCounterStore();
  const pokemons = await getPokemonList(30);

  return (
    <main className="mx-auto max-w-5xl space-y-6 px-4 py-10">
      <div className="space-y-1">
        <Link href="/">TOPに戻る</Link>
        <h1 className="text-2xl font-bold">ポケモン一覧</h1>
        <p className="text-sm text-muted-foreground">
          {pokemons.length}匹のポケモンが見つかりました
        </p>
      </div>
      <PokemonList pokemons={pokemons} />
    </main>
  );
}
