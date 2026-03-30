import DownloadAttendanceReportPdfModal from "@/components/DownloadAttendanceReportPdfModal";
import { AttendanceTable } from "@/components/attendance/AttendanceTable";
import { AdvisorySubjectsCard } from "@/components/advisory/AdvisorySubjectsCard";
import { AdvisoryTeacherProfileCard } from "@/components/advisory/AdvisoryTeacherProfileCard";
import TeacherStudentRosterTable from "@/components/teacher/TeacherStudentRosterTable";
import type { AttendanceRecord } from "@/types/attendance";
import type { AdvisorySubject, AdvisoryTeacher } from "@/types/advisory";
import type { Student } from "@/types/Student";

type AdvisoryClassContentProps = {
  token: string | null;
  teacher: AdvisoryTeacher | null;
  students: Student[];
  subjects: AdvisorySubject[];
  attendanceRecords: AttendanceRecord[];
  fullName: string;
};

export function AdvisoryClassContent({
  token,
  teacher,
  students,
  subjects,
  attendanceRecords,
  fullName,
}: AdvisoryClassContentProps) {
  return (
    <div className="mt-10 mb-20 flex flex-col gap-5">
      <div className="col-span-1 flex h-full flex-col gap-5 rounded-md xl:flex-row">
        <div className="flex flex-col gap-5">
          <AdvisoryTeacherProfileCard teacher={teacher} fullName={fullName} />
          <AdvisorySubjectsCard subjects={subjects} />
        </div>

        <div className="w-full rounded-lg bg-accent/20 p-5">
          {token && teacher ? (
            <DownloadAttendanceReportPdfModal
              token={token}
              sectionId={String(teacher.section?.id)}
              gradeLabel={teacher.grade?.grade_level || "N/A"}
              sectionLabel={teacher.section?.section_name || "N/A"}
              teacherName={fullName}
              schoolName="Young Generation Academy"
            />
          ) : null}

          <TeacherStudentRosterTable students={students} />
        </div>
      </div>

      <div className="rounded-lg bg-accent/20 p-5">
        <AttendanceTable
          title="Section Attendance"
          description="This table shows all attendance records for this advisory section."
          records={attendanceRecords}
          emptyMessage="No attendance records were found for this advisory section."
        />
      </div>
    </div>
  );
}
