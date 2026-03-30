import { useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTeacherDetails } from "@/hooks/useTeacher";
import { useAttendanceBySection } from "@/hooks/useAttendanceBySection";
import type { AttendanceRecord } from "@/types/attendance";
import type {
  AdvisorySubject,
  AdvisoryTeacher,
  AdvisoryTeacherDetailsResponse,
} from "@/types/advisory";
import type { Student } from "@/types/Student";

function buildTeacherFullName(teacher: AdvisoryTeacher | null) {
  if (!teacher) return "Unknown";

  return `${teacher.last_name}, ${teacher.first_name} ${teacher.middle_name || ""} ${
    teacher.suffix || ""
  }`.trim();
}

export function useAdvisoryClassPage(teacherId: string) {
  const { token } = useAuth();
  const teacherQuery = useTeacherDetails(token, { id: teacherId });

  const response = teacherQuery.data as AdvisoryTeacherDetailsResponse | undefined;
  const teacher = (response?.data?.teacher?.[0] ?? null) as AdvisoryTeacher | null;
  const students = (Array.isArray(response?.data?.students)
    ? response?.data?.students
    : []) as Student[];
  const subjects = (Array.isArray(teacher?.subjects)
    ? teacher.subjects
    : []) as AdvisorySubject[];

  const sectionId = teacher?.section?.id ? String(teacher.section.id) : "";
  const attendanceQuery = useAttendanceBySection(token, sectionId);
  const attendanceRecords = useMemo(
    () =>
      (Array.isArray(attendanceQuery.data?.data)
        ? attendanceQuery.data.data
        : []) as AttendanceRecord[],
    [attendanceQuery.data],
  );

  const fullName = useMemo(() => buildTeacherFullName(teacher), [teacher]);

  const isLoading =
    teacherQuery.isLoading || (!!sectionId && attendanceQuery.isLoading);

  return {
    token,
    teacher,
    students,
    subjects,
    sectionId,
    attendanceRecords,
    fullName,
    isLoading,
    isError: teacherQuery.isError,
  };
}
