"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
import { Navbar } from "@/components/navbar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Footer } from "@/components/footer";
import { useAuth } from "@/context/AuthContext";
import { useUserDetails } from "@/hooks/useUserDetails";
import { useClientOnly } from "@/hooks/useClientOnly";
import Loader from "@/components/Loader";
import { TeacherTableContainer } from "@/app/manage-teacher/page/TeacherTableContainer";
import { Users } from "lucide-react";
import { Label } from "@/components/ui/label";

export default function ManageTeacher() {
  const { token } = useAuth();
  const isClient = useClientOnly();

  const { data: userDetails, isLoading: isLoadingUserDetails } = useUserDetails(token as string);

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

            <div className="p-2 h-full mt-10 z-1">
              <TeacherTableContainer />
            </div>
          </div>
          <Footer />
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
