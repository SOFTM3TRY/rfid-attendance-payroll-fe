"use client";

import * as React from "react";
import { useAuth } from "@/context/AuthContext";
import { useGetHistoryLogsByUser } from "@/hooks/useTeacher";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Skeleton } from "@/components/ui/skeleton";
import {
  BookOpen,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  teacherId: any;
};

export default function HistoryLogs({ teacherId }: Props) {
  const { token } = useAuth();

  const {
    data: response,
    isFetching: isFetchingLogs,
    isLoading,
  } = useGetHistoryLogsByUser(token, teacherId);

  const historyLogs = response?.data?.historyLogs ?? [];

  const loading = isLoading || isFetchingLogs;

  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 5,
  });

  React.useEffect(() => {
    setPagination((p) => ({ ...p, pageIndex: 0 }));
  }, [teacherId, historyLogs]);

  const totalRows = historyLogs.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / pagination.pageSize));

  const pageIndex = pagination.pageIndex;
  const pageSize = pagination.pageSize;

  const pageData = React.useMemo(() => {
    const start = pageIndex * pageSize;
    const end = start + pageSize;
    return historyLogs.slice(start, end);
  }, [historyLogs, pageIndex, pageSize]);

  const startRow = totalRows === 0 ? 0 : pageIndex * pageSize + 1;
  const endRow =
    totalRows === 0 ? 0 : Math.min(startRow + pageData.length - 1, totalRows);

  const canPrev = pageIndex > 0;
  const canNext = pageIndex < totalPages - 1;

  if (loading) {
    return (
      <div className="w-full rounded-lg border bg-background p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded" />
          <Skeleton className="h-4 w-40" />
        </div>

        <div className="space-y-2">
          <div className="grid grid-cols-4 gap-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>

          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="grid grid-cols-4 gap-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-lg h-auto p-5 bg-accent/20">
      {/* <pre>{JSON.stringify(response, null, 2)}</pre> */}

      <div className="p-4 flex items-center gap-2">
        <BookOpen className="size-4 text-teal-500" />
        <p className="text-sm font-medium">Teacher History Logs</p>
      </div>

      <div className="w-full rounded-lg border bg-accent/10 overflow-hidden my-5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-sm">History School Year</TableHead>
              <TableHead className="text-sm">History Grade Level</TableHead>
              <TableHead className="text-sm">History Section</TableHead>
              <TableHead className="text-sm">History Logs</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {pageData.length ? (
              pageData.map((s: any) => (
                <TableRow key={s.id} className="hover:bg-accent/40">
                  <TableCell className="text-sm font-medium py-5">
                    {s?.data?.data?.additional_info?.school_year || "N/A"}
                  </TableCell>

                  <TableCell className="text-sm">
                    {s?.grade?.grade_level || "N/A"}
                  </TableCell>

                  <TableCell className="text-sm">
                    {s?.section?.section_name || "N/A"}
                  </TableCell>

                  <TableCell className="text-sm">
                    Updated Grade{" "}
                    <span className="text-red-500">
                      {s?.gradeNew?.grade_level || "N/A"}
                    </span>{" "}
                    to{" "}
                    <span className="text-primary">
                      {s?.grade?.grade_level || "N/A"}
                    </span>{" "}
                    & <br /> Updated Section{" "}
                    <span className="text-red-500">
                      {s?.sectionNew?.section_name || "N/A"}
                    </span>{" "}
                    to{" "}
                    <span className="text-primary">
                      {s?.section?.section_name || "N/A"}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="py-10 text-center text-sm text-muted-foreground"
                >
                  No history logs found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
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
            onClick={() => setPagination((p) => ({ ...p, pageIndex: 0 }))}
            disabled={!canPrev}
          >
            <ChevronsLeft className="h-4 w-4 mr-1" />
            First
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setPagination((p) => ({
                ...p,
                pageIndex: Math.max(p.pageIndex - 1, 0),
              }))
            }
            disabled={!canPrev}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setPagination((p) => ({
                ...p,
                pageIndex: Math.min(p.pageIndex + 1, totalPages - 1),
              }))
            }
            disabled={!canNext}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setPagination((p) => ({ ...p, pageIndex: totalPages - 1 }))
            }
            disabled={!canNext}
          >
            Last
            <ChevronsRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
