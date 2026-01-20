"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  useGetStudentDetailsById,
  useEditStudnentMutation,
} from "@/hooks/useStudentDetails";

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

interface EditStudentProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: string | number;
}

export default function EditStudent({ open, setOpen, id }: EditStudentProps) {
  const { token } = useAuth();
  const { data, isLoading: isLoadingDetails } = useGetStudentDetailsById(
    token,
    id,
  );
  const editStudentMutation = useEditStudnentMutation(token, id);

  const student = data?.data?.student;

  const [formData, setFormData] = useState<any>({});

  /** Initialize form once data loads */
  useEffect(() => {
    if (student) {
      setFormData({
        id: student.id,
        student_no: student.student_no || null,
        rfid_uid: student.rfid_uid || null,
        lrn: student.lrn || "",
        first_name: student.first_name || "",
        middle_name: student.middle_name || "",
        last_name: student.last_name || "",
        suffix: student.suffix || "",
        contact_no: student.contact_no || null,
        email: student.email || "",
        birth_date: student.birth_date || "",
        birth_place: student.birth_place || "",
        gender: student.gender || "",
        address: student.address || null,
        status: student.status || "1",
        role_id: student.role_id || 3,
        school_year: student.school_year || "",
        grade_id: student.grade_id || null,
        section_id: student.section_id || null,
        last_school_attend: student.last_school_attend || "",

        additional_info: {
          region: student.additional_info?.region || "",
          province: student.additional_info?.province || null,
          city: student.additional_info?.city || null,
          barangay: student.additional_info?.barangay || null,
          street: student.additional_info?.street || "",
          guardian_first_name:
            student.additional_info?.guardian_first_name || "",
          guardian_middle_name:
            student.additional_info?.guardian_middle_name || "",
          guardian_last_name: student.additional_info?.guardian_last_name || "",
          guardian_suffix: student.additional_info?.guardian_suffix || null,
          guardian_contact: student.additional_info?.guardian_contact || "",
          guardian_email: student.additional_info?.guardian_email || "",
          guardian_occupation:
            student.additional_info?.guardian_occupation || "",
          relationship: student.additional_info?.relationship || null,
        },

        grade: {
          grade_level: student.grade.grade_level,
          description: student.grade.description || null,
          status: student.grade.status || "1",
          id: student.grade.id,
          created_at: student.grade.created_at || null,
          updated_at: student.grade.updated_at || null,
        },
        section: {
          section_name: student.section?.section_name || "",
          grade_id: student.section?.grade_id || 1,
          description: student.section?.description || "",
          status: student.section?.status || 1,
          created_at: student.section?.created_at || null,
          updated_at: student.section?.updated_at || null,
        },
      });
    }
  }, [student]);

  const handleSubmit = () => {
    if (!formData) return;

    editStudentMutation.mutate(formData, {
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
            <Loader2 className="animate-spin w-8 h-8" />
          </div>
        ) : (
          <>
            <SheetHeader>
              <SheetTitle>Edit Student Profile</SheetTitle>
              <SheetDescription>Edit student details</SheetDescription>
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
                <Button
                  onClick={handleSubmit}
                  disabled={editStudentMutation.isPending}
                >
                  {editStudentMutation.isPending ? (
                    <Loader2 className="animate-spin w-4 h-4 mr-2" />
                  ) : (
                    <Send className="w-4 h-4 ml-2" />
                  )}
                  Update
                </Button>

                <SheetClose asChild>
                  <Button variant="outline">
                    <CircleX className="w-4 h-4 mr-2" /> Close
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
