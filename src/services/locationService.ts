export type LocationOption = {
  code: string;
  name: string;
};

const PSGC_BASE_URL = "https://psgc.gitlab.io/api";

async function fetchLocationOptions(path: string): Promise<LocationOption[]> {
  const response = await fetch(`${PSGC_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`Failed to load location data from ${path}.`);
  }

  return response.json();
}

export function fetchRegions() {
  return fetchLocationOptions("/regions.json");
}

export function fetchProvinces(regionCode: string) {
  return fetchLocationOptions(`/regions/${regionCode}/provinces.json`);
}

export function fetchCities(regionOrProvinceCode: string) {
  return fetchLocationOptions(`/regions/${regionOrProvinceCode}/cities.json`);
}

export function fetchBarangays(cityCode: string) {
  return fetchLocationOptions(`/cities/${cityCode}/barangays.json`);
}

