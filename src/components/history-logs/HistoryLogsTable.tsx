"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { HistoryLogRecord } from "@/types/history-log";
import {
  buildHistoryPersonName,
  buildHistoryTransition,
  getHandledStudents,
  getHistoryEmployee,
  getHistorySchoolYear,
} from "@/lib/history-log";
import { HistoryLogDetailDialog } from "@/components/history-logs/HistoryLogDetailDialog";

type HistoryLogsTableProps = {
  title: string;
  logs: HistoryLogRecord[];
  isLoading?: boolean;
  pageSize?: number;
  emptyMessage?: string;
};

export function HistoryLogsTable({
  title,
  logs,
  isLoading = false,
  pageSize = 5,
  emptyMessage = "No history logs found.",
}: HistoryLogsTableProps) {
  const [search, setSearch] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [selectedHistoryLogId, setSelectedHistoryLogId] = useState<
    number | string | null
  >(null);

  const filteredLogs = useMemo(() => {
    const needle = search.trim().toLowerCase();
    if (!needle) return logs;

    return logs.filter((record) => {
      const employee = getHistoryEmployee(record);
      const transition = buildHistoryTransition(record);
      const handledStudents = getHandledStudents(record);
      const haystack = [
        buildHistoryPersonName(employee),
        employee?.email,
        employee?.employee_no,
        getHistorySchoolYear(record),
        record.grade?.grade_level,
        record.gradeNew?.grade_level,
        record.section?.section_name,
        record.sectionNew?.section_name,
        record.action,
        record.message,
        transition?.oldGrade,
        transition?.newGrade,
        transition?.oldSection,
        transition?.newSection,
        ...handledStudents.flatMap((student) => [
          buildHistoryPersonName(student),
          student.lrn,
          student.email,
        ]),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(needle);
    });
  }, [logs, search]);

  useEffect(() => {
    setPageIndex(0);
  }, [search, logs]);

  const totalRows = filteredLogs.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / pageSize));
  const pageData = filteredLogs.slice(
    pageIndex * pageSize,
    pageIndex * pageSize + pageSize,
  );
  const startRow = totalRows === 0 ? 0 : pageIndex * pageSize + 1;
  const endRow = totalRows === 0 ? 0 : startRow + pageData.length - 1;

  return (
    <div className="w-full rounded-lg h-auto p-5 bg-accent/20">
      <div className="p-4 flex items-center gap-2">
        <BookOpen className="size-4 text-primary" />
        <p className="text-sm font-medium">{title}</p>
      </div>

      <div className="mb-5 flex items-center gap-3">
        <div className="relative w-full max-w-sm">
          <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search teacher, employee no, grade, section, or school year..."
          />
        </div>
      </div>

      <div className="w-full rounded-lg border bg-accent/10 overflow-hidden">
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
                <TableHead className="text-sm">Employee No.</TableHead>
                <TableHead className="text-sm">Teacher</TableHead>
                <TableHead className="text-sm">Grade</TableHead>
                <TableHead className="text-sm">Section</TableHead>
                <TableHead className="text-sm">School Year</TableHead>
                <TableHead className="text-sm text-right">View</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageData.length ? (
                pageData.map((record) => {
                  const employee = getHistoryEmployee(record);
                  const transition = buildHistoryTransition(record);
                  const handledStudents = getHandledStudents(record);
                  const currentGrade =
                    transition?.newGrade ||
                    record.gradeNew?.grade_level ||
                    record.grade?.grade_level ||
                    "N/A";
                  const currentSection =
                    transition?.newSection ||
                    record.sectionNew?.section_name ||
                    record.section?.section_name ||
                    "N/A";

                  return (
                    <TableRow key={record.id} className="hover:bg-accent/40">
                      <TableCell className="text-sm font-medium">
                        {employee?.employee_no || "N/A"}
                      </TableCell>
                      <TableCell className="text-sm">
                        <div className="font-medium uppercase">
                          {buildHistoryPersonName(employee) || "Unknown"}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {employee?.email || "No email"}
                        </div>
                        <div className="mt-2">
                          <Badge variant="outline">
                            {handledStudents.length} student
                            {handledStudents.length === 1 ? "" : "s"}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        {currentGrade}
                      </TableCell>
                      <TableCell className="text-sm">
                        {currentSection}
                      </TableCell>
                      <TableCell className="text-sm">
                        {getHistorySchoolYear(record) || "N/A"}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedHistoryLogId(record.id)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
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

      <div className="flex items-center justify-between px-5 py-4">
        <div className="text-sm text-muted-foreground flex-1">
          Showing {startRow} to {endRow} of {totalRows} entries
        </div>

        <div className="text-sm text-muted-foreground flex-1 text-center">
          Page {pageIndex + 1} of {totalPages}
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

      <HistoryLogDetailDialog
        historyLogId={selectedHistoryLogId}
        open={selectedHistoryLogId !== null}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedHistoryLogId(null);
          }
        }}
      />
    </div>
  );
}
