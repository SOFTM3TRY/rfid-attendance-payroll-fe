import { useEffect, useState } from "react";
import {
  fetchRegions,
  fetchProvinces,
  fetchCities,
  fetchBarangays,
} from "@/lib/psgc";

import {
  PlusIcon,
  UserRoundPlus,
  ChevronsRight,
  ChevronsLeft,
  CircleX,
  ShieldUser,
  CircleCheck,
  UserLock,
  ContactRound,
  ScanEye,
  Send,
  User,
  Map,
} from "lucide-react";

export default function Step4({ formData }: any) {
  const [regionName, setRegionName] = useState("");
  const [provinceName, setProvinceName] = useState("");
  const [cityName, setCityName] = useState("");
  const [barangayName, setBarangayName] = useState("");

  useEffect(() => {
    let isMounted = true;
    async function fetchNames() {
      // Region
      if (formData.region) {
        const regions = await fetchRegions();
        const region = regions.find((r: any) => r.code === formData.region);
        if (isMounted) setRegionName(region ? region.name : "");
      }
      // Province
      if (formData.province) {
        // NCR special case: province is "Metro Manila"
        if (
          formData.region === "130000000" &&
          formData.province === "Metro Manila"
        ) {
          setProvinceName("Metro Manila");
        } else {
          const provinces = await fetchProvinces(formData.region);
          const province = provinces.find(
            (p: any) => p.code === formData.province
          );
          if (isMounted) setProvinceName(province ? province.name : "");
        }
      }
      // City
      if (formData.city) {
        let cities = [];
        // NCR special case: fetch cities using region code
        if (formData.region === "130000000") {
          cities = await fetchCities(formData.region);
        } else if (formData.province) {
          cities = await fetchCities(formData.province);
        }
        const city = cities.find((c: any) => c.code === formData.city);
        if (isMounted) setCityName(city ? city.name : "");
      }
      // Barangay
      if (formData.city && formData.barangay) {
        const barangays = await fetchBarangays(formData.city);
        const barangay = barangays.find(
          (b: any) =>
            b.name === formData.barangay || b.code === formData.barangay
        );
        if (isMounted) setBarangayName(barangay ? barangay.name : "");
      }
    }
    fetchNames();
    return () => {
      isMounted = false;
    };
  }, [formData.region, formData.province, formData.city, formData.barangay]);

  const displayData = {
    ...formData,
    region: regionName || formData.region,
    province: provinceName || formData.province,
    city: cityName || formData.city,
    barangay: barangayName || formData.barangay,
  };

  return (
    <div className="p-4 rounded-md text-sm overflow-auto max-h-auto">
      {/* Show JSON with address names */}
      <pre className="whitespace-pre-wrap hidden">
        {JSON.stringify(displayData, null, 2)}
      </pre>

      {/* Primary Information */}
      <div className="flex flex-col gap-2 bg-zinc-100 dark:bg-zinc-900/50 rounded-md p-5 mb-10">
        <span className="text-lg font-semibold mb-5 flex items-center text-blue-700 dark:text-blue-500">
          <ShieldUser className="mr-2" />
          Primary Information
        </span>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">LRN : </span>
            <span className="text-sm font-light">{formData.lrn}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Grade : </span>
            <span className="text-sm font-light">{formData.grade}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Section : </span>
            <span className="text-sm font-light">{formData.section}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">School Year : </span>
            <span className="text-sm font-light">{formData.school_year}</span>
          </div>
        </div>
      </div>
      {/* Personal Information */}
      <div className="flex flex-col gap-2 bg-zinc-100 dark:bg-zinc-900/50 rounded-md p-5 mt-5 mb-10">
        <span className="text-lg font-semibold mb-5 flex items-center text-green-700 dark:text-green-500">
          <UserLock className="mr-2" />
          Personal Information
        </span>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">First Name : </span>
            <span className="text-sm font-light">{formData.first_name}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Middle Name : </span>
            <span className="text-sm font-light">{formData.middle_name}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Last Name : </span>
            <span className="text-sm font-light">{formData.last_name}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Suffix : </span>
            <span className="text-sm font-light">{formData.suffix}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Role : </span>
            <span className="text-sm font-light">{formData.role}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Gender : </span>
            <span className="text-sm font-light">{formData.gender}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">birth_place : </span>
            <span className="text-sm font-light">{formData.birth_place}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">birth_date : </span>
            <span className="text-sm font-light">{formData.birth_date}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Student Status : </span>
            <span className="text-sm font-light">
              {formData.student_status}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">
              Last School Attended:{" "}
            </span>
            <span className="text-sm font-light">
              {formData.last_school_attend}
            </span>
          </div>
        </div>
      </div>
      {/* Additional Information */}
      <div className="flex flex-col gap-2 bg-zinc-100 dark:bg-zinc-900/50 rounded-md p-5 mt-5 mb-10">
        <span className="text-lg font-semibold mb-5 flex items-center text-yellow-700 dark:text-yellow-500">
          <UserLock className="mr-2" />
          Additional Information
        </span>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <small className="text-sm font-semibold col-span-1 md:col-span-4 flex item-center">
            <Map className="text-yellow-500 h-5 w-5 mr-2" />
            Address
          </small>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Region : </span>
            <span className="text-sm font-light">
              {regionName || formData.region}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Province : </span>
            <span className="text-sm font-light">
              {provinceName || formData.province}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">City : </span>
            <span className="text-sm font-light">
              {cityName || formData.city}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Barangay : </span>
            <span className="text-sm font-light">
              {barangayName || formData.barangay}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Street : </span>
            <span className="text-sm font-light">{formData.street}</span>
          </div>

          <small className="text-sm mt-10 font-semibold col-span-1 md:col-span-4 flex item-center">
            <User className="text-green-500 h-5 w-5 mr-2" />
            Guardian Information
          </small>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">
              Guardian First Name :{" "}
            </span>
            <span className="text-sm font-light">
              {formData.guardian_first_name}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">
              Guardian Middle Name :{" "}
            </span>
            <span className="text-sm font-light">
              {formData.guardian_middle_name}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Guardian Last Name : </span>
            <span className="text-sm font-light">
              {formData.guardian_last_name}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">
              Guardian Employment :{" "}
            </span>
            <span className="text-sm font-light">
              {formData.guardian_occupation}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Guardian Contact : </span>
            <span className="text-sm font-light">
              {formData.guardian_contact}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Guardian Email : </span>
            <span className="text-sm font-light">
              {formData.guardian_email}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
