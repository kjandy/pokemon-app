import { Skeleton } from '@/components/ui/skeleton';

// 詳細ページを読み込んでいる間の UI
export default function Loading() {
  return (
    <main className="mx-auto max-w-5xl space-y-6 px-4 py-10">
      <Skeleton className="h-7 w-32" />
      <div className="grid gap-6 md:grid-cols-2">
        <Skeleton className="aspect-square w-full rounded-xl" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-9 w-40" />
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-9 w-40" />
        </div>
      </div>
    </main>
  );
}
