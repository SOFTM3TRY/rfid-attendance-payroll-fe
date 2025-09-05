import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
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
import ShowProfile from "@/components/admin/manage-teacher/ShowProfile/ShowProfile";
import EditProfile from "@/components/admin/manage-teacher/EditTeacher/EditTeacher";
import ShowAttendanceHistory from "@/components/admin/manage-teacher/ShowAttendanceHistory/ShowAttendanceHistory";
import Registration from "@/components/admin/manage-teacher/Registration/Registration";
import ShowTeacherClass from "@/components/admin/manage-teacher/ShowClass/ShowTeacherClass";
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

export type Teacher = {
  employee_number: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  suffix?: string;
  grade_id: number;
  section: number;
  status: "Active" | "Inactive";
};

export const columns: ColumnDef<Teacher>[] = [
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
  {
    accessorKey: "grade_id",
    header: () => (
      <Button variant="outline" size="sm">
        <GraduationCap className="text-green-500" /> Advisory Grade
      </Button>
    ),
    cell: ({ row }) => {
      const gradeMap: Record<number, string> = {
        1: "Grade One",
        2: "Grade Two",
        3: "Grade Three",
        4: "Grade Four",
        5: "Grade Five",
        6: "Grade Six",
      };
      return <span>{gradeMap[row.original.grade_id] || "N/A"}</span>;
    },
  },
  {
    accessorKey: "section",
    header: () => (
      <Button variant="outline" size="sm">
        <BookAudio className="text-violet-500" /> Advisory Section
      </Button>
    ),
    cell: ({ row }) => <span>{row.original.section || "N/A"}</span>,
  },
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
      const [openView, setOpenView] = useState(false);
      const [openEdit, setOpenEdit] = useState(false);
      const [openHistory, setOpenHistory] = useState(false);
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
              <DropdownMenuItem onClick={() => setOpenView(true)}>
                <Eye className="w-4 h-4 text-teal-700 dark:text-teal-500" />
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpenEdit(true)}>
                <SquarePen className="w-4 h-4 text-sky-700 dark:text-sky-500" />
                Edit Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpenHistory(true)}>
                <History className="w-4 h-4 text-indigo-700 dark:text-indigo-500" />
                Attendance History
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpenTeacherClass(true)}>
                <Rows4 className="w-4 h-4 text-violet-700 dark:text-violet-500" />
                Teacher Class
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpenRegister(true)}>
                <FilePlus className="w-4 h-4 text-blue-700 dark:text-blue-500" />
                Register
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ShowProfile open={openView} setOpen={setOpenView} row={row} />
          <EditProfile open={openEdit} setOpen={setOpenEdit} row={row} />
          <ShowAttendanceHistory open={openHistory} setOpen={setOpenHistory} row={row} />
          <ShowTeacherClass open={openTeacherClass} setOpen={setOpenTeacherClass} row={row} />
          <Registration open={openRegister} setOpen={setOpenRegister} row={row} />
        </div>
      );

      // return (
      //   <span className="text-xs w-auto h-6 flex items-center justify-start rounded-md font-normal">
      //     <Tooltip>
      //       <TooltipTrigger asChild>
      //         <Button
      //           variant="outline"
      //           size="sm"
      //           onClick={() => setOpenView(true)}
      //         >
      //           <Eye className="w-4 h-4 mr-1" />
      //         </Button>
      //       </TooltipTrigger>
      //       <TooltipContent
      //         side="top"
      //         align="center"
      //         className="block group-data-[collapsible=icon]:hidden"
      //       >
      //         View {`${row.original.first_name} ${row.original.last_name}`}
      //       </TooltipContent>
      //     </Tooltip>
      //     <ShowProfile open={openView} setOpen={setOpenView} row={row} />

      //     <Tooltip>
      //       <TooltipTrigger asChild>
      //         <Button
      //           variant="outline"
      //           size="sm"
      //           className="ml-2"
      //           onClick={() => setOpenEdit(true)}
      //         >
      //           <SquarePen className="w-4 h-4 mr-1" />
      //         </Button>
      //       </TooltipTrigger>
      //       <TooltipContent
      //         side="top"
      //         align="center"
      //         className="block group-data-[collapsible=icon]:hidden"
      //       >
      //         Edit {`${row.original.first_name} ${row.original.last_name}`}
      //       </TooltipContent>
      //     </Tooltip>
      //     <EditProfile open={openEdit} setOpen={setOpenEdit} row={row} />

      //     <Tooltip>
      //       <TooltipTrigger asChild>
      //         <Button
      //           variant="outline"
      //           size="sm"
      //           className="ml-2"
      //           onClick={() => setOpenHistory(true)}
      //         >
      //           <History className="w-4 h-4 mr-1" />
      //         </Button>
      //       </TooltipTrigger>
      //       <TooltipContent
      //         side="top"
      //         align="center"
      //         className="block group-data-[collapsible=icon]:hidden"
      //       >
      //         Attendance History of {`${row.original.first_name} ${row.original.last_name}`}
      //       </TooltipContent>
      //     </Tooltip>
      //     <ShowAttendanceHistory
      //       open={openHistory}
      //       setOpen={setOpenHistory}
      //       row={row}
      //     />

      //     <Tooltip>
      //       <TooltipTrigger asChild>
      //         <Button
      //           variant="outline"
      //           size="sm"
      //           className="ml-2"
      //           onClick={() => setOpenTeacherClass(true)}
      //         >
      //           <Rows4 className="w-4 h-4 mr-1" />
      //         </Button>
      //       </TooltipTrigger>
      //       <TooltipContent
      //         side="top"
      //         align="center"
      //         className="block group-data-[collapsible=icon]:hidden"
      //       >
      //         Class of {`${row.original.grade_id} ${row.original.section}`}
      //       </TooltipContent>
      //     </Tooltip>
      //     <ShowTeacherClass
      //       open={openTeacherClass}
      //       setOpen={setOpenTeacherClass}
      //       row={row}
      //     />

      //     <Tooltip>
      //       <TooltipTrigger asChild>
      //         <Button
      //           variant="outline"
      //           size="sm"
      //           className="ml-2"
      //           onClick={() => setOpenRegister(true)}
      //         >
      //           <FilePlus className="w-4 h-4 mr-1" />
      //         </Button>
      //       </TooltipTrigger>
      //       <TooltipContent
      //         side="top"
      //         align="center"
      //         className="block group-data-[collapsible=icon]:hidden"
      //       >
      //         Register {`${row.original.first_name} ${row.original.last_name}`}
      //       </TooltipContent>
      //     </Tooltip>
      //     <Registration
      //       open={openRegister}
      //       setOpen={setOpenRegister}
      //       row={row}
      //     />
      //   </span>
      // );
    },
  },
];
