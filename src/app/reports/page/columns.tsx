"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  User,
  GraduationCap,
  BookAudio,
  Download,
} from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { TeacherData } from "@/types/Teacher";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DownloadAttendanceReportPdfModal from "@/components/DownloadAttendanceReportPdfModal";

export const columns = (props: {
  token: string;
}): ColumnDef<TeacherData>[] => [
  {
    id: "full_name",
    header: () => (
      <Button variant="outline" size="sm" className="text-sm">
        <User className="text-yellow-500" /> Adviser
      </Button>
    ),
    cell: ({ row }) => {
      const teacher = row.original;

      const fullName =
        `${teacher.last_name} ${teacher.first_name} ${teacher.middle_name || ""} ${teacher.suffix || ""}`.trim();

      return (
        <div className="flex items-center gap-2">
          <Avatar className="size-8">
            <AvatarImage
              src={
                teacher.avatar
                  ? `https://rfid-api.barangay185bms.com/storage/avatars/${teacher.avatar}`
                  : "https://github.com/shadcn.png"
              }
              className="rounded-lg hover:grayscale-100 transition-all duration-300"
              draggable={false}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <span className="text-xs text-accent-foreground">
              {teacher.employee_no || ""}
            </span>
            <span className="font-semibold uppercase">{fullName}</span>
            <span className="text-xs text-primary">
              {teacher.email || ""}
            </span>
          </div>
        </div>
      );
    },
  },

  {
    id: "grade",
    header: () => (
      <Button variant="outline" size="sm" className="text-sm">
        <GraduationCap className="text-green-500" /> Advisory Grade
      </Button>
    ),
    accessorFn: (row) => row.grade?.grade_level ?? "N/A",
    cell: ({ getValue }) => <span>{getValue<string>()}</span>,
  },

  {
    id: "section",
    header: () => (
      <Button variant="outline" size="sm" className="text-sm">
        <BookAudio className="text-violet-500" /> Advisory Section
      </Button>
    ),
    accessorFn: (row) => row.section?.section_name ?? "N/A",
    cell: ({ getValue }) => <span>{getValue<string>()}</span>,
  },

  {
    id: "actions",
    header: () => (
      <span className="font-normal text-sm text-muted-foreground">Actions</span>
    ),
    cell: ({ row }) => {
      const teacher = row.original;

      const fullName =
        `${teacher?.last_name || ""}, ${teacher?.first_name || ""} ${teacher?.middle_name || ""} ${teacher?.suffix || ""}`.trim();

      const sectionId = teacher?.section?.id
        ? String(teacher.section.id)
        : "";

      const gradeLabel = teacher?.grade?.grade_level || "N/A";
      const sectionLabel = teacher?.section?.section_name || "N/A";

      if (!props.token || !sectionId) {
        return <span className="text-muted-foreground text-sm">No section assigned</span>;
      }

      return (
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <DownloadAttendanceReportPdfModal
                  token={props.token}
                  sectionId={sectionId}
                  gradeLabel={gradeLabel}
                  sectionLabel={sectionLabel}
                  teacherName={fullName}
                  schoolName="Young Generation Academy"
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Download Attendance Report</p>
            </TooltipContent>
          </Tooltip>
        </div>
      );
    },
  },
];