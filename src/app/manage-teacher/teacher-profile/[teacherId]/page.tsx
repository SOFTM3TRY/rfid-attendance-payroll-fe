"use client";

import { useEffect, useState } from "react";
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
import { useClientOnly } from "@/hooks/useClientOnly";
import Loader from "@/components/Loader";

import { User, TriangleAlert, UserCheck, UserX } from "lucide-react";

import { useTeacherDetails } from "@/hooks/useTeacher";

import Profile from "./profile";
import BasicInfo from "./basic-info";
import AddressInfo from "./address-info";
import EmergencyInfo from "./emergency-info";
import TeacherSubjects from "./teacher-subjects";

import { Skeleton } from "@/components/ui/skeleton";
// import { Attendance } from "./attendance";
// import { TotalStatus } from "./total-status";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";

export default function TeacherProfile() {
  const { token } = useAuth();
  const isClient = useClientOnly();
  const params = useParams();

  const teacherId = params?.teacherId;

  if (!teacherId || typeof teacherId !== "string") {
    return <Loader />;
  }

  const { data: teacherDetails } = useTeacherDetails(token, { id: teacherId });

  const teacher = teacherDetails?.data?.teacher?.[0] || null;
  const additional_info = teacher?.additional_info || {};

  const fullName = teacher
    ? `${teacher?.last_name}, ${teacher?.first_name} ${
        teacher?.middle_name || ""
      } ${teacher?.suffix || ""}`
    : "Unknown";

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

            {!teacherDetails ? (
              <div className="p-2 h-full mt-10 z-10">
                <div className="flex gap-5">
                  <Skeleton className="w-1/4 h-80 mb-6" />
                  <Skeleton className="w-3/4 h-80 mb-6" />
                </div>
                <div className="flex gap-5">
                  <Skeleton className="w-full h-80 mb-6" />
                </div>
                <div className="flex gap-5">
                  <Skeleton className="w-full h-80 mb-2" />
                  <Skeleton className="w-full h-80 mb-2" />
                </div>
              </div>
            ) : (
              <div className="p-2 h-full mt-10 z-10">
                <div className="flex gap-5">
                  <Profile id={teacher.id} />

                  <BasicInfo id={teacher.id} />
                </div>
                <div className="flex gap-5 mt-5">
                  <TeacherSubjects teacherId={teacher.id} />
                </div>
                <div className="flex gap-5">
                  <AddressInfo id={teacher.id} />
                  <EmergencyInfo id={teacher.id} />
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
