// components/AddStudent/Step1PrimaryInfo.tsx

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  formData: {
    lrn: string;
    grade: string;
    section: string;
    school_year: string;
  };
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  loading: boolean;
};

export default function Step1PrimaryInfo({ formData, errors, onChange, loading }: Props) {
  const generateSchoolYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 2024; i <= currentYear + 5; i++) {
      years.push(`${i}-${i + 1}`);
    }
    return years;
  };

  const gradeOptions = ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6"];
  const sectionOptions = ["A", "B", "C"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
      {/* LRN */}
      <div className="grid gap-3">
        <Label htmlFor="lrn">
          <span className="text-red-500 mr-[-0.3rem]">*</span> LRN
        </Label>
        <Input
          id="lrn"
          name="lrn"
          type="text"
          inputMode="numeric"
          maxLength={12}
          value={formData.lrn}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "");
            if (value.length <= 12) {
              onChange({
                ...e,
                target: {
                  ...e.target,
                  value,
                  name: "lrn",
                },
              });
            }
          }}
          placeholder="Enter 12-digit LRN"
          className={errors.lrn ? "border border-red-500" : ""}
          disabled={loading}
        />
        {errors.lrn && <span className="text-sm text-red-500">{errors.lrn}</span>}
      </div>

      {/* Grade */}
      <div className="grid gap-3">
        <Label htmlFor="grade">
          <span className="text-red-500 mr-[-0.3rem]">*</span> Grade
        </Label>
        <select
          id="grade"
          name="grade"
          value={formData.grade}
          onChange={onChange}
          className={`border rounded-sm px-3 py-2 dark:bg-zinc-900 ${errors.grade ? "border-red-500" : ""}`}
          disabled={loading}
        >
          <option value="">Select Grade</option>
          {gradeOptions.map((grade) => (
            <option key={grade} value={grade}>
              {grade}
            </option>
          ))}
        </select>
        {errors.grade && <span className="text-sm text-red-500">{errors.grade}</span>}
      </div>

      {/* Section */}
      <div className="grid gap-3">
        <Label htmlFor="section">
          <span className="text-red-500 mr-[-0.3rem]">*</span> Section
        </Label>
        <select
          id="section"
          name="section"
          value={formData.section}
          onChange={onChange}
          className={`border rounded-sm px-3 py-2 dark:bg-zinc-900 ${errors.section ? "border-red-500" : ""}`}
          disabled={loading || !formData.grade}
        >
          <option value="">Select Section</option>
          {sectionOptions.map((section) => (
            <option key={section} value={section}>
              Section {section}
            </option>
          ))}
        </select>
        {errors.section && <span className="text-sm text-red-500">{errors.section}</span>}
      </div>

      {/* School Year */}
      <div className="grid gap-3">
        <Label htmlFor="school_year">
          <span className="text-red-500 mr-[-0.3rem]">*</span> School Year
        </Label>
        <select
          id="school_year"
          name="school_year"
          value={formData.school_year}
          onChange={onChange}
          className={`border rounded-sm px-3 py-2 dark:bg-zinc-900 ${errors.school_year ? "border-red-500" : ""}`}
          disabled={loading}
        >
          <option value="">Select School Year</option>
          {generateSchoolYears().map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        {errors.school_year && <span className="text-sm text-red-500">{errors.school_year}</span>}
      </div>
    </div>
  );
}
