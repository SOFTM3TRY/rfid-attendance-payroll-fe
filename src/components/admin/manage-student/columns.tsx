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
// import Registration from "@/components/admin/manage-student/Registration/Registration";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
export const columns = (props: {
  onEdit: (id: string) => void;
}): ColumnDef<Student>[] => [
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
      <div className="flex items-center gap-2">
        <Avatar className="size-8">
          <AvatarImage
            src="https://github.com/shadcn.png"
            className="ounded-lg hover:grayscale-100 transition-all duration-300"
            draggable={false}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-semibold">{`${row.original.last_name} ${
            row.original.first_name
          } ${row.original.middle_name || ""}  ${
            row.original.suffix || ""
          }`}</span>
          <span className="text-[10px]">{row.original.email || ""}</span>
        </div>
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
        <span className="text-xs w-22 h-5 flex items-center justify-center rounded-full font-normal bg-accent">
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
              <UserCheck className="size-3" />
            ) : (
              <UserX className="size-3" />
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
      const studentId = row.original.id;
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
                    <Grip strokeWidth={3} className="w-12 h-12 text-primary" />
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
                <Eye className="size-4 text-muted-foreground" />
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => props.onEdit(studentId.toString())}
              >
                <SquarePen className="size-4" /> Edit Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpenHistory(true)}>
                <History className="size-4 text-muted-foreground" />
                Attendance History
              </DropdownMenuItem>
              {/* <DropdownMenuItem onClick={() => setOpenRegister(true)}>
                <FilePlus className="w-4 h-4 text-blue-700" />
                Register
              </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
          <ShowAttendanceHistory
            open={openHistory}
            setOpen={setOpenHistory}
            row={row}
          />
          {/* <Registration
            open={openRegister}
            setOpen={setOpenRegister}
            studentId={Id}
          /> */}
        </div>
      );
    },
  },
];
