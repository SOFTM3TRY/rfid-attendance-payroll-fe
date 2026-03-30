import Profile from "@/app/manage-teacher/teacher-profile/[teacherId]/profile";
import BasicInfo from "@/app/manage-teacher/teacher-profile/[teacherId]/basic-info";
import AddressInfo from "@/app/manage-teacher/teacher-profile/[teacherId]/address-info";
import TeacherSubjects from "@/app/manage-teacher/teacher-profile/[teacherId]/teacher-subjects";
import EmergencyInfo from "@/app/manage-teacher/teacher-profile/[teacherId]/emergency-info";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { TeacherData, TeacherSubjectAssignment } from "@/types/Teacher";

type TeacherSelfProfilePageContentProps = {
  teacher: TeacherData;
  teacherSubjects: TeacherSubjectAssignment[];
  newPassword: string;
  confirmPassword: string;
  isChanging: boolean;
  onNewPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onChangePassword: () => void;
  onRefetchTeacher: () => Promise<unknown> | void;
};

export function TeacherSelfProfilePageContent({
  teacher,
  teacherSubjects,
  newPassword,
  confirmPassword,
  isChanging,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onChangePassword,
  onRefetchTeacher,
}: TeacherSelfProfilePageContentProps) {
  return (
    <Tabs defaultValue="profile" className="mt-4 w-full">
      <TabsList className="w-full justify-start text-xs">
        <TabsTrigger value="profile" className="text-xs">
          Profile
        </TabsTrigger>
        <TabsTrigger value="change-password" className="text-xs">
          Change Password
        </TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <div className="z-10 mt-10 h-full p-2">
          <div className="flex gap-5">
            <Profile teacher={teacher} onRefetch={onRefetchTeacher} />
            <BasicInfo teacher={teacher} />
          </div>

          <div className="mt-5 flex gap-5">
            <TeacherSubjects subjects={teacherSubjects} />
          </div>

          <div className="flex gap-5">
            <AddressInfo teacher={teacher} />
            <EmergencyInfo teacher={teacher} />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="change-password">
        <Card className="mt-4 max-w-2xl p-6">
          <h2 className="mb-4 text-xs font-semibold text-muted-foreground">
            Change Password
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="grid gap-1">
              <Label>New Password</Label>
              <Input
                type="password"
                value={newPassword}
                onChange={(event) => onNewPasswordChange(event.target.value)}
                placeholder="Enter new password"
              />
            </div>

            <div className="grid gap-1">
              <Label>Confirm Password</Label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(event) =>
                  onConfirmPasswordChange(event.target.value)
                }
                placeholder="Confirm new password"
              />
            </div>

            <div className="col-span-1 flex justify-end md:col-span-2">
              <Button
                onClick={onChangePassword}
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
  );
}
