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
import ProtectedRoute from "@/components/ProtectedRoute";
import { Footer } from "@/components/footer";
import { useAuth } from "@/context/AuthContext";
import Loader from "@/components/Loader";

import { User } from "lucide-react";
import { useTeacherDetails } from "@/hooks/useTeacher";

import TeacherStudentTable from "./student-table";
import Subject from "./subject";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import DownloadAttendanceReportPdfModal from "@/components/DownloadAttendanceReportPdfModal";

function AdvisorySkeleton() {
  return (
    <div className="flex flex-col gap-2 mb-20 p-0 mt-10">
      <div className="col-span-1 md:col-span-2 gap-10 flex rounded-md h-full">
        {/* Left column */}
        <div className="flex flex-col gap-5 w-[380px]">
          {/* Teacher profile card skeleton */}
          <div className="shadow-lg w-100 py-5 flex flex-col justify-center rounded-xl items-center px-5 gap-5 bg-accent/20">
            <Skeleton className="h-30 w-30 rounded-lg" />

            <div className="flex flex-col items-center gap-4 w-full">
              <div className="flex flex-col items-center gap-2 w-full">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>

              <div className="flex flex-col items-center gap-2 w-full">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-4 w-40" />
              </div>

              <div className="flex gap-2 mt-2">
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
            </div>
          </div>

          {/* Subject card skeleton */}
          <div className="w-100 h-auto bg-accent/20 rounded-lg p-5 space-y-3">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
            <Skeleton className="h-3 w-2/3" />
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Skeleton className="h-8 w-full rounded-md" />
              <Skeleton className="h-8 w-full rounded-md" />
              <Skeleton className="h-8 w-full rounded-md" />
              <Skeleton className="h-8 w-full rounded-md" />
            </div>
          </div>
        </div>

        {/* Right column - Table skeleton */}
        <div className="bg-accent/20 rounded-lg p-5 w-full">
          <div className="flex items-center justify-between py-4">
            <Skeleton className="h-9 w-40" />
            <Skeleton className="h-9 w-72" />
          </div>

          <div className="rounded-md border bg-background p-4 space-y-3">
            <div className="grid grid-cols-4 gap-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>

            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="grid grid-cols-4 gap-3">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between px-5 py-4 space-x-2">
            <Skeleton className="h-3 w-56" />
            <Skeleton className="h-3 w-28" />
            <div className="flex gap-2">
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-9 w-20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdvisoryClass() {
  const { token } = useAuth();
  const params = useParams();

  const teacherId = params?.teacherId;

  if (!teacherId || typeof teacherId !== "string") {
    return <Loader />;
  }

  const { data: teacherDetails, isLoading: isLoadingStudents } =
    useTeacherDetails(token, { id: teacherId });

  const teacher = teacherDetails?.data?.teacher?.[0] || null;
  const students = teacherDetails?.data?.students || [];
  const subjects = teacherDetails?.data?.teacher?.[0]?.subjects || [];

  const fullName = teacher
    ? `${teacher?.last_name}, ${teacher?.first_name} ${teacher?.middle_name || ""} ${
        teacher?.suffix || ""
      }`.trim()
    : "Unknown";

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
            {isLoadingStudents ? (
              <AdvisorySkeleton />
            ) : (
              <div className="flex flex-col gap-2 mb-20 p-0 mt-10">
                <div className="col-span-1 md:col-span-2 gap-5 flex rounded-md h-full">
                  <div className="flex flex-col gap-5">
                    <div className="shadow-lg z-2 w-100 py-5 flex flex-col justify-center rounded-xl items-center px-5 gap-5 bg-accent/20">
                      <div className="relative group w-30 h-30">
                        <Avatar className="h-30 w-30 flex-shrink-0 rounded-lg">
                          <AvatarImage
                            src="https://github.com/shadcn.png"
                            className="rounded-lg hover:grayscale-100 transition-all duration-300"
                            draggable="false"
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </div>

                      <div className="flex flex-col items-center gap-4">
                        <span className="flex flex-col items-center gap-2">
                          <p className="text-center text-sm font-semibold leading-none uppercase">
                            {fullName}
                          </p>
                          <span className="text-sm">
                            {teacher?.employee_no || "N/A"}{" "}
                            <span
                              className={
                                teacher?.status
                                  ? "text-green-500 text-sm"
                                  : "text-red-500 text-sm"
                              }
                            >
                              {teacher?.status ? "Active" : "Inactive"}
                            </span>
                          </span>
                        </span>

                        <p className="text-sm my-1 flex flex-col items-center">
                          <span className="text-xs">School Year</span>
                          <span className="text-blue-800 font-medium dark:text-blue-200">
                            {teacher?.additional_info?.school_year || "N/A"}
                          </span>
                        </p>

                        <div className="flex gap-2 mt-2">
                          <span className="uppercase font-medium text-sm px-3 h-6 flex items-center justify-center rounded-full bg-primary text-white">
                            {teacher?.grade?.grade_level || "N/A"}
                          </span>
                          <span className="uppercase font-medium text-sm px-3 h-6 flex items-center justify-center rounded-full bg-primary text-white">
                            {teacher?.section?.section_name || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="w-100 h-auto bg-accent/20 rounded-lg">
                      <Subject subjects={subjects} />
                    </div>
                  </div>

                  <div className="bg-accent/20 rounded-lg p-5 w-full">
                    {token && teacher ? (
                      <DownloadAttendanceReportPdfModal
                        token={token}
                        sectionId={String(teacher?.section?.id)} // ✅ FIXED
                        gradeLabel={teacher?.grade?.grade_level}
                        sectionLabel={teacher?.section?.section_name}
                        teacherName={fullName}
                        schoolName="Young Generation Academy"
                      />
                    ) : null}
                    <TeacherStudentTable
                      students={students}
                      isLoading={isLoadingStudents}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <Footer />
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
