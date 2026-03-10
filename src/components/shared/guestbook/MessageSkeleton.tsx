import { Skeleton } from '@/components/ui/skeleton'

/**
 * Placeholder animado que imita o layout de um MessageCard enquanto os dados
 * estão sendo carregados. Evita layout shift e melhora a percepção de performance.
 */
export function MessageSkeleton() {
  return (
    <div className="bg-card flex flex-col gap-4 rounded-2xl border border-white/5 p-5">
      <div className="flex items-center gap-3">
        <Skeleton className="size-10 rounded-full" />
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  )
}
