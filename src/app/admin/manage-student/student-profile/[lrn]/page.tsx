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
import { useClientOnly } from "@/hooks/useClientOnly";
import Loader from "@/components/Loader";
import { useGetStudentDetailsByLrn } from "@/hooks/useStudentDetails";

import { User } from "lucide-react";

import Profile from "./profile";
import BasicInfo from "./basic-info";

export default function StudentProfile() {
  const { token } = useAuth();
  const params = useParams();

  const lrn = params?.lrn as string;

  if (!lrn) return <Loader />;

  const { data, isLoading, isError } = useGetStudentDetailsByLrn(token, lrn);

  if (isLoading) return <Loader />;
  if (isError) return <div>Student not found</div>;

  const student = data?.data?.student;

  const fullName = `${student.last_name}, ${student.first_name} ${
    student.middle_name || ""
  } ${student.suffix || ""}`;

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
                  Student Profile
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
                      {fullName.length > 17
                        ? `${fullName.substring(0, 17)}...`
                        : fullName}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            {!data ? (
              <div>Loading...</div>
            ) : (
              <div className="p-2 h-full mt-10 z-10">
                <div className="flex gap-5">
                  <Profile lrn={student.lrn} />
                  <BasicInfo lrn={student.id} />
                </div>
                <div className="flex gap-5">
                  {/* <AddressInfo id={teacher.id} />
                  <EmergencyInfo id={teacher.id} /> */}
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
