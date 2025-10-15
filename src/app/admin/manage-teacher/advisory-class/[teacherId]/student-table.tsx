"use client";

import * as React from "react";
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
  ChevronsLeft,
  ChevronsRight,
  ChevronLeft,
  ChevronRight,
  BadgeInfo,
  User,
  Calendar,
  CircleSmall
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { FilterTable } from "@/components/admin/manage-student/Filtertable";

// Type from your API
export type Student = {
  id: number;
  lrn: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  suffix?: string;
  gender: string;
  birth_date: string;
};

const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "lrn",
    header: () => (
      <div className="flex items-center">
        <BadgeInfo className="text-blue-500 mr-1 w-4 h-4" /> LRN
      </div>
    ),
  },
  {
    id: "full_name",
    accessorFn: (row) =>
      `${row.last_name}, ${row.first_name} ${row.middle_name || ""} ${
        row.suffix || ""
      }`,
    header: () => (
      <div className="flex items-center">
        <User className="text-green-500 mr-1 w-4 h-4" /> Full Name
      </div>
    ),
    cell: ({ row }) => (
      <span className="uppercase font-medium">{row.getValue("full_name")}</span>
    ),
  },
  {
    accessorKey: "gender",
    header: () => (
      <div className="flex items-center">
        <CircleSmall className="text-green-500 mr-1 w-4 h-4" /> Gender
      </div>
    ),
  },
  {
    accessorKey: "birth_date",
    header: () => (
      <div className="flex items-center">
        <Calendar className="text-orange-500 mr-1 w-4 h-4" /> Birth Date
      </div>
    ),
  },
];

export default function TeacherStudentTable({
  students,
}: {
  students: Student[];
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const table = useReactTable({
    data: students,
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
  const totalRows = students.length;
  const start = pageIndex * pageSize + 1;
  const end = Math.min(start + pageSize - 1, totalRows);
  const totalPages = table.getPageCount();

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <FilterTable pagination={pagination} setPagination={setPagination} />
        <Input
          placeholder="Search full name..."
          value={(table.getColumn("full_name")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn("full_name")?.setFilterValue(e.target.value)
          }
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}  className="py-3">
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
                    <TableCell key={cell.id}  className="py-5">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-10 text-muted-foreground text-sm">
                  No students assigned to this teacher.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-5 py-4 space-x-2">
        <div className="text-sm text-muted-foreground flex-1">
          Showing {totalRows ? start : 0} to {totalRows ? end : 0} of {totalRows} entries
        </div>

        <div className="text-sm text-muted-foreground flex-1 text-center mr-3">
          Page {pageIndex + 1} of {totalPages || 1}
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
