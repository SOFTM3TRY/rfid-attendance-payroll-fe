"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type ColumnFiltersState,
  type VisibilityState,
} from "@tanstack/react-table";
import {
  BadgeInfo,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  CircleSmall,
  User,
} from "lucide-react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Student } from "@/types/Student";

const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "lrn",
    header: () => (
      <div className="flex items-center">
        <BadgeInfo className="mr-1 h-4 w-4 text-blue-500" /> LRN
      </div>
    ),
    cell: ({ row }) => <span className="text-primary">{row.getValue("lrn")}</span>,
  },
  {
    id: "full_name",
    accessorFn: (row) =>
      `${row.last_name}, ${row.first_name} ${row.middle_name || ""} ${
        row.suffix || ""
      }`.trim(),
    header: () => (
      <div className="flex items-center">
        <User className="mr-1 h-4 w-4 text-green-500" /> Full Name
      </div>
    ),
    cell: ({ row }) => (
      <span className="font-medium uppercase">{row.getValue("full_name")}</span>
    ),
    filterFn: (row, columnId, filterValue) =>
      String(row.getValue(columnId))
        .toLowerCase()
        .includes(String(filterValue).toLowerCase()),
  },
  {
    accessorKey: "gender",
    header: () => (
      <div className="flex items-center">
        <CircleSmall className="mr-1 h-4 w-4 text-green-500" /> Gender
      </div>
    ),
  },
  {
    accessorKey: "birth_date",
    header: () => (
      <div className="flex items-center">
        <Calendar className="mr-1 h-4 w-4 text-orange-500" /> Birth Date
      </div>
    ),
  },
];

function buildFullName(student: Student) {
  return `${student.last_name}, ${student.first_name} ${student.middle_name || ""} ${
    student.suffix || ""
  }`.trim();
}

export default function TeacherStudentRosterTable({
  students,
  isLoading = false,
  profileBasePath = "/manage-student/student-profile",
}: {
  students: Student[];
  isLoading?: boolean;
  profileBasePath?: string;
}) {
  const router = useRouter();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
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

  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const totalRows = students.length;
  const totalPages = table.getPageCount() || 1;
  const start = totalRows ? pageIndex * pageSize + 1 : 0;
  const end = totalRows ? Math.min(start + pageSize - 1, totalRows) : 0;

  const goToProfile = (lrn: string) => {
    router.push(`${profileBasePath}/${encodeURIComponent(lrn)}`);
  };

  return (
    <TooltipProvider delayDuration={120}>
      <div className="w-full">
        <div className="flex items-center justify-between py-4">
          <FilterTable pagination={pagination} setPagination={setPagination} />

          <Input
            placeholder="Search full name..."
            value={
              (table.getColumn("full_name")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("full_name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
            disabled={isLoading}
          />
        </div>

        <div className="my-5 overflow-hidden rounded-md border bg-background/20">
          {isLoading ? (
            <div className="space-y-3 p-4 pointer-events-none">
              <div className="grid grid-cols-4 gap-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} className="h-4 w-full" />
                ))}
              </div>

              {Array.from({ length: pageSize }).map((_, rowIndex) => (
                <div key={rowIndex} className="grid grid-cols-4 gap-3">
                  {Array.from({ length: 4 }).map((__, cellIndex) => (
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
                  table.getRowModel().rows.map((row) => {
                    const student = row.original;
                    const fullName = buildFullName(student);

                    return (
                      <Tooltip key={row.id}>
                        <TooltipTrigger asChild>
                          <TableRow
                            role="button"
                            tabIndex={0}
                            className="cursor-pointer hover:bg-muted/50 focus:bg-muted/50"
                            onClick={() => goToProfile(student.lrn)}
                            onKeyDown={(event) => {
                              if (event.key === "Enter" || event.key === " ") {
                                event.preventDefault();
                                goToProfile(student.lrn);
                              }
                            }}
                          >
                            {row.getVisibleCells().map((cell) => (
                              <TableCell key={cell.id} className="py-5">
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext(),
                                )}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TooltipTrigger>

                        <TooltipContent side="top" align="start">
                          <p className="text-sm">Go to Student: {fullName}</p>
                        </TooltipContent>
                      </Tooltip>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="py-10 text-center text-sm text-muted-foreground"
                    >
                      No students assigned to this teacher.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>

        <div className="flex items-center justify-between px-5 py-4 space-x-2">
          <div className="flex-1 text-sm text-muted-foreground">
            Showing {start} to {end} of {totalRows} entries
          </div>

          <div className="mr-3 flex-1 text-center text-sm text-muted-foreground">
            Page {pageIndex + 1} of {totalPages}
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(0)}
              disabled={isLoading || !table.getCanPreviousPage()}
            >
              <ChevronsLeft className="mr-1 h-4 w-4" />
              First
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={isLoading || !table.getCanPreviousPage()}
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Previous
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={isLoading || !table.getCanNextPage()}
            >
              Next <ChevronRight className="ml-1 h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(totalPages - 1)}
              disabled={isLoading || !table.getCanNextPage()}
            >
              Last <ChevronsRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
