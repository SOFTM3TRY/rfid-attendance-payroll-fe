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
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Grip,
  Pencil,
  User,
  UserCheck,
  UserX,
  UserCog,
} from "lucide-react";

export type Admin = {
  id: string;
  avatar?: string;
  email?: string;
  employee_number?: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  suffix?: string;
  status: string; // "1" | "0"
  role?: string;
  contact_no?: string;
  created_at?: string;
};

export const columns = ({
  onChangePassword,
}: {
  onChangePassword: (id: string, name?: string) => void;
}): ColumnDef<Admin>[] => [
  {
    accessorKey: "full_name",
    header: () => (
      <Button variant="outline" size="sm">
        <User className="text-yellow-500" /> Admin
      </Button>
    ),
    cell: ({ row }) => {
      const fullName =
        `${row.original.last_name} ${row.original.first_name} ${row.original.middle_name || ""} ${row.original.suffix || ""}`.trim();

      return (
        <div className="flex items-center gap-2">
          <Avatar className="size-8">
            <AvatarImage
              src={
                row.original.avatar
                  ? `https://rfid-api.barangay185bms.com/storage/avatars/${row.original.avatar}`
                  : "https://github.com/shadcn.png"
              }
              className="rounded-full hover:grayscale-100 transition-all duration-300"
            />
            <AvatarFallback>
              {row.original.first_name?.[0] ?? "A"}
              {row.original.last_name?.[0] ?? "D"}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <span className="font-semibold uppercase">{fullName}</span>
            <span className="text-xs text-primary">
              {row.original.email || "No email"}
            </span>
          </div>
        </div>
      );
    },
  },
  // {
  //   accessorKey: "employee_number",
  //   header: () => (
  //     <Button variant="outline" size="sm">
  //       Employee No.
  //     </Button>
  //   ),
  //   cell: ({ row }) => <span>{row.original.employee_number || "N/A"}</span>,
  // },
  // {
  //   accessorKey: "role",
  //   header: () => (
  //     <Button variant="outline" size="sm">
  //       Role
  //     </Button>
  //   ),
  //   cell: ({ row }) => <span>{row.original.role || "N/A"}</span>,
  // },
  // {
  //   accessorKey: "status",
  //   header: () => (
  //     <Button variant="outline" size="sm">
  //       <UserCog className="text-teal-500" /> Status
  //     </Button>
  //   ),
  //   cell: ({ row }) => {
  //     const isActive = String(row.original.status) === "1";

  //     return (
  //       <span className="text-xs w-24 h-6 flex items-center justify-center rounded-md font-normal bg-zinc-100 dark:bg-zinc-800">
  //         {isActive ? "Active" : "Inactive"}
  //         <span className={`ml-1 ${isActive ? "text-green-500" : "text-red-500"}`}>
  //           {isActive ? (
  //             <UserCheck className="w-4 h-4" />
  //           ) : (
  //             <UserX className="w-4 h-4" />
  //           )}
  //         </span>
  //       </span>
  //     );
  //   },
  // },
  {
    id: "actions",
    header: () => <span className="text-muted-foreground">Actions</span>,
    cell: ({ row }) => {
      const adminId = row.original.id;
      const adminName =
        `${row.original.first_name || ""} ${row.original.last_name || ""}`.trim();

      return (
        <div className="flex justify-start items-center" style={{ pointerEvents: "auto" }}>
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
                onClick={() => onChangePassword(adminId, adminName)}
              >
                <Pencil className="size-4 text-muted-foreground" />
                Change Password
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];