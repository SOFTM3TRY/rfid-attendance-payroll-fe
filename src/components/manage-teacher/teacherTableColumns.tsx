"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  BookAudio,
  BookPlus,
  Eye,
  GraduationCap,
  Grip,
  Pencil,
  Rows4,
  ShieldUser,
  SquarePen,
  User,
} from "lucide-react";
import type { TeacherData } from "@/types/Teacher";

type TeacherTableColumnActions = {
  onEdit: (id: string) => void;
  onViewProfile: (id: string) => void;
  onAdvisory: (id: string) => void;
  onChangePassword: (id: string, name?: string) => void;
  onAddSubject: (id: string, name?: string) => void;
};

function getAvatarFallback(teacher: TeacherData) {
  return (
    `${teacher.first_name?.[0] ?? ""}${teacher.last_name?.[0] ?? ""}`.toUpperCase() ||
    "NA"
  );
}

function getTeacherAvatarUrl(teacher: TeacherData) {
  return teacher.avatar
    ? `https://rfid-api.barangay185bms.com/storage/avatars/${teacher.avatar}`
    : "https://github.com/shadcn.png";
}

export function createTeacherTableColumns({
  onEdit,
  onViewProfile,
  onAdvisory,
  onChangePassword,
  onAddSubject,
}: TeacherTableColumnActions): ColumnDef<TeacherData>[] {
  return [
    {
      accessorKey: "employee_no",
      header: () => (
        <Button variant="outline" size="sm" className="text-sm">
          <ShieldUser className="text-blue-500" /> Employee No.
        </Button>
      ),
      cell: ({ row }) => (
        <span className="text-primary">{row.original.employee_no}</span>
      ),
    },
    {
      id: "full_name",
      header: () => (
        <Button variant="outline" size="sm" className="text-sm">
          <User className="text-yellow-500" /> Full Name
        </Button>
      ),
      cell: ({ row }) => {
        const teacher = row.original;
        const fullName =
          `${teacher.last_name} ${teacher.first_name} ${teacher.middle_name || ""} ${
            teacher.suffix || ""
          }`.trim();

        return (
          <div className="flex items-center gap-2">
            <Avatar className="size-8">
              <AvatarImage
                src={getTeacherAvatarUrl(teacher)}
                className="rounded-lg hover:grayscale-100 transition-all duration-300"
                draggable={false}
              />
              <AvatarFallback>{getAvatarFallback(teacher)}</AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <span className="font-semibold uppercase">{fullName}</span>
              <span className="text-xs text-primary">{teacher.email}</span>
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
        <span className="text-sm font-normal text-muted-foreground">Actions</span>
      ),
      cell: ({ row }) => {
        const teacher = row.original;
        const teacherId = String(teacher.id);
        const teacherName =
          `${teacher.first_name || ""} ${teacher.last_name || ""}`.trim();

        return (
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Grip strokeWidth={3} className="h-5 w-5 text-primary" />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent side="top" align="center">
                Actions
              </TooltipContent>
            </Tooltip>

            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => onViewProfile(teacherId)}>
                <Eye className="size-4 text-muted-foreground" />
                View Profile
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => onEdit(teacherId)}>
                <SquarePen className="size-4" />
                Edit Profile
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => onChangePassword(teacherId, teacherName)}
              >
                <Pencil className="size-4 text-muted-foreground" />
                Change Password
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => onAddSubject(teacherId, teacherName)}
              >
                <BookPlus className="size-4 text-muted-foreground" />
                Add Subject
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => onAdvisory(teacherId)}>
                <Rows4 className="size-4 text-muted-foreground" />
                Advisory Class
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
