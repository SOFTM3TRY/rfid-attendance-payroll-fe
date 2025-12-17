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

import { useAuth } from "@/context/AuthContext";
import { useTeacherDetails } from "@/hooks/useTeacher";

export default function BasicInfo({ id }: { id: string }) {
  const { token } = useAuth();
  const isClient = useClientOnly();

  const { data: teacherDetails } = useTeacherDetails(token, { id });

  const teacher = teacherDetails?.data?.teacher?.[0] || null;
  const additional_info = teacher?.additional_info || {};

  return (
    <div className="w-full py-5 flex flex-col gap-4 px-5 rounded-xl bg-zinc-100 dark:bg-zinc-900">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SectionHeader
          icon={<ShieldUser className="text-blue-500 size-4" />}
          title="Primary Information"
        />
        <InputField
          label="Employee Number"
          value={teacher?.employee_no || ""}
          icon={<ShieldUser className="size-3 text-muted-foreground" />}
        />
        <InputField
          label="School Year"
          value={teacher?.additional_info?.school_year || ""}
          icon={<Calendar className="size-3 text-muted-foreground" />}
        />

        <InputField
          label="Grade"
          value={teacher?.grade?.grade_level || ""}
          icon={<GraduationCap className="size-3 text-muted-foreground" />}
        />

        <InputField
          label="Section"
          value={teacher?.section?.section_name || ""}
          icon={<Book className="size-3 text-muted-foreground" />}
        />

        <SectionHeader
          icon={<UserLock className="text-yellow-500 size-4" />}
          title="Basic Information"
        />
        <InputField
          label="First Name"
          value={teacher?.first_name || ""}
          icon={<User className="size-3 text-muted-foreground" />}
        />
        <InputField
          label="Middle Name"
          value={teacher?.middle_name || ""}
          icon={<User className="size-3 text-muted-foreground" />}
        />
        <InputField
          label="Last Name"
          value={teacher?.last_name || ""}
          icon={<User className="size-3 text-muted-foreground" />}
        />
        <InputField
          label="Suffix"
          value={teacher?.suffix || ""}
          icon={<User className="size-3 text-muted-foreground" />}
        />
        <InputField
          label="Birth Date"
          value={additional_info.birth_date || ""}
          icon={<CalendarDays className="size-3 text-muted-foreground" />}
        />
        <InputField
          label="Birth Place"
          value={additional_info.birth_place || ""}
          icon={<MapPinHouse className="size-3 text-muted-foreground" />}
        />
        <InputField
          label="Gender"
          value={additional_info.gender || ""}
          icon={<CircleSmall className="size-3 text-muted-foreground" />}
        />
        <InputField
          label="Contact No."
          value={teacher?.contact_no || ""}
          icon={<Phone className="size-3 text-muted-foreground" />}
        />
        <InputField
          label="Email"
          value={teacher?.email || ""}
          icon={<Mail className="size-3 text-muted-foreground" />}
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
  icon: React.ReactNode;
}) {
  return (
    <div className="mt-2 gap-2">
      <Label className="flex items-center gap-1 mb-2">
        {icon} {label}
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
    <div className="col-span-1 md:col-span-4 my-3">
      <p className="text-sm font-bold flex items-center gap-1">
        {icon} {title}
      </p>
    </div>
  );
}
