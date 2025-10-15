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

import BasicInfo from "./basic-info";
import AddressInfo from "./address-info";
import EmergencyInfo from "./emergency-info";
import { Attendance } from "./attendance";
import { TotalStatus } from "./total-status"; 

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function TeacherProfile() {
  const { token } = useAuth();
  const isClient = useClientOnly();
  const params = useParams();

  const teacherId = params?.teacherId;

  if (!teacherId || typeof teacherId !== "string") {
    return <Loader />;
  }

  const { data: teacherDetails } =
    useTeacherDetails(token, { id: teacherId });

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
              <h1 className="text-lg font-medium flex">
                <User className="mr-2 w-6 h-6 text-teal-500" />
                Teacher Profile{" "}
                <span className="text-teal-700 dark:text-teal-300 font-bold ml-2">
                  {fullName}
                </span>
              </h1>
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

            {teacherDetails && (
              <div className="p-2 h-full mt-10 z-10 hidden">
                <pre className="mt-2 p-3 bg-zinc-900 text-xs overflow-x-auto rounded text-white">
                  {JSON.stringify(teacherDetails, null, 2)}
                </pre>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-20 p-0 mt-10">
              <div className="col-span-1 rounded-md">
                <div className="sticky top-16 shadow-lg dark:border-b-4 dark:border-black z-2 w-full py-5 flex justify-start rounded-md items-center px-5 gap-5 bg-zinc-100 dark:bg-zinc-900 mb-2">
                  <Avatar className="h-30 w-30 flex-shrink-0">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xl font-semibold leading-none uppercase">
                      {fullName}
                    </p>
                    <p className="text-sm my-1">
                      LRN: {teacher?.employee_no || "N/A"}{" "}
                      <span className="ml-3 text-blue-800 font-medium dark:text-blue-200">
                        SY: {teacher?.school_year || "N/A"}
                      </span>
                    </p>
                    <div className="flex gap-2 mt-2">
                      <span className="uppercase font-medium text-sm px-3 h-6 flex items-center justify-center rounded-full bg-green-200 shadow text-green-900 dark:bg-green-100 dark:text-green-800">
                        Grade:{" "}
                        {additional_info.grade === "1"
                          ? "Grade One"
                          : additional_info.grade === "2"
                          ? "Grade Two"
                          : additional_info.grade === "3"
                          ? "Grade Three"
                          : additional_info.grade === "4"
                          ? "Grade Four"
                          : additional_info.grade === "5"
                          ? "Grade Five"
                          : additional_info.grade === "6"
                          ? "Grade Six"
                          : additional_info.grade}
                      </span>
                      <span className="uppercase font-medium text-sm px-3 h-6 flex items-center justify-center rounded-full bg-green-200 shadow text-green-900 dark:bg-green-100 dark:text-green-800">
                        Section: {additional_info.section || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                {teacher && (
                  <>
                    <BasicInfo id={teacher.id} />
                    <AddressInfo id={teacher.id} />
                    <EmergencyInfo id={teacher.id} />

                    {/* 
                           <AddressInfo id={id} />
                           <EmergencyInfo id={id} /> */}
                  </>
                )}
              </div>
              <div className="col-span-1 md:col-span-2 rounded-md h-full bg-zinc-100 dark:bg-zinc-900 p-5">
                <div className="sticky top-16 z-1">
                  <span className="text-lg font-medium shadow-lg flex items-center bg-zinc-200 dark:bg-zinc-800 py-2 px-3 rounded-full">
                    <User className="w-8 h-8 text-white p-1 mr-2 bg-teal-500 rounded-full" />{" "}
                    Teacher{" "}
                    <span className="text-teal-500 mx-2">{fullName}</span>{" "}
                    Attendance S.Y {additional_info?.school_year}
                  </span>
                </div>
                <div className="mt-10"><TotalStatus /></div>
                

                <div className="p-5"><Attendance /></div>

                <hr className="mt-10" />
                <div className="mt-10 p-5 flex justify-center items-center bg-zinc-200 dark:bg-zinc-800 rounded-md animate-pulse">
                  <TriangleAlert
                    strokeWidth={3}
                    className="mr-2 text-yellow-500 dark:text-yellow-400"
                  />
                  This Content Not available Now.
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
