import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { AdvisoryTeacher } from "@/types/advisory";

type AdvisoryTeacherProfileCardProps = {
  teacher: AdvisoryTeacher | null;
  fullName: string;
};

export function AdvisoryTeacherProfileCard({
  teacher,
  fullName,
}: AdvisoryTeacherProfileCardProps) {
  const isActive = teacher?.status === "1";
  const avatarFallback = fullName
    .split(",")
    .join(" ")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((value) => value[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <div className="z-2 w-full rounded-xl bg-accent/20 px-5 py-5 shadow-lg xl:w-[380px]">
      <div className="flex flex-col items-center gap-5">
        <div className="relative h-30 w-30">
          <Avatar className="h-30 w-30 rounded-lg">
            <AvatarImage
              src={teacher?.avatar || undefined}
              className="rounded-lg hover:grayscale-100 transition-all duration-300"
              draggable="false"
            />
            <AvatarFallback>{avatarFallback || "NA"}</AvatarFallback>
          </Avatar>
        </div>

        <div className="flex flex-col items-center gap-4">
          <span className="flex flex-col items-center gap-2">
            <p className="text-center text-sm font-semibold uppercase leading-none">
              {fullName}
            </p>
            <span className="text-sm">
              {teacher?.employee_no || "N/A"}{" "}
              <span
                className={isActive ? "text-sm text-green-500" : "text-sm text-red-500"}
              >
                {isActive ? "Active" : "Inactive"}
              </span>
            </span>
          </span>

          <p className="my-1 flex flex-col items-center text-sm">
            <span className="text-xs">School Year</span>
            <span className="font-medium text-blue-800 dark:text-blue-200">
              {teacher?.additional_info?.school_year || "N/A"}
            </span>
          </p>

          <div className="mt-2 flex gap-2">
            <span className="flex h-6 items-center justify-center rounded-full bg-primary px-3 text-sm font-medium uppercase text-white">
              {teacher?.grade?.grade_level || "N/A"}
            </span>
            <span className="flex h-6 items-center justify-center rounded-full bg-primary px-3 text-sm font-medium uppercase text-white">
              {teacher?.section?.section_name || "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
