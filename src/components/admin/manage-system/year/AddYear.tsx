"use client";

import { useState } from "react";
import { useCreateYear } from "@/hooks/useYear";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { PlusIcon, GraduationCap, CircleX, Send, Loader2 } from "lucide-react";

export default function AddYearModal({ token }: { token: string }) {
  const createGradeMutation = useCreateYear();

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    years: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    createGradeMutation.mutate(
      { token, data: formData },
      {
        onSuccess: () => {
          setOpen(false); // Close modal
          setFormData({
            years: "",
          });
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center rounded-full justify-center text-xs "
        >
          <PlusIcon className="text-white size-4" />
          Add School Year
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg w-full p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-sm">
            <GraduationCap className="w-4 text-primary" />
            Add School Year
          </DialogTitle>
          <DialogDescription className="text-xs">Add New School Year</DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div>
            <label className="text-xs font-medium mb-3">
              {" "}
              <span className="text-red-500 mr-1">*</span> School Year{" "}
              <small>(e.g. 2022-2023)</small>
            </label>
            <Input
              name="years"
              placeholder="Enter School Year"
              value={formData.years}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <DialogFooter className="mt-6 flex gap-2 justify-end">
          <Button
            variant="default"
            size="sm"
            onClick={handleSubmit}
            className="rounded-full"
            disabled={createGradeMutation.isPending}
          >
            {createGradeMutation.isPending ? (
              <>
                <Loader2 className="animate-spin mr-1" size={18} />
                Processing...
              </>
            ) : (
              <>
                Submit <Send className="-ml-1" />
              </>
            )}
          </Button>

          <DialogClose asChild>
            <Button
              variant="outline"
              size="sm"
              disabled={createGradeMutation.isPending}
              className="rounded-full"
            >
              <CircleX className="mr-1" /> Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
