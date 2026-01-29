"use client";

import * as React from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { BookPlus, Save, CircleX } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

import { useCreateTeacherSubject } from "@/hooks/useTeacher";
import { useGrade } from "@/hooks/useGrade";
import { useSubject } from "@/hooks/useSubjects";
import { useSection } from "@/hooks/useSection"; // ✅ sections-by-grade hook

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
  teacherId: string;
  teacherName?: string;
  onSuccess?: () => void | Promise<any>;
};

function buildScheduleOptions() {
  const options: string[] = [];
  const startHour = 6; // 6 AM
  const endHour = 18; // 6 PM
  for (let h = startHour; h < endHour; h++) {
    const from = formatHour(h);
    const to = formatHour(h + 1);
    options.push(`${from} - ${to}`);
  }
  return options;
}

function formatHour(h24: number) {
  const suffix = h24 >= 12 ? "PM" : "AM";
  const h12 = ((h24 + 11) % 12) + 1;
  return `${h12}:00 ${suffix}`;
}

const scheduleDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function CreateTeacherSubjectDialog({
  open,
  setOpen,
  teacherId,
  teacherName,
  onSuccess,
}: Props) {
  const { token } = useAuth();
  const { mutateAsync, isPending } = useCreateTeacherSubject(token);

  const { data: gradeData, isLoading: gradeLoading } = useGrade(token as string);
  const { data: subjectData, isLoading: subjectLoading } = useSubject(
    token as string
  );

  const grades = Array.isArray(gradeData?.data) ? gradeData.data : [];
  const subjects = Array.isArray(subjectData?.data) ? subjectData.data : [];

  const scheduleOptions = React.useMemo(() => buildScheduleOptions(), []);

  const [gradeId, setGradeId] = React.useState<string>("");
  const [sectionId, setSectionId] = React.useState<string>(""); // ✅ added
  const [subjectName, setSubjectName] = React.useState<string>("");
  const [scheduleDay, setScheduleDay] = React.useState<string>("");
  const [schedule, setSchedule] = React.useState<string>("");

  // ✅ fetch sections by grade (your existing hook)
  const { data: sectionData, isLoading: sectionLoading } = useSection(
    token,
    gradeId
  );
  const sections = Array.isArray(sectionData?.data) ? sectionData.data : [];

  // ✅ filter subjects based on selected gradeId
  const filteredSubjects = React.useMemo(() => {
    if (!gradeId) return [];
    return subjects.filter((s: any) => String(s.grade_id) === String(gradeId));
  }, [subjects, gradeId]);

  // ✅ reset fields on close
  React.useEffect(() => {
    if (!open) {
      setGradeId("");
      setSectionId("");
      setSubjectName("");
      setScheduleDay("");
      setSchedule("");
    }
  }, [open]);

  // ✅ when grade changes, reset subject + section (dependent)
  React.useEffect(() => {
    setSubjectName("");
    setSectionId("");
  }, [gradeId]);

  const handleSave = async () => {
    if (!teacherId) return;

    if (!subjectName || !gradeId || !sectionId || !scheduleDay || !schedule) {
      toast.error("Please fill out all fields.");
      return;
    }

    try {
      const res = await mutateAsync({
        user_id: teacherId,
        subject_name: subjectName,
        grade_id: gradeId,
        section_id: sectionId, // ✅ send section_id
        schedule,
        schedule_day: scheduleDay,
      });

      toast.success(res?.message || "Subject created successfully.");
      setOpen(false);
      await onSuccess?.();
    } catch (err: any) {
      toast.error(err?.message || "Failed to create subject.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookPlus className="size-4 text-teal-500" />
            Add Subject
          </DialogTitle>
          <DialogDescription className="text-xs">
            Assign a subject for{" "}
            <span className="font-medium">{teacherName || "teacher"}</span>.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 mt-2 w-full">
          {/* ✅ Grade */}
          <div className="grid gap-2">
            <Label>Grade</Label>
            <Select
              value={gradeId}
              onValueChange={setGradeId}
              disabled={gradeLoading}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={gradeLoading ? "Loading grades..." : "Select grade"}
                />
              </SelectTrigger>
              <SelectContent>
                {grades.map((g: any) => (
                  <SelectItem key={g.id} value={String(g.id)}>
                    {g.grade_level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* ✅ Section depends on gradeId */}
          <div className="grid gap-2">
            <Label>Section</Label>
            <Select
              value={sectionId}
              onValueChange={setSectionId}
              disabled={!gradeId || sectionLoading}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={
                    !gradeId
                      ? "Select grade first"
                      : sectionLoading
                      ? "Loading sections..."
                      : sections.length
                      ? "Select section"
                      : "No sections for this grade"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {sections.map((sec: any) => (
                  <SelectItem key={sec.id} value={String(sec.id)}>
                    {sec.section_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {gradeId && !sectionLoading && sections.length === 0 ? (
              <p className="text-[10px] text-muted-foreground">
                No sections found for this grade.
              </p>
            ) : null}
          </div>

          {/* ✅ Subject depends on gradeId */}
          <div className="col-span-2 grid gap-2">
            <Label>Subject</Label>
            <Select
              value={subjectName}
              onValueChange={setSubjectName}
              disabled={subjectLoading || !gradeId}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={
                    !gradeId
                      ? "Select grade first"
                      : subjectLoading
                      ? "Loading subjects..."
                      : filteredSubjects.length
                      ? "Select subject"
                      : "No subjects for this grade"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {filteredSubjects.map((s: any) => (
                  <SelectItem key={s.id} value={s.name}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {gradeId && !subjectLoading && filteredSubjects.length === 0 ? (
              <p className="text-[10px] text-muted-foreground">
                No subjects found for this grade.
              </p>
            ) : null}
          </div>

          {/* ✅ Schedule Day */}
          <div className="col-span-2 grid gap-2">
            <Label>Schedule Day</Label>
            <Select value={scheduleDay} onValueChange={setScheduleDay}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select day" />
              </SelectTrigger>
              <SelectContent>
                {scheduleDays.map((day) => (
                  <SelectItem key={day} value={day}>
                    {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <p className="text-[10px] text-muted-foreground">
              Available days: Monday to Saturday.
            </p>
          </div>

          {/* ✅ Schedule Time */}
          <div className="col-span-2 grid gap-2">
            <Label>Schedule Time</Label>
            <Select value={schedule} onValueChange={setSchedule}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select schedule" />
              </SelectTrigger>
              <SelectContent>
                {scheduleOptions.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <p className="text-[10px] text-muted-foreground">
              1-hour interval schedule (6:00 AM - 6:00 PM).
            </p>
          </div>
        </div>

        <DialogFooter className="mt-3">
          <DialogClose asChild>
            <Button
              variant="destructive"
              size="sm"
              className="rounded-full"
              disabled={isPending}
            >
              <CircleX className="size-4" />
              Cancel
            </Button>
          </DialogClose>

          <Button
            onClick={handleSave}
            variant="outline"
            size="sm"
            className="rounded-full"
            disabled={isPending}
          >
            <Save className="size-4 text-primary" />
            {isPending ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
