"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAttendanceBySection } from "@/hooks/useAttendanceBySection";
import { useTeacherAttendanceAnalytics } from "@/hooks/useTeacherAttendanceAnalytics";
import { TeacherAttendanceAnalyticsChart } from "@/components/teacher/TeacherAttendanceAnalyticsChart";
import { AttendanceTable } from "@/components/attendance/AttendanceTable";

type TeacherSubjectRecord = {
  id?: number | string;
  section_id?: number | string | null;
  section_name?: string | null;
  subject_name?: string | null;
  [key: string]: unknown;
};

type TeacherAttendanceMonitorProps = {
  token: string | null;
  teacherSubjects: TeacherSubjectRecord[];
  advisorySectionId?: number | string | null;
  advisorySectionName?: string | null;
};

function buildSectionOptions(
  teacherSubjects: TeacherSubjectRecord[],
  advisorySectionId?: number | string | null,
  advisorySectionName?: string | null,
) {
  const map = new Map<
    string,
    { value: string; label: string; helper?: string }
  >();

  teacherSubjects.forEach((subject) => {
    const value = subject.section_id ? String(subject.section_id) : "";
    const sectionName = subject.section_name?.trim();

    if (!value || !sectionName) return;

    if (!map.has(value)) {
      map.set(value, {
        value,
        label: sectionName,
        helper: subject.subject_name?.trim() || undefined,
      });
    }
  });

  if (advisorySectionId) {
    const value = String(advisorySectionId);
    if (!map.has(value)) {
      map.set(value, {
        value,
        label: advisorySectionName?.trim() || "Advisory section",
      });
    }
  }

  return Array.from(map.values()).sort((left, right) =>
    left.label.localeCompare(right.label, undefined, { sensitivity: "base" }),
  );
}

export function TeacherAttendanceMonitor({
  token,
  teacherSubjects,
  advisorySectionId,
  advisorySectionName,
}: TeacherAttendanceMonitorProps) {
  const sectionOptions = useMemo(
    () =>
      buildSectionOptions(
        teacherSubjects,
        advisorySectionId,
        advisorySectionName,
      ),
    [teacherSubjects, advisorySectionId, advisorySectionName],
  );

  const [selectedSection, setSelectedSection] = useState("");

  useEffect(() => {
    if (!selectedSection && sectionOptions.length) {
      setSelectedSection(sectionOptions[0].value);
    }
  }, [sectionOptions, selectedSection]);

  const attendanceQuery = useAttendanceBySection(token, selectedSection);
  const analyticsQuery = useTeacherAttendanceAnalytics(token, selectedSection);

  if (!sectionOptions.length) {
    return (
      <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
        No class section is assigned to this teacher yet, so attendance cannot
        be shown.
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold">Attendance Records</h2>
          <p className="text-sm text-muted-foreground">
            View attendance records for the sections assigned to this teacher.
          </p>
        </div>

        <Select value={selectedSection} onValueChange={setSelectedSection}>
          <SelectTrigger className="w-[260px]">
            <SelectValue placeholder="Select a section" />
          </SelectTrigger>
          <SelectContent>
            {sectionOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <TeacherAttendanceAnalyticsChart
        data={analyticsQuery.weeklyAverages}
        isLoading={analyticsQuery.isLoading}
      />

      <AttendanceTable
        title="Attendance Records"
        description="This table shows the attendance records for the selected section."
        records={Array.isArray(attendanceQuery.data?.data) ? attendanceQuery.data.data : []}
        isLoading={attendanceQuery.isLoading}
        emptyMessage="No attendance records are available for this section yet."
      />
    </div>
  );
}
