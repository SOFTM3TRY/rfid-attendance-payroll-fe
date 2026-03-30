"use client";

import AddTeacher from "@/app/manage-teacher/page/AddTeacher/AddTeacher";
import AddTeacherSubjectDialog from "@/app/manage-teacher/page/AddTeacherSubjectDialog";
import ChangePasswordDialog from "@/app/manage-teacher/page/ChangePasswordDialog";
import EditTeacher from "@/app/manage-teacher/page/EditTeacher/EditTeacher";
import { TeacherTable } from "@/components/manage-teacher/TeacherTable";
import { useTeacherTableSection } from "@/hooks/useTeacherTableSection";
import { Table2 } from "lucide-react";
import type { TeacherData } from "@/types/Teacher";

type TeacherTableSectionProps = {
  teachers: TeacherData[];
  isLoading?: boolean;
  isRefreshing?: boolean;
  isError?: boolean;
  onRefresh: () => void;
};

export function TeacherTableSection({
  teachers,
  isLoading = false,
  isRefreshing = false,
  isError = false,
  onRefresh,
}: TeacherTableSectionProps) {
  const {
    columns,
    totalRows,
    pagination,
    setPagination,
    editDialog,
    passwordDialog,
    subjectDialog,
  } = useTeacherTableSection({ teachers });

  return (
    <div className="z-1 mt-10 h-full p-2">
      <div className="mb-10 flex items-center justify-between">
        <p className="flex items-center gap-1 text-sm">
          <Table2 className="size-4 text-violet-500" />
          Teachers Table
        </p>
        <AddTeacher />
      </div>

      {isError ? (
        <p className="mb-3 text-sm text-red-500">
          Failed to load teachers. Click refresh.
        </p>
      ) : null}

      <TeacherTable
        columns={columns}
        data={teachers}
        pagination={pagination}
        setPagination={setPagination}
        totalRows={totalRows}
        isLoading={isLoading}
        isRefreshing={isRefreshing}
        onRefresh={onRefresh}
      />

      {editDialog.teacherId ? (
        <EditTeacher
          open={editDialog.open}
          setOpen={editDialog.setOpen}
          id={editDialog.teacherId}
        />
      ) : null}

      {passwordDialog.teacherId ? (
        <ChangePasswordDialog
          open={passwordDialog.open}
          setOpen={passwordDialog.setOpen}
          userId={passwordDialog.teacherId}
          userName={passwordDialog.teacherName}
          type="teacher"
          onSuccess={onRefresh}
        />
      ) : null}

      {subjectDialog.teacherId ? (
        <AddTeacherSubjectDialog
          open={subjectDialog.open}
          setOpen={subjectDialog.setOpen}
          teacherId={subjectDialog.teacherId}
          teacherName={subjectDialog.teacherName}
          onSuccess={onRefresh}
        />
      ) : null}
    </div>
  );
}
