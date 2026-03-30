"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
import { Navbar } from "@/components/navbar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Footer } from "@/components/footer";
import { ManageTeacherPageContent } from "@/components/manage-teacher/ManageTeacherPageContent";
import { useManageTeacherPage } from "@/hooks/useManageTeacherPage";
import { Users } from "lucide-react";
import { Label } from "@/components/ui/label";

export default function ManageTeacher() {
  const { teachers, isLoading, isRefreshing, isError, refresh } =
    useManageTeacherPage();

  return (
    <ProtectedRoute role={["1", "2"]}>
      <SidebarProvider style={{ height: "100vh", width: "100%" }}>
        <AppSidebar />
        <main className="w-full h-auto">
          <Navbar />
          <div className="p-5">
            <div className="flex items-center justify-between">
              <Label className="text-md font-medium flex">
                <Users className="size-4 text-primary" />
                Manage Teachers
              </Label>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Manage Teacher</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            <ManageTeacherPageContent
              teachers={teachers}
              isLoading={isLoading}
              isRefreshing={isRefreshing}
              isError={isError}
              onRefresh={refresh}
            />
          </div>
          <Footer />
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
