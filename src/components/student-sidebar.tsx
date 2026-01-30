"use client";

import { Calendar, Home } from "lucide-react";
import { usePathname } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";

import SplitTextSide from "@/components/animata/text/split-text-side";

const items = [
  { title: "Dashboard", url: "/student/dashboard", icon: Home },
  { title: "Calendar", url: "/student/calendar", icon: Calendar },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar
      collapsible="icon"
      variant="floating"
      style={{ pointerEvents: "auto" }}
    >
      <SidebarContent>
        {/* HEADER (same style like teacher/admin) */}
        <SidebarHeader>
          <div className="flex flex-col items-center justify-center gap-5 p-3 group-data-[collapsible=icon]:mt-3 group-data-[collapsible=icon]:mb-3 group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:p-0">
            <img
              src="/logo.png"
              alt="logo"
              className="w-25 h-25 group-data-[collapsible=icon]:block group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-8"
              draggable={false}
            />

            <SplitTextSide
              text="Young Generation Academy"
              className="group-data-[collapsible=icon]:hidden"
            />
          </div>
        </SidebarHeader>

        {/* MAIN SECTION */}
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="mt-2 gap-3">
              {items.map(({ title, url, icon: Icon }) => (
                <SidebarMenuItem key={title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={title}
                    className={`h-8 rounded-sm text-xs group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:gap-4 ${
                      pathname === url ? "bg-accent" : ""
                    }`}
                  >
                    <a href={url}>
                      <Icon className="size-4" />
                      {title}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* FOOTER (same style like teacher/admin) */}
      <SidebarFooter className="py-5">
        <div className="flex items-center gap-4">
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>ST</AvatarFallback>
          </Avatar>

          <div className="px-2 py-2 block group-data-[collapsible=icon]:hidden">
            <p className="font-semibold text-xs">
              Student Student
              <span className="text-[10px] px-2 py-0 bg-accent rounded-full ml-2">
                Student
              </span>
            </p>
            <p className="text-xs text-muted-foreground">student@yga.edu.ph</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
