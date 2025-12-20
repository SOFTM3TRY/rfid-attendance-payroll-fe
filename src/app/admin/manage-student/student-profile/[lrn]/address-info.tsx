import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Map, MapPinHouse } from "lucide-react";


export default function AddressInfo({ student }: { student: any }) {

  return (
    <div className="w-full py-5 flex flex-col gap-4 px-5 mt-5 rounded-md bg-zinc-100 dark:bg-zinc-900">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SectionHeader icon={<Map className="text-red-500 size-4" />} title="Address" />

        <InputField label="Region" value={student?.additional_info.region} />
        <InputField label="Province" value={student?.additional_info.province} />
        <InputField label="City" value={student?.additional_info.city} />
        <InputField label="Barangay" value={student?.additional_info.barangay} />
        <InputField label="Street" value={student?.additional_info.street} full />
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

