// BasicInfo.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  School,
  Phone,
  Mail,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { useTeacherDetails } from "@/hooks/useTeacher";

export default function PrimaryInfo({
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
        <SectionHeader icon={<ShieldUser className="text-blue-500 h-5 w-5" />} title="Primary Information" />
        <InputField label="Employee Number" value={teacher.employee_no} icon={<ShieldUser className="text-blue-500 h-4 w-4" />} />
        <InputField label="School Year" value={teacher.school_year} icon={<Calendar className="text-teal-500 h-4 w-4" />} />
        {info.grade === "1" ? (
          <InputField label="Grade" value="Grade One" icon={<GraduationCap className="text-teal-500 h-4 w-4" />} />
        ) : info.grade === "2" ? (
          <InputField label="Grade" value="Grade Two" icon={<GraduationCap className="text-teal-500 h-4 w-4" />} />
        ) : info.grade === "3" ? (
          <InputField label="Grade" value="Grade Three" icon={<GraduationCap className="text-teal-500 h-4 w-4" />} />
        ) : info.grade === "4" ? (
          <InputField label="Grade" value="Grade Four" icon={<GraduationCap className="text-teal-500 h-4 w-4" />} />
        ) : info.grade === "5" ? (
          <InputField label="Grade" value="Grade Five" icon={<GraduationCap className="text-teal-500 h-4 w-4" />} />
        ) : info.grade === "6" ? (
          <InputField label="Grade" value="Grade Six" icon={<GraduationCap className="text-teal-500 h-4 w-4" />} />
        ) : (
          <InputField label="Grade" value={info.grade} icon={<GraduationCap className="text-teal-500 h-4 w-4" />} />
        )}
        <InputField label="Section" value={info.section} icon={<Book className="text-teal-500 h-4 w-4" />} />

        <SectionHeader icon={<UserLock className="text-yellow-500 h-5 w-5" />} title="Basic Information" />
        <InputField label="First Name" value={teacher.first_name} icon={<User className="text-green-500 h-4 w-4" />} />
        <InputField label="Middle Name" value={teacher.middle_name} icon={<User className="text-green-500 h-4 w-4" />} />
        <InputField label="Last Name" value={teacher.last_name} icon={<User className="text-green-500 h-4 w-4" />} />
        <InputField label="Suffix" value={teacher.suffix} icon={<User className="text-green-500 h-4 w-4" />} />
        <InputField label="Birth Date" value={info.birth_date} icon={<CalendarDays className="text-indigo-500 h-4 w-4" />} />
        <InputField label="Birth Place" value={info.birth_place} icon={<MapPinHouse className="text-red-500 h-4 w-4" />} />
        <InputField label="Gender" value={info.gender} icon={<CircleSmall className="text-teal-500 h-4 w-4" />} />
        <InputField label="Contact No." value={teacher.contact_no} icon={<Phone className="text-teal-500 h-4 w-4" />} />
        <InputField label="Email" value={teacher.email} icon={<Mail className="text-teal-500 h-4 w-4" />} />
      </div>
    </div>
  );
}

function InputField({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="mt-2">
      <Label className="flex items-center gap-1">{icon} {label}</Label>
      <Input value={value || ""} disabled />
    </div>
  );
}

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="col-span-1 md:col-span-2 mb-3">
      <p className="text-sm font-medium flex items-center gap-1">{icon} {title}</p>
    </div>
  );
}
