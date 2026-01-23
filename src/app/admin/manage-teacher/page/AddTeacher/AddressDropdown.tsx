import { useEffect, useState } from "react";
import {
  fetchRegions,
  fetchProvinces,
  fetchCities,
  fetchBarangays,
} from "@/lib/psgc";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const NCR_CODE = "130000000";
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

  useEffect(() => {
    fetchRegions().then(setRegions);
  }, []);

  /* ---------------- REGION ---------------- */
  useEffect(() => {
    if (!formData.region) return;

    const regionCode = getCodeByName(regions, formData.region);

    if (regionCode === NCR_CODE) {
      // ✅ NCR FIX
      setProvinces([{ code: "NCR", name: METRO_MANILA }]);
      setFormData((p: any) => ({
        ...p,
        province: METRO_MANILA,
        city: "",
        barangay: "",
      }));
      fetchCities(regionCode).then(setCities);
    } else {
      fetchProvinces(regionCode).then(setProvinces);
      setCities([]);
      setBarangays([]);
      setFormData((p: any) => ({
        ...p,
        province: "",
        city: "",
        barangay: "",
      }));
    }
  }, [formData.region]);

  /* ---------------- PROVINCE ---------------- */
  useEffect(() => {
    if (!formData.province) return;
    if (formData.region === "NCR") return;

    const provinceCode = getCodeByName(provinces, formData.province);
    fetchCities(provinceCode).then(setCities);

    setBarangays([]);
    setFormData((p: any) => ({ ...p, city: "", barangay: "" }));
  }, [formData.province]);

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
        required={true}
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
      {renderSelect("Region", "region", regions, formData.region, "Select Region", false)}

      {renderSelect(
        "Province",
        "province",
        provinces,
        formData.province,
        "Select Province",
        !formData.region || formData.region === "NCR"
      )}

      {renderSelect(
        "City / Municipality",
        "city",
        cities,
        formData.city,
        "Select City / Municipality",
        !formData.province && formData.region !== "NCR"
      )}

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
