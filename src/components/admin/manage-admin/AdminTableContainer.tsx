"use client";

import { useState, useEffect } from "react";
import { PaginationState } from "@tanstack/react-table";
import { AdminTable } from "@/components/admin/manage-admin/AdminTable";
import { Teacher, columns } from "@/components/admin/manage-admin/columns";

import AddAdmin from "@/components/admin/manage-admin/AddAdmin/AddAdmin";

import { Table2 } from "lucide-react"

export function AdminTableContainer() {
  const [data, setData] = useState<Teacher[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [totalRows, setTotalRows] = useState(0);

  useEffect(() => {
    // Replace this with your API call
    const fetchData = async () => {
      try {
        const res = await fetch(
          `/api/teachers?page=${pagination.pageIndex + 1}&limit=${
            pagination.pageSize
          }`
        );
        const json = await res.json();
        setData(json.data);
        setTotalRows(json.total);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchData();
  }, [pagination]);

  return (
    <div className="mt-10">
      <div className="flex justify-between items-centr mb-5">
        <p className="flex items-center gap-1"><Table2 className="w-4 h-4 text-violet-500"/>Admin Table</p>
        <AddAdmin />
      </div>

      <AdminTable
        columns={columns}
        data={data}
        pagination={pagination}
        setPagination={setPagination}
        totalRows={totalRows}
      />
    </div>
  );
}
