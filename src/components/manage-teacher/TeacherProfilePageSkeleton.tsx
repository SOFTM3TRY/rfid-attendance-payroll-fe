import { Skeleton } from "@/components/ui/skeleton";

export function TeacherProfilePageSkeleton() {
  return (
    <div className="mt-10 h-full p-2">
      <div className="flex gap-5">
        <Skeleton className="mb-6 h-80 w-1/4" />
        <Skeleton className="mb-6 h-80 w-3/4" />
      </div>
      <div className="flex flex-col gap-5">
        <Skeleton className="mb-6 h-80 w-full" />
        <Skeleton className="mb-6 h-80 w-full" />
      </div>
      <div className="flex gap-5">
        <Skeleton className="mb-2 h-80 w-full" />
        <Skeleton className="mb-2 h-80 w-full" />
      </div>
    </div>
  );
}
