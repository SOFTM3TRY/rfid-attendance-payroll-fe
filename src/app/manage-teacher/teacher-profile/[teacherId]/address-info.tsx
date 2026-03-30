import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Map, MapPinHouse } from "lucide-react";
import type { AdditionalInfo, TeacherData } from "@/types/Teacher";

export default function AddressInfo({ teacher }: { teacher: TeacherData }) {
  const additionalInfo: Partial<AdditionalInfo> = teacher.additional_info ?? {};

  return (
    <div className="w-full py-5 flex flex-col gap-4 px-5 mt-5 rounded-md bg-accent/20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SectionHeader icon={<Map className="text-red-500 size-4" />} title="Address" />

        <InputField label="Region" value={additionalInfo.region || ""} />
        <InputField label="Province" value={additionalInfo.province || ""} />
        <InputField label="City" value={additionalInfo.city || ""} />
        <InputField label="Barangay" value={additionalInfo.barangay || ""} />
        <InputField label="Street" value={additionalInfo.street || ""} full />
      </div>
    </div>
  );
}

function InputField({
  label,
  value,
  full = false,
}: {
  label: string;
  value: string;
  full?: boolean;
}) {
  return (
    <div className={`${full ? "col-span-1 md:col-span-2" : ""}`}>
      <Label className="flex items-center gap-1 mb-2">
        <MapPinHouse className="size-3 text-muted-foreground" />
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

