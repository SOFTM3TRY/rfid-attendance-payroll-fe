import { useEffect, useState } from "react";
import { fetchRegions, fetchProvinces, fetchCities, fetchBarangays } from "@/lib/psgc";
import { Label } from "@/components/ui/label";

export default function AddressDropdowns({ formData, setFormData, errors, setErrors, loading }: any) {
  const [regions, setRegions] = useState<any[]>([]);
  const [provinces, setProvinces] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [barangays, setBarangays] = useState<any[]>([]);

  // Fetch regions on mount
  useEffect(() => {
    fetchRegions().then(setRegions).catch(console.error);
  }, []);

  // Fetch provinces and cities when region changes
  useEffect(() => {
    const code = formData.region;
    if (code === "130000000") {
      setProvinces([{ code: "Metro Manila", name: "Metro Manila" }]);
      fetchCities(code).then(setCities).catch(console.error);
    } else if (code) {
      fetchProvinces(code).then(setProvinces).catch(console.error);
      fetchCities(code).then(setCities).catch(console.error);
    } else {
      setProvinces([]);
      setCities([]);
      setBarangays([]);
    }
    setFormData((prev: any) => ({ ...prev, province: "", city: "", barangay: "" }));
  }, [formData.region]);

  // Fetch cities when province changes (except NCR)
  useEffect(() => {
    const code = formData.province;
    if (formData.region !== "130000000" && code) {
      fetchCities(code).then(setCities).catch(console.error);
    }
    setFormData((prev: any) => ({ ...prev, city: "", barangay: "" }));
  }, [formData.province]);

  // Fetch barangays when city changes
  useEffect(() => {
    const code = formData.city;
    if (code) {
      fetchBarangays(code).then(setBarangays).catch(console.error);
    } else {
      setBarangays([]);
    }
    setFormData((prev: any) => ({ ...prev, barangay: "" }));
  }, [formData.city]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
    setErrors((prev: any) => { const n = { ...prev }; delete n[name]; return n; });
  };

  const getValueName = (options: any[], value: string) => {
    const option = options.find((o: any) => o.code === value);
    return option ? option.name : "";
  };

  return (
    <>
      <div className="grid gap-2">
        <Label htmlFor="region"><span className="text-red-500 mr-[-0.3rem]">*</span>Region</Label>
        <select id="region" name="region" value={formData.region || ""} onChange={handleChange} className={errors.region ? "border-red-500 border dark:bg-zinc-900 py-1 px-3 rounded-sm" : "border dark:bg-zinc-900 py-1 px-3 rounded-sm"} disabled={loading}>
          <option value="">Select Region</option>
          {regions.map((r: any) => <option key={r.code} value={r.code}>{r.name}</option>)}
        </select>
        {errors.region && <span className="text-sm text-red-500">{errors.region}</span>}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="province"><span className="text-red-500 mr-[-0.3rem]">*</span>Province</Label>
        <select id="province" name="province" value={formData.province || ""} onChange={handleChange} className={errors.province ? "border-red-500 border dark:bg-zinc-900 py-1 px-3 rounded-sm" : "border dark:bg-zinc-900 py-1 px-3 rounded-sm"} disabled={loading || !formData.region}>
          <option value="">Select Province</option>
          {provinces.map((p: any) => <option key={p.code} value={p.code}>{p.name}</option>)}
        </select>
        {errors.province && <span className="text-sm text-red-500">{errors.province}</span>}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="city"><span className="text-red-500 mr-[-0.3rem]">*</span>City/Municipality</Label>
        <select id="city" name="city" value={formData.city || ""} onChange={handleChange} className={errors.city ? "border-red-500 border dark:bg-zinc-900 py-1 px-3 rounded-sm" : "border dark:bg-zinc-900 py-1 px-3 rounded-sm"} disabled={loading || !formData.province}>
          <option value="">Select City/Municipality</option>
          {cities.map((c: any) => <option key={c.code} value={c.code}>{c.name}</option>)}
        </select>
        {errors.city && <span className="text-sm text-red-500">{errors.city}</span>}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="barangay"><span className="text-red-500 mr-[-0.3rem]">*</span>Barangay</Label>
        <select id="barangay" name="barangay" value={formData.barangay || ""} onChange={handleChange} className={errors.barangay ? "border-red-500 border dark:bg-zinc-900 py-1 px-3 rounded-sm" : "border dark:bg-zinc-900 py-1 px-3 rounded-sm"} disabled={loading || !formData.city}>
          <option value="">Select Barangay</option>
          {barangays.map((b: any) => <option key={b.code} value={b.code}>{b.name}</option>)}
        </select>
        {errors.barangay && <span className="text-sm text-red-500">{errors.barangay}</span>}
      </div>
    </>
  );
}

