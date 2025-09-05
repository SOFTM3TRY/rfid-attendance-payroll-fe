import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
  PaginationState,
} from "@tanstack/react-table";

import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  Pencil,
  Trash2,
  UserX,
  UserCheck,
} from "lucide-react";

import AddStudent from "@/components/admin/manage-system/AddGrade/AddGrade";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Grade {
  id: number;
  grade_level: string;
  description: string | null;
  status: "active" | "inactive";
}

interface Props {
  data: Grade[];
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  totalRows: number;
  search: string;
  selectedStatus: string[];
  selectedFilters: string[];
}

export function ManageGradeTable({
  data,
  pagination,
  setPagination,
  totalRows,
  search,
  selectedStatus,
  selectedFilters,
}: Props) {
  const columns: ColumnDef<Grade>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "grade_level",
      header: "Grade Level",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: (info) => info.getValue() || "—",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        return (
          <span className="text-xs w-22 h-6 flex items-center justify-center rounded-md font-normal bg-zinc-100 dark:bg-zinc-800">
            {/* @ts-ignore */}
            {row.original.status == "active" ? "Active" : "Inactive"}
            <span
              className={`ml-1 ${
                // @ts-ignore
                row.original.status == "active"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {/* @ts-ignore */}
              {row.original.status == "active" ? (
                <UserCheck className="w-4 h-4" />
              ) : (
                <UserX className="w-4 h-4" />
              )}
            </span>
          </span>
        );
      },
      filterFn: (row, columnId, filterValue) => {
        const status = row.original.status;
        return filterValue === "1"
          ? status === "active"
          : status === "inactive";
      },
    },
    {
      id: "action",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                className="h-7 w-7 p-0"
                onClick={() => console.log("Edit", row.original)}
              >
                <Pencil className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              align="center"
              className="block group-data-[collapsible=icon]:hidden"
            >
              Edit {row.original.id}
            </TooltipContent>
          </Tooltip>
        </div>
      ),
    },
  ];

  const filteredData = data.filter((row) => {
    const searchMatch =
      search === "" ||
      row.grade_level.toLowerCase().includes(search.toLowerCase()) ||
      row.description?.toLowerCase().includes(search.toLowerCase());

    const statusMatch =
      selectedStatus.length === 0 || selectedStatus.includes(row.status);

    const sectionMatch =
      selectedFilters.length === 0 || selectedFilters.includes(String(row.id)); // Replace if using actual section data

    return searchMatch && statusMatch && sectionMatch;
  });

  const pagedData = filteredData.slice(
    pagination.pageIndex * pagination.pageSize,
    (pagination.pageIndex + 1) * pagination.pageSize
  );

  const table = useReactTable({
    data: pagedData,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: Math.ceil(filteredData.length / pagination.pageSize),
  });

  const start = pagination.pageIndex * pagination.pageSize + 1;
  const end = Math.min(start + pagedData.length - 1, filteredData.length);
  const totalPages = Math.ceil(filteredData.length / pagination.pageSize);

  return (
    <div className="w-full">
      <div className="flex justify-end mb-4">
        <AddStudent />
      </div>

      <div className="rounded-md border">
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
            {pagedData.length ? (
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

        <div className="flex items-center justify-between px-5 py-4 space-x-2">
          <div className="text-sm text-muted-foreground flex-1">
            Showing {start} to {end} of {filteredData.length} entries
          </div>

          <div className="text-sm text-muted-foreground flex-1 text-center mr-3">
            Page {pagination.pageIndex + 1} of {totalPages}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setPagination((prev) => ({ ...prev, pageIndex: 0 }))
              }
              disabled={pagination.pageIndex === 0}
              className="w-24 h-8 font-normal text-xs"
            >
              <ChevronsLeft className="h-4 w-4" /> First
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  pageIndex: Math.max(prev.pageIndex - 1, 0),
                }))
              }
              disabled={pagination.pageIndex === 0}
              className="w-24 h-8 font-normal text-xs"
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  pageIndex: prev.pageIndex + 1,
                }))
              }
              disabled={pagination.pageIndex >= totalPages - 1}
              className="w-24 h-8 font-normal text-xs"
            >
              Next <ChevronRight className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  pageIndex: totalPages - 1,
                }))
              }
              disabled={pagination.pageIndex >= totalPages - 1}
              className="w-24 h-8 font-normal text-xs"
            >
              Last <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
