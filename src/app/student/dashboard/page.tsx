"use client";

import * as React from "react";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/student-sidebar";
import { Navbar } from "@/components/navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Footer } from "@/components/footer";

import { useTeacherSchedulesByGradeAndSection } from "@/hooks/useSubjects";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/context/SessionContext";

import { GraduationCap, BookOpen, User, Layers, HouseIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";

export default function Dashboard() {
  const { token, user, isLoading: userLoading } = useSession();

  const gradeId = user?.grade_id;
  const sectionId = user?.section_id;

  const { data: schedules, isLoading: scheduleLoading } =
    useTeacherSchedulesByGradeAndSection(token, gradeId, sectionId);

  return (
    <ProtectedRoute role={["1", "2", "3", "4"]}>
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
              {/* CARD 1: Grade */}
              <Card className="rounded-2xl shadow-sm">
                <CardHeader className="flex flex-row items-center gap-2">
                  <GraduationCap className="text-primary size-5" />
                  <CardTitle className="text-sm">Grade</CardTitle>
                </CardHeader>
                <CardContent>
                  {userLoading ? (
                    <Skeleton className="h-6 w-40" />
                  ) : (
                    <p className="font-bold text-lg">
                      {user?.grade?.grade_level || "N/A"}
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* CARD 2: Section */}
              <Card className="rounded-2xl shadow-sm">
                <CardHeader className="flex flex-row items-center gap-2">
                  <Layers className="text-primary size-5" />
                  <CardTitle className="text-sm">Section</CardTitle>
                </CardHeader>
                <CardContent>
                  {userLoading ? (
                    <Skeleton className="h-6 w-32" />
                  ) : (
                    <p className="font-bold text-lg">
                      {user?.section?.section_name || "N/A"}
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* CARD 3: Teacher */}
              <Card className="rounded-2xl shadow-sm">
                <CardHeader className="flex flex-row items-center gap-2">
                  <User className="text-primary size-5" />
                  <CardTitle className="text-sm">Adviser Teacher</CardTitle>
                </CardHeader>
                <CardContent>
                  {userLoading ? (
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-3 w-48" />
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-col items-center gap-3">
                        <Avatar className="w-20 h-20 ">
                          <AvatarImage
                            src={user?.teacher?.avatar || "https://github.com/shadcn.png"}
                            alt={user?.teacher?.first_name}
                          />
                          <AvatarFallback className="uppercase">
                            {user?.teacher?.first_name?.charAt(0)}
                            {user?.teacher?.last_name?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <p className="font-semibold text-center text-sm uppercase">
                          {user?.teacher
                            ? `Teacher ${user.teacher.first_name} ${user.teacher.middle_name} ${user.teacher.last_name} ${user.teacher.suffix}`
                            : "No Teacher"}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {user?.teacher?.email || ""}
                        </p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* CARD 4: Subjects */}
              <Card className="rounded-2xl shadow-sm">
                <CardHeader className="flex flex-row items-center gap-2">
                  <BookOpen className="text-primary size-5" />
                  <CardTitle className="text-sm">Subjects</CardTitle>
                </CardHeader>

                <CardContent className="space-y-2">
                  {userLoading ? (
                    <>
                      <Skeleton className="h-5 w-full" />
                      <Skeleton className="h-5 w-5/6" />
                      <Skeleton className="h-5 w-4/6" />
                    </>
                  ) : user?.subjects?.length ? (
                    user.subjects.map((sub: any) => (
                      <p
                        key={sub.id}
                        className="text-xs font-medium bg-accent/20 px-2 py-1 rounded-md"
                      >
                        {sub.name}
                      </p>
                    ))
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      No subjects assigned
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* ✅ SCHEDULE SECTION */}
            <div className="mt-10">
              <h2 className="text-sm font-semibold mb-4">Class Schedule</h2>

              {scheduleLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Card key={i} className="rounded-xl border shadow-sm">
                      <CardHeader>
                        <Skeleton className="h-4 w-32" />
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <Skeleton className="h-3 w-48" />
                        <Skeleton className="h-3 w-32" />
                        <Skeleton className="h-3 w-40" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : schedules?.data?.length ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {schedules.data.map((s: any) => (
                    <Card key={s.id} className="rounded-xl border shadow-sm">
                      <CardHeader>
                        <CardTitle className="text-sm">
                          {s.subject_name}
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="text-xs space-y-1">
                        <p>
                          <b>Teacher:</b> {s.teacher_name}
                        </p>
                        <p>
                          <b>Day:</b> {s.schedule_day}
                        </p>
                        <p>
                          <b>Time:</b> {s.schedule}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">
                  No schedules found for your section.
                </p>
              )}
            </div>
          </div>

          <Footer />
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
