"use client";

import { useEffect, useState } from "react";
import { useUpdateYear } from "@/hooks/useYear";
import { Year } from "@/types/year";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CircleX, Send, Loader2, GraduationCap } from "lucide-react";

interface YearUpdateModalProps {
  token: string;
  year: Year;
  open: boolean;
  onClose: () => void;
}

export default function YearUpdateModal({
  token,
  year,
  open,
  onClose,
}: YearUpdateModalProps) {
  const updateYearMutation = useUpdateYear();
  const [years, setYears] = useState(year.years);

  useEffect(() => {
    if (year) {
      setYears(year.years);
    }
  }, [year]);

  const handleSubmit = () => {
    updateYearMutation.mutate(
      {
        token,
        yearId: String(year.id),
        data: { years },
      },
      {
        onSuccess: () => onClose(),
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-teal-500" />
            Edit School Year
          </DialogTitle>
          <DialogDescription>
            Update school year information
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-2">
          <label className="text-xs font-medium">
            <span className="text-red-500">*</span> School Year
            <small className="ml-1 text-muted-foreground">
              (e.g. 2023-2024)
            </small>
          </label>

          <Input
            value={years}
            onChange={(e) => setYears(e.target.value)}
            placeholder="Enter School Year"
            required
          />
        </div>

        <DialogFooter className="mt-6 flex gap-2 justify-end">
          <Button
            onClick={handleSubmit}
            size="sm" className="rounded-full"
            disabled={updateYearMutation.isPending}
          >
            {updateYearMutation.isPending ? (
              <>
                <Loader2 className="animate-spin size-4"/>
                Updating...
              </>
            ) : (
              <>
                Update <Send className="size-4" />
              </>
            )}
          </Button>

          <DialogClose asChild>
            <Button variant="outline" size="sm" className="rounded-full">
              <CircleX className="size-4" /> Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
