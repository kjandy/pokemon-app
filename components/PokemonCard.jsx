import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

export const PokemonCard = ({ pokemon }) => {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <Link href={`/pokemon/${pokemon.name}`}>
        <CardContent>
          <div className="grid aspect-square place-items-center rounded-lg bg-muted">
            <Image
              src={pokemon.image}
              alt={pokemon.name}
              width={160}
              height={160}
            />
          </div>
        </CardContent>
        <CardHeader className="pt-3">
          {/* <CardDescription>{formatNumber(pokemon.id)}</CardDescription> */}
          <CardTitle className="capitalize">{pokemon.name}</CardTitle>
        </CardHeader>
      </Link>
      <CardFooter>{/* <FavoriteButton pokemon={pokemon} /> */}</CardFooter>
    </Card>
  );
};
