"use client";

import * as React from "react";
import toast from "react-hot-toast";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import ProtectedRoute from "@/components/ProtectedRoute";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";

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

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useAuth } from "@/context/AuthContext";
// @ts-ignore
import { useUserDetails } from "@/hooks/useUserDetails";
import { useClientOnly } from "@/hooks/useClientOnly";

// ✅ your hooks
import {
  useChangeTeacherPassword,
  useUpdateTeacherAvatar,
} from "@/hooks/useTeacher"; // adjust if needed

import { User, Camera, PenSquare, Save, CircleX, UserCircle } from "lucide-react";

export default function Profile() {
  // ✅ HOOKS FIRST (no early return before hooks)
  const { token } = useAuth();
  const isClient = useClientOnly();

  const {
    data: userDetails,
    isLoading: isLoadingUserDetails,
    refetch,
  } = useUserDetails(token as string);

  const user = userDetails?.data;

  const { mutateAsync: changePassword, isPending: isChanging } =
    useChangeTeacherPassword(token as string);

  const { mutateAsync: updateAvatar, isPending: isUpdatingAvatar } =
    useUpdateTeacherAvatar(token as string);

  // password states
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  // avatar dialog + upload states
  const [avatarDialogOpen, setAvatarDialogOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string>("");

  const fullName = `${user?.first_name ?? ""} ${user?.last_name ?? ""}`.trim();
  const initials =
    `${user?.first_name?.[0] ?? ""}${user?.last_name?.[0] ?? ""}`.toUpperCase() ||
    "U";

  const currentAvatarUrl = React.useMemo(() => {
    return user?.avatar
      ? `https://rfid-api.barangay185bms.com/storage/avatars/${user.avatar}`
      : "https://github.com/shadcn.png";
  }, [user?.avatar]);

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
  React.useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const resetAvatarDialog = () => {
    setSelectedFile(null);
    setPreviewUrl("");
  };

  const onSaveAvatar = async () => {
    if (!user?.id) return;

    if (!selectedFile) {
      toast.error("Please select an image.");
      return;
    }

    try {
      const res = await updateAvatar({
        id: Number(user.id),
        avatar: selectedFile,
      });

      toast.success(res?.message || "Avatar updated!");
      await refetch();

      resetAvatarDialog();
      setAvatarDialogOpen(false);
    } catch (err: any) {
      toast.error(err?.message || "Upload failed.");
    }
  };

  const handleChangePassword = async () => {
    if (!user?.id) return;

    if (!newPassword || !confirmPassword) {
      toast.error("Please fill out all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const res = await changePassword({
        id: Number(user.id),
        new_password: newPassword,
        confirm_password: confirmPassword,
      });

      toast.success(res?.message || "Password changed successfully.");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      toast.error(err?.message || "Failed to change password.");
    }
  };

  // ✅ Conditional rendering AFTER hooks
  if (!isClient || isLoadingUserDetails) return <Loader />;

  return (
    <ProtectedRoute role={["1", "2"]}>
      <SidebarProvider style={{ height: "100vh", width: "100%" }}>
        <AppSidebar />

        <main className="w-full h-auto">
          <Navbar />

          <div className="p-5">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h1 className="text-md font-medium flex items-center">
                <User className="size-4 text-sm text-primary mr-2" />
                Profile
              </h1>

              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/admin/dashboard">
                      Dashboard
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Profile</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            {/* Top Card: Avatar + Name */}
            <Card className="mt-6 p-5 max-w-xl">
              <div className="flex items-center gap-4">
                {/* ✅ Avatar trigger */}
                <Dialog
                  open={avatarDialogOpen}
                  onOpenChange={(open) => {
                    setAvatarDialogOpen(open);
                    if (!open) resetAvatarDialog();
                  }}
                >
                  <DialogTrigger asChild>
                    <button type="button" className="relative group">
                      <Avatar className="size-22">
                        <AvatarImage src={currentAvatarUrl} alt={fullName || "User"} />
                        <AvatarFallback>{initials}</AvatarFallback>
                      </Avatar>

                      <div className="absolute inset-0 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-teal-800/40">
                        <Camera className="h-5 w-5 text-white" />
                      </div>
                    </button>
                  </DialogTrigger>

                  {/* Dialog Content */}
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle className="flex gap-2 items-center">
                        <PenSquare className="size-5 text-teal-500" />
                        Change Avatar
                      </DialogTitle>
                      <DialogDescription className="text-xs">
                        Upload a new avatar image.
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
                              alt="Preview"
                            />
                            <AvatarFallback>{initials}</AvatarFallback>
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
                        <Button
                          variant="destructive"
                          size="sm"
                          disabled={isUpdatingAvatar}
                        >
                          <CircleX className="size-3" />
                          Cancel
                        </Button>
                      </DialogClose>

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={onSaveAvatar}
                        disabled={isUpdatingAvatar}
                      >
                        <Save className="size-3 text-primary" />
                        {isUpdatingAvatar ? "Saving..." : "Save changes"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <div>
                  <p className="text-base font-semibold">{fullName || "Unknown User"}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </div>
            </Card>

            {/* Tabs */}
            <div className="mt-10 max-w-full">
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="w-full justify-start text-xs">
                  <TabsTrigger value="profile" className="text-xs">Profile</TabsTrigger>
                  <TabsTrigger value="change-password" className="text-xs">Change Password</TabsTrigger>
                </TabsList>

                {/* PROFILE TAB */}
                <TabsContent value="profile">
                  <Card className="p-6 mt-4">
                    <h2 className="text-xs font-semibold mb-4 text-muted-foreground">
                      Account Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* <div className="grid gap-1">
                        <Label>ID</Label>
                        <Input value={user?.id ?? ""} readOnly />
                      </div>

                      <div className="grid gap-1">
                        <Label>RFID UID</Label>
                        <Input value={user?.rfid_uid ?? ""} readOnly />
                      </div> */}

                      <div className="grid gap-1">
                        <Label>First Name</Label>
                        <Input value={user?.first_name ?? ""} readOnly />
                      </div>

                      <div className="grid gap-1">
                        <Label>Last Name</Label>
                        <Input value={user?.last_name ?? ""} readOnly />
                      </div>

                      <div className="grid gap-1">
                        <Label>Role</Label>
                        <Input value={user?.role_id ? "Admin" : "Teacher"} readOnly />
                      </div>

                      <div className="grid gap-1">
                        <Label>Status</Label>
                        <Input value={user?.status ? "Active" : "Inactive"} readOnly />
                      </div>

                      <div className="grid gap-1 col-span-1 md:col-span-2">
                        <Label>Email</Label>
                        <Input value={user?.email ?? ""} readOnly />
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                {/* CHANGE PASSWORD TAB */}
                <TabsContent value="change-password">
                  <Card className="p-6 mt-4">
                    <h2 className="text-xs font-semibold mb-4 text-muted-foreground">
                      Change Password
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="grid gap-1">
                        <Label>New Password</Label>
                        <Input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Enter new password"
                        />
                      </div>

                      <div className="grid gap-1">
                        <Label>Confirm Password</Label>
                        <Input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm new password"
                        />
                      </div>

                      <div className="col-span-1 md:col-span-2 flex justify-end">
                        <Button
                          onClick={handleChangePassword}
                          disabled={isChanging}
                          className="rounded-full"
                        >
                          {isChanging ? "Saving..." : "Save Password"}
                        </Button>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <Footer />
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
