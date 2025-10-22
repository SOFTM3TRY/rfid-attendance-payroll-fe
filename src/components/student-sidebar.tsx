"use client";
import {
  Calendar,
  Home,
  Inbox,
  SquareUser,
  Users,
  IdCardLanyard,
  Settings,
  ShieldUser,
} from "lucide-react";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
} from "@/components/ui/sidebar";
// import { useAuth } from "@/context/AuthContext";
// @ts-ignore
// import { useUserDetails } from "@/hooks/useUserDetails";
// import { useEffect, useState } from "react";
// import { useClientOnly } from "@/hooks/useClientOnly";

import SplitTextSide from "@/components/animata/text/split-text-side";

const items = [
  { title: "Dashboard", url: "/teacher/dashboard", icon: Home },
  // { title: "Email", url: "/teacher/email", icon: Inbox },
  { title: "Calendar", url: "/teacher/calendar", icon: Calendar },
  { title: "Manage Avisory Class", url: "/teacher/manage-student", icon: SquareUser },
  // {
  //   title: "Manage Teacher",
  //   url: "/teacher/manage-teacher",
  //   icon: IdCardLanyard,
  // },
  // { title: "Manage Admin", url: "/teacher/manage-admin", icon: ShieldUser },
  // { title: "System Settings", url: "/teacher/system-settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();

  // const { token } = useAuth();
  // const isClient = useClientOnly();

  // const { data: userDetails, isLoading: isLoadingUserDetails } = useUserDetails(
  //   token as string
  // );

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup style={{ pointerEvents: "auto" }}>
          <div className="flex flex-col items-center justify-center gap-5 p-3 group-data-[collapsible=icon]:mt-3 group-data-[collapsible=icon]:mb-3 group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:p-0">
            <img
              src="/logo.png"
              alt="logo"
              className="w-25 h-25 group-data-[collapsible=icon]:block group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-8"
            />

            <SplitTextSide
              text="Young Generation Academy"
              className="group-data-[collapsible=icon]:hidden"
            />
          </div>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="mt-2">
              {items.map(({ title, url, icon: Icon }) => (
                <SidebarMenuItem key={title}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton
                        asChild
                        className={`h-10 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:gap-2 ${
                          url === pathname
                            ? "bg-teal-600 h-10 text-white hover:bg-teal-800 hover:text-white"
                            : ""
                        }`}
                      >
                        <a href={url}>
                          <Icon className="size-4" />
                          <span className="block group-data-[collapsible=icon]:hidden">
                            {title}
                          </span>
                        </a>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent
                      side="right"
                      align="center"
                      className="block group-data-[collapsible=icon]:hidden"
                    >
                      {title}
                    </TooltipContent>
                  </Tooltip>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="py-5">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="px-2 py-2 block group-data-[collapsible=icon]:hidden">
            <p className="font-semibold text-xs">
              Student Student
              <span className="text-[10px] px-2 py-0 bg-teal-600 text-white rounded-full">
                student
              </span>
            </p>
            <p className="text-xs">Studnet</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

