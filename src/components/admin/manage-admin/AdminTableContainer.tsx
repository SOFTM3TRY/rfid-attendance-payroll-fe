"use client";

import { useMemo, useState } from "react";
import { PaginationState } from "@tanstack/react-table";
import { AdminTable } from "@/components/admin/manage-admin/AdminTable";
import { columns, Admin } from "@/components/admin/manage-admin/columns";
import AddAdmin from "@/components/admin/manage-admin/AddAdmin/AddAdmin";
import { useAllAdmins } from "@/hooks/useTeacher";
import { useAuth } from "@/context/AuthContext";
import { Table2 } from "lucide-react";
import ChangePasswordDialog from "@/app/manage-teacher/page/ChangePasswordDialog";

export function AdminTableContainer() {
  const { token } = useAuth();
  const {
    data: apiData,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useAllAdmins(token);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const [passOpen, setPassOpen] = useState(false);
  const [passAdminId, setPassAdminId] = useState<string | null>(null);
  const [passAdminName, setPassAdminName] = useState("");

  const handlePasswordChange = (adminId: string, name?: string) => {
    setPassAdminId(adminId);
    setPassAdminName(name || "");
    setPassOpen(true);
  };

  const adminList = useMemo(() => {
    return Array.isArray(apiData?.data) ? apiData.data : [];
  }, [apiData]);

  const mappedAdmins = useMemo<Admin[]>(() => {
    return adminList.map((admin: any) => ({
      id: String(admin.id),
      avatar: admin.avatar ?? "",
      employee_number: admin.employee_no ?? "",
      first_name: admin.first_name ?? "",
      middle_name: admin.middle_name ?? "",
      last_name: admin.last_name ?? "",
      suffix: admin.suffix ?? "",
      email: admin.email ?? "",
      contact_no: admin.contact_no ?? "",
      status: String(admin.status ?? "0"),
      role: admin.role?.role_name ?? "N/A",
      created_at: admin.created_at
        ? new Date(admin.created_at).toLocaleDateString()
        : "",
    }));
  }, [adminList]);

  return (
    <div style={{ pointerEvents: "auto" }}>
      <div className="flex justify-between items-center mb-10">
        <p className="flex items-center gap-1 text-sm">
          <Table2 className="size-4 text-violet-500" />
          Admin Table
        </p>
        <AddAdmin />
      </div>

      {isError ? (
        <p className="text-sm text-red-500 mb-3">
          Failed to load admin data. Click refresh.
        </p>
      ) : null}

      <AdminTable
        columns={columns({
          onChangePassword: (adminId: string, name?: string) =>
            handlePasswordChange(adminId, name),
        })}
        data={mappedAdmins}
        pagination={pagination}
        setPagination={setPagination}
        totalRows={mappedAdmins.length}
        isLoading={isLoading || isFetching}
        onRefresh={refetch}
      />

      {passAdminId && (
        <ChangePasswordDialog
          open={passOpen}
          setOpen={setPassOpen}
          userId={passAdminId}
          userName={passAdminName}
          type="admin"
          onSuccess={() => {
            void refetch();
          }}
        />
      )}
    </div>
  );
}

export default AdminTableContainer;