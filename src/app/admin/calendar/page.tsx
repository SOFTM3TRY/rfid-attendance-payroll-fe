"use client";

import { useState, useMemo } from "react";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
import { Navbar } from "@/components/navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Footer } from "@/components/footer";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Calendar from "@/components/Calendar";
import { useAuth } from "@/context/AuthContext";
// @ts-ignore
import { useUserDetails } from "@/hooks/useUserDetails";
import { useClientOnly } from "@/hooks/useClientOnly";

import Loader from "@/components/Loader";
import { Label } from "@/components/ui/label";
import { Calendar1 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useCreateEvent, useEvent } from "@/hooks/useEvent";

export default function CalendarPage() {
  const { token } = useAuth();
  const isClient = useClientOnly();

  const { mutate: createEvent } = useCreateEvent();

  const { data: events, isLoading: isLoadingEvents } = useEvent(token as string);

  const { data: userDetails, isLoading: isLoadingUserDetails } = useUserDetails(
    token as string,
  );

  const [eventForm, setEventForm] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEventForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createEvent({
      token: token as string,
      data: eventForm,
    });
  };

  if (!isClient || isLoadingUserDetails) {
    return <Loader />;
  }

  return (
    <ProtectedRoute>
      <SidebarProvider style={{ height: "100vh", width: "100%" }}>
        <AppSidebar />
        <main className="w-full h-auto">
          <Navbar />

          <div className="p-5">
            <div className="flex items-center justify-between">
              <Label className="text-sm">
                <Calendar1 className="size-4 text-primary" /> Calendar
              </Label>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/admin/dashboard">
                      Dashboard
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Calendar</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            <pre>{JSON.stringify(events, null, 2)}</pre>

            <div className="p-5 h-full mt-5 z-1">
              <div className="w-full h-full py-2 flex items-center justify-between mb-5">
                <h1 className="text-xl lg:text-xl uppercase font-bold">
                  YGA Calendar
                </h1>

                <Dialog>
                  <DialogTrigger>
                    <Button size="sm" variant="outline">
                      Create Event
                    </Button>
                  </DialogTrigger>

                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create Event</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit}>
                      <div className="space-y-6">
                        <div className="grid grid-cols-1">
                          <div className="col-span-1">
                            <Label>Title</Label>
                            <Input
                              type="text"
                              name="title"
                              value={eventForm.title}
                              onChange={handleChange}
                              placeholder="Enter event title"
                            />
                          </div>

                          <div className="col-span-1">
                            <Label>Description</Label>
                            <Input
                              type="text"
                              name="description"
                              value={eventForm.description}
                              onChange={handleChange}
                              placeholder="Enter event description"
                            />
                          </div>

                          <div className="col-span-1">
                            <Label>Start Date</Label>
                            <Input
                              type="date"
                              name="start_date"
                              value={eventForm.start_date}
                              onChange={handleChange}
                            />
                          </div>

                          <div className="col-span-1">
                            <Label>End Date</Label>
                            <Input
                              type="date"
                              name="end_date"
                              value={eventForm.end_date}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="mt-5">
                          <Button type="submit" className="w-full">
                            Create Event
                          </Button>
                        </div>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <Calendar />
            </div>
          </div>

          <Footer />
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
