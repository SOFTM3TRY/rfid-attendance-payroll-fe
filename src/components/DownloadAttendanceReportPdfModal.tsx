"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Download } from "lucide-react";
import { useDownloadAttendanceReportPdf } from "@/hooks/useAttendance";

import { GetAttendanceBySection } from "@/services/Attendance";

export default function DownloadAttendancePdfModal(props: {
  token: string;
  sectionId: string; // ✅ numeric ID
  gradeLabel: string;
  sectionLabel: string;
  teacherName: string;
  schoolName: string;
}) {
  const { token, sectionId, gradeLabel, sectionLabel, teacherName, schoolName } =
    props;

  const [open, setOpen] = React.useState(false);
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");

  const [previewData, setPreviewData] = React.useState<any[]>([]);

  const download = useDownloadAttendanceReportPdf();

  const canDownload =
    !!startDate && !!endDate && startDate <= endDate && !download.isPending;

  // ✅ Preview JSON first
  const handlePreview = async () => {
    const res = await GetAttendanceBySection(
      token,
      sectionId,
      startDate,
      endDate
    );

    console.log("PREVIEW RESPONSE:", res);
    setPreviewData(res.data || []);
  };

  // ✅ Download PDF
  const handleDownload = async () => {
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
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Download PDF Report
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Download Attendance Report</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
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

          {/* ✅ Preview Button */}
          {/* <Button
            variant="secondary"
            onClick={handlePreview}
            disabled={!canDownload}
          >
            Preview JSON
          </Button> */}

          {/* ✅ JSON Preview */}
          {/* {previewData.length > 0 && (
            <pre className="bg-black text-green-300 text-xs p-3 rounded-md max-h-40 overflow-auto">
              {JSON.stringify(previewData, null, 2)}
            </pre>
          )} */}

          {/* Download Buttons */}
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>

            <Button onClick={handleDownload} disabled={!canDownload}>
              {download.isPending ? "Generating..." : "Download PDF"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
