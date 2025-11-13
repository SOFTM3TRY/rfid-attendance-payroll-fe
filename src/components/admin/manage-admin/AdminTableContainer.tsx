"use client";

import { useMemo, useState } from "react";
import { PaginationState } from "@tanstack/react-table";
import { AdminTable } from "@/components/admin/manage-admin/AdminTable";
import { columns, Admin } from "@/components/admin/manage-admin/columns";
import AddAdmin from "@/components/admin/manage-admin/AddAdmin/AddAdmin";
import { useAllAdmins } from "@/hooks/useTeacher";
import { useAuth } from "@/context/AuthContext";
import { Table2 } from "lucide-react";

export function AdminTableContainer() {
  const { token } = useAuth();
  const { data: apiData, isLoading, isError } = useAllAdmins(token);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  // ✅ Extract raw admin list
  const adminList = useMemo(() => {
    return Array.isArray(apiData?.data) ? apiData.data : [];
  }, [apiData]);

  // ✅ Map to the correct table format
  const mappedAdmins = useMemo<Admin[]>(() => {
    return adminList.map((admin: any) => ({
      id: admin.id,
      employee_number: admin.employee_no,
      first_name: admin.first_name,
      middle_name: admin.middle_name,
      last_name: admin.last_name,
      suffix: admin.suffix,
      email: admin.email,
      contact_no: admin.contact_no,
      status: admin.status,
      role: admin.role?.role_name ?? "N/A",
      created_at: new Date(admin.created_at).toLocaleDateString(),
    }));
  }, [adminList]);

  // ✅ Loading & Error States
  if (isLoading)
    return <p className="text-center mt-10">Loading admins...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load admin data.
      </p>
    );

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center mb-5">
        <p className="flex items-center gap-1">
          <Table2 className="w-4 h-4 text-violet-500" />
          Admin Table
        </p>
        <AddAdmin />
      </div>

      <AdminTable
        columns={columns}
        data={mappedAdmins}
        pagination={pagination}
        setPagination={setPagination}
        totalRows={mappedAdmins.length}
      />
    </div>
  );
}

export default AdminTableContainer;
