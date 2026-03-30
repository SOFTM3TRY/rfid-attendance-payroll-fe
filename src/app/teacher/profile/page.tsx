"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/teacher-sidebar";
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
import { User } from "lucide-react";
import { Label } from "@/components/ui/label";
import { TeacherProfilePageSkeleton } from "@/components/manage-teacher/TeacherProfilePageSkeleton";
import { TeacherSelfProfilePageContent } from "@/components/manage-teacher/TeacherSelfProfilePageContent";
import { useTeacherSelfProfilePage } from "@/hooks/useTeacherSelfProfilePage";

export default function Dashboard() {
  const { isError } = useSession();
  const {
    teacher,
    teacherSubjects,
    isLoading,
    newPassword,
    confirmPassword,
    isChanging,
    setNewPassword,
    setConfirmPassword,
    handleChangePassword,
    handleRefetchTeacher,
  } = useTeacherSelfProfilePage();

  if (isError) {
    return <div className="p-5 text-red-500">Error loading user details.</div>;
  }

  return (
    <ProtectedRoute role={["1", "2", "3"]}>
      <SidebarProvider style={{ height: "100vh", width: "100%" }}>
        <AppSidebar />
        <main className="h-auto w-full">
          <Navbar />

          <div className="p-5">
            <div className="flex items-center justify-between">
              <Label className="text-md flex items-center font-medium">
                <User className="mr-2 size-4 text-sm text-primary" />
                Profile
              </Label>

              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/teacher/dashboard">
                      Dashboard
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Profile</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            {isLoading || !teacher ? (
              <TeacherProfilePageSkeleton />
            ) : (
              <TeacherSelfProfilePageContent
                teacher={teacher}
                teacherSubjects={teacherSubjects}
                newPassword={newPassword}
                confirmPassword={confirmPassword}
                isChanging={isChanging}
                onNewPasswordChange={setNewPassword}
                onConfirmPasswordChange={setConfirmPassword}
                onChangePassword={handleChangePassword}
                onRefetchTeacher={handleRefetchTeacher}
              />
            )}
          </div>

          <Footer />
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
