"use client";

import { useParams } from "next/navigation";
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
import { useAuth } from "@/context/AuthContext";
import Loader from "@/components/Loader";
import { useGetStudentDetailsByLrn } from "@/hooks/useStudentDetails";

import { User } from "lucide-react";

import BasicInfo from "./basic-info";
import FlipCardUI from "@/components/admin/manage-student/Registration/irefid";
import AddressInfo from "./address-info";
import EmergencyInfo from "./emergency-info";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

function StudentProfileSkeleton() {
  return (
    <div className="p-2 h-full mt-10 z-10">
      <div className="flex gap-5">
        <Skeleton className="w-1/4 h-80 mb-6 rounded-xl" />
        <Skeleton className="w-3/4 h-80 mb-6 rounded-xl" />
      </div>
      <div className="flex gap-5">
        <Skeleton className="w-full h-80 mb-2 rounded-xl" />
        <Skeleton className="w-full h-80 mb-2 rounded-xl" />
      </div>
    </div>
  );
}

export default function StudentProfile() {
  const { token } = useAuth();
  const params = useParams();

  const lrn = params?.lrn as string;

  // keep this simple
  if (!lrn) return <Loader />;

  const { data, isLoading, isFetching, isError } = useGetStudentDetailsByLrn(
    token,
    lrn
  );

  const loading = isLoading || isFetching;

  const student = data?.data?.student;

  const fullName = student
    ? [student.last_name, student.first_name, student.middle_name, student.suffix]
        .filter(Boolean)
        .join(" ")
    : "Student";

  return (
    <ProtectedRoute role={["1", "2", "3"]}>
      <SidebarProvider style={{ height: "100vh", width: "100%" }}>
        <AppSidebar />
        <main className="w-full h-auto">
          <Navbar />

          <div className="p-5">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium flex items-center gap-2">
                <User className="size-4 text-primary" /> Student Profile
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
                    <BreadcrumbLink href="/teacher/manage-student">
                      Manage Student
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Student Profile</BreadcrumbPage>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage title={fullName}>
                      {fullName.length > 17 ? `${fullName.substring(0, 17)}...` : fullName}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            {/* ✅ Loading Skeleton */}
            {loading ? (
              <StudentProfileSkeleton />
            ) : isError || !student ? (
              <div className="mt-10 text-center text-sm text-red-500">
                Student not found
              </div>
            ) : (
              <div className="h-full mt-10 z-10">
                <div className="flex gap-5">
                  <FlipCardUI student={student} rotate="y" />
                  <BasicInfo student={student} />
                </div>
                <div className="flex gap-5">
                  <AddressInfo student={student} />
                  <EmergencyInfo student={student} />
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
