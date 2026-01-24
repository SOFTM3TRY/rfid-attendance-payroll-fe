import { useStudentForm } from "@/hooks/useStudentForm";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Eye,
  User,
  UserCheck,
  UserX,
  CircleX,
  Loader2,
  Send,
  TriangleAlert,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import {
  useGetStudentDetailsById,
  useEditStudnentMutation,
} from "@/hooks/useStudentDetails";

import PrimaryInfo from "@/components/admin/manage-student/ShowProfile/PrimaryInfoStudent";
import BasicInfo from "@/components/admin/manage-student/ShowProfile/BasicInfo";
import AddressInfo from "@/components/admin/manage-student/ShowProfile/AddressInfo";
import GuardianInfo from "@/components/admin/manage-student/ShowProfile/GuardianInfo";

import { AttendanceHistory } from "@/components/admin/manage-student/ShowAttendanceHistory/AttendanceHistory";

import SplitText from "@/components/animata/text/split-text";

export default function ShowAttendanceHistory({
  open,
  setOpen,
  row,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  row: any;
}) {
  const data = row.original || {};
  const fullName = [
    data.last_name,
    data.first_name,
    data.middle_name,
    data.suffix,
  ]
    .filter(Boolean)
    .join(" ");

  const {
    step,
    setStep,
    open: openSheet,
    setOpen: setOpenSheet,
    loading,
    errors,
    handlePrevStep,
    handleNextStep,
    handleSubmit,
    setErrors,
    formData,
    setFormData,
  } = useStudentForm();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        className="bottom-0 h-[95vh] rounded-t-md overflow-y-auto p-3"
        side="bottom"
      >
        <SheetHeader>
          <SheetDescription className="flex items-center text-center text-sm">
            <User className="mr-1 size-4 text-teal-500" />
            Student Attendance History
            <span
              className={`text-white text-xs ml-2 w-20 h-5 flex shadow items-center justify-center rounded-full font-medium ${
                data.status == 1
                  ? "bg-green-500"
                  : "bg-destructive"
              }`}
            >
              {data.status == 1 ? "Active" : "Inactive"}
              <span className="ml-1">
                {data.status == 1 ? (
                  <UserCheck className="size-3" />
                ) : (
                  <UserX className="size-3" />
                )}
              </span>
            </span>
          </SheetDescription>
          <SheetTitle className="uppercase text-sm">{fullName}</SheetTitle>
        </SheetHeader>

        {/* <SplitText
                  text="Young Generation Academy"
                  className="absolute top-15 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                /> */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20 ">
          {/* Avatar + Primary */}
          <div className="col-span-1 rounded-md">
            <PrimaryInfo lrn={data.lrn} />

            <BasicInfo lrn={data.lrn} />
            <AddressInfo lrn={data.lrn} />
            <GuardianInfo lrn={data.lrn} />
          </div>

          <div className="col-span-1 md:col-span-2 rounded-r-md p-7 h-full bg-accent/10 rounded-xl">
            <div>
              <span className="text-lg font-medium shadow-lg flex items-center bg-accent/20 py-2 px-3 rounded-full">
                <User className="size-6 text-white p-1 mr-2 bg-teal-500 rounded-full" />{" "}
                Student <span className="text-teal-500 mx-2">{fullName}</span>{" "}
                Attendance History
              </span>
            </div>
            <div className="mt-5">
              <AttendanceHistory id={data.id} />
            </div>
            
          </div>
        </div>

        <SheetFooter className="fixed bottom-5 right-5">
          <div className="flex items-center justify-end gap-5">
            {/* <Button onClick={handleSubmit} className="w-40" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={18} />
                  Processing...
                </>
              ) : (
                <>
                  Update <Send className="" />
                </>
              )}
            </Button> */}
            <SheetClose asChild>
              <Button
                size="sm"
                variant="outline"
                className="rounded-full"
                onClick={() => setOpen(false)}
              >
                <CircleX className="size-4" /> Close
              </Button>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
