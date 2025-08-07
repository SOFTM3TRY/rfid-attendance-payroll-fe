import {
  Calendar,
  Home,
  Inbox,
  SquareUser,
  Users,
  IdCardLanyard,
  Settings,
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

const items = [
  { title: "Dashboard", url: "/admin/dashboard", icon: Home },
  { title: "Email", url: "/admin/email", icon: Inbox },
  { title: "Calendar", url: "/admin/calendar", icon: Calendar },
  { title: "Manage Student", url: "#", icon: SquareUser },
  { title: "Manage Employee", url: "#", icon: IdCardLanyard },
  { title: "Manage Account", url: "#", icon: Users },
  { title: "Settings", url: "#", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <div className="flex items-center my-3">
            <img
              src="/logo.png"
              alt="logo"
              className="w-8 h-8 me-2 group-data-[collapsible=icon]:block"
            />
            <span className="text-[12px] font-bold uppercase block group-data-[collapsible=icon]:hidden text-teal-700 dark:text-teal-500">
              Young Generation Academy
            </span>
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
            <p className="font-semibold">
              Sample User{" "}
              <span className="text-[10px] px-2 py-0 bg-teal-600 text-white rounded-full">
                Role
              </span>
            </p>
            <p className="text-xs">sampleuser@gmail.com</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
