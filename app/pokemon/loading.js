import { Skeleton } from '@/components/ui/skeleton';

// 一覧ページを読み込んでいる間に表示される UI
export default function Loading() {
  return (
    <main className="mx-auto max-w-5xl space-y-6 px-4 py-10">
      <div className="space-y-2">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-4 w-56" />
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-3 rounded-xl border p-4">
            <Skeleton className="aspect-square w-full" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-7 w-28" />
          </div>
        ))}
      </div>
    </main>
  );
}
