"use client";

import { memo, useEffect, useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Megaphone, Maximize, Shrink, User2, LogOut } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useSession } from "@/context/SessionContext";
import { useAnnouncements } from "@/hooks/useAnnouncements";
import { logout } from "@/services/User_service";
import toast from "react-hot-toast";
import { NavbarProfileSkeleton } from "@/components/skeletons/NavbarProfileSkeleton";
import { AnnouncementSheetContent } from "@/components/announcements/AnnouncementSheetContent";

export const Navbar = memo(function Navbar() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { token, logout: logoutUser } = useAuth();
  const { user, roleId, isLoading } = useSession();
  const { data: announcementsResponse } = useAnnouncements(token);

  const announcementCount = Array.isArray(announcementsResponse?.data)
    ? announcementsResponse.data.length
    : 0;

  const handlelogout = async () => {
    try {
      await logout(token as string);
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      logoutUser();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement !== null);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    const element = document.documentElement;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      element.requestFullscreen();
    }
  };

  return (
    <nav
      className="p-3 flex z-50 justify-between w-full sticky top-0"
      style={{ pointerEvents: "auto" }}
    >
      <SidebarTrigger />

      <div className="flex items-center justify-center gap-1 mr-2">
        <Sheet>
          <SheetTrigger className="size-4 flex items-center relative mr-3 hover:text-primary">
            {announcementCount > 0 ? (
              <span className="h-4 min-w-4 px-1 bg-primary/50 text-white dark:bg-primary rounded-full absolute flex items-center justify-center text-sm top-[-7px] right-[-7px]">
                {announcementCount}
              </span>
            ) : null}
            <Megaphone className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="flex items-center">
                <Megaphone className="h-5 w-5 mr-2" /> Announcement
              </SheetTitle>
            </SheetHeader>
            <AnnouncementSheetContent />
          </SheetContent>
        </Sheet>

        <button
          onClick={toggleFullscreen}
          className="h-5 w-5 mr-2 hover:text-primary"
        >
          {isFullscreen ? <Shrink className="size-4" /> : <Maximize className="size-4" />}
        </button>

        <AnimatedThemeToggler />

        <Popover>
          <PopoverTrigger>
            {isLoading ? (
              <NavbarProfileSkeleton />
            ) : (
              <div className="flex items-center gap-1 pr-5 pl-2 py-1 ml-5 bg-primary/50 hover:bg-primary dark:bg-primary/50 dark:hover:bg-primary rounded-full">
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

                <div className="flex flex-col text-start leading-2 text-white">
                  <p className="text-sm">{[user?.first_name, user?.last_name].filter(Boolean).join(" ")}</p>
                  <small className="text-[10px]">
                    {roleId === 1
                      ? "Super Admin"
                      : roleId === 2
                        ? "Admin"
                        : roleId === 3
                          ? "Teacher"
                          : "Student"}
                  </small>
                </div>
              </div>
            )}
          </PopoverTrigger>
          <PopoverContent className="w-full h-auto py-0 px-0 text-sm">
            <div className="px-2 py-2">
              <p className="font-semibold">
                {[user?.first_name, user?.last_name].filter(Boolean).join(" ")}
                <span className="text-[10px] px-2 py-0 bg-primary/50 text-white rounded-full ml-1">
                  {roleId === 1
                    ? "Super Admin"
                    : roleId === 2
                      ? "Admin"
                      : roleId === 3
                        ? "Teacher"
                        : "Student"}
                </span>
              </p>
              <p className="text-sm">{user?.email}</p>
            </div>

            <ul className="flex flex-col mt-2">
              <li>
                <Link
                  href={
                    roleId === 1 || roleId === 2
                      ? "/profile"
                      : roleId === 3
                        ? "/teacher/profile"
                        : "/student/profile"
                  }
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-none flex justify-start rounded-none text-sm font-normal"
                  >
                    <User2 className="text-primary" />
                    Profile
                  </Button>
                </Link>
              </li>
              <li>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlelogout}
                  className="w-full border-none flex justify-start rounded-none text-sm font-normal"
                >
                  <LogOut className="text-destructive" /> Logout
                </Button>
              </li>
            </ul>
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
});
