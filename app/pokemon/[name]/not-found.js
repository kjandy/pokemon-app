import Link from 'next/link';
import { SearchX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';

// 存在しないポケモンの URL にアクセスしたときの UI
export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl px-4 py-16">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <SearchX />
          </EmptyMedia>
          <EmptyTitle>ポケモンが見つかりません</EmptyTitle>
          <EmptyDescription>
            URL の名前が正しいか確認してください（例：/pokemon/pikachu）。
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button nativeButton={false} render={<Link href="/pokemon" />}>
            一覧にもどる
          </Button>
        </EmptyContent>
      </Empty>
    </main>
  );
}
