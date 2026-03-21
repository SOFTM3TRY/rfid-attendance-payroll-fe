"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGenerateAbsent } from "@/hooks/useAttendance";
import { useAuth } from "@/context/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { CalendarX2 } from "lucide-react";

export default function GenerateAbsentModal() {
  const { token } = useAuth();
  const { mutate, isPending } = useGenerateAbsent(token ?? null);

  const today = React.useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }, []);

  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(today);

  const handleGenerate = () => {
    mutate(date, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  React.useEffect(() => {
    if (open) {
      setDate(today);
    }
  }, [open, today]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="rounded-full"
          disabled={!token}
        >
          <CalendarX2 className="h-4 w-4 " />
          Record Absent
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Generate Absent Students</DialogTitle>
          <DialogDescription>
            Select a date to generate absent records for students who did not
            tap.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 py-2">
          <label className="text-sm font-medium">Date</label>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <DialogFooter className="gap-2 sm:gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isPending}
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="default"
            onClick={handleGenerate}
            disabled={isPending || !token || !date}
          >
            {isPending ? "Generating..." : "Confirm Generate"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
