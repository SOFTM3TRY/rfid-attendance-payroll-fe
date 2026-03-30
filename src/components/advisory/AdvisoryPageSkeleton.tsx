import { Skeleton } from "@/components/ui/skeleton";

export function AdvisoryPageSkeleton() {
  return (
    <div className="mt-10 mb-20 flex flex-col gap-5">
      <div className="flex flex-col gap-5 xl:flex-row">
        <div className="flex w-full flex-col gap-5 xl:w-[380px]">
          <div className="rounded-xl bg-accent/20 px-5 py-5 shadow-lg">
            <div className="flex flex-col items-center gap-5">
              <Skeleton className="h-30 w-30 rounded-lg" />
              <div className="flex w-full flex-col items-center gap-4">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-4 w-40" />
                <div className="mt-2 flex gap-2">
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-accent/20 p-5 space-y-3">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
            <Skeleton className="h-3 w-2/3" />
            <div className="grid grid-cols-2 gap-2 pt-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-8 w-full rounded-md" />
              ))}
            </div>
          </div>
        </div>

        <div className="w-full rounded-lg bg-accent/20 p-5">
          <div className="flex items-center justify-between py-4">
            <Skeleton className="h-9 w-40" />
            <Skeleton className="h-9 w-72" />
          </div>

          <div className="rounded-md border bg-background p-4 space-y-3">
            <div className="grid grid-cols-4 gap-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-4 w-full" />
              ))}
            </div>

            {Array.from({ length: 5 }).map((_, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-4 gap-3">
                {Array.from({ length: 4 }).map((__, cellIndex) => (
                  <Skeleton key={cellIndex} className="h-10 w-full" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-accent/20 p-5">
        <div className="space-y-3 rounded-lg border bg-background p-5">
          <Skeleton className="h-5 w-44" />
          <Skeleton className="h-4 w-80" />
          <Skeleton className="h-10 w-80" />
          <div className="grid grid-cols-6 gap-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-4 w-full" />
            ))}
          </div>
          {Array.from({ length: 5 }).map((_, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-6 gap-3">
              {Array.from({ length: 6 }).map((__, cellIndex) => (
                <Skeleton key={cellIndex} className="h-10 w-full" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
