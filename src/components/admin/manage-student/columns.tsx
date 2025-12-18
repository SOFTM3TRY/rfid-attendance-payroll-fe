"use client";

import { useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ShowProfile from "@/components/admin/manage-student/ShowProfile/ShowProfile";
import EditProfile from "@/components/admin/manage-student/EditStudent/EditStudent";
import ShowAttendanceHistory from "@/components/admin/manage-student/ShowAttendanceHistory/ShowAttendanceHistory";
import Registration from "@/components/admin/manage-student/Registration/Registration";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Eye,
  SquarePen,
  TableProperties,
  User,
  ShieldUser,
  GraduationCap,
  BookAudio,
  UserCog,
  UserCheck,
  UserX,
  History,
  FilePlus,
  Pencil,
  Grip,
} from "lucide-react";

import { Student } from "@/types/Student";

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "lrn",
    header: () => (
      <Button variant="outline" size="sm" className="text-xs">
        <ShieldUser className="text-blue-500" /> LRN
      </Button>
    ),
  },
  {
    accessorKey: "FullName",
    header: () => (
      <Button variant="outline" size="sm" className="text-xs">
        <User className="text-yellow-500" /> Full Name
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-semibold">{`${row.original.last_name} ${
          row.original.first_name
        } ${row.original.middle_name || ""}  ${
          row.original.suffix || ""
        }`}</span>
        <span className="text-[10px]">{row.original.email || ""}</span>
      </div>
    ),
  },
  {
    accessorKey: "grade_id",
    header: () => (
      <Button variant="outline" size="sm" className="text-xs">
        <GraduationCap className="text-green-500" /> Grade
      </Button>
    ),
    cell: ({ row }) => <span>{row.original.grade?.grade_level || "N/A"}</span>,
  },
  {
    accessorKey: "section_id",
    header: () => (
      <Button variant="outline" size="sm" className="text-xs">
        <BookAudio className="text-violet-500" /> Section
      </Button>
    ),
    cell: ({ row }) => (
      <span className="flex justify-center items-center w-22 h-6">
        {row.original.section?.section_name || "N/A"}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: () => (
      <Button variant="outline" size="sm" className="text-xs">
        <UserCog className="text-teal-500" /> Status
      </Button>
    ),
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <span className="text-xs w-22 h-6 flex items-center justify-center rounded-md font-normal bg-zinc-100 dark:bg-zinc-800">
          {/* @ts-ignore */}
          {row.original.status == 1 ? "Active" : "Inactive"}
          <span
            className={`ml-1 ${
              // @ts-ignore
              row.original.status == 1 ? "text-green-500" : "text-red-500"
            }`}
          >
            {/* @ts-ignore */}
            {row.original.status == 1 ? (
              <UserCheck className="w-4 h-4" />
            ) : (
              <UserX className="w-4 h-4" />
            )}
          </span>
        </span>
      );
    },
  },
  {
    accessorKey: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const router = useRouter();
      const Id = row.original.id;
      const lrn = row.original.lrn;

      const [openEdit, setOpenEdit] = useState(false);
      const [openHistory, setOpenHistory] = useState(false);
      const [openRegister, setOpenRegister] = useState(false);

      return (
        <div>
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Grip
                      strokeWidth={3}
                      className="w-12 h-12 text-teal-800 dark:text-teal-300"
                    />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent side="top" align="center">
                Actions
              </TooltipContent>
            </Tooltip>

            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() =>
                  router.push(`/admin/manage-student/student-profile/${lrn}`)
                }
              >
                <Eye className="w-4 h-4 text-teal-700" />
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpenEdit(true)}>
                <SquarePen className="w-4 h-4 text-sky-700" />
                Edit Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpenHistory(true)}>
                <History className="w-4 h-4 text-indigo-700" />
                Attendance History
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpenRegister(true)}>
                <FilePlus className="w-4 h-4 text-blue-700" />
                Register
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <EditProfile open={openEdit} setOpen={setOpenEdit} row={row} />
          <ShowAttendanceHistory
            open={openHistory}
            setOpen={setOpenHistory}
            row={row}
          />
          <Registration
            open={openRegister}
            setOpen={setOpenRegister}
            studentId={Id}
          />
        </div>
      );
    },
  },
];
