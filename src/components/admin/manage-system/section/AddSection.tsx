"use client";

import { useState } from "react";
import { useCreateSection } from "@/hooks/useSection";
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

import { PlusIcon, UserRoundPlus, CircleX, Send, Loader2 } from "lucide-react";

export default function AddSectionModal({ token }: { token: string }) {
  const createGradeMutation = useCreateSection();
  const { data: grades, isLoading } = useGrade(token);

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    grade_id: "",
    section_name: "",
    description: "",
    status: "1",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log(formData);
    createGradeMutation.mutate(
      { token, data: formData },
      {
        onSuccess: () => {
          setOpen(false); 
          setFormData({
            grade_id: "",
            section_name: "",
            description: "",
            status: "1",
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
          Add Section
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg w-full p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserRoundPlus className="w-5 h-5 text-teal-500" />
            Add Section
          </DialogTitle>
          <DialogDescription>Add New Section</DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div>
            <label className="text-sm font-medium"><span className="text-red-500 mr-1">*</span>Grade Level</label>

            {isLoading ? (
              <p className="text-sm text-gray-500">Loading...</p>
            ) : (
              <Select
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

          <div>
            <label className="text-sm font-medium"><span className="text-red-500 mr-1">*</span>Section Name</label>
            <Input
              name="section_name"
              placeholder="Enter section name"
              value={formData.section_name}
              onChange={handleChange}
              required
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

