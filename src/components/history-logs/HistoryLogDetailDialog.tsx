"use client";

import { BookOpen, GraduationCap, Users } from "lucide-react";
import { useHistoryLogById } from "@/hooks/useHistoryLogById";
import { useSession } from "@/context/SessionContext";
import {
  buildHistoryPersonName,
  buildHistoryTransition,
  extractHistoryLog,
  getHandledStudents,
  getHistoryEmployee,
  getHistorySchoolYear,
} from "@/lib/history-log";
import type { HistoryEmployeeRecord, HistoryLogRecord } from "@/types/history-log";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function formatHistoryDate(value?: string | null) {
  if (!value) return "N/A";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function renderTeacherMeta(label: string, teacher?: HistoryEmployeeRecord | null) {
  return (
    <div className="rounded-lg border bg-background/70 p-3">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold uppercase">
        {buildHistoryPersonName(teacher) || "N/A"}
      </p>
      <div className="mt-1 text-xs text-muted-foreground">
        {teacher?.employee_no || teacher?.email || "No teacher information"}
      </div>
      <div className="mt-1 text-xs text-muted-foreground">
        Grade: {teacher?.additional_info?.grade || "N/A"} | Section:{" "}
        {teacher?.additional_info?.section || "N/A"}
      </div>
    </div>
  );
}

function DetailSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-5 w-48" />
      <div className="grid gap-4 md:grid-cols-2">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-48 w-full" />
    </div>
  );
}

function DetailContent({ record }: { record: HistoryLogRecord }) {
  const employee = getHistoryEmployee(record);
  const transition = buildHistoryTransition(record);
  const students = getHandledStudents(record);
  const schoolYear = getHistorySchoolYear(record);
  const teacherHistory = record.teacher_history ?? record.data?.teacher;

  return (
    <ScrollArea className="max-h-[78vh] px-1 pr-4">
      <div className="space-y-4 pb-6">
        <Card className="gap-3">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Log Summary</CardTitle>
            <CardDescription>
              {record.action || record.message || "Changes were saved."}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-3">
            <div className="rounded-lg border bg-background/70 p-3">
              <p className="text-xs text-muted-foreground">Teacher</p>
              <p className="mt-1 text-sm font-semibold uppercase">
                {buildHistoryPersonName(employee) || "N/A"}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {employee?.employee_no || "No employee number"}
              </p>
            </div>
            <div className="rounded-lg border bg-background/70 p-3">
              <p className="text-xs text-muted-foreground">School Year</p>
              <p className="mt-1 text-sm font-semibold">{schoolYear || "N/A"}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Logged {formatHistoryDate(record.created_at)}
              </p>
            </div>
            <div className="rounded-lg border bg-background/70 p-3">
              <p className="text-xs text-muted-foreground">Contact</p>
              <p className="mt-1 text-sm font-semibold break-all">
                {employee?.email || "No email"}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Updated {formatHistoryDate(record.updated_at)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="gap-3">
          <CardHeader className="pb-0">
            <CardTitle className="text-base flex items-center gap-2">
              <GraduationCap className="size-4 text-primary" />
              Grade and Section
            </CardTitle>
            <CardDescription>
              This shows the grade and section before and after the change.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border bg-background/70 p-3">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Previous
              </p>
              <p className="mt-2 text-sm">
                Grade: {transition?.oldGrade || "N/A"}
              </p>
              <p className="text-sm">
                Section: {transition?.oldSection || "N/A"}
              </p>
            </div>
            <div className="rounded-lg border bg-background/70 p-3">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                New
              </p>
              <p className="mt-2 text-sm">
                Grade: {transition?.newGrade || "N/A"}
              </p>
              <p className="text-sm">
                Section: {transition?.newSection || "N/A"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="gap-3">
          <CardHeader className="pb-0">
            <CardTitle className="text-base flex items-center gap-2">
              <BookOpen className="size-4 text-primary" />
              Teacher Assignment
            </CardTitle>
            <CardDescription>
              This shows the teacher assignment before and after the update.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            {renderTeacherMeta("Previous Teacher", teacherHistory?.old)}
            {renderTeacherMeta("New Teacher", teacherHistory?.new)}
          </CardContent>
        </Card>

        <Card className="gap-3">
          <CardHeader className="pb-0">
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="size-4 text-primary" />
              Handled Students
            </CardTitle>
            <CardDescription>
              {students.length} student{students.length === 1 ? "" : "s"} linked
              to this log.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {students.length ? (
              <div className="overflow-x-auto rounded-lg border bg-background/70">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>LRN</TableHead>
                      <TableHead>School Year</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => {
                      const studentKey =
                        student.lrn ||
                        student.id ||
                        student.user_id ||
                        student.email;

                      return (
                        <TableRow key={String(studentKey)}>
                          <TableCell>
                            <div className="font-semibold uppercase">
                              {buildHistoryPersonName(student) || "Unknown student"}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {student.email || "No email"}
                            </div>
                          </TableCell>
                          <TableCell>{student.lrn || "N/A"}</TableCell>
                          <TableCell>
                            {student.school_year ||
                              student.additional_info?.school_year ||
                              "No school year"}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
                No students are linked to this record.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}

type HistoryLogDetailDialogProps = {
  historyLogId: number | string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function HistoryLogDetailDialog({
  historyLogId,
  open,
  onOpenChange,
}: HistoryLogDetailDialogProps) {
  const { token } = useSession();
  const { data, isLoading, isError } = useHistoryLogById(
    token,
    historyLogId,
    open,
  );
  const record = extractHistoryLog(data);
  const employee = record ? getHistoryEmployee(record) : null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="bottom-0 h-[100vh] overflow-y-auto rounded-t-xl p-4 sm:max-w-none"
      >
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <BookOpen className="size-4 text-primary" />
            History Log Details
          </SheetTitle>
          <SheetDescription className="space-y-1">
            <span className="block">
              {buildHistoryPersonName(employee) ||
                "Teacher information will appear here."}
            </span>
          </SheetDescription>
        </SheetHeader>

        <Separator />

        {isLoading ? (
          <DetailSkeleton />
        ) : isError || !record ? (
          <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
            Unable to load this history log.
          </div>
        ) : (
          <DetailContent record={record} />
        )}
      </SheetContent>
    </Sheet>
  );
}
