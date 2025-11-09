"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/student-sidebar";
import { Navbar } from "@/components/navbar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Footer } from "@/components/footer";
import { useUserDetails } from "@/hooks/useUserDetails";

export default function Dashboard() {
  // Retrieve token from localStorage or your auth provider
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Call the hook
  const { data: user, isError, error } = useUserDetails(token);

  if (isError) {
    return <div className="p-5 text-red-500">Error loading user details: {error.message}</div>;
  }

  return (
    <ProtectedRoute role="3">
      <SidebarProvider style={{ height: "100vh", width: "100%" }}>
        <AppSidebar />
        <main className="w-full h-auto">
          <Navbar />

          <div className="p-5">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">Dashboard</h1>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage>Dashboard</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            <div className="mt-10 p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <pre className="whitespace-pre-wrap text-white p-3 rounded">
                {JSON.stringify(user, null, 2)}
              </pre>
            </div>
          </div>
          <Footer />
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
