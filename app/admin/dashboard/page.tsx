"use client";

import React, { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/mode-toggle";

export default function Dashboard() {
  return (
    <SidebarProvider style={{ height: "100vh" , width: "100%", padding: "1rem"}}>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <ModeToggle />
        <h1>Welcome to the Dashboard</h1>
      </main>
    </SidebarProvider>
  );
}
