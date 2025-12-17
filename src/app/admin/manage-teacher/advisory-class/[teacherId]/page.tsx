/*************  ✨ Windsurf Command 🌟  *************/
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";

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

import { User } from "lucide-react";

import { useTeacherDetails } from "@/hooks/useTeacher";

import TeacherStudentTable from "./student-table";
import Subject from "./subject";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AdvisoryClass() {
  const { token } = useAuth();
  const isClient = useClientOnly();
  const params = useParams();

  const teacherId = params?.teacherId;

  if (!teacherId || typeof teacherId !== "string") {
    return <Loader />;
  }

  const { data: teacherDetails } = useTeacherDetails(token, { id: teacherId });

  const teacher = teacherDetails?.data?.teacher?.[0] || null;
  const students = teacherDetails?.data?.students || [];
  const subjects = teacherDetails?.data?.teacher?.[0]?.subjects || [];

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
                  Teacher Advisory Class
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
                    <BreadcrumbPage>Advisory Class</BreadcrumbPage>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{teacher?.grade?.grade_level || "N/A"}</BreadcrumbPage>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{teacher?.section?.section_name || "N/A"}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            <div className="flex flex-col gap-2 mb-20 p-0 mt-10">
              <div className="col-span-1 md:col-span-2 gap-5 flex rounded-md h-full">
                <div className="flex flex-col gap-5">
                  <div className="shadow-lg  z-2 w-100 py-5 flex flex-col justify-center rounded-xl items-center px-5 gap-5 bg-zinc-100 dark:bg-zinc-900">
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
                        <span className="text-xs">
                          {teacher?.employee_no || "N/A"} ||{" "}
                          <span
                            className={
                              teacher?.status
                                ? "text-green-500"
                                : "text-red-500"
                            }
                          >
                            {teacher?.status ? "Active" : "Inactive"}
                          </span>
                        </span>
                      </span>
                      <p className="text-sm my-1 flex flex-col items-center">
                        <span className="text-[10px]">School Year</span>
                        <span className="text-blue-800 font-medium dark:text-blue-200">
                          {teacher?.additional_info.school_year || "N/A"}
                        </span>
                      </p>
                      <div className="flex gap-2 mt-2">
                        <span className="uppercase font-medium text-xs px-3 h-6 flex items-center justify-center rounded-full bg-green-200 shadow text-green-900 dark:bg-green-100 dark:text-green-800">
                          {teacher?.grade?.grade_level || "N/A"}
                        </span>
                        <span className="uppercase font-medium text-xs px-3 h-6 flex items-center justify-center rounded-full bg-green-200 shadow text-green-900 dark:bg-green-100 dark:text-green-800">
                          {teacher?.section?.section_name || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-100 h-auto bg-zinc-100 dark:bg-zinc-900 rounded-lg">
                    <Subject subjects={subjects} />
                  </div>
                </div>
                <div className="bg-zinc-100 dark:bg-zinc-900 rounded-lg p-5 w-full">
                  <TeacherStudentTable students={students} />
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
