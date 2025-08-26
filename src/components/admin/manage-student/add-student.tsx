import { useEffect, useState } from "react";

import {
  fetchRegions,
  fetchProvinces,
  fetchCities,
  fetchBarangays,
} from "@/lib/psgc";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Loader2 } from "lucide-react";

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
} from "lucide-react";

// interface LocationOption {
//   code: string;
//   name: string;
// }

// const [regions, setRegions] = useState<LocationOption[]>([]);
// const [provinces, setProvinces] = useState<LocationOption[]>([]);
// const [cities, setCities] = useState<LocationOption[]>([]);
// const [barangays, setBarangays] = useState<LocationOption[]>([]);

// // Fetch regions on mount
// useEffect(() => {
//   fetchRegions().then(setRegions).catch(console.error);
// }, []);

// // Fetch provinces when region changes
// useEffect(() => {
//   const code = FormData.region;
//   if (code === "130000000") {
//     // NCR special case: Metro Manila as "province"
//     setProvinces([{ code: "Metro Manila", name: "Metro Manila" }]);
//     fetchCities(code).then(setCities).catch(console.error);
//   } else if (code) {
//     fetchProvinces(code).then(setProvinces).catch(console.error);
//     fetchCities(code).then(setCities).catch(console.error);
//   } else {
//     setProvinces([]);
//     setCities([]);
//     setBarangays([]);
//   }
// }, [FormData.region]);

// // Fetch cities when province changes (optional override)
// useEffect(() => {
//   const code = FormData.province;
//   if (FormData.region !== "130000000" && code) {
//     fetchCities(code).then(setCities).catch(console.error);
//   }
// }, [FormData.province]);

// // Fetch barangays when city changes
// useEffect(() => {
//   const code = FormData.city;
//   if (code) {
//     fetchBarangays(code).then(setBarangays).catch(console.error);
//   } else {
//     setBarangays([]);
//   }
// }, [FormData.city]);

export function AddStudent() {
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const [FormData, setFormData] = useState({
    lrn: "",
    grade: "",
    section: "",
    school_year: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    suffix: "",
    role: "studnet",
    gender: "",
    address: "",
    student_status: "",
    last_school_attend: "",
    street: "",
    barangay: "",
    city: "",
    province: "",
    guardian_first_name: "",
    guardian_middle_name: "",
    guardian_last_name: "",
    guardian_employment: "",
    guardian_contact: "",
    guardian_email: "",
  });

  const allFields = Object.keys(FormData);

  // Steps definition
  const stepFieldsMap: Record<number, string[]> = {
    1: ["lrn", "grade", "section", "school_year"],
    2: [
      "first_name",
      "middle_name",
      "last_name",
      "suffix",
      "role",
      "gender",
      "address",
      "student_status",
      "last_school_attend",
    ],
    3: [
      "region",
      "province",
      "city",
      "barangay",
      "street",
      "guardian_first_name",
      "guardian_middle_name",
      "guardian_last_name",
      "guardian_employment",
      "guardian_contact",
      "guardian_email",
    ],
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "grade" && { section: "" }), // reset section when grade changes
    }));

    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  };

  const validateStep = () => {
    const requiredFields = stepFieldsMap[step] || [];
    const newErrors: Record<string, string> = {};

    requiredFields.forEach((field) => {
      if (
        !FormData[field as keyof typeof FormData]?.trim() &&
        !["middle_name", "suffix", "role", "guardian_middle_name"].includes(
          field
        )
      ) {
        newErrors[field] = `${field.replace(/_/g, " ")} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    const isValid = validateStep();
    if (isValid && step < 4) setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const isValid = allFields.every((field) =>
      FormData[field as keyof typeof FormData]?.trim()
    );
    if (!isValid) {
      alert("Please fill out all fields.");
      setLoading(false);
      return;
    }

    console.log("Form submitted:", FormData);
    setLoading(false);
  };

  const renderField = (id: string, label: string) => {
    const isDropdown = [
      "grade",
      "section",
      "school_year",
      "suffix",
      "gender",
      "student_status",
    ].includes(id);

    // Generate school year options
    const generateSchoolYears = () => {
      const currentYear = new Date().getFullYear();
      const startYear = 2024;
      const years = [];
      for (let i = startYear; i <= currentYear + 5; i++) {
        years.push(`${i}-${i + 1}`);
      }
      return years;
    };

    // Suffix options
    const suffixOptions = ["Jr.", "Sr.", "I", "II", "III", "IV", "V"];

    // Gender options
    const genderOptions = ["Male", "Female", "Other"] as const;

    // Student Status options
    const studentStatusOptions = ["active", "inactive"] as const;

    // Grade options
    const gradeOptions = [
      "Grade 1",
      "Grade 2",
      "Grade 3",
      "Grade 4",
      "Grade 5",
      "Grade 6",
    ];

    // Section options depend on grade
    const generateSections = () => {
      const grade = FormData.grade;
      if (!grade) return [];
      return ["A", "B", "C"];
    };

    return (
      <div className={id === "role" ? "hidden" : "grid gap-2"}>
        {id !== "role" && (
          <Label htmlFor={id}>
            {id === "middle_name" ||
            id === "suffix" ||
            id === "guardian_middle_name" ? (
              <span>
                {label}
                <small> (Optional) </small>
              </span>
            ) : (
              <>
                <span className="text-red-500 mr-[-0.3rem]">*</span>
                {label}
              </>
            )}
          </Label>
        )}

        {id === "lrn" ? (
          <Input
            id={id}
            name={id}
            type="text"
            inputMode="numeric"
            pattern="\d{12}"
            placeholder="Enter 12-digit LRN"
            maxLength={12}
            value={FormData.lrn.replace(/\D/g, "")}
            onChange={(e) => {
              const onlyNumbers = e.target.value.replace(/\D/g, "");
              if (onlyNumbers.length <= 12) {
                setFormData((prev) => ({
                  ...prev,
                  lrn: onlyNumbers,
                }));
                setErrors((prev) => {
                  const newErrors = { ...prev };
                  delete newErrors.lrn;
                  return newErrors;
                });
              }
            }}
            className={errors[id] ? "border border-red-500" : ""}
            disabled={loading}
          />
        ) : id === "guardian_contact" ? (
          <Input
            id={id}
            name={id}
            type="text"
            inputMode="tel"
            pattern="\+\d{13}"
            placeholder="+639123456789"
            maxLength={13}
            value={
              FormData.guardian_contact === ""
                ? "+639"
                : FormData.guardian_contact
            }
            onChange={(e) => {
              const onlyNumbers = e.target.value.replace(/\D/g, "");
              const startWithPlus639 = onlyNumbers.startsWith("639");
              if (onlyNumbers.length <= 13 && startWithPlus639) {
                setFormData((prev) => ({
                  ...prev,
                  guardian_contact: `+639${onlyNumbers.slice(3)}`,
                }));
                setErrors((prev) => {
                  const newErrors = { ...prev };
                  delete newErrors.guardian_contact;
                  return newErrors;
                });
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "e" || e.key === "+" || e.key === "-") {
                e.preventDefault();
              }
            }}
            className={
              errors[id]
                ? "border border-red-500"
                : id === "guardian_contact" &&
                  FormData.guardian_contact === "+639"
                ? "border border-red-500"
                : ""
            }
            disabled={loading}
          />
        ) : id === "middle_name" || id === "role" ? (
          <Input
            id={id}
            name={id}
            type={id === "role" ? "hidden" : "text"}
            placeholder="Enter middle name (optional)"
            value={id === "role" ? "student" : FormData.middle_name}
            onChange={handleChange}
            className={
              !(
                id === "middle_name" ||
                id === "role" ||
                id === "guardian_middle_name"
              )
                ? errors[id]
                  ? "border border-red-500"
                  : ""
                : ""
            }
            disabled={loading}
            required={false}
          />
        ) : isDropdown ? (
          <select
            id={id}
            name={id}
            value={FormData[id as keyof typeof FormData]}
            onChange={handleChange}
            className={
              id === "suffix"
                ? "border bg-zinc-900 py-1 px-3 rounded-sm"
                : errors[id]
                ? "border-red-500 border bg-zinc-900 py-1 px-3 rounded-sm"
                : "border bg-zinc-900 py-1 px-3 rounded-sm"
            }
            disabled={loading}
            required={id !== "suffix"}
          >
            <option value="">Select {label}</option>
            {id === "grade" &&
              gradeOptions.map((grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
            {id === "section" &&
              generateSections().map((section) => (
                <option key={section} value={section}>
                  Section {section}
                </option>
              ))}
            {id === "school_year" &&
              generateSchoolYears().map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            {id === "suffix" &&
              suffixOptions.map((suffix) => (
                <option key={suffix} value={suffix}>
                  {suffix}
                </option>
              ))}
            {id === "gender" &&
              genderOptions.map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            {id === "student_status" &&
              studentStatusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
          </select>
        ) : (
          <Input
            id={id}
            name={id}
            placeholder={`Enter ${label.toLowerCase()}`}
            value={FormData[id as keyof typeof FormData]}
            onChange={handleChange}
            className={
              !(
                id === "middle_name" ||
                id === "suffix" ||
                id === "role" ||
                id === "guardian_middle_name"
              )
                ? errors[id]
                  ? "border border-red-500"
                  : ""
                : ""
            }
            disabled={loading}
          />
        )}

        {id !== "middle_name" &&
          id !== "suffix" &&
          id !== "role" &&
          id !== "guardian_middle_name" &&
          errors[id] && (
            <span className="text-sm text-red-500">{errors[id]}</span>
          )}
      </div>
    );
  };

  const renderStepFields = (fields: string[]) => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
      {fields.map((field) =>
        renderField(
          field,
          field.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
        )
      )}
    </div>
  );

  const renderReview = () => (
    <div className=" p-4 rounded-md text-sm overflow-auto max-h-auto">
      <pre className="whitespace-pre-wrap hidden">
        {JSON.stringify(FormData, null, 2)}
      </pre>

      <div className="flex flex-col gap-2 bg-zinc-100 dark:bg-zinc-900/50 rounded-md p-5 mb-10">
        <span className="text-lg font-semibold mb-5 flex items-center text-blue-700 dark:text-blue-500">
          <ShieldUser className="mr-2" />
          Primary Information
        </span>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">LRN : </span>
            <span className="text-sm font-light">{FormData.lrn}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Grade : </span>
            <span className="text-sm font-light">{FormData.grade}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Section : </span>
            <span className="text-sm font-light">{FormData.section}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">School Year : </span>
            <span className="text-sm font-light">{FormData.school_year}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 bg-zinc-100 dark:bg-zinc-900/50 rounded-md p-5 mt-5 mb-10">
        <span className="text-lg font-semibold mb-5 flex items-center text-green-700 dark:text-green-500">
          <UserLock className="mr-2" />
          Personal Information
        </span>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">First Name : </span>
            <span className="text-sm font-light">{FormData.first_name}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Middle Name : </span>
            <span className="text-sm font-light">{FormData.middle_name}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Last Name : </span>
            <span className="text-sm font-light">{FormData.last_name}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Suffix : </span>
            <span className="text-sm font-light">{FormData.suffix}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Role : </span>
            <span className="text-sm font-light">{FormData.role}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Gender : </span>
            <span className="text-sm font-light">{FormData.gender}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Address : </span>
            <span className="text-sm font-light">{FormData.address}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Student Status : </span>
            <span className="text-sm font-light">
              {FormData.student_status}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 bg-zinc-100 dark:bg-zinc-900/50 rounded-md p-5 mt-5 mb-10">
        <span className="text-lg font-semibold mb-5 flex items-center text-yellow-700 dark:text-yellow-500">
          <UserLock className="mr-2" />
          Personal Information
        </span>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">
              Last School Attended:{" "}
            </span>
            <span className="text-sm font-light">
              {FormData.last_school_attend}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Street: </span>
            <span className="text-sm font-light">{FormData.street}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Barangay: </span>
            <span className="text-sm font-light">{FormData.barangay}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">City: </span>
            <span className="text-sm font-light">{FormData.city}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Province: </span>
            <span className="text-sm font-light">{FormData.province}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Guardian First Name: </span>
            <span className="text-sm font-light">
              {FormData.guardian_first_name}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">
              Guardian Middle Name:{" "}
            </span>
            <span className="text-sm font-light">
              {FormData.guardian_middle_name}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Guardian Last Name: </span>
            <span className="text-sm font-light">
              {FormData.guardian_last_name}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Guardian Employment: </span>
            <span className="text-sm font-light">
              {FormData.guardian_employment}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Guardian Contact: </span>
            <span className="text-sm font-light">
              {FormData.guardian_contact}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Guardian Email: </span>
            <span className="text-sm font-light">
              {FormData.guardian_email}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    if (open) {
      setStep(1);
      setFormData({
        lrn: "",
        grade: "",
        section: "",
        school_year: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        suffix: "",
        role: "",
        gender: "",
        address: "",
        student_status: "",
        last_school_attend: "",
        street: "",
        barangay: "",
        city: "",
        province: "",
        guardian_first_name: "",
        guardian_middle_name: "",
        guardian_last_name: "",
        guardian_employment: "",
        guardian_contact: "",
        guardian_email: "",
      });
      setErrors({});
    }
  }, [open]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="flex items-center justify-center text-xs h-8 bg-teal-700 text-white hover:bg-teal-800">
          <PlusIcon
            strokeWidth={3}
            className="bg-white rounded-full text-teal-900 p-0.5 mr-1"
          />
          Add Student
        </Button>
      </SheetTrigger>

      <SheetContent
        className="bottom-0 h-[95%] rounded-t-md overflow-y-auto p-3"
        side="bottom"
      >
        <SheetHeader className="text-zinc-900 mb-4">
          <SheetTitle className="flex items-center">
            <UserRoundPlus className="mr-2 w-5 h-5 text-teal-500" />
            Add Student
          </SheetTitle>
          <SheetDescription>
            Enter details to add a new student to the system
          </SheetDescription>
        </SheetHeader>

        <Tabs value={`step${step}`} className="w-full p-5">
          <TabsList className="grid w-full grid-cols-4 mb-4 gap-5 h-20">
            <TabsTrigger
              value="step1"
              disabled={step < 1}
              className={`flex items-start justify-start p-3 ${
                step === 1
                  ? "border-2 border-blue-500 dark:border-blue-500"
                  : ""
              }`}
            >
              <div className="flex gap-2">
                <div className="text-start">
                  <small className="text-sm text-blue-700 dark:text-blue-500 flex gap-1 items-center justify-center">
                    <ShieldUser className="mr-1" /> Primary Information
                  </small>
                  <h1 className="text-lg font-semibold ml-0 flex items-center justify-start">
                    Step 1{" "}
                    {step !== 1 && (
                      <CircleCheck
                        size={50}
                        strokeWidth={2}
                        className="ml-1 text-green-500"
                      />
                    )}
                  </h1>
                </div>
              </div>
            </TabsTrigger>

            <TabsTrigger
              value="step2"
              disabled={step < 2}
              className={`flex items-start justify-start p-3 ${
                step === 2
                  ? "border-2 border-green-500 dark:border-green-500"
                  : ""
              }`}
            >
              <div className="flex gap-2">
                <div className="text-start">
                  <small className="text-sm text-green-700 dark:text-green-500 flex gap-1 items-center justify-center">
                    <UserLock className="mr-1" /> Basic Information
                  </small>
                  <h1 className="text-lg font-semibold ml-0 flex items-center justify-start">
                    Step 2{" "}
                    {step !== 1 && step !== 2 && (
                      <CircleCheck
                        size={50}
                        strokeWidth={2}
                        className="ml-1 text-green-500"
                      />
                    )}
                  </h1>
                </div>
              </div>
            </TabsTrigger>

            <TabsTrigger
              value="step3"
              disabled={step < 3}
              className={`flex items-start justify-start p-3 ${
                step === 3 ? "border-2 border-sky-500 dark:border-sky-500" : ""
              }`}
            >
              <div className="flex gap-2">
                <div className="text-start">
                  <small className="text-sm text-yellow-700 dark:text-yellow-500 flex gap-1 items-center justify-center">
                    <ContactRound className="mr-1" /> Additional Information
                  </small>
                  <h1 className="text-lg font-semibold ml-0 flex items-center justify-start">
                    Step 3{" "}
                    {step !== 1 && step !== 2 && step !== 3 && (
                      <CircleCheck
                        size={50}
                        strokeWidth={2}
                        className="ml-1 text-green-500"
                      />
                    )}
                  </h1>
                </div>
              </div>
            </TabsTrigger>

            <TabsTrigger
              value="step4"
              disabled={step < 4}
              className={`flex items-start justify-start p-3 ${
                step === 4
                  ? "border-2 border-teal-500 dark:border-teal-500"
                  : ""
              }`}
            >
              <div className="flex gap-2">
                <div className="text-start">
                  <small className="text-sm text-teal-700 dark:text-teal-500 flex gap-1 items-center justify-center">
                    <ScanEye className="mr-1" /> Review Student details -{" "}
                    <small>Last Step</small>
                  </small>
                  <h1 className="text-lg font-semibold ml-0 flex items-center justify-start">
                    Step 4{" "}
                    {step !== 1 && step !== 2 && step !== 3 && step !== 4 && (
                      <CircleCheck
                        size={50}
                        strokeWidth={2}
                        className="ml-1 text-green-500"
                      />
                    )}
                  </h1>
                </div>
              </div>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="step1" className="p-5 mt-5">
            {renderStepFields(stepFieldsMap[1])}
          </TabsContent>
          <TabsContent value="step2" className="p-5 mt-5">
            {renderStepFields(stepFieldsMap[2])}
          </TabsContent>
          <TabsContent value="step3" className="p-5 mt-5">
            {renderStepFields(stepFieldsMap[3])}
          </TabsContent>
          <TabsContent value="step4" className="p-5 mt-5">
            {renderReview()}
          </TabsContent>
        </Tabs>

        <SheetFooter className="fixed bottom-5 right-10 mt-10">
          <div className="flex gap-2 justify-end">
            {step > 1 && (
              <Button
                onClick={handlePrevStep}
                disabled={loading}
                className="w-40"
              >
                <ChevronsLeft />
                Back
              </Button>
            )}
            <div className="">
              {step < 4 ? (
                <Button
                  onClick={handleNextStep}
                  className="w-40"
                  disabled={loading}
                >
                  Next <ChevronsRight />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="w-40"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={18} />
                      Processing...
                    </>
                  ) : (
                    <>
                      Submit <Send className="ml-2" />
                    </>
                  )}
                </Button>
              )}
            </div>
            <SheetClose
              asChild
              className="flex text-red-500 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-red-600 dark:hover:text-red-600 "
            >
              <Button variant="ghost" className="w-40" disabled={loading}>
                <CircleX />
                Cancel
              </Button>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
