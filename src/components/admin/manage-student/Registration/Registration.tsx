import { useEffect, useRef, useState } from "react";
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
import { User, UserCheck, UserX, CircleX, Printer } from "lucide-react";

import PrimaryInfo from "@/components/admin/manage-student/ShowProfile/PrimaryInfoStudent";
import BasicInfo from "@/components/admin/manage-student/ShowProfile/BasicInfo";
import AddressInfo from "@/components/admin/manage-student/ShowProfile/AddressInfo";
import GuardianInfo from "@/components/admin/manage-student/ShowProfile/GuardianInfo";

import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import { RegisterRFIDToStudent } from "@/services/Student_service";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

import { useGetStudentDetailsByLrn } from "@/hooks/useStudentDetails";
import StudentIdCard from "./StudentIdCard";

// ✅ shadcn progress only
import { Progress } from "@/components/ui/progress";

export default function Registration({
  open,
  setOpen,
  lrn,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  lrn: string;
}) {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  // ✅ progress state
  const [progress, setProgress] = useState(0);

  // ✅ ref for autofocus
  const rfidRef = useRef<HTMLInputElement | null>(null);

  // Always call hooks at top
  const { data, isError } = useGetStudentDetailsByLrn(token, lrn);

  const student = data?.data?.student;

  const fullName = [
    student?.last_name,
    student?.first_name,
    student?.middle_name,
    student?.suffix,
  ]
    .filter(Boolean)
    .join(" ");

  useEffect(() => {
    let timer: any;

    if (isLoading) {
      setProgress(0);

      // Smooth fake loading animation
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev; // stop at 90% until finished
          return prev + 5;
        });
      }, 200);
    }

    return () => clearInterval(timer);
  }, [isLoading]);

  // ✅ Auto-focus when sheet opens + keep focus kahit click kahit saan
  useEffect(() => {
    if (!open) return;
    if (student?.rfid_uid) return;

    const focusInput = () => rfidRef.current?.focus();

    // initial focus
    const t = setTimeout(focusInput, 150);

    // keep focus on any click
    window.addEventListener("click", focusInput);

    return () => {
      clearTimeout(t);
      window.removeEventListener("click", focusInput);
    };
  }, [open, student?.rfid_uid]);

  const { ref, ...rest } = register("rfid_uid");

  const onSubmit = async (formData: any) => {
    setIsLoading(true);

    try {
      const response = await RegisterRFIDToStudent(
        token as string,
        student?.lrn,
        formData,
      );
      const nextRfid = response?.data?.student?.rfid_uid ?? formData.rfid_uid;

      queryClient.setQueryData(["get-student-by-lrn", student.lrn], (old: any) => {
        if (!old?.data?.student) return old;

        return {
          ...old,
          data: {
            ...old.data,
            student: {
              ...old.data.student,
              rfid_uid: nextRfid,
            },
          },
        };
      });

      queryClient.setQueryData(["student-details"], (old: any) => {
        if (!old?.data || !Array.isArray(old.data)) return old;

        return {
          ...old,
          data: old.data.map((item: any) =>
            String(item.lrn) === String(student.lrn)
              ? { ...item, rfid_uid: nextRfid }
              : item,
          ),
        };
      });

      // ✅ finish progress smoothly
      setProgress(100);

      toast.success("RFID Successfully Registered");
      queryClient.invalidateQueries({
        queryKey: ["get-student-by-lrn", student.lrn],
      });
      queryClient.invalidateQueries({ queryKey: ["student-details"] });
      queryClient.invalidateQueries({
        queryKey: ["get-registered-student", token],
      });
    } catch (error) {
      toast.error("RFID Registration Failed");
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        setProgress(0);
      }, 800);
    }
  };

  // Conditional rendering AFTER hooks
  if (!student) return <div></div>;
  if (isError)
    return <div className="p-5 text-red-500">Failed to load student</div>;

  return (
    <>
      <style jsx global>{`
        .student-id-print-root {
          display: none;
        }

        @media print {
          @page {
            margin: 8mm;
          }

          body * {
            visibility: hidden !important;
          }

          .student-id-print-root,
          .student-id-print-root * {
            visibility: visible !important;
          }

          .student-id-print-root {
            position: fixed;
            inset: 0;
            display: flex !important;
            justify-content: center;
            align-items: flex-start;
            background: white;
            padding: 0;
          }

          .student-id-print-panel {
            display: flex;
            width: 100%;
            flex-direction: column;
            align-items: center;
            gap: 18px;
            padding-top: 4mm;
          }

          .student-id-card {
            transform: scale(0.43);
            transform-origin: top center;
            margin-bottom: -300px;
            break-inside: avoid;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>

      <div className="student-id-print-root" aria-hidden="true">
        <div className="student-id-print-panel">
          <StudentIdCard student={student} mode="print-front" />
          <StudentIdCard student={student} mode="print-back" />
        </div>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        className="bottom-0 h-[95vh] rounded-t-md overflow-y-auto p-3 overflow-x-hidden"
        side="bottom"
        style={{ pointerEvents: student?.rfid_uid ? "auto" : "none" }}
      >
        {/* Header */}
        <SheetHeader>
          <SheetDescription className="flex items-center text-center text-sm">
            <User className="mr-1 size-4 text-teal-500" />
            Student RFID Registration
            <span
              className={`text-white text-sm ml-2 w-20 h-5 flex shadow items-center justify-center rounded-full font-medium ${
                student.status == 1 ? "bg-green-500" : "bg-destructive"
              }`}
            >
              {student.status == 1 ? "Active" : "Inactive"}
              <span className="ml-1">
                {student.status == 1 ? (
                  <UserCheck className="size-3" />
                ) : (
                  <UserX className="size-3" />
                )}
              </span>
            </span>
          </SheetDescription>
          <SheetTitle className="uppercase text-sm">{fullName}</SheetTitle>
        </SheetHeader>

        {isLoading && (
          <div className="w-full mb-5">
            <p className="text-sm mb-2 font-medium text-muted-foreground">
              Registering RFID... {progress}%
            </p>

            <Progress
              value={progress}
              className="h-2 transition-all duration-500"
            />
          </div>
        )}

        {/* Body */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
          <div className="col-span-1 rounded-md">
            <PrimaryInfo lrn={student.lrn} />
            <BasicInfo lrn={student.lrn} />
            <AddressInfo lrn={student.lrn} />
            <GuardianInfo lrn={student.lrn} />
          </div>

          <div className="col-span-1 md:col-span-2 rounded-lg p-7 h-full bg-accent/20">
            <div className=" z-500 flex items-center justify-center">
              <span
                className={cn(
                  "text-md font-medium shadow-lg flex items-center",
                  {
                    "bg-zinc-200 dark:bg-zinc-800 py-2 px-3 rounded-full animate-bounce":
                      !student.rfid_uid,
                  },
                )}
              >
                <User className="size-5 text-white p-1 mr-2 bg-teal-500 rounded-full" />
                {!student.rfid_uid ? (
                  <>
                    Tap{" "}
                    <span className="text-teal-500 mx-2 font-bold">
                      IREF ID
                    </span>{" "}
                    to register attendance for{" "}
                    <span className="text-teal-500 mx-2">{fullName}</span>.
                  </>
                ) : (
                  <>{fullName} is already registered.</>
                )}
              </span>
            </div>

            <div className="mt-10 p-5 flex justify-center items-center">
              <StudentIdCard student={student} rotate="y" />
            </div>

            {!student.rfid_uid &&
              (() => {
                const { ref, ...rest } = register("rfid_uid");

                return (
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    onChange={(e) => e.currentTarget.requestSubmit()}
                  >
                    <input
                      type="hidden"
                      value={student.lrn}
                      {...register("lrn")}
                    />

                    <input
                      {...rest}
                      ref={(el) => {
                        ref(el); // ✅ react-hook-form ref
                        rfidRef.current = el; // ✅ your autofocus ref
                      }}
                      type="text"
                      autoFocus
                      id="rfid_uid"
                      className="text-zinc-200 dark:text-zinc-900 border-none focus:outline-none"
                    />
                  </form>
                );
              })()}
          </div>
        </div>

        {/* Footer */}
        <SheetFooter className="fixed bottom-5 right-5">
          <div className="flex items-center justify-end gap-3">
            {student.rfid_uid && (
              <Button
                onClick={() => window.print()}
                variant="default"
                size="sm"
                className="rounded-full"
              >
                <Printer /> Print
              </Button>
            )}
            <SheetClose asChild>
              <Button className="rounded-full" size="sm" variant="outline">
                <CircleX /> Close
              </Button>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
    </>
  );
}
