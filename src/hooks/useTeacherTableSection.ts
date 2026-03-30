import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { PaginationState } from "@tanstack/react-table";
import { createTeacherTableColumns } from "@/components/manage-teacher/teacherTableColumns";
import type { TeacherData } from "@/types/Teacher";

type UseTeacherTableSectionArgs = {
  teachers: TeacherData[];
};

export function useTeacherTableSection({
  teachers,
}: UseTeacherTableSectionArgs) {
  const router = useRouter();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [editOpen, setEditOpen] = useState(false);
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(null);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [passwordTeacherId, setPasswordTeacherId] = useState<string | null>(null);
  const [passwordTeacherName, setPasswordTeacherName] = useState("");
  const [subjectOpen, setSubjectOpen] = useState(false);
  const [subjectTeacherId, setSubjectTeacherId] = useState<string | null>(null);
  const [subjectTeacherName, setSubjectTeacherName] = useState("");

  const handleViewProfile = useCallback(
    (teacherId: string) => {
      router.push(`/manage-teacher/teacher-profile/${teacherId}`);
    },
    [router],
  );

  const handleOpenAdvisory = useCallback(
    (teacherId: string) => {
      router.push(`/manage-teacher/advisory-class/${teacherId}`);
    },
    [router],
  );

  const handleOpenEdit = useCallback((teacherId: string) => {
    setSelectedTeacherId(teacherId);
    setEditOpen(true);
  }, []);

  const handleOpenPassword = useCallback((teacherId: string, name?: string) => {
    setPasswordTeacherId(teacherId);
    setPasswordTeacherName(name ?? "");
    setPasswordOpen(true);
  }, []);

  const handleOpenSubject = useCallback((teacherId: string, name?: string) => {
    setSubjectTeacherId(teacherId);
    setSubjectTeacherName(name ?? "");
    setSubjectOpen(true);
  }, []);

  const columns = useMemo(
    () =>
      createTeacherTableColumns({
        onEdit: handleOpenEdit,
        onViewProfile: handleViewProfile,
        onAdvisory: handleOpenAdvisory,
        onChangePassword: handleOpenPassword,
        onAddSubject: handleOpenSubject,
      }),
    [
      handleOpenAdvisory,
      handleOpenEdit,
      handleOpenPassword,
      handleOpenSubject,
      handleViewProfile,
    ],
  );

  return {
    columns,
    totalRows: teachers.length,
    pagination,
    setPagination,
    editDialog: {
      open: editOpen,
      setOpen: setEditOpen,
      teacherId: selectedTeacherId,
    },
    passwordDialog: {
      open: passwordOpen,
      setOpen: setPasswordOpen,
      teacherId: passwordTeacherId,
      teacherName: passwordTeacherName,
    },
    subjectDialog: {
      open: subjectOpen,
      setOpen: setSubjectOpen,
      teacherId: subjectTeacherId,
      teacherName: subjectTeacherName,
    },
  };
}
