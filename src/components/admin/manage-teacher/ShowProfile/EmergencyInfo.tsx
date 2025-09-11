// GuardianInfo.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  User,
  Phone,
  Mail,
  SquareUserRound,
  UserCog,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { useTeacherDetails } from "@/hooks/useTeacher";

export default function GuardianInfo({
  id,
}: {
  id: string;
}) {
  const { token } = useAuth();
  const { data, isLoading, error } = useTeacherDetails(token, { id });

  const teacher = data?.data?.teacher?.[0] || null;
  const info = teacher?.additional_info || {};

  return (
    <div className="w-full py-5 flex flex-col gap-4 px-5 mt-5 rounded-md bg-zinc-100 dark:bg-zinc-900">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SectionHeader icon={<User className="text-teal-500 h-5 w-5" />} title="Guardian Information" />

        <InputField label="Guardian First Name" value={info.emergency_fname} />
        <InputField label="Guardian Middle Name" value={info.emergency_mname} />
        <InputField label="Guardian Last Name" value={info.emergency_lname} />
        <InputField label="Guardian Contact" value={info.emergency_contact} icon={<Phone className="text-blue-500 h-4 w-4" />} />

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
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="mt-2">
      <Label className="flex items-center gap-1">
        {icon || <User className="text-green-500 h-4 w-4" />}
        {label}
      </Label>
      <Input value={value || ""} disabled />
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