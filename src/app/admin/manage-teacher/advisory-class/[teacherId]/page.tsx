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

import { User, TriangleAlert, UserCheck, UserX } from "lucide-react";

import { useTeacherDetails } from "@/hooks/useTeacher";

// import BasicInfo from "./basic-info";
// import AddressInfo from "./address-info";
// import EmergencyInfo from "./emergency-info";
import TeacherStudentTable from "./student-table";

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
  const additional_info = teacher?.additional_info || {};
  const students = teacherDetails?.data?.students || [];

  const fullName = teacher
    ? `${teacher?.last_name}, ${teacher?.first_name} ${
        teacher?.middle_name || ""
      } ${teacher?.suffix || ""}`
    : "Unknown";

  const router = useRouter();

  const grade =
    additional_info.grade === "1"
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
      : "";

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
                Teacher
                <span className="text-teal-700 dark:text-teal-300 font-bold mx-2">
                  {fullName}
                </span>{" "}
                Advisory Class
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
                    <BreadcrumbPage>Advisory Class</BreadcrumbPage>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{grade}</BreadcrumbPage>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{additional_info.section}</BreadcrumbPage>
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

            <div className="flex flex-col gap-2 mb-20 p-0 mt-10">
              <div className="col-span-1 rounded-md">
                <div className="sticky top-16 shadow-lg dark:border-b-4 dark:border-black z-2 w-full py-5 flex justify-start rounded-md items-center px-5 gap-5 bg-zinc-100 dark:bg-zinc-900 mb-2">
                  <Avatar className="h-30 w-30 flex-shrink-0">
                    <AvatarImage src="https://github.com/shadcn.png" draggable="false" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xl font-semibold leading-none uppercase">
                      {fullName}
                    </p>
                    <p>{teacher?.email || "N/A"}</p>
                    <p className="text-sm my-1">
                      Employee No: {teacher?.employee_no || "N/A"}{" "}
                      <span className="ml-3 text-blue-800 font-medium dark:text-blue-200">
                        SY: {additional_info.school_year || "N/A"}
                      </span>
                    </p>
                    <div className="flex gap-5 mt-10">
                      <span className="uppercase font-medium text-sm px-3 py-2 h-auto flex items-center justify-center rounded-md bg-green-200 shadow text-green-900 dark:bg-green-100 dark:text-green-800">
                        Grade: {grade}
                      </span>
                      <span className="uppercase font-medium text-sm px-3 py-2 h-auto flex items-center justify-center rounded-sm bg-green-200 shadow text-green-900 dark:bg-green-100 dark:text-green-800">
                        Section: {additional_info.section || "N/A"}
                      </span>
                      {/* <span className="uppercase font-medium text-sm px-3 h-6 flex items-center justify-center rounded-full bg-green-200 shadow text-green-900 dark:bg-green-100 dark:text-green-800">
                        School Year:{" "}
                        {students?.length > 0 ? students[0].school_year : "N/A"}
                      </span> */}
                    </div>
                  </div>
                </div>

                {/* {teacher && (
                  <>
                    <BasicInfo id={teacher.id} />
                    <AddressInfo id={teacher.id} />
                    <EmergencyInfo id={teacher.id} />
                  </>
                )} */}
              </div>
              <div className="col-span-1 md:col-span-2 rounded-md h-full bg-zinc-100 dark:bg-zinc-900 p-5">
                <div className="flex justify-between items-center">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      window.open(
                        `/admin/manage-teacher/sf2/${teacherId}`,
                        "_blank"
                      )
                    }
                  >
                    Generate SF2
                  </Button>
                </div>

                <div className="mt-10">
                  <TeacherStudentTable students={students} />
                </div>

                {/* <hr className="mt-10" />
                <div className="mt-10 p-5 flex justify-center items-center bg-zinc-200 dark:bg-zinc-800 rounded-md animate-pulse">
                  <TriangleAlert
                    strokeWidth={3}
                    className="mr-2 text-yellow-500 dark:text-yellow-400"
                  />
                  This Content Not available Now.
                </div> */}
              </div>
            </div>
          </div>
          <Footer />
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
