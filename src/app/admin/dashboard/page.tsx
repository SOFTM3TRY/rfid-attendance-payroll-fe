"use client";

import { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
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
import { StudentTable } from "@/components/admin/dashboard-student-table";
import { TeacherTable } from "@/components/admin/dashboard-teacher-table";

//Chart
import { ChartAreaInteractive } from "@/components/admin/student-chart";
import { TeacherChart } from "@/components/admin/teacher-chart";

import { Footer } from "@/components/footer";

import { useAuth } from "@/context/AuthContext";
// @ts-ignore
import { useUserDetails } from "@/hooks/useUserDetails";
import { useClientOnly } from "@/hooks/useClientOnly";

import Loader from "@/components/Loader";

export default function Dashboard() {
  const { token } = useAuth();
  const isClient = useClientOnly();

  const { data: userDetails, isLoading: isLoadingUserDetails } = useUserDetails(
    token as string
  );

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
              <h1 className="text-xl">Dashboard</h1>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage>Dashboard</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            <div className="mt-10 p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <Card className="border border-yellow-200 hover:border-yellow-500">
                <CardHeader>
                  <CardDescription className="flex items-center">
                    <Users className="h-5 w-5 text-yellow-500 mr-2" />
                    Active Students
                  </CardDescription>

                  <CardTitle className="text-4xl">0</CardTitle>

                  <CardAction className="text-white bg-blue-400 px-2 py-1 rounded-full hover:bg-blue-500 text-xs">
                    <a href="#" className="flex items-center">
                      Go to Page{" "}
                      <SquareArrowOutUpRight className="h-3 w-3 ml-2" />
                    </a>
                  </CardAction>
                </CardHeader>
              </Card>
              <Card className="border border-teal-200 hover:border-teal-500">
                <CardHeader>
                  <CardDescription className="flex items-center">
                    <Users className="h-5 w-5 text-teal-500 mr-2" />
                    Active Teachers
                  </CardDescription>

                  <CardTitle className="text-4xl">0</CardTitle>

                  <CardAction className="text-white bg-blue-400 px-2 py-1 rounded-full hover:bg-blue-500 text-xs">
                    <a href="#" className="flex items-center">
                      Go to Page{" "}
                      <SquareArrowOutUpRight className="h-3 w-3 ml-2" />
                    </a>
                  </CardAction>
                </CardHeader>
              </Card>
              <Card className="border border-blue-200 hover:border-blue-500">
                <CardHeader>
                  <CardDescription className="flex items-center">
                    <Users className="h-5 w-5 text-blue-500 mr-2" />
                    Active Employees
                  </CardDescription>

                  <CardTitle className="text-4xl">0</CardTitle>

                  <CardAction className="text-white bg-blue-400 px-2 py-1 rounded-full hover:bg-blue-500 text-xs">
                    <a href="#" className="flex items-center">
                      Go to Page{" "}
                      <SquareArrowOutUpRight className="h-3 w-3 ml-2" />
                    </a>
                  </CardAction>
                </CardHeader>
              </Card>
            </div>

            <div>
              <h1 className="text-xl mt-10 flex">
                <Users className="mr-2 w-7 h-7" />
                Totol Student Per Grades
              </h1>
            </div>

            <div className="mt-10 p-3 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-5">
              <Card className="bg-green-200 hover:bg-green-300 text-black dark:text-white dark:bg-green-400 dark:hover:bg-green-500">
                <CardHeader>
                  <CardDescription className="flex items-center text-black dark:text-white ">
                    <Users className="h-5 w-5 mr-2" />
                    Grade One
                  </CardDescription>

                  <CardTitle className="text-4xl">0</CardTitle>
                </CardHeader>
              </Card>

              <Card className="bg-orange-200 hover:bg-orange-300 text-black dark:text-white dark:bg-orange-400 dark:hover:bg-orange-500">
                <CardHeader>
                  <CardDescription className="flex items-center text-black dark:text-white ">
                    <Users className="h-5 w-5 mr-2" />
                    Grade Two
                  </CardDescription>

                  <CardTitle className="text-4xl">0</CardTitle>
                </CardHeader>
              </Card>

              <Card className="bg-indigo-200 hover:bg-indigo-300 text-black dark:text-white dark:bg-indigo-400 dark:hover:bg-indigo-500">
                <CardHeader>
                  <CardDescription className="flex items-center text-black dark:text-white ">
                    <Users className="h-5 w-5 mr-2" />
                    Grade Three
                  </CardDescription>

                  <CardTitle className="text-4xl">0</CardTitle>
                </CardHeader>
              </Card>

              <Card className="bg-blue-200 hover:bg-blue-300 text-black dark:text-white dark:bg-blue-400 dark:hover:bg-blue-500">
                <CardHeader>
                  <CardDescription className="flex items-center text-black dark:text-white ">
                    <Users className="h-5 w-5 mr-2" />
                    Grade Four
                  </CardDescription>

                  <CardTitle className="text-4xl">0</CardTitle>
                </CardHeader>
              </Card>

              <Card className="bg-red-200 hover:bg-red-300 text-black dark:text-white dark:bg-red-400 dark:hover:bg-red-500">
                <CardHeader>
                  <CardDescription className="flex items-center text-black dark:text-white ">
                    <Users className="h-5 w-5 mr-2" />
                    Grade Five
                  </CardDescription>

                  <CardTitle className="text-4xl">0</CardTitle>
                </CardHeader>
              </Card>

              <Card className="bg-yellow-200 hover:bg-yellow-300 text-black dark:text-white dark:bg-yellow-400 dark:hover:bg-yellow-500">
                <CardHeader>
                  <CardDescription className="flex items-center text-black dark:text-white ">
                    <Users className="h-5 w-5 mr-2" />
                    Grade Six
                  </CardDescription>

                  <CardTitle className="text-4xl">0</CardTitle>
                </CardHeader>
              </Card>
            </div>

            <div className="my-5 px-5">
              <ChartAreaInteractive />
            </div>

            <div>
              <h1 className="text-xl mt-10 flex">
                <Sheet className="mr-2 w-7 h-7" />
                Student Attendance Today
              </h1>
            </div>

            <div className="mt-5 p-3 grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
              <div className="col-span-1 md:col-span-2">
                <StudentTable />
              </div>
              <div className="col-span-1 grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                <Card className="bg-green-200 hover:bg-green-300 text-black dark:text-white dark:bg-green-400 dark:hover:bg-green-500">
                  <CardHeader>
                    <CardDescription className="flex items-center text-black dark:text-white ">
                      <Users className="h-5 w-5 mr-2" />
                      Present
                    </CardDescription>

                    <CardTitle className="text-4xl">0</CardTitle>
                  </CardHeader>
                </Card>

                <Card className="bg-yellow-200 hover:bg-yellow-300 text-black dark:text-white dark:bg-yellow-400 dark:hover:bg-yellow-500">
                  <CardHeader>
                    <CardDescription className="flex items-center text-black dark:text-white ">
                      <Users className="h-5 w-5 mr-2" />
                      Late
                    </CardDescription>

                    <CardTitle className="text-4xl">0</CardTitle>
                  </CardHeader>
                </Card>

                <Card className="bg-red-200 hover:bg-red-300 text-black dark:text-white dark:bg-red-400 dark:hover:bg-red-500">
                  <CardHeader>
                    <CardDescription className="flex items-center text-black dark:text-white ">
                      <Users className="h-5 w-5 mr-2" />
                      Absent
                    </CardDescription>

                    <CardTitle className="text-4xl">0</CardTitle>
                  </CardHeader>
                </Card>

                <Card className="bg-gray-200 text-black dark:text-white dark:bg-gray-400">
                  <CardHeader>
                    <CardDescription className="flex items-center text-black dark:text-white ">
                      <Users className="h-5 w-5 mr-2" />
                      ---
                    </CardDescription>

                    <CardTitle className="text-4xl">0</CardTitle>
                  </CardHeader>
                </Card>
              </div>
            </div>

            <div className="my-5 px-5">
              <TeacherChart />
            </div>

            <div>
              <h1 className="text-xl mt-10 flex ">
                <Sheet className="mr-2 w-7 h-7" />
                Teacher Attendance Today
              </h1>
            </div>

            <div className="mt-5 p-3 grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
              <div className="col-span-1 grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                <Card className="bg-green-200 hover:bg-green-300 text-black dark:text-white dark:bg-green-400 dark:hover:bg-green-500">
                  <CardHeader>
                    <CardDescription className="flex items-center text-black dark:text-white ">
                      <Users className="h-5 w-5 mr-2" />
                      Present
                    </CardDescription>

                    <CardTitle className="text-4xl">0</CardTitle>
                  </CardHeader>
                </Card>

                <Card className="bg-yellow-200 hover:bg-yellow-300 text-black dark:text-white dark:bg-yellow-400 dark:hover:bg-yellow-500">
                  <CardHeader>
                    <CardDescription className="flex items-center text-black dark:text-white ">
                      <Users className="h-5 w-5 mr-2" />
                      Late
                    </CardDescription>

                    <CardTitle className="text-4xl">0</CardTitle>
                  </CardHeader>
                </Card>

                <Card className="bg-red-200 hover:bg-red-300 text-black dark:text-white dark:bg-red-400 dark:hover:bg-red-500">
                  <CardHeader>
                    <CardDescription className="flex items-center text-black dark:text-white ">
                      <Users className="h-5 w-5 mr-2" />
                      Absent
                    </CardDescription>

                    <CardTitle className="text-4xl">0</CardTitle>
                  </CardHeader>
                </Card>

                <Card className="bg-gray-200 text-black dark:text-white dark:bg-gray-400">
                  <CardHeader>
                    <CardDescription className="flex items-center text-black dark:text-white ">
                      <Users className="h-5 w-5 mr-2" />
                      ---
                    </CardDescription>

                    <CardTitle className="text-4xl">0</CardTitle>
                  </CardHeader>
                </Card>
              </div>
              <div className="col-span-1 md:col-span-2">
                <TeacherTable />
              </div>
            </div>
          </div>
          <Footer />
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
