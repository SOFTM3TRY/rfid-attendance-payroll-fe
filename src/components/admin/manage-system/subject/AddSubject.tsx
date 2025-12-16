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
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center rounded-full justify-center text-xs h-8 bg-teal-700 text-white hover:bg-teal-800">
          <PlusIcon strokeWidth={3} size={10} className="text-white -mr-2" />
          Add Subject
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg w-full p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookPlus className="w-5 h-5 text-teal-500" />
            Add Subject
          </DialogTitle>
          <DialogDescription>Add new subject</DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          {/* GRADE */}
          <div>
            <label className="text-sm font-medium">
              <span className="text-red-500 mr-1">*</span>Grade Level
            </label>

            {isLoading ? (
              <p className="text-sm text-gray-500">Loading...</p>
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
                  {grades?.data?.map((grade: any) => (
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
            <label className="text-sm font-medium">
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
            className="w-32"
            disabled={createSubjectMutation.isPending}
          >
            {createSubjectMutation.isPending ? (
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
              disabled={createSubjectMutation.isPending}
            >
              <CircleX className="mr-1" /> Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
