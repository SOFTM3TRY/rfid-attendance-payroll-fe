"use client";

import * as React from "react";
import { useAuth } from "@/context/AuthContext";
import { useTeacherDetails } from "@/hooks/useTeacher";

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
  teacherId: string;
};

export default function TeacherSubjects({ teacherId }: Props) {
  const { token } = useAuth();

  const { data, isLoading, isFetching } = useTeacherDetails(token, {
    id: teacherId,
  });

  const teacher = data?.data?.teacher?.[0] || null;
  const teacherSubjects: any[] = teacher?.teacher_subjects || [];

  const loading = isLoading || isFetching;

  // ✅ pagination (5 per page)
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 5,
  });

  // ✅ reset page when teacher changes or list changes
  React.useEffect(() => {
    setPagination((p) => ({ ...p, pageIndex: 0 }));
  }, [teacherId, teacherSubjects.length]);

  const totalRows = teacherSubjects.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / pagination.pageSize));

  const pageIndex = pagination.pageIndex;
  const pageSize = pagination.pageSize;

  const pageData = React.useMemo(() => {
    const start = pageIndex * pageSize;
    const end = start + pageSize;
    return teacherSubjects.slice(start, end);
  }, [teacherSubjects, pageIndex, pageSize]);

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
            <Skeleton className="h-4 w-full" />
          </div>

          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="grid grid-cols-4 gap-3">
              <Skeleton className="h-10 w-full" />
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
      <div className="p-4 flex items-center gap-2">
        <BookOpen className="size-4 text-teal-500" />
        <p className="text-sm font-medium">Teacher Subjects</p>
      </div>
      <div className="w-full rounded-lg border bg-accent/10 overflow-hidden my-5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs">Subject</TableHead>
              <TableHead className="text-xs">Grade Level</TableHead>
              <TableHead className="text-xs">Schedule Day</TableHead>
              <TableHead className="text-xs">Schedule Time</TableHead>
              <TableHead className="text-xs">Year</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {pageData.length ? (
              pageData.map((s: any) => (
                <TableRow key={s.id} className="hover:bg-accent/40">
                  <TableCell className="text-xs font-medium py-5">
                    {s.subject_name || "N/A"}
                  </TableCell>
                  <TableCell className="text-xs">
                    {s.grade_level || "N/A"}
                  </TableCell>
                  <TableCell className="text-xs">
                    {s.schedule_day || "N/A"}
                  </TableCell>
                  <TableCell className="text-xs">
                    {s.schedule || "N/A"}
                  </TableCell>
                  <TableCell className="text-xs">
                    {s.created_at
                      ? new Intl.DateTimeFormat("en-US", {
                          year: "numeric",
                        }).format(new Date(s.created_at))
                      : "—"}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="py-10 text-center text-xs text-muted-foreground"
                >
                  No assigned subjects yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* ✅ Pagination */}
      <div className="flex items-center justify-between px-5 py-4">
        <div className="text-xs text-muted-foreground flex-1">
          Showing {startRow} to {endRow} of {totalRows} entries
        </div>

        <div className="text-xs text-muted-foreground flex-1 text-center">
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
