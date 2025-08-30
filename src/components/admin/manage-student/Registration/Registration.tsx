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
  Printer
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import PrimaryInfo from "@/components/admin/manage-student/ShowProfile/PrimaryInfoStudent";
import BasicInfo from "@/components/admin/manage-student/ShowProfile/BasicInfo";
import AddressInfo from "@/components/admin/manage-student/ShowProfile/AddressInfo";
import GuardianInfo from "@/components/admin/manage-student/ShowProfile/GuardianInfo";

import SplitText from "@/components/animata/text/split-text";
import FlipCardUI from "@/components/admin/manage-student/Registration/irefid";
import { Loader } from "@/components/admin/manage-student/Registration/Loader";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export default function FlipCard({
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

  // ✅ Fix: declare these refs before useEffect
  const formRef = useRef<HTMLFormElement | null>(null);
  const rfidRef = useRef<HTMLInputElement | null>(null);
  const loadingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let interval: any;

    if (open) {
      const focusRFID = () => {
        if (rfidRef.current) {
          rfidRef.current.focus();
        }
      };

      // Initial focus
      setTimeout(() => {
        focusRFID();
      }, 300);

      // Re-focus if blurred
      const handleBlur = () => {
        setTimeout(() => focusRFID(), 100);
      };

      if (rfidRef.current) {
        rfidRef.current.addEventListener("blur", handleBlur);
      }

      // Auto-submit once RFID has value
      interval = setInterval(() => {
        const val = rfidRef.current?.value;
        if (val && val.trim() !== "") {
          formRef.current?.requestSubmit();
          clearInterval(interval);
        }
      }, 300);

      return () => {
        if (rfidRef.current) {
          rfidRef.current.removeEventListener("blur", handleBlur);
        }
        clearInterval(interval);
      };
    }
  }, [open]);

  const [submitted, setSubmitted] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        className="bottom-0 h-full rounded-t-md overflow-y-auto p-3 overflow-x-hidden"
        side="bottom"
        style={{
          pointerEvents: !data.rfid_uid ? "none" : "auto",
        }}
      >
        <SheetHeader>
          <SheetDescription className="flex items-center text-center text-md">
            <User className="mr-1 w-4 h-4 text-teal-500" />
            Student Attendance History
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

        <SplitText
          text="Young Generation Academy"
          className="absolute top-15 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />

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
            <div className="sticky top-0 z-500 flex items-center justify-center">
              <span
                className={cn(
                  "text-lg font-medium shadow-lg flex items-center",
                  {
                    "bg-zinc-200 dark:bg-zinc-800 py-2 px-3 rounded-full animate-bounce scale-1.5 infinite ease-in-out":
                      !data.rfid_uid,
                  }
                )}
              >
                <User className="w-8 h-8 text-white p-1 mr-2 bg-teal-500 rounded-full" />{" "}
                {data.rfid_uid ? (
                  <>
                    <span className="text-teal-500 mx-2 font-bold">
                      {fullName}
                    </span>{" "}
                    is already registered hover the ID to view front nad Back
                    side.
                  </>
                ) : (
                  <>
                    Tap{" "}
                    <span className="text-teal-500 mx-2 font-bold">IREF ID</span>{" "}
                    to register attendance for{" "}
                    <span className="text-teal-500 mx-2">{fullName}</span>.
                  </>
                )}
              </span>
            </div>
            <div
              className="mt-10 p-5 flex justify-center items-center"

            >
              <FlipCardUI data={data} />
            </div>

            <form
              ref={formRef}
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const dataObj: Record<string, any> = {};

                formData.forEach((value, key) => {
                  dataObj[key] = value;
                });

                if (dataObj.lrn && dataObj.rfidUid) {
                  alert(`Form submitted:\n${JSON.stringify(dataObj, null, 2)}`);
                  setSubmitted(true);
                }
              }}
              className=""
            >
              {/* Hidden LRN field */}
              <Input type="hidden" name="lrn" value={data.lrn} readOnly />

              {/* RFID input */}
              <input
                ref={rfidRef}
                type="text"
                name="rfidUid"
                autoFocus
                tabIndex={-1}
                className="text-white dark:text-black border-none focus:outline-none focus:ring-none focus:shadow-outline"
                onChange={(e) => {
                  const val = e.currentTarget.value.trim();
                  if (val !== "") {
                    formRef.current?.requestSubmit();
                  }
                }}
              />
            </form>
            <Loader submitted={submitted} />
          </div>
        </div>

        <SheetFooter className="fixed bottom-5 right-5">
          <div className="flex items-center justify-end gap-5">
            {data.rfid_uid && (
              <Button
                onClick={() => window.print()}
                className="w-40"
              >
                <Printer  className="mr-0"/> Print
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

