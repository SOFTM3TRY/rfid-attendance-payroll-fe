/*************  ✨ Windsurf Command 🌟  *************/
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
// import { Attendance } from "./attendance";
// import { TotalStatus } from "./total-status";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    <ProtectedRoute role="1">
      <SidebarProvider style={{ height: "100vh", width: "100%" }}>
        <AppSidebar />
        <main className="w-full h-auto">
          <Navbar />
          <div className="p-5">
            <div className="flex items-center justify-between">
              <div className="text-lg font-medium flex flex-col">
                <span className="flex text-sm items-center">
                  <User className="size-4 mr-1 text-teal-500 " />
                  Teacher Profile
                </span>
                <span className="text-teal-700 dark:text-teal-300 font-bold">
                  {fullName}
                </span>
              </div>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/admin/dashboard">
                      Dashboard
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/admin/manage-teacher">
                      Manage Teacher
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Teacher Profile</BreadcrumbPage>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>
                      {fullName.length > 17
                        ? `${fullName.substring(0, 17)}...`
                        : fullName}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            {!teacherDetails ? (
              <div className="p-2 h-full mt-10 z-10">Loading...</div>
            ) : (
              <div className="p-2 h-full mt-10 z-10">
                <div className="flex gap-5">
                  <Profile id={teacher.id} />
                  <BasicInfo id={teacher.id} />
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
