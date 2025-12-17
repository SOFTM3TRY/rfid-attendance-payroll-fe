"use client";

import { useState } from "react";
import { useTeacherForm } from "@/hooks/useTeacherForm";
import { useTeacherDetails } from "@/hooks/useTeacher";
import { useSection } from "@/hooks/useSection";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { User, UserCheck, UserX, CircleX, Loader2, Send } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SplitText from "@/components/animata/text/split-text";

import EditBasicInfo from "@/app/admin/manage-teacher/page/EditTeacher/EditBasicInfo";
import EditPrimaryInfo from "@/app/admin/manage-teacher/page/EditTeacher/EditPrimaryInfo";
import EditAddressInfo from "@/app/admin/manage-teacher/page/EditTeacher/EditAddressInfo";
import EditGuardianInfo from "@/app/admin/manage-teacher/page/EditTeacher/EditGuardianInfo";

interface EditTeacherProps {
  id: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  trigger?: React.ReactNode;
}

export default function EditTeacher({
  open,
  setOpen,
  id,
  trigger,
}: EditTeacherProps) {
  const { token } = useAuth();
  const { loading, handleSubmit } = useTeacherForm();

  // Fetch teacher details
  const { data: teacherData, isLoading: loadingTeacher } = useTeacherDetails(
    token, { id }
  );

  // Safely extract teacher object
  const data = teacherData?.data || {};

  // Compute full name
  const fullName = [
    data.teacher?.[0]?.last_name,
    data.teacher?.[0]?.first_name,
    data.teacher?.[0]?.middle_name,
    data.teacher?.[0]?.suffix,
  ]
    .filter(Boolean)
    .join(" ");

  const grade =
    data.teacher?.[0].additional_info?.grade === "1"
      ? "Grade One"
      : data.teacher?.[0].additional_info?.grade === "2"
      ? "Grade Two"
      : data.teacher?.[0].additional_info?.grade === "3"
      ? "Grade Three"
      : data.teacher?.[0].additional_info?.grade === "4"
      ? "Grade Four"
      : data.teacher?.[0].additional_info?.grade === "5"
      ? "Grade Five"
      : data.teacher?.[0].additional_info?.grade === "6"
      ? "Grade Six"
      : "";

  // Fetch sections based on grade
  const gradeId = data?.additional_info?.grade?.toString() || "";
  const { data: sectionsData, isLoading: loadingSections } = useSection(
    token as string,
    gradeId
  );
  const sections = sectionsData?.data || [];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      <SheetContent className="bottom-0 h-full rounded-t-md overflow-y-auto p-3" side="bottom">
        {/* Loading Overlay inside the Sheet */}
        {loadingTeacher ? (
          <div className="flex items-center justify-center h-full w-full">
            <Loader2 className="animate-spin w-8 h-8 mr-2" />
            Loading Teacher Data...
          </div>
        ) : (
          <>
            <SheetHeader>
              {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
              <SheetDescription className="flex items-center text-center text-md">
                <User className="mr-1 w-4 h-4 text-teal-500" />
                Edit Teacher Profile
                <span
                  className={`text-xs ml-2 w-20 h-5 flex shadow items-center justify-center rounded-full font-medium ${
                    data.teacher?.[0]?.status === "1"
                      ? "bg-green-200 text-green-900 dark:bg-green-100 dark:text-green-800"
                      : "bg-red-200 text-red-900 dark:bg-red-100 dark:text-red-800"
                  }`}
                >
                  {data.teacher?.[0]?.status === "1" ? "Active" : "Inactive"}
                  <span className="ml-1">
                    {data.teacher?.[0]?.status === "1" ? (
                      <UserCheck className="w-4 h-4 text-green-800" />
                    ) : (
                      <UserX className="w-4 h-4 text-red-800" />
                    )}
                  </span>
                </span>
              </SheetDescription>
              <SheetTitle className="uppercase">{fullName}</SheetTitle>
              <SheetDescription>
                School Year: {data.teacher?.[0]?.additional_info?.school_year || "N/A"}
              </SheetDescription>
            </SheetHeader>

            <SplitText
              text="Young Generation Academy"
              className="absolute top-15 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />

            <div className="flex flex-col items-center justify-center gap-5 mb-20">
              {/* Header */}
              <div className="w-full rounded-md">
                <div className="sticky top-0 py-10 shadow-lg dark:border-b-4 dark:border-black z-100 w-full flex justify-start rounded-md items-center px-5 gap-5 bg-zinc-100 dark:bg-zinc-900">
                  <Avatar className="h-30 w-30 flex-shrink-0">
                    <AvatarImage src={data.teacher?.[0]?.profile_image || "https://github.com/shadcn.png"} />
                    <AvatarFallback>TE</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xl font-semibold leading-none uppercase">{fullName}</p>
                    <p className="text-sm my-2 mb-4 font-semibold leading-none">{data.teacher?.[0]?.email || "No Email"}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="uppercase font-medium text-sm px-3 h-6 flex items-center justify-center rounded-full bg-green-200 shadow text-green-900 dark:bg-green-100 dark:text-green-800">
                        Grade: {grade}
                      </span>
                      <span className="uppercase font-medium text-sm px-3 h-6 flex items-center justify-center rounded-full bg-green-200 shadow text-green-900 dark:bg-green-100 dark:text-green-800">
                        Section: {data.teacher?.[0].additional_info?.section}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Edit Sections */}
              <div className="w-full rounded-md p-7 h-full bg-zinc-100 dark:bg-zinc-900">
                <div className="mb-5">
                  <span className="text-lg font-medium shadow-lg flex items-center bg-zinc-200 dark:bg-zinc-800 py-2 px-3 rounded-full">
                    <User className="w-8 h-8 text-white p-1 mr-2 bg-teal-500 rounded-full" />
                    Edit <span className="text-teal-500 mx-2">{fullName}</span> Teacher Profile
                  </span>
                </div>

                <EditBasicInfo TeacherData={data.teacher?.[0]} />
                <EditPrimaryInfo TeacherData={data.teacher?.[0]} />
                <EditAddressInfo TeacherData={data.teacher?.[0]} />
                <EditGuardianInfo TeacherData={data.teacher?.[0]} />
              </div>
            </div>

            <SheetFooter className="fixed bottom-5 right-5">
              <div className="flex items-center justify-end gap-5">
                <Button onClick={handleSubmit} className="w-40" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={18} />
                      Processing...
                    </>
                  ) : (
                    <>
                      Update <Send />
                    </>
                  )}
                </Button>
                <SheetClose asChild>
                  <Button className="w-40" variant="outline" onClick={() => setOpen(false)}>
                    <CircleX /> Close
                  </Button>
                </SheetClose>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
