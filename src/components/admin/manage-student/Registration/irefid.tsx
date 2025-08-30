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
          self[0]
        )}
      >
        {/* Front */}
        <div className="absolute h-full w-full rounded-2xl bg-black/80 dark:bg-zinc-800 dark:border dark:border-zinc-600 p-4 text-slate-200 [backface-visibility:hidden]">
          <Avatar className="h-30 w-30 flex-shrink-0">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="absolute bottom-4 left-4 text-xl font-bold ">
            {data.first_name}
          </div>
        </div>

        {/* Back */}
        <div
          className={cn(
            "absolute h-full w-full rounded-2xl bg-black/80 dark:bg-zinc-800 dark:border dark:border-zinc-600 p-4 text-slate-200 [backface-visibility:hidden]",
            self[1]
          )}
        >
          <div className="flex min-h-full flex-col gap-2">
            <h1 className="text-xl font-bold text-white">{data.lrn}</h1>
            <p className="mt-1 border-t border-t-gray-200 py-4 text-base font-medium leading-normal text-gray-100">
              {data.last_name}, {data.first_name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
