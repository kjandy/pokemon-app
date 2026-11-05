import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { FavoriteButton } from '@/components/FavoriteButton';
import TypeBadge from '@/components/TypeBadge';
import { getArtworkUrl, getPokemon, getPokemonSpecies } from '@/lib/pokeapi';
import { STAT_LABELS, formatNumber } from '@/lib/pokemon-labels';

// ポケモン詳細ページ（Dynamic Route）
// /pokemon/pikachu にアクセスすると params.name が "pikachu" になります
export default async function PokemonDetailPage({ params }) {
  const { name } = await params;

  // 2つのAPIを同時に取得する（Promise.all）【発展】
  const [pokemon, species] = await Promise.all([
    getPokemon(name),
    getPokemonSpecies(name),
  ]);

  // 存在しないポケモンなら 404（not-found.js）を表示
  if (!pokemon) {
    notFound();
  }

  // お気に入りボタンに渡すのは「必要な情報だけ」
  const favoriteData = {
    id: pokemon.id,
    name: pokemon.name,
    image: getArtworkUrl(pokemon.id),
  };

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
          <CardContent className="grid place-items-center">
            <div className="grid aspect-square w-full place-items-center rounded-lg bg-muted">
              <Image
                src={favoriteData.image}
                alt={pokemon.name}
                width={320}
                height={320}
                priority
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-5">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">
              {formatNumber(pokemon.id)}
            </p>
            <h1 className="text-3xl font-bold">
              {species?.japaneseName ?? pokemon.name}
            </h1>
            <p className="text-sm capitalize text-muted-foreground">
              {pokemon.name}
            </p>
          </div>

          <div className="flex gap-2">
            {pokemon.types.map((t) => (
              <TypeBadge key={t.type.name} type={t.type.name} />
            ))}
          </div>

          {species?.flavorText && (
            <p className="leading-relaxed">{species.flavorText}</p>
          )}

          <Separator />

          <dl className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-muted-foreground">高さ</dt>
              <dd className="text-lg font-semibold">{pokemon.height / 10} m</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">重さ</dt>
              <dd className="text-lg font-semibold">
                {pokemon.weight / 10} kg
              </dd>
            </div>
          </dl>

          <FavoriteButton pokemon={favoriteData} size="lg" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>種族値</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {pokemon.stats.map((s) => (
            <div
              key={s.stat.name}
              className="grid grid-cols-[5rem_2.5rem_1fr] items-center gap-3 text-sm"
            >
              <span className="text-muted-foreground">
                {STAT_LABELS[s.stat.name] ?? s.stat.name}
              </span>
              <span className="text-right font-semibold tabular-nums">
                {s.base_stat}
              </span>
              {/* 種族値の最大はおよそ255なので、その割合でバーを表示 */}
              <Progress value={Math.round((s.base_stat / 255) * 100)} />
            </div>
          ))}
        </CardContent>
      </Card>
    </main>
  );
}
