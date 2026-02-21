"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import SplitText from "@/components/animata/text/split-text";
import { cn } from "@/lib/utils";

import { AttendanceTap } from "@/services/Attendance";
import { useAuth } from "@/context/AuthContext";
import { useGetStudentDetailsByLrn } from "@/hooks/useStudentDetails";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type FormData = { rfid_uid: string };

function pickTapType(resp: any): "TIME IN" | "TIME OUT" | "-" {
  const msg = String(resp?.message ?? "").toUpperCase();
  const remarks = String(resp?.remarks ?? "").toUpperCase();

  if (msg.includes("TIME OUT") || remarks.includes("OUT")) return "TIME OUT";
  if (msg.includes("TIME IN") || remarks.includes("IN")) return "TIME IN";
  return "-";
}

function pickTapTime(resp: any, tapType: "TIME IN" | "TIME OUT" | "-") {
  // backend might return time_in/time_out, or only time_in on TIME IN
  const timeIn = resp?.time_in ?? resp?.data?.time_in ?? null;
  const timeOut = resp?.time_out ?? resp?.data?.time_out ?? null;

  if (tapType === "TIME OUT") return timeOut || timeIn || null;
  if (tapType === "TIME IN") return timeIn || null;
  return null;
}

function getCurrentTapTime() {
  return new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

function buildStudentName(student: any) {
  if (!student) return "";
  const first = student?.first_name ?? "";
  const middle = student?.middle_name ?? "";
  const last = student?.last_name ?? "";
  const suffix = student?.suffix ?? "";
  return [first, middle, last, suffix].filter(Boolean).join(" ").trim();
}

function resolveAvatarUrl(studentJson: any, student: any) {
  // if API returns avatar_url
  const urlFromJson =
    studentJson?.avatar_url ||
    studentJson?.data?.student?.avatar_url ||
    studentJson?.data?.student?.student?.avatar_url;

  if (urlFromJson) return urlFromJson;

  // if resource has avatar filename
  const avatarFile =
    student?.avatar ||
    studentJson?.data?.student?.avatar ||
    studentJson?.data?.student?.student?.avatar;

  if (avatarFile) {
    return `https://rfid-api.barangay185bms.com/storage/avatars/${avatarFile}`;
  }

  return "";
}

export default function Attendance() {
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { token } = useAuth();

  const [lrn, setLrn] = useState<string>("");

  // tap response
  const [attendanceJson, setAttendanceJson] = useState<any>(null);

  // ui states
  const [tapType, setTapType] = useState<"TIME IN" | "TIME OUT" | "-">("-");
  const [tapTime, setTapTime] = useState<string>("");

  // lock after tap
  const [cooldown, setCooldown] = useState<number>(0); // seconds left

  const { register, handleSubmit, reset, setValue } = useForm<FormData>();

  const { data: studentJson } = useGetStudentDetailsByLrn(token, lrn);

  const student = useMemo(() => {
    return (
      studentJson?.data?.student ?? studentJson?.data?.student?.student ?? null
    );
  }, [studentJson]);

  const fullName = useMemo(() => buildStudentName(student), [student]);

  const avatarUrl = useMemo(
    () => resolveAvatarUrl(studentJson, student),
    [studentJson, student],
  );

  // ready state: show "READY TO TAP" when no tap response
  const isReady = !attendanceJson;

  // Always focus input
  useEffect(() => {
    inputRef.current?.focus();
    const focusInput = () => inputRef.current?.focus();
    document.addEventListener("click", focusInput);
    return () => document.removeEventListener("click", focusInput);
  }, []);

  // cooldown ticker
  useEffect(() => {
    if (cooldown <= 0) return;

    const id = setInterval(() => {
      setCooldown((s) => Math.max(0, s - 1));
    }, 1000);

    return () => clearInterval(id);
  }, [cooldown]);

  // auto reset after cooldown ends
  useEffect(() => {
    if (cooldown !== 0) return;

    // when cooldown hits 0, reset UI back to READY
    if (attendanceJson) {
      setAttendanceJson(null);
      setTapType("-");
      setTapTime("");
      setLrn("");
    }
  }, [cooldown]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = async (data: FormData) => {
    if (!data?.rfid_uid) return;

    // block taps during cooldown
    if (cooldown > 0) {
      reset({ rfid_uid: "" });
      inputRef.current?.focus();
      return;
    }

    const RFID = data.rfid_uid.trim();
    if (!RFID) return;

    try {
      const response = await AttendanceTap(RFID);

      toast.success(response.message || "Attendance recorded.");

      setAttendanceJson(response);

      // detect tap type
      const type = pickTapType(response);
      setTapType(type);

      // ✅ Tap time from FRONTEND
      setTapTime(getCurrentTapTime());

      // LRN from response
      const newLrn = response?.lrn ?? response?.student?.lrn ?? "";
      setLrn(newLrn);

      // lock for 5 seconds
      setCooldown(5);
    } catch (err: any) {
      if (err?.response?.data?.message) toast.error(err.response.data.message);
      else toast.error("Attendance tap failed.");
    } finally {
      reset({ rfid_uid: "" });
      inputRef.current?.focus();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue("rfid_uid", value);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      handleSubmit(onSubmit)();
    }, 100);
  };

  return (
    <div className="grid grid-cols-5 p-10 min-h-screen items-center justify-center gap-6">
      <div className="col-span-3">
        <div className="flex flex-col items-center gap-4 justify-center">
          <img src="/logo.png" alt="logo" className="w-32 h-32" />
          <SplitText text="Young Generation Academy" />
          <h1 className="text-4xl font-bold mb-5 text-sky-200">
            Attendance Monitoring System
          </h1>
          <p className="text-sm px-5 py-2 bg-zinc-200 dark:bg-zinc-900 rounded-full animate-bounce">
            Tap your RFID to mark your attendance
          </p>
          <div className="text-sm opacity-70 mt-1 text-primary">
            {cooldown > 0
              ? `Cooling down for (${cooldown}s) to tap.`
              : "Ready to tap."}
          </div>
        </div>

        {/* Hidden RFID Input */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            autoFocus
            {...register("rfid_uid")}
            ref={(e) => {
              register("rfid_uid").ref(e);
              inputRef.current = e;
            }}
            onChange={handleChange}
            className={cn(
              "border-none bg-transparent focus:outline-none absolute -top-20 left-0 w-96",
            )}
          />
        </form>
      </div>

      {/* Right Panel */}
      <div className="w-full h-full bg-accent/20 p-5 rounded-xl col-span-2">
        <div className="rounded-xl p-4">
          <div className="flex items-start justify-between gap-3 mb-10">
            <div>
              <div className="text-sm font-bold">
                Student Attendance Information
              </div>
            </div>

            <div
              className={cn(
                "text-xs font-semibold px-3 py-1 rounded-full border",
                tapType === "TIME IN"
                  ? "bg-green-500/10 text-green-600 border-green-500/30"
                  : tapType === "TIME OUT"
                    ? "bg-red-500/10 text-red-600 border-red-500/30"
                    : "bg-zinc-500/10 text-zinc-600 border-zinc-500/30",
              )}
            >
              {tapType}
            </div>
          </div>

          {/* READY VIEW */}
          {isReady ? (
            <div className="flex flex-col items-center justify-center gap-4 py-10">
              <Avatar className="size-50">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  className="grayscale"
                  alt="ready"
                />
                <AvatarFallback>RD</AvatarFallback>
              </Avatar>

              <div className="text-center">
                <div className="text-xl font-semibold">READY TO TAP</div>
                <div className="text-sm opacity-70 mt-1">
                  Tap your RFID to show student info
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* STUDENT VIEW */}
              <div className="mt-4 flex flex-col items-center gap-3">
                <Avatar className="size-50">
                  <AvatarImage
                    src={avatarUrl || "https://github.com/shadcn.png"}
                    alt="avatar"
                    className={`${!avatarUrl ? "grayscale" : ""}`}
                  />
                  <AvatarFallback>
                    {fullName ? fullName.slice(0, 2).toUpperCase() : "ST"}
                  </AvatarFallback>
                </Avatar>

                <div className="flex flex-col items-center">
                  <span className="text-lg font-semibold">
                    {fullName || "Student"}
                  </span>

                  <div className="my-5 flex items-center justify-between gap-6">
                    <span className="text-md opacity-70">
                      {student?.grade?.grade_level
                        ? student.grade.grade_level
                        : student?.grade
                          ? `Grade ${student.grade}`
                          : "Grade"}
                    </span>

                    <span className="text-md opacity-70">
                      {student?.section?.section_name
                        ? student.section.section_name
                        : "Section"}
                    </span>
                  </div>
                </div>

                {/* bottom time display */}
                <div className="w-full mt-3 p-4 rounded-xl border bg-zinc-100/50 dark:bg-zinc-900/50">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">
                      {tapType === "TIME IN" ? "Time In" : "Time Out"}
                    </span>

                    <span className="text-sm opacity-80">{tapTime || "-"}</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
