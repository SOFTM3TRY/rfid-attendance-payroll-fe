"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Map, MapPinHouse } from "lucide-react";

interface ViewAddressInfoProps {
  TeacherData: any;
}

export default function ViewAddressInfo({ TeacherData }: ViewAddressInfoProps) {
  const teacher = TeacherData;
  const address = teacher?.additional_info || {};

  return (
    <div className="w-full py-5 flex flex-col gap-10 mt-10 rounded-md bg-zinc-100 dark:bg-zinc-900">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Header */}
        <div className="col-span-1 md:col-span-4 mb-3">
          <p className="text-sm font-medium flex items-center gap-1 bg-zinc-200 dark:bg-zinc-800 py-2 px-3 rounded-sm w-56">
            <Map className="text-red-500 h-5 w-5" /> Address Information
          </p>
        </div>

        {/* Address Fields */}
        <InputField label="Region" value={address.region} />
        <InputField label="Province" value={address.province} />
        <InputField label="City" value={address.city} />
        <InputField label="Barangay" value={address.barangay} />
        <InputField label="Street" value={address.street} full />
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
  value?: string;
  full?: boolean;
}) {
  return (
    <div className={`${full ? "col-span-1 md:col-span-4" : ""}`}>
      <Label className="flex items-center gap-1">
        <MapPinHouse className="w-4 h-4 text-red-500" />
        {label}
      </Label>
      <Input value={value || ""} disabled className="dark:bg-zinc-900" />
    </div>
  );
}
