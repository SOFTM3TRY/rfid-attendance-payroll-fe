"use client";

import { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/teacher-sidebar";
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

  return (
    <ProtectedRoute role="2">
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
            </div>
          </div>
          <Footer />
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
