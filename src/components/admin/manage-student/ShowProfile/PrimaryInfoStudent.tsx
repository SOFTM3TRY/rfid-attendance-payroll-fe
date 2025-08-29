// PrimaryInfo.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function PrimaryInfo({
  data,
  fullName,
}: {
  data: any;
  fullName: string;
}) {
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
          LRN: {data.lrn}{" "}
          <span className="ml-3 text-blue-800 font-medium dark:text-blue-200">
            SY: {data.school_year}
          </span>
        </p>
        <div className="flex gap-2 mt-2">
          <span className="uppercase font-medium text-sm px-3 h-6 flex items-center justify-center rounded-full bg-green-200 shadow text-green-900 dark:bg-green-100 dark:text-green-800">
            Grade: {data.grade_id === "1"
              ? "Grade One"
              : data.grade_id === "2"
              ? "Grade Two"
              : data.grade_id === "3"
              ? "Grade Three"
              : data.grade_id === "4"
              ? "Grade Four"
              : data.grade_id === "5"
              ? "Grade Five"
              : data.grade_id === "6"
              ? "Grade Six"
              : data.grade_id}
          </span>
          <span className="uppercase font-medium text-sm px-3 h-6 flex items-center justify-center rounded-full bg-green-200 shadow text-green-900 dark:bg-green-100 dark:text-green-800">
            Section: {data.section}
          </span>
        </div>
      </div>
    </div>
  );
}
