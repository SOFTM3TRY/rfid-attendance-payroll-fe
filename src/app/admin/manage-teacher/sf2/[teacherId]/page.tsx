"use client";

import { useEffect, useState } from "react"; // <-- Added useState
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { useClientOnly } from "@/hooks/useClientOnly";
import { useTeacherDetails } from "@/hooks/useTeacher";
import { useParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

import SF2Table from "./table";

export default function SF2Page() {

  const { token } = useAuth();
  const isClient = useClientOnly();
  const params = useParams();

  const teacherId = params?.teacherId;

  if (!teacherId || typeof teacherId !== "string") {
    return;
  }

  const { data: teacherDetails } = useTeacherDetails(token, { id: teacherId });

  const teacher = teacherDetails?.data?.teacher?.[0] || null;
  const additional_info = teacher?.additional_info || {};
  const students = teacherDetails?.data?.students || [];

  const fullName = teacher
    ? `${teacher?.last_name}, ${teacher?.first_name} ${teacher?.middle_name || ""
    } ${teacher?.suffix || ""}`
    : "Unknown";

  // Fix: Add months and selectedMonth hook here
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const [selectedMonth, setSelectedMonth] = useState<number>(0);

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

  const handleDownload = async () => {
    const element = document.getElementById("pdf-content");
    if (!element) return;

    try {
      await new Promise((resolve) => setTimeout(resolve, 100));

      const canvas = await html2canvas(element, {
        backgroundColor: "#ffffff",
        scale: 2,
        useCORS: true,
        scrollY: -window.scrollY,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: "a4", // Use A4 landscape format for standardization
      });

      const pageWidth = pdf.internal.pageSize.getWidth();  // 842px (landscape A4)
      const pageHeight = pdf.internal.pageSize.getHeight(); // 595px

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      const imgRatio = canvasWidth / canvasHeight;
      const pdfRatio = pageWidth / pageHeight;

      // Resize image to fit the PDF width
      const pdfImgWidth = pageWidth;
      const pdfImgHeight = pageWidth / imgRatio;

      let position = 0;
      let pageCount = 0;

      while (position < canvasHeight) {
        const pageCanvas = document.createElement("canvas");
        const pageCtx = pageCanvas.getContext("2d");

        const sliceHeight = Math.min(canvasHeight - position, canvasHeight); // Avoid overflow
        pageCanvas.width = canvasWidth;
        pageCanvas.height = sliceHeight;

        if (pageCtx) {
          pageCtx.drawImage(
            canvas,
            0,
            position,
            canvasWidth,
            sliceHeight,
            0,
            0,
            canvasWidth,
            sliceHeight
          );

          const img = pageCanvas.toDataURL("image/png");
          const heightOnPage = (sliceHeight * pdfImgWidth) / canvasWidth;

          if (pageCount > 0) {
            pdf.addPage();
          }

          pdf.addImage(img, "PNG", 0, 0, pdfImgWidth, heightOnPage);
        }

        position += sliceHeight;
        pageCount++;
      }

      pdf.save("sf2-report.pdf");
    } catch (error) {
      console.error("PDF generation error:", error);
    }
  };


  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        color: "#000000",
        minHeight: "100vh",
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div className="flex items-center justify-center gap-5">
        <Button
          size="sm"
          className="bg-zinc-800 text-white hover:bg-zinc-700"
          style={{ marginBottom: "20px" }}
          onClick={handleDownload}
        >
          Download PDF
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="sm"
              className="bg-zinc-800 text-white hover:bg-zinc-700"
              style={{ marginBottom: "20px" }}
            >
              Select Month
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={5}>
            {months.map((month, index) => (
              <DropdownMenuCheckboxItem
                key={index}
                checked={selectedMonth === index}
                onCheckedChange={() => setSelectedMonth(index)}
              >
                {month}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div
        style={{
          width: "1123px",
          minHeight: "794px",
          backgroundColor: "#ffffff",
          color: "#000000",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          padding: "20px",
          fontFamily: "Arial, sans-serif",
          border: "1px solid #d1d5db",
          position: "relative",
        }}
        id="pdf-content"
      >
        <img
          src="/logo.png"
          alt="logo"
          style={{
            width: "100px",
            height: "100px",
            marginBottom: "20px",
            position: "absolute",
            top: "40px",
            left: "15px",
          }}
        />
        <div style={{ marginBottom: "20px" }}>
          <h1
            style={{
              fontSize: "18px",
              fontWeight: "700",
              marginBottom: "2px",
              marginTop: "20px",
              textAlign: "center",
            }}
          >
            School Form 2 (SF2) Daily Attendance Report of Learners
          </h1>
          <p
            style={{
              fontSize: "12px",
              marginBottom: "0px",
              textAlign: "center",
              fontStyle: "italic",
            }}
          >
            (This replaces Form 1, Form 2 & STS Form 4 - Absenteeism and Dropout
            Profile)
          </p>
        </div>
        <div
          style={{
            marginBottom: "40px",
            fontFamily: "Arial, sans-serif",
            fontSize: "14px",
            paddingInline: "60px",
          }}
        >
          {/* Row 1: School ID, School Year, Month */}
          <div style={{ display: "flex", gap: "20px", marginBottom: "10px" }}>
            <div style={{ flex: 1, marginLeft: "40px" }}>
              <label>School ID:</label>
              <input
                type="text"
                style={{
                  width: "50%",
                  padding: "1px",
                  border: "1px solid #000",
                  lineHeight: "2.5",
                }}
                readOnly
              />
            </div>
            <div
              style={{
                flex: 1,
                marginLeft: "-35px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <label>School Year:</label>
              <input
                type="text"
                style={{
                  width: "50%",
                  padding: "1px",
                  border: "1px solid #000",
                  lineHeight: "2.5",
                }}
                value={students?.length > 0 ? students[0].school_year : "N/A"}
                readOnly
              />
            </div>
            <div style={{ flex: 2 }}>
              <label>Report for the Month of:</label>
              <input
                type="text"
                style={{
                  width: "50%",
                  padding: "1px",
                  border: "1px solid #000",
                  lineHeight: "2.5",
                }}
                value={months[selectedMonth]}
                readOnly
              />
            </div>
          </div>

          {/* Row 3: Grade Level and Section */}
          <div style={{ display: "flex", gap: "20px" }}>
            <div style={{ flex: 6 }}>
              <label>Name of School:</label>
              <input
                type="text"
                style={{
                  width: "75%",
                  padding: "1px",
                  border: "1px solid #000",
                  lineHeight: "2.5",
                }}
                value={"Young Generation Academy"}
                readOnly
              />
            </div>

            <div style={{ flex: 3 }}>
              <label>Grade Level:</label>
              <input
                type="text"
                style={{
                  width: "60%",
                  padding: "1px",
                  border: "1px solid #000",
                  lineHeight: "2.5",
                }}
                value={
                  additional_info.grade === "1"
                    ? "Grade One"
                    : additional_info.grade === "2"
                      ? "Grade Two"
                      : additional_info.grade === "3"
                        ? "Grade Three"
                        : additional_info.grade === "4"
                          ? "Grade Four"
                          : additional_info.grade === "5"
                            ? "Grade Five"
                            : additional_info.grade === "6"
                              ? "Grade Six"
                              : additional_info.grade
                }
                readOnly
              />
            </div>
            <div style={{ flex: 3 }}>
              <label>Section:</label>
              <input
                type="text"
                style={{
                  width: "60%",
                  padding: "1px",
                  border: "1px solid #000",
                  lineHeight: "2.5",
                }}
                value={additional_info.section}
                readOnly
              />
            </div>
          </div>
        </div>

        <SF2Table />

        <div className="grid grid-cols-5 gap-5 mt-5">
          <div className="col-span-2 bg-red-500 h-96"></div>
          <div className="col-span-1 bg-blue-500 h-96"></div>
          <div className="col-span-2 bg-green-500 h-96"></div>
        </div>
      </div>
    </div>
  );
}
