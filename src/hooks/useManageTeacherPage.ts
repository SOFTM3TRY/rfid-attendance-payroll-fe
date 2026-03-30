import { useCallback, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import { useSession } from "@/context/SessionContext";
import { useAllTeachers } from "@/hooks/useTeacher";
import type { TeacherData } from "@/types/Teacher";

function normalizeTeacher(rawTeacher: unknown): TeacherData | null {
  if (!rawTeacher || typeof rawTeacher !== "object") {
    return null;
  }

  const teacher = rawTeacher as Partial<TeacherData>;

  if (typeof teacher.id !== "number") {
    return null;
  }

  return {
    id: teacher.id,
    avatar: teacher.avatar ?? null,
    employee_no: teacher.employee_no ?? "",
    rfid_uid: teacher.rfid_uid ?? null,
    first_name: teacher.first_name ?? "",
    last_name: teacher.last_name ?? "",
    middle_name: teacher.middle_name ?? null,
    suffix: teacher.suffix ?? null,
    contact_no: teacher.contact_no ?? "",
    status: teacher.status === "1" ? "1" : "0",
    role_id: typeof teacher.role_id === "number" ? teacher.role_id : 0,
    email: teacher.email ?? "",
    additional_info: teacher.additional_info ?? null,
    grade: teacher.grade ?? null,
    section: teacher.section ?? null,
  };
}

export function useManageTeacherPage() {
  const { token } = useAuth();
  const { isLoading: isSessionLoading } = useSession();
  const teachersQuery = useAllTeachers(token);

  const teachers = useMemo(() => {
    const teacherList = Array.isArray(teachersQuery.data?.data)
      ? (teachersQuery.data.data as unknown[])
      : [];

    return teacherList
      .map((teacher) => normalizeTeacher(teacher))
      .filter((teacher): teacher is TeacherData => teacher !== null);
  }, [teachersQuery.data]);

  const isLoading = isSessionLoading || teachersQuery.isLoading;
  const isRefreshing = teachersQuery.isFetching && !teachersQuery.isLoading;

  const refresh = useCallback(() => {
    void teachersQuery.refetch();
  }, [teachersQuery]);

  return {
    teachers,
    isLoading,
    isRefreshing,
    isError: teachersQuery.isError,
    refresh,
  };
}
