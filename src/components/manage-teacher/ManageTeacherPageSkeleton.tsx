import { Skeleton } from "@/components/ui/skeleton";

export function ManageTeacherPageSkeleton() {
  return (
    <div className="mt-10 h-full space-y-4 p-2">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-10 w-64" />
      </div>
      <Skeleton className="h-12 w-full" />
      {Array.from({ length: 7 }).map((_, index) => (
        <Skeleton key={index} className="h-14 w-full" />
      ))}
    </div>
  );
}
