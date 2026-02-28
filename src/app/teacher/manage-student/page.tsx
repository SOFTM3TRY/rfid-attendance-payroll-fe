"use client";

import { useAuth } from "@/context/AuthContext";
import { useUserDetails } from "@/hooks/useUserDetails";
import { useTeacherDetails } from "@/hooks/useTeacher";
import ProtectedRoute from "@/components/ProtectedRoute";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/teacher-sidebar";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useClientOnly } from "@/hooks/useClientOnly";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { User } from "lucide-react";
import TeacherStudentTable from "./student-table";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import DownloadAttendanceReportPdfModal from "@/components/DownloadAttendanceReportPdfModal";
import { use } from "react";

function ManageStudentSkeleton() {
  return (
    <div className="p-3">
      {/* chips skeleton */}
      <div className="mt-10 flex justify-between items-center">
        <div className="flex items-center gap-5">
          <Skeleton className="h-6 w-28 rounded-full" />
          <Skeleton className="h-6 w-32 rounded-full" />
          <Skeleton className="h-6 w-40 rounded-full" />
        </div>
      </div>

      {/* table skeleton */}
      <div className="mt-10 space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-9 w-44" />
          <Skeleton className="h-9 w-72" />
        </div>

        <div className="rounded-md border overflow-hidden">
          <div className="p-4 space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="grid grid-cols-6 gap-4 items-center">
                <Skeleton className="h-4 w-24" />
                <div className="col-span-2 flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-lg" />
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-44" />
                    <Skeleton className="h-3 w-28" />
                  </div>
                </div>
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-9 w-12" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between px-5 py-4">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-24" />
          <div className="flex gap-2">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ManageStudent() {
  const isClient = useClientOnly();
  const { token } = useAuth();

  const {
    data: userDetails,
    isLoading: isLoadingUserDetails,
    error: userError,
  } = useUserDetails(token as string);

  const teacherId = userDetails?.data?.id ?? null;

  const {
    data: teacherDetails,
    isLoading: isLoadingTeacher,
    error: teacherError,
  } = useTeacherDetails(token as string, { id: teacherId });

  if (!isClient) return null;

  const isLoading = isLoadingUserDetails || isLoadingTeacher;

  if (userError)
    return <div>Error loading user details: {String(userError)}</div>;
  if (teacherError)
    return <div>Error loading teacher details: {String(teacherError)}</div>;

  const fullName = [
    userDetails?.data?.last_name,
    userDetails?.data?.first_name,
    userDetails?.data?.middle_name,
    userDetails?.data?.suffix,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <ProtectedRoute role={["1", "2", "3"]}>
      <SidebarProvider style={{ height: "100vh", width: "100%" }}>
        <AppSidebar />

        <main className="w-full h-auto">
          <Navbar />

          <div className="p-5">
            <div className="flex items-center justify-between">
              <Label className="text-sm flex items-center gap-2">
                <User className="size-4 text-primary" />
                Manage Advisory Class
              </Label>

              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/admin/dashboard">
                      Dashboard
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Manage Advisory Class</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            {isLoading ? (
              <ManageStudentSkeleton />
            ) : (
              <div className="p-3">
                <div className="mt-10 flex justify-between items-center">
                  <div className="flex items-center justify-between gap-5">
                    <span className="uppercase font-medium text-xs px-3 h-6 flex items-center justify-center rounded-full bg-accent/20 border">
                      Grade: {userDetails?.data?.grade?.grade_level || "N/A"}
                    </span>

                    <span className="uppercase font-medium text-xs px-3 h-6 flex items-center justify-center rounded-full bg-accent/20 border">
                      Section:{" "}
                      {userDetails?.data?.section?.section_name || "N/A"}
                    </span>

                    <span className="uppercase font-medium text-xs px-3 h-6 flex items-center justify-center rounded-full bg-accent/20 border">
                      School Year:{" "}
                      {userDetails?.data?.additional_info?.school_year || "N/A"}
                    </span>
                  </div>
                </div>

                <div className="mt-10">
                  
                {token && userDetails?.data ? (
                  <DownloadAttendanceReportPdfModal
                    token={token}
                    // ✅ IMPORTANT: dapat numeric id/number para tumama sa backend where('section', $section)
                    sectionId={String(
                      userDetails.data?.section?.id ??
                        userDetails.data?.additional_info?.section ??
                        "",
                    )}
                    gradeLabel={String(
                      userDetails.data?.grade?.grade_level ??
                        userDetails.data?.grade ??
                        "N/A",
                    )}
                    sectionLabel={String(
                      userDetails.data?.section?.section_name ??
                        userDetails.data?.section ??
                        "N/A",
                    )}
                    teacherName={fullName}
                    schoolName="Young Generation Academy"
                  />
                ) : null}
                  <TeacherStudentTable
                    students={teacherDetails?.data?.students || []}
                    isLoading={false}
                  />
                </div>
              </div>
            )}

            <Footer />
          </div>
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
