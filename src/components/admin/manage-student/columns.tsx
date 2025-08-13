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
        <ShieldUser /> LRN
      </Button>
    ),
  },
  {
    accessorKey: "FullName",
    header: () => {
      return (
        <Button variant="ghost" size="sm">
          <User /> Full Name
        </Button>
      );
    },
  },
  {
    accessorKey: "Grade",
    header: () => (
      <Button variant="ghost" size="sm">
        <GraduationCap /> Grade
      </Button>
    ),
  },
  {
    accessorKey: "Section",
    header: () => (
      <Button variant="ghost" size="sm">
        <BookAudio /> Section
      </Button>
    ),
  },
  {
    accessorKey: "status",
    header: () => (
      <Button variant="ghost" size="sm">
        <UserCog /> Status
      </Button>
    ),
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <span
          className={`text-xs w-20 h-6 flex items-center justify-center rounded-full ${
            status === "Active"
              ? "bg-green-200 text-green-900"
              : "bg-red-200 text-red-900"
          } `}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full mr-1 ${
              status === "Active" ? "bg-green-900" : "bg-red-900"
            }`}
          />

          {status}
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
