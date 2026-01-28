"use client";

import { useState } from "react";
import { useCreateSubject } from "@/hooks/useSubjects";
import { useGrade } from "@/hooks/useGrade";

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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { PlusIcon, BookPlus, CircleX, Send, Loader2 } from "lucide-react";

export default function AddSubjectModal({ token }: { token: string }) {
  const createSubjectMutation = useCreateSubject();
  const { data: grades, isLoading } = useGrade(token);

  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    grade_id: "",
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.grade_id) return;

    createSubjectMutation.mutate(
      {
        token,
        data: {
          name: formData.name,
          grade_id: Number(formData.grade_id),
        },
      },
      {
        onSuccess: () => {
          setOpen(false);
          setFormData({
            name: "",
            grade_id: "",
          });
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="rounded-full">
          <PlusIcon className="size-4" />
          Add Subject
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg w-full p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-sm">
            <BookPlus className="size-4 text-primary" />
            Add Subject
          </DialogTitle>
          <DialogDescription className="text-xs">
            Add new subject
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          {/* GRADE */}
          <div>
            <label className="text-xs font-medium">
              <span className="text-red-500 mr-1">*</span>Grade Level
            </label>

            {isLoading ? (
              <p className="text-xs text-gray-500">Loading...</p>
            ) : (
              <Select
                value={formData.grade_id}
                onValueChange={(value) =>
                  setFormData({ ...formData, grade_id: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select grade level" />
                </SelectTrigger>

                <SelectContent>
                  {grades?.data
                    ?.filter((grade: any) => grade.status === "active")
                    .map((grade: any) => (
                      <SelectItem key={grade.id} value={String(grade.id)}>
                        {grade.grade_level}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {/* SUBJECT NAME */}
          <div>
            <label className="text-xs font-medium">
              <span className="text-red-500 mr-1">*</span>Subject Name
            </label>
            <Input
              placeholder="Enter subject name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>
        </div>

        <DialogFooter className="mt-6 flex gap-2 justify-end">
          <Button
            onClick={handleSubmit}
            className="rounded-full"
            size="sm"
            variant="default"
            disabled={createSubjectMutation.isPending}
          >
            {createSubjectMutation.isPending ? (
              <>
                <Loader2 className="animate-spin size-4" size={18} />
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
              className="rounded-full"
              size="sm"
              disabled={createSubjectMutation.isPending}
            >
              <CircleX className="size-4" /> Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
