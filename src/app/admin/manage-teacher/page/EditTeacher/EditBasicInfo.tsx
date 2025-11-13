"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSection } from "@/hooks/useSection";
import { useGrade } from "@/hooks/useGrade";
import { useAuth } from "@/context/AuthContext";
import {
  ShieldUser,
  GraduationCap,
  Book,
  Calendar,
  KeyRound,
} from "lucide-react";

interface EditBasicInfoProps {
  TeacherData: any; // The teacher object from EditTeacher
}

function generateSchoolYears() {
  const currentYear = new Date().getFullYear();
  return Array.from(
    { length: 5 },
    (_, i) => `${currentYear - i}-${currentYear - i + 1}`
  );
}

export default function EditBasicInfo({ TeacherData }: EditBasicInfoProps) {
  const { token } = useAuth();
  const teacher = TeacherData;

  // Setup form with default values
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      employee_no: teacher?.employee_no || "",
      grade: teacher?.additional_info?.grade || "",
      section: teacher?.additional_info?.section || "",
      school_year: teacher?.additional_info?.school_year || "",
    },
  });

  const selectedGrade = watch("grade");

  // Fetch Grades and Sections
  const { data: gradesData } = useGrade(token);
  const grades = gradesData?.data || [];

  const { data: sectionsData } = useSection(token, selectedGrade);
  const sections = sectionsData?.data || [];

  // Reset section when grade changes
  useEffect(() => {
    setValue("section", "");
  }, [selectedGrade, setValue]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 bg-zinc-100 dark:bg-zinc-900 rounded-md">
      <div className="col-span-1 md:col-span-4 mb-3 mt-5">
        <p className="text-sm font-medium flex items-center gap-1 bg-zinc-200 dark:bg-zinc-800 py-2 px-3 rounded-sm w-56">
          <ShieldUser className="text-blue-500" /> Primary Information
        </p>
      </div>

      {/* Employee No */}
      <div className="grid gap-2">
        <Label htmlFor="employee_no">
          <KeyRound className="text-blue-500 h-3 w-3 inline" /> Employee No.
        </Label>
        <Input
          type="text"
          maxLength={12}
          {...register("employee_no")}
          disabled
        />
      </div>

      {/* Grade */}
      <div className="grid gap-2">
        <Label htmlFor="grade">
          <GraduationCap className="text-green-500 h-3 w-3 inline" /> Advisory
          Grade
        </Label>
        <select
          {...register("grade")}
          className="border py-1 px-3 rounded-sm dark:bg-zinc-900"
        >
          <option value="">Select Grade</option>
          {grades.map((grade: any) => (
            <option key={grade.id} value={grade.id}>
              {grade.grade_level}
            </option>
          ))}
        </select>
      </div>

      {/* Section */}
      <div className="grid gap-2">
        <Label htmlFor="section">
          <Book className="text-yellow-500 h-3 w-3 inline" /> Advisory Section
        </Label>
        <select
          {...register("section")}
          className="border py-1 px-3 rounded-sm dark:bg-zinc-900"
          disabled={!selectedGrade}
        >
          <option value="">Select Section</option>
          {sections.map((section: any) => (
            <option key={section.id} value={section.section_name}>
              {section.section_name}
            </option>
          ))}
        </select>
      </div>

      {/* School Year */}
      <div className="grid gap-2">
        <Label htmlFor="school_year">
          <Calendar className="text-violet-500 h-3 w-3 inline" /> School Year
        </Label>
        <select
          {...register("school_year")}
          className="border py-1 px-3 rounded-sm dark:bg-zinc-900"
        >
          <option value="">Select School Year</option>
          {generateSchoolYears().map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
