"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/mode-toggle";

export function Navbar() {
  return (
    <nav className="p-4 bg-white dark:bg-black dark:border-gray-800 w-full">
        <SidebarTrigger />
        <ModeToggle />
    </nav>
  );
}
