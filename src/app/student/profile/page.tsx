"use client";

import * as React from "react";
import toast from "react-hot-toast";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/student-sidebar";
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
import { useChangeStudentPassword } from "@/hooks/useStudentDetails";
import { useAuth } from "@/context/AuthContext";

import FlipCardUI from "@/components/admin/manage-student/Registration/irefid";
import BasicInfo from "@/app/manage-student/student-profile/[lrn]/basic-info";
import AddressInfo from "@/app/manage-student/student-profile/[lrn]/address-info";
import EmergencyInfo from "@/app/manage-student/student-profile/[lrn]/emergency-info";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { User, LockKeyhole, Save } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Profile from "@/components/admin/manage-student/EditStudent/profile";

export default function Dashboard() {
  const tokenLS =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // ✅ useAuth token (preferred if you already have it)
  const { token } = useAuth();
  const authToken = (token as string) || tokenLS;

  // ✅ user details
  const { data: user, isError, error } = useUserDetails(authToken);

  // ✅ change password mutation
  const { mutateAsync, isPending } = useChangeStudentPassword(authToken);

  const studentId = user?.data?.id ? String(user.data.id) : "";
  const studentName = user?.data
    ? `${user.data.first_name || ""} ${user.data.last_name || ""}`.trim()
    : "student";

  // ✅ form states
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  // optional: clear fields when switching tabs
  const handleResetPasswordFields = React.useCallback(() => {
    setNewPassword("");
    setConfirmPassword("");
  }, []);

  const handleChangePassword = async () => {
    if (!studentId) {
      toast.error("Student ID not found.");
      return;
    }
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
      handleResetPasswordFields();
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to change password.",
      );
    }
  };

  if (isError) {
    return (
      <div className="p-5 text-red-500">
        Error loading user details: {String(error)}
      </div>
    );
  }

  return (
    <ProtectedRoute role={["1", "2", "3", "4"]}>
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
                    <BreadcrumbLink href="/student/dashboard">
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

            <Tabs
              defaultValue="profile"
              className="w-full mt-4"
              onValueChange={(v) => {
                if (v !== "change-password") handleResetPasswordFields();
              }}
            >
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
                    <div className="flex flex-col lg:flex-row gap-5">
                      <Skeleton className="w-1/4 h-80 mb-6" />
                      <Skeleton className="w-3/4 h-80 mb-6" />
                    </div>
                    <div className="flex flex-col lg:flex-row gap-5">
                      <Skeleton className="w-full h-80 mb-2" />
                      <Skeleton className="w-full h-80 mb-2" />
                    </div>
                  </div>
                ) : (
                  <div className="p-2 h-full z-10">
                    <div className="h-full mt-10 z-10">
                      <div className="flex flex-col lg:flex-row gap-5">
                        <Profile id={user?.data?.id} />
                        <BasicInfo student={user?.data} />
                      </div>
                      <div className="flex flex-col lg:flex-row gap-5">
                        <AddressInfo student={user?.data} />
                        <EmergencyInfo student={user?.data} />
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>

              {/* CHANGE PASSWORD TAB */}
              <TabsContent value="change-password">
                <Card className="mt-4 max-w-2xl rounded-2xl">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <LockKeyhole className="size-4 text-teal-500" />
                      Change Password
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      Change password for{" "}
                      <span className="font-medium">{studentName}</span>.
                    </p>
                  </CardHeader>

                  <CardContent className="pt-4">
                    {/* skeleton while user not loaded */}
                    {!user ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="grid gap-2">
                          <Skeleton className="h-4 w-28" />
                          <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="md:col-span-2 flex justify-end">
                          <Skeleton className="h-10 w-40 rounded-full" />
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="grid gap-1">
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input
                            id="newPassword"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter new password"
                            disabled={isPending}
                          />
                        </div>

                        <div className="grid gap-1">
                          <Label htmlFor="confirmPassword">
                            Confirm Password
                          </Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                            disabled={isPending}
                          />
                        </div>

                        <div className="col-span-1 md:col-span-2 flex justify-end">
                          <Button
                            onClick={handleChangePassword}
                            disabled={isPending}
                            className="rounded-full"
                            variant="outline"
                          >
                            <Save className="size-4 text-primary mr-2" />
                            {isPending ? "Saving..." : "Save Password"}
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* debug (optional) */}
            {/* <pre className="mt-10 whitespace-pre-wrap text-xs bg-zinc-900 text-white p-3 rounded">
              {JSON.stringify(user, null, 2)}
            </pre> */}
          </div>

          <Footer />
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
