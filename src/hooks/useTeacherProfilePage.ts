import { useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTeacherDetails } from "@/hooks/useTeacher";
import { useHistoryLogsByUser } from "@/hooks/useHistoryLogsByUser";
import { extractHistoryLogs } from "@/lib/history-log";
import type { HistoryLogRecord } from "@/types/history-log";
import type { TeacherData, TeacherSubjectAssignment } from "@/types/Teacher";

type TeacherDetailsResponse = {
  data?: {
    teacher?: TeacherData[] | null;
  } | null;
};

function buildTeacherFullName(teacher: TeacherData | null) {
  if (!teacher) {
    return "Unknown";
  }

  return `${teacher.last_name}, ${teacher.first_name} ${teacher.middle_name || ""} ${
    teacher.suffix || ""
  }`.trim();
}

export function useTeacherProfilePage(teacherId: string) {
  const { token } = useAuth();
  const teacherQuery = useTeacherDetails(token, { id: teacherId });
  const historyLogsQuery = useHistoryLogsByUser(token, teacherId);

  const teacherResponse = teacherQuery.data as TeacherDetailsResponse | undefined;
  const teacher = teacherResponse?.data?.teacher?.[0] ?? null;

  const fullName = useMemo(() => buildTeacherFullName(teacher), [teacher]);
  const teacherSubjects = useMemo(
    () =>
      (Array.isArray(teacher?.teacher_subjects)
        ? teacher.teacher_subjects
        : []) as TeacherSubjectAssignment[],
    [teacher],
  );
  const historyLogs = useMemo(
    () => extractHistoryLogs(historyLogsQuery.data) as HistoryLogRecord[],
    [historyLogsQuery.data],
  );

  return {
    teacher,
    fullName,
    teacherSubjects,
    historyLogs,
    refetchTeacher: teacherQuery.refetch,
    isLoading: teacherQuery.isLoading || historyLogsQuery.isLoading,
  };
}
