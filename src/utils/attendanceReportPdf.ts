import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export type AttendanceRow = {
  lrn: string;
  fullname: string;
  status: string; // Present | Late | Absent | etc
  time_in: string | null;  // "2026-01-25 18:05:50"
  time_out: string | null; // "2026-01-25 19:00:00"
  date: string;            // "2026-01-25 18:05:50" or "2026-01-25"
};

const toYmd = (dt?: string | null) => {
  if (!dt) return "";
  return dt.length >= 10 ? dt.slice(0, 10) : dt;
};

// OPTIONAL: format time to "06:15:54 AM"
const formatTime12 = (dt?: string | null) => {
  if (!dt) return "";
  // expecting "YYYY-MM-DD HH:mm:ss"
  const time = dt.split(" ")[1];
  if (!time) return "";
  const [hh, mm, ss] = time.split(":").map((x) => parseInt(x, 10));
  if (Number.isNaN(hh)) return "";

  const suffix = hh >= 12 ? "PM" : "AM";
  const h12 = ((hh + 11) % 12) + 1;
  const pad = (n: number) => String(n).padStart(2, "0");

  return `${pad(h12)}:${pad(mm)}:${pad(ss || 0)} ${suffix}`;
};

// OPTIONAL: format date to "01/24/2025"
const formatDateMDY = (ymd: string) => {
  if (!ymd || ymd.length < 10) return "";
  const [y, m, d] = ymd.slice(0, 10).split("-");
  return `${m}/${d}/${y}`;
};

export function generateAttendanceReportPdf(args: {
  schoolName: string;          // "Young Generation Academy"
  subtitle?: string;           // "Example on student view"
  gradeLabel: string;          // "One"
  sectionLabel: string;        // "2"
  teacherName: string;         // "Mrs. Shaine Angga"
  startDate: string;           // "2025-01-24"
  endDate: string;             // "2025-02-24"
  rows: AttendanceRow[];
}) {
  const {
    schoolName,
    subtitle = "",
    gradeLabel,
    sectionLabel,
    teacherName,
    startDate,
    endDate,
    rows,
  } = args;

  // portrait to match screenshot
  const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });

  const pageWidth = doc.internal.pageSize.getWidth();
  const marginX = 40;

  // ===== HEADER LINES =====
  doc.setDrawColor(120);
  doc.setLineWidth(1);
  doc.line(marginX, 35, pageWidth - marginX, 35); // top line
  doc.line(marginX, 90, pageWidth - marginX, 90); // bottom line

  // Left school name
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text(schoolName, marginX, 60);

  // Left subtitle under school name
//   if (subtitle) {
//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(11);
//     doc.text(subtitle, marginX, 82);
//   }

  // Center title
  doc.setFont("helvetica", "normal");
  doc.setFontSize(20);
  doc.text("ATTENDANCE REPORT", pageWidth / 2, 90, { align: "center" });

  // ===== INFO BOX (dashed border) =====
  const boxW = 520;
  const boxH = 110;
  const boxX = (pageWidth - boxW) / 2;
  const boxY = 125;

  doc.setDrawColor(0);
  doc.setLineWidth(1);
  // dashed rectangle
  // @ts-ignore
  doc.setLineDashPattern([3, 3], 0);
  doc.rect(boxX, boxY, boxW, boxH);
  // back to solid
  // @ts-ignore
  doc.setLineDashPattern([], 0);

  const labelX = boxX + 18;
  const valueX = boxX + 160;
  let y = boxY + 28;

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Grade:", labelX, y);
  doc.setFont("helvetica", "normal");
  doc.text(gradeLabel, valueX, y);

  y += 20;
  doc.setFont("helvetica", "bold");
  doc.text("Section:", labelX, y);
  doc.setFont("helvetica", "normal");
  doc.text(sectionLabel, valueX, y);

  y += 20;
  doc.setFont("helvetica", "bold");
  doc.text("Date Covered:", labelX, y);
  doc.setFont("helvetica", "normal");
  doc.text(
    `${formatDateMDY(startDate)} - ${formatDateMDY(endDate)}`,
    valueX,
    y
  );

  y += 20;
  doc.setFont("helvetica", "bold");
  doc.text("Teacher:", labelX, y);
  doc.setFont("helvetica", "normal");
  doc.text(teacherName, valueX, y);

  y += 20;
  doc.setFont("helvetica", "bold");
  doc.text("Total:", labelX, y);
  doc.setFont("helvetica", "normal");
  doc.text(String(rows.length), valueX, y);

  // ===== TABLE =====
  const tableStartY = boxY + boxH + 25;

  autoTable(doc, {
    startY: tableStartY,
    head: [[
      "NO.",
      "LRN",
      "FULL NAME",
      "STATUS",
      "TIME IN",
      "TIME OUT",
      "DATE",
    ]],
    body: rows.map((r, idx) => {
      const d = toYmd(r.date || r.time_in);
      return [
        String(idx + 1),
        r.lrn,
        r.fullname,
        r.status,
        formatTime12(r.time_in),
        formatTime12(r.time_out),
        formatDateMDY(d),
      ];
    }),
    styles: {
      font: "helvetica",
      fontSize: 10,
      cellPadding: 6,
      lineColor: [80, 80, 80],
      lineWidth: 0.7,
      valign: "middle",
    },
    headStyles: {
      fillColor: [0, 0, 0],     // black header
      textColor: [255, 255, 255],
      fontStyle: "bold",
      halign: "center",
      lineWidth: 0.7,
    },
    bodyStyles: {
      textColor: [30, 30, 30],
    },
    columnStyles: {
      0: { cellWidth: 45, halign: "center" }, // NO.
      1: { cellWidth: 115 },                  // LRN
      2: { cellWidth: 155 },                  // FULL NAME
      3: { cellWidth: 80, halign: "center" }, // STATUS
      4: { cellWidth: 85, halign: "center" }, // TIME IN
      5: { cellWidth: 85, halign: "center" }, // TIME OUT
      6: { cellWidth: 85, halign: "center" }, // DATE
    },
    didDrawPage: () => {
      // optional: could re-draw header here per page if you want
    },
  });

  return doc;
}
