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
} from "lucide-react";

export default function BasicInfo({ data }: { data: any }) {
  return (
    <div className="w-full py-5 flex flex-col gap-4 px-5 mt-5 rounded-md bg-zinc-100 dark:bg-zinc-900">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SectionHeader icon={<ShieldUser className="text-blue-500 h-5 w-5" />} title="Primary Information" />
        <InputField label="LRN" value={data.lrn} icon={<ShieldUser className="text-blue-500 h-4 w-4" />} />
        <InputField label="School Year" value={data.school_year} icon={<Calendar className="text-teal-500 h-4 w-4" />} />
        {data.grade === "1" ? (
          <InputField label="Grade" value="Grade One" icon={<GraduationCap className="text-teal-500 h-4 w-4" />} />
        ) : data.grade === "2" ? (
          <InputField label="Grade" value="Grade Two" icon={<GraduationCap className="text-teal-500 h-4 w-4" />} />
        ) : data.grade === "3" ? (
          <InputField label="Grade" value="Grade Three" icon={<GraduationCap className="text-teal-500 h-4 w-4" />} />
        ) : data.grade === "4" ? (
          <InputField label="Grade" value="Grade Four" icon={<GraduationCap className="text-teal-500 h-4 w-4" />} />
        ) : data.grade === "5" ? (
          <InputField label="Grade" value="Grade Five" icon={<GraduationCap className="text-teal-500 h-4 w-4" />} />
        ) : data.grade === "6" ? (
          <InputField label="Grade" value="Grade Six" icon={<GraduationCap className="text-teal-500 h-4 w-4" />} />
        ) : (
          <InputField label="Grade" value={data.grade_id} icon={<GraduationCap className="text-teal-500 h-4 w-4" />} />
        )}
        <InputField label="Section" value={data.section} icon={<Book className="text-teal-500 h-4 w-4" />} />

        <SectionHeader icon={<UserLock className="text-yellow-500 h-5 w-5" />} title="Basic Information" />
        <InputField label="First Name" value={data.first_name} icon={<User className="text-green-500 h-4 w-4" />} />
        <InputField label="Middle Name" value={data.middle_name} icon={<User className="text-green-500 h-4 w-4" />} />
        <InputField label="Last Name" value={data.last_name} icon={<User className="text-green-500 h-4 w-4" />} />
        <InputField label="Suffix" value={data.suffix} icon={<User className="text-green-500 h-4 w-4" />} />
        <InputField label="Birth Date" value={data.birth_date} icon={<CalendarDays className="text-indigo-500 h-4 w-4" />} />
        <InputField label="Birth Place" value={data.birth_place} icon={<MapPinHouse className="text-red-500 h-4 w-4" />} />
        <InputField label="Gender" value={data.gender} icon={<CircleSmall className="text-teal-500 h-4 w-4" />} />
        <InputField label="Last School Attended" value={data.last_school_attend} icon={<School className="text-green-500 h-4 w-4" />} />
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
