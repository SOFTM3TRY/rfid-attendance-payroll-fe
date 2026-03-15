import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface FlipCardProps {
  data: {
    name: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    suffix: string;
    lrn: string;
    school_year: string;
    grade_id: string;
    section: string;
    rfid_uid: string;
  };
  rotate?: "x" | "y";
}

export default function FlipCardUI({ data, rotate = "y" }: FlipCardProps) {
  const rotationClass = {
    x: [
      "group-hover:[transform:rotateX(180deg)]",
      "[transform:rotateX(180deg)]",
    ],
    y: [
      "group-hover:[transform:rotateY(180deg)]",
      "[transform:rotateY(180deg)]",
    ],
  };
  const self = rotationClass[rotate];

  return (
    <div className={cn("group h-96 w-80 [perspective:1000px]")}>
      <div
        className={cn(
          "relative h-full rounded-2xl transition-all duration-500 [transform-style:preserve-3d]",
          self[0],
          data.rfid_uid ? "" : "animate-pulse"
        )}
      >
        {/* Front */}
        <div className="absolute max-h-[450px] w-full rounded-2xl bg-white border p-1 shadow-lg text-slate-200 [backface-visibility:hidden]">
          <div className="bg-gradient-to-r from-teal-700 to-sky-700 w-full h-30 rounded-t-xl"></div>

          <img
            src="/logo.png"
            alt="logo"
            className="w-15 h-15 absolute top-15 right-0 transform -translate-x-1/2 -translate-y-1/2"
          />

          <Avatar className="h-25 w-25 flex-shrink-0 absolute top-30 left-1/4 transform -translate-x-1/2 -translate-y-1/2 border-4 border-white">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="text-start mt-5 text-black px-3 ml-30">
            <p className="font-medium text-lg">
              {data.first_name} {data.middle_name} {data.last_name} {data.suffix}
            </p>
            <p className="">
              {data.school_year}
            </p>
          </div>

          <div className="text-start mt-10 text-black px-10 flex items-center justify-between">
            <p className="font-medium text-lg text-center">
              <span> Grade
              {data.grade_id === "1"
                ? " One"
                : data.grade_id === "2"
                ? " Two"
                : data.grade_id === "3"
                ? " Three"
                : data.grade_id === "4"
                ? " Four"
                : data.grade_id === "5"
                ? " Five"
                : data.grade_id === "6"
                ? " Six"
                : ""}</span> <br />
                <span className="text-sm">Grade</span>
            </p>
            <p className="font-medium text-lg text-center">
              <span>{data.section}</span> <br /> <span className="text-sm">section</span>
            </p>
          </div>
          
            <div className="bg-gradient-to-r mt-9 from-teal-700 to-sky-700 w-full h-12 rounded-b-xl"></div>
        </div>

        {/* Back */}
        <div
          className={cn(
            "absolute h-full w-full rounded-2xl bg-white border shadow-lg p-4 [backface-visibility:hidden]",
            self[1]
          )}
        >
          <div className="flex min-h-full flex-col gap-2 text-black">
            Back of the id
          </div>
        </div>
      </div>
    </div>
  );
}
