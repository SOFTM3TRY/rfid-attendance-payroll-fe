"use client";

import { useState, useMemo } from "react";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/student-sidebar";
import { Navbar } from "@/components/navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Footer } from "@/components/footer";
import { DatePickerRangeField } from "@/components/DatePickerRangeField";

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

import Calendar from "@/components/teacher-calendar";
import { useAuth } from "@/context/AuthContext";
// @ts-ignore
import { useUserDetails } from "@/hooks/useUserDetails";
import { useClientOnly } from "@/hooks/useClientOnly";

import Loader from "@/components/Loader";
import { Label } from "@/components/ui/label";
import { Calendar1, CalendarPlus2, Captions, CaseSensitive, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useCreateEvent, useEvent } from "@/hooks/useEvent";

export default function CalendarPage() {
  const { token } = useAuth();
  const isClient = useClientOnly();

  const { mutate: createEvent, isPending } = useCreateEvent();

  const { data: events, isLoading: isLoadingEvents } = useEvent(
    token as string,
  );

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

    createEvent(
      { token: token as string, data: eventForm },
      {
        onSuccess: () => {
          setCreateOpen(false); // ✅ close modal
          setEventForm({
            title: "",
            description: "",
            start_date: "",
            end_date: "",
          }); // optional reset
        },
      },
    );
  };

  const [createOpen, setCreateOpen] = useState(false);

  if (!isClient || isLoadingUserDetails) {
    return <Loader />;
  }

  return (
    <ProtectedRoute role={["1", "2", "3", "4"]}>
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

            <div className="p-5 h-full mt-5 z-1">
              <div className="w-full h-full py-2 flex items-center justify-between mb-5">
                <h1 className="text-xl lg:text-xl uppercase font-bold">
                  YGA Calendar
                </h1>

                {/* <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline" className="text-xs">
                      <CalendarPlus2 className="size-4 text-primary" /> Create Event
                    </Button>
                  </DialogTrigger>

                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-sm flex gap-2"><Calendar1 className="size-4 text-primary" /> Create Event</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit}>
                      <div className="space-y-6 mt-4">
                        <div className="grid grid-cols-1 gap-3">
                          <div className="col-span-1">
                            <Label><CaseSensitive className="size-4 text-primary" /> Event Title</Label>
                            <Input
                              type="text"
                              name="title"
                              value={eventForm.title}
                              onChange={handleChange}
                              placeholder="Enter event title"
                            />
                          </div>

                          <div className="col-span-1 mt-2">
                            <Label><Captions className="size-4 text-primary" />Description</Label>
                            <Input
                              type="text"
                              name="description"
                              value={eventForm.description}
                              onChange={handleChange}
                              placeholder="Enter event description"
                            />
                          </div>

                          <DatePickerRangeField
                            label="Event Date Range"
                            value={{
                              from: eventForm.start_date,
                              to: eventForm.end_date,
                            }}
                            onChange={({ start_date, end_date }) => {
                              setEventForm((prev) => ({
                                ...prev,
                                start_date,
                                end_date,
                              }));
                            }}
                          />
                        </div>

                        <div className="mt-5">
                          <Button
                            type="submit"
                            variant="outline"
                            size="sm"
                            className="w-full flex items-center gap-2 text-xs"
                            disabled={
                              isPending ||
                              !eventForm.title ||
                              !eventForm.start_date ||
                              !eventForm.end_date
                            }
                          >
                            {isPending && (
                              <Loader2 className="size-4 animate-spin" />
                            )}
                            <CalendarPlus2 />{isPending ? "Creating..." : "Create Event"}
                          </Button>
                        </div>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog> */}
              </div>

              <Calendar data={events} />
            </div>
          </div>

          <Footer />
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
