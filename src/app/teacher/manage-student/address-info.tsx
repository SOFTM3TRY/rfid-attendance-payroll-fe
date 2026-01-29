import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useParams } from "next/navigation";
import { useClientOnly } from "@/hooks/useClientOnly";

import { Map, MapPinHouse } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { useTeacherDetails } from "@/hooks/useTeacher";

export default function AddressInfo({ id }: { id: string }) {

  const { token } = useAuth();
  const isClient = useClientOnly();

  const { data: teacherDetails,  } =
    useTeacherDetails(token, { id });

  const teacher = teacherDetails?.data?.teacher?.[0] || null;
  const additional_info = teacher?.additional_info || {};

  return (
    <div className="w-full py-5 flex flex-col gap-4 px-5 mt-5 rounded-md bg-zinc-100 dark:bg-zinc-900">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SectionHeader icon={<Map className="text-red-500 h-5 w-5" />} title="Address" />

        <InputField label="Region" value={additional_info.region} />
        <InputField label="Province" value={additional_info.province} />
        <InputField label="City" value={additional_info.city} />
        <InputField label="Barangay" value={additional_info.barangay} />
        <InputField label="Street" value={additional_info.street} full />
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
      <Label className="flex items-center gap-1">
        <MapPinHouse className="w-4 h-4 text-red-500" />
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
      <p className="text-xs font-medium flex items-center gap-1">
        {icon} {title}
      </p>
    </div>
  );
}

