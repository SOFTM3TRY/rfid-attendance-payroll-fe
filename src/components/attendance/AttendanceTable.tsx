"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BadgeInfo,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
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
import type { AttendanceRecord } from "@/types/attendance";

function getStudentLabel(record: AttendanceRecord) {
  if (record.fullname?.trim()) return record.fullname.trim();
  if (record.full_name?.trim()) return record.full_name.trim();

  const student = record.student;
  return [
    student?.last_name,
    student?.first_name,
    student?.middle_name,
    student?.suffix,
  ]
    .filter(Boolean)
    .join(" ")
    .trim() || "Unknown student";
}

function getRecordKey(record: AttendanceRecord) {
  return String(
    record.id ??
      record.student_id ??
      record.user_id ??
      record.lrn ??
      `${getStudentLabel(record)}-${record.date ?? ""}-${record.time_in ?? ""}`,
  );
}

type AttendanceTableProps = {
  title: string;
  description?: string;
  records: AttendanceRecord[];
  isLoading?: boolean;
  emptyMessage?: string;
  pageSize?: number;
};

export function AttendanceTable({
  title,
  description,
  records,
  isLoading = false,
  emptyMessage = "No attendance data found.",
  pageSize = 5,
}: AttendanceTableProps) {
  const [search, setSearch] = useState("");
  const [pageIndex, setPageIndex] = useState(0);

  const sortedRecords = useMemo(() => {
    return [...records].sort((left, right) => {
      const leftName = getStudentLabel(left);
      const rightName = getStudentLabel(right);
      const nameResult = leftName.localeCompare(rightName, undefined, {
        sensitivity: "base",
      });

      if (nameResult !== 0) return nameResult;

      return String(left.lrn ?? "").localeCompare(String(right.lrn ?? ""), undefined, {
        sensitivity: "base",
      });
    });
  }, [records]);

  const filteredRecords = useMemo(() => {
    const needle = search.trim().toLowerCase();
    if (!needle) return sortedRecords;

    return sortedRecords.filter((record) => {
      const haystack = [
        record.lrn,
        getStudentLabel(record),
        record.status,
        record.remarks,
        record.date,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(needle);
    });
  }, [search, sortedRecords]);

  useEffect(() => {
    setPageIndex(0);
  }, [search, records]);

  const totalRows = filteredRecords.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / pageSize));
  const pageData = filteredRecords.slice(
    pageIndex * pageSize,
    pageIndex * pageSize + pageSize,
  );
  const startRow = totalRows === 0 ? 0 : pageIndex * pageSize + 1;
  const endRow = totalRows === 0 ? 0 : startRow + pageData.length - 1;

  return (
    <div className="rounded-lg border bg-background p-5 space-y-5">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-sm font-medium">
          <BadgeInfo className="size-4 text-primary" />
          {title}
        </div>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by LRN, name, status, or date..."
        />
      </div>

      <div className="overflow-hidden rounded-md border">
        {isLoading ? (
          <div className="p-4 space-y-3">
            <div className="grid grid-cols-6 gap-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="h-4 w-full" />
              ))}
            </div>
            {Array.from({ length: pageSize }).map((_, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-6 gap-3">
                {Array.from({ length: 6 }).map((__, cellIndex) => (
                  <Skeleton key={cellIndex} className="h-10 w-full" />
                ))}
              </div>
            ))}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>LRN</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time In</TableHead>
                <TableHead>Time Out</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageData.length ? (
                pageData.map((record) => (
                  <TableRow key={getRecordKey(record)}>
                    <TableCell className="font-medium">
                      {record.lrn || "N/A"}
                    </TableCell>
                    <TableCell>
                      <div>{getStudentLabel(record)}</div>
                      {record.lrn ? (
                        <div className="text-xs text-muted-foreground">
                          LRN: {record.lrn}
                        </div>
                      ) : null}
                    </TableCell>
                    <TableCell>{record.status || record.remarks || "N/A"}</TableCell>
                    <TableCell>{record.date || "N/A"}</TableCell>
                    <TableCell>{record.time_in || "N/A"}</TableCell>
                    <TableCell>{record.time_out || "N/A"}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="py-10 text-center text-sm text-muted-foreground"
                  >
                    {emptyMessage}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {startRow} to {endRow} of {totalRows} entries
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPageIndex(0)}
            disabled={pageIndex === 0}
          >
            <ChevronsLeft className="h-4 w-4 mr-1" />
            First
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPageIndex((value) => Math.max(value - 1, 0))}
            disabled={pageIndex === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setPageIndex((value) => Math.min(value + 1, totalPages - 1))
            }
            disabled={pageIndex >= totalPages - 1}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPageIndex(totalPages - 1)}
            disabled={pageIndex >= totalPages - 1}
          >
            Last
            <ChevronsRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
