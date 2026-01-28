import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  PaginationState,
} from "@tanstack/react-table";

import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";

import AddYearModal from "@/components/admin/manage-system/year/AddYear";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { FilterTable } from "@/components/admin/manage-student/Filtertable";

import { useAuth } from "@/context/AuthContext";
import { Year } from "@/types/year";
import { YearColumns } from "./YearColumns";

import { Skeleton } from "@/components/ui/skeleton";
import { useDeleteYear } from "@/hooks/useYear";
import toast from "react-hot-toast";


import EditYearModal from "@/components/admin/manage-system/year/EditYear";

interface Props {
  data: Year[];
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  totalRows: number;
  search: string;
  selectedStatus: string[];
  selectedFilters: string[];
  isLoading?: boolean;
}


export function ManageYearTable({
  data,
  pagination,
  setPagination,
  search,
  selectedStatus,
  selectedFilters,
  isLoading = false,
}: Props) {
  const { token } = useAuth();

  const [selectedYear, setSelectedYear] = useState<Year | null>(null);

  const { mutateAsync: deleteYear, isPending: deleting } = useDeleteYear();

  const handleDelete = async (year: Year) => {
    if (!token) return;

    const ok = window.confirm(`Delete School Year "${year.years}"?`);
    if (!ok) return;

    try {
      await deleteYear({ token: token as string, id: year.id });
    } catch (e: any) {
      toast.error(e?.message || "Delete failed.");
    }
  };

  const columns = YearColumns(
    (row) => setSelectedYear(row),
    (row) => handleDelete(row)
  );

  const filteredData = data.filter((row) => {
    const searchMatch =
      search === "" || row.years.toLowerCase().includes(search.toLowerCase());

    const statusMatch = selectedStatus.length === 0;

    const sectionMatch =
      selectedFilters.length === 0 || selectedFilters.includes(String(row.id));

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
      <div className="rounded-md bg-accent/10 p-5">
        <div className="mb-5 flex flex-wrap gap-4 justify-between items-center">
          <FilterTable pagination={pagination} setPagination={setPagination} />
          <AddYearModal token={token as string} />
        </div>

        {selectedYear && token && (
          <EditYearModal
            token={token}
            year={selectedYear}
            open={true}
            onClose={() => setSelectedYear(null)}
          />
        )}

        <div className="rounded-md border mt-10 overflow-hidden">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="py-5">
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
              {/* ✅ SKELETON LOADING */}
              {isLoading ? (
                Array.from({ length: pagination.pageSize }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell className="py-4">
                      <Skeleton className="h-5 w-48" />
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex gap-2">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <Skeleton className="h-8 w-8 rounded-full" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : pagedData.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-3">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between py-4 space-x-2 mt-5">
          <div className="text-xs text-muted-foreground flex-1">
            Showing {filteredData.length ? start : 0} to {filteredData.length ? end : 0} of{" "}
            {filteredData.length} entries
          </div>

          <div className="text-xs text-muted-foreground flex-1 text-center mr-3">
            Page {pagination.pageIndex + 1} of {totalPages || 1}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPagination((prev) => ({ ...prev, pageIndex: 0 }))}
              disabled={pagination.pageIndex === 0 || isLoading || deleting}
              className="w-24 h-8 font-normal text-xs"
            >
              <ChevronsLeft className="h-4 w-4" /> First
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setPagination((prev) => ({ ...prev, pageIndex: Math.max(prev.pageIndex - 1, 0) }))
              }
              disabled={pagination.pageIndex === 0 || isLoading || deleting}
              className="w-24 h-8 font-normal text-xs"
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex + 1 }))}
              disabled={pagination.pageIndex >= totalPages - 1 || isLoading || deleting}
              className="w-24 h-8 font-normal text-xs"
            >
              Next <ChevronRight className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setPagination((prev) => ({ ...prev, pageIndex: totalPages - 1 }))}
              disabled={pagination.pageIndex >= totalPages - 1 || isLoading || deleting}
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

