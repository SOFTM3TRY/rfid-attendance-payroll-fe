"use client";

import React, { useState, useMemo } from "react";

import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
  PaginationState,
} from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  Search,
  CircleUser,
  UserCheck,
  UserX,
  ChevronDownIcon,
} from "lucide-react";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

import { Skeleton } from "@/components/ui/skeleton";

import { FilterTable } from "@/components/admin/manage-student/Filtertable";
import { RefreshButton } from "@/components/relaod-table";

const statusTypes = [
  {
    value: "1",
    label: "Active",
    icon: <UserCheck className="text-green-500 mr-1 w-3 h-3" />,
  },
  {
    value: "0",
    label: "Inactive",
    icon: <UserX className="text-red-500 mr-1 w-3 h-3" />,
  },
];

interface FiltersDropdownStatusProps {
  selectedFilters: string[];
  setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
}

function FiltersDropdownStatus({
  selectedFilters,
  setSelectedFilters,
}: FiltersDropdownStatusProps) {
  const toggleFilter = (status: string) => {
    setSelectedFilters((prev) =>
      prev.includes(status)
        ? prev.filter((t) => t !== status)
        : [...prev, status],
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <CircleUser className="w-4 h-4 text-teal-500" />
          Status
          <ChevronDownIcon className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {statusTypes.map(({ value, label, icon }) => (
          <DropdownMenuCheckboxItem
            key={value}
            checked={selectedFilters.includes(value)}
            onCheckedChange={() => toggleFilter(value)}
            className="text-xs flex items-center"
          >
            {icon} {label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface Props<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  totalRows: number;
  isLoading: boolean;
  onRefresh: () => void;
}

export function AdminTable<
  TData extends {
    status: string;
    last_name: string;
    first_name: string;
    middle_name?: string;
    suffix?: string;
    employee_number?: string;
  },
>({
  columns,
  data,
  pagination,
  setPagination,
  totalRows,
  isLoading,
  onRefresh,
}: Props<TData>) {
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);

  const filteredData = useMemo(() => {
    const safeData = Array.isArray(data) ? data : [];

    return safeData.filter((item) => {
      if (selectedStatus.length > 0 && !selectedStatus.includes(item.status)) {
        return false;
      }

      if (search.trim() !== "") {
        const lowerSearch = search.toLowerCase();
        const fullName =
          `${item.last_name} ${item.first_name} ${item.middle_name || ""} ${item.suffix || ""}`.trim();
        const employeeNo = item.employee_number || "";

        const matchesName = fullName.toLowerCase().includes(lowerSearch);
        const matchesEmpNo = employeeNo.toLowerCase().includes(lowerSearch);

        return matchesName || matchesEmpNo;
      }

      return true;
    });
  }, [data, selectedStatus, search]);

  const filteredTotalRows = filteredData.length;

  const safeColumns = Array.isArray(columns) ? columns : [];

  const table = useReactTable({
    data: filteredData,
    columns: safeColumns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const start =
    filteredTotalRows === 0
      ? 0
      : pagination.pageIndex * pagination.pageSize + 1;

  const end = Math.min(
    start + table.getRowModel().rows.length - 1,
    filteredTotalRows,
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTotalRows / pagination.pageSize),
  );

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPagination((p) => ({ ...p, pageIndex: 0 }));
  };

  return (
    <div
      className="bg-accent/10 p-5 rounded-lg w-full"
      style={{ pointerEvents: "auto" }}
    >
      <div className="mt-5 mb-10 flex flex-wrap gap-4 justify-between items-center">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative max-w-md w-80">
            <Search className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search Full Name or Employee No...."
              value={search}
              onChange={handleFilterChange}
            />
          </div>

          <RefreshButton isLoading={isLoading} onClick={onRefresh} />
        </div>

        <FilterTable pagination={pagination} setPagination={setPagination} />
      </div>

      <div className="rounded-md border bg-background">
        {isLoading ? (
          <div className="p-4 space-y-3 pointer-events-none">
            <div className="grid grid-cols-6 gap-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>

            {Array.from({ length: pagination.pageSize }).map((_, i) => (
              <div key={i} className="grid grid-cols-6 gap-3">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
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
                      {flexRender(
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
                      <TableCell key={cell.id} className="py-5">
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
                    colSpan={safeColumns.length || 1}
                    className="h-16 text-center text-red-500 dark:text-red-800"
                  >
                    No data found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>

      <div className="flex items-center justify-between px-5 py-4 space-x-2 mt-3">
        <div className="text-sm text-muted-foreground flex-1">
          Showing {start} to {end} of {filteredTotalRows} entries
        </div>

        <div className="text-sm text-muted-foreground flex-1 text-center mr-3">
          Page {pagination.pageIndex + 1} of {totalPages}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setPagination((prev) => ({ ...prev, pageIndex: 0 }))}
            disabled={pagination.pageIndex === 0}
            className="w-24 h-8 font-normal text-sm"
          >
            <ChevronsLeft className="h-4 w-4" /> First page
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              setPagination((prev) => ({
                ...prev,
                pageIndex: Math.max(prev.pageIndex - 1, 0),
              }))
            }
            disabled={pagination.pageIndex === 0}
            className="w-24 h-8 font-normal text-sm"
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              setPagination((prev) => ({
                ...prev,
                pageIndex: prev.pageIndex + 1,
              }))
            }
            disabled={pagination.pageIndex >= totalPages - 1}
            className="w-24 h-8 font-normal text-sm"
          >
            Next <ChevronRight className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              setPagination((prev) => ({
                ...prev,
                pageIndex: totalPages - 1,
              }))
            }
            disabled={pagination.pageIndex >= totalPages - 1}
            className="w-24 h-8 font-normal text-sm"
          >
            Last Page <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
