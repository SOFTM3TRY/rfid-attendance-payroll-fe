"use client";

import { useState } from "react";
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
} from "lucide-react";

export type Section = {
  LRN: string;
  FullName: string;
  grade: string;
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
      <Button variant="ghost" size="sm">
        <ShieldUser className="text-blue-500" /> LRN
      </Button>
    ),
  },
  {
    accessorKey: "FullName",
    header: () => (
      <Button variant="ghost" size="sm">
        <User className="text-yellow-500" /> Full Name
      </Button>
    ),
    cell: ({ row }) => (
      <span>{`${row.original.last_name} ${row.original.first_name} ${row.original.middle_name || ""}  ${row.original.suffix || ""}`}</span>
    ),
  },
  {
    accessorKey: "grade",
    header: () => (
      <Button variant="ghost" size="sm">
        <GraduationCap className="text-green-500" /> Grade
      </Button>
    ),
  },
  {
    accessorKey: "section",
    header: () => (
      <Button variant="ghost" size="sm">
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
      <Button variant="ghost" size="sm">
        <UserCog className="text-teal-500" /> Status
      </Button>
    ),
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <span className="text-xs w-22 h-6 flex items-center justify-center rounded-md font-normal bg-zinc-100 dark:bg-zinc-800">
          {row.original.status == 1 ? "Active" : "Inactive"}
          <span
            className={`ml-1 ${
              row.original.status ==  1 ? "text-green-500" : "text-red-500"
            }`}
          >
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

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">⋮</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setOpenView(true)}>
                <Eye className="mr-2 w-4 h-4" />
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpenEdit(true)}>
                <SquarePen className="mr-2 w-4 h-4" />
                Edit Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <TableProperties className="mr-2 w-4 h-4" />
                Attendance History
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ShowProfile open={openView} setOpen={setOpenView} row={row} />
          <EditProfile open={openEdit} setOpen={setOpenEdit} row={row} />
        </>
      );
    },
  },
];