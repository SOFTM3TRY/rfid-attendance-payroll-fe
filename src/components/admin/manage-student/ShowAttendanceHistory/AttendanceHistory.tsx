"use client";

import * as React from "react";
import { useState, useMemo, useEffect } from "react";
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
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  GraduationCap,
  CalendarDays,
  ClockArrowUp,
  ClockArrowDown,
  Stamp,
  KeyRound,
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

import { useGetStudentAttendanceById } from "@/hooks/useStudentDetails";
import { useAuth } from "@/context/AuthContext";
import { useGrade } from "@/hooks/useGrade";

import { format, parseISO, isValid } from "date-fns";

export type AttendanceEntry = {
  lrn: string;
  grade: string; // "Grade One"
  date: string; // "2026-01-24"
  time_in: string; // "16:52:49"
  time_out: string; // "16:53:02" or "-"
  remarks: string;
};

type RawAttendance = {
  user_id: number;
  lrn: string;
  grade: string; // "1"
  created_at: string; // "2026-01-24"
  time_in: string | null; // "2026-01-24 16:52:49"
  time_out: string | null; // "16:53:02" or null
  remarks: string; // "LATE"
};

function formatDateMDY(dateStr: string): string {
  // expected: "2026-01-24"
  const d = parseISO(dateStr);
  if (!isValid(d)) return dateStr;
  return format(d, "MMM dd, yyyy"); // Jan 24, 2026
}

function normalizeDateSearch(q: string) {
  return q.trim().toLowerCase();
}

// makes date searchable by BOTH raw and formatted
function dateSearchableText(dateStr: string) {
  const formatted = formatDateMDY(dateStr).toLowerCase(); // "jan 24, 2026"
  const raw = dateStr.toLowerCase(); // "2026-01-24"
  return `${raw} ${formatted}`;
}

// function normalizeRemarks(r: string): AttendanceEntry["remarks"] {
//   const v = (r || "").toUpperCase();
//   if (v === "LATE") return "Late";
//   if (v === "ABSENT") return "Absent";
//   return "Present";
// }

function extractTime(timeIn: string | null): string {
  // "2026-01-24 16:52:49" -> "16:52:49"
  if (!timeIn) return "-";
  const parts = timeIn.split(" ");
  return parts.length === 2 ? parts[1] : timeIn;
}

function formatTime12h(timeStr: string | null): string {
  if (!timeStr) return "-";

  // If format is "2026-01-24 16:52:49"
  const raw = timeStr.includes(" ") ? timeStr.split(" ")[1] : timeStr;

  const [hh, mm] = raw.split(":");
  if (!hh || !mm) return "-";

  let hour = parseInt(hh, 10);
  const ampm = hour >= 12 ? "PM" : "AM";

  hour = hour % 12;
  if (hour === 0) hour = 12;

  return `${String(hour).padStart(2, "0")}:${mm} ${ampm}`;
}

const columns: ColumnDef<AttendanceEntry>[] = [
  {
    accessorKey: "lrn",
    header: () => (
      <div className="flex items-center bg-accent/20 px-2 py-2 rounded-md justify-center">
        <KeyRound className="text-blue-500 mr-1 size-3" /> LRN
      </div>
    ),
  },
  {
    accessorKey: "grade",
    header: () => (
      <div className="flex items-center bg-accent/20 px-2 py-2 rounded-md justify-center">
        <GraduationCap className="text-teal-500 mr-1 size-3" /> Grade
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
      <div className="flex items-center bg-accent/20 px-2 py-2 rounded-md justify-center">
        <CalendarDays className="text-violet-500 mr-1 size-3" /> Date
      </div>
    ),

    filterFn: (row, columnId, filterValue) => {
      const date = row.getValue(columnId) as string;
      const q = normalizeDateSearch(String(filterValue || ""));
      if (!q) return true;

      return dateSearchableText(date).includes(q);
    },

    cell: ({ row }) => {
      const raw = row.getValue("date") as string;
      return <span>{formatDateMDY(raw)}</span>;
    },
  },
  {
    accessorKey: "time_in",
    header: () => (
      <div className="flex items-center bg-accent/20 px-2 py-2 rounded-md justify-center">
        <ClockArrowUp className="text-green-500 mr-1 size-3" /> Time In
      </div>
    ),
  },
  {
    accessorKey: "time_out",
    header: () => (
      <div className="flex items-center bg-accent/20 px-2 py-2 rounded-md justify-center">
        <ClockArrowDown className="text-red-500 mr-1 size-3" /> Time Out
      </div>
    ),
    cell: ({ row }) => {
      const v = row.getValue("time_out") as string;
      return <div className="text-center">{v || "-"}</div>;
    },
  },
  {
    accessorKey: "remarks",
    header: () => (
      <div className="flex items-center bg-accent/20 px-2 py-2 rounded-md justify-center">
        <Stamp className="text-green-500 mr-1 size-3" /> Remarks
      </div>
    ),
    cell: ({ row }) => {
      const value = row.getValue("remarks") as string;

      return <div className="text-[10px] text-center text-primary">{value}</div>;
    },
  },
];

export function AttendanceHistory({ id }: { id: string }) {
  const { token } = useAuth();

  const [data, setData] = useState<AttendanceEntry[]>([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  // ✅ Fetch Attendance
  const { data: attendanceRes } = useGetStudentAttendanceById(
    token as string,
    id,
  );

  // ✅ Fetch Grades for dynamic dropdown + mapping
  const { data: gradesRes } = useGrade(token as string);

  // Build grade id -> name map
  const gradeMap = useMemo(() => {
    const map = new Map<string, string>();
    const list = gradesRes?.data || [];
    list.forEach((g: any) => {
      map.set(String(g.id), String(g.grade_level)); // "1" => "Grade One"
    });
    return map;
  }, [gradesRes]);

  // ✅ Convert BE data to table data
  useEffect(() => {
    const raw: RawAttendance[] = Array.isArray(attendanceRes?.data)
      ? attendanceRes.data
      : [];

    const converted: AttendanceEntry[] = raw.map((r) => ({
      lrn: r.lrn,
      grade: gradeMap.get(String(r.grade)) ?? `Grade ${r.grade}`,
      date: r.created_at,

      time_in: formatTime12h(r.time_in),
      time_out: formatTime12h(r.time_out),
      remarks: r.remarks,
    }));

    setData(converted);
    setPagination((p) => ({ ...p, pageIndex: 0 }));
  }, [attendanceRes, gradeMap]);

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
  const start = totalRows === 0 ? 0 : pageIndex * pageSize + 1;
  const end = Math.min(start + pageSize - 1, totalRows);
  const totalPages = table.getPageCount();

  // Dynamic grades list for dropdown
  const gradeOptions = useMemo(() => {
    return (gradesRes?.data || []).map((g: any) => ({
      id: String(g.id),
      label: String(g.grade_level),
    }));
  }, [gradesRes]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4 gap-3 flex-wrap">
        <Input
          placeholder='Search date... (e.g. "2026-01-24" or "Jan 24")'
          value={(table.getColumn("date")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn("date")?.setFilterValue(e.target.value)
          }
          className="max-w-sm"
        />

        <div className="flex gap-3">
          <FilterTable pagination={pagination} setPagination={setPagination} />

          {/* ✅ Dynamic Grade filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Grade <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuCheckboxItem
                checked={
                  table.getColumn("grade")?.getFilterValue() === undefined
                }
                onCheckedChange={(value) =>
                  value
                    ? table.getColumn("grade")?.setFilterValue(undefined)
                    : null
                }
              >
                Show all
              </DropdownMenuCheckboxItem>

              {gradeOptions.map((g: any) => (
                <DropdownMenuCheckboxItem
                  key={g.id}
                  checked={
                    table.getColumn("grade")?.getFilterValue() === g.label
                  }
                  onCheckedChange={(value) =>
                    value
                      ? table.getColumn("grade")?.setFilterValue(g.label)
                      : table.getColumn("grade")?.setFilterValue(undefined)
                  }
                >
                  {g.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="overflow-hidden rounded-md border my-5">
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
                    <TableCell key={cell.id} className="py-5 text-center">
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
                  className="text-center py-10 text-md"
                >
                  This student has no attendance history.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-5 py-4 space-x-2">
        <div className="text-xs text-muted-foreground flex-1">
          Showing {start} to {end} of {totalRows} entries
        </div>

        <div className="text-xs text-muted-foreground flex-1 text-center mr-3">
          Page {totalRows === 0 ? 0 : pageIndex + 1} of {totalPages}
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
