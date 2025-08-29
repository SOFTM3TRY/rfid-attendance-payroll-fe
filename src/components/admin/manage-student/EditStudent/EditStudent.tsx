import { useStudentForm } from "@/hooks/useStudentForm";
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { User, UserCheck, UserX, CircleX, Loader2, Send } from "lucide-react";

import PrimaryInfo from "@/components/admin/manage-student/ShowProfile/PrimaryInfoStudent";
import BasicInfo from "@/components/admin/manage-student/ShowProfile/BasicInfo";
import AddressInfo from "@/components/admin/manage-student/ShowProfile/AddressInfo";
import GuardianInfo from "@/components/admin/manage-student/ShowProfile/GuardianInfo";

import EditBasicInfo from "@/components/admin/manage-student/EditStudent/EditBasicInfo";
import EditPrimaryInfo from "@/components/admin/manage-student/EditStudent/EditPrimaryInfo";
import EditAddressInfo from "@/components/admin/manage-student/EditStudent/EditAddressInfo";
import EditGuardianInfo from "@/components/admin/manage-student/EditStudent/EditGuardianInfo";

export default function EditStudent({
  open,
  setOpen,
  row,
  trigger,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  row: any;
  trigger?: React.ReactNode;
}) {
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

  const data = row?.original || {}; // ✅ Extract data from row
  const fullName = [
    data.last_name,
    data.first_name,
    data.middle_name,
    data.suffix,
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
            Edit Student Profile
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
          <SheetTitle className="uppercase">{fullName}</SheetTitle>
          <SheetDescription>S.Y : {data.school_year}</SheetDescription>
        </SheetHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20 ">
          <pre className="hidden">{JSON.stringify(data, null, 2)}</pre>
          {/* Avatar + Primary */}
          <div className="col-span-1 rounded-md">
            <PrimaryInfo data={data} fullName={fullName} />

            <BasicInfo data={data} />
            <AddressInfo data={data.additional_info || {}} />
            <GuardianInfo data={data.additional_info || {}} />
          </div>

          <div className="col-span-1 md:col-span-2 rounded-r-md p-7 h-full bg-zinc-100 dark:bg-zinc-900 border-l-4 border-zinc-300 dark:border-zinc-700">
            <div className="sticky top-0 z-500">
              <span className="text-lg font-medium shadow-lg flex items-center bg-zinc-200 dark:bg-zinc-800 py-2 px-3 rounded-full"><User className="w-8 h-8 text-white p-1 mr-2 bg-teal-500 rounded-full" /> Edit <span className="text-teal-500 mx-2">{fullName}</span> Student Profile</span>
            </div>
            <EditBasicInfo data={data} />
            <EditPrimaryInfo data={data} />
            <EditAddressInfo data={data.additional_info || {}} />
            <EditGuardianInfo data={data.additional_info || {}} />
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
                  Update <Send className="" />
                </>
              )}
            </Button>
            <SheetClose asChild>
              <Button
                className="w-40"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                <CircleX /> Close
              </Button>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
