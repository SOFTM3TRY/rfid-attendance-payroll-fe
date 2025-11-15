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
  Printer,
  TriangleAlert,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import PrimaryInfo from "@/components/admin/manage-student/ShowProfile/PrimaryInfoStudent";
import BasicInfo from "@/components/admin/manage-student/ShowProfile/BasicInfo";
import AddressInfo from "@/components/admin/manage-student/ShowProfile/AddressInfo";
import GuardianInfo from "@/components/admin/manage-student/ShowProfile/GuardianInfo";

import SplitText from "@/components/animata/text/split-text";
import FlipCardUI from "@/components/admin/manage-student/Registration/irefid";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { on } from "events";
import { useAuth } from "@/context/AuthContext";
import { RegisterRFIDToStudent } from "@/services/Student_service";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";

import { useGetStudentDetailsById } from "@/hooks/useStudentDetails";

export default function Registration({ open, setOpen, studentId }: { open: boolean; setOpen: (open: boolean) => void; studentId: number; }) {
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

  const onSubmit = async (formData: any) => {
    setIsLoading(true);
    try {
      await RegisterRFIDToStudent(token as string, formData.lrn, formData);
      toast.success("RFID Successfully Registered");
      const input = document.getElementById("rfid_uid") as HTMLInputElement;
      if (input) input.value = "";
    } catch (error) {
      toast.error("RFID Registration Failed");
    } finally {
      setIsLoading(false);
    }
  };

  // Conditional rendering AFTER hooks
  if (isLoadingStudent || isLoading) return <Loader />;
  if (!student) return <div className="p-5">No student data found.</div>;
  if (isError) return <div className="p-5 text-red-500">Failed to load student</div>;

  return (
    <Sheet open={open} onOpenChange={setOpen} >
      <SheetContent className="bottom-0 h-full rounded-t-md overflow-y-auto p-3 overflow-x-hidden" side="bottom" style={{ pointerEvents: student?.rfid_uid ? "auto" : "none" }}>
        {/* Header */}
        <SheetHeader>
          <SheetDescription className="flex items-center text-center text-md">
            <User className="mr-1 w-4 h-4 text-teal-500" />
            Student RFID Registration
            <span className={`text-xs ml-2 w-20 h-5 flex shadow items-center justify-center rounded-full font-medium ${student.status == 1 ? "bg-green-200 text-green-900" : "bg-red-200 text-red-900"}`}>
              {student.status == 1 ? "Active" : "Inactive"}
              <span className="ml-1">
                {student.status == 1 ? <UserCheck className="w-4 h-4 text-green-800" /> : <UserX className="w-4 h-4 text-red-800" />}
              </span>
            </span>
          </SheetDescription>
          <SheetTitle className="uppercase">{fullName}</SheetTitle>
          <SheetDescription>S.Y: {student.school_year}</SheetDescription>
        </SheetHeader>

        {/* Body */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
          <div className="col-span-1 rounded-md">
            <PrimaryInfo data={student} fullName={fullName} />
            <BasicInfo data={student} />
            <AddressInfo data={student.additional_info || {}} />
            <GuardianInfo data={student.additional_info || {}} />
          </div>

          <div className="col-span-1 md:col-span-2 rounded-r-md p-7 h-full bg-zinc-100 dark:bg-zinc-900 border-l-4 border-zinc-300 dark:border-zinc-700">
            <div className=" z-500 flex items-center justify-center">
              <span className={cn("text-lg font-medium shadow-lg flex items-center", { "bg-zinc-200 dark:bg-zinc-800 py-2 px-3 rounded-full animate-bounce": !student.rfid_uid })}>
                <User className="w-8 h-8 text-white p-1 mr-2 bg-teal-500 rounded-full" />
                {!student.rfid_uid ? (
                  <>Tap <span className="text-teal-500 mx-2 font-bold">IREF ID</span> to register attendance for <span className="text-teal-500 mx-2">{fullName}</span>.</>
                ) : (
                  <>{fullName} is already registered.</>
                )}
              </span>
            </div>

            <div className="mt-10 p-5 flex justify-center items-center">
              <FlipCardUI data={student} />
            </div>

            {!student.rfid_uid && (
              <form onSubmit={handleSubmit(onSubmit)} onChange={(e) => e.currentTarget.requestSubmit()}>
                <input type="hidden" value={student.lrn} {...register("lrn")} />
                <input type="text" autoFocus {...register("rfid_uid")} id="rfid_uid" className="text-zinc-200 dark:text-zinc-900 border-none focus:outline-none" />
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <SheetFooter className="fixed bottom-5 right-5">
          <div className="flex items-center justify-end gap-5">
            {student.rfid_uid && <Button onClick={() => window.print()} className="w-40"><Printer /> Print</Button>}
            <SheetClose asChild><Button className="w-40" variant="outline"><CircleX /> Close</Button></SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

