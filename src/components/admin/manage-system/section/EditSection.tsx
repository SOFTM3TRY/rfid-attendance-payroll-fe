"use client";

import { useState, useEffect } from "react";
import { useGetSectionById, useEditSection } from "@/hooks/useSection";
import { useGrade } from "@/hooks/useGrade";

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

import { CircleX, Send, Loader2, UserRoundPlus } from "lucide-react";

interface EditGradeModalProps {
  token: string;
  gradeId: string;
  open: boolean;
  onClose: () => void;
}

export default function EditSectionModal({
  token,
  gradeId,
  open,
  onClose,
}: EditGradeModalProps) {
  const { data, isLoading } = useGetSectionById(token, gradeId);
  const editGradeMutation = useEditSection();
  const { data: grades, isLoading: isLoadingGrades } = useGrade(token);

  const [formData, setFormData] = useState({
    grade_id: "",
    section_name: "",
    description: "",
    status: "",
  });

  useEffect(() => {
    if (data?.data) {
      setFormData({
        grade_id: String(data.data.grade_id),
        section_name: data.data.section_name,
        description: data.data.description || "",
        status: String(data.data.status),
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
          <DialogTitle className="flex items-center gap-2">
            <UserRoundPlus className="w-5 h-5 text-teal-500" />
            Edit Grade
          </DialogTitle>
          <DialogDescription>Update Grade Information</DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div className="mt-4 space-y-4">
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
          </div>
          <div>
            <label className="text-sm font-medium">
              <span className="text-red-500 mr-1">*</span>Section Name
            </label>
            <Input
              name="section_name"
              placeholder="Enter section name"
              value={formData.section_name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              <span className="text-red-500 mr-1">*</span>Description <small>(Optional)</small>
            </label>
            <Input
              name="description"
              placeholder="Enter description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm font-medium"><span className="text-red-500 mr-1">*</span> Available</label>
            <Select value={formData.status} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Yes</SelectItem>
                <SelectItem value="0">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="mt-6 flex gap-2 justify-end">
          <Button
            onClick={handleSubmit}
            className="w-32"
            disabled={editGradeMutation.isPending || isLoading}
          >
            {editGradeMutation.isPending ? (
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
              disabled={editGradeMutation.isPending}
            >
              <CircleX className="mr-1" /> Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
