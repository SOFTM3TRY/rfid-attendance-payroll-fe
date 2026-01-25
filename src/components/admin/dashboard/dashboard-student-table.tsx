"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import { ArrowUpDown, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useAuth } from "@/context/AuthContext";
import { useAttendanceToday } from "@/hooks/useAttendance";
import { useGrade } from "@/hooks/useGrade";

/* ---------------- TYPES ---------------- */
export type AttendanceRow = {
  user_id: number;
  lrn: string;
  grade: string;
  student_no: string;
  created_at: string;
  time_in: string | null;
  time_out: string | null;
  remarks: string | null;
};

export type Payment = {
  lrn: string;
  grade: string;
  status: "late" | "present" | "absent";
};

/* ---------------- STATUS HELPER ---------------- */
function getStatusFromRemarks(remarks?: string | null): Payment["status"] {
  const r = (remarks || "").toUpperCase();

  if (r.includes("LATE")) return "late";
  if (r.includes("ON TIME")) return "present";
  if (r.includes("NO CLASS")) return "present";

  return "absent";
}

/* ---------------- TABLE COLUMNS ---------------- */
const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "lrn",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        LRN <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("lrn")}</div>,
  },

  {
    accessorKey: "grade",
    header: "Grade Level",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("grade")}</div>
    ),
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
];

/* ---------------- COMPONENT ---------------- */
export function StudentTable() {
  const { token } = useAuth();

  /* ✅ Attendance Hook */
  const { data: attendanceRes, isLoading } = useAttendanceToday(token);

  /* ✅ Grade Hook */
  const { data: gradeRes } = useGrade(token as string);

  /* ✅ Grade Map */
  const gradeMap = React.useMemo(() => {
    const map: Record<string, string> = {};
    if (gradeRes?.data) {
      gradeRes.data.forEach((g: any) => {
        map[g.id] = g.grade_level;
      });
    }
    return map;
  }, [gradeRes]);

  /* ✅ Convert API → Table Data */
  const data: Payment[] = React.useMemo(() => {
    const list: AttendanceRow[] = Array.isArray(attendanceRes?.data)
      ? attendanceRes.data
      : [];

    return list.map((row) => ({
      lrn: row.lrn,
      grade: gradeMap[row.grade] || `Grade ${row.grade}`,
      status: getStatusFromRemarks(row.remarks),
    }));
  }, [attendanceRes, gradeMap]);

  /* ---------------- TABLE STATE ---------------- */
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,

    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },

    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <div className="w-full">
      {/* ---------------- FILTER + COLUMN TOGGLE ---------------- */}
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter LRN..."
          value={(table.getColumn("lrn")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("lrn")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        {/* Column Toggle */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) =>
                    column.toggleVisibility(!!value)
                  }
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* ---------------- TABLE ---------------- */}
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  Loading Attendance...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3">
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
                  No Attendance Today.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* ---------------- ✅ BOTTOM PAGINATION ---------------- */}
      <div className="flex items-center justify-between space-x-2 py-4">
        {/* Showing entries */}
        <div className="text-muted-foreground flex-1 text-xs">
          {`Showing ${
            table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
            1
          }
          to ${Math.min(
            (table.getState().pagination.pageIndex + 1) *
              table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )} of ${table.getFilteredRowModel().rows.length} entries`}
        </div>

        {/* Pagination Buttons */}
        <div className="space-x-2 flex items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>

          {/* Page Numbers */}
          {Array.from({ length: table.getPageCount() }).map((_, index) => (
            <Button
              key={index}
              variant={
                table.getState().pagination.pageIndex === index
                  ? "default"
                  : "outline"
              }
              size="sm"
              onClick={() => table.setPageIndex(index)}
            >
              {index + 1}
            </Button>
          ))}

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
