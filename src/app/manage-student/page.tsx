"use client";

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
import GradeTabsPage from "@/components/admin/manage-student/GradeTabsPage";
import { Users } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

function ManageStudentSkeleton() {
  return (
    <div className="h-full mt-10 space-y-4">
      <div className="flex gap-3">
        <Skeleton className="h-10 w-28" />
        <Skeleton className="h-10 w-28" />
        <Skeleton className="h-10 w-28" />
      </div>
      <Skeleton className="h-12 w-full" />
      {Array.from({ length: 7 }).map((_, index) => (
        <Skeleton key={index} className="h-14 w-full" />
      ))}
    </div>
  );
}

export default function ManageStudent() {
  const { isLoading: isLoadingUserDetails } = useSession();

  return (
    <ProtectedRoute role={["1", "2"]}>
      <SidebarProvider style={{ height: "100vh", width: "100%" }}>
        <AppSidebar />
        <main className="w-full h-auto">
          <Navbar />

          <div className="p-5" style={{ pointerEvents: "auto" }}>
            <div className="flex items-center justify-between">
              <Label className="text-md font-medium flex"><Users  className="size-4 text-primary"/> Manage Students</Label>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">
                      Dashboard
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Manage Student</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            {isLoadingUserDetails ? (
              <ManageStudentSkeleton />
            ) : (
              <div className="h-full mt-10 z-1">
                <GradeTabsPage />
              </div>
            )}
          </div>
          <Footer />
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
