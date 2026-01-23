 import { useRef, useState } from "react";

import { cn } from "@/lib/utils";

export default function SplitTextSide({
  text = "ANIMATA",
  className,
}: {
  text: string;
  className?: string;
})  {
  const [activeIndex, setIndex] = useState<number>();
  const timer = useRef<NodeJS.Timeout | null>(null);

  const letterClassName =
    "inline h-1/2 select-none overflow-y-hidden leading-none transition-all duration-300 ease-out whitespace-pre";

  return (
    <div
      className={cn(
        "relative mx-auto cursor-sword text-[12px] font-black uppercase text-teal-700 dark:text-teal-500",
        className,
      )}
    >
      {/** add hidden text so that we maintain the size for any text */}
      <div className="invisible leading-none">{text}</div>
      <div className="absolute top-0 flex h-full">
        {text.split("").map((letter, index) => (
          <div
            onMouseEnter={() => {
              if (timer.current) {
                clearTimeout(timer.current);
              }
              setIndex(index);
            }}
            onMouseLeave={() => {
              timer.current = setTimeout(() => {
                setIndex(undefined);
              });
            }}
            key={index}
            className="relative inline-flex h-full cursor-sword flex-col leading-none"
          >
            {/** top half */}
            <span
              className={cn(letterClassName, {
                "-translate-y-3": index === activeIndex,
                "-translate-y-2":
                  activeIndex !== undefined &&
                  (index === activeIndex - 1 || index === activeIndex + 1),
                "-translate-y-1":
                  activeIndex !== undefined &&
                  (index === activeIndex - 2 || index === activeIndex + 2),
              })}
            >
              {letter}
            </span>

            {/** bottom half */}
            <span
              className={cn(letterClassName, {
                "translate-y-3": index === activeIndex,
                "translate-y-2":
                  activeIndex !== undefined &&
                  (index === activeIndex - 1 || index === activeIndex + 1),
                "translate-y-1":
                  activeIndex !== undefined &&
                  (index === activeIndex - 2 || index === activeIndex + 2),
              })}
            >
              <span className="absolute -translate-y-1/2 leading-none">{letter}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
