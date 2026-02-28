"use client";

import React, { useMemo, useState, useEffect } from "react";
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
import { useTeacherDetails, useUpdateTeacherAvatar } from "@/hooks/useTeacher";

export default function Profile({ id }: { id: string }) {
  const { token } = useAuth();
  const isClient = useClientOnly();

  const { data: teacherDetails, refetch } = useTeacherDetails(token, { id });

  const { mutateAsync, isPending } = useUpdateTeacherAvatar(token);

  const teacher = teacherDetails?.data?.teacher?.[0] || null;

  const fullName = `${teacher?.first_name || ""} ${teacher?.middle_name || ""} ${teacher?.last_name || ""} ${teacher?.suffix || ""}`
    .replace(/\s+/g, " ")
    .trim();

  const currentAvatarUrl = useMemo(() => {
    return teacher?.avatar
      ? `https://rfid-api.barangay185bms.com/storage/avatars/${teacher.avatar}`
      : "https://github.com/shadcn.png";
  }, [teacher?.avatar]);

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

  // ✅ cleanup preview object url
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const onSaveAvatar = async () => {
    if (!selectedFile) {
      toast.error("Please select an image.");
      return;
    }

    try {
      const res = await mutateAsync({ id: Number(id), avatar: selectedFile });
      toast.success(res?.message || "Avatar updated!");

      await refetch(); // ✅ refresh teacher details (avatar)

      setSelectedFile(null);
      setPreviewUrl("");
    } catch (err: any) {
      toast.error(err?.message || "Upload failed.");
    }
  };

  if (!isClient) return null;

  return (
    <div className="shadow-lg z-2 w-120 py-5 flex flex-col justify-center rounded-xl items-center px-5 gap-5 bg-accent/20">
      <Dialog
        onOpenChange={(open) => {
          // ✅ reset when closing
          if (!open) {
            setSelectedFile(null);
            setPreviewUrl("");
          }
        }}
      >
        <DialogTrigger asChild>
          <div className="relative group w-30 h-30">
            <Avatar className="h-30 w-30 flex-shrink-0">
              <AvatarImage
                src={currentAvatarUrl}
                className="rounded-lg hover:grayscale-100 transition-all duration-300"
                loading="lazy"
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
            <DialogTitle className="flex gap-2">
              <PenSquare className="size-5 text-teal-500" />
              Change Avatar
            </DialogTitle>
            <DialogDescription className="text-sm">
              Make change teacher avatar here.
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

              {/* ✅ preview */}
              <div className="flex items-center gap-3 mt-2">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={previewUrl || currentAvatarUrl}
                    className="rounded-lg"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <div className="text-sm opacity-80">
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

      {/* ✅ info */}
      <div className="flex flex-col items-center gap-4">
        <span className="flex flex-col items-center gap-2">
          <p className="text-center text-sm font-semibold leading-none uppercase">
            {fullName}
          </p>
          <span className="text-sm">
            {teacher?.employee_no || "N/A"} {" "}
            <span
              className={
                teacher?.status == "1"
                  ? "text-green-500 text-sm"
                  : "text-red-500 text-sm"
              }
            >
              {teacher?.status == "1" ? "Active" : "Inactive"}
            </span>
          </span>
        </span>

        <p className="text-sm my-1 flex flex-col items-center">
          <span className="text-xs">School Year</span>
          <span className="text-blue-800 font-medium dark:text-blue-200">
            {teacher?.additional_info?.school_year || "N/A"}
          </span>
        </p>

        <div className="flex gap-2 mt-2">
          <span className="uppercase font-medium text-sm px-3 h-6 flex items-center justify-center rounded-full bg-primary text-white">
            {teacher?.grade?.grade_level || "N/A"}
          </span>
          <span className="uppercase font-medium text-sm px-3 h-6 flex items-center justify-center rounded-full bg-primary text-white">
            {teacher?.section?.section_name || "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
}
