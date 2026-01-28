"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

import {
  Eye,
  SquarePen,
  ShieldUser,
  User,
  GraduationCap,
  BookAudio,
  Rows4,
  Pencil,
  Grip,
  BookPlus, // ✅ ADD ICON
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import { TeacherData } from "@/types/Teacher";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const columns = (props: {
  onEdit: (id: string) => void;
  onViewProfile: (id: string) => void;
  onAdvisory: (id: string) => void;
  onChangePassword: (id: string, name?: string) => void;

  // ✅ ADD THIS
  onAddSubject: (id: string, name?: string) => void;
}): ColumnDef<TeacherData>[] => [
  {
    accessorKey: "employee_no",
    header: () => (
      <Button variant="outline" size="sm" className="text-xs">
        <ShieldUser className="text-blue-500" /> Employee No.
      </Button>
    ),
    cell: ({ row }) => <span className="text-primary">{row.original.employee_no}</span>,
  },

  {
    id: "full_name",
    header: () => (
      <Button variant="outline" size="sm" className="text-xs">
        <User className="text-yellow-500" /> Full Name
      </Button>
    ),
    cell: ({ row }) => {
      const fullName = `${row.original.last_name} ${row.original.first_name} ${row.original.middle_name || ""} ${row.original.suffix || ""}`.trim();

      return (
        <div className="flex items-center gap-2">
          <Avatar className="size-8">
            <AvatarImage
              src={
                row.original.avatar
                  ? `https://rfid-api.barangay185bms.com/storage/avatars/${row.original.avatar}`
                  : "https://github.com/shadcn.png"
              }
              className="rounded-lg hover:grayscale-100 transition-all duration-300"
              draggable={false}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <span className="font-semibold uppercase">{fullName}</span>
            <span className="text-[10px] text-primary">{row.original.email || ""}</span>
          </div>
        </div>
      );
    },
  },

  {
    id: "grade",
    header: () => (
      <Button variant="outline" size="sm" className="text-xs">
        <GraduationCap className="text-green-500" /> Advisory Grade
      </Button>
    ),
    accessorFn: (row) => row.grade?.grade_level ?? "N/A",
    cell: ({ getValue }) => <span>{getValue<string>()}</span>,
  },

  {
    id: "section",
    header: () => (
      <Button variant="outline" size="sm" className="text-xs">
        <BookAudio className="text-violet-500" /> Advisory Section
      </Button>
    ),
    accessorFn: (row) => row.section?.section_name ?? "N/A",
    cell: ({ getValue }) => <span>{getValue<string>()}</span>,
  },

  {
    id: "actions",
    header: () => <span className="font-normal text-xs text-muted-foreground">Actions</span>,
    cell: ({ row }) => {
      const teacherId = row.original.id.toString();
      const teacherName = `${row.original.first_name || ""} ${row.original.last_name || ""}`.trim();

      return (
        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Grip strokeWidth={3} className="w-5 h-5 text-primary" />
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent side="top" align="center">
              Actions
            </TooltipContent>
          </Tooltip>

          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => props.onViewProfile(teacherId)}>
              <Eye className="size-4 text-muted-foreground" />
              View Profile
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => props.onEdit(teacherId)}>
              <SquarePen className="size-4" />
              Edit Profile
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => props.onChangePassword(teacherId, teacherName)}>
              <Pencil className="size-4 text-muted-foreground" />
              Change Password
            </DropdownMenuItem>

            {/* ✅ NEW */}
            <DropdownMenuItem onClick={() => props.onAddSubject(teacherId, teacherName)}>
              <BookPlus className="size-4 text-muted-foreground" />
              Add Subject
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => props.onAdvisory(teacherId)}>
              <Rows4 className="size-4 text-muted-foreground" />
              Advisory Class
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
