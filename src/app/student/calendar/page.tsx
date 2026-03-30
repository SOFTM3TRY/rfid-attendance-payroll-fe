"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/student-sidebar";
import { Navbar } from "@/components/navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Footer } from "@/components/footer";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Calendar from "@/components/teacher-calendar";
import { useSession } from "@/context/SessionContext";
import { Label } from "@/components/ui/label";
import { Calendar1 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useEvent } from "@/hooks/useEvent";

function CalendarContentSkeleton() {
  return (
    <div className="p-5 h-full mt-5 space-y-5">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-40" />
      </div>
      <div className="grid grid-cols-7 gap-3">
        {Array.from({ length: 7 }).map((_, index) => (
          <Skeleton key={index} className="h-10 w-full" />
        ))}
      </div>
      <div className="grid grid-cols-7 gap-3">
        {Array.from({ length: 35 }).map((_, index) => (
          <Skeleton key={index} className="h-24 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
}

export default function CalendarPage() {
  const { token, isLoading: isLoadingUserDetails } = useSession();
  const { data: events, isLoading: isLoadingEvents } = useEvent(token as string);

  const isPageLoading = isLoadingUserDetails || isLoadingEvents;

  return (
    <ProtectedRoute role={["1", "2", "3", "4"]}>
      <SidebarProvider style={{ height: "100vh", width: "100%" }}>
        <AppSidebar />
        <main className="w-full h-auto">
          <Navbar />

          <div className="p-5">
            <div className="flex items-center justify-between">
              <Label className="text-sm">
                <Calendar1 className="size-4 text-primary" /> Calendar
              </Label>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/admin/dashboard">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Calendar</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            {isPageLoading ? (
              <CalendarContentSkeleton />
            ) : (
              <div className="p-5 h-full mt-5 z-1">
                <div className="w-full h-full py-2 flex items-center justify-between mb-5">
                  <h1 className="text-xl lg:text-xl uppercase font-bold">
                    YGA Calendar
                  </h1>
                </div>

                <Calendar data={events} />
              </div>
            )}
          </div>

          <Footer />
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
