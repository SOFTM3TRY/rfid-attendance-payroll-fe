import { Book } from "lucide-react";
import type { AdvisorySubject } from "@/types/advisory";

export function AdvisorySubjectsCard({
  subjects,
}: {
  subjects: AdvisorySubject[];
}) {
  return (
    <div className="h-auto w-full rounded-lg bg-accent/20 p-4 xl:w-[380px]">
      <h2 className="mb-3 flex items-center text-sm">
        <Book className="mr-1 size-4" />
        Advisory Subjects
      </h2>

      <ul className="space-y-2 text-sm">
        {subjects.length ? (
          subjects.map((subject) => (
            <li
              key={String(subject.id)}
              className="rounded bg-accent/50 p-2 shadow transition hover:bg-accent"
            >
              <div className="font-medium">{subject.name}</div>
              {subject.schedule || subject.schedule_day ? (
                <p className="text-xs text-muted-foreground">
                  {[subject.schedule_day, subject.schedule].filter(Boolean).join(" • ")}
                </p>
              ) : null}
            </li>
          ))
        ) : (
          <li>No subjects available</li>
        )}
      </ul>
    </div>
  );
}
