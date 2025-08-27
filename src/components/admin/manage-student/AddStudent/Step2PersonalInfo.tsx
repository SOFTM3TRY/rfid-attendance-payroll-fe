import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { UserRound, CalendarDays, School, UserLock } from "lucide-react";

export default function Step2({
  formData,
  setFormData,
  errors,
  setErrors,
  loading,
}: any) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
    setErrors((prev: any) => {
      const n = { ...prev };
      delete n[name];
      return n;
    });
  };

  const suffixOptions = ["Jr.", "Sr.", "I", "II", "III", "IV", "V"];
  const genderOptions = ["Male", "Female", "Other"];
  const studentStatusOptions = ["active", "inactive"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-20">
      <span className="col-span-1 md:col-span-4">
        <h1 className="text-2xl font-bold flex items-center">
          <UserLock className="text-green-500 h-6 w-6 mr-1" />
          Basic Information
        </h1>
      </span>

      <div className="grid gap-2">
        <Label htmlFor="first_name">
          <span className="text-red-500 mr-[-0.3rem]">*</span>
          <UserRound className="text-green-500 h-3 w-3" />
          First Name
        </Label>
        <Input
          id="first_name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          placeholder="Enter First Name"
          className={errors.first_name ? "border-red-500 border dark:bg-zinc-900 py-1 px-3 rounded-sm" : "border dark:bg-zinc-900 py-1 px-3 rounded-sm"}
          disabled={loading}
        />
        {errors.first_name && (
          <span className="text-xs text-red-500">{errors.first_name}</span>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="middle_name">
          <UserRound className="text-green-500 h-3 w-3" />
          Middle Name <small>(Optional)</small>
        </Label>
        <Input
          id="middle_name"
          name="middle_name"
          value={formData.middle_name}
          onChange={handleChange}
          placeholder="Enter Middle Name"
          disabled={loading}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="last_name">
          <span className="text-red-500 mr-[-0.3rem]">*</span>
          <UserRound className="text-green-500 h-3 w-3" />
          Last Name
        </Label>
        <Input
          id="last_name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          placeholder="Enter Last Name"
          className={errors.last_name ? "border-red-500 border dark:bg-zinc-900 py-1 px-3 rounded-sm" : "border dark:bg-zinc-900 py-1 px-3 rounded-sm"}
          disabled={loading}
        />
        {errors.last_name && (
          <span className="text-xs text-red-500">{errors.last_name}</span>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="suffix">
          <UserRound className="text-green-500 h-3 w-3" />
          Suffix <small>(Optional)</small>
        </Label>
        <select
          id="suffix"
          name="suffix"
          value={formData.suffix}
          onChange={handleChange}
          className="border dark:bg-zinc-900 py-1 px-3 rounded-sm"
          disabled={loading}
        >
          <option value="">Select Suffix</option>
          {suffixOptions.map((suffix) => (
            <option key={suffix} value={suffix}>
              {suffix}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="gender">
          <span className="text-red-500 mr-[-0.3rem]">*</span>Gender
        </Label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className={
            errors.gender
              ? "border-red-500 border dark:bg-zinc-900 py-1 px-3 rounded-sm"
              : "border dark:bg-zinc-900 py-1 px-3 rounded-sm"
          }
          disabled={loading}
        >
          <option value="">Select Gender</option>
          {genderOptions.map((gender) => (
            <option key={gender} value={gender}>
              {gender}
            </option>
          ))}
        </select>
        {errors.gender && (
          <span className="text-xs text-red-500">{errors.gender}</span>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="birth_place">
          <span className="text-red-500 mr-[-0.3rem]">*</span>
         Birth Place
        </Label>
        <Input
          id="birth_place"
          name="birth_place"
          value={formData.birth_place}
          onChange={handleChange}
          placeholder="Enter birth_place"
          className={errors.birth_place ? "border-red-500 border dark:bg-zinc-900 py-1 px-3 rounded-sm" : "border dark:bg-zinc-900 py-1 px-3 rounded-sm"}
          disabled={loading}
        />
        {errors.birth_place && (
          <span className="text-xs text-red-500">{errors.birth_place}</span>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="birth_date">
          <span className="text-red-500 mr-[-0.3rem]">*</span>
          <CalendarDays className="text-violet-500 h-3 w-3" />
          Birth Date
        </Label>
        <Input
          id="birth_date"
          name="birth_date"
          type="date"
          value={formData.birth_date}
          onChange={handleChange}
          placeholder="YYYY-MM-DD"
          disabled={loading}
        />
        {errors.birth_date && (
          <span className="text-xs text-red-500">{errors.birth_date}</span>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="student_status">
          <span className="text-red-500 mr-[-0.3rem]">*</span>Status
        </Label>
        <select
          id="student_status"
          name="student_status"
          value={formData.student_status}
          onChange={handleChange}
          className={
            errors.student_status
              ? "border-red-500 border dark:bg-zinc-900 py-1 px-3 rounded-sm"
              : "border dark:bg-zinc-900 py-1 px-3 rounded-sm"
          }
          disabled={loading}
        >
          <option value="">Select Status</option>
          {studentStatusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        {errors.student_status && (
          <span className="text-xs text-red-500">{errors.student_status}</span>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="last_school_attend">
          <span className="text-red-500 mr-[-0.3rem]">*</span>
          <School className="text-blue-500 h-3 w-3" />
          Last School Attended
        </Label>
        <Input
          id="last_school_attend"
          name="last_school_attend"
          value={formData.last_school_attend}
          onChange={handleChange}
          placeholder="Enter Last School Attended"
          className={errors.last_school_attend ? "border-red-500 border dark:bg-zinc-900 py-1 px-3 rounded-sm" : "border dark:bg-zinc-900 py-1 px-3 rounded-sm"}
          disabled={loading}
        />
        {errors.last_school_attend && (
          <span className="text-xs text-red-500">
            {errors.last_school_attend}
          </span>
        )}
      </div>
    </div>
  );
}
