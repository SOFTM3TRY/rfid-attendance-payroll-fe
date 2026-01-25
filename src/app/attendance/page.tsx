"use client";

import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import SplitText from "@/components/animata/text/split-text";
import { cn } from "@/lib/utils";

import { AttendanceTap } from "@/services/Attendance";
import { useAuth } from "@/context/AuthContext";

// ✅ your hook
import { useGetStudentDetailsByLrn } from "@/hooks/useStudentDetails";

type FormData = { rfid_uid: string };

export default function Attendance() {
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { token } = useAuth();

  // store last scanned RFID + LRN
  const [rfid, setRfid] = useState<string>("");
  const [lrn, setLrn] = useState<string>("");

  // store the attendance response JSON (fallback / debug)
  const [attendanceJson, setAttendanceJson] = useState<any>(null);

  const { register, handleSubmit, reset, setValue } = useForm<FormData>();

  // ✅ React Query hook: auto fetch when token + lrn are truthy
  const { data: studentJson, isFetching, isError, error } =
    useGetStudentDetailsByLrn(token, lrn);

  // Always focus input
  useEffect(() => {
    inputRef.current?.focus();

    const focusInput = () => inputRef.current?.focus();
    document.addEventListener("click", focusInput);

    return () => document.removeEventListener("click", focusInput);
  }, []);

  const onSubmit = async (data: FormData) => {
    if (!data?.rfid_uid) return;

    const RFID = data.rfid_uid.trim();
    if (!RFID) return;

    try {
      const response = await AttendanceTap(RFID);

      toast.success(response.message || "Attendance recorded.");
      setAttendanceJson(response);

      setRfid(RFID);

      // ✅ IMPORTANT: backend should return lrn (or student.lrn)
      const newLrn = response?.lrn ?? response?.student?.lrn ?? "";
      setLrn(newLrn);

      if (!newLrn) {
        // If no LRN returned (teacher scan or backend missing), show attendance JSON only
        // You can also toast info if you want:
        // toast("No LRN found in response.");
      }
    } catch (err: any) {
      if (err?.response?.data?.message) toast.error(err.response.data.message);
      else toast.error("Attendance tap failed.");
    } finally {
      reset({ rfid_uid: "" });
      inputRef.current?.focus();
    }
  };

  // Auto-submit scanner input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue("rfid_uid", value);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      handleSubmit(onSubmit)();
    }, 100);
  };

  // Choose what JSON to display:
  // - if studentJson exists -> show it
  // - else show attendanceJson
  const displayJson = studentJson ?? attendanceJson ?? { info: "Tap RFID to display student data." };

  return (
    <div className="p-10 min-h-screen flex flex-col items-center justify-center">
      {/* Header */}
      <div className="flex flex-col items-center gap-4 justify-center">
        <img src="/logo.png" alt="logo" className="w-32 h-32" />
        <SplitText text="Young Generation Academy" />
        <h1 className="text-4xl font-bold mb-5 text-sky-200">
          Attendance Monitoring System
        </h1>
        <p className="text-sm px-5 py-2 bg-zinc-200 dark:bg-zinc-900 rounded-full animate-bounce">
          Tap your RFID to mark your attendance
        </p>
      </div>

      {/* Hidden RFID Input */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          autoFocus
          {...register("rfid_uid")}
          ref={(e) => {
            register("rfid_uid").ref(e);
            inputRef.current = e;
          }}
          onChange={handleChange}
          className={cn(
            "border-none bg-transparent focus:outline-none absolute top-0 left-0"
          )}
        />
      </form>

      {/* JSON Viewer */}
      <div className="w-full max-w-3xl mt-10">
        <div className="rounded-xl p-4 bg-zinc-100 dark:bg-zinc-900 border">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-bold">Student JSON Data</div>
            <div className="text-xs opacity-70">
              RFID: {rfid || "-"} | LRN: {lrn || "-"}
              {isFetching ? " | fetching..." : ""}
            </div>
          </div>

          {isError ? (
            <div className="mt-3 text-xs text-red-500">
              Failed to load student by LRN.
              {" "}
              {/* optional debug */}
              {String((error as any)?.message ?? "")}
            </div>
          ) : null}

          <pre className="mt-3 text-xs overflow-auto max-h-[400px] whitespace-pre-wrap break-words">
            {JSON.stringify(displayJson, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
// "use client";

// import { useEffect, useRef, useState } from "react";
// import { useForm } from "react-hook-form";
// import toast from "react-hot-toast";

// import SplitText from "@/components/animata/text/split-text";
// import Loader from "@/components/Loader";
// import { cn } from "@/lib/utils";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { AttendanceTimeIn, AttendanceTimeOut } from "@/services/Attendance";

// type ScanMode = "time_in" | "time_out";
// type FormData = { rfid_uid: string };

// export default function Attendance() {
//   const [mode, setMode] = useState<ScanMode>("time_in");
//   const [isLoading, setIsLoading] = useState(false);

//   // Separate refs and forms for each mode
//   const inputRefIn = useRef<HTMLInputElement>(null);
//   const inputRefOut = useRef<HTMLInputElement>(null);

//   const {
//     register: registerIn,
//     handleSubmit: handleSubmitIn,
//     reset: resetIn,
//     setValue: setValueIn,
//   } = useForm<FormData>();

//   const {
//     register: registerOut,
//     handleSubmit: handleSubmitOut,
//     reset: resetOut,
//     setValue: setValueOut,
//   } = useForm<FormData>();

//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);

//   // Auto-focus input on mode change
//   useEffect(() => {
//     const focusInput = () => {
//       if (mode === "time_in") {
//         inputRefIn.current?.focus();
//       } else {
//         inputRefOut.current?.focus();
//       }
//     };

//     focusInput(); // 🔁 Call on mode change

//     // Optional: still keep focus when clicking outside
//     document.addEventListener("click", focusInput);
//     return () => document.removeEventListener("click", focusInput);
//   }, [mode]);

//   // Time In onSubmit
//   const onSubmitIn = async (data: FormData) => {
//     if (!data?.rfid_uid) return;
  
//   const RFID = data?.rfid_uid
//     setIsLoading(true);
//     try {
     
//       try{
//       const response = await AttendanceTimeIn (RFID)
//       console.log(response)
//       toast.success(response.message);
//       }catch(error){
//         // @ts-ignore
//         if (error.response && error.response.data) {
//           // @ts-ignore
//           toast.error(error.response.data.message);
//         } else {
//           toast.error("Failed to process Time In");
//         }
//       }
     
//       resetIn({ rfid_uid: "" });
//       inputRefIn.current?.focus();
//     } catch {
//       toast.error("Failed to process Time In");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Time Out onSubmit
//   const onSubmitOut = async (data: FormData) => {
//    if (!data?.rfid_uid) return;
  
//   const RFID = data?.rfid_uid
//     setIsLoading(true);
//     try {
     
//       try{
//       const response = await AttendanceTimeOut (RFID)
//       console.log(response)
//       toast.success(response.message);
//       }catch(error){
//         // @ts-ignore
//         if (error.response && error.response.data) {
//           // @ts-ignore
//           toast.error(error.response.data.message);
//         } else {
//           toast.error("Failed to process Time In");
//         }
//       }
     
//       resetIn({ rfid_uid: "" });
//       inputRefIn.current?.focus();
//     } catch {
//       toast.error("Failed to process Time In");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Handle auto-submit
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     mode: ScanMode
//   ) => {
//     const value = e.target.value;

//     if (mode === "time_in") {
//       setValueIn("rfid_uid", value);
//     } else {
//       setValueOut("rfid_uid", value);
//     }

//     if (timeoutRef.current) clearTimeout(timeoutRef.current);

//     timeoutRef.current = setTimeout(() => {
//       if (mode === "time_in") {
//         handleSubmitIn(onSubmitIn)();
//       } else {
//         handleSubmitOut(onSubmitOut)();
//       }
//     }, 100);
//   };

//   if (isLoading) return <Loader />;

//   return (
//     <div className="p-10 min-h-screen flex flex-col items-center justify-center">
//       <div className="flex flex-col items-center gap-4 justify-center">
//         <img src="/logo.png" alt="logo" className="w-32 h-32" />
//         <SplitText text="Young Generation Academy" />
//         <h1 className="text-4xl font-bold mb-5 text-sky-200">Attendance Monitoring System</h1>
//         <p className="text-sm px-5 py-2 bg-zinc-200 dark:bg-zinc-900 rounded-full text-dark dark:text-white animate-bounce">
//           Tap your RFID to mark your attendance
//         </p>
//       </div>

//       {/* Mode Selector */}
//       <div className="mt-6 mb-4 absolute top-5 right-5">
//         <Select value={mode} onValueChange={(val) => setMode(val as ScanMode)}>
//           <SelectTrigger className="w-48">
//             <SelectValue placeholder="Select Mode" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="time_in">Time In</SelectItem>
//             <SelectItem value="time_out">Time Out</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       {/* Time In Form */}
//       {mode === "time_in" && (
//         <form onSubmit={handleSubmitIn(onSubmitIn)} className="w-full max-w-sm">
//           <input
//             type="text"
//             autoFocus
//             placeholder=""
//             {...registerIn("rfid_uid")}
//             ref={(e) => {
//               registerIn("rfid_uid").ref(e);
//               inputRefIn.current = e;
//             }}
//             onChange={(e) => handleChange(e, "time_in")}
//             className={cn(
//               "border-none bg-transparent text-white dark:text-black focus:outline-none focus:ring-0 absolute top-0 left-0 "
//             )}
//           />
//         </form>
//       )}

//       {/* Time Out Form */}
//       {mode === "time_out" && (
//         <form
//           onSubmit={handleSubmitOut(onSubmitOut)}
//           className="w-full max-w-sm"
//         >
//           <input
//             type="text"
//             autoFocus
//             placeholder=""
//             {...registerOut("rfid_uid")}
//             ref={(e) => {
//               registerOut("rfid_uid").ref(e);
//               inputRefOut.current = e;
//             }}
//             onChange={(e) => handleChange(e, "time_out")}
//             className={cn(
//               "border-none bg-transparent text-white dark:text-black focus:outline-none focus:ring-0 absolute top-0 left-0 "
//             )}
//           />
//         </form>
//       )}
//     </div>
//   );
// }
