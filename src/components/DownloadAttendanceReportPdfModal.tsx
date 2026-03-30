"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Download, FileText } from "lucide-react";
import { useAttendanceReportDrawer } from "@/hooks/useAttendanceReportDrawer";
import { AttendanceTable } from "@/components/attendance/AttendanceTable";

export default function DownloadAttendancePdfModal(props: {
  token: string;
  sectionId: string;
  gradeLabel: string;
  sectionLabel: string;
  teacherName: string;
  schoolName: string;
}) {
  const { token, sectionId, gradeLabel, sectionLabel, teacherName, schoolName } = props;
  const {
    open,
    setOpen,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    attendanceRecords,
    attendanceQuery,
    canDownload,
    handleDownload,
    isDownloading,
    hasDateRange,
  } = useAttendanceReportDrawer({
    token,
    sectionId,
    gradeLabel,
    sectionLabel,
    teacherName,
    schoolName,
  });

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="rounded-full">
          <FileText className="size-4" />
          Attendance Report
        </Button>
      </SheetTrigger>

      <SheetContent
        side="bottom"
        className="bottom-0 h-auto max-h-[100vh] rounded-t-xl px-4 pb-6 pt-4 sm:max-w-none"
      >
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Download className="size-4 text-primary" />
            Download Attendance Report
          </SheetTitle>
          <SheetDescription>
            Pick a date range for {gradeLabel} - {sectionLabel}, then download
            the PDF report from this drawer.
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="mt-6 h-[calc(92vh-110px)] pr-3">
          <div className="space-y-6 pb-2">
            <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
              <div className="space-y-4 rounded-xl border bg-accent/10 p-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label>Start Date</Label>
                    <Input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>End Date</Label>
                    <Input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="ghost" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>

                  <Button onClick={handleDownload} disabled={!canDownload}>
                    {isDownloading ? "Generating..." : "Download PDF Report"}
                  </Button>
                </div>
              </div>

              <div className="space-y-3 rounded-xl border bg-background/70 p-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    Grade
                  </p>
                  <p className="text-sm font-semibold">{gradeLabel || "N/A"}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    Section
                  </p>
                  <p className="text-sm font-semibold">{sectionLabel || "N/A"}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    Teacher
                  </p>
                  <p className="text-sm font-semibold">{teacherName || "N/A"}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    School
                  </p>
                  <p className="text-sm font-semibold">{schoolName || "N/A"}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    Notes
                  </p>
                  <p className="text-sm text-muted-foreground">
                    The PDF uses the selected date range and the attendance
                    records for this advisory section.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <AttendanceTable
                title="Attendance Preview"
                description={
                  hasDateRange
                    ? "Review the attendance records for the selected date range before downloading the PDF."
                    : "Select a start and end date to load the attendance preview."
                }
                records={attendanceRecords}
                isLoading={hasDateRange && attendanceQuery.isLoading}
                emptyMessage={
                  hasDateRange
                    ? "No attendance records were found for this date range."
                    : "Attendance preview will appear here after you choose a date range."
                }
              />
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
