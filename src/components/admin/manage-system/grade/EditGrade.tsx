"use client";

import { useState, useEffect } from "react";
import { useGetGradeById, useEditGrade } from "@/hooks/useGrade";

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { CircleX, Send, Loader2, UserRoundPlus } from "lucide-react";

interface EditGradeModalProps {
  token: string;
  gradeId: string;
  open: boolean;
  onClose: () => void;
}

export default function EditGradeModal({ token, gradeId, open, onClose }: EditGradeModalProps) {
  const { data, isLoading } = useGetGradeById(token, gradeId);
  const editGradeMutation  = useEditGrade();

  const [formData, setFormData] = useState({
    grade_level: "",
    description: "",
    status: "active",
  });

  useEffect(() => {
    if (data?.data) {
      setFormData({
        grade_level: data.data.grade_level,
        description: data.data.description || "",
        status: data.data.status,
      });
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStatusChange = (value: string) => {
    setFormData({ ...formData, status: value });
  };

  const handleSubmit = () => {
    editGradeMutation.mutate(
      { token, id: gradeId, data: formData }, 
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
            <UserRoundPlus className="size-4 text-primary" />
            Edit Grade
          </DialogTitle>
          <DialogDescription className="text-sm">Update Grade Information</DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div>
            <label className="text-sm font-medium">Grade Level</label>
            <Input
              name="grade_level"
              placeholder="Enter grade level"
              value={formData.grade_level}
              onChange={handleChange}
              required
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

          <div>
            <label className="text-sm font-medium">Available</label>
            <Select value={formData.status} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Yes</SelectItem>
                <SelectItem value="inactive">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="mt-6 flex gap-2 justify-end">
          <Button
            onClick={handleSubmit}
            className="rounded-full"
            size="sm"
            variant="default"
            disabled={editGradeMutation.isPending || isLoading}
          >
            {editGradeMutation.isPending ? (
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
            <Button variant="outline" size="sm" className="rounded-full" disabled={editGradeMutation.isPending}>
              <CircleX className="mr-1" /> Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
