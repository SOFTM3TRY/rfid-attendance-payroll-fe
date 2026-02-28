"use client";

import { useState, useEffect } from "react";
import { useGrade } from "@/hooks/useGrade";
import { useEditSubject } from "@/hooks/useSubjects";
import { Subject } from "@/types/subject";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { CircleX, Send, Loader2, BookPlus } from "lucide-react";

interface EditSubjectModalProps {
  token: string;
  subject: Subject;
  open: boolean;
  onClose: () => void;
}

export default function EditSubjectModal({
  token,
  subject,
  open,
  onClose,
}: EditSubjectModalProps) {
  const { data: grades, isLoading: isLoadingGrades } = useGrade(token);
  const editSubjectMutation = useEditSubject();

  const [formData, setFormData] = useState({
    name: "",
    grade_id: "",
  });

  useEffect(() => {
    if (subject) {
      setFormData({
        name: subject.name,
        grade_id: String(subject.grade.id),
      });
    }
  }, [subject]);

  const handleSubmit = () => {
    if (!formData.name || !formData.grade_id) return;

    editSubjectMutation.mutate(
      {
        token,
        subjectId: subject.id.toString(),
        data: {
          name: formData.name,
          grade_id: Number(formData.grade_id),
        },
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg w-full p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-sm">
            <BookPlus className="size-4 text-primary" />
            Edit Subject
          </DialogTitle>
          <DialogDescription className="text-sm">Update Subject Information</DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          {/* Grade */}
          <div>
            <label className="text-sm font-medium">
              <span className="text-red-500 mr-1">*</span>Grade Level
            </label>

            {isLoadingGrades ? (
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
                  {grades?.data
                    ?.filter((grade : any) => grade.status === "active")
                    .map((grade: any) => (
                      <SelectItem key={grade.id} value={String(grade.id)}>
                        {grade.grade_level}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {/* Subject Name */}
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
            className="rounded-full"
            size="sm"
            disabled={editSubjectMutation.isPending}
          >
            {editSubjectMutation.isPending ? (
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
              disabled={editSubjectMutation.isPending}
            >
              <CircleX className="size-4" /> Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
