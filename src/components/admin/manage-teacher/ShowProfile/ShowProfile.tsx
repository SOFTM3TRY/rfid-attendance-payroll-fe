"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  CircleX,
  User,
  Code2,
  UserCheck,
  UserX,
  TriangleAlert,
  Info,
} from "lucide-react";
import { useTeacherDetails } from "@/hooks/useTeacher";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

import PrimaryInfo from "@/components/admin/manage-teacher/ShowProfile/PrimaryInfoStudent";
import BasicInfo from "@/components/admin/manage-teacher/ShowProfile/BasicInfo";
import AddressInfo from "@/components/admin/manage-teacher/ShowProfile/AddressInfo";
import EmergencyInfo from "@/components/admin/manage-teacher/ShowProfile/EmergencyInfo";

import { TotalStatus } from "@/components/admin/manage-teacher/ShowProfile/TotalStatus";
import { Attendance } from "@/components/admin/manage-teacher/ShowProfile/Attendance";

import SplitText from "@/components/animata/text/split-text";

export default function ShowProfile({
  open,
  setOpen,
  row,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  row: any;
}) {
  const id = row.original.id;
  const { token } = useAuth();
  const [showJson, setShowJson] = useState(false);

  const { data, isLoading, error } = useTeacherDetails(token, { id });

  const teacher = data?.data?.teacher?.[0] || null;
  const students = data?.data?.students || [];
  const info = teacher?.additional_info || {};

  const fullName = teacher
    ? `${teacher.last_name}, ${teacher.first_name} ${teacher.middle_name || ""} ${teacher.suffix || ""}`
    : "Unknown";

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        className="bottom-0 h-full rounded-t-md overflow-y-auto p-3"
        side="bottom"
      >
        {teacher && (
          <SheetHeader>
            <SheetDescription className="flex items-center text-center text-md">
              <User className="mr-1 w-4 h-4 text-teal-500" />
              Teacher Profile
              <span
                className={`text-xs ml-2 w-20 h-5 flex shadow items-center justify-center rounded-full font-medium ${
                  data.status == 1
                    ? "bg-green-200 text-green-900 dark:bg-green-100 dark:text-green-800"
                    : "bg-red-200 text-red-900 dark:bg-red-100 dark:text-red-800"
                }`}
              >
                {data.status == 1 ? "Active" : "Inactive"}
                <span className="ml-1">
                  {data.status == 1 ? (
                    <UserCheck className="w-4 h-4 text-green-800" />
                  ) : (
                    <UserX className="w-4 h-4 text-red-800" />
                  )}
                </span>
              </span>
            </SheetDescription>
            <SheetTitle className="uppercase">{`${teacher.last_name}, ${
              teacher.first_name
            } ${teacher.middle_name || ""} ${
              teacher.suffix || ""
            }`}</SheetTitle>
            <SheetDescription>S.Y : {teacher.school_year}</SheetDescription>
          </SheetHeader>
        )}
        {isLoading && <p>Loading teacher details...</p>}

        {error && <p className="text-red-500">Error loading teacher data.</p>}
        <SplitText
          text="Young Generation Academy"
          className="absolute top-15 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20 p-5">
          {/* Avatar + Primary */}
          <div className="col-span-1 rounded-md">

            {teacher && (
              <>
                <PrimaryInfo id={id} />
                <BasicInfo id={id} />
                <AddressInfo id={id} />
                <EmergencyInfo id={id} />
              </>
            )}
          </div>
          <div className="col-span-1 md:col-span-2 rounded-md h-full bg-zinc-100 dark:bg-zinc-900 p-5">
            <div className="sticky top-0 z-500">
              <span className="text-lg font-medium shadow-lg flex items-center bg-zinc-200 dark:bg-zinc-800 py-2 px-3 rounded-full">
                <User className="w-8 h-8 text-white p-1 mr-2 bg-teal-500 rounded-full" />{" "}
                Teacher <span className="text-teal-500 mx-2">{fullName}</span> Attendance
                S.Y {info?.school_year}
              </span>
            </div>
            <div className="mt-10"><TotalStatus /></div>

            <div className="p-5">
              <Attendance />
            </div>

            <hr className="mt-10" />
            <div className="mt-10 p-5 flex justify-center items-center bg-zinc-200 dark:bg-zinc-800 rounded-md animate-pulse">
              <TriangleAlert
                strokeWidth={3}
                className="mr-2 text-yellow-500 dark:text-yellow-400"
              />
              This Content Not available Now.
            </div>
            <div className="mt-10 p-5 flex justify-center items-center bg-zinc-200 dark:bg-zinc-800 rounded-md animate-pulse"></div>
            <div className="mt-5 p-20 flex justify-center items-center bg-zinc-200 dark:bg-zinc-800 rounded-md animate-pulse"></div>
            <div className="mt-5 p-5 flex justify-center items-center bg-zinc-200 dark:bg-zinc-800 rounded-md animate-pulse"></div>
            {/* <div className="mt-5 h-96 flex justify-center items-center bg-zinc-200 dark:bg-zinc-800 rounded-md animate-pulse"></div> */}
          </div>
          {/* <pre className="mt-2 p-3 bg-zinc-900 text-xs overflow-x-auto rounded text-white">
                  {JSON.stringify(data, null, 2)}
                </pre>
                       */}
        </div>
        <SheetFooter className="fixed bottom-5 right-5">
          <SheetClose asChild>
            <Button
              className="w-40"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              <CircleX /> Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
