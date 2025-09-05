"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import SplitText from "@/components/animata/text/split-text";
import Loader from "@/components/Loader";
import { cn } from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AttendanceTimeIn } from "@/services/Attendance";

type ScanMode = "time_in" | "time_out";
type FormData = { rfid_uid: string };

export default function Attendance() {
  const [mode, setMode] = useState<ScanMode>("time_in");
  const [isLoading, setIsLoading] = useState(false);

  // Separate refs and forms for each mode
  const inputRefIn = useRef<HTMLInputElement>(null);
  const inputRefOut = useRef<HTMLInputElement>(null);

  const {
    register: registerIn,
    handleSubmit: handleSubmitIn,
    reset: resetIn,
    setValue: setValueIn,
  } = useForm<FormData>();

  const {
    register: registerOut,
    handleSubmit: handleSubmitOut,
    reset: resetOut,
    setValue: setValueOut,
  } = useForm<FormData>();

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-focus input on mode change
  useEffect(() => {
    const focusInput = () => {
      if (mode === "time_in") {
        inputRefIn.current?.focus();
      } else {
        inputRefOut.current?.focus();
      }
    };

    focusInput(); // 🔁 Call on mode change

    // Optional: still keep focus when clicking outside
    document.addEventListener("click", focusInput);
    return () => document.removeEventListener("click", focusInput);
  }, [mode]);

  // Time In onSubmit
  const onSubmitIn = async (data: FormData) => {
    if (!data?.rfid_uid) return;
  
  const RFID = data?.rfid_uid
    setIsLoading(true);
    try {
     
      try{
      const response = await AttendanceTimeIn (RFID)
      console.log(response)
      toast.success(response.message)
      }catch(error){
        // @ts-ignore
        if (error.response && error.response.data) {
          // @ts-ignore
          toast.error(error.response.data.message);
        } else {
          toast.error("❌ Failed to process Time In");
        }
      }
     
      resetIn({ rfid_uid: "" });
      inputRefIn.current?.focus();
    } catch {
      toast.error("❌ Failed to process Time In");
    } finally {
      setIsLoading(false);
    }
  };

  // Time Out onSubmit
  const onSubmitOut = async (data: FormData) => {
    if (!data.rfid_uid) return;

    setIsLoading(true);
    try {
      const jsonPayload = JSON.stringify({ rfid_uid: data.rfid_uid });
      console.log("📤 Time Out Payload:", jsonPayload);
      toast.success("✅ Time Out scanned successfully");
      // toast.success(resposnse.message);
      resetOut({ rfid_uid: "" });
      inputRefOut.current?.focus();
    } catch {
      toast.error("❌ Failed to process Time Out");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle auto-submit
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    mode: ScanMode
  ) => {
    const value = e.target.value;

    if (mode === "time_in") {
      setValueIn("rfid_uid", value);
    } else {
      setValueOut("rfid_uid", value);
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      if (mode === "time_in") {
        handleSubmitIn(onSubmitIn)();
      } else {
        handleSubmitOut(onSubmitOut)();
      }
    }, 100);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="p-10 min-h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4 justify-center">
        <img src="/logo.png" alt="logo" className="w-32 h-32" />
        <SplitText text="Young Generation Academy" />
        <h1 className="text-4xl font-bold mb-5 text-sky-200">Attendance Monitoring System</h1>
        <p className="text-sm px-5 py-2 bg-zinc-200 dark:bg-zinc-900 rounded-full text-dark dark:text-white animate-bounce">
          Tap your RFID to mark your attendance
        </p>
      </div>

      {/* Mode Selector */}
      <div className="mt-6 mb-4 absolute top-5 right-5">
        <Select value={mode} onValueChange={(val) => setMode(val as ScanMode)}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select Mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="time_in">Time In</SelectItem>
            <SelectItem value="time_out">Time Out</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Time In Form */}
      {mode === "time_in" && (
        <form onSubmit={handleSubmitIn(onSubmitIn)} className="w-full max-w-sm">
          <input
            type="text"
            autoFocus
            placeholder=""
            {...registerIn("rfid_uid")}
            ref={(e) => {
              registerIn("rfid_uid").ref(e);
              inputRefIn.current = e;
            }}
            onChange={(e) => handleChange(e, "time_in")}
            className={cn(
              "border-none bg-transparent text-white dark:text-black focus:outline-none focus:ring-0 absolute top-0 left-0 "
            )}
          />
        </form>
      )}

      {/* Time Out Form */}
      {mode === "time_out" && (
        <form
          onSubmit={handleSubmitOut(onSubmitOut)}
          className="w-full max-w-sm"
        >
          <input
            type="text"
            autoFocus
            placeholder=""
            {...registerOut("rfid_uid")}
            ref={(e) => {
              registerOut("rfid_uid").ref(e);
              inputRefOut.current = e;
            }}
            onChange={(e) => handleChange(e, "time_out")}
            className={cn(
              "border-none bg-transparent text-white dark:text-black focus:outline-none focus:ring-0 absolute top-0 left-0 "
            )}
          />
        </form>
      )}
    </div>
  );
}
