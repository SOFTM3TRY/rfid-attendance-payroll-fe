"use client";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type CardMode = "interactive" | "print-front" | "print-back";

export default function StudentIdCard({
  student,
  rotate = "y",
  mode = "interactive",
}: {
  student: any;
  rotate?: "x" | "y";
  mode?: CardMode;
}) {
  const rotationClass = {
    x: {
      hover: "group-hover:[transform:rotateX(180deg)]",
      back: "[transform:rotateX(180deg)]",
    },
    y: {
      hover: "group-hover:[transform:rotateY(180deg)]",
      back: "[transform:rotateY(180deg)]",
    },
  };

  const fullName = [
    student?.first_name,
    student?.middle_name,
    student?.last_name,
    student?.suffix,
  ]
    .filter(Boolean)
    .join(" ")
    .trim();

  const lrn = student?.lrn ?? "--";
  const gradeLabel = student?.grade?.grade_level
    ? `Grade ${student.grade.grade_level}`
    : `Grade ${student?.grade ?? "--"}`;
  const sectionLabel =
    student?.section?.section_name ?? student?.section ?? "--";
  const adviserName =
    student?.additional_info?.adviser_name ??
    student?.additional_info?.teacher_name ??
    "--";
  const avatarSrc = student?.avatar
    ? `https://rfid-api.barangay185bms.com/storage/avatars/${student.avatar}`
    : "https://github.com/shadcn.png";
  const guardianFullName = [
    student?.additional_info?.guardian_first_name,
    student?.additional_info?.guardian_middle_name,
    student?.additional_info?.guardian_last_name,
  ]
    .filter(Boolean)
    .join(" ")
    .trim();
  const guardianContact = student?.additional_info?.guardian_contact ?? "--";
  const guardianAddress = [
    student?.additional_info?.street,
    student?.additional_info?.barangay,
    student?.additional_info?.city,
    student?.additional_info?.province,
    student?.additional_info?.region,
  ]
    .filter(Boolean)
    .join(", ");

  const frontCard = (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border bg-white shadow-lg",
        mode === "interactive"
          ? "absolute inset-0 [backface-visibility:hidden]"
          : "relative h-full w-full",
      )}
    >
      <div className="relative h-[135px] bg-gradient-to-b from-sky-100 to-sky-200">
        <div className="absolute top-2 left-0 right-0 h-[2px] bg-sky-800/60" />

        <div className="px-4 pt-10 text-center">
          <p className="text-[22px] font-extrabold leading-none tracking-wide text-sky-900">
            YOUNG GENERATION ACADEMY
          </p>
          <p className="mt-2 text-[12px] font-semibold tracking-wide text-sky-900/80">
            870 MALARIA ROAD, CALOOCAN CITY
          </p>
        </div>
      </div>

      <div className="relative h-[345px] flex-1">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-500 to-sky-700" />
          <div className="absolute -top-12 -right-20 h-[220px] w-[420px] rotate-[-12deg] rounded-[100px] bg-white/15" />
          <div className="absolute top-10 -left-24 h-[260px] w-[460px] rotate-[10deg] rounded-[120px] bg-white/10" />
          <div className="absolute bottom-[-80px] left-[-120px] h-[260px] w-[520px] rotate-[12deg] rounded-[140px] bg-white/30" />
        </div>

        <img
          src="/logo.png"
          alt="logo"
          className="absolute top-5 left-4 h-20 w-20 rounded-full bg-white/70 p-1 shadow"
          draggable={false}
        />

        <div className="relative z-10 flex h-full items-center justify-center pt-4">
          <div className="relative">
            <div className="absolute -inset-3 rounded-full bg-white/30 blur-[2px]" />
            <Avatar className="h-44 w-44 rounded-full border-4 border-white shadow-xl">
              <AvatarImage
                src={avatarSrc}
                className="object-cover"
                draggable={false}
              />
              <AvatarFallback className="text-2xl">
                {student?.first_name?.[0]}
                {student?.last_name?.[0]}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className="absolute bottom-3 left-4 z-10 text-[12px] font-semibold text-slate-900/80">
          LRN: <span className="font-bold">{lrn}</span>
        </div>
      </div>

      <div className="relative h-[60px] bg-gradient-to-r from-sky-900 to-sky-700 px-4 py-3 text-center text-white">
        <p className="text-[18px] font-extrabold leading-tight tracking-wide">
          {fullName || "--"}
        </p>
        <p className="text-[12px] font-semibold opacity-95">
          {gradeLabel} - {sectionLabel}
        </p>
        <p className="text-[11px] opacity-90">{adviserName}</p>
      </div>
    </div>
  );

  const backCard = (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border bg-white p-5 shadow-lg",
        mode === "interactive"
          ? "absolute inset-0 [backface-visibility:hidden]"
          : "relative h-full w-full",
        mode === "interactive" && rotationClass[rotate].back,
      )}
    >
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.10]">
        <img
          src="/logo.png"
          alt="watermark"
          className="h-[260px] w-[260px]"
          draggable={false}
        />
      </div>

      <div className="relative z-10 flex h-full flex-col">
        <div className="text-center">
          <p className="text-[28px] font-light leading-tight tracking-wide text-slate-900">
            YOUNG GENERATION
          </p>
          <p className="text-[28px] font-light leading-tight tracking-wide text-slate-900">
            ACADEMY
          </p>
        </div>

        <div className="mt-4 px-2 text-center text-[12px] leading-relaxed text-slate-800">
          <p>
            Always follow the rules and regulations of this school. Always wear
            this ID inside the school premises. This card is non-transferable
            and should be returned at the end of the school year.
          </p>
          <p className="mt-5">
            This certifies that the bearer whose picture appears on this card
            is a student of
          </p>
          <p className="mt-2 font-extrabold tracking-wide">
            YOUNG GENERATION ACADEMY
          </p>
        </div>

        <div className="mt-5 rounded-full bg-black px-4 py-2 text-center text-[12px] font-semibold text-white">
          In case of emergency please notify:
        </div>

        <div className="mt-4 text-center text-slate-900">
          <p className="text-[16px] font-normal">{guardianFullName || "--"}</p>
          <p className="mt-2 text-[14px]">{guardianAddress || "--"}</p>
          <p className="mt-1 text-[14px]">{guardianContact}</p>
        </div>

        <div className="mt-auto pt-4 text-center">
          <p className="text-[26px] font-extrabold tracking-wide text-zinc-900">
            JUANA DELA CRUZ
          </p>
          <div className="mx-auto mt-2 h-[2px] w-[220px] bg-slate-900" />
          <p className="mt-2 text-[12px] font-semibold tracking-wider text-zinc-900">
            SCHOOL ADMINISTRATOR
          </p>
        </div>
      </div>
    </div>
  );

  if (mode === "print-front") {
    return <div className="student-id-card h-[540px] w-[620px]">{frontCard}</div>;
  }

  if (mode === "print-back") {
    return <div className="student-id-card h-[540px] w-[620px]">{backCard}</div>;
  }

  return (
    <div className="student-id-card group h-[540px] w-[620px] [perspective:1000px]">
      <div
        className={cn(
          "relative h-full w-full rounded-2xl transition-transform duration-700",
          "[transform-style:preserve-3d]",
          rotationClass[rotate].hover,
        )}
      >
        {frontCard}
        {backCard}
      </div>
    </div>
  );
}
