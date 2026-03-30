"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function SidebarProfileSkeleton() {
  return (
    <div className="flex items-center gap-4">
      <Skeleton className="h-8 w-8 rounded-full" />
      <div className="space-y-2 group-data-[collapsible=icon]:hidden">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  );
}
