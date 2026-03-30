import type { TeacherData, TeacherSubjectAssignment } from "@/types/Teacher";
import type { HistoryLogRecord } from "@/types/history-log";
import Profile from "@/app/manage-teacher/teacher-profile/[teacherId]/profile";
import BasicInfo from "@/app/manage-teacher/teacher-profile/[teacherId]/basic-info";
import AddressInfo from "@/app/manage-teacher/teacher-profile/[teacherId]/address-info";
import EmergencyInfo from "@/app/manage-teacher/teacher-profile/[teacherId]/emergency-info";
import TeacherSubjects from "@/app/manage-teacher/teacher-profile/[teacherId]/teacher-subjects";
import HistoryLogs from "@/app/manage-teacher/teacher-profile/[teacherId]/history-logs";

type TeacherProfilePageContentProps = {
  teacher: TeacherData;
  teacherSubjects: TeacherSubjectAssignment[];
  historyLogs: HistoryLogRecord[];
  onRefetchTeacher: () => void;
};

export function TeacherProfilePageContent({
  teacher,
  teacherSubjects,
  historyLogs,
  onRefetchTeacher,
}: TeacherProfilePageContentProps) {
  return (
    <div className="z-10 mt-10 h-full p-2">
      <div className="flex gap-5">
        <Profile teacher={teacher} onRefetch={onRefetchTeacher} />
        <BasicInfo teacher={teacher} />
      </div>

      <div className="mt-5 flex flex-col gap-5">
        <TeacherSubjects subjects={teacherSubjects} />
        <HistoryLogs logs={historyLogs} />
      </div>

      <div className="flex gap-5">
        <AddressInfo teacher={teacher} />
        <EmergencyInfo teacher={teacher} />
      </div>
    </div>
  );
}
