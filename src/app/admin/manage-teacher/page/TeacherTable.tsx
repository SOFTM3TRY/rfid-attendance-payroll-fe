"use client";

import React, { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
  PaginationState,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  Search,
} from "lucide-react";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

import { FilterTable } from "@/components/admin/manage-student/Filtertable";
import { TeacherData } from "@/types/Teacher";
import { RefreshButton } from "@/components/relaod-table";
import { Skeleton } from "@/components/ui/skeleton";

interface Props<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  totalRows: number;

  // ✅ new props
  isLoading: boolean;
  onRefresh: () => void;
}

export function TeacherTable({
  columns,
  data,
  pagination,
  setPagination,
  totalRows,
  isLoading,
  onRefresh,
}: Props<TeacherData>) {
  const [search, setSearch] = useState("");
  const [selectedStatus] = useState<string[]>([]);

  const filteredData = useMemo(() => {
    const safeData = data ?? [];

    return safeData.filter((item: any) => {
      if (selectedStatus.length > 0 && !selectedStatus.includes(item.status)) {
        return false;
      }

      if (search.trim() !== "") {
        const lowerSearch = search.toLowerCase();
        const fullName = `${item.last_name} ${item.first_name} ${
          item.middle_name || ""
        } ${item.suffix || ""}`;
        const employeeNo = item.employee_no || "";

        const matchesName = fullName.toLowerCase().includes(lowerSearch);
        const matchesEmpNo = employeeNo.toLowerCase().includes(lowerSearch);

        return matchesName || matchesEmpNo;
      }

      return true;
    });
  }, [data, selectedStatus, search]);

  const filteredTotalRows = filteredData.length;

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const start =
    filteredTotalRows === 0 ? 0 : pagination.pageIndex * pagination.pageSize + 1;

  const end = Math.min(
    start + table.getRowModel().rows.length - 1,
    filteredTotalRows,
  );

  const totalPages = Math.max(1, Math.ceil(filteredTotalRows / pagination.pageSize));

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPagination((p) => ({ ...p, pageIndex: 0 }));
  };

  return (
    <div className="bg-accent/10 p-5 rounded-lg w-full">
      <div className="mt-5 mb-10 flex flex-wrap gap-4 justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="relative max-w-md w-80">
            <Search className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search Full Name or Employee No...."
              value={search}
              onChange={handleFilterChange}
            />
          </div>

          {/* ✅ refresh calls parent refetch */}
          <RefreshButton isLoading={isLoading} onClick={onRefresh} />
        </div>

        <FilterTable pagination={pagination} setPagination={setPagination} />
      </div>

      <div className="rounded-md border bg-background">
        {isLoading ? (
          <div className="p-4 space-y-3 pointer-events-none">
            <div className="grid grid-cols-6 gap-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>

            {Array.from({ length: pagination.pageSize }).map((_, i) => (
              <div key={i} className="grid grid-cols-6 gap-3">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="py-3">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-5">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-16 text-center text-red-500 dark:text-red-800"
                  >
                    No data found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>

      <div className="flex items-center justify-between px-5 py-4 space-x-2 mt-3">
        <div className="text-xs text-muted-foreground flex-1">
          Showing {start} to {end} of {filteredTotalRows} entries
        </div>

        <div className="text-xs text-muted-foreground flex-1 text-center mr-3">
          Page {pagination.pageIndex + 1} of {totalPages}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setPagination((prev) => ({ ...prev, pageIndex: 0 }))}
            disabled={pagination.pageIndex === 0}
            className="w-24 h-8 font-normal text-xs"
          >
            <ChevronsLeft className="h-4 w-4" /> First page
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              setPagination((prev) => ({
                ...prev,
                pageIndex: Math.max(prev.pageIndex - 1, 0),
              }))
            }
            disabled={pagination.pageIndex === 0}
            className="w-24 h-8 font-normal text-xs"
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              setPagination((prev) => ({
                ...prev,
                pageIndex: prev.pageIndex + 1,
              }))
            }
            disabled={pagination.pageIndex >= totalPages - 1}
            className="w-24 h-8 font-normal text-xs"
          >
            Next <ChevronRight className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              setPagination((prev) => ({ ...prev, pageIndex: totalPages - 1 }))
            }
            disabled={pagination.pageIndex >= totalPages - 1}
            className="w-24 h-8 font-normal text-xs"
          >
            Last Page <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
