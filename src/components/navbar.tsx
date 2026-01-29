"use client";

import { useState, useEffect } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
// import { ModeToggle } from "@/components/mode-toggle";
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
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Link from "next/link";
import { useUserDetails } from "@/hooks/useUserDetails";
import { useClientOnly } from "@/hooks/useClientOnly";
import { useAuth } from "@/context/AuthContext";
import { logout } from "@/services/User_service";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function Navbar() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { token } = useAuth();
  const isClient = useClientOnly();
  const { data: userDetails, isLoading: isLoadingUserDetails } = useUserDetails(
    token as string,
  );
  const router = useRouter();
  const handlelogout = async () => {
    try {
      const response = await logout(token as string);
      toast.success("Logged out successfully");
      router.push("/");
    } catch (error) {
      console.error("Error during logout:", error);
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
            <span className="h-4 w-4 bg-primary/50 text-white dark:bg-primary rounded-full absolute flex items-center justify-center text-xs top-[-7px] right-[-7px]">
              0
            </span>
            <Megaphone className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="flex items-center">
                <Megaphone className="h-5 w-5 mr-2" /> Announcement
              </SheetTitle>
              <SheetDescription className="mt-5">
                <ul className="w-full">
                  <Dialog>
                    <DialogTrigger className="h-auto w-full bg-gray-50 dark:bg-gray-900 text-start hover:bg-teal-100 dark:hover:bg-primary text-black dark:text-white p-2 rounded-sm">
                      <li className="">
                        <span className="font-bold">Announcement</span>
                        <p className="text-xs">
                          @username{" "}
                          <span className="text-[10px] px-2 py-0 bg-primary/50 text-white rounded-full">
                            role
                          </span>{" "}
                          - <span>date</span>
                        </p>
                        <span className="text-xs mt-9 ml-5">
                          Announcements...
                        </span>
                      </li>
                    </DialogTrigger>
                    <DialogContent className="w-full">
                      <DialogHeader>
                        <DialogTitle className="flex items-center">
                          <Megaphone className="h-5 w-5 mr-2" /> Announcement
                        </DialogTitle>
                        <DialogTitle className="flex items-center">
                          <p className="text-xs">
                            @username{" "}
                            <span className="text-[10px] px-2 py-0 bg-primary/50 text-white rounded-full">
                              role
                            </span>{" "}
                            - <span>date</span>
                          </p>
                        </DialogTitle>
                        <DialogDescription className="px-5 mt-5">
                          Announcement
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </ul>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        {/* <Popover>
          <PopoverTrigger className="mr-4 relative hover:text-primary">
            <span className="h-4 w-4 bg-primary/50 text-white dark:bg-primary rounded-full absolute flex items-center justify-center text-xs top-[-7px] right-[-7px]">
              0
            </span>
            <Bell className="size-4" />
          </PopoverTrigger>
          <PopoverContent className="w-72 h-auto text-xs">
            Notification.
          </PopoverContent>
        </Popover> */}

        <button
          onClick={toggleFullscreen}
          className="h-5 w-5  mr-2 hover:text-primary"
        >
          {isFullscreen ? (
            <Shrink className="size-4" />
          ) : (
            <Maximize className="size-4" />
          )}
        </button>

        <AnimatedThemeToggler />

        <Popover>
          <PopoverTrigger>
            <div className="flex items-center gap-1 pr-5 pl-2 py-1 ml-5 bg-primary/50 hover:bg-primary dark:bg-primary/50 dark:hover:bg-primary rounded-full">
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

              <div className="flex flex-col text-start leading-2 text-white">
                <p className="text-xs">
                  {" "}
                  {userDetails?.data.first_name +
                    " " +
                    userDetails?.data.last_name}
                </p>
                <small className="text-[10px]">
                  {userDetails?.data.role_id === 1
                    ? "Admin"
                    : userDetails?.data.role_id === 2
                      ? "Teacher"
                      : ""}
                </small>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-48 h-auto py-0 px-0 text-xs">
            <div className="px-2 py-2">
              <p className="font-semibold">
                {userDetails?.data.first_name +
                  " " +
                  userDetails?.data.last_name}
                <span className="text-[10px] px-2 py-0 bg-primary/50 text-white rounded-full ml-1">
                  {userDetails?.data.role_id === 1
                    ? "Admin"
                    : userDetails?.data.role_id === 2
                      ? "Teacher"
                      : "Student"}
                </span>
              </p>
              <p className="text-xs">{userDetails?.data.email}</p>
            </div>

            <ul className="flex flex-col mt-2">
              <li>
                <Link
                  href={
                    userDetails?.data.role_id === 1
                      ? "/admin/profile"
                      : userDetails?.data.role_id === 2
                        ? "/teacher/profile"
                        : "/student/profile"
                  }
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-none flex justify-start rounded-none text-xs font-normal"
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
                  className="w-full border-none flex justify-start rounded-none text-xs font-normal"
                >
                  <LogOut className="text-destructive" /> Logout
                </Button>
              </li>
            </ul>
          </PopoverContent>
        </Popover>
      </div>

      {/* <ModeToggle /> */}
    </nav>
  );
}
