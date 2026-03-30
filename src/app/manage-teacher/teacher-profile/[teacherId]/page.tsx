"use client";

import { useParams } from "next/navigation";
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
import { PageLoaderFallback } from "@/components/PageLoaderBoundary";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Footer } from "@/components/footer";
import { User } from "lucide-react";
import { Label } from "@/components/ui/label";
import { TeacherProfilePageContent } from "@/components/manage-teacher/TeacherProfilePageContent";
import { TeacherProfilePageSkeleton } from "@/components/manage-teacher/TeacherProfilePageSkeleton";
import { useTeacherProfilePage } from "@/hooks/useTeacherProfilePage";

export default function TeacherProfile() {
  const params = useParams();

  const teacherId = params?.teacherId;

  if (!teacherId || typeof teacherId !== "string") {
    return <PageLoaderFallback />;
  }

  const {
    teacher,
    fullName,
    teacherSubjects,
    historyLogs,
    refetchTeacher,
    isLoading,
  } = useTeacherProfilePage(teacherId);

  return (
    <ProtectedRoute role={["1", "2"]}>
      <SidebarProvider style={{ height: "100vh", width: "100%" }}>
        <AppSidebar />
        <main className="w-full h-auto">
          <Navbar />
          <div className="p-5">
            <div className="flex items-center justify-between">
              <Label className="flex text-md items-center">
                <User className="size-4 text-teal-500 " />
                Teacher Profile
              </Label>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">
                      Dashboard
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/manage-teacher">
                      Manage Teacher
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Teacher Profile</BreadcrumbPage>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage title={fullName}>
                      {fullName.length > 17
                        ? `${fullName.substring(0, 17)}...`
                        : fullName}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            {isLoading || !teacher ? (
              <TeacherProfilePageSkeleton />
            ) : (
              <TeacherProfilePageContent
                teacher={teacher}
                teacherSubjects={teacherSubjects}
                historyLogs={historyLogs}
                onRefetchTeacher={() => {
                  void refetchTeacher();
                }}
              />
            )}
          </div>
          <Footer />
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
