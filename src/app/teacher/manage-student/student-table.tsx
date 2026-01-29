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
  CircleSmall,
  UserCog,
  UserCheck,
  UserX,
  History,
  Eye,
  Grip,
  TableProperties,
} from "lucide-react";

import { useRouter } from "next/navigation";

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

import { FilterTable } from "@/components/admin/manage-student/Filtertable";
import ShowAttendanceHistory from "@/components/admin/manage-student/ShowAttendanceHistory/ShowAttendanceHistory";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

/* ---------------- Types ---------------- */

export type Student = {
  id: number;
  lrn: string;
  first_name: string;
  middle_name?: string | null;
  last_name: string;
  suffix?: string | null;
  gender: string;
  birth_date: string;
  status?: number | string;
  email?: string | null;
  avatar?: string | null;
};

/* ---------------- Columns ---------------- */

export const teacherStudentColumns = (): ColumnDef<Student>[] => [
  {
    accessorKey: "lrn",
    header: () => (
      <Button variant="outline" size="sm" className="text-xs font-normal">
        <BadgeInfo className="text-blue-500 size-4 mr-1" />
        LRN
      </Button>
    ),
    cell: ({ row }) => (
      <span className="text-primary text-xs font-medium">{row.original.lrn}</span>
    ),
  },

  // ✅ IMPORTANT: use accessorFn + id for searching
  {
    id: "full_name",
    accessorFn: (s) =>
      `${s.last_name}, ${s.first_name} ${s.middle_name || ""} ${s.suffix || ""}`
        .replace(/\s+/g, " ")
        .trim(),
    header: () => (
      <Button variant="outline" size="sm" className="text-xs font-normal">
        <User className="text-green-500 size-4 mr-1" />
        Full Name
      </Button>
    ),
    cell: ({ row }) => {
      const s = row.original;

      const fullName =
        `${s.last_name}, ${s.first_name} ${s.middle_name || ""} ${s.suffix || ""}`
          .replace(/\s+/g, " ")
          .trim();

      const avatarUrl = s.avatar
        ? `https://rfid-api.barangay185bms.com/storage/avatars/${s.avatar}`
        : "https://github.com/shadcn.png";

      const initials =
        `${s.first_name?.[0] ?? ""}${s.last_name?.[0] ?? ""}`.toUpperCase() || "CN";

      return (
        <div className="flex items-center gap-2">
          <Avatar className="size-8">
            <AvatarImage
              src={avatarUrl}
              className="rounded-lg hover:grayscale-100 transition-all duration-300"
              draggable={false}
            />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <span className="font-semibold text-xs uppercase">{fullName}</span>
            <span className="text-[10px] text-primary">{s.email || ""}</span>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "gender",
    header: () => (
      <Button variant="outline" size="sm" className="text-xs font-normal">
        <CircleSmall className="text-green-500 size-4 mr-1" />
        Gender
      </Button>
    ),
    cell: ({ row }) => <span className="text-xs">{row.original.gender || "N/A"}</span>,
  },

  {
    accessorKey: "birth_date",
    header: () => (
      <Button variant="outline" size="sm" className="text-xs font-normal">
        <Calendar className="text-orange-500 size-4 mr-1" />
        Birth Date
      </Button>
    ),
    cell: ({ row }) => {
      const rawDate = row.original.birth_date;

      const formattedDate = rawDate
        ? new Date(rawDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "N/A";

      return <span className="text-xs">{formattedDate}</span>;
    },
  },

  {
    accessorKey: "status",
    header: () => (
      <Button variant="outline" size="sm" className="text-xs font-normal">
        <UserCog className="text-teal-500 size-4 mr-1" />
        Status
      </Button>
    ),
    cell: ({ row }) => {
      const isActive = String(row.original.status ?? "1") === "1";

      return (
        <span className="text-xs w-22 h-5 flex items-center justify-center rounded-full font-normal bg-accent">
          {isActive ? "Active" : "Inactive"}
          <span className={`ml-1 ${isActive ? "text-green-500" : "text-red-500"}`}>
            {isActive ? <UserCheck className="size-3" /> : <UserX className="size-3" />}
          </span>
        </span>
      );
    },
  },

  {
    id: "actions",
    header: () => (
      <Button variant="outline" size="sm" className="text-xs font-normal">
        <TableProperties className="text-slate-600 size-4 mr-1" />
        Actions
      </Button>
    ),
    cell: ({ row, table }) => {
      // @ts-ignore
      const meta = table.options.meta as {
        onOpenHistory: (row: any) => void;
        onOpenProfile: (lrn: string) => void;
      };

      return (
        <div style={{ pointerEvents: "auto" }}>
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Grip strokeWidth={3} className="w-12 h-12 text-primary" />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent side="top" align="center">
                Actions
              </TooltipContent>
            </Tooltip>

            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => meta.onOpenProfile(row.original.lrn)}>
                <Eye className="size-4 text-muted-foreground" />
                Student Profile
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => meta.onOpenHistory(row)}>
                <History className="size-4 text-muted-foreground" />
                Attendance History
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

/* ---------------- Skeleton Row ---------------- */

function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <TableRow key={i}>
          <TableCell className="py-5">
            <Skeleton className="h-4 w-24" />
          </TableCell>
          <TableCell className="py-5">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-lg" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-3 w-44" />
                <Skeleton className="h-3 w-28" />
              </div>
            </div>
          </TableCell>
          <TableCell className="py-5">
            <Skeleton className="h-4 w-16" />
          </TableCell>
          <TableCell className="py-5">
            <Skeleton className="h-4 w-28" />
          </TableCell>
          <TableCell className="py-5">
            <Skeleton className="h-5 w-20 rounded-full" />
          </TableCell>
          <TableCell className="py-5">
            <Skeleton className="h-9 w-12" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}

/* ---------------- Table Component ---------------- */

export default function TeacherStudentTable({
  students,
  isLoading = false,
}: {
  students: Student[];
  isLoading?: boolean;
}) {
  const router = useRouter();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 5 });

  const [openHistory, setOpenHistory] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState<any>(null);

  const columns = React.useMemo(() => teacherStudentColumns(), []);

  const table = useReactTable({
    data: students,
    columns,
    state: { sorting, columnFilters, columnVisibility, rowSelection, pagination },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    meta: {
      onOpenHistory: (row: any) => {
        setSelectedRow(row);
        setOpenHistory(true);
      },
      onOpenProfile: (lrn: string) => {
        router.push(`/teacher/manage-student/student-profile/${lrn}`);
      },
    },
  });

  const pageIndex = table.getState().pagination?.pageIndex ?? 0;
  const pageSize = table.getState().pagination?.pageSize ?? 5;
  const totalRows = students.length;
  const start = totalRows ? pageIndex * pageSize + 1 : 0;
  const end = totalRows ? Math.min(start + pageSize - 1, totalRows) : 0;
  const totalPages = table.getPageCount();

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <FilterTable pagination={pagination} setPagination={setPagination} />

        {/* ✅ FIXED SEARCH: use "full_name" */}
        <Input
          placeholder="Search full name..."
          disabled={isLoading}
          value={(table.getColumn("full_name")?.getFilterValue() as string) ?? ""}
          onChange={(e) => table.getColumn("full_name")?.setFilterValue(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="py-3">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableSkeleton rows={pagination.pageSize} />
            ) : table.getRowModel().rows.length ? (
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
                  className="text-center py-10 text-muted-foreground text-xs"
                >
                  No students assigned to this teacher.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {selectedRow ? (
        <ShowAttendanceHistory open={openHistory} setOpen={setOpenHistory} row={selectedRow} />
      ) : null}

      <div className="flex items-center justify-between px-5 py-4 space-x-2">
        <div className="text-xs text-muted-foreground flex-1">
          Showing {totalRows ? start : 0} to {totalRows ? end : 0} of {totalRows} entries
        </div>

        <div className="text-xs text-muted-foreground flex-1 text-center mr-3">
          Page {pageIndex + 1} of {totalPages || 1}
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(0)}
            disabled={isLoading || !table.getCanPreviousPage()}
          >
            <ChevronsLeft className="h-4 w-4 mr-1" />
            First Page
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={isLoading || !table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={isLoading || !table.getCanNextPage()}
          >
            Next <ChevronRight className="h-4 w-4 ml-1" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(totalPages - 1)}
            disabled={isLoading || !table.getCanNextPage()}
          >
            Last Page <ChevronsRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
