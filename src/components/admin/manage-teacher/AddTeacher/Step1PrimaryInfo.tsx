import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useGrade } from "@/hooks/useGrade";
import { useSection } from "@/hooks/useSection";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  KeyRound,
  GraduationCap,
  Book,
  Calendar,
  Divide,
  ShieldUser,
  RefreshCw,
} from "lucide-react";

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

  const SectionID = formData.grade;
  const { data: SectionsData, isLoading: isLoadingSectionsData } = useSection(
    token as string,
    SectionID
  );

  console.log("Sectiondata", SectionsData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
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

  const generateSchoolYears = () => {
    const currentYear = new Date().getFullYear();
    const startYear = 2024;
    const years = [];
    for (let i = startYear; i <= currentYear + 5; i++)
      years.push(`${i}-${i + 1}`);
    return years;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
      <span className="col-span-1 md:col-span-4">
        <h1 className="text-2xl font-bold flex items-center">
          <ShieldUser className="text-blue-500 h-6 w-6 mr-1" />
          Primary Information
        </h1>
      </span>

      {/* <div className="grid gap-2">
        <Label htmlFor="employeeNumber">
          <span className="text-red-500 mr-[-0.3rem]">*</span>
          <KeyRound className="text-blue-500 h-3 w-3" />
          Employee Number
        </Label>
        <div className="flex items-center">
          <Input
            id="employeeNumber"
            name="employeeNumber"
            type="text"
            placeholder="Enter your employee number (e.g. YGA-2025-001)"
            value={formData.employeeNumber}
            onChange={(e) => {
              setFormData((prev: any) => ({
                ...prev,
                employeeNumber: e.target.value,
              }));

              if (e.target.value && e.target.value.length !== 12) {
                setErrors((prev: any) => ({
                  ...prev,
                  employeeNumber: "Employee Number must be 12 digits",
                }));
              } else {
                setErrors((prev: any) => {
                  const n = { ...prev };
                  delete n.employeeNumber;
                  return n;
                });
              }
            }}
            className={errors.employeeNumber ? "border border-red-500" : ""}
            disabled={loading}
          />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                className="ml-2"
                onClick={() => {
                  const num = Math.floor(100 + Math.random() * 900);
                  const currentYear = new Date().getFullYear();
                  setFormData((prev: any) => ({
                    ...prev,
                    employeeNumber: `YGA-${currentYear}-${num}`,
                  }));
                }}
              >
                <RefreshCw />
              </Button>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              align="center"
              className="block group-data-[collapsible=icon]:hidden"
            >
              Generate Employee Number
            </TooltipContent>
          </Tooltip>
        </div>
        {errors.employeeNumber && (
          <span className="text-xs text-red-500">{errors.employeeNumber}</span>
        )}
      </div> */}

      <div className="grid gap-2">
        <Label htmlFor="grade">
          <span className="text-red-500 mr-[-0.3rem]">*</span>
          <GraduationCap className="text-green-500 h-3 w-3" />
          Advisory Grade
        </Label>
        <select
          id="grade"
          name="grade"
          value={formData.grade}
          onChange={handleChange}
          className={
            errors.grade
              ? "border-red-500 border dark:bg-zinc-900 py-1 px-3 rounded-sm"
              : "border dark:bg-zinc-900 py-1 px-3 rounded-sm"
          }
          disabled={loading}
        >
          <option value="">Select Grade</option>
          {GradesData?.data.map((grade: any) => (
            <option key={grade.id} value={grade.id}>
              {grade.grade_level}
            </option>
          ))}
        </select>
        {errors.grade && (
          <span className="text-xs text-red-500">{errors.grade}</span>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="section">
          <span className="text-red-500 mr-[-0.3rem]">*</span>
          <Book className="text-yellow-500 h-3 w-3" />
          Advisory Section
        </Label>
        <select
          id="section"
          name="section"
          value={formData.section}
          onChange={handleChange}
          className={
            errors.section
              ? "border-red-500 border dark:bg-zinc-900 py-1 px-3 rounded-sm"
              : "border dark:bg-zinc-900 py-1 px-3 rounded-sm"
          }
          disabled={loading || !formData.grade}
        >
          <option value="">Select Section</option>
          {SectionsData?.data.map((section: any) => (
            <option key={section.id} value={section.id}>
              {section.section_name}
            </option>
          ))}
        </select>
        {errors.section && (
          <span className="text-xs text-red-500">{errors.section}</span>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="school_year">
          <span className="text-red-500 mr-[-0.3rem]">*</span>
          <Calendar className="text-violet-500 h-3 w-3" />
          School Year
        </Label>
        <select
          id="school_year"
          name="school_year"
          value={formData.school_year}
          onChange={handleChange}
          className={
            errors.school_year
              ? "border-red-500 border dark:bg-zinc-900 py-1 px-3 rounded-sm"
              : "border dark:bg-zinc-900 py-1 px-3 rounded-sm"
          }
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
  );
}
