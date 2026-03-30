"use client";

import type { ReactNode } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useClientOnly } from "@/hooks/useClientOnly";

interface PageLoaderBoundaryProps {
  children: ReactNode;
  isLoading?: boolean;
  fallback?: ReactNode;
}

export function PageLoaderFallback() {
  return (
    <div className="space-y-6 p-5">
      <div className="flex items-center justify-between gap-4">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-32" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Skeleton className="h-32 rounded-xl" />
        <Skeleton className="h-32 rounded-xl" />
        <Skeleton className="h-32 rounded-xl" />
      </div>

      <Skeleton className="h-80 rounded-xl" />
      <Skeleton className="h-64 rounded-xl" />
    </div>
  );
}

export function PageLoaderBoundary({
  children,
  isLoading = false,
  fallback = <PageLoaderFallback />,
}: PageLoaderBoundaryProps) {
  const isClient = useClientOnly();

  if (!isClient || isLoading) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
