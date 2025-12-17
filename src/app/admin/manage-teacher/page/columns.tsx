import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Eye,
  SquarePen,
  ShieldUser,
  User,
  GraduationCap,
  BookAudio,
  UserCog,
  UserCheck,
  UserX,
  Rows4,
  Grip,
} from "lucide-react";

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

import { TeacherData } from "@/types/Teacher";

export const columns = (props: {
  onEdit: (id: string) => void;
}): ColumnDef<TeacherData>[] => [
  // Employee No
  {
    accessorKey: "employee_no",
    header: () => (
      <Button variant="outline" size="sm">
        <ShieldUser className="text-blue-500" /> Employee No.
      </Button>
    ),
  },

  // Full Name
  {
    id: "full_name",
    header: () => (
      <Button variant="outline" size="sm">
        <User className="text-yellow-500" /> Full Name
      </Button>
    ),
    cell: ({ row }) => {
      const { last_name, first_name, middle_name, suffix } = row.original;
      return (
        <span>
          {`${last_name} ${first_name} ${middle_name ?? ""} ${suffix ?? ""}`}
        </span>
      );
    },
  },

  // Advisory Grade
  {
    id: "grade",
    header: () => (
      <Button variant="outline" size="sm">
        <GraduationCap className="text-green-500" /> Advisory Grade
      </Button>
    ),
    accessorFn: (row) => row.grade?.grade_level ?? "N/A",
    cell: ({ getValue }) => <span>{getValue<string>()}</span>,
  },

  // Advisory Section
  {
    id: "section",
    header: () => (
      <Button variant="outline" size="sm">
        <BookAudio className="text-violet-500" /> Advisory Section
      </Button>
    ),
    accessorFn: (row) => row.section?.section_name ?? "N/A",
    cell: ({ getValue }) => <span>{getValue<string>()}</span>,
  },

  // Status
  {
    accessorKey: "status",
    header: () => (
      <Button variant="outline" size="sm">
        <UserCog className="text-teal-500" /> Status
      </Button>
    ),
    cell: ({ row }) => {
      const isActive = row.original.status === "1";

      return (
        <span className="text-xs w-22 px-3 py-1 rounded-md flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800">
          {isActive ? "Active" : "Inactive"}
          {isActive ? (
            <UserCheck className="size-4 text-green-500" />
          ) : (
            <UserX className="size-4 text-red-500" />
          )}
        </span>
      );
    },
  },

  // Actions
  {
    id: "actions",
    header: () => <span className="font-normal text-xs">Actions</span>,
    cell: ({ row }) => {
      const router = useRouter();
      const teacherId = row.original.id;

      return (
        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Grip className="size-4 text-teal-700" />
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>Actions</TooltipContent>
          </Tooltip>

          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() =>
                router.push(
                  `/admin/manage-teacher/teacher-profile/${teacherId}`
                )
              }
            >
              <Eye className="size-4 " />
              View Profile
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => props.onEdit(teacherId.toString())}
            >
              <SquarePen className="size-4" /> Edit Profile
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() =>
                router.push(`/admin/manage-teacher/advisory-class/${teacherId}`)
              }
            >
              <Rows4 className="size-4 " />
              Advisory Class
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
