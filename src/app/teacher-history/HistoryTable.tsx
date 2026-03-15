"use client";

import React, { useMemo, useState } from "react";
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

import { RefreshButton } from "@/components/relaod-table";
import { Skeleton } from "@/components/ui/skeleton";
import { FilterTable } from "@/components/admin/manage-student/Filtertable";

interface HistoryLog {
  id: number;
  user_id: number;
  action: string;
  created_at: string;
  updated_at: string;
  data?: {
    data?: {
      id?: number;
      email?: string;
      first_name?: string;
      middle_name?: string;
      last_name?: string;
      suffix?: string | null;
      employee_no?: string;
    };
    old_grade?: string;
    new_grade?: string;
    old_section?: number | string;
    new_section?: number | string;
  };
  grade?: {
    grade_level?: string;
  };
  section?: {
    section_name?: string;
  };
}

interface Props<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  totalRows: number;
  isLoading: boolean;
  onRefresh: () => void;
}

export function HistoryTable({
  columns,
  data,
  pagination,
  setPagination,
  totalRows,
  isLoading,
  onRefresh,
}: Props<HistoryLog>) {
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    const safeData = data ?? [];

    return safeData.filter((item: any) => {
      if (search.trim() !== "") {
        const lowerSearch = search.toLowerCase();

        const teacher = item?.data?.data;
        const fullName =
          `${teacher?.last_name || ""} ${teacher?.first_name || ""} ${teacher?.middle_name || ""} ${teacher?.suffix || ""}`.trim();
        const email = teacher?.email || "";
        const employeeNo = teacher?.employee_no || "";
        const action = item?.action || "";

        return (
          fullName.toLowerCase().includes(lowerSearch) ||
          email.toLowerCase().includes(lowerSearch) ||
          employeeNo.toLowerCase().includes(lowerSearch) ||
          action.toLowerCase().includes(lowerSearch)
        );
      }

      return true;
    });
  }, [data, search]);

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
              placeholder="Search teacher, email, employee no, action..."
              value={search}
              onChange={handleFilterChange}
            />
          </div>

          <RefreshButton isLoading={isLoading} onClick={onRefresh} />
        </div>

        <FilterTable pagination={pagination} setPagination={setPagination} />
      </div>

      <div className="rounded-md border bg-background overflow-x-auto">
        {isLoading ? (
          <div className="p-4 space-y-3 pointer-events-none">
            <div className="grid grid-cols-8 gap-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>

            {Array.from({ length: pagination.pageSize }).map((_, i) => (
              <div key={i} className="grid grid-cols-8 gap-3">
                {Array.from({ length: 8 }).map((__, j) => (
                  <Skeleton key={j} className="h-10 w-full" />
                ))}
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
                    No history logs found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>

      <div className="flex items-center justify-between px-5 py-4 space-x-2 mt-3">
        <div className="text-sm text-muted-foreground flex-1">
          Showing {start} to {end} of {filteredTotalRows} entries
        </div>

        <div className="text-sm text-muted-foreground flex-1 text-center mr-3">
          Page {pagination.pageIndex + 1} of {totalPages}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setPagination((prev) => ({ ...prev, pageIndex: 0 }))}
            disabled={pagination.pageIndex === 0}
            className="w-24 h-8 font-normal text-sm"
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
            className="w-24 h-8 font-normal text-sm"
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
            className="w-24 h-8 font-normal text-sm"
          >
            Next <ChevronRight className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              setPagination((prev) => ({ ...prev, pageIndex: totalPages - 1 }))
            }
            disabled={pagination.pageIndex >= totalPages - 1}
            className="w-24 h-8 font-normal text-sm"
          >
            Last Page <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}