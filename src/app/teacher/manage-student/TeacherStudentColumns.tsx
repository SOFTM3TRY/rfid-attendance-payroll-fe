"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import ShowAttendanceHistory from "@/components/admin/manage-student/ShowAttendanceHistory/ShowAttendanceHistory";

import {
  BadgeInfo,
  User,
  Calendar,
  CircleSmall,
  UserCog,
  UserCheck,
  UserX,
  History,
  Eye,
  Grip,
  TableProperties,
} from "lucide-react";

// ✅ match your API fields (add avatar/email/status if present)
export type Student = {
  id: number;
  lrn: string;
  first_name: string;
  middle_name?: string | null;
  last_name: string;
  suffix?: string | null;
  gender: string;
  birth_date: string;
  status?: number | string;
  email?: string | null;
  avatar?: string | null;
};

export const teacherStudentColumns = (): ColumnDef<Student>[] => [
  {
    accessorKey: "lrn",
    header: () => (
      <Button variant="outline" size="sm" className="text-xs font-normal">
        <BadgeInfo className="text-blue-500 size-4 mr-1" />
        LRN
      </Button>
    ),
    cell: ({ row }) => (
      <span className="text-primary text-xs font-medium">{row.original.lrn}</span>
    ),
  },

  {
    accessorKey: "FullName",
    header: () => (
      <Button variant="outline" size="sm" className="text-xs font-normal">
        <User className="text-green-500 size-4 mr-1" />
        Full Name
      </Button>
    ),
    cell: ({ row }) => {
      const s = row.original;
      const fullName = `${s.last_name}, ${s.first_name} ${s.middle_name || ""} ${
        s.suffix || ""
      }`
        .replace(/\s+/g, " ")
        .trim();

      const avatarUrl = s.avatar
        ? `https://rfid-api.barangay185bms.com/storage/avatars/${s.avatar}`
        : "https://github.com/shadcn.png";

      const initials =
        `${s.first_name?.[0] ?? ""}${s.last_name?.[0] ?? ""}`.toUpperCase() || "CN";

      return (
        <div className="flex items-center gap-2">
          <Avatar className="size-8">
            <AvatarImage
              src={avatarUrl}
              className="rounded-lg hover:grayscale-100 transition-all duration-300"
              draggable={false}
            />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <span className="font-semibold text-xs uppercase">{fullName}</span>
            <span className="text-[10px] text-primary">{s.email || ""}</span>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "gender",
    header: () => (
      <Button variant="outline" size="sm" className="text-xs font-normal">
        <CircleSmall className="text-green-500 size-4 mr-1" />
        Gender
      </Button>
    ),
    cell: ({ row }) => (
      <span className="text-xs">{row.original.gender || "N/A"}</span>
    ),
  },

  {
    accessorKey: "birth_date",
    header: () => (
      <Button variant="outline" size="sm" className="text-xs font-normal">
        <Calendar className="text-orange-500 size-4 mr-1" />
        Birth Date
      </Button>
    ),
    cell: ({ row }) => (
      <span className="text-xs">{row.original.birth_date || "N/A"}</span>
    ),
  },

  {
    accessorKey: "status",
    header: () => (
      <Button variant="outline" size="sm" className="text-xs font-normal">
        <UserCog className="text-teal-500 size-4 mr-1" />
        Status
      </Button>
    ),
    cell: ({ row }) => {
      const isActive = String(row.original.status ?? "1") === "1";

      return (
        <span className="text-xs w-22 h-5 flex items-center justify-center rounded-full font-normal bg-accent">
          {isActive ? "Active" : "Inactive"}
          <span className={`ml-1 ${isActive ? "text-green-500" : "text-red-500"}`}>
            {isActive ? <UserCheck className="size-3" /> : <UserX className="size-3" />}
          </span>
        </span>
      );
    },
  },

  {
    accessorKey: "Actions",
    id: "actions",
    header: () => (
      <Button variant="outline" size="sm" className="text-xs font-normal">
        <TableProperties className="text-slate-600 size-4 mr-1" />
        Actions
      </Button>
    ),
    cell: ({ row }) => {
      const router = useRouter();
      const [openHistory, setOpenHistory] = useState(false);

      const studentId = row.original.id;
      const lrn = row.original.lrn;

      return (
        <div style={{ pointerEvents: "auto" }}>
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Grip strokeWidth={3} className="w-12 h-12 text-primary" />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent side="top" align="center">
                Actions
              </TooltipContent>
            </Tooltip>

            <DropdownMenuContent>
              {/* ✅ Only Profile + History */}
              <DropdownMenuItem
                onClick={() => router.push(`/teacher/manage-student/student-profile/${lrn}`)}
              >
                <Eye className="size-4 text-muted-foreground" />
                Student Profile
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => setOpenHistory(true)}>
                <History className="size-4 text-muted-foreground" />
                Attendance History
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ShowAttendanceHistory
            open={openHistory}
            setOpen={setOpenHistory}
            row={row}
          />
        </div>
      );
    },
  },
];
