import { useMemo, useState } from "react";
import { PaginationState } from "@tanstack/react-table";
import { TeacherTable } from "@/components/admin/manage-teacher/TeacherTable";
import { Teacher, columns } from "@/components/admin/manage-teacher/columns";
import { useAllTeachers } from "@/hooks/useTeacher";
import { useAuth } from "@/context/AuthContext";
import AddTeacher from "@/components/admin/manage-teacher/AddTeacher/AddTeacher";
import { Table2 } from "lucide-react";

export function TeacherTableContainer() {
  const { token } = useAuth();
  const { data: apiData, isLoading, isError } = useAllTeachers(token);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const teacherList = useMemo(() => {
    return Array.isArray(apiData?.data) ? apiData.data : [];
  }, [apiData]);

  const mappedTeachers = useMemo<Teacher[]>(() => {
    return teacherList.map((teacher: any) => ({
      employee_number: teacher.employee_no,
      first_name: teacher.first_name,
      middle_name: teacher.middle_name,
      last_name: teacher.last_name,
      suffix: teacher.suffix,
      grade_id: parseInt(teacher.grade_id),
      section: teacher.section,
      status: teacher.status,
    }));
  }, [teacherList]);

  if (isLoading)
    return <p className="text-center mt-10">Loading...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load teachers.
      </p>
    );

  return (
    <div className="" style={{ pointerEvents: "auto" }}>
      <div className="flex justify-between items-center mb-10">
        <p className="flex items-center gap-1">
          <Table2 className="w-6 h-6 text-violet-500" />
          Teachers Table
        </p>
        <AddTeacher />
      </div>

      <TeacherTable
        columns={columns}
        data={mappedTeachers}              
        pagination={pagination}
        setPagination={setPagination}
        totalRows={mappedTeachers.length}
      />
    </div>
  );
}

export default TeacherTableContainer;
