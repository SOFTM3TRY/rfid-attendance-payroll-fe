import { useEffect, useState } from "react";
import { fetchRegions, fetchCities, fetchBarangays } from "@/lib/psgc";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const METRO_MANILA = "Metro Manila";

export default function AddressDropdowns({
  formData,
  setFormData,
  errors,
  setErrors,
  loading,
}: any) {
  const [regions, setRegions] = useState<any[]>([]);
  const [provinces, setProvinces] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [barangays, setBarangays] = useState<any[]>([]);

  // ✅ Load NCR only
  useEffect(() => {
    (async () => {
      const allRegions = await fetchRegions();

      const ncr = allRegions.find((r: any) => {
        const name = (r?.name || "").toLowerCase();
        return name.includes("national capital region") || name === "ncr";
      });

      if (!ncr) return;

      // Only NCR available
      setRegions([ncr]);

      // Province fixed option (Metro Manila)
      setProvinces([{ code: "NCR", name: METRO_MANILA }]);

      // Auto set NCR + Metro Manila
      setFormData((p: any) => ({
        ...p,
        region: ncr.name,
        province: METRO_MANILA,
        city: "",
        barangay: "",
      }));

      // Load NCR cities
      fetchCities(ncr.code).then(setCities);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------------- CITY ---------------- */
  useEffect(() => {
    if (!formData.city) return;

    const cityCode = getCodeByName(cities, formData.city);
    fetchBarangays(cityCode).then(setBarangays);

    setFormData((p: any) => ({ ...p, barangay: "" }));
  }, [formData.city]);

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }));
    setErrors((prev: any) => {
      const n = { ...prev };
      delete n[name];
      return n;
    });
  };

  const renderSelect = (
    label: string,
    name: string,
    options: any[],
    value: string,
    placeholder: string,
    disabled: boolean
  ) => (
    <div className="grid gap-2">
      <Label>
        <span className="text-red-500 mr-[-0.3rem]">*</span>
        {label}
      </Label>

      <Select
        value={value || ""}
        onValueChange={(val) => handleSelectChange(name, val)}
        disabled={disabled || loading}
      >
        <SelectTrigger
          className={`border w-72 ${
            errors[name] ? "border-red-500" : ""
          } py-1 px-3 rounded-sm`}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          {options.map((opt: any) => (
            <SelectItem key={opt.code} value={opt.name}>
              {opt.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {errors[name] && (
        <span className="text-xs text-red-500">{errors[name]}</span>
      )}
    </div>
  );

  return (
    <>
      {/* ✅ Region dropdown clickable but NCR only */}
      {renderSelect(
        "Region",
        "region",
        regions,
        formData.region,
        "Select Region",
        false
      )}

      {/* ✅ Province dropdown clickable but Metro Manila only */}
      {renderSelect(
        "Province",
        "province",
        provinces,
        formData.province,
        "Select Province",
        false
      )}

      {/* City */}
      {renderSelect(
        "City / Municipality",
        "city",
        cities,
        formData.city,
        "Select City / Municipality",
        false
      )}

      {/* Barangay */}
      {renderSelect(
        "Barangay",
        "barangay",
        barangays,
        formData.barangay,
        "Select Barangay",
        !formData.city
      )}
    </>
  );
}

/* ---------- HELPER ---------- */
function getCodeByName(list: any[], name: string) {
  return list.find((i) => i.name === name)?.code || "";
}
