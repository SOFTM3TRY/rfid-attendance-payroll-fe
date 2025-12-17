import { useMemo, useState } from "react";
import { PaginationState } from "@tanstack/react-table";
import { TeacherTable } from "@/app/admin/manage-teacher/page/TeacherTable";
import { columns } from "@/app/admin/manage-teacher/page/columns";
import { useAllTeachers } from "@/hooks/useTeacher";
import { useAuth } from "@/context/AuthContext";
import AddTeacher from "@/app/admin/manage-teacher/page/AddTeacher/AddTeacher";
import { Table2 } from "lucide-react";
import { TeacherData } from "@/types/Teacher";

import EditTeacher from "./EditTeacher/EditTeacher";

export function TeacherTableContainer() {
  const { token } = useAuth();
  const { data: apiData, isLoading, isError } = useAllTeachers(token);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(
    null
  );

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const teacherList = useMemo(() => {
    return Array.isArray(apiData?.data) ? apiData.data : [];
  }, [apiData]);

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
    }));
  }, [teacherList]);

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">Failed to load teachers.</p>
    );

  return (
    <div className="" style={{ pointerEvents: "auto" }}>
      <div className="flex justify-between items-center mb-10">
        <p className="flex items-center gap-1 text-sm">
          <Table2 className="size-4 text-violet-500" />
          Teachers Table
        </p>
        <AddTeacher />
      </div>

      <TeacherTable
        columns={columns({
          onEdit: (teacherId: string) => {
            setSelectedTeacherId(teacherId);
            setEditOpen(true);
          },
        })}
        data={mappedTeachers}
        pagination={pagination}
        setPagination={setPagination}
        totalRows={mappedTeachers.length}
      />

      {selectedTeacherId && (
        <EditTeacher
          open={editOpen}
          setOpen={setEditOpen}
          id={selectedTeacherId}
        />
      )}
    </div>
  );
}

export default TeacherTableContainer;
