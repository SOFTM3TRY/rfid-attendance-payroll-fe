import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useClientOnly } from "@/hooks/useClientOnly";

import {
  ShieldUser,
  Calendar,
  GraduationCap,
  Book,
  User,
  UserLock,
  CalendarDays,
  MapPinHouse,
  CircleSmall,
  Phone,
  Mail,
} from "lucide-react";

export default function BasicInfo({ student }: { student: any }) {
  return (
    <div className="w-full py-5 flex flex-col gap-4 px-5 rounded-xl bg-zinc-100 dark:bg-zinc-900">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SectionHeader
          icon={<ShieldUser className="text-blue-500 size-4" />}
          title="Primary Information"
        />
        <InputField
          label="LRN"
          value={student?.lrn || ""}
          icon={<ShieldUser className="size-3 text-muted-foreground" />}
        />
        <InputField
          label="School Year"
          value={student?.school_year || ""}
          icon={<Calendar className="size-3 text-muted-foreground" />}
        />

        <InputField
          label="Grade"
          value={student?.grade?.grade_level || ""}
          icon={<GraduationCap className="size-3 text-muted-foreground" />}
        />

        <InputField
          label="Section"
          value={student?.section?.section_name || ""}
          icon={<Book className="size-3 text-muted-foreground" />}
        />

        <InputField
          label="Email"
          value={student?.email || ""}
          title={student?.email || ""}
          icon={<Mail className="size-3 text-muted-foreground" />}
        />

        <SectionHeader
          icon={<UserLock className="text-yellow-500 size-4" />}
          title="Basic Information"
        />
        <InputField
          label="First Name"
          value={student?.first_name || ""}
          icon={<User className="size-3 text-muted-foreground" />}
        />
        <InputField
          label="Middle Name"
          value={student?.middle_name || ""}
          icon={<User className="size-3 text-muted-foreground" />}
        />
        <InputField
          label="Last Name"
          value={student?.last_name || ""}
          icon={<User className="size-3 text-muted-foreground" />}
        />
        <InputField
          label="Suffix"
          value={student?.suffix || ""}
          icon={<User className="size-3 text-muted-foreground" />}
        />
        <InputField
          label="Birth Date"
          value={student?.birth_date || ""}
          icon={<CalendarDays className="size-3 text-muted-foreground" />}
          type="date"
        />
        <InputField
          label="Birth Place"
          value={student?.birth_place || ""}
          icon={<MapPinHouse className="size-3 text-muted-foreground" />}
        />
        <InputField
          label="Gender"
          value={student?.gender || ""}
          icon={<CircleSmall className="size-3 text-muted-foreground" />}
        />
      </div>
    </div>
  );
}

function InputField({
  label,
  value,
  title,
  type,
  icon,
}: {
  label: string;
  value: string;
  title?: string;
  type?: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="mt-2 gap-2">
      <Label className="flex items-center gap-1 mb-2">
        {icon} {label}
      </Label>
      <Input value={value || ""} disabled title={title || ""} type={type} />
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
    <div className="col-span-1 md:col-span-4 my-3">
      <p className="text-sm font-bold flex items-center gap-1">
        {icon} {title}
      </p>
    </div>
  );
}
