"use client";

import { memo } from "react";
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
import Link from "next/link";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarProfileSkeleton } from "@/components/skeletons/SidebarProfileSkeleton";
import { useSession } from "@/context/SessionContext";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: Home, view: [1, 2] },
  { title: "Calendar", url: "/calendar", icon: Calendar, view: [1, 2] },
  { title: "Manage Student", url: "/manage-student", icon: SquareUser, view: [1, 2] },
  { title: "Manage Teacher", url: "/manage-teacher", icon: IdCardLanyard, view: [1, 2] },
  { title: "Manage Admin", url: "/manage-admin", icon: ShieldUser, view: [1] },
  { title: "Mange System", url: "/manage-system", icon: Settings, view: [1, 2] },
  { title: "Teacher history", url: "/teacher-history", icon: Inbox, view: [1, 2] },
  { title: "Reports", url: "/reports", icon: Users, view: [1, 2] },
];

export const AppSidebar = memo(function AppSidebar() {
  const pathname = usePathname();
  const { user, roleId, isLoading } = useSession();

  return (
    <Sidebar collapsible="icon" variant="floating" style={{ pointerEvents: "auto" }}>
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
      <SidebarContent>
        <ScrollArea className="h-full rounded-md border">
          <SidebarGroup>
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
                        <Link href={url}>
                          <Icon className="size-4" />
                          {title}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>User Management</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="mt-2 gap-3">
                {items
                  .filter(
                    (i) =>
                      ["Manage Student", "Manage Teacher", "Manage Admin"].includes(i.title) &&
                      i.view.includes(roleId ?? 0),
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
                        <Link href={url}>
                          <Icon className="size-4" />
                          {title}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
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
                        <Link href={url}>
                          <Icon className="size-4" />
                          {title}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>History & Reports</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="mt-2 gap-3">
                {items
                  .filter((i) => ["Teacher history", "Reports"].includes(i.title))
                  .map(({ title, url, icon: Icon }) => (
                    <SidebarMenuItem key={title}>
                      <SidebarMenuButton
                        asChild
                        className={`h-8 rounded-sm text-sm group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:gap-4 ${
                          pathname === url ? "bg-accent" : ""
                        }`}
                        tooltip={title}
                      >
                        <Link href={url}>
                          <Icon className="size-4" />
                          {title}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter className="py-5">
        {isLoading ? (
          <SidebarProfileSkeleton />
        ) : (
          <div className="flex items-center gap-4">
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarImage
                src={
                  user?.avatar
                    ? `https://rfid-api.barangay185bms.com/storage/avatars/${user.avatar}`
                    : "https://github.com/shadcn.png"
                }
              />
              <AvatarFallback>
                {user?.first_name?.charAt(0) ?? "U"}
                {user?.last_name?.charAt(0) ?? "U"}
              </AvatarFallback>
            </Avatar>

            <div className="px-2 py-2 block group-data-[collapsible=icon]:hidden">
              <p className="font-semibold text-sm">
                {[user?.first_name, user?.last_name].filter(Boolean).join(" ")}
                <span className="text-[10px] px-2 py-0 bg-accent rounded-full ml-1">
                  {roleId === 1 ? "Super Admin" : roleId === 2 ? "Admin" : "Teacher"}
                </span>
              </p>
              <p className="text-sm">{user?.email}</p>
            </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
});
