import * as React from "react";
import { useAttendanceBySection } from "@/hooks/useAttendanceBySection";
import { useDownloadAttendanceReportPdf } from "@/hooks/useAttendance";
import type { AttendanceRecord } from "@/types/attendance";

type UseAttendanceReportDrawerArgs = {
  token: string;
  sectionId: string;
  gradeLabel: string;
  sectionLabel: string;
  teacherName: string;
  schoolName: string;
};

export function useAttendanceReportDrawer({
  token,
  sectionId,
  gradeLabel,
  sectionLabel,
  teacherName,
  schoolName,
}: UseAttendanceReportDrawerArgs) {
  const [open, setOpen] = React.useState(false);
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");

  const download = useDownloadAttendanceReportPdf();
  const hasDateRange = !!startDate && !!endDate;
  const attendanceQuery = useAttendanceBySection(
    token,
    sectionId,
    hasDateRange
      ? {
          start_date: startDate,
          end_date: endDate,
        }
      : undefined,
  );

  const attendanceRecords = React.useMemo(
    () =>
      (hasDateRange && Array.isArray(attendanceQuery.data?.data)
        ? attendanceQuery.data.data
        : []) as AttendanceRecord[],
    [attendanceQuery.data, hasDateRange],
  );

  const canDownload =
    hasDateRange && startDate <= endDate && !download.isPending;

  const handleDownload = React.useCallback(async () => {
    await download.mutateAsync({
      token,
      section: sectionId,
      gradeLabel,
      sectionLabel,
      teacherName,
      schoolName,
      startDate,
      endDate,
    });

    setOpen(false);
  }, [
    download,
    endDate,
    gradeLabel,
    schoolName,
    sectionId,
    sectionLabel,
    startDate,
    teacherName,
    token,
  ]);

  return {
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
    isDownloading: download.isPending,
    hasDateRange,
  };
}
