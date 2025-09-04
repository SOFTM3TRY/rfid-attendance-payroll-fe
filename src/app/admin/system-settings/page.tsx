"use client";

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
// @ts-ignore
import { useUserDetails } from "@/hooks/useUserDetails";
import { useClientOnly } from "@/hooks/useClientOnly";

import Loader from "@/components/Loader";

import SystemTabPage from "@/components/admin/manage-system/SystemTabPage";

import { Users } from "lucide-react";

export default function manageSettings() {
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
              <h1 className="text-lg font-medium flex"><Users  className="mr-2 w-6 h-6 text-teal-500"/> Manage Settings</h1>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/admin/dashboard">
                      Dashboard
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Manage Settings</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            <div className="p-2 h-full mt-15 z-1">
              <SystemTabPage />
            </div>
          </div>
          <Footer />
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
