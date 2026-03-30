import type { Student } from "@/types/Student";
import type { TeacherData } from "@/types/Teacher";

export interface AdvisorySubject {
  id: number | string;
  name: string;
  grade_id?: number | string | null;
  schedule?: string | null;
  schedule_day?: string | null;
}

export interface AdvisoryTeacher extends TeacherData {
  subjects?: AdvisorySubject[] | null;
}

export interface AdvisoryTeacherDetailsPayload {
  teacher?: AdvisoryTeacher[] | null;
  students?: Student[] | null;
}

export interface AdvisoryTeacherDetailsResponse {
  status?: boolean;
  message?: string | null;
  data?: AdvisoryTeacherDetailsPayload | null;
}
