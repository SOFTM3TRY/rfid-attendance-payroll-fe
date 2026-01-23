"use client";

import { useState, useMemo } from "react";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
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

import Calendar from "@/components/Calendar";
import { useAuth } from "@/context/AuthContext";
// @ts-ignore
import { useUserDetails } from "@/hooks/useUserDetails";
import { useClientOnly } from "@/hooks/useClientOnly";

import Loader from "@/components/Loader";
import { Label } from "@/components/ui/label";
import { Calendar1 } from "lucide-react";

export default function CalendarPage() {
  const { token } = useAuth();
  const isClient = useClientOnly();

  const { data: userDetails, isLoading: isLoadingUserDetails } = useUserDetails(
    token as string
  );

  if (!isClient || isLoadingUserDetails) {
    return <Loader />;
  }
  
  return (
    <ProtectedRoute>
      <SidebarProvider style={{ height: "100vh", width: "100%" }}>
        <AppSidebar />
        <main className="w-full h-auto">
          <Navbar />

          <div className="p-5">
            <div className="flex items-center justify-between">
              <Label className="text-sm"><Calendar1 className="size-4 text-primary" /> Calendar</Label>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/admin/dashboard">
                      Dashboard
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Calendar</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            <div className="p-5 h-full mt-5 z-1">
              <Calendar />
            </div>
          </div>

          <Footer />
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
