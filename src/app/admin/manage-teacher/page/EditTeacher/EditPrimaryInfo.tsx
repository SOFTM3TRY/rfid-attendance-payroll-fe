"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserLock, CalendarDays, UserRound } from "lucide-react";
import { useForm } from "react-hook-form";

interface ViewBasicInfoProps {
  TeacherData: any; // The teacher object from EditTeacher
}

export default function ViewBasicInfo({ TeacherData }: ViewBasicInfoProps) {
  const teacher = TeacherData;

  const { register } = useForm({
    defaultValues: {
      first_name: teacher?.first_name || "",
      middle_name: teacher?.middle_name || "",
      last_name: teacher?.last_name || "",
      suffix: teacher?.suffix || "",
      gender: teacher?.additional_info?.gender || "",
      birth_date: teacher?.additional_info?.birth_date || "",
      birth_place: teacher?.additional_info?.birth_place || "",
      status: teacher?.status || "",
    },
  });

  const suffixOptions = ["Jr.", "Sr.", "I", "II", "III", "IV", "V"];
  const genderOptions = ["Male", "Female", "Other"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mt-10">
      <div className="col-span-1 md:col-span-4">
        <h1 className="text-sm font-medium flex items-center bg-zinc-200 dark:bg-zinc-800 py-2 px-3 rounded-sm w-56">
          <UserLock className="text-green-500 h-5 w-5 mr-1" />
          Basic Information
        </h1>
      </div>

      {/* First Name */}
      <div className="grid gap-2">
        <Label htmlFor="first_name">
          <UserRound className="text-green-500 h-3 w-3 inline" /> First Name
        </Label>
        <Input
          {...register("first_name")}
          className="dark:bg-zinc-900 py-1 px-3 rounded-sm"
        />
      </div>

      {/* Middle Name */}
      <div className="grid gap-2">
        <Label htmlFor="middle_name">
          <UserRound className="text-green-500 h-3 w-3 inline" /> Middle Name
        </Label>
        <Input
          {...register("middle_name")}
          className="dark:bg-zinc-900 py-1 px-3 rounded-sm"
        />
      </div>

      {/* Last Name */}
      <div className="grid gap-2">
        <Label htmlFor="last_name">
          <UserRound className="text-green-500 h-3 w-3 inline" /> Last Name
        </Label>
        <Input
          {...register("last_name")}
          className="dark:bg-zinc-900 py-1 px-3 rounded-sm"
        />
      </div>

      {/* Suffix */}
      <div className="grid gap-2">
        <Label htmlFor="suffix">
          <UserRound className="text-green-500 h-3 w-3 inline" /> Suffix
        </Label>
        <select
          {...register("suffix")}
          className="border dark:bg-zinc-900 py-1 px-3 rounded-sm"
        >
          <option value="">Select Suffix</option>
          {suffixOptions.map((suffix) => (
            <option key={suffix} value={suffix}>
              {suffix}
            </option>
          ))}
        </select>
      </div>

      {/* Gender */}
      <div className="grid gap-2">
        <Label htmlFor="gender">Gender</Label>
        <select
          {...register("gender")}
          className="border dark:bg-zinc-900 py-1 px-3 rounded-sm"
        >
          <option value="">Select Gender</option>
          {genderOptions.map((gender) => (
            <option key={gender} value={gender}>
              {gender}
            </option>
          ))}
        </select>
      </div>

      {/* Birth Place */}
      <div className="grid gap-2">
        <Label htmlFor="birth_place">Birth Place</Label>
        <Input
          {...register("birth_place")}
          className="dark:bg-zinc-900 py-1 px-3 rounded-sm"
        />
      </div>

      {/* Birth Date */}
      <div className="grid gap-2">
        <Label htmlFor="birth_date">
          <CalendarDays className="text-violet-500 h-3 w-3 inline" /> Birth Date
        </Label>
        <Input
          {...register("birth_date")}
          type="date"
          className="dark:bg-zinc-900 py-1 px-3 rounded-sm"
        />
      </div>

      {/* Status */}
      <div className="grid gap-2">
        <Label htmlFor="status">Status</Label>
        <select
          {...register("status")}
          className="border dark:bg-zinc-900 py-1 px-3 rounded-sm"
        >
          <option value="">Select Status</option>
          <option value={1}>Active</option>
          <option value={0}>Inactive</option>
        </select>
      </div>
    </div>
  );
}
