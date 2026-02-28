import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import {
  Eye,
  SquarePen,
  History,
  FilePlus,
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
import EditProfile from "@/app/manage-teacher/page/EditTeacher/EditTeacher";
import Registration from "@/app/manage-teacher/page/Registration/Registration";
import { useState } from "react";

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

export type Admin = {
  id: number;
  employee_number: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  suffix?: string;
  grade: number;
  section: string;
  status: "Active" | "Inactive";
};

export const columns: ColumnDef<Admin>[] = [
  {
    accessorKey: "employee_number",
    header: () => (
      <Button variant="outline" size="sm">
        <ShieldUser className="text-blue-500" /> Emloyee No.
      </Button>
    ),
  },
  {
    accessorKey: "FullName",
    header: () => (
      <Button variant="outline" size="sm">
        <User className="text-yellow-500" /> Full Name
      </Button>
    ),
    cell: ({ row }) => {
      const { last_name, first_name, middle_name, suffix } = row.original;
      return (
        <span>{`${last_name} ${first_name} ${middle_name || ""} ${
          suffix || ""
        }`}</span>
      );
    },
  },
  // {
  //   accessorKey: "grade",
  //   header: () => (
  //     <Button variant="outline" size="sm">
  //       <GraduationCap className="text-green-500" /> Advisory Grade
  //     </Button>
  //   ),
  //   cell: ({ row }) => {
  //     return <span>{row.original.grade || "N/A"}</span>;
  //   },
  // },
  // {
  //   accessorKey: "section",
  //   header: () => (
  //     <Button variant="outline" size="sm">
  //       <BookAudio className="text-violet-500" /> Advisory Section
  //     </Button>
  //   ),
  //   cell: ({ row }) => <span>{row.original.section || "N/A"}</span>,
  // },
  {
    accessorKey: "status",
    header: () => (
      <Button variant="outline" size="sm">
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
      const teacherId = row.original.id;

      const [openEdit, setOpenEdit] = useState(false);
      const [openRegister, setOpenRegister] = useState(false);
      const [openTeacherClass, setOpenTeacherClass] = useState(false);

      return (
        <div
          className="flex justify-start items-center"
          style={{ pointerEvents: "auto" }}
        >
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
              <TooltipContent
                side="top"
                align="center"
                className="block group-data-[collapsible=icon]:hidden"
              >
                Actions
              </TooltipContent>
            </Tooltip>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => window.open(`/admin/manage-teacher/teacher-profile/${teacherId}`, "_blank")}
              >
                <Eye className="w-4 h-4 text-teal-700 dark:text-teal-500" />
                View Profile
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => setOpenEdit(true)}>
                <SquarePen className="w-4 h-4 text-sky-700 dark:text-sky-500" />
                Edit Profile
              </DropdownMenuItem>

              {/* <DropdownMenuItem onClick={() => window.open(`/admin/manage-teacher/attendance-history/${teacherId}`, "_blank")}>
                <History className="w-4 h-4 text-indigo-700 dark:text-indigo-500" />
                Attendance History
              </DropdownMenuItem> */}

              {/* <DropdownMenuItem onClick={() => window.open(`/admin/manage-teacher/advisory-class/${teacherId}`, "_blank")}>
                <Rows4 className="w-4 h-4 text-violet-700 dark:text-violet-500" />
                Advisory Class
              </DropdownMenuItem> */}

              {/* <DropdownMenuItem onClick={() => setOpenRegister(true)}>
                <FilePlus className="w-4 h-4 text-blue-700 dark:text-blue-500" />
                Register
              </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
          {/* <EditProfile open={openEdit} setOpen={setOpenEdit} row={row} />
          <Registration
            open={openRegister}
            setOpen={setOpenRegister}
            row={row}
          /> */}
        </div>
      );
    },
  },
];
