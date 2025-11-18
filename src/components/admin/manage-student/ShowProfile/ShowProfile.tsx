import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import { useGetStudentDetailsById } from "@/hooks/useStudentDetails";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { User, UserCheck, UserX, CircleX } from "lucide-react";

import PrimaryInfo from "@/components/admin/manage-student/ShowProfile/PrimaryInfoStudent";
import BasicInfo from "@/components/admin/manage-student/ShowProfile/BasicInfo";
import AddressInfo from "@/components/admin/manage-student/ShowProfile/AddressInfo";
import GuardianInfo from "@/components/admin/manage-student/ShowProfile/GuardianInfo";

import { TotalStatus } from "@/components/admin/manage-student/ShowProfile/TotalStatus";
import { Attendance } from "@/components/admin/manage-student/ShowProfile/Attendance";

import SplitText from "@/components/animata/text/split-text";

export default function ShowProfile({
  open,
  setOpen,
  trigger,
  studentId,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  studentId: number;
  trigger?: React.ReactNode;
}) {
  const { token } = useAuth();
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  // Always call hooks at top
  const { data, isLoading: isLoadingStudent, isError } = useGetStudentDetailsById(
    token,
    Number(studentId)
  );

  // Extract student object safely
  const student = data?.data;
  const fullName = [
    student?.last_name,
    student?.first_name,
    student?.middle_name,
    student?.suffix,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      <SheetContent
        className="bottom-0 h-full rounded-t-md overflow-y-auto p-3"
        side="bottom"
      >
        <SheetHeader>
          <SheetDescription className="flex items-center text-center text-md">
            <User className="mr-1 w-4 h-4 text-teal-500" />
            Student Profile
            <span
              className={`text-xs ml-2 w-20 h-5 flex shadow items-center justify-center rounded-full font-medium ${
                student?.status == 1
                  ? "bg-green-200 text-green-900 dark:bg-green-100 dark:text-green-800"
                  : "bg-red-200 text-red-900 dark:bg-red-100 dark:text-red-800"
              }`}
            >
              {student?.status == 1 ? "Active" : "Inactive"}
              <span className="ml-1">
                {student?.status == 1 ? (
                  <UserCheck className="w-4 h-4 text-green-800" />
                ) : (
                  <UserX className="w-4 h-4 text-red-800" />
                )}
              </span>
            </span>
          </SheetDescription>
          <SheetTitle className="uppercase">{fullName}</SheetTitle>
          <SheetDescription>S.Y : {student?.school_year}</SheetDescription>
        </SheetHeader>

        <SplitText
          text="Young Generation Academy"
          className="absolute top-15 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20 p-5">
          {/* Avatar + Primary */}
          <div className="col-span-1 rounded-md">
            <PrimaryInfo data={student} fullName={fullName} />

            <BasicInfo data={student} />
            <AddressInfo data={student?.additional_info || {}} />
            <GuardianInfo data={student?.additional_info || {}} />
          </div>
          <div className="col-span-1 md:col-span-2 rounded-md h-full bg-zinc-100 dark:bg-zinc-900 p-5">
            <div className="sticky top-0 z-500">
              <span className="text-lg font-medium shadow-lg flex items-center bg-zinc-200 dark:bg-zinc-800 py-2 px-3 rounded-full">
                <User className="w-8 h-8 text-white p-1 mr-2 bg-teal-500 rounded-full" />{" "}
                Student <span className="text-teal-500 mx-2">{fullName}</span>{" "}
                Attendance S.Y {student?.school_year}
              </span>
            </div>
            <div className="mt-10">
              <TotalStatus />
            </div>

            <div className="p-5">
              <Attendance data={student?.attendance || []} />
            </div>
          </div>
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
