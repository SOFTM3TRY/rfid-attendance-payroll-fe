"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
} from "@tanstack/react-table";

import {
  CalendarDays,
  ClockArrowUp,
  ClockArrowDown,
  KeyRound,
  Stamp,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Type for attendance entries (empty for now)
export type AttendanceEntry = {
  employee_no: string;
  grade: string;
  date: string;
  time_in: string;
  time_out: string;
  remarks: "Present" | "Late" | "Absent";
};

// Static column definition
const columns: ColumnDef<AttendanceEntry>[] = [
  {
    accessorKey: "employee_no",
    header: () => (
      <div className="flex items-center justify-center py-2 bg-zinc-200 dark:bg-zinc-800 rounded-md">
        <KeyRound className="text-blue-500 mr-1 w-4 h-4" />
        Employee No.
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: () => (
      <div className="flex items-center justify-center py-2 bg-zinc-200 dark:bg-zinc-800 rounded-md">
        <CalendarDays className="text-violet-500 mr-1 w-4 h-4" />
        Date
      </div>
    ),
  },
  {
    accessorKey: "time_in",
    header: () => (
      <div className="flex items-center justify-center py-2 bg-zinc-200 dark:bg-zinc-800 rounded-md">
        <ClockArrowUp className="text-green-500 mr-1 w-4 h-4" />
        Time In
      </div>
    ),
  },
  {
    accessorKey: "time_out",
    header: () => (
      <div className="flex items-center justify-center py-2 bg-zinc-200 dark:bg-zinc-800 rounded-md">
        <ClockArrowDown className="text-red-500 mr-1 w-4 h-4" />
        Time Out
      </div>
    ),
  },
  {
    accessorKey: "remarks",
    header: () => (
      <div className="flex items-center justify-center py-2 bg-zinc-200 dark:bg-zinc-800 rounded-md">
        <Stamp className="text-green-500 mr-1 w-4 h-4" />
        Remarks
      </div>
    ),
    cell: ({ row }) => {
      const value = row.getValue("remarks") as string;
      let color = "text-gray-600";

      if (value === "Present")
        color =
          "text-green-50 bg-green-500 dark:text-green-700 dark:bg-green-200 py-1 rounded-full font-medium text-center";
      else if (value === "Late")
        color =
          "text-yellow-50 bg-yellow-500 dark:text-yellow-700 dark:bg-yellow-200 py-1 rounded-full font-medium text-center";
      else if (value === "Absent")
        color =
          "text-red-50 bg-red-500 dark:text-red-700 dark:bg-red-200 py-1 rounded-full font-medium text-center";

      return <div className={color}>{value}</div>;
    },
  },
];

export const Attendance = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string | undefined>();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Static data — empty array
  const data: AttendanceEntry[] = [];

  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(data.length / pagination.pageSize),
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (!isMounted) return null;

  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const totalRows = data.length;
  const start = totalRows === 0 ? 0 : pageIndex * pageSize + 1;
  const end = Math.min(start + pageSize - 1, totalRows);
  const totalPages = table.getPageCount();

  return (
    <div className="w-full">
      {/* Filters */}
      <div className="flex items-center justify-between py-4 flex-wrap gap-4">
        <Input
          placeholder="Filter Date..."
          value={String(table.getColumn("date")?.getFilterValue() ?? "")}
          onChange={(e) =>
            table.getColumn("date")?.setFilterValue(e.target.value)
          }
          className="max-w-sm"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {selectedMonth ?? "Filter by Month"}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuCheckboxItem
              checked={selectedMonth === undefined}
              onCheckedChange={() => setSelectedMonth(undefined)}
            >
              Show all months
            </DropdownMenuCheckboxItem>
            {[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ].map((month) => (
              <DropdownMenuCheckboxItem
                key={month}
                checked={selectedMonth === month}
                onCheckedChange={(value) =>
                  value ? setSelectedMonth(month) : setSelectedMonth(undefined)
                }
              >
                {month}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-md border mt-5">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="py-5 text-center">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
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
                    <TableCell key={cell.id} className="py-5 text-center">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-20"
                >
                  No Attendance Found for this Teacher.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between py-10 space-x-2">
        <div className="text-sm text-muted-foreground flex-1">
          Showing {start} to {end} of {totalRows} entries
        </div>

        <div className="text-sm text-muted-foreground flex-1 text-center mr-3">
          Page {pageIndex + 1} of {totalPages}
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft className="h-4 w-4 mr-1" />
            First
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(totalPages - 1)}
            disabled={!table.getCanNextPage()}
          >
            Last <ChevronsRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};
