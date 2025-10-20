import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Eye, SquarePen, History, FilePlus,
  ShieldUser, User, GraduationCap, BookAudio,
  UserCog, UserCheck, UserX
} from "lucide-react";
import ShowProfile from "@/components/admin/manage-student/ShowProfile/ShowProfile";
import EditProfile from "@/components/admin/manage-student/EditStudent/EditStudent";
import ShowAttendanceHistory from "@/components/admin/manage-student/ShowAttendanceHistory/ShowAttendanceHistory";
import Registration from "@/components/admin/manage-student/Registration/Registration";
import { useState } from "react";

export type Teacher = {
  LRN: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  suffix?: string;
  status: "Active" | "Inactive" | number;
};

export const columns: ColumnDef<Teacher>[] = [
  {
    accessorKey: "LRN",
    header: () => (
      <Button variant="ghost" size="sm">
        <ShieldUser className="text-blue-500" /> Emloyee No.
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
    cell: ({ row }) => {
      const { last_name, first_name, middle_name, suffix } = row.original;
      return <span>{`${last_name} ${first_name} ${middle_name || ""} ${suffix || ""}`}</span>;
    },
  },
  {
    accessorKey: "status",
    header: () => (
      <Button variant="ghost" size="sm">
        <UserCog className="text-teal-500" /> Status
      </Button>
    ),
    cell: ({ row }) => {
      const statusValue = row.original.status;
      const isActive = statusValue === "Active" || statusValue === 1;

      return (
        <span className="text-xs w-22 h-6 flex items-center justify-center rounded-md font-normal bg-zinc-100 dark:bg-zinc-800">
          {isActive ? "Active" : "Inactive"}
          <span className={`ml-1 ${isActive ? "text-green-500" : "text-red-500"}`}>
            {isActive ? <UserCheck className="w-4 h-4" /> : <UserX className="w-4 h-4" />}
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
        <>
          <ShowProfile open={openView} setOpen={setOpenView} row={row} />
          <EditProfile open={openEdit} setOpen={setOpenEdit} row={row} />
          <ShowAttendanceHistory open={openHistory} setOpen={setOpenHistory} row={row} />
          <Registration open={openRegister} setOpen={setOpenRegister} row={row} />

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => setOpenView(true)}>
              <Eye className="w-4 h-4 mr-1" />
              View
            </Button>
            <Button variant="outline" size="sm" onClick={() => setOpenEdit(true)}>
              <SquarePen className="w-4 h-4 mr-1" />
              Edit
            </Button>
            <Button variant="outline" size="sm" onClick={() => setOpenHistory(true)}>
              <History className="w-4 h-4 mr-1" />
              History
            </Button>
            <Button variant="outline" size="sm" onClick={() => setOpenRegister(true)}>
              <FilePlus className="w-4 h-4 mr-1" />
              Register
            </Button>
          </div>
        </>
      );
    },
  },
];
