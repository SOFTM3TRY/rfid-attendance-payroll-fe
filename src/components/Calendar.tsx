"use client";

import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";

import { EventClickArg } from "@fullcalendar/core";

import { useAuth } from "@/context/AuthContext";
import { useDeleteEvent, useUpdateEvent } from "@/hooks/useEvent";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DatePickerRangeField } from "@/components/DatePickerRangeField";
import { CalendarIcon, Captions, CaseSensitive, Loader2, Save, SquarePen, Trash, Undo2 } from "lucide-react";

type ApiEvent = {
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
};

type ApiResponse = {
  status: boolean;
  data: ApiEvent[];
};

function addOneDay(dateStr: string) {
  const d = new Date(`${dateStr}T00:00:00`);
  d.setDate(d.getDate() + 1);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export default function Calendar({ data }: { data: ApiResponse }) {
  const { token } = useAuth();

  const { mutate: updateEvent, isPending: isUpdating } = useUpdateEvent();
  const { mutate: deleteEvent, isPending: isDeleting } = useDeleteEvent();

  const [open, setOpen] = React.useState(false);
  const [mode, setMode] = React.useState<"view" | "edit">("view");

  const [selected, setSelected] = React.useState<ApiEvent | null>(null);

  const [editForm, setEditForm] = React.useState({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
  });

  const calendarEvents = React.useMemo(() => {
    if (!data?.status || !Array.isArray(data?.data)) return [];
    return data.data.map((ev) => ({
      id: String(ev.id),
      title: ev.title,
      start: ev.start_date,
      end: addOneDay(ev.end_date), // FullCalendar end is exclusive
      allDay: true,
      extendedProps: {
        description: ev.description,
        start_date: ev.start_date,
        end_date: ev.end_date,
      },
    }));
  }, [data]);

  const onEventClick = (arg: EventClickArg) => {
    const id = Number(arg.event.id);
    const description = (arg.event.extendedProps as any)?.description ?? "";
    const start_date =
      (arg.event.extendedProps as any)?.start_date ?? arg.event.startStr;
    const end_date =
      (arg.event.extendedProps as any)?.end_date ?? arg.event.endStr;

    const ev: ApiEvent = {
      id,
      title: arg.event.title,
      description,
      start_date,
      end_date,
    };

    setSelected(ev);
    setEditForm({
      title: ev.title,
      description: ev.description,
      start_date: ev.start_date,
      end_date: ev.end_date,
    });
    setMode("view");
    setOpen(true);
  };

  // optional: date click still works if you want
  const onDateClick = (arg: DateClickArg) => {
    // you can open "create event" here if you want later
    // for now do nothing
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;

    updateEvent(
      {
        token: token as string,
        id: selected.id,
        data: editForm,
      },
      {
        onSuccess: () => {
          setOpen(false);
        },
      },
    );
  };

  const handleDelete = () => {
    if (!selected) return;
    deleteEvent(
      { token: token as string, id: selected.id },
      {
        onSuccess: () => {
          setOpen(false);
        },
      },
    );
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        eventClick={onEventClick}
        dateClick={onDateClick}
        events={calendarEvents}
        height="auto"
        headerToolbar={{
          left: "prev,next today",
          center: "",
          right: "title",
        }}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-sm flex gap-2">
              <CalendarIcon className="size-4" />{mode === "view" ? "Event Details" : "Edit Event"}
            </DialogTitle>
          </DialogHeader>

          {!selected ? (
            <p className="text-sm text-muted-foreground">No event selected.</p>
          ) : mode === "view" ? (
            <div className="space-y-3 text-sm">
              <div className="flex flex-col gap-2">
                <Label className="text-sm text-muted-foreground">Title</Label>
                <p className="font-medium text-sm">{selected.title}</p>
              </div>

              <div className="flex flex-col gap-2">
                <Label className="text-sm text-muted-foreground">Description</Label>
                <p className="font-medium text-sm">{selected.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-2">
                  <Label className="text-sm text-muted-foreground">Start</Label>
                  <p className="font-medium text-sm">{selected.start_date}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-sm text-muted-foreground">End</Label>
                  <p className="font-medium text-sm">{selected.end_date}</p>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="default"
                  size="sm"
                  className="text-sm"
                  onClick={() => setMode("edit")}
                  disabled={isDeleting || isUpdating}
                >
                  <SquarePen className="size-4" />Update
                </Button>

                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={isDeleting || isUpdating}
                >
                  <Trash className="size-4" />
                  {isDeleting ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    "Delete"
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleUpdate}>
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-3">
                  <div className="space-y-1 mt-4">
                    <Label><CaseSensitive className="size-4 text-primary" />Title</Label>
                    <Input
                      value={editForm.title}
                      onChange={(e) =>
                        setEditForm((p) => ({ ...p, title: e.target.value }))
                      }
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-1 mt-2">
                    <Label><Captions className="size-4 text-primary" />Description</Label>
                    <Input
                      value={editForm.description}
                      onChange={(e) =>
                        setEditForm((p) => ({
                          ...p,
                          description: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <DatePickerRangeField
                    label="Event Date Range"
                    value={{ from: editForm.start_date, to: editForm.end_date }}
                    onChange={({ start_date, end_date }) =>
                      setEditForm((p) => ({ ...p, start_date, end_date }))
                    }
                  />

                  <div className="flex justify-end gap-2 pt-2">
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => setMode("view")}
                      disabled={isUpdating || isDeleting}
                    >
                      <Undo2 className="size-4" /> Back
                    </Button>

                    <Button
                      type="submit"
                      variant="outline"
                      size="sm"
                      disabled={
                        isUpdating ||
                        !editForm.title ||
                        !editForm.start_date ||
                        !editForm.end_date
                      }
                    >
                      <Save className="size-4"/>
                      {isUpdating ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
