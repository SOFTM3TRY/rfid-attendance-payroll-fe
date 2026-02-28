"use client";

import * as React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";

export interface FilterTableProps {
  pagination: {
    pageSize: number;
    pageIndex: number;
  };
  setPagination: React.Dispatch<
    React.SetStateAction<{
      pageSize: number;
      pageIndex: number;
    }>
  >;
}

export function FilterTable({ pagination, setPagination }: FilterTableProps) {
  const pageSizeOptions = [5, 10, 20, 50, 100];

  return (
    <div className="flex flex-col items-center gap-2">
      {/* <span className="text-sm text-muted-foreground">Rows per page:</span> */}
      <Select
        value={String(pagination.pageSize)}
        onValueChange={(value) =>
          setPagination((prev) => ({
            ...prev,
            pageSize: Number(value),
            pageIndex: 0,
          }))
        }
      >
        <SelectTrigger className="w-22 text-sm">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Page Size</SelectLabel>
            {pageSizeOptions.map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
