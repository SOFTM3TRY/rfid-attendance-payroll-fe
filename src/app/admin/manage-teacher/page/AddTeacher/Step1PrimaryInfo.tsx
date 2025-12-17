"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import { useGrade } from "@/hooks/useGrade";
import { useSection } from "@/hooks/useSection";
import { useYear } from "@/hooks/useYear";
import { ShieldUser, GraduationCap, Book, Calendar } from "lucide-react";

export default function Step1({
  formData,
  setFormData,
  errors,
  setErrors,
  loading,
}: any) {
  const { token } = useAuth();
  const { data: GradesData, isLoading: isLoadingGradesData } = useGrade(
    token as string
  );
  const { data: YearsData, isLoading: isLoadingYearsData } = useYear(
    token as string
  );

  const SectionID = formData.grade;
  const { data: SectionsData, isLoading: isLoadingSectionsData } = useSection(
    token as string,
    SectionID
  );

  const handleChange = (name: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
      ...(name === "grade" && { section: "" }),
    }));

    setErrors((prev: any) => {
      const n = { ...prev };
      delete n[name];
      return n;
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
      <span className="col-span-1 md:col-span-4">
        <h1 className="text-xl font-bold flex items-center">
          <ShieldUser className="text-blue-500 h-6 w-6 mr-1" />
          Primary Information
        </h1>
      </span>

      {/* GRADE SELECT */}
      <div className="grid gap-2">
        <Label htmlFor="grade">
          <span className="text-red-500 mr-[-0.3rem]">*</span>
          <GraduationCap className="text-green-500 h-3 w-3" /> Advisory Grade
        </Label>
        <Select
          value={formData.grade}
          onValueChange={(value) => handleChange("grade", value)}
          disabled={loading || isLoadingGradesData}
        >
          <SelectTrigger
            className={
              errors.grade
                ? "border-red-500 border dark:bg-zinc-900 py-1 px-3 rounded-sm w-56"
                : "border dark:bg-zinc-900 py-1 px-3 rounded-sm w-56"
            }
          >
            <SelectValue placeholder="Select Grade" />
          </SelectTrigger>
          <SelectContent>
            {GradesData?.data.map((grade: any) => (
              <SelectItem key={grade.id} value={String(grade.id)}>
                {grade.grade_level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.grade && (
          <span className="text-xs text-red-500">{errors.grade}</span>
        )}
      </div>

      {/* SECTION SELECT */}
      <div className="grid gap-2">
        <Label htmlFor="section">
          <span className="text-red-500 mr-[-0.3rem]">*</span>
          <Book className="text-yellow-500 h-3 w-3" /> Advisory Section
        </Label>
        <Select
          value={formData.section}
          onValueChange={(value) => handleChange("section", value)}
          disabled={loading || !formData.grade || isLoadingSectionsData}
        >
          <SelectTrigger
            className={
              errors.section
                ? "border-red-500 border dark:bg-zinc-900 py-1 px-3 rounded-sm w-56"
                : "border dark:bg-zinc-900 py-1 px-3 rounded-sm w-56"
            }
          >
            <SelectValue placeholder="Select Section" />
          </SelectTrigger>
          <SelectContent>
            {SectionsData?.data.map((section: any) => (
              <SelectItem key={section.id} value={section.id}>
                {section.section_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.section && (
          <span className="text-xs text-red-500">{errors.section}</span>
        )}
      </div>

      {/* SCHOOL YEAR SELECT */}
      <div className="grid gap-2 w-full">
        <Label htmlFor="school_year">
          <span className="text-red-500 mr-[-0.3rem]">*</span>
          <Calendar className="text-violet-500 h-3 w-3" /> School Year
        </Label>
        <Select
          value={formData.school_year}
          onValueChange={(value) => handleChange("school_year", value)}
          disabled={loading || isLoadingYearsData}
        >
          <SelectTrigger
            className={
              errors.school_year
                ? "border-red-500 border dark:bg-zinc-900 py-1 px-3 rounded-sm w-56"
                : "border dark:bg-zinc-900 py-1 px-3 rounded-sm w-56"
            }
          >
            <SelectValue placeholder="Select School Year" />
          </SelectTrigger>
          <SelectContent>
            {YearsData?.data.map((year: any) => (
              <SelectItem key={year.id} value={year.years}>
                {year.years}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.school_year && (
          <span className="text-xs text-red-500">{errors.school_year}</span>
        )}
      </div>
    </div>
  );
}
