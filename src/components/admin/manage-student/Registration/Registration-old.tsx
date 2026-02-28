"use client";

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
  Printer,
  TriangleAlert,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import { RegisterRFIDToStudent } from "@/services/Student_service";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";

import PrimaryInfo from "@/components/admin/manage-student/ShowProfile/PrimaryInfoStudent";
import BasicInfo from "@/components/admin/manage-student/ShowProfile/BasicInfo";
import AddressInfo from "@/components/admin/manage-student/ShowProfile/AddressInfo";
import GuardianInfo from "@/components/admin/manage-student/ShowProfile/GuardianInfo";
import SplitText from "@/components/animata/text/split-text";
import FlipCardUI from "@/components/admin/manage-student/Registration/irefid";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function FlipCardOLD({
  open,
  setOpen,
  row,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  row: any;
}) {
  const data = row.original || {};
  const fullName = [data.last_name, data.first_name, data.middle_name, data.suffix]
    .filter(Boolean)
    .join(" ");

  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit } = useForm();

  const onSubmit = async (formData: any) => {
    setIsLoading(true);
    try {
      await RegisterRFIDToStudent(token as string, formData.lrn, formData);
      toast.success("RFID Successfully Registered");

      // reset input
      const input = document.getElementById("rfid_uid") as HTMLInputElement;
      if (input) input.value = "";
    } catch (error) {
      toast.error("RFID Registration Failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        className="bottom-0 h-full rounded-t-md overflow-y-auto p-3 overflow-x-hidden"
        side="bottom"
      >
        <SheetHeader>
          <SheetDescription className="flex items-center text-center text-md">
            <User className="mr-1 w-4 h-4 text-teal-500" />
            Student Attendance History {data.rfid_uid ? "" : "(No RFID)"}
            <span
              className={cn(
                "text-sm ml-2 w-20 h-5 flex shadow items-center justify-center rounded-full font-medium",
                {
                  "bg-green-200 text-green-900 dark:bg-green-100 dark:text-green-800":
                    data.status == 1,
                  "bg-red-200 text-red-900 dark:bg-red-100 dark:text-red-800":
                    data.status != 1,
                }
              )}
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

        <pre>{JSON.stringify(data, null, 2)}</pre>

        <SplitText
          text="Young Generation Academy"
          className="absolute top-15 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
          {/* Avatar + Primary */}
          <div className="col-span-1 rounded-md">
            {/* <PrimaryInfo data={data} fullName={fullName} />
            <BasicInfo data={data} />
            <AddressInfo data={data.additional_info?.[0]} />
            <GuardianInfo data={data.additional_info?.[0]} /> */}
          </div>

          {/* FlipCard and RFID Form */}
          <div className="col-span-1 md:col-span-2 rounded-r-md p-7 h-full bg-zinc-100 dark:bg-zinc-900 border-l-4 border-zinc-300 dark:border-zinc-700">
            <div className="sticky top-0 z-500 flex items-center justify-center">
              <span
                className={cn("text-lg font-medium shadow-lg flex items-center", {
                  "bg-zinc-200 dark:bg-zinc-800 py-2 px-3 rounded-full animate-bounce scale-1.5 infinite ease-in-out":
                    !data.rfid_uid,
                })}
              >
                <User className="w-8 h-8 text-white p-1 mr-2 bg-teal-500 rounded-full" />{" "}
                {data.rfid_uid ? (
                  <>
                    <span className="text-teal-500 mx-2 font-bold">{fullName}</span> is
                    already registered hover the ID to view front and back side.
                  </>
                ) : (
                  <>
                    Tap <span className="text-teal-500 mx-2 font-bold">IREF ID</span> to
                    register attendance for <span className="text-teal-500 mx-2">{fullName}</span>.
                  </>
                )}
              </span>
            </div>

            <div className="mt-10 p-5 flex justify-center items-center">
              {/* <FlipCardUI data={data} /> */}
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              onChange={(e) => e.currentTarget.requestSubmit()}
              className={data.rfid_uid ? "hidden" : "block"}
            >
              <input type="hidden" value={data.lrn} {...register("lrn")} />
              <input
                type="text"
                autoFocus
                {...register("rfid_uid")}
                className="text-zinc-200 dark:text-zinc-900 border-none focus:outline-none focus:ring-none focus:shadow-outline"
                id="rfid_uid"
              />
            </form>
          </div>
        </div>

        <SheetFooter className="fixed bottom-5 right-5">
          <div className="flex items-center justify-end gap-5">
            {data.rfid_uid && (
              <Button onClick={() => window.print()} className="w-40">
                <Printer className="mr-0" /> Print
              </Button>
            )}
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
