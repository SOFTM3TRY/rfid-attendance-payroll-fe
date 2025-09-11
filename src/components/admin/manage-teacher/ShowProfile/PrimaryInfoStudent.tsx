import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useTeacherDetails } from "@/hooks/useTeacher";

export default function PrimaryInfo({
  id,
}: {
  id: string;
}) {
  const { token } = useAuth();
  const { data, isLoading, error } = useTeacherDetails(token, { id });

  const teacher = data?.data?.teacher?.[0] || null;
  const info = teacher?.additional_info || {};

  const fullName = teacher
    ? `${teacher.last_name}, ${teacher.first_name} ${teacher.middle_name || ""} ${teacher.suffix || ""}`
    : "Unknown";

  return (
    <div className="sticky top-0 shadow-lg dark:border-b-4 dark:border-black z-100 w-full py-5 flex justify-start rounded-md items-center px-5 gap-5 bg-zinc-100 dark:bg-zinc-900">
      <Avatar className="h-30 w-30 flex-shrink-0">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-xl font-semibold leading-none uppercase">
          {fullName}
        </p>
        <p className="text-sm my-1">
          LRN: {teacher?.employee_no || "N/A"}{" "}
          <span className="ml-3 text-blue-800 font-medium dark:text-blue-200">
            SY: {teacher?.school_year || "N/A"}
          </span>
        </p>
        <div className="flex gap-2 mt-2">
          <span className="uppercase font-medium text-sm px-3 h-6 flex items-center justify-center rounded-full bg-green-200 shadow text-green-900 dark:bg-green-100 dark:text-green-800">
           Grade: {info.grade === "1"
              ? "Grade One"
              : info.grade === "2"
              ? "Grade Two"
              : info.grade === "3"
              ? "Grade Three"
              : info.grade === "4"
              ? "Grade Four"
              : info.grade === "5"
              ? "Grade Five"
              : info.grade === "6"
              ? "Grade Six"
              : data.grade_id}
          </span>
          <span className="uppercase font-medium text-sm px-3 h-6 flex items-center justify-center rounded-full bg-green-200 shadow text-green-900 dark:bg-green-100 dark:text-green-800">
            Section: {info.section || "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
}
