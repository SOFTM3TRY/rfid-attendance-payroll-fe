import { useEffect, useState } from "react";
import {
  fetchBarangays,
  fetchCities,
  fetchProvinces,
  fetchRegions,
  type LocationOption,
} from "@/services/locationService";

export const NCR_REGION_CODE = "130000000";
export const METRO_MANILA = "Metro Manila";

export function getCodeByName(
  options: LocationOption[],
  name: string | null | undefined,
) {
  return options.find((option) => option.name === name)?.code ?? "";
}

export function useNcrAddressOptions(cityName?: string) {
  const [regions, setRegions] = useState<LocationOption[]>([]);
  const [provinces, setProvinces] = useState<LocationOption[]>([]);
  const [cities, setCities] = useState<LocationOption[]>([]);
  const [barangays, setBarangays] = useState<LocationOption[]>([]);

  useEffect(() => {
    let active = true;

    async function loadNcr() {
      const allRegions = await fetchRegions();
      const ncr = allRegions.find((region) => {
        const normalizedName = region.name.toLowerCase();
        return (
          normalizedName.includes("national capital region") ||
          normalizedName === "ncr"
        );
      });

      if (!active || !ncr) {
        return;
      }

      setRegions([ncr]);
      setProvinces([{ code: "NCR", name: METRO_MANILA }]);
      setCities(await fetchCities(ncr.code));
    }

    void loadNcr();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;

    async function loadBarangays() {
      if (!cityName) {
        setBarangays([]);
        return;
      }

      const cityCode = getCodeByName(cities, cityName);
      if (!cityCode) {
        setBarangays([]);
        return;
      }

      const items = await fetchBarangays(cityCode);
      if (active) {
        setBarangays(items);
      }
    }

    void loadBarangays();

    return () => {
      active = false;
    };
  }, [cities, cityName]);

  return { regions, provinces, cities, barangays };
}

export function useAddressLabels(formData: {
  region?: string;
  province?: string;
  city?: string;
  barangay?: string;
}) {
  const [labels, setLabels] = useState({
    regionName: "",
    provinceName: "",
    cityName: "",
    barangayName: "",
  });

  useEffect(() => {
    let active = true;

    async function loadLabels() {
      const nextLabels = {
        regionName: "",
        provinceName: "",
        cityName: "",
        barangayName: "",
      };

      if (formData.region) {
        const regions = await fetchRegions();
        nextLabels.regionName =
          regions.find((region) => region.code === formData.region)?.name ?? "";
      }

      if (formData.province) {
        if (
          formData.region === NCR_REGION_CODE &&
          formData.province === METRO_MANILA
        ) {
          nextLabels.provinceName = METRO_MANILA;
        } else if (formData.region) {
          const provinces = await fetchProvinces(formData.region);
          nextLabels.provinceName =
            provinces.find((province) => province.code === formData.province)
              ?.name ?? "";
        }
      }

      if (formData.city) {
        let cities: LocationOption[] = [];

        if (formData.region === NCR_REGION_CODE && formData.region) {
          cities = await fetchCities(formData.region);
        } else if (formData.province) {
          cities = await fetchCities(formData.province);
        }

        nextLabels.cityName =
          cities.find((city) => city.code === formData.city)?.name ?? "";
      }

      if (formData.city && formData.barangay) {
        const barangays = await fetchBarangays(formData.city);
        nextLabels.barangayName =
          barangays.find(
            (barangay) =>
              barangay.name === formData.barangay ||
              barangay.code === formData.barangay,
          )?.name ?? "";
      }

      if (active) {
        setLabels(nextLabels);
      }
    }

    void loadLabels();

    return () => {
      active = false;
    };
  }, [formData.barangay, formData.city, formData.province, formData.region]);

  return labels;
}
