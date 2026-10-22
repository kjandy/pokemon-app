import Image from 'next/image';
import { getArtworkUrl, getPokemon } from '@/lib/pokeapi';
// import { formatNumber } from '@/lib/pokemon-labels';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function PokemonDetailPage({ params }) {
  const { name } = await params;

  const pokemon = await getPokemon(name);

  return (
    <main className="mx-auto max-w-5xl space-y-6 px-4 py-10">
      <Button
        variant="ghost"
        size="sm"
        nativeButton={false}
        render={<Link href="/pokemon" />}
      >
        <ArrowLeft data-icon="inline-start" />
        一覧にもどる
      </Button>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent>
            <div className="grid aspect-square place-items-center rounded-lg bg-muted">
              <Image
                src={getArtworkUrl(pokemon.id)}
                alt={pokemon.name}
                width={320}
                height={320}
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {/* {formatNumber(pokemon.id)} */}
          </p>
          <h1 className="text-3xl font-bold capitalize">{pokemon.name}</h1>
          <p>高さ：{pokemon.height / 10} m</p>
          <p>重さ：{pokemon.weight / 10} kg</p>
        </div>
      </div>
    </main>
  );
}
