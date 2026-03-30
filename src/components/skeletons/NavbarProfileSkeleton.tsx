"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function NavbarProfileSkeleton() {
  return (
    <div className="flex items-center gap-2 rounded-full bg-primary/20 px-3 py-1">
      <Skeleton className="h-8 w-8 rounded-full" />
      <div className="space-y-1">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-2 w-16" />
      </div>
    </div>
  );
}
