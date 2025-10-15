'use client';

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

import { FilterTable } from "@/components/admin/manage-student/Filtertable";

const statusTypes = [
  { value: "1", label: "Active", icon: <UserCheck className="text-green-500 mr-1 w-3 h-3" /> },
  { value: "0", label: "Inactive", icon: <UserX className="text-red-500 mr-1 w-3 h-3" /> },
];

interface FiltersDropdownStatusProps {
  selectedFilters: string[];
  setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
}

function FiltersDropdownStatus({ selectedFilters, setSelectedFilters }: FiltersDropdownStatusProps) {
  const toggleFilter = (status: string) => {
    setSelectedFilters((prev) =>
      prev.includes(status) ? prev.filter((t) => t !== status) : [...prev, status]
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
}

export function TeacherTable<TData extends { status: string; last_name: string; first_name: string; middle_name?: string; suffix?: string; employee_number?: string }>({
  columns,
  data,
  pagination,
  setPagination,
  totalRows,
}: Props<TData>) {
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);

  // Filter data by status and search before passing to react-table
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // Filter by status
      if (selectedStatus.length > 0 && !selectedStatus.includes(item.status)) {
        return false;
      }

      // Filter by search
      if (search.trim() !== "") {
        const lowerSearch = search.toLowerCase();
        const fullName = `${item.last_name} ${item.first_name} ${item.middle_name || ""} ${item.suffix || ""}`;
        const employeeNo = item.employee_number || "";

        const matchesName = fullName.toLowerCase().includes(lowerSearch);
        const matchesEmpNo = employeeNo.toLowerCase().includes(lowerSearch);

        return matchesName || matchesEmpNo;
      }

      return true;
    });
  }, [data, selectedStatus, search]);


  // Update totalRows after filtering
  const filteredTotalRows = filteredData.length;

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const start = pagination.pageIndex * pagination.pageSize + 1;
  const end = Math.min(start + table.getRowModel().rows.length - 1, filteredTotalRows);
  const totalPages = Math.ceil(filteredTotalRows / pagination.pageSize);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPagination((p) => ({ ...p, pageIndex: 0 }));
  };

  return (
    <div className="w-full" style={{ pointerEvents: "auto" }}>
      <div>
        <div className="mt-5 mb-10 flex flex-wrap gap-4 justify-between items-center">
          <FilterTable pagination={pagination} setPagination={setPagination} />

          {/* Search */}
          <div className="relative max-w-md w-80">
            <Search className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search Full Name or Employee No...."
              value={search}
              onChange={handleFilterChange}
            />
          </div>

          <div className="flex gap-2">
            <FiltersDropdownStatus
              selectedFilters={selectedStatus}
              setSelectedFilters={(filters) => {
                setSelectedStatus(filters);
                setPagination((p) => ({ ...p, pageIndex: 0 }));
              }}
            />
          </div>
        </div>

        <Table className="rounded-md border">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="py-3">
                    {flexRender(header.column.columnDef.header, header.getContext())}
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
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-16 text-center text-red-500 dark:text-red-800">
                  No data found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

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
              size="icon"
              onClick={() => setPagination((prev) => ({ ...prev, pageIndex: 0 }))}
              disabled={pagination.pageIndex === 0}
              className="w-24 h-8 font-normal text-xs"
            >
              <ChevronsLeft className="h-4 w-4" /> First page
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
              onClick={() => setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex + 1 }))}
              disabled={pagination.pageIndex >= totalPages - 1}
              className="w-24 h-8 font-normal text-xs"
            >
              Next <ChevronRight className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setPagination((prev) => ({ ...prev, pageIndex: totalPages - 1 }))}
              disabled={pagination.pageIndex >= totalPages - 1}
              className="w-24 h-8 font-normal text-xs"
            >
              Last Page
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

