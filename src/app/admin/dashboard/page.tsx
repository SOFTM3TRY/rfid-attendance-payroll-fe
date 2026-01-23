"use client";

import { useState, useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
import { Navbar } from "@/components/navbar";

import { SquareArrowOutUpRight, Users, Sheet } from "lucide-react";

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
import { useCountActiveStudents } from "@/hooks/useStudentDetails";
import { useTeacherActiveCount } from "@/hooks/useTeacher";

export default function Dashboard() {
  const { token } = useAuth();
  const isClient = useClientOnly();

  const { data: userDetails, isLoading: isLoadingUserDetails } = useUserDetails(
    token as string,
  );
  const { data: countActiveStudents, isLoading: isLoadingCountActiveStudents } =
    useCountActiveStudents(token as string);
  const { data: CountActiveTeachers, isLoading: isLoadingCountActiveTeachers } =
    useTeacherActiveCount(token as string);
  console.log("Active Students Count:", countActiveStudents);
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
              <h1 className="text-sm">Dashboard</h1>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage>Dashboard</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            <div className="mt-10 p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <Card>
                <CardHeader>
                  <CardDescription className="flex items-center">
                    <Users className="size-4 text-primary mr-2" />
                    Active Students
                  </CardDescription>

                  <CardTitle className="text-4xl">
                    {" "}
                    {countActiveStudents?.active_students_count}
                  </CardTitle>

                  <CardAction>
                    <Button variant="link" size="sm">
                      <a href="/admin/manage-student">Go to Page</a>
                      <SquareArrowOutUpRight className="size-3" />
                    </Button>
                  </CardAction>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardDescription className="flex items-center">
                    <Users className="size-4 text-primary mr-2" />
                    Active Teachers
                  </CardDescription>

                  <CardTitle className="text-4xl">
                    {CountActiveTeachers?.count}
                  </CardTitle>

                  <CardAction>
                    <Button variant="link" size="sm">
                      <a href="/admin/manage-teacher">Go to Page</a>
                      <SquareArrowOutUpRight className="size-3" />
                    </Button>
                  </CardAction>
                </CardHeader>
              </Card>
              <Card
                className="bg-muted-foreground/30 cursor-not-allowed"
                title="This Card is not available"
              >
                <CardHeader>
                  <CardDescription className="flex items-center text-muted-foreground">
                    <Users className="size-4 mr-2" />
                    Active Employees
                  </CardDescription>

                  <CardTitle className="text-4xl text-muted-foreground/50">
                    0
                  </CardTitle>

                  <CardAction className="bg-muted-foreground/50  px-2 py-1 rounded-full text-xs">
                    <a
                      href="#"
                      className="flex items-center cursor-not-allowed"
                    >
                      Go to Page
                      <SquareArrowOutUpRight className="h-3 w-3 ml-2" />
                    </a>
                  </CardAction>
                </CardHeader>
              </Card>
            </div>

            <div>
              <h1 className="text-sm mt-10 flex">
                <Users className="mr-2 size-4" />
                Totol Student Per Grades
              </h1>
            </div>

            <div className="my-5">
              <ChartAreaInteractive />
            </div>

            <div>
              <h1 className="text-sm mt-10 flex">
                <Sheet className="mr-2 size-4" />
                Student Attendance Today
              </h1>
            </div>

            <div className="mt-5 p-3 grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
              <div className="col-span-1 md:col-span-2">
                <StudentTable />
              </div>
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

                    <CardTitle className="text-4xl text-muted-foreground/50">0</CardTitle>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
          <Footer />
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
