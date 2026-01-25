"use client";

import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";

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

import { Camera, CircleX, PenSquare, Save, UserCircle } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { useGetStudentDetailsById } from "@/hooks/useStudentDetails";
import { useUpdateStudentAvatar } from "@/hooks/useStudentDetails";

export default function Profile({ id }: { id: any }) {
  const { token } = useAuth();
  const isClient = useClientOnly();

  const { data: studentDetails, refetch } = useGetStudentDetailsById(token, id);

  const { mutateAsync, isPending } = useUpdateStudentAvatar(token);

  const student = studentDetails?.data?.student;
  const additional_info = student?.additional_info || {};

  const fullName = `${student?.first_name || ""} ${student?.middle_name || ""} ${student?.last_name || ""} ${student?.suffix || ""}`.replace(
    /\s+/g,
    " "
  ).trim();

  const currentAvatarUrl = useMemo(() => {
    return student?.avatar_url || student?.avatar || "";
  }, [student]);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const onPickFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setSelectedFile(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl("");
    }
  };

  const onSaveAvatar = async () => {
    if (!selectedFile) {
      toast.error("Please select an image.");
      return;
    }

    try {
      const res = await mutateAsync({ id: Number(id), avatar: selectedFile });
      toast.success(res?.message || "Avatar updated!");

      // refresh profile info
      await refetch();

      // reset local state
      setSelectedFile(null);
      setPreviewUrl("");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Upload failed.");
    }
  };

  if (!isClient) return null;

  return (
    <div className="shadow-lg z-2 w-120 py-5 flex flex-col justify-center rounded-xl items-center px-5 gap-5 bg-accent/10">
      <Dialog>
        <DialogTrigger asChild>
          <div className="relative group w-30 h-30">
            <Avatar className="h-30 w-30 flex-shrink-0"> 
              {/* https://rfid-api.barangay185bms.com */}
              <AvatarImage
                src={student?.avatar ? `https://rfid-api.barangay185bms.com/storage/avatars/${student?.avatar}` : "https://github.com/shadcn.png"}
                className="rounded-lg hover:grayscale-100 transition-all duration-300"
                loading="lazy"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className="absolute inset-0 flex group-hover:cursor-pointer group-hover:bg-accent/50 rounded-lg items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Camera className="size-10 text-white text-xl" />
            </div>
          </div>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex gap-2">
              <PenSquare className="size-5 text-teal-500" />
              Change Avatar
            </DialogTitle>
            <DialogDescription className="text-xs">
              Make change student avatar here.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 mt-5">
            <div className="grid gap-3">
              <Label htmlFor="avatar" className="flex items-center gap-2">
                <UserCircle className="size-4 text-muted-foreground" />
                Avatar
              </Label>

              <Input
                id="avatar"
                name="avatar"
                type="file"
                accept="image/*"
                onChange={onPickFile}
              />

              {/* ✅ Small preview inside modal */}
              <div className="flex items-center gap-3 mt-2">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={student?.avatar ? `https://rfid-api.barangay185bms.com/storage/avatars/${student?.avatar}` : "https://github.com/shadcn.png"}
                    className="rounded-lg"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="text-xs opacity-80">
                  {selectedFile ? (
                    <>
                      <div className="font-medium">{selectedFile.name}</div>
                      <div>{Math.round(selectedFile.size / 1024)} KB</div>
                    </>
                  ) : (
                    <div>Select a new image to preview</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="mt-5">
            <DialogClose asChild>
              <Button variant="destructive" size="sm" disabled={isPending}>
                <CircleX className="size-3" />
                Cancel
              </Button>
            </DialogClose>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onSaveAvatar}
              disabled={isPending}
            >
              <Save className="size-3 text-primary" />
              {isPending ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex flex-col items-center gap-4">
        <span className="flex flex-col items-center gap-2">
          <p className="text-center text-sm font-semibold leading-none uppercase">
            {fullName}
          </p>
          <span className="text-xs">
            {student?.lrn || "N/A"}{" "}
            <span
              className={
                student?.status ? "text-green-500 text-[10px]" : "text-red-500 text-[10px]"
              }
            >
              {student?.status ? "Active" : "Inactive"}
            </span>
          </span>
        </span>

        <p className="text-sm my-1 flex flex-col items-center">
          <span className="text-[10px]">School Year</span>
          <span className="text-blue-800 font-medium dark:text-blue-200">
            {student?.school_year || "N/A"}
          </span>
        </p>

        <div className="flex gap-2 mt-2">
          <span className="uppercase font-medium text-xs px-3 h-6 flex items-center justify-center rounded-full shadow bg-accent">
            {student?.grade?.grade_level || "N/A"}
          </span>
          <span className="uppercase font-medium text-xs px-3 h-6 flex items-center justify-center rounded-full shadow bg-accent">
            {student?.section?.section_name || "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
}
