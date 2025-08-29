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
  iref_id: string;
  lrn: string;
  date: string;
  time_in: string;
  time_out: string;
  remarks: "Present" | "Late" | "Absent";
};

// ✅ Generate 40 fake entries based on student's LRN
function generateFakeAttendanceData(lrn: string): AttendanceEntry[] {
  const remarksList: AttendanceEntry["remarks"][] = [
    "Present",
    "Late",
    "Absent",
  ];
  const today = new Date();

  return Array.from({ length: 40 }).map((_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const month = date.toLocaleString("default", { month: "long" });
    const formattedDate = `${month} ${date.getDate()}, ${date.getFullYear()}`;

    const timeIn = `${8 + Math.floor(Math.random() * 2)}:${Math.floor(
      Math.random() * 60
    )
      .toString()
      .padStart(2, "0")} AM`;

    const timeOut = `${3 + Math.floor(Math.random() * 2)}:${Math.floor(
      Math.random() * 60
    )
      .toString()
      .padStart(2, "0")} PM`;

    return {
      iref_id: `IREF-${lrn.slice(-4)}-${lrn.slice(-3)}`,
      lrn,
      date: formattedDate,
      time_in: timeIn,
      time_out: timeOut,
      remarks: remarksList[i % 3],
    };
  });
}

const columns: ColumnDef<AttendanceEntry>[] = [
  {
    accessorKey: "iref_id",
    header: "IREF ID",
  },
  {
    accessorKey: "lrn",
    header: "LRN",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "time_in",
    header: "Time In",
  },
  {
    accessorKey: "time_out",
    header: "Time Out",
  },
  {
    accessorKey: "remarks",
    header: "Remarks",
    cell: ({ row }) => {
      const value = row.getValue("remarks") as string;
      let color = "text-gray-600";

      if (value === "Present") color = "text-green-600 font-medium";
      if (value === "Late") color = "text-yellow-600 font-medium";
      if (value === "Absent") color = "text-red-600 font-medium";

      return <div className={color}>{value}</div>;
    },
  },
];

export function AttendanceHistory({ lrn }: { lrn: string }) {
  const data = React.useMemo(() => generateFakeAttendanceData(lrn), [lrn]);

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
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
        pageIndex: 0,
      },
    },
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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((col) => col.getCanHide())
              .map((col) => (
                <DropdownMenuCheckboxItem
                  key={col.id}
                  className="capitalize"
                  checked={col.getIsVisible()}
                  onCheckedChange={(value) => col.toggleVisibility(!!value)}
                >
                  {col.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
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
                    <TableCell key={cell.id}>
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
                <TableCell colSpan={columns.length} className="text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-5 py-4 space-x-2">
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
