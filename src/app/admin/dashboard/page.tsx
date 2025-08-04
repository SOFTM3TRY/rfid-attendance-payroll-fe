"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Navbar } from "@/components/navbar";

export default function Dashboard() {
  return (
    <SidebarProvider style={{ height: "100vh", width: "100%" }}>
      <AppSidebar />
      <main className="w-full h-auto">
        <Navbar />
      </main>
    </SidebarProvider>
  );
}
