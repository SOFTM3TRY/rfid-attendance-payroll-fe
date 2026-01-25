"use client";

import * as React from "react";
import toast from "react-hot-toast";

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
} from "@/components/ui/dialog";

import { LockKeyhole, Save, CircleX } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useChangeStudentPassword } from "@/hooks/useStudentDetails";

export default function ChangePasswordDialog({
  open,
  setOpen,
  studentId,
  studentName,
  onSuccess,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  studentId: string;
  studentName?: string;
  onSuccess?: () => void;
}) {
  const { token } = useAuth();
  const { mutateAsync, isPending } = useChangeStudentPassword(token);

  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  React.useEffect(() => {
    if (!open) {
      setNewPassword("");
      setConfirmPassword("");
    }
  }, [open]);

  const handleSave = async () => {
    if (!newPassword || !confirmPassword) {
      toast.error("Please fill out both fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Password does not match.");
      return;
    }

    try {
      const res = await mutateAsync({
        id: Number(studentId),
        new_password: newPassword,
        confirm_password: confirmPassword,
      });

      toast.success(res?.message || "Password changed successfully.");
      setOpen(false);
      onSuccess?.();
    } catch (err: any) {
      toast.error(err?.message || "Failed to change password.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <LockKeyhole className="size-4 text-teal-500" />
            Change Password
          </DialogTitle>
          <DialogDescription className="text-xs">
            Change password for <span className="font-medium">{studentName || "student"}</span>.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 mt-2">
          <div className="grid gap-2">
            <Label htmlFor="new_password">New Password</Label>
            <Input
              id="new_password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="confirm_password">Confirm Password</Label>
            <Input
              id="confirm_password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
            />
          </div>
        </div>

        <DialogFooter className="mt-3">
          <DialogClose asChild>
            <Button variant="destructive" size="sm" className="rounded-full" disabled={isPending}>
              <CircleX className="size-4" />
              Cancel
            </Button>
          </DialogClose>

          <Button onClick={handleSave} variant="outline" size="sm" className="rounded-full" disabled={isPending}>
            <Save className="size-4 text-primary" />
            {isPending ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
