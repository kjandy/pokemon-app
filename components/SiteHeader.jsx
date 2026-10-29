import Link from 'next/link';
import { Heart } from 'lucide-react';
import { FavoriteCount } from '@/components/FavoriteCount';

// サイト共通のヘッダー（Server Component）
export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold">
          {/* モンスターボール風のロゴ（CSSだけで描画） */}
          <span
            aria-hidden
            className="relative size-6 overflow-hidden rounded-full border-2 border-foreground bg-background"
          >
            <span className="absolute inset-x-0 top-0 h-1/2 bg-red-500" />
            <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-foreground" />
            <span className="absolute top-1/2 left-1/2 size-2 -translate-1/2 rounded-full border-2 border-foreground bg-background" />
          </span>
          ポケモン図鑑
        </Link>

        <nav className="flex items-center gap-1 text-sm">
          <Link
            href="/pokemon"
            className="rounded-md px-3 py-1.5 hover:bg-muted"
          >
            一覧
          </Link>
          <Link
            href="/favorites"
            className="flex items-center gap-1.5 rounded-md px-3 py-1.5 hover:bg-muted"
          >
            <Heart className="size-4" />
            お気に入り
            {/* ここだけ Client Component（Zustand の値を表示する） */}
            <FavoriteCount />
          </Link>
        </nav>
      </div>
    </header>
  );
}
