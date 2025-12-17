"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTeacherDetails } from "@/hooks/useTeacher";
import { useEditTeacherMutation } from "@/hooks/useTeacher";

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
import { Loader2, Send, CircleX } from "lucide-react";

import EditBasicInfo from "./EditBasicInfo";
import EditAddressInfo from "./EditAddressInfo";
import EditGuardianInfo from "./EditGuardianInfo";
import Profile from "./profile";

export default function EditTeacher({ open, setOpen, id }: any) {
  const { token } = useAuth();
  const { data, isLoading: isLoadingDetails } = useTeacherDetails(token, {
    id,
  });

  const editTeacherMutation = useEditTeacherMutation(token, id);

  const teacher = data?.data?.teacher?.[0];

  const [formData, setFormData] = useState<any>({});
  const [saving, setSaving] = useState(false);

  /** Initialize form once data loads */
  useEffect(() => {
    if (teacher) {
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
    }
  }, [teacher]);

  const handleSubmit = () => {
    editTeacherMutation.mutate(formData, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="bottom" className="h-[90%] overflow-y-auto">
        {isLoadingDetails ? (
          <div className="flex justify-center h-full">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <>
            <SheetHeader>
              <SheetTitle>Edit Teacher Profile</SheetTitle>
              <SheetDescription>Edit teacher details</SheetDescription>
            </SheetHeader>

            <div className="p-5 space-y-5">
              <div className="flex gap-5">
                <Profile id={id} />
                <EditBasicInfo formData={formData} setFormData={setFormData} />
              </div>

              <div className="flex gap-5">
                <EditAddressInfo
                  formData={formData}
                  setFormData={setFormData}
                />
                <EditGuardianInfo
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>
            </div>

            <SheetFooter className="fixed bottom-5 right-5 flex justify-end gap-4">
              <div className="flex gap-5">
                <Button onClick={handleSubmit}>
                  Update <Send />
                </Button>

                <SheetClose asChild>
                  <Button variant="outline">
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