import Image from 'next/image';
import { getPokemon } from '@/lib/pokeapi';

export default async function Home() {
  // 'use cache';
  // const response = await fetch('https://pokeapi.co/api/v2/pokemon/pikachu');
  // const pokemon = await response.json();
  const pokemon = await getPokemon('pikachu');

  return (
    <main className="p-8">
      <Image
        src={pokemon.sprites.other['official-artwork'].front_default}
        alt={pokemon.name}
        width={240}
        height={240}
      />
      <h1 className="text-2xl font-bold">{pokemon.name}</h1>
      <p>No. {pokemon.id}</p>
      <p>高さ：{pokemon.height / 10}m</p>
      <p>重さ：{pokemon.weight / 10}kg</p>
    </main>
  );
}
