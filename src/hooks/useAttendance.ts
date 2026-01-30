import { toast } from "react-hot-toast";
import {
  UseMutationResult,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  GetAttendanceToday,
  GetAttendanceChart,
  AttendanceChartRange,
} from "@/services/Attendance";

import { StdioNull } from "child_process";
import { GetAttendanceBySection } from "@/services/Attendance";
import type { AttendanceBySectionItem } from "@/services/Attendance";
import { generateAttendanceReportPdf } from "@/utils/attendanceReportPdf";

const toYmd = (dt?: string | null) => (dt ? dt.slice(0, 10) : "");

export const useDownloadAttendanceReportPdf = () => {
  return useMutation({
    mutationFn: async (args: {
      token: string;
      section: string;
      gradeLabel: string;
      sectionLabel: string;
      teacherName: string;
      schoolName: string;
      subtitle?: string;
      startDate: string; // YYYY-MM-DD
      endDate: string;   // YYYY-MM-DD
    }) => {
      const {
        token,
        section,
        gradeLabel,
        sectionLabel,
        teacherName,
        schoolName,
        subtitle,
        startDate,
        endDate,
      } = args;

      const res = await GetAttendanceBySection(token, section);

      const filtered: AttendanceBySectionItem[] = (res.data || []).filter((r : any) => {
        const d = toYmd(r.date || r.time_in);
        if (!d) return false;
        return d >= startDate && d <= endDate;
      });

      const doc = generateAttendanceReportPdf({
        schoolName,
        subtitle: subtitle || "Example on student view",
        gradeLabel,
        sectionLabel,
        teacherName,
        startDate,
        endDate,
        rows: filtered,
      });

      doc.save(`attendance_${section}_${startDate}_to_${endDate}.pdf`);

      return filtered.length;
    },
    onSuccess: (count) => toast.success(`PDF downloaded (${count} rows).`),
    onError: (err: any) =>
      toast.error(err?.message || "Failed to download PDF."),
  });
};


export const useAttendanceChart = (
  token: string | null,
  range: AttendanceChartRange,
) => {
  return useQuery({
    queryKey: ["attendance-chart", range],
    queryFn: () => GetAttendanceChart(token as string, range),
    enabled: !!token && !!range,
  });
};

export const useAttendanceToday = (token: string | null) => {
  return useQuery({
    queryKey: ["attendance-today"],
    queryFn: () => GetAttendanceToday(token as string),
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
  });
};
