import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useSession } from "@/context/SessionContext";
import { useChangeTeacherPassword } from "@/hooks/useTeacher";
import { useTeacherProfilePage } from "@/hooks/useTeacherProfilePage";

export function useTeacherSelfProfilePage() {
  const {
    token,
    user,
    isLoading: isSessionLoading,
    isError,
    refetch: refetchSession,
  } = useSession();
  const teacherId =
    user && typeof user.id === "number" ? String(user.id) : "";
  const {
    teacher,
    teacherSubjects,
    refetchTeacher,
    isLoading: isTeacherLoading,
  } = useTeacherProfilePage(teacherId);
  const { mutateAsync: changePassword, isPending: isChanging } =
    useChangeTeacherPassword(token);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRefetchTeacher = useCallback(async () => {
    await refetchTeacher();
    await refetchSession();
  }, [refetchSession, refetchTeacher]);

  const handleChangePassword = useCallback(async () => {
    const id = user?.id;

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
      const response = await changePassword({
        id: Number(id),
        new_password: newPassword,
        confirm_password: confirmPassword,
      });

      toast.success(response?.message || "Password changed successfully.");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: unknown) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to change password.",
      );
    }
  }, [changePassword, confirmPassword, newPassword, user?.id]);

  return {
    teacher,
    teacherSubjects,
    isLoading: isSessionLoading || (!!teacherId && isTeacherLoading),
    isError,
    newPassword,
    confirmPassword,
    isChanging,
    setNewPassword,
    setConfirmPassword,
    handleChangePassword,
    handleRefetchTeacher,
  };
}
