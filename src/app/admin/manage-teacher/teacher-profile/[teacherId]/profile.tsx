import { useClientOnly } from "@/hooks/useClientOnly";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Camera } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { useTeacherDetails } from "@/hooks/useTeacher";

export default function Profile({ id }: { id: string }) {
  const { token } = useAuth();
  const isClient = useClientOnly();

  const { data: teacherDetails } = useTeacherDetails(token, { id });

  const teacher = teacherDetails?.data?.teacher?.[0] || null;
  const additional_info = teacher?.additional_info || {};

  const fullName = `${teacher?.first_name} ${teacher?.middle_name} ${teacher?.last_name} ${teacher?.suffix}`;

  return (
    <div className="shadow-lg  z-2 w-120 py-5 flex flex-col justify-center rounded-xl items-center px-5 gap-5 bg-accent/20">
      <Dialog>
        <DialogTrigger asChild>
          <div className="relative group w-30 h-30">
            <Avatar className="h-30 w-30 flex-shrink-0">
              <AvatarImage
                src="https://github.com/shadcn.png"
                className="rounded-lg hover:grayscale-100 transition-all duration-300"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className="absolute inset-0 flex group-hover:cursor-pointer group-hover:bg-teal-800/50 rounded-lg items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Camera className="size-10 text-white text-xl" />
            </div>
          </div>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change Avatar</DialogTitle>
            <DialogDescription className="text-xs">
              Make changes to your profile here. You can change your avatar.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 mt-5">
            <div className="grid gap-3">
              <Label htmlFor="avatar">Avatar</Label>
              <Input id="avatar" name="avatar" type="file" />
            </div>
          </div>
          <DialogFooter className="mt-5">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="flex flex-col items-center gap-4">
        <span className="flex flex-col items-center gap-2">
          <p className="text-center text-sm font-semibold leading-none uppercase">
            {fullName}
          </p>
          <span className="text-xs">
            {teacher?.employee_no || "N/A"} ||{" "}
            <span
              className={teacher?.status ? "text-green-500 text-[10px]" : "text-red-500 text-[10px]"}
            >
              {teacher?.status ? "Active" : "Inactive"}
            </span>
          </span>
        </span>
        <p className="text-sm my-1 flex flex-col items-center">
          <span className="text-[10px]">School Year</span>
          <span className="text-blue-800 font-medium dark:text-blue-200">
            {teacher?.additional_info.school_year || "N/A"}
          </span>
        </p>
        <div className="flex gap-2 mt-2">
          <span className="uppercase font-medium text-xs px-3 h-6 flex items-center justify-center rounded-full bg-primary text-white">
            {teacher?.grade?.grade_level || "N/A"}
          </span>
          <span className="uppercase font-medium text-xs px-3 h-6 flex items-center justify-center rounded-full bg-primary text-white">
            {teacher?.section?.section_name || "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
}
