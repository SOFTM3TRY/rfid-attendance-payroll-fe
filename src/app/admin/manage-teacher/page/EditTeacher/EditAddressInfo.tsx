import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Map, MapPinHouse } from "lucide-react";

import AddressDropdowns from "@/components/admin/manage-student/AddStudent/AddressDropdown";

export default function EditAddressInfo({ data }: { data: any }) {
  const [formData, setFormData] = useState({
    region: data?.region || "",
    province: data?.province || "",
    city: data?.city || "",
    barangay: data?.barangay || "",
    street: data?.street || "",
  });

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  if (!data) return null;

  const handleStreetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, street: e.target.value });
  };

  return (
    <div className="w-full py-5 flex flex-col gap-10 mt-10 rounded-md bg-zinc-100 dark:bg-zinc-900">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <SectionHeader
          icon={<Map className="text-red-500 h-5 w-5" />}
          title="Address"
        />

        <InputField label="Region" value={data.region} />
        <InputField label="Province" value={data.province} />
        <InputField label="City" value={data.city} />
        <InputField label="Barangay" value={data.barangay} />
        <InputField label="Street" value={data.street} full />

        {/* Address Dropdowns for Region, Province, City, Barangay */}
        <div className="col-span-1 md:col-span-4 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-4">
            <Label className="flex items-center gap-1 bg-zinc-200 dark:bg-zinc-800 py-2 px-3 rounded-sm w-56">
              <MapPinHouse className="w-4 h-4 text-red-500" />Edit Address
            </Label>
          </div>

          <AddressDropdowns
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
            loading={loading}
          />
        </div>

        {/* Editable Street Field */}
        <div className="col-span-1 md:col-span-4">
          <Label htmlFor="street">
            <span className="text-red-500 mr-[-0.3rem]">*</span>Street
          </Label>
          <Input
            id="street"
            name="street"
            value={formData.street}
            onChange={handleStreetChange}
            className={
              errors.street
                ? "border-red-500 border dark:bg-zinc-900"
                : "dark:bg-zinc-900"
            }
          />
          {errors.street && (
            <span className="text-sm text-red-500">{errors.street}</span>
          )}
        </div>
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
    <div className={`${full ? "col-span-1 md:col-span-4" : ""}`}>
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
    <div className="col-span-1 md:col-span-4 mb-3">
      <p className="text-sm font-medium flex items-center gap-1 bg-zinc-200 dark:bg-zinc-800 py-2 px-3 rounded-sm w-56">
        {icon} {title}
      </p>
    </div>
  );
}
