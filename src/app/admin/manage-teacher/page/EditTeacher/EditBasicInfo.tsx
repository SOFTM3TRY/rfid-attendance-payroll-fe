"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ShieldUser,
  GraduationCap,
  Book,
  Calendar,
  KeyRound,
  User,
  UserLock,
  CalendarDays,
  MapPinHouse,
  CircleSmall,
  School,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useTeacherDetails } from "@/hooks/useTeacher";
import { useForm } from "react-hook-form";

// Mocked data, replace with actual API/context
const GradesData = {
  data: [
    { id: "1", grade_level: "Grade 1" },
    { id: "2", grade_level: "Grade 2" },
    // Add more as needed
  ],
};

function generateSchoolYears() {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 5 }, (_, i) => `${currentYear - i}-${currentYear - i + 1}`);
}

function generateSections() {
  return ["A", "B", "C", "D"];
}

export default function EditBasicInfo({ TeacherData }: { TeacherData: any }) {
  const [formData, setFormData] = useState({
    lrn: "",
    grade: "",
    section: "",
    school_year: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    suffix: "",
    birth_date: "",
    birth_place: "",
    gender: "",
    last_school_attend: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
    
 
 console.log("Teacher Data in EditBasicInfo:", TeacherData);
 console.log("Default Values:", {
       employee_no: TeacherData?.data?.teacher?.[0]?.employee_no,
        grade:  TeacherData?.data?.teacher?.[0]?.additional_info?.grade,
    });
const {register, handleSubmit, formState: { errors: formErrors }} = useForm({
    defaultValues: {
       employee_no: TeacherData?.data?.teacher?.[0]?.employee_no,
        grade:  TeacherData?.data?.teacher?.[0]?.additional_info?.grade,
        section: TeacherData?.data?.teacher?.[0]?.additional_info?.section,
    },
  });
  
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => {
      const updated = { ...prev };
      delete updated[name];
      return updated;
    });
  };
const onSubmit = (data: any) => {
    console.log("Form Submitted Data:", data);
  }
  return (
    <div className="flex flex-col gap-10 rounded-md bg-zinc-100 dark:bg-zinc-900 mt-10">

      {/* ========== Primary Information ========== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <span className="col-span-1 md:col-span-4">
          <h1 className="text-sm font-medium flex items-center text-zinc-800 dark:text-zinc-100 bg-zinc-200 dark:bg-zinc-800 py-2 px-3 rounded-sm w-56">
            <ShieldUser className="text-blue-500 h-5 w-5 mr-1" />
            Primary Information
          </h1>
        </span>

        {/* LRN */}
        <div className="grid gap-2">
          <Label htmlFor="lrn">
            <span className="text-red-500 mr-[-0.3rem]">*</span>
            <KeyRound className="text-blue-500 h-3 w-3 inline" />
            Employee No.
          </Label>
          <Input
           
          
            inputMode="numeric"
            pattern="\d{12}"
            placeholder="Enter Employee No."
            maxLength={12}
            {...register("employee_no")}
           
      
            className={errors.lrn ? "border border-red-500" : ""}
            disabled={loading}
          />
          {errors.lrn && <span className="text-xs text-red-500">{errors.lrn}</span>}
        </div>

        {/* Grade */}
        <div className="grid gap-2">
          <Label htmlFor="grade">
            <span className="text-red-500 mr-[-0.3rem]">*</span>
            <GraduationCap className="text-green-500 h-3 w-3 inline" />
            Advisory Grade
          </Label>
          <select {...register("grade")} onChange={handleChange} className={`border dark:bg-zinc-900 py-1 px-3 rounded-sm ${errors.grade ? "border-red-500" : ""}`} disabled={loading}>
            <option value="">Select Grade</option>
            {GradesData.data.map((grade) => (
              <option key={grade.id} value={grade.id}>
                {grade.grade_level}
              </option>
            ))}
          </select>
          {errors.grade && <span className="text-xs text-red-500">{errors.grade}</span>}
        </div>

        {/* Section */}
        <div className="grid gap-2">
          <Label htmlFor="section">
            <span className="text-red-500 mr-[-0.3rem]">*</span>
            <Book className="text-yellow-500 h-3 w-3 inline" />
            Advisory Section
          </Label>
          <select
            {...register("section")}
            onChange={handleChange}
            className={`border dark:bg-zinc-900 py-1 px-3 rounded-sm ${
              errors.section ? "border-red-500" : ""
            }`}
            
            
          >
            
          </select>
          {errors.section && <span className="text-xs text-red-500">{errors.section}</span>}
        </div>

        {/* School Year */}
        <div className="grid gap-2">
          <Label htmlFor="school_year">
            <span className="text-red-500 mr-[-0.3rem]">*</span>
            <Calendar className="text-violet-500 h-3 w-3 inline" />
            School Year
          </Label>
          <select
            id="school_year"
            name="school_year"
            value={formData.school_year}
            onChange={handleChange}
            className={`border dark:bg-zinc-900 py-1 px-3 rounded-sm ${
              errors.school_year ? "border-red-500" : ""
            }`}
            disabled={loading}
          >
            <option value="">Select School Year</option>
            {generateSchoolYears().map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          {errors.school_year && (
            <span className="text-xs text-red-500">{errors.school_year}</span>
          )}
        </div>
      </div>
    </div>
  );
}
