"use client";

import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTeacherDetails, useEditTeacherMutation } from "@/hooks/useTeacher";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Send, CircleX, Loader2, Pen, PenSquare } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

import EditBasicInfo from "./EditBasicInfo";
import EditAddressInfo from "./EditAddressInfo";
import EditGuardianInfo from "./EditGuardianInfo";
import Profile from "./profile";

export default function EditTeacher({ open, setOpen, id }: any) {
  const { token } = useAuth();

  const { data, isLoading: isLoadingDetails, isError } = useTeacherDetails(token, {
    id,
  });

  const editTeacherMutation = useEditTeacherMutation(token, id);

  const teacher = useMemo(() => {
    return data?.data?.teacher?.[0] ?? null;
  }, [data]);

  const [formData, setFormData] = useState<any>({});

  const isSaving = editTeacherMutation.isPending;

  //Init form once teacher loads
  useEffect(() => {
    if (!teacher) return;

    setFormData({
      employee_no: teacher.employee_no,
      school_year: teacher?.additional_info?.school_year,
      grade: teacher?.additional_info?.grade,
      section: teacher?.additional_info?.section,
      first_name: teacher.first_name,
      middle_name: teacher.middle_name,
      last_name: teacher.last_name,
      suffix: teacher.suffix,
      contact_no: teacher.contact_no,
      email: teacher.email,

      birth_date: teacher.additional_info?.birth_date,
      birth_place: teacher.additional_info?.birth_place,
      gender: teacher.additional_info?.gender,

      region: teacher.additional_info?.region,
      province: teacher.additional_info?.province,
      city: teacher.additional_info?.city,
      barangay: teacher.additional_info?.barangay,
      street: teacher.additional_info?.street,

      emergency_fname: teacher.additional_info?.emergency_fname,
      emergency_mname: teacher.additional_info?.emergency_mname,
      emergency_lname: teacher.additional_info?.emergency_lname,
      emergency_contact: teacher.additional_info?.emergency_contact,
      emergency_relationship: teacher.additional_info?.emergency_relationship,
      section_name: teacher?.section?.section_name,
    });
  }, [teacher]);

  const handleSubmit = () => {
    editTeacherMutation.mutate(formData, {
      onSuccess: () => setOpen(false),
    });
  };

  const showLoading = isLoadingDetails;
  const showNotFound = !isLoadingDetails && !isError && !teacher;
  const showError = !isLoadingDetails && isError;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/*add padding bottom so content won't hide behind footer */}
      <SheetContent side="bottom" className="h-[95%] overflow-y-auto pb-24">
        <SheetHeader>
          <SheetTitle className="flex gap-2 items-center"><PenSquare className="size-4" />Edit Teacher Profile</SheetTitle>
          <SheetDescription>Edit teacher details</SheetDescription>
        </SheetHeader>

        {/*Loading */}
        {showLoading ? (
          <div className="w-full mt-6 space-y-5">
            <div className="flex flex-col md:flex-row gap-5">
              <Skeleton className="w-full md:w-1/4 h-80" />
              <Skeleton className="w-full md:w-3/4 h-80" />
            </div>

            <div className="flex flex-col md:flex-row gap-5">
              <Skeleton className="w-full h-80" />
              <Skeleton className="w-full h-80" />
            </div>
          </div>
        ) : showError ? (
          <div className="mt-10 text-center text-sm text-red-500">
            Failed to load teacher details.
          </div>
        ) : showNotFound ? (
          <div className="mt-10 text-center text-sm text-muted-foreground">
            Teacher not found.
          </div>
        ) : (
          <>
            {/*Real content */}
            <div className="p-5 space-y-5">
              <div className="flex flex-col md:flex-row gap-5">
                <Profile id={id} />
                <EditBasicInfo formData={formData} setFormData={setFormData} />
              </div>

              <div className="flex flex-col md:flex-row gap-5">
                <EditAddressInfo formData={formData} setFormData={setFormData} />
                <EditGuardianInfo formData={formData} setFormData={setFormData} />
              </div>
            </div>

            {/*Footer always visible, not overlapping content */}
            <SheetFooter className="fixed bottom-5 right-5 flex justify-end gap-4">
              <div className="flex gap-3">
                <Button onClick={handleSubmit} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Updating...
                    </>
                  ) : (
                    <>
                      Update <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                <SheetClose asChild>
                  <Button variant="outline" disabled={isSaving}>
                    <CircleX className="mr-2 h-4 w-4" /> Close
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
