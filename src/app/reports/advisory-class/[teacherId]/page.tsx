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
import { AdvisoryClassContent } from "@/components/advisory/AdvisoryClassContent";
import { AdvisoryPageSkeleton } from "@/components/advisory/AdvisoryPageSkeleton";
import { useAdvisoryClassPage } from "@/hooks/useAdvisoryClassPage";

export default function AdvisoryClass() {
  const params = useParams();

  const teacherId = params?.teacherId;

  if (!teacherId || typeof teacherId !== "string") {
    return <PageLoaderFallback />;
  }

  const { token, teacher, students, subjects, attendanceRecords, fullName, isLoading } =
    useAdvisoryClassPage(teacherId);

  return (
    <ProtectedRoute role={["1", "2"]}>
      <SidebarProvider style={{ height: "100vh", width: "100%" }}>
        <AppSidebar />
        <main className="w-full h-auto">
          <Navbar />

          <div className="p-5">
            <div className="flex items-center justify-between">
              <div className="text-lg font-medium flex flex-col">
                <span className="flex text-md items-center">
                  <User className="size-4 mr-1 text-teal-500" />
                  Teacher Advisory Class
                </span>
              </div>

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
                    <BreadcrumbPage>Advisory Class</BreadcrumbPage>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>
                      {teacher?.grade?.grade_level || "N/A"}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>
                      {teacher?.section?.section_name || "N/A"}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            {/* ✅ MAIN LOADING SWITCH */}
            {isLoading ? (
              <AdvisoryPageSkeleton />
            ) : (
              <AdvisoryClassContent
                token={token}
                teacher={teacher}
                students={students}
                subjects={subjects}
                attendanceRecords={attendanceRecords}
                fullName={fullName}
              />
            )}
          </div>

          <Footer />
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
