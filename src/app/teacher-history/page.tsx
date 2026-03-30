"use client";

import React from "react";
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
import { useSession } from "@/context/SessionContext";
import { Users } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useHistoryLogs } from "@/hooks/useHistoryLogs";
import { HistoryLogsTable } from "@/components/history-logs/HistoryLogsTable";
import { extractHistoryLogs } from "@/lib/history-log";

export default function TeacherHistory() {
  const { token } = useSession();
  const { data: history, isLoading: isLoadingHistory } = useHistoryLogs(token);
  const historyLogs = extractHistoryLogs(history);

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
              <HistoryLogsTable
                title="Teacher History Logs"
                logs={historyLogs}
                isLoading={isLoadingHistory}
              />
            </div>
          </div>

          <Footer />
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
