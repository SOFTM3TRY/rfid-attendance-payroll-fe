"use client";

import * as React from "react";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Eye, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import { Email } from "@/types/email";

interface Props {
  emails: Email[];
  page: number;
  onPageChange: (page: number) => void;
  search: string;
  onSearch: (search: string) => void;
  filter: string;
  onFilter: (filter: string) => void;
  totalEmails: number;
  pageSize: number;
}

const columns: ColumnDef<Email>[] = [
  {
    accessorKey: "sender",
    header: "Sender",
    cell: ({ row }) => <div>{row.getValue("sender")}</div>,
  },
  {
    accessorKey: "subject",
    header: "Subject",
    cell: ({ row }) => <div>{row.getValue("subject")}</div>,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="default"
              size="sm"
              onClick={() => console.log(`View email ID: ${row.original.id}`)}
            >
              <Eye />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Show Email</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => console.log(`Delete email ID: ${row.original.id}`)}
            >
              <Trash />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Delete Email</TooltipContent>
        </Tooltip>
      </div>
    ),
  },
];

export function EmailTable({
  emails,
  page,
  onPageChange,
  search,
  onSearch,
  filter,
  onFilter,
  totalEmails,
  pageSize,
}: Props) {
  const table = useReactTable({
    data: emails,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const totalPages = Math.ceil(totalEmails / pageSize);

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 pb-4">
        <Input
          placeholder="Search subject..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          className="max-w-sm"
        />
        <Select value={filter} onValueChange={onFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="read">Read</SelectItem>
            <SelectItem value="unread">Unread</SelectItem>
          </SelectContent>
        </Select>
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
            {emails.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="py-5" key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center h-24">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between py-4">
        <div className="text-sm text-muted-foreground">
          Showing {(page - 1) * pageSize + 1} to{" "}
          {Math.min(page * pageSize, totalEmails)} of {totalEmails} entries
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
          >
            Previous
          </Button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <Button
              key={i}
              variant={i + 1 === page ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(i + 1)}
            >
              {i + 1}
            </Button>
          ))}

          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
