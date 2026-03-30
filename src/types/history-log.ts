export type HistoryAdditionalInfo = {
  school_year?: string | null;
  grade?: string | null;
  section?: string | number | null;
  [key: string]: unknown;
};

export type HistoryEmployeeRecord = {
  id?: number | string | null;
  user_id?: number | string | null;
  employee_no?: string | null;
  first_name?: string | null;
  middle_name?: string | null;
  last_name?: string | null;
  suffix?: string | null;
  email?: string | null;
  avatar?: string | null;
  contact_no?: string | null;
  role_id?: number | string | null;
  status?: string | number | null;
  additional_info?: HistoryAdditionalInfo | null;
  created_at?: string | null;
  updated_at?: string | null;
  [key: string]: unknown;
};

export type HistoryStudentRecord = {
  id?: number | string | null;
  user_id?: number | string | null;
  lrn?: string | null;
  student_no?: string | null;
  first_name?: string | null;
  middle_name?: string | null;
  last_name?: string | null;
  suffix?: string | null;
  email?: string | null;
  avatar?: string | null;
  grade?: string | null;
  section?: string | number | null;
  school_year?: string | null;
  gender?: string | null;
  status?: string | number | null;
  additional_info?: HistoryAdditionalInfo | null;
  created_at?: string | null;
  updated_at?: string | null;
  [key: string]: unknown;
};

export type HistoryStudentChange = {
  new_teacher?: HistoryEmployeeRecord | null;
  old_teacher?: HistoryEmployeeRecord | null;
  handled_students?: HistoryStudentRecord[] | null;
  [key: string]: unknown;
};

export type HistoryTeacherChange = {
  new?: HistoryEmployeeRecord | null;
  old?: HistoryEmployeeRecord | null;
  [key: string]: unknown;
};

export type HistoryLogSnapshot = {
  data?: HistoryStudentChange | null;
  teacher?: HistoryTeacherChange | null;
  student?: HistoryStudentChange | null;
  employee?: HistoryEmployeeRecord | null;
  new_grade?: string | number | null;
  old_grade?: string | number | null;
  new_section?: string | number | null;
  old_section?: string | number | null;
  handled_students?: HistoryStudentRecord[] | null;
  [key: string]: unknown;
};

export type HistoryGradeRecord = {
  id?: number | string | null;
  grade_level?: string | null;
  description?: string | null;
  status?: string | number | null;
  created_at?: string | null;
  updated_at?: string | null;
  [key: string]: unknown;
};

export type HistorySectionRecord = {
  id?: number | string | null;
  section_name?: string | null;
  grade_id?: number | string | null;
  description?: string | null;
  status?: string | number | null;
  created_at?: string | null;
  updated_at?: string | null;
  [key: string]: unknown;
};

export type HistoryLogRecord = {
  id: number | string;
  user_id?: number | string | null;
  student?: HistoryStudentChange | null;
  employee?: HistoryEmployeeRecord | null;
  teacher_history?: HistoryTeacherChange | null;
  handled_students?: HistoryStudentRecord[] | null;
  data?: HistoryLogSnapshot | null;
  action?: string | null;
  message?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  grade?: HistoryGradeRecord | null;
  section?: HistorySectionRecord | null;
  gradeNew?: HistoryGradeRecord | null;
  sectionNew?: HistorySectionRecord | null;
  [key: string]: unknown;
};

export type HistoryLogsEnvelope = {
  historyLogs?: HistoryLogRecord[] | null;
  historyLog?: HistoryLogRecord | null;
  [key: string]: unknown;
};

export type HistoryLogsResponse = {
  status?: boolean;
  message?: string | null;
  data?: HistoryLogsEnvelope | HistoryLogRecord[] | null;
  [key: string]: unknown;
};

export type HistoryLogResponse = {
  status?: boolean;
  message?: string | null;
  data?: HistoryLogsEnvelope | HistoryLogRecord | null;
  [key: string]: unknown;
};
