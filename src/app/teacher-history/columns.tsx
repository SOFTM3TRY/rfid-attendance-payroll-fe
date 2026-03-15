"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  ShieldUser,
  ClipboardList,
  GraduationCap,
  BookAudio,
  CalendarDays,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface HistoryLogData {
  id: number;
  user_id: number;
  action: string;
  created_at: string;
  updated_at: string;
  data?: {
    data?: {
      id?: number;
      email?: string;
      first_name?: string;
      avatar?: string;
      middle_name?: string;
      last_name?: string;
      suffix?: string | null;
      employee_no?: string;
    };
    old_grade?: string;
    new_grade?: string;
    old_section?: number | string;
    new_section?: number | string;
  };
  grade?: {
    grade_level?: string;
  };
  section?: {
    section_name?: string;
  };
  gradeNew?: {
    grade_level?: string;
  };
  sectionNew?: {
    section_name?: string;
  };
}

export const columns: ColumnDef<HistoryLogData>[] = [
  {
    id: "employee_no",
    header: () => (
      <Button variant="outline" size="sm" className="text-sm">
        <ShieldUser className="text-blue-500" /> Employee No.
      </Button>
    ),
    cell: ({ row }) => {
      const employeeNo = row.original?.data?.data?.employee_no ?? "--";
      return <span className="text-primary">{employeeNo}</span>;
    },
  },

  {
    id: "full_name",
    header: () => (
      <Button variant="outline" size="sm" className="text-sm">
        <User className="text-yellow-500" /> Full Name
      </Button>
    ),
    cell: ({ row }) => {
      const fullName = `${row.original?.data?.data?.last_name} ${row.original?.data?.data?.first_name} ${row.original?.data?.data?.middle_name || ""} ${row.original?.data?.data?.suffix || ""}`.trim();

      return (
        <div className="flex items-center gap-2">
          <Avatar className="size-8">
            <AvatarImage
              src={
                row.original?.data?.data?.avatar
                  ? `https://rfid-api.barangay185bms.com/storage/avatars/${row.original?.data?.data?.avatar}`
                  : "https://github.com/shadcn.png"
              }
              className="rounded-lg hover:grayscale-100 transition-all duration-300"
              draggable={false}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <span className="font-semibold uppercase">{fullName}</span>
            <span className="text-xs text-primary">{row.original?.data?.data?.email || ""}</span>
          </div>
        </div>
      );
    },
  },

  {
    id: "old_grade",
    header: () => (
      <Button variant="outline" size="sm" className="text-sm">
        <GraduationCap className="text-red-500" /> Old Grade
      </Button>
    ),
    cell: ({ row }) => {
      const value = row.original?.gradeNew?.grade_level ?? "--";
      return <Badge variant="destructive">{value}</Badge>;
    },
  },

  {
    id: "new_grade",
    header: () => (
      <Button variant="outline" size="sm" className="text-sm">
        <GraduationCap className="text-green-500" /> New Grade
      </Button>
    ),
    cell: ({ row }) => {
      const value = row.original?.grade?.grade_level ?? "--";
      return <Badge>{value}</Badge>;
    },
  },

  {
    id: "old_section",
    header: () => (
      <Button variant="outline" size="sm" className="text-sm">
        <BookAudio className="text-red-500" /> Old Section
      </Button>
    ),
    cell: ({ row }) => {
      const value = row.original?.sectionNew?.section_name ?? "--";
      return <span>{value}</span>;
    },
  },

  {
    id: "new_section",
    header: () => (
      <Button variant="outline" size="sm" className="text-sm">
        <BookAudio className="text-green-500" /> New Section
      </Button>
    ),
    cell: ({ row }) => {
      const value = row.original?.section?.section_name ?? "--";
      return <span>{value}</span>;
    },
  },

  {
    accessorKey: "created_at",
    header: () => (
      <Button variant="outline" size="sm" className="text-sm">
        <CalendarDays className="text-violet-500" /> History Update
      </Button>
    ),
    cell: ({ row }) => {
      const createdAt = row.original.created_at;

      if (!createdAt) return <span>--</span>;

      return (
        <span>
          {new Date(createdAt).toLocaleString("en-PH", {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      );
    },
  },
];