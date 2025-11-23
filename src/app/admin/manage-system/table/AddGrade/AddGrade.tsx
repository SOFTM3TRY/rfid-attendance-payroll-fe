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

import { PlusIcon, UserRoundPlus, CircleX, Send, Loader2 } from "lucide-react";

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
          }); // Reset form
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center rounded-full justify-center text-xs h-8 bg-teal-700 text-white hover:bg-teal-800">
          <PlusIcon strokeWidth={3} size={10} className="text-white -mr-2" />
          Add Grade
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg w-full p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserRoundPlus className="w-5 h-5 text-teal-500" />
            Add Grade
          </DialogTitle>
          <DialogDescription>Add New Grade</DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div>
            <label className="text-sm font-medium">Grade Level</label>
            <Input
              name="grade_level"
              placeholder="Enter grade level"
              value={formData.grade_level}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Description <small>(Optional)</small></label>
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
            className="w-32"
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
              variant="ghost"
              className="w-32"
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
