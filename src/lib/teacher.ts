import type { Student } from "@/types/Student";
import type { TeacherData, TeacherSubjectAssignment } from "@/types/Teacher";

function normalizePart(value: string | null | undefined) {
  return (value ?? "").trim().toLocaleLowerCase();
}

export function compareTeachersAlphabetically(
  left: TeacherData,
  right: TeacherData,
) {
  return (
    normalizePart(left.last_name).localeCompare(normalizePart(right.last_name)) ||
    normalizePart(left.first_name).localeCompare(normalizePart(right.first_name)) ||
    normalizePart(left.middle_name).localeCompare(normalizePart(right.middle_name)) ||
    normalizePart(left.suffix).localeCompare(normalizePart(right.suffix)) ||
    String(left.id).localeCompare(String(right.id))
  );
}

export function getTeacherHandledSectionIds(
  teacher: Pick<TeacherData, "section" | "teacher_subjects"> | null | undefined,
) {
  const sectionIds = new Set<string>();

  if (teacher?.section?.id) {
    sectionIds.add(String(teacher.section.id));
  }

  (teacher?.teacher_subjects ?? []).forEach((subject) => {
    const sectionId = subject.section_id;
    if (sectionId !== null && sectionId !== undefined && String(sectionId).trim()) {
      sectionIds.add(String(sectionId));
    }
  });

  return Array.from(sectionIds);
}

export function getStudentsForTeacherSections(
  students: Student[],
  sectionIds: string[],
) {
  if (!sectionIds.length) {
    return [];
  }

  const allowedSections = new Set(sectionIds.map(String));

  return students.filter((student) => allowedSections.has(String(student.section_id)));
}

export function hasAdvisorySection(
  teacher: Pick<TeacherData, "section"> | null | undefined,
) {
  return Boolean(teacher?.section?.id);
}
