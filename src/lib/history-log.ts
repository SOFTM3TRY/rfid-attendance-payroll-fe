import type {
  HistoryEmployeeRecord,
  HistoryLogRecord,
  HistoryLogResponse,
  HistoryLogsResponse,
  HistoryStudentRecord,
} from "@/types/history-log";

export function extractHistoryLogs(
  response?: HistoryLogsResponse | null,
): HistoryLogRecord[] {
  const payload = response?.data;

  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.historyLogs)) {
    return payload.historyLogs.filter(Boolean) as HistoryLogRecord[];
  }

  if (payload?.historyLog) {
    return [payload.historyLog];
  }

  return [];
}

export function extractHistoryLog(
  response?: HistoryLogResponse | HistoryLogsResponse | null,
): HistoryLogRecord | null {
  const payload = response?.data;

  if (!payload) {
    return null;
  }

  if (Array.isArray(payload)) {
    return payload[0] ?? null;
  }

  const envelope = payload as {
    historyLog?: HistoryLogRecord | null;
    historyLogs?: HistoryLogRecord[] | null;
  };

  if (envelope.historyLog) {
    return envelope.historyLog;
  }

  if (Array.isArray(envelope.historyLogs)) {
    return envelope.historyLogs[0] ?? null;
  }

  if ("id" in payload && payload.id != null) {
    return payload as HistoryLogRecord;
  }

  return null;
}

export function getHistoryEmployee(
  record: HistoryLogRecord,
): HistoryEmployeeRecord | null {
  return (
    record.employee ??
    record.data?.employee ??
    record.teacher_history?.new ??
    record.teacher_history?.old ??
    record.student?.new_teacher ??
    record.student?.old_teacher ??
    record.data?.teacher?.new ??
    record.data?.teacher?.old ??
    record.data?.student?.new_teacher ??
    record.data?.student?.old_teacher ??
    record.data?.data?.new_teacher ??
    record.data?.data?.old_teacher ??
    null
  );
}

export function getHandledStudents(
  record: HistoryLogRecord,
): HistoryStudentRecord[] {
  return (
    record.handled_students ??
    record.data?.handled_students ??
    record.student?.handled_students ??
    record.data?.student?.handled_students ??
    record.data?.data?.handled_students ??
    []
  ).filter(Boolean) as HistoryStudentRecord[];
}

export function buildHistoryPersonName(
  person?: HistoryEmployeeRecord | HistoryStudentRecord | null,
) {
  return [
    person?.last_name,
    person?.first_name,
    person?.middle_name,
    person?.suffix,
  ]
    .filter(Boolean)
    .join(" ")
    .trim();
}

export function getHistorySchoolYear(record: HistoryLogRecord) {
  return (
    getHistoryEmployee(record)?.additional_info?.school_year ??
    record.data?.employee?.additional_info?.school_year ??
    null
  );
}

export function buildHistoryTransition(record: HistoryLogRecord) {
  const oldGrade = record.grade?.grade_level;
  const newGrade = record.gradeNew?.grade_level;
  const oldSection = record.section?.section_name;
  const newSection = record.sectionNew?.section_name;

  if (!oldGrade && !newGrade && !oldSection && !newSection) {
    return null;
  }

  return {
    oldGrade: oldGrade ?? null,
    newGrade: newGrade ?? null,
    oldSection: oldSection ?? null,
    newSection: newSection ?? null,
  };
}
