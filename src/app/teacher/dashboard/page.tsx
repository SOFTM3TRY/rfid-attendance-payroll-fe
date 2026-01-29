"use client";

import * as React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/teacher-sidebar";
import { Navbar } from "@/components/navbar";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";

import ProtectedRoute from "@/components/ProtectedRoute";
import { Footer } from "@/components/footer";

import { useAuth } from "@/context/AuthContext";
// @ts-ignore
import { useUserDetails } from "@/hooks/useUserDetails";
import { useTeacherDetails } from "@/hooks/useTeacher";

import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, CalendarDays, GraduationCap } from "lucide-react";

export default function Dashboard() {
  const { token } = useAuth();

  const { data: user, isLoading: userLoading } = useUserDetails(token as string);

  const userId = user?.data?.id ? String(user.data.id) : "";

  const { data: teacherRes, isLoading: teacherLoading } = useTeacherDetails(
    token as string,
    { id: userId }
  );

  const teacher = teacherRes?.data?.teacher?.[0] ?? null;
  const students = Array.isArray(teacherRes?.data?.students)
    ? teacherRes.data.students
    : [];

  const advisoryStudents = students;

  const subjects = Array.isArray(teacher?.subjects) ? teacher.subjects : [];
  const teacherSubjects = Array.isArray(teacher?.teacher_subjects)
    ? teacher.teacher_subjects
    : [];

  const gradeLabel = teacher?.grade?.grade_level || "N/A";
  const sectionLabel = teacher?.section?.section_name || "N/A";

  const loading = userLoading || teacherLoading;

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

            {/* ✅ Cards */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Advisory Class */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-teal-600" />
                    Advisory Class
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Your assigned grade & section
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3">
                  {loading ? (
                    <>
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Grade</span>
                        <Badge variant="secondary" className="text-xs">
                          {gradeLabel}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Section</span>
                        <Badge variant="secondary" className="text-xs">
                          {sectionLabel}
                        </Badge>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Students Count */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Users className="h-4 w-4 text-teal-600" />
                    Students
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Total students in your advisory
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  {loading ? (
                    <>
                      <Skeleton className="h-10 w-20 mb-2" />
                      <Skeleton className="h-3 w-32" />
                    </>
                  ) : (
                    <>
                      <div className="text-3xl font-semibold">
                        {advisoryStudents.length}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {gradeLabel} • {sectionLabel}
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Subjects */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-teal-600" />
                    Advisory Subjects
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Subjects under your grade
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-2">
                  {loading ? (
                    <>
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                      <Skeleton className="h-4 w-2/3" />
                    </>
                  ) : subjects.length ? (
                    <div className="flex flex-wrap gap-2">
                      {subjects.map((s: any) => (
                        <Badge key={s.id} variant="outline" className="text-xs">
                          {s.name}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground">No subjects.</p>
                  )}
                </CardContent>
              </Card>

              {/* Teacher Subjects */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-teal-600" />
                    Teacher Subjects
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Your assigned schedules
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3">
                  {loading ? (
                    <>
                      <Skeleton className="h-12 w-full" />
                      <Skeleton className="h-12 w-full" />
                      <Skeleton className="h-12 w-5/6" />
                    </>
                  ) : teacherSubjects.length ? (
                    <div className="space-y-2">
                      {teacherSubjects.slice(0, 3).map((t: any) => (
                        <div
                          key={t.id}
                          className="rounded-md border p-2 text-xs"
                        >
                          <div className="font-medium">{t.subject_name}</div>
                          <div className="text-muted-foreground">
                            {t.schedule_day} • {t.schedule}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      No teacher subjects assigned.
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          <Footer />
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
