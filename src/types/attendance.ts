export type AttendanceRecord = {
  id?: number | string;
  user_id?: number | string | null;
  student_id?: number | string | null;
  lrn?: string | null;
  fullname?: string | null;
  full_name?: string | null;
  remarks?: string | null;
  status?: string | null;
  time_in?: string | null;
  time_out?: string | null;
  date?: string | null;
  grade?: string | number | null;
  section?: string | number | null;
  student?: {
    id?: number | string | null;
    lrn?: string | null;
    first_name?: string | null;
    middle_name?: string | null;
    last_name?: string | null;
    suffix?: string | null;
    [key: string]: unknown;
  } | null;
  [key: string]: unknown;
};

export type AttendanceBySectionResponse = {
  status?: boolean;
  message?: string;
  data?: AttendanceRecord[];
  [key: string]: unknown;
};

export type GenerateAbsentResponse = {
  status?: boolean;
  message?: string;
  date?: string | null;
  created?: number | null;
  skipped?: number | null;
  [key: string]: unknown;
};

export type WeeklyAttendanceAverage = {
  week: string;
  present: number;
  late: number;
  absent: number;
};
