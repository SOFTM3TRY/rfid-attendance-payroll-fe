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
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { GetAttendanceBySection } from "@/services/Attendance";

/* =========================
   TYPES
========================= */
type AttendanceItem = {
  id: number;
  lrn: string;
  grade: string;
  section: string;
  fullname: string;
  status: string;
  time_in: string | null;
  time_out: string | null;
  date: string;
};

type AttendanceResponse = {
  status: boolean;
  data: AttendanceItem[];
};

/* =========================
   DATE HELPERS
========================= */
function parseToDate(value?: string | null): Date | null {
  if (!value) return null;

  const v = value.trim();

  // YYYY-MM-DD or YYYY-MM-DD HH:mm:ss
  if (v.includes("-") && v.length >= 10) {
    const [yyyy, mm, dd] = v.slice(0, 10).split("-");
    return new Date(Number(yyyy), Number(mm) - 1, Number(dd));
  }

  return null;
}

function formatDate(d: Date) {
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
}

function formatTime12(dt?: string | null) {
  if (!dt) return "";

  const time = dt.split(" ")[1];
  if (!time) return "";

  const [hhStr, mmStr, ssStr] = time.split(":");
  const hh = Number(hhStr);

  const suffix = hh >= 12 ? "PM" : "AM";
  const h12 = ((hh + 11) % 12) + 1;

  return `${String(h12).padStart(2, "0")}:${mmStr}:${ssStr} ${suffix}`;
}

/* =========================
   PDF GENERATOR (Screenshot Layout)
========================= */
function generatePdf(args: {
  schoolName: string;
  gradeLabel: string;
  sectionLabel: string;
  teacherName: string;
  startDate: string;
  endDate: string;
  rows: AttendanceItem[];
}) {
  const {
    schoolName,
    gradeLabel,
    sectionLabel,
    teacherName,
    startDate,
    endDate,
    rows,
  } = args;

  const doc = new jsPDF("portrait", "pt", "a4");
  const pageWidth = doc.internal.pageSize.getWidth();
  const marginX = 40;

  // Header lines
  doc.setDrawColor(120);
  doc.line(marginX, 35, pageWidth - marginX, 35);
  doc.line(marginX, 90, pageWidth - marginX, 90);

  // School name
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(schoolName, marginX, 60);

  // Title
  doc.setFont("helvetica", "normal");
  doc.setFontSize(15);
  doc.text("ATTENDANCE REPORT", pageWidth / 2, 80, { align: "center" });

  // Info box
  const boxX = marginX;
  const boxY = 120;
  const boxW = pageWidth - marginX * 2;
  const boxH = 120;

  doc.setLineDashPattern([3, 3], 0);
  doc.rect(boxX, boxY, boxW, boxH);
  doc.setLineDashPattern([], 0);

  let y = boxY + 25;
  doc.setFontSize(10);

  doc.setFont("helvetica", "bold");
  doc.text("Grade:", boxX + 20, y);
  doc.setFont("helvetica", "normal");
  doc.text(gradeLabel, boxX + 120, y);

  y += 20;
  doc.setFont("helvetica", "bold");
  doc.text("Section:", boxX + 20, y);
  doc.setFont("helvetica", "normal");
  doc.text(sectionLabel, boxX + 120, y);

  y += 20;
  doc.setFont("helvetica", "bold");
  doc.text("Date Covered:", boxX + 20, y);
  doc.setFont("helvetica", "normal");
  doc.text(`${startDate} - ${endDate}`, boxX + 120, y);

  y += 20;
  doc.setFont("helvetica", "bold");
  doc.text("Teacher:", boxX + 20, y);
  doc.setFont("helvetica", "normal");
  doc.text(teacherName, boxX + 120, y);

  y += 20;
  doc.setFont("helvetica", "bold");
  doc.text("Total:", boxX + 20, y);
  doc.setFont("helvetica", "normal");
  doc.text(String(rows.length), boxX + 120, y);

  // Table
  autoTable(doc, {
    startY: boxY + boxH + 20,
    head: [[
      "NO.",
      "LRN",
      "FULL NAME",
      "STATUS",
      "TIME IN",
      "TIME OUT",
      "DATE",
    ]],
    body: rows.map((r, i) => {
      const d = parseToDate(r.date);
      return [
        i + 1,
        r.lrn,
        r.fullname,
        r.status,
        formatTime12(r.time_in),
        r.time_out || "",
        d ? formatDate(d) : "",
      ];
    }),
    headStyles: {
      fillColor: [0, 0, 0],
      textColor: [255, 255, 255],
      halign: "center",
    },
    styles: {
      fontSize: 10,
      cellPadding: 5,
    },
  });

  doc.save(`attendance_${sectionLabel}_${startDate}_to_${endDate}.pdf`);
}

/* =========================
   MAIN HOOK
========================= */
export const useDownloadAttendanceReportPdf = () => {
  return useMutation({
    mutationFn: async (args: {
      token: string;
      section: string;
      startDate: string;
      endDate: string;
      schoolName: string;
      gradeLabel: string;
      sectionLabel: string;
      teacherName: string;
    }) => {
      const {
        token,
        section,
        startDate,
        endDate,
        schoolName,
        gradeLabel,
        sectionLabel,
        teacherName,
      } = args;

      console.log("SECTION PARAM:", section);

      // ✅ API CALL (same as Postman)
      const res = (await GetAttendanceBySection(
        token,
        section,
        startDate,
        endDate
      )) as AttendanceResponse;

      console.log("FULL RESPONSE:", res);

      const rows = res.data || [];

      if (rows.length === 0) {
        toast.error("No attendance found in this date range.");
        return 0;
      }

      // ✅ Generate PDF
      generatePdf({
        schoolName,
        gradeLabel,
        sectionLabel,
        teacherName,
        startDate,
        endDate,
        rows,
      });

      return rows.length;
    },

    onSuccess: (count) => {
      if (count > 0) toast.success(`PDF Downloaded (${count} rows).`);
    },

    onError: (err: any) => {
      toast.error(err?.message || "Failed to download PDF.");
    },
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
