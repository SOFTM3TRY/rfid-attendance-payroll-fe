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

import { User, Users } from "lucide-react";

import Profile from "./profile";
import BasicInfo from "./basic-info";
import FlipCardUI from "@/components/admin/manage-student/Registration/irefid";
import AddressInfo from "./address-info";
import EmergencyInfo from "./emergency-info";
import { Label } from "@/components/ui/label";

export default function StudentProfile() {
  const { token } = useAuth();
  const params = useParams();

  const lrn = params?.lrn as string;

  if (!lrn) return <Loader />;

  const { data, isLoading, isError } = useGetStudentDetailsByLrn(token, lrn);

  if (isLoading) return <Loader />;
  if (isError || !data?.data?.student) return <div>Student not found</div>;

  const student = data.data.student;

  const fullName = [
    student.last_name,
    student.first_name,
    student.middle_name,
    student.suffix,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <ProtectedRoute role="1">
      <SidebarProvider style={{ height: "100vh", width: "100%" }}>
        <AppSidebar />
        <main className="w-full h-auto" >
          <Navbar />
          <div className="p-5">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium flex"><User className="size-4 text-primary"/> Student Students</Label>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/admin/dashboard">
                      Dashboard
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/admin/manage-student">
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
              <div className="h-full mt-10 z-10">
                <div className="flex gap-5">
                  {/* <Profile student={student} /> */}
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
