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
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";
// @ts-ignore
import { useUserDetails } from "@/hooks/useUserDetails";
import { useClientOnly } from "@/hooks/useClientOnly";

import SplitTextSide from "@/components/animata/text/split-text-side";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: Home, view: [1, 2] },
  { title: "Calendar", url: "/calendar", icon: Calendar, view: [1, 2] },
  {
    title: "Manage Student",
    url: "/manage-student",
    icon: SquareUser,
    view: [1, 2],
  },
  {
    title: "Manage Teacher",
    url: "/manage-teacher",
    icon: IdCardLanyard,
    view: [1, 2],
  },
  { title: "Manage Admin", url: "/manage-admin", icon: ShieldUser, view: [1] },
  {
    title: "Mange System",
    url: "/manage-system",
    icon: Settings,
    view: [1, 2],
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  const { token } = useAuth();
  const isClient = useClientOnly();

  const { data: userDetails, isLoading: isLoadingUserDetails } = useUserDetails(
    token as string,
  );

  return (
    <Sidebar
      collapsible="icon"
      variant="floating"
      style={{ pointerEvents: "auto" }}
    >
      <SidebarContent>
        <SidebarHeader>
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
        </SidebarHeader>

        <SidebarGroup>
          {/* MAIN SECTION */}
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="mt-2 gap-3">
              {items
                .filter((i) => ["Dashboard", "Calendar"].includes(i.title))
                .map(({ title, url, icon: Icon }) => (
                  <SidebarMenuItem key={title}>
                    <SidebarMenuButton
                      asChild
                      className={`h-8 rounded-sm text-sm group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:gap-4 ${
                        pathname === url ? "bg-accent" : ""
                      }`}
                      tooltip={title}
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

        <SidebarGroup>
          {/* USER MANAGEMENT SECTION */}
          <SidebarGroupLabel>User Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="mt-2 gap-3">
              {items
                .filter(
                  (i) =>
                    [
                      "Manage Student",
                      "Manage Teacher",
                      "Manage Admin",
                    ].includes(i.title) &&
                    i.view.includes(userDetails?.data.role_id),
                )
                .map(({ title, url, icon: Icon }) => (
                  <SidebarMenuItem key={title}>
                    <SidebarMenuButton
                      asChild
                      className={`h-8 rounded-sm text-sm group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:gap-4 ${
                        pathname === url ? "bg-accent" : ""
                      }`}
                      tooltip={title}
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

        <SidebarGroup>
          {/* SETTINGS SECTION */}
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="mt-2 gap-3">
              {items
                .filter((i) => ["Mange System"].includes(i.title))
                .map(({ title, url, icon: Icon }) => (
                  <SidebarMenuItem key={title}>
                    <SidebarMenuButton
                      asChild
                      className={`h-8 rounded-sm text-sm group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:gap-4 ${
                        pathname === url ? "bg-accent" : ""
                      }`}
                      tooltip={title}
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
      <SidebarFooter className="py-5">
        <div className="flex items-center gap-4">
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarImage
              src={
                userDetails?.data.avatar
                  ? `https://rfid-api.barangay185bms.com/storage/avatars/${userDetails?.data.avatar}`
                  : "https://github.com/shadcn.png"
              }
            />
            <AvatarFallback>
              {userDetails?.data.first_name.charAt(0)}
              {userDetails?.data.last_name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="px-2 py-2 block group-data-[collapsible=icon]:hidden">
            <p className="font-semibold text-sm">
              {userDetails?.data.first_name + " " + userDetails?.data.last_name}
              <span className="text-[10px] px-2 py-0 bg-accent rounded-full">
                {userDetails?.data.role_id === 1
                  ? "Admin"
                  : userDetails?.data.role_id === 2
                    ? "Teacher"
                    : ""}
              </span>
            </p>
            <p className="text-sm">{userDetails?.data.email}</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
