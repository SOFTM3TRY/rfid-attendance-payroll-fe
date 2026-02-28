"use client";

import * as React from "react";
import toast from "react-hot-toast";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/teacher-sidebar";
import { Navbar } from "@/components/navbar";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import ProtectedRoute from "@/components/ProtectedRoute";
import { Footer } from "@/components/footer";

import { useUserDetails } from "@/hooks/useUserDetails";
import { useChangeTeacherPassword } from "@/hooks/useTeacher"; // ✅ adjust path if needed

import { User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

import Profile from "@/app/manage-teacher/teacher-profile/[teacherId]/profile";
import BasicInfo from "@/app/manage-teacher/teacher-profile/[teacherId]/basic-info";
import AddressInfo from "@/app/manage-teacher/teacher-profile/[teacherId]/address-info";
import TeacherSubjects from "@/app/manage-teacher/teacher-profile/[teacherId]/teacher-subjects";
import EmergencyInfo from "@/app/manage-teacher/teacher-profile/[teacherId]/emergency-info";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card"; // ✅ missing
import { Label } from "@/components/ui/label"; // ✅ fix (not recharts)
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  // ✅ hooks first
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const { data: user, isError, error } = useUserDetails(token);

  const { mutateAsync: changePassword, isPending: isChanging } =
    useChangeTeacherPassword(token);

  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const handleChangePassword = async () => {
    const id = user?.data?.id;

    if (!id) {
      toast.error("User not found.");
      return;
    }

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
        id: Number(id),
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

  if (isError) {
    return (
      <div className="p-5 text-red-500">
        Error loading user details: {error?.message || "Unknown error"}
      </div>
    );
  }

  return (
    <ProtectedRoute role={["1", "2", "3"]}>
      <SidebarProvider style={{ height: "100vh", width: "100%" }}>
        <AppSidebar />
        <main className="w-full h-auto">
          <Navbar />

          <div className="p-5">
            <div className="flex items-center justify-between">
              <h1 className="text-md font-medium flex items-center">
                <User className="size-4 text-sm text-primary mr-2" />
                Profile
              </h1>

              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/teacher/dashboard">
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

            <Tabs defaultValue="profile" className="w-full mt-4">
              <TabsList className="w-full justify-start text-xs">
                <TabsTrigger value="profile" className="text-xs">
                  Profile
                </TabsTrigger>
                <TabsTrigger value="change-password" className="text-xs">
                  Change Password
                </TabsTrigger>
              </TabsList>

              {/* PROFILE TAB */}
              <TabsContent value="profile">
                {!user ? (
                  <div className="p-2 h-full z-10">
                    <div className="flex gap-5">
                      <Skeleton className="w-1/4 h-80 mb-6" />
                      <Skeleton className="w-3/4 h-80 mb-6" />
                    </div>
                    <div className="flex gap-5">
                      <Skeleton className="w-full h-80 mb-6" />
                    </div>
                    <div className="flex gap-5">
                      <Skeleton className="w-full h-80 mb-2" />
                      <Skeleton className="w-full h-80 mb-2" />
                    </div>
                  </div>
                ) : (
                  <div className="p-2 h-full mt-10 z-10">
                    <div className="flex gap-5">
                      <Profile id={String(user.data.id)} />
                      <BasicInfo id={String(user.data.id)} />
                    </div>
                    <div className="flex gap-5 mt-5">
                      <TeacherSubjects teacherId={String(user.data.id)} />
                    </div>
                    <div className="flex gap-5">
                      <AddressInfo id={String(user.data.id)} />
                      <EmergencyInfo id={String(user.data.id)} />
                    </div>
                  </div>
                )}
              </TabsContent>

              {/* CHANGE PASSWORD TAB */}
              <TabsContent value="change-password">
                <Card className="p-6 mt-4 max-w-2xl">
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

          <Footer />
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
