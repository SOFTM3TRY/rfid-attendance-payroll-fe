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

import EditGradeModal from "@/components/admin/manage-system/grade/EditGrade";

interface Props {
  data: Year[];
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  totalRows: number;
  search: string;
  selectedStatus: string[];
  selectedFilters: string[];
}

export function ManageYearTable({
  data,
  pagination,
  setPagination,
  search,
  selectedStatus,
  selectedFilters,
}: Props) {
  const { token } = useAuth();

  const [selectedGrade, setSelectedGrade] = useState<Year | null>(null);

  const columns = YearColumns((row) => setSelectedGrade(row));

  const filteredData = data.filter((row) => {
    const searchMatch =
      search === "" ||
      row.years.toLowerCase().includes(search.toLowerCase());

    const statusMatch =
      selectedStatus.length === 0;

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
      <div className="rounded-md border p-5">
        <div className="mb-5 flex flex-wrap gap-4 justify-between items-center">
          <FilterTable pagination={pagination} setPagination={setPagination} />

          <AddYearModal token={token as string} />
        </div>

        {selectedGrade && token && (
          <EditGradeModal
            token={token}
            gradeId={selectedGrade.id.toString()}
            open={!!selectedGrade}
            onClose={() => setSelectedGrade(null)}
          />
        )}

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
            {pagedData.length ? (
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

        <div className="flex items-center justify-between py-4 space-x-2 mt-5">
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
