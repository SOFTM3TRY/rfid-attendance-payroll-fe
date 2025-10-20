import { useMemo, useState } from "react";
import { PaginationState } from "@tanstack/react-table";
import { TeacherTable } from "@/app/admin/manage-teacher/page/TeacherTable";
import { Teacher, columns } from "@/app/admin/manage-teacher/page/columns";
import { useAllTeachers } from "@/hooks/useTeacher";
import { useAuth } from "@/context/AuthContext";
import AddTeacher from "@/app/admin/manage-teacher/page/AddTeacher/AddTeacher";
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
      id: teacher.id,
      employee_number: teacher.employee_no,
      first_name: teacher.first_name,
      middle_name: teacher.middle_name,
      last_name: teacher.last_name,
      suffix: teacher.suffix,
      grade: teacher.additional_info?.grade
        ? (teacher.additional_info.grade === "1"
          ? "Grade One"
          : teacher.additional_info.grade === "2"
          ? "Grade Two"
          : teacher.additional_info.grade === "3"
          ? "Grade Three"
          : teacher.additional_info.grade === "4"
          ? "Grade Four"
          : teacher.additional_info.grade === "5"
          ? "Grade Five"
          : teacher.additional_info.grade === "6"
          ? "Grade Six"
          : null)
        : null,
      section: teacher.additional_info?.section ? teacher.additional_info.section : null,
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
