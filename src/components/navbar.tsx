"use client";

import { useState, useEffect } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Megaphone, Maximize, Shrink } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

export function Navbar() {
  const [isFullscreen, setIsFullscreen] = useState(false);

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
    <nav className="p-3 flex justify-between bg-white dark:bg-black dark:border-gray-800 w-full">
      <SidebarTrigger />

      <div className="flex items-center justify-center gap-1 mr-12">
        <Sheet>
          <SheetTrigger className="mr-3 relative hover:text-teal-600">
            <span className="h-4 w-4 bg-teal-600 text-white dark:bg-teal-700 rounded-full absolute flex items-center justify-center text-xs top-[-7px] right-[-7px]">
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
                    <DialogTrigger className="h-auto w-full bg-gray-50 dark:bg-gray-900 text-start hover:bg-teal-100 dark:hover:bg-teal-700 text-black dark:text-white p-2 rounded-sm">
                      <li className="">
                        <span className="font-bold">Announcement</span>
                        <p className="text-xs">
                          @username{" "}
                          <span className="text-[10px] px-2 py-0 bg-teal-600 text-white rounded-full">
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
                            <span className="text-[10px] px-2 py-0 bg-teal-600 text-white rounded-full">
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

        <Popover>
          <PopoverTrigger className="mr-4 relative hover:text-teal-600">
            <span className="h-4 w-4 bg-teal-600 text-white dark:bg-teal-700 rounded-full absolute flex items-center justify-center text-xs top-[-7px] right-[-7px]">
              0
            </span>
            <Bell className="h-5 w-5" />
          </PopoverTrigger>
          <PopoverContent className="w-72 h-auto text-sm">
            Notification.
          </PopoverContent>
        </Popover>

        <button
          onClick={toggleFullscreen}
          className="h-5 w-5 mr-5 hover:text-teal-600"
        >
          {isFullscreen ? (
            <Shrink className="h-4 w-4" />
          ) : (
            <Maximize className="h-4 w-4" />
          )}
        </button>

        <Popover>
          <PopoverTrigger>
            <div className="flex items-center gap-1 pr-5 pl-2 py-1 bg-teal-600 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700 rounded-full">
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div className="flex flex-col text-start leading-2 text-white">
                <p className="text-xs">Sample User</p>
                <small className="text-[10px]">Role</small>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-48 h-auto py-0 px-0 text-sm">
            <div className="px-2 py-2">
              <p className="font-semibold">
                Sample User{" "}
                <span className="text-[10px] px-2 py-0 bg-teal-600 text-white rounded-full">
                  Role
                </span>
              </p>
              <p className="text-xs">sampleuser@gmail.com</p>
            </div>

            <ul className="flex flex-col mt-2">
              <li>
                <Button
                  variant="outline"
                  className="w-full border-none flex items-start justify-start hover:bg-teal-100 dark:hover:bg-teal-800 rounded-none text-sm font-normal"
                >
                  Profile
                </Button>
              </li>
              <li>
                <Button
                  variant="outline"
                  className="w-full border-none flex items-start justify-start hover:bg-teal-100 dark:hover:bg-teal-800 rounded-none text-sm font-normal"
                >
                  Logout
                </Button>
              </li>
            </ul>
          </PopoverContent>
        </Popover>
      </div>

      <ModeToggle />
    </nav>
  );
}
