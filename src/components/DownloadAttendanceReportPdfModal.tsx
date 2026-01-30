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

export default function DownloadAttendancePdfModal(props: {
  token: string;
  sectionApiParam: string; // ito yung ipapasa mo sa API route param
  gradeLabel: string;
  sectionLabel: string;
  teacherName: string;
  schoolName: string;
}) {
  const { token, sectionApiParam, gradeLabel, sectionLabel, teacherName, schoolName } = props;

  const [open, setOpen] = React.useState(false);
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");

  const download = useDownloadAttendanceReportPdf();

  const canDownload =
    !!startDate && !!endDate && startDate <= endDate && !download.isPending;

  const handleDownload = async () => {
    if (!canDownload) return;

    await download.mutateAsync({
      token,
      section: sectionApiParam,
      gradeLabel,
      sectionLabel,
      teacherName,
      schoolName,
      subtitle: "Example on student view",
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

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Download Attendance Report</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Start Date</Label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>End Date</Label>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
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
