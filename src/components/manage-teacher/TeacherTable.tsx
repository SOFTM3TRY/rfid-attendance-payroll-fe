"use client";

import {
  useMemo,
  useState,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type PaginationState,
} from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
} from "lucide-react";
import { RefreshButton } from "@/components/relaod-table";
import { FilterTable } from "@/components/admin/manage-student/Filtertable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { TeacherData } from "@/types/Teacher";

type TeacherTableProps = {
  columns: ColumnDef<TeacherData>[];
  data: TeacherData[];
  pagination: PaginationState;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
  totalRows: number;
  isLoading?: boolean;
  isRefreshing?: boolean;
  onRefresh: () => void;
};

export function TeacherTable({
  columns,
  data,
  pagination,
  setPagination,
  totalRows,
  isLoading = false,
  isRefreshing = false,
  onRefresh,
}: TeacherTableProps) {
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    const lowerSearch = search.trim().toLowerCase();

    if (!lowerSearch) {
      return data;
    }

    return data.filter((teacher) => {
      const fullName =
        `${teacher.last_name} ${teacher.first_name} ${teacher.middle_name || ""} ${
          teacher.suffix || ""
        }`.toLowerCase();

      return (
        fullName.includes(lowerSearch) ||
        teacher.employee_no.toLowerCase().includes(lowerSearch)
      );
    });
  }, [data, search]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const filteredTotalRows = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(filteredTotalRows / pagination.pageSize));
  const start =
    filteredTotalRows === 0 ? 0 : pagination.pageIndex * pagination.pageSize + 1;
  const end = Math.min(
    start + table.getRowModel().rows.length - 1,
    filteredTotalRows,
  );

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPagination((previous) => ({ ...previous, pageIndex: 0 }));
  };

  return (
    <div className="w-full rounded-lg bg-accent/10 p-5">
      <div className="mt-5 mb-10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative w-80 max-w-md">
            <Search className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search Full Name or Employee No...."
              value={search}
              onChange={handleFilterChange}
            />
          </div>

          <RefreshButton isLoading={isRefreshing} onClick={onRefresh} />
        </div>

        <FilterTable pagination={pagination} setPagination={setPagination} />
      </div>

      <div className="rounded-md border bg-background">
        {isLoading ? (
          <div className="pointer-events-none space-y-3 p-4">
            <div className="grid grid-cols-6 gap-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="h-4 w-full" />
              ))}
            </div>

            {Array.from({ length: pagination.pageSize }).map((_, index) => (
              <div key={index} className="grid grid-cols-6 gap-3">
                {Array.from({ length: 6 }).map((__, cellIndex) => (
                  <Skeleton key={cellIndex} className="h-10 w-full" />
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
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
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
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
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

      <div className="mt-3 flex items-center justify-between px-5 py-4 space-x-2">
        <div className="flex-1 text-sm text-muted-foreground">
          Showing {start} to {end} of {filteredTotalRows || totalRows} entries
        </div>

        <div className="mr-3 flex-1 text-center text-sm text-muted-foreground">
          Page {pagination.pageIndex + 1} of {totalPages}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setPagination((previous) => ({ ...previous, pageIndex: 0 }))}
            disabled={pagination.pageIndex === 0}
            className="h-8 w-24 text-sm font-normal"
          >
            <ChevronsLeft className="h-4 w-4" /> First page
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              setPagination((previous) => ({
                ...previous,
                pageIndex: Math.max(previous.pageIndex - 1, 0),
              }))
            }
            disabled={pagination.pageIndex === 0}
            className="h-8 w-24 text-sm font-normal"
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              setPagination((previous) => ({
                ...previous,
                pageIndex: previous.pageIndex + 1,
              }))
            }
            disabled={pagination.pageIndex >= totalPages - 1}
            className="h-8 w-24 text-sm font-normal"
          >
            Next <ChevronRight className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              setPagination((previous) => ({
                ...previous,
                pageIndex: totalPages - 1,
              }))
            }
            disabled={pagination.pageIndex >= totalPages - 1}
            className="h-8 w-24 text-sm font-normal"
          >
            Last Page <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
