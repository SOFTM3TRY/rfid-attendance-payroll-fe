import { useMemo } from "react";
import { useAttendanceBySection } from "@/hooks/useAttendanceBySection";
import type {
  AttendanceRecord,
  WeeklyAttendanceAverage,
} from "@/types/attendance";

function normalizeAttendanceStatus(record: AttendanceRecord) {
  const raw = String(record.status ?? record.remarks ?? "").toUpperCase();

  if (raw.includes("LATE")) {
    return "late";
  }

  if (raw.includes("ABSENT")) {
    return "absent";
  }

  if (raw.includes("PRESENT") || raw.includes("ON TIME")) {
    return "present";
  }

  return "other";
}

function getWeekLabel(value?: string | null) {
  if (!value) {
    return "Unknown week";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Unknown week";
  }

  const start = new Date(date);
  start.setDate(date.getDate() - date.getDay());

  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  return `${start.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })} - ${end.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })}`;
}

export function useTeacherAttendanceAnalytics(
  token: string | null,
  section: string | null | undefined,
) {
  const query = useAttendanceBySection(token, section);

  const weeklyAverages = useMemo<WeeklyAttendanceAverage[]>(() => {
    const records = Array.isArray(query.data?.data) ? query.data.data : [];
    const weeklyMap = new Map<
      string,
      { present: number; late: number; absent: number; total: number }
    >();

    records.forEach((record) => {
      const week = getWeekLabel(record.date);
      const entry = weeklyMap.get(week) ?? {
        present: 0,
        late: 0,
        absent: 0,
        total: 0,
      };

      const normalized = normalizeAttendanceStatus(record);
      if (normalized === "present") {
        entry.present += 1;
      } else if (normalized === "late") {
        entry.late += 1;
      } else if (normalized === "absent") {
        entry.absent += 1;
      }

      entry.total += 1;
      weeklyMap.set(week, entry);
    });

    return Array.from(weeklyMap.entries()).map(([week, value]) => ({
      week,
      present: value.total ? Number((value.present / value.total).toFixed(2)) : 0,
      late: value.total ? Number((value.late / value.total).toFixed(2)) : 0,
      absent: value.total ? Number((value.absent / value.total).toFixed(2)) : 0,
    }));
  }, [query.data]);

  return {
    ...query,
    weeklyAverages,
  };
}
