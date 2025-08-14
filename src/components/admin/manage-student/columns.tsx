"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  Grade: string;
  Section: number;
  status: "Active" | "Inactive";
};

export const columns: ColumnDef<Section>[] = [
  {
    accessorKey: "LRN",
    header: () => (
      <Button variant="ghost" size="sm">
        <ShieldUser className="text-blue-500"/> LRN
      </Button>
    ),
  },
  {
    accessorKey: "FullName",
    header: () => {
      return (
        <Button variant="ghost" size="sm">
          <User className="text-yellow-500"/> Full Name
        </Button>
      );
    },
  },
  {
    accessorKey: "Grade",
    header: () => (
      <Button variant="ghost" size="sm">
        <GraduationCap  className="text-green-500"/> Grade
      </Button>
    ),
  },
  {
    accessorKey: "Section",
    header: () => (
      <Button variant="ghost" size="sm">
        <BookAudio className="text-violet-500"/> Section
      </Button>
    ),
    cell: ({ row }) => <span className="flex justify-center items-center w-22 h-6">{row.original.Section}</span>,
  },
  {
    accessorKey: "status",
    header: () => (
      <Button variant="ghost" size="sm">
        <UserCog className="text-teal-500"/> Status
      </Button>
    ),
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <span className="text-xs w-22 h-6 flex items-center justify-center rounded-md font-normal bg-zinc-100 dark:bg-zinc-800">
          
          {status}

          <span
            className={`ml-1 ${
              status === "Active" ? "text-green-500" : "text-red-500"
            }`}
          >
            {status === "Active" ? <UserCheck className="w-4 h-4"/> : <UserX className="w-4 h-4"/>}
          </span>
        </span>
      );
    },
  },
  {
    accessorKey: "Actions",
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">⋮</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Eye />
            View Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SquarePen />
            Edit Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <TableProperties />
            Attendance History
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

