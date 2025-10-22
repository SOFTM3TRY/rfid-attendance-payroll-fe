"use client";

import * as React from "react";
import { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  ColumnFiltersState,
  VisibilityState,
} from "@tanstack/react-table";

import {
  ArrowUpDown,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  User,
  UserCheck,
  UserX,
  KeyRound,
  GraduationCap,
  CalendarDays,
  ClockArrowUp,
  ClockArrowDown,
  Stamp,
  BadgeCheck,
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

import { FilterTable } from "@/components/admin/manage-student/Filtertable";

export type AttendanceEntry = {
  // iref_id: string;
  lrn: string;
  grade: string;
  date: string;
  time_in: string;
  time_out: string;
  remarks: "Present" | "Late" | "Absent";
};

const columns: ColumnDef<AttendanceEntry>[] = [
  // {
  //   accessorKey: "iref_id",
  //   header: () => (
  //     <div className="flex items-center">
  //       <KeyRound className="text-blue-500 mr-1 w-4 h-4" /> RFID UID
  //     </div>
  //   ),
  // },
  {
    accessorKey: "lrn",
    header: () => (
      <div className="flex items-center bg-zinc-200 px-2 py-2 dark:bg-zinc-800 rounded-md justify-center">
        <KeyRound className="text-blue-500 mr-1 w-4 h-4" /> LRN
      </div>
    ),
  },
  {
    accessorKey: "grade",
    header: () => (
      <div className="flex items-center bg-zinc-200 px-2 py-2 dark:bg-zinc-800 rounded-md justify-center">
        <GraduationCap className="text-teal-500 mr-1 w-4 h-4" /> Grade
      </div>
    ),
    filterFn: (row, columnId, filterValue) => {
      const grade = row.getValue(columnId) as string;
      return grade.includes(filterValue);
    },
    enableColumnFilter: true,
  },
  {
    accessorKey: "date",
    header: () => (
      <div className="flex items-center bg-zinc-200 px-2 py-2 dark:bg-zinc-800 rounded-md justify-center">
        <CalendarDays className="text-violet-500 mr-1 w-4 h-4" /> Date
      </div>
    ),
  },
  {
    accessorKey: "time_in",
    header: () => (
      <div className="flex items-center bg-zinc-200 px-2 py-2 dark:bg-zinc-800 rounded-md justify-center">
        <ClockArrowUp className="text-green-500 mr-1 w-4 h-4" /> Time In
      </div>
    ),
  },
  {
    accessorKey: "time_out",
    header: () => (
      <div className="flex items-center bg-zinc-200 px-2 py-2 dark:bg-zinc-800 rounded-md justify-center">
        <ClockArrowDown className="text-red-500 mr-1 w-4 h-4" /> Time Out
      </div>
    ),
  },
  {
    accessorKey: "remarks",
    header: () => (
      <div className="flex items-center bg-zinc-200 px-2 py-2 dark:bg-zinc-800 rounded-md justify-center">
        <Stamp className="text-green-500 mr-1 w-4 h-4" /> Remarks
      </div>
    ),
    cell: ({ row }) => {
      const value = row.getValue("remarks") as string;
      let color = "text-gray-600";

      if (value === "Present")
        color =
          "text-green-50 bg-green-500 dark:text-green-700 dark:bg-green-200 py-1 text-center rounded-full font-medium flex items-center justify-center";
      if (value === "Late")
        color =
          "text-yellow-50 bg-yellow-500 dark:text-yellow-700 dark:bg-yellow-200 py-1 text-center rounded-full font-medium flex items-center justify-center";
      if (value === "Absent")
        color =
          "text-red-50 bg-red-500 dark:text-red-700 dark:bg-red-200 py-1 text-center rounded-full font-medium flex items-center justify-center";

      return (
        <div className={color}>
           {value}
        </div>
      );
    },
  },
];

export function AttendanceHistory({ lrn }: { lrn: string }) {
  const [data, setData] = React.useState<AttendanceEntry[]>([]);

  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const pageIndex = table.getState().pagination?.pageIndex ?? 0;
  const pageSize = table.getState().pagination?.pageSize ?? 5;
  const totalRows = data.length;
  const start = pageIndex * pageSize + 1;
  const end = Math.min(start + pageSize - 1, totalRows);
  const totalPages = table.getPageCount();

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <div>
          <FilterTable pagination={pagination} setPagination={setPagination} />
        </div>

        <Input
          placeholder="Filter Date..."
          value={(table.getColumn("date")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn("date")?.setFilterValue(e.target.value)
          }
          className="max-w-sm"
        />

        {/* Grade filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Grade <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuCheckboxItem
              checked={table.getColumn("grade")?.getFilterValue() === undefined}
              onCheckedChange={(value) =>
                value
                  ? table.getColumn("grade")?.setFilterValue(undefined)
                  : table.getColumn("grade")?.setFilterValue("Grade One")
              }
            >
              Show all
            </DropdownMenuCheckboxItem>
            {[
              "Grade One",
              "Grade Two",
              "Grade Three",
              "Grade Four",
              "Grade Five",
              "Grade Six",
            ].map((grade) => (
              <DropdownMenuCheckboxItem
                key={grade}
                checked={table.getColumn("grade")?.getFilterValue() === grade}
                onCheckedChange={(value) =>
                  value
                    ? table.getColumn("grade")?.setFilterValue(grade)
                    : table.getColumn("grade")?.setFilterValue(undefined)
                }
              >
                {grade}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="overflow-hidden rounded-md border my-5">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="py-5">
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
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-10 text-md">
                  This student has no attendance history.
                </TableCell>
              </TableRow>
              )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-5 py-4 space-x-2">
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
}

/*******  a31b22ce-9174-4c1c-9d94-c559b98e311f  *******/