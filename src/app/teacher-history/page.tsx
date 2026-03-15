"use client";

import React, { useMemo, useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
import { Navbar } from "@/components/navbar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Footer } from "@/components/footer";
import { useAuth } from "@/context/AuthContext";
import { useUserDetails } from "@/hooks/useUserDetails";
import { useClientOnly } from "@/hooks/useClientOnly";
import Loader from "@/components/Loader";
import { Users } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useGetHistoryyLogs } from "@/hooks/useTeacher";
import { PaginationState } from "@tanstack/react-table";
import { columns } from "./columns";
import { HistoryTable } from "./HistoryTable";

export default function TeacherHistory() {
  const { token } = useAuth();
  const isClient = useClientOnly();

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const {
    data: history,
    isLoading: isLoadingHistory,
    refetch,
  } = useGetHistoryyLogs(token as string);

  const { isLoading: isLoadingUserDetails } = useUserDetails(token as string);

  const historyLogs = useMemo(() => {
    return history?.data?.historyLogs ?? [];
  }, [history]);

  if (!isClient || isLoadingUserDetails) {
    return <Loader />;
  }

  return (
    <ProtectedRoute role={["1", "2"]}>
      <SidebarProvider style={{ height: "100vh", width: "100%" }}>
        <AppSidebar />
        <main className="w-full h-auto">
          <Navbar />

          <div className="p-5">
            <div className="flex items-center justify-between">
              <Label className="text-md font-medium flex items-center gap-2">
                <Users className="size-4 text-primary" />
                Manage Teacher History
              </Label>

              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Manage Teacher History</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            <div className="mt-10">
              <HistoryTable
                columns={columns}
                data={historyLogs}
                pagination={pagination}
                setPagination={setPagination}
                totalRows={historyLogs.length}
                isLoading={isLoadingHistory}
                onRefresh={() => refetch()}
              />
            </div>
          </div>

          <Footer />
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  );
}