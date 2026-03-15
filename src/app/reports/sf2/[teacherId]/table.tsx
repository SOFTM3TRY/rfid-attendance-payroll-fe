"use client";

import { useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useClientOnly } from "@/hooks/useClientOnly";
import { useTeacherDetails } from "@/hooks/useTeacher";
import { useParams } from "next/navigation";

export default function SF2Table() {
  const { token } = useAuth();
  const isClient = useClientOnly();
  const params = useParams();

  const teacherId = params?.teacherId;
  if (!teacherId || typeof teacherId !== "string") return null;

  const { data: teacherDetails } = useTeacherDetails(token, { id: teacherId });

  const students = teacherDetails?.data?.students || [];

  const maleStudents = students.filter(
    (s: any) => s.gender?.toLowerCase() === "male"
  );
  const femaleStudents = students.filter(
    (s: any) => s.gender?.toLowerCase() === "female"
  );

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

  return (
    <>
      <PageTable gender="Male" students={maleStudents} />
      <div style={{ pageBreakAfter: "always" }}></div>
      <PageTable gender="Female" students={femaleStudents} />
    </>
  );
}

function PageTable({
  gender,
  students,
}: {
  gender: string;
  students: any[];
}) {
  const weekdays = ["M", "T", "W", "TH", "F"];

  return (
    <div style={{ width: "100%", pageBreakInside: "avoid" }}>
      <table
        style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}
      >
        <thead>
          <tr>
            <th rowSpan={2} style={headerStyle}>
              LEARNER'S NAME (Last Name, First Name, Middle Name)
            </th>

            {[...Array(31)].map((_, index) => (
              <th key={index} style={dateCellStyle}></th>
            ))}

            <th colSpan={2} style={headerStyle}>
              Total for the Month
            </th>

            <th rowSpan={2} style={remarksStyle}>
              REMARKS
            </th>
          </tr>

          <tr>
            {[...Array(31)].map((_, index) => (
              <th key={index} style={dateCellStyle}>
                {weekdays[index % weekdays.length]}
              </th>
            ))}
            <th style={headerStyle}>ABSENT</th>
            <th style={headerStyle}>TARDY</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student, idx) => (
            <tr key={idx}>
              <td style={cellStyle}>
                {student.last_name}, {student.first_name}{" "}
                {student.middle_name || ""} {student.suffix || ""}
              </td>
              {[...Array(31)].map((_, i) => (
                <td key={i} style={dateCellStyle}></td>
              ))}
              <td style={cellStyle}></td>
              <td style={cellStyle}></td>
              <td style={remarksStyle}></td>
            </tr>
          ))}

          {/* TOTAL Row */}
          <tr>
            <td style={{ ...cellStyle, fontWeight: "bold" }}>
              {gender.toUpperCase()} / TOTAL Per Day
            </td>
            {[...Array(31)].map((_, i) => (
              <td key={i} style={dateCellStyle}></td>
            ))}
            <td style={cellStyle}></td>
            <td style={cellStyle}></td>
            <td style={remarksStyle}></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// Styles
const headerStyle: React.CSSProperties = {
  border: "0.5px solid #000",
  padding: "0px",
  textAlign: "center",
  verticalAlign: "middle",
  fontWeight: "bold",
};

const dateCellStyle: React.CSSProperties = {
  border: "0.5px solid #000",
  width: "15px",
  height: "10px",
  textAlign: "center",
  verticalAlign: "middle",
  fontSize: "10px",
  fontWeight: "bold",
};

const remarksStyle: React.CSSProperties = {
  border: "0.5px solid #000",
  padding: "4px",
  textAlign: "left",
  verticalAlign: "top",
  fontSize: "10px",
};

const cellStyle: React.CSSProperties = {
  border: "0.5px solid #000",
  padding: "4px",
  textAlign: "center",
  verticalAlign: "middle",
  fontSize: "12px",
};
