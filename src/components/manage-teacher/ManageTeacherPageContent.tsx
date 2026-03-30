import { TeacherTableSection } from "@/components/manage-teacher/TeacherTableSection";
import type { TeacherData } from "@/types/Teacher";

type ManageTeacherPageContentProps = {
  teachers: TeacherData[];
  isLoading?: boolean;
  isRefreshing?: boolean;
  isError?: boolean;
  onRefresh: () => void;
};

export function ManageTeacherPageContent({
  teachers,
  isLoading = false,
  isRefreshing = false,
  isError = false,
  onRefresh,
}: ManageTeacherPageContentProps) {
  return (
    <TeacherTableSection
      teachers={teachers}
      isLoading={isLoading}
      isRefreshing={isRefreshing}
      isError={isError}
      onRefresh={onRefresh}
    />
  );
}
