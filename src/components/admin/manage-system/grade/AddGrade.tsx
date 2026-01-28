"use client";

import { useState } from "react";
import { useCreateGrade } from "@/hooks/useGrade";

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

import { PlusIcon, GraduationCap , CircleX, Send, Loader2 } from "lucide-react";

export default function AddGradeModal({ token }: { token: string }) {
  const createGradeMutation = useCreateGrade();

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    grade_level: "",
    description: "",
    status: "active",
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
            grade_level: "",
            description: "",
            status: "active",
          });
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="rounded-full">
          <PlusIcon className="size-4" />
          Add Grade
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg w-full p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-sm">
            <GraduationCap className="size-4 text-teal-500" />
            Add Grade
          </DialogTitle>
          <DialogDescription className="text-xs">Add New Grade</DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div>
            <label className="text-xs font-medium mb-3"> <span className="text-red-500 mr-1">*</span>Grade Level</label>
            <Input
              name="grade_level"
              placeholder="Enter grade level"
              value={formData.grade_level}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="text-xs font-medium"><span className="text-red-500 mr-1">*</span>Description <small>(Optional)</small></label>
            <Input
              name="description"
              placeholder="Enter description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
        </div>

        <DialogFooter className="mt-6 flex gap-2 justify-end">
          <Button
            onClick={handleSubmit}
            className="rounded-full"
            size="sm"
            variant="default"
            disabled={createGradeMutation.isPending}
          >
            {createGradeMutation.isPending ? (
              <>
                <Loader2 className="animate-spin size-4" />
                Processing...
              </>
            ) : (
              <>
                Submit <Send className="size-4" />
              </>
            )}
          </Button>

          <DialogClose asChild>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full"
              disabled={createGradeMutation.isPending}
            >
              <CircleX className="mr-1" /> Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
