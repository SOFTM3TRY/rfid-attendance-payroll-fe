"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Navbar } from "@/components/navbar";

import { DataTableDemo } from "@/components/admin/dashboard-table";

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

export default function Dashboard() {
  return (
    <SidebarProvider style={{ height: "100vh", width: "100%" }}>
      <AppSidebar />
      <main className="w-full h-auto">
        <Navbar />

        <div className="p-3">
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

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="border border-yellow-200 hover:border-yellow-500">
              <CardHeader>
                <CardDescription className="flex items-center">
                  <Users className="h-5 w-5 text-yellow-500 mr-2" />Active Students
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
            <h1 className="text-xl mt-10 flex"><Users className="mr-2 w-7 h-7"/>Totol Student Per Grades</h1>
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
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

          <div>
            <h1 className="text-xl mt-10 flex"><Sheet className="mr-2 w-7 h-7"/>Attendance Today</h1>
          </div>

          <div>
            <DataTableDemo />
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
