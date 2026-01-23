"use client"

import { useState, useMemo } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction"
import timeGridPlugin from "@fullcalendar/timegrid"


import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type EventType = {
  title: string
  date: string // format: YYYY-MM-DD
}

const eventList: EventType[] = [
  { title: "Team Meeting", date: "2026-01-10" },
  { title: "Doctor Appointment", date: "2025-08-10" },
  { title: "Project Deadline", date: "2025-08-12" },
  { title: "Birthday", date: "2025-08-15" },
]

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  const handleDateClick = (arg: DateClickArg) => {
    setSelectedDate(arg.dateStr)
    setOpen(true)
  }

  const eventsOnSelectedDate = useMemo(() => {
    if (!selectedDate) return []
    return eventList.filter((event) => event.date === selectedDate)
  }, [selectedDate])

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        events={eventList}
        height="auto"
        headerToolbar={{
          left: "prev,next today",
          center: "",
          right: "title",
        }}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-sm">Events on {selectedDate}</DialogTitle>
          </DialogHeader>

          {eventsOnSelectedDate.length === 0 ? (
            <p className="text-muted-foreground text-xs">No events scheduled.</p>
          ) : (
            <ul className="list-disc pl-4 space-y-1">
              {eventsOnSelectedDate.map((event, idx) => (
                <li key={idx} className="text-xs">
                  {event.title}
                </li>
              ))}
            </ul>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
