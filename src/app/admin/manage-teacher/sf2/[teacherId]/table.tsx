"use client";

import { useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { useClientOnly } from "@/hooks/useClientOnly";
import { useTeacherDetails } from "@/hooks/useTeacher";
import { useParams } from "next/navigation";

export default function SF2Table() {
  const pdfRef = useRef<HTMLDivElement>(null);

  const { token } = useAuth();
  const isClient = useClientOnly();
  const params = useParams();

  const teacherId = params?.teacherId;

  if (!teacherId || typeof teacherId !== "string") {
    return null;
  }

  const { data: teacherDetails } = useTeacherDetails(token, { id: teacherId });

  const teacher = teacherDetails?.data?.teacher?.[0] || null;
  const students = teacherDetails?.data?.students || [];

  const fullName = teacher
    ? `${teacher?.last_name}, ${teacher?.first_name} ${
        teacher?.middle_name || ""
      } ${teacher?.suffix || ""}`
    : "Unknown";

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--foreground", "0 0% 0%");
    root.style.setProperty("--background", "0 0% 100%");
    root.style.setProperty("--card-foreground", "0 0% 0%");
    root.style.setProperty("--card", "0 0% 100%");
    root.style.setProperty("--border", "0 0% 80%");
    root.style.setProperty("--input", "0 0% 90%");
    root.style.setProperty("--ring", "0 0% 50%");
  }, []);

  const weekdays = ["M", "T", "W", "TH", "F"];

  return (
    <div ref={pdfRef}>
      <table
        style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}
      >
        <thead>
          <tr>
            <th rowSpan={2} style={headerStyle}>
              LEARNER'S NAME (Last Name, First Name, Middle Name)
            </th>

            {/* ...date columns... */}
            {[...Array(31)].map((_, index) => (
              <th key={index} style={dateCellStyle}></th>
            ))}

            {/* "Total for the Month" spanning two columns */}
            <th colSpan={2} style={headerStyle}>
              Total for the Month
            </th>

            <th rowSpan={2} style={remarksStyle}>
              REMARKS (If DROPPED OUT, state reason, please refer to legend
              number 2. If TRANSFERRED IN/OUT, write the name of School.)
            </th>
          </tr>

          <tr>
            {/* Weekday labels under each date */}
            {[...Array(31)].map((_, index) => {
              const weekdays = ["M", "T", "W", "TH", "F"];
              return (
                <th key={index} style={dateCellStyle}>
                  {weekdays[index % weekdays.length]}
                </th>
              );
            })}

            {/* ABSENT and TARDY under "Total for the Month" */}
            <th style={headerStyle}>ABSENT</th>
            <th style={headerStyle}>TARDY</th>
          </tr>
        </thead>

        <tbody>
          {[...Array(52)].map((_, rowIndex) => {
            let studentName = "";

            const maleStudents = students.filter(
              (s: any) => s.gender?.toLowerCase() === "male"
            );
            const femaleStudents = students.filter(
              (s: any) => s.gender?.toLowerCase() === "female"
            );

            // Row 25 = Male label
            if (rowIndex === 25) {
              studentName = "Male";
            }
            // Rows 0-24 = Male student names
            else if (rowIndex < 25) {
              const student = maleStudents[rowIndex];
              if (student) {
                studentName = `${student.last_name}, ${student.first_name} ${
                  student.middle_name || ""
                } ${student.suffix || ""}`;
              }
            }
            // Row 51 = Female label
            else if (rowIndex === 51) {
              studentName = "Female";
            }
            // Rows 26-50 = Female student names
            else if (rowIndex > 25 && rowIndex < 51) {
              const femaleIndex = rowIndex - 26;
              const student = femaleStudents[femaleIndex];
              if (student) {
                studentName = `${student.last_name}, ${student.first_name} ${
                  student.middle_name || ""
                } ${student.suffix || ""}`;
              }
            }

            return (
              <tr key={rowIndex}>
                {/* LEARNER'S NAME Column */}
                <td style={cellStyle}>{studentName}</td>

                {/* 31 Attendance Cells */}
                {Array.from({ length: 31 }).map((_, i) => (
                  <td key={i} style={dateCellStyle}></td>
                ))}

                {/* ABSENT and TARDY Cells */}
                <td style={cellStyle}></td>
                <td style={cellStyle}></td>

                {/* REMARKS Cell */}
                <td style={remarksStyle}></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ✅ Styles

const headerStyle: React.CSSProperties = {
  border: "1px solid #000",
  padding: "0px",
  textAlign: "center",
  verticalAlign: "middle",
  fontWeight: "bold",
};

const dateCellStyle: React.CSSProperties = {
  border: "1px solid #000",
  width: "15px",
  height: "10px",
  textAlign: "center",
  verticalAlign: "middle",
  fontSize: "10px",
  fontWeight: "bold",
};

const remarksStyle: React.CSSProperties = {
  border: "1px solid #000",
  padding: "4px",
  textAlign: "left",
  verticalAlign: "top",
  fontSize: "10px",
};

const cellStyle: React.CSSProperties = {
  border: "1px solid #000",
  padding: "4px",
  textAlign: "center",
  verticalAlign: "middle",
  fontSize: "12px",
};
