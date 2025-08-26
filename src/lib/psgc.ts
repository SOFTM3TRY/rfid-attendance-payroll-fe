// lib/api/psgc.ts
export async function fetchRegions() {
  const res = await fetch('https://psgc.gitlab.io/api/regions.json');
  return res.json();
}

export async function fetchProvinces(regionCode: string) {
  const res = await fetch(`https://psgc.gitlab.io/api/regions/${regionCode}/provinces.json`);
  return res.json();
}

export async function fetchCities(regionOrProvinceCode: string) {
  const res = await fetch(`https://psgc.gitlab.io/api/regions/${regionOrProvinceCode}/cities.json`);
  return res.json();
}

export async function fetchBarangays(cityCode: string) {
  const res = await fetch(`https://psgc.gitlab.io/api/cities/${cityCode}/barangays.json`);
  return res.json();
}
