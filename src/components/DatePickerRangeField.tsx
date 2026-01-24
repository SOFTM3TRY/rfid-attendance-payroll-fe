"use client";

import * as React from "react";
import { format } from "date-fns";
import { type DateRange } from "react-day-picker";

import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";

function toYMD(d: Date) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function DatePickerRangeField({
  label = "Date Range",
  value,
  onChange,
}: {
  label?: string;
  value?: { from?: string; to?: string };
  onChange: (next: { start_date: string; end_date: string }) => void;
}) {
  const selected: DateRange | undefined = React.useMemo(() => {
    return {
      from: value?.from ? new Date(`${value.from}T00:00:00`) : undefined,
      to: value?.to ? new Date(`${value.to}T00:00:00`) : undefined,
    };
  }, [value?.from, value?.to]);

  const handleSelect = (range: DateRange | undefined) => {
    const from = range?.from;
    const to = range?.to;

    if (!from) {
      onChange({ start_date: "", end_date: "" });
      return;
    }

    const start = toYMD(from);
    const end = to ? toYMD(to) : toYMD(from);

    onChange({ start_date: start, end_date: end });
  };

  return (
    <Field className="w-full">
      <div className="flex items-center justify-between my-3">
        <FieldLabel>{label}</FieldLabel>

        {/* selected text */}
        <div className="text-xs text-muted-foreground">
          {selected?.from ? (
            selected.to ? (
              <>
                {format(selected.from, "LLL dd, y")} -{" "}
                {format(selected.to, "LLL dd, y")}
              </>
            ) : (
              <>{format(selected.from, "LLL dd, y")}</>
            )
          ) : (
            <>No date selected</>
          )}
        </div>
      </div>

      {/* ✅ INLINE calendar (no popover = no auto close issue) */}
      <div className="rounded-md border p-2 overflow-y-auto">
        <Calendar
          mode="range"
          selected={selected}
          onSelect={handleSelect}
          numberOfMonths={2}
          defaultMonth={selected?.from}
        />
      </div>
    </Field>
  );
}
