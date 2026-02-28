"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PaginationState } from "@tanstack/react-table";

import { TeacherTable } from "@/app/manage-teacher/page/TeacherTable";
import { columns } from "@/app/manage-teacher/page/columns";

import { useAllTeachers } from "@/hooks/useTeacher";
import { useAuth } from "@/context/AuthContext";

import AddTeacher from "@/app/manage-teacher/page/AddTeacher/AddTeacher";
import { Table2 } from "lucide-react";
import { TeacherData } from "@/types/Teacher";

import EditTeacher from "./EditTeacher/EditTeacher";
import ChangePasswordDialog from "./ChangePasswordDialog";

// ✅ NEW dialog
import AddTeacherSubjectDialog from "./AddTeacherSubjectDialog";

export function TeacherTableContainer() {
  const router = useRouter();
  const { token } = useAuth();

  const { data: apiData, isLoading, isError, refetch, isFetching } = useAllTeachers(token);

  const [editOpen, setEditOpen] = useState(false);
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(null);

  // ✅ Change password state
  const [passOpen, setPassOpen] = useState(false);
  const [passTeacherId, setPassTeacherId] = useState<string | null>(null);
  const [passTeacherName, setPassTeacherName] = useState<string>("");

  // ✅ Add Subject state
  const [subjectOpen, setSubjectOpen] = useState(false);
  const [subjectTeacherId, setSubjectTeacherId] = useState<string | null>(null);
  const [subjectTeacherName, setSubjectTeacherName] = useState<string>("");

  const handlePasswordChange = (teacherId: string, name?: string) => {
    setPassTeacherId(teacherId);
    setPassTeacherName(name || "");
    setPassOpen(true);
  };

  const handleAddSubject = (teacherId: string, name?: string) => {
    setSubjectTeacherId(teacherId);
    setSubjectTeacherName(name || "");
    setSubjectOpen(true);
  };

  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 5 });

  const teacherList = useMemo(() => (Array.isArray(apiData?.data) ? apiData.data : []), [apiData]);

  const mappedTeachers = useMemo<TeacherData[]>(() => {
    return teacherList.map((teacher: any) => ({
      id: teacher.id,
      employee_no: teacher.employee_no,
      rfid_uid: teacher.rfid_uid,
      first_name: teacher.first_name,
      last_name: teacher.last_name,
      middle_name: teacher.middle_name,
      suffix: teacher.suffix,
      contact_no: teacher.contact_no,
      status: teacher.status,
      role_id: teacher.role_id,
      email: teacher.email,
      additional_info: teacher.additional_info,
      grade: teacher.grade,
      section: teacher.section,
      avatar: teacher.avatar,
    }));
  }, [teacherList]);

  return (
    <div style={{ pointerEvents: "auto" }}>
      <div className="flex justify-between items-center mb-10">
        <p className="flex items-center gap-1 text-sm">
          <Table2 className="size-4 text-violet-500" />
          Teachers Table
        </p>
        <AddTeacher />
      </div>

      {isError ? (
        <p className="text-sm text-red-500 mb-3">Failed to load teachers. Click refresh.</p>
      ) : null}

      <TeacherTable
        columns={columns({
          onViewProfile: (teacherId: string) => router.push(`/manage-teacher/teacher-profile/${teacherId}`),
          onAdvisory: (teacherId: string) => router.push(`/manage-teacher/advisory-class/${teacherId}`),
          onEdit: (teacherId: string) => {
            setSelectedTeacherId(teacherId);
            setEditOpen(true);
          },
          onChangePassword: (teacherId: string, name?: string) => handlePasswordChange(teacherId, name),
          onAddSubject: (teacherId: string, name?: string) => handleAddSubject(teacherId, name),
        })}
        data={mappedTeachers}
        pagination={pagination}
        setPagination={setPagination}
        totalRows={mappedTeachers.length}
        isLoading={isLoading || isFetching}
        onRefresh={refetch}
      />

      {selectedTeacherId && (
        <EditTeacher open={editOpen} setOpen={setEditOpen} id={selectedTeacherId} />
      )}

      {passTeacherId && (
        <ChangePasswordDialog
          open={passOpen}
          setOpen={setPassOpen}
          userId={passTeacherId}
          userName={passTeacherName}
          type="teacher"
          onSuccess={() => {
            void refetch();
          }}
        />
      )}

      {subjectTeacherId && (
        <AddTeacherSubjectDialog
          open={subjectOpen}
          setOpen={setSubjectOpen}
          teacherId={subjectTeacherId}
          teacherName={subjectTeacherName}
          onSuccess={() => {
            void refetch();
          }}
        />
      )}
    </div>
  );
}

export default TeacherTableContainer;
