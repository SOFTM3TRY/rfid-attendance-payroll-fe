import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useParams } from "next/navigation";
import { useClientOnly } from "@/hooks/useClientOnly";

import {
  User,
  Phone,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { useTeacherDetails } from "@/hooks/useTeacher";

export default function EmergencyInfo({ id }: { id: string }) {

  const { token } = useAuth();
  const isClient = useClientOnly();

  const { data: teacherDetails,  } =
    useTeacherDetails(token, { id });

  const teacher = teacherDetails?.data?.teacher?.[0] || null;
  const additional_info = teacher?.additional_info || {};

  return (
    <div className="w-full py-5 flex flex-col gap-4 px-5 mt-5 rounded-md bg-accent/20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SectionHeader icon={<User className="text-teal-500 size-4" />} title="Guardian Information" />

        <InputField label="Guardian First Name" value={additional_info.emergency_fname} />
        <InputField label="Guardian Middle Name" value={additional_info.emergency_mname} />
        <InputField label="Guardian Last Name" value={additional_info.emergency_lname} />
        <InputField label="Guardian Contact" value={additional_info.emergency_contact} icon={<Phone className="size-3 text-muted-foreground" />} />

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
      <Label className="flex items-center gap-1 mb-2">
        {icon || <User className="size-3 text-muted-foreground" />}
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
      <p className="text-sm font-bold flex items-center gap-1">
        {icon} {title}
      </p>
    </div>
  );
}