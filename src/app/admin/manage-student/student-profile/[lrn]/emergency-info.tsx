import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { User, Phone } from "lucide-react";

export default function EmergencyInfo({ student }: { student: any }) {
  return (
    <div className="w-full py-5 flex flex-col gap-4 px-5 mt-5 rounded-md bg-zinc-100 dark:bg-zinc-900">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SectionHeader
          icon={<User className="text-teal-500 size-4" />}
          title="Guardian Information"
        />

        <InputField
          label="Guardian First Name"
          value={student?.additional_info?.guardian_first_name}
        />
        <InputField
          label="Guardian Middle Name"
          value={student?.additional_info?.guardian_middle_name}
        />
        <InputField
          label="Guardian Last Name"
          value={student?.additional_info?.guardian_last_name}
        />
        <InputField
          label="Guardian Suffix Name"
          value={student?.additional_info?.guardian_suffix}
        />
        <InputField
          label="Guardian Contact"
          value={student?.additional_info?.guardian_contact}
          icon={<Phone className="size-3 text-muted-foreground" />}
        />
        <InputField
          label="Guardian Occupation"
          value={student?.additional_info?.guardian_occupation}
        />
        <InputField
          label="Guardian Email"
          value={student?.additional_info?.guardian_email}
        />
        <InputField
          label="Guardian Relationship"
          value={student?.additional_info?.relationship}
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
