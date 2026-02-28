"use client";

// GuardianInfo.tsx
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Phone, Mail, SquareUserRound, UserCog } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { useGetStudentDetailsByLrn } from "@/hooks/useStudentDetails";

export default function GuardianInfo({ lrn }: { lrn: string }) {
  const { token } = useAuth();
  const { data, isLoading, isError } = useGetStudentDetailsByLrn(token, lrn);

  if (isLoading) return <div className="px-5 py-5 text-sm">Loading...</div>;
  if (isError) return <div className="px-5 py-5 text-sm">Error loading guardian info</div>;

  const student = data?.data?.student;
  const info = student?.additional_info || {};

  return (
    <div className="w-full py-5 flex flex-col gap-4 px-5 mt-5 rounded-md bg-accent/10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SectionHeader
          icon={<User className="text-teal-500 size-3" />}
          title="Guardian Information"
        />

        <InputField label="Guardian First Name" value={info.guardian_first_name} />
        <InputField label="Guardian Middle Name" value={info.guardian_middle_name} />
        <InputField label="Guardian Last Name" value={info.guardian_last_name} />
        <InputField label="Guardian Suffix" value={info.guardian_suffix} />
        <InputField
          label="Guardian Contact"
          value={info.guardian_contact}
          icon={<Phone className="text-blue-500 h-4 w-4" />}
        />
        <InputField
          label="Guardian Email"
          value={info.guardian_email}
          icon={<Mail className="text-yellow-500 h-4 w-4" />}
        />
        <InputField
          label="Guardian Occupation"
          value={info.guardian_occupation}
          icon={<SquareUserRound className="text-teal-500 h-4 w-4" />}
        />
        <InputField
          label="Relationship"
          value={info.relationship}
          icon={<UserCog className="text-green-500 h-4 w-4" />}
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
  icon?: React.ReactNode;
}) {
  return (
    <div className="mt-2">
      <Label className="flex items-center gap-1">
        {icon || <User className="text-green-500 h-4 w-4" />}
        {label}
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
