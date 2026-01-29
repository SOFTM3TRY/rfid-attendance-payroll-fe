"use client";

import { useState, useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
import { Navbar } from "@/components/navbar";

import {
  SquareArrowOutUpRight,
  Users,
  Sheet,
  HouseIcon,
  GraduationCap,
} from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProtectedRoute from "@/components/ProtectedRoute";

//Table
import { StudentTable } from "@/components/admin/dashboard/dashboard-student-table";
import { TeacherTable } from "@/components/admin/dashboard/dashboard-teacher-table";

//Chart
import { ChartAreaInteractive } from "@/components/admin/dashboard/student-chart";
import { TeacherChart } from "@/components/admin/dashboard/teacher-chart";

import { Footer } from "@/components/footer";

import { useAuth } from "@/context/AuthContext";
// @ts-ignore
import { useUserDetails } from "@/hooks/useUserDetails";
import { useClientOnly } from "@/hooks/useClientOnly";

import Loader from "@/components/Loader";
import {
  useCountActiveStudents,
  useCountStudentsPerGrade,
} from "@/hooks/useStudentDetails";
import { useTeacherActiveCount } from "@/hooks/useTeacher";
import { Label } from "@/components/ui/label";
import { useGetRegisteredStudent } from "@/hooks/useStudentDetails";

export default function Dashboard() {
  const { token } = useAuth();
  const isClient = useClientOnly();

  const { data: userDetails, isLoading: isLoadingUserDetails } = useUserDetails(
    token as string,
  );
  const {
    data: countStudentsPerGrade,
    isLoading: isLoadingCountStudentsPerGrade,
  } = useCountStudentsPerGrade(token as string);
  const { data: countActiveStudents, isLoading: isLoadingCountActiveStudents } =
    useCountActiveStudents(token as string);
  const { data: CountActiveTeachers, isLoading: isLoadingCountActiveTeachers } =
    useTeacherActiveCount(token as string);
  const { data: registeredStudents, isLoading: isLoadingRegisteredStudents } =
    useGetRegisteredStudent(token as string);
  if (!isClient || isLoadingUserDetails) {
    return <Loader />;
  }

  return (
    <ProtectedRoute role="1">
      <SidebarProvider style={{ height: "100vh", width: "100%" }}>
        <AppSidebar />
        <main className="w-full h-auto">
          <Navbar />

          <div className="p-5">
            <div className="flex items-center justify-between">
              <Label className="text-sm">
                <HouseIcon className="size-4 text-primary" /> Dashboard
              </Label>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage>Dashboard</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            <div>
              <h1 className="text-sm mt-10 flex">
                <Users className="mr-2 size-4" />
                Totol Active Users
              </h1>
            </div>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <Card>
                <CardHeader className="flex items-center justify-between">
                  <CardDescription className="flex items-center">
                    <Users className="size-4 text-primary mr-2" />
                    Active Students
                  </CardDescription>

                  <CardAction>
                    <Button variant="link" size="sm">
                      <a href="/admin/manage-student">Go to Page</a>
                      <SquareArrowOutUpRight className="size-3" />
                    </Button>
                  </CardAction>
                </CardHeader>

                <CardContent>
                  <div className="text-5xl font-bold">
                    {countActiveStudents?.active_students_count}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Total active students
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex items-center justify-between">
                  <CardDescription className="flex items-center">
                    <Users className="size-4 text-primary mr-2" />
                    Active Teachers
                  </CardDescription>

                  <CardAction>
                    <Button variant="link" size="sm">
                      <a href="/admin/manage-teacher">Go to Page</a>
                      <SquareArrowOutUpRight className="size-3" />
                    </Button>
                  </CardAction>
                </CardHeader>

                <CardContent>
                  <div className="text-5xl font-bold">
                    {CountActiveTeachers?.count}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Total active teachers
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex items-center justify-between">
                  <CardDescription className="flex items-center">
                    <Users className="size-4 text-primary mr-2" />
                    Total Registered Students
                  </CardDescription>

                  <CardAction>
                    <Button variant="link" size="sm">
                      <a href="/admin/manage-student">Go to Page</a>
                      <SquareArrowOutUpRight className="size-3" />
                    </Button>
                  </CardAction>
                </CardHeader>
                <CardContent>
                  <div className="text-5xl font-bold">
                    {registeredStudents?.registered_students_count}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Total registered students
                  </p>
                </CardContent>
              </Card>
            </div>

            <div>
              <h1 className="text-sm mt-10 flex">
                <Users className="mr-2 size-4" />
                Totol Student Per Grades
              </h1>
            </div>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-6">
              {isLoadingCountStudentsPerGrade ? (
                <Card>
                  <CardHeader>
                    <CardDescription>Loading...</CardDescription>
                    <CardTitle className="text-3xl">...</CardTitle>
                  </CardHeader>
                </Card>
              ) : countStudentsPerGrade?.status &&
                Array.isArray(countStudentsPerGrade?.data) ? (
                countStudentsPerGrade.data.map(
                  (item: { grade: string; count: number }, idx: number) => (
                    <Card key={`${item.grade}-${idx}`}>
                      <CardHeader>
                        <CardDescription className="flex items-center">
                          <GraduationCap className="size-4 text-primary mr-2" />
                          {item.grade}
                        </CardDescription>
                      </CardHeader>

                      <CardContent>
                        <div className="text-5xl font-bold">{item.count}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Total students
                        </p>
                      </CardContent>
                    </Card>
                  ),
                )
              ) : (
                <Card>
                  <CardHeader>
                    <CardDescription>No data</CardDescription>
                    <CardTitle className="text-xl">0</CardTitle>
                  </CardHeader>
                </Card>
              )}
            </div>

            <div>
              <h1 className="text-sm mt-10 flex">
                <Sheet className="mr-2 size-4" />
                Student Attendance Today
              </h1>
            </div>
            <StudentTable />

            <div className="my-5 mt-10">
              <ChartAreaInteractive />
            </div>

            {/* <div className="mt-5 p-3 grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
              <div className="col-span-1 md:col-span-2"></div>
              <div className="col-span-1 grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                <Card className="bg-green-500">
                  <CardHeader>
                    <CardDescription className="flex items-center text-black dark:text-white ">
                      <Users className="size-4 mr-2" />
                      Present
                    </CardDescription>

                    <CardTitle className="text-4xl">0</CardTitle>
                  </CardHeader>
                </Card>

                <Card className="bg-yellow-500">
                  <CardHeader>
                    <CardDescription className="flex items-center text-black dark:text-white ">
                      <Users className="size-4 mr-2" />
                      Late
                    </CardDescription>

                    <CardTitle className="text-4xl">0</CardTitle>
                  </CardHeader>
                </Card>

                <Card className="bg-red-500">
                  <CardHeader>
                    <CardDescription className="flex items-center text-black dark:text-white ">
                      <Users className="size-4 mr-2" />
                      Absent
                    </CardDescription>

                    <CardTitle className="text-4xl">0</CardTitle>
                  </CardHeader>
                </Card>

                <Card className="bg-muted-foreground/30 cursor-not-allowed">
                  <CardHeader>
                    <CardDescription className="flex items-center text-muted-foreground/50 ">
                      <Users className="size-4 mr-2" />
                      Total
                    </CardDescription>

                    <CardTitle className="text-4xl text-muted-foreground/50">
                      0
                    </CardTitle>
                  </CardHeader>
                </Card>
              </div>
            </div> */}
          </div>
          <Footer />
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
