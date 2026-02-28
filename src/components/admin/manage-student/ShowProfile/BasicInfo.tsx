"use client";

// BasicInfo.tsx
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ShieldUser,
  Calendar,
  GraduationCap,
  Book,
  User,
  UserLock,
  CalendarDays,
  MapPinHouse,
  CircleSmall,
  School,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { useGetStudentDetailsByLrn } from "@/hooks/useStudentDetails";

export default function BasicInfo({ lrn }: { lrn: string }) {
  const { token } = useAuth();
  const { data, isLoading, isError } = useGetStudentDetailsByLrn(token, lrn);

  if (isLoading) return <div className="px-5 py-5 text-sm">Loading...</div>;
  if (isError) return <div className="px-5 py-5 text-sm">Error loading student info</div>;

  const student = data?.data?.student;

  const gradeLabel =
    student?.grade?.grade_level ||
    (student?.grade_id ? `Grade ID: ${student.grade_id}` : "N/A");

  const sectionLabel =
    student?.section?.section_name ||
    (student?.section_id ? `Section ID: ${student.section_id}` : "N/A");

  return (
    <div className="w-full py-5 flex flex-col gap-4 px-5 mt-5 rounded-md bg-accent/10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SectionHeader
          icon={<ShieldUser className="text-blue-500 size-3" />}
          title="Primary Information"
        />

        <InputField
          label="LRN"
          value={student?.lrn}
          icon={<ShieldUser className="text-blue-500 h-4 w-4" />}
        />

        <InputField
          label="School Year"
          value={student?.school_year}
          icon={<Calendar className="text-teal-500 h-4 w-4" />}
        />

        <InputField
          label="Grade"
          value={gradeLabel}
          icon={<GraduationCap className="text-teal-500 h-4 w-4" />}
        />

        <InputField
          label="Section"
          value={sectionLabel}
          icon={<Book className="text-teal-500 h-4 w-4" />}
        />

        <SectionHeader
          icon={<UserLock className="text-yellow-500 size-3" />}
          title="Basic Information"
        />

        <InputField
          label="First Name"
          value={student?.first_name}
          icon={<User className="text-green-500 h-4 w-4" />}
        />

        <InputField
          label="Middle Name"
          value={student?.middle_name}
          icon={<User className="text-green-500 h-4 w-4" />}
        />

        <InputField
          label="Last Name"
          value={student?.last_name}
          icon={<User className="text-green-500 h-4 w-4" />}
        />

        <InputField
          label="Suffix"
          value={student?.suffix}
          icon={<User className="text-green-500 h-4 w-4" />}
        />

        <InputField
          label="Birth Date"
          value={student?.birth_date}
          icon={<CalendarDays className="text-indigo-500 h-4 w-4" />}
        />

        <InputField
          label="Birth Place"
          value={student?.birth_place}
          icon={<MapPinHouse className="text-red-500 h-4 w-4" />}
        />

        <InputField
          label="Gender"
          value={student?.gender}
          icon={<CircleSmall className="text-teal-500 h-4 w-4" />}
        />

        <InputField
          label="Last School Attended"
          value={student?.last_school_attend}
          icon={<School className="text-green-500 h-4 w-4" />}
        />
      </div>
    </div>
  );
}

function InputField({
  label,
  value,
  icon,
}: {
  label: string;
  value?: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="mt-2">
      <Label className="flex items-center gap-1">
        {icon} {label}
      </Label>
      <Input value={value ?? ""} disabled />
    </div>
  );
}

function SectionHeader({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="col-span-1 md:col-span-2 mb-3">
      <p className="text-sm font-medium flex items-center gap-1">
        {icon} {title}
      </p>
    </div>
  );
}
