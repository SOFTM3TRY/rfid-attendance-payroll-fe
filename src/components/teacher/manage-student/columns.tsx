"use client";

import { useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
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

export type Section = {
  LRN: string;
  FullName: string;
  grade_id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  suffix: string;
  section: number;
  status: "Active" | "Inactive";
};

export const columns: ColumnDef<Section>[] = [
  {
    accessorKey: "lrn",
    header: () => (
      <Button variant="outline" size="sm">
        <ShieldUser className="text-blue-500" /> LRN
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
    cell: ({ row }) => (
      <span>{`${row.original.last_name} ${row.original.first_name} ${
        row.original.middle_name || ""
      }  ${row.original.suffix || ""}`}</span>
    ),
  },
  {
    accessorKey: "grade_id",
    header: () => (
      <Button variant="outline" size="sm">
        <GraduationCap className="text-green-500" /> Grade
      </Button>
    ),
    cell: ({ row }) => {
      const gradeMap = {
        1: "Grade One",
        2: "Grade Two",
        3: "Grade Three",
        4: "Grade Four",
        5: "Grade Five",
        6: "Grade Six",
      };
      // @ts-ignore

      return <span>{gradeMap[row.original.grade_id]}</span>;
    },
  },
  {
    accessorKey: "section",
    header: () => (
      <Button variant="outline" size="sm">
        <BookAudio className="text-violet-500" /> Section
      </Button>
    ),
    cell: ({ row }) => (
      <span className="flex justify-center items-center w-22 h-6">
        {row.original.section}
      </span>
    ),
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

      return (
        <div className="flex justify-start items-center" style={{ pointerEvents: "auto" }}>
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Grip strokeWidth={3} className="w-12 h-12 text-teal-800 dark:text-teal-300" />
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
              <DropdownMenuItem onClick={() => setOpenRegister(true)}>
                <FilePlus className="w-4 h-4 text-blue-700 dark:text-blue-500" />
                Register
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ShowProfile open={openView} setOpen={setOpenView} row={row} />
          <EditProfile open={openEdit} setOpen={setOpenEdit} row={row} />
          <ShowAttendanceHistory open={openHistory} setOpen={setOpenHistory} row={row} />
          <Registration open={openRegister} setOpen={setOpenRegister} row={row} />
        </div>
      );

      // return (
      //   <span className="text-xs w-22 h-6 flex items-center justify-center rounded-md font-normal">
      //     <Tooltip>
      //       <TooltipTrigger asChild>
      //         <Button
      //           size="sm"
      //           onClick={() => setOpenView(true)}
      //           className="flex items-center justify-center mr-1 bg-teal-700 hover:bg-teal-600 dark:bg-teal-600 text-white dark:hover:bg-teal-700 "
      //         >
      //           <Eye className="w-4 h-4" />
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
      //           size="sm"
      //           onClick={() => setOpenEdit(true)}
      //           className="flex items-center justify-center mr-1 bg-sky-700 hover:bg-sky-600 dark:bg-sky-600 text-white dark:hover:bg-sky-700 "
      //         >
      //           <SquarePen className="w-4 h-4" />
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
      //           size="sm"
      //           onClick={() => setOpenHistory(true)}
      //           className="flex items-center justify-center mr-1 bg-indigo-700 hover:bg-indigo-600 dark:bg-indigo-600 text-white dark:hover:bg-indigo-700 "
      //         >
      //           <History className="w-4 h-4" />
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
      //           size="sm"
      //           onClick={() => setOpenRegister(true)}
      //           className="flex items-center justify-center bg-blue-700 hover:bg-blue-600 dark:bg-blue-600 text-white dark:hover:bg-blue-700 "
      //         >
      //           <FilePlus className="w-4 h-4" />
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

  //  return (
  //       <>
  //         <DropdownMenu>
  //           <DropdownMenuTrigger asChild>
  //             <Button variant="outline">⋯</Button>
  //           </DropdownMenuTrigger>
  //           <DropdownMenuContent>
  //             <DropdownMenuItem onClick={() => setOpenView(true)}>
  //               <Eye className="mr-2 w-4 h-4" />
  //               View Profile
  //             </DropdownMenuItem>
  //             <DropdownMenuItem onClick={() => setOpenEdit(true)}>
  //               <SquarePen className="mr-2 w-4 h-4" />
  //               Edit Profile
  //             </DropdownMenuItem>
  //             <DropdownMenuItem onClick={() => console.log("history")}>
  //               <History className="mr-2 w-4 h-4" />
  //               Attendance History
  //             </DropdownMenuItem>
  //             <DropdownMenuItem onClick={() => console.log("register")}>
  //               <FilePlus className="mr-2 w-4 h-4" />
  //               Register
  //             </DropdownMenuItem>
  //           </DropdownMenuContent>
  //         </DropdownMenu>
  //         <ShowProfile
  //           open={openView}
  //           setOpen={setOpenView}
  //           row={row}
  //         />
  //         <EditProfile open={openEdit} setOpen={setOpenEdit} row={row} />
  //       </>
  //     );
  // {
  //   accessorKey: "Actions",
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const [openView, setOpenView] = useState(false);
  //     const [openEdit, setOpenEdit] = useState(false);

  //     return (
  //       <>
  //         <DropdownMenu>
  //           <DropdownMenuTrigger asChild>
  //             <Button variant="outline">⋮</Button>
  //           </DropdownMenuTrigger>
  //           <DropdownMenuContent>
  //             <DropdownMenuItem onClick={() => setOpenView(true)}>
  //               <Eye className="mr-2 w-4 h-4" />
  //               View Profile
  //             </DropdownMenuItem>
  //             <DropdownMenuItem onClick={() => setOpenEdit(true)}>
  //               <SquarePen className="mr-2 w-4 h-4" />
  //               Edit Profile
  //             </DropdownMenuItem>
  //             <DropdownMenuItem>
  //               <TableProperties className="mr-2 w-4 h-4" />
  //               Attendance History
  //             </DropdownMenuItem>
  //           </DropdownMenuContent>
  //         </DropdownMenu>
  //         <ShowProfile open={openView} setOpen={setOpenView} row={row} />
  //         <EditProfile open={openEdit} setOpen={setOpenEdit} row={row} />
  //       </>
  //     );
  //   },
  // },
];
