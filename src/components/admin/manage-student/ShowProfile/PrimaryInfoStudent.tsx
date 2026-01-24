"use client";

import { useAuth } from "@/context/AuthContext";
import { useGetStudentDetailsByLrn } from "@/hooks/useStudentDetails";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function PrimaryInfo({ lrn }: { lrn: string }) {
  const { token } = useAuth();

  const { data, isLoading, isError } = useGetStudentDetailsByLrn(token, lrn);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading student details</div>;

  const student = data?.data?.student;

  const fullName = `${student?.first_name ?? ""} ${student?.middle_name ?? ""} ${student?.last_name ?? ""}`.trim();

  return (
    <div className="bg-accent/20 flex gap-5 items-center justify-center rounded-lg p-5">
      <Avatar className="h-30 w-30 flex-shrink-0">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div className="flex flex-col gap-1">
        <p className="text-xl font-semibold leading-none uppercase">
          {fullName || "—"}
        </p>
        <p className="text-xs my-2 font-semibold leading-none">
          {student?.email || "—"}
        </p>

        <p className="text-xs my-1">
          LRN: {student?.lrn || "—"}{" "}
          <span className="ml-3 text-blue-800 font-medium dark:text-blue-200">
            SY: {student?.school_year || "—"}
          </span>
        </p>

        <div className="flex gap-2 mt-2">
          <span className="uppercase font-medium text-xs px-3 h-6 flex items-center justify-center rounded-full bg-accent">
            {student?.grade?.grade_level || "—"}
          </span>
          <span className="uppercase font-medium text-xs px-3 h-6 flex items-center justify-center rounded-full bg-accent">
            {student?.section?.section_name || "—"}
          </span>
        </div>
      </div>
    </div>
  );
}
