import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface FlipCardProps {
  student: any;
  rotate?: "x" | "y";
}

export default function FlipCardUI({
  student,
  rotate = "y",
}: FlipCardProps) {
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
    student.last_name,
    student.first_name,
    student.middle_name,
    student.suffix,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="group h-110 w-100 [perspective:1000px]">
      {/* INNER */}
      <div
        className={cn(
          "relative h-full w-full rounded-2xl transition-transform duration-700",
          "[transform-style:preserve-3d]",
          rotationClass[rotate].hover
        )}
      >
        {/* FRONT */}
        <div className="absolute inset-0 rounded-2xl bg-white border p-1 shadow-lg [backface-visibility:hidden]">
          <div className="bg-gradient-to-r from-teal-700 to-sky-700 h-28 rounded-t-xl" />

          <img
            src="/logo.png"
            alt="logo"
            className="w-14 h-14 absolute top-6 right-6"
          />

          <Avatar className="h-24 w-24 absolute top-20 left-1/2 -translate-x-1/2 border-4 border-white">
            <AvatarImage src={student?.avatar ? `https://rfid-api.barangay185bms.com/storage/avatars/${student?.avatar}` : "https://github.com/shadcn.png"} />
            <AvatarFallback>
              {student.first_name?.[0]}
              {student.last_name?.[0]}
            </AvatarFallback>
          </Avatar>

          <div className="mt-20 text-center text-black px-4">
            <p className="font-semibold">{fullName}</p>
            <p className="text-sm">{student.school_year ?? "—"}</p>
          </div>

          <div className="mt-6 flex justify-between px-8 text-black">
            <div className="text-center">
              <p className="font-semibold">
                Grade {student.grade?.grade_level ?? "—"}
              </p>
              <span className="text-xs">Grade</span>
            </div>
            <div className="text-center">
              <p className="font-semibold">
                {student.section?.section_name ?? "—"}
              </p>
              <span className="text-xs">Section</span>
            </div>
          </div>

          <div className="absolute bottom-0 w-auto h-10 bg-gradient-to-r from-teal-700 to-sky-700 rounded-b-xl" />
        </div>

        {/* BACK */}
        <div
          className={cn(
            "absolute inset-0 rounded-2xl bg-white border shadow-lg p-4",
            "[backface-visibility:hidden]",
            rotationClass[rotate].back
          )}
        >
          <div className="text-sm text-black space-y-2">
            <p>
              Guardian First Name:{" "}
              {student.additional_info?.guardian_first_name ?? "N/A"}
            </p>
            <p>
              Guardian Middle Name:{" "}
              {student.additional_info?.guardian_middle_name ?? "N/A"}
            </p>
            <p>
              Guardian Last Name:{" "}
              {student.additional_info?.guardian_last_name ?? "N/A"}
            </p>
            <p>
              Guardian Contact:{" "}
              {student.additional_info?.guardian_contact ?? "N/A"}
            </p>
            <p>
              Guardian Email:{" "}
              {student.additional_info?.guardian_email ?? "N/A"}
            </p>
            <p>
              Guardian Occupation:{" "}
              {student.additional_info?.guardian_occupation ?? "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
