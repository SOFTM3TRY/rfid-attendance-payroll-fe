import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { UserRound, CalendarDays, UserLock } from "lucide-react";

export default function Step2({
  formData,
  setFormData,
  errors,
  setErrors,
  loading,
}: any) {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev: any) => ({ ...prev, [name]: value }));

    setErrors((prev: any) => {
      const updated = { ...prev };
      delete updated[name];
      return updated;
    });

    // --- Age Validation (18+) ---
    if (name === "birth_date") {
      const today = new Date();
      const birth = new Date(value);

      if (isNaN(birth.getTime())) {
        setErrors((prev: any) => ({
          ...prev,
          birth_date: "Invalid birth date.",
        }));
        return;
      }

      const age =
        today.getFullYear() -
        birth.getFullYear() -
        (today <
        new Date(today.getFullYear(), birth.getMonth(), birth.getDate())
          ? 1
          : 0);

      if (age < 18) {
        setErrors((prev: any) => ({
          ...prev,
          birth_date: "Age must be 18 or above.",
        }));
      }
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }));
    setErrors((prev: any) => {
      const n = { ...prev };
      delete n[name];
      return n;
    });
  };

  const isEmailValid = (email: string) => {
    return email.endsWith("@gmail.com") && email.length > "@gmail.com".length;
  };

  const suffixOptions = ["Jr.", "Sr.", "I", "II", "III", "IV", "V"];
  const genderOptions = ["Male", "Female"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-20">
      <span className="col-span-1 md:col-span-4">
        <h1 className="text-xl font-bold flex items-center">
          <UserLock className="text-green-500 h-6 w-6 mr-1" />
          Basic Information
        </h1>
      </span>

      <div className="grid gap-2">
        <Label htmlFor="first_name">
          <span className="text-red-500 mr-[-0.3rem]">*</span>
          <UserRound className="text-green-500 h-3 w-3" />
          First Name
        </Label>
        <Input
          id="first_name"
          name="first_name"
          value={formData.first_name}
          onChange={handleInputChange}
          placeholder="Enter First Name"
          className={
            errors.first_name
              ? "border-red-500 border  py-1 px-3 rounded-sm"
              : "border  py-1 px-3 rounded-sm"
          }
          disabled={loading}
        />
        {errors.first_name && (
          <span className="text-xs text-red-500">{errors.first_name}</span>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="middle_name">
          <UserRound className="text-green-500 h-3 w-3" />
          Middle Name <small>(Optional)</small>
        </Label>
        <Input
          id="middle_name"
          name="middle_name"
          value={formData.middle_name}
          onChange={handleInputChange}
          placeholder="Enter Middle Name"
          disabled={loading}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="last_name">
          <span className="text-red-500 mr-[-0.3rem]">*</span>
          <UserRound className="text-green-500 h-3 w-3" />
          Last Name
        </Label>
        <Input
          id="last_name"
          name="last_name"
          value={formData.last_name}
          onChange={handleInputChange}
          placeholder="Enter Last Name"
          className={
            errors.last_name
              ? "border-red-500 border  py-1 px-3 rounded-sm"
              : "border  py-1 px-3 rounded-sm"
          }
          disabled={loading}
        />
        {errors.last_name && (
          <span className="text-xs text-red-500">{errors.last_name}</span>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="suffix">
          <UserRound className="text-green-500 h-3 w-3" />
          Suffix <small>(Optional)</small>
        </Label>
        <Select
          value={formData.suffix || ""}
          onValueChange={(value) => handleSelectChange("suffix", value)}
          disabled={loading}
        >
          <SelectTrigger
            className={
              errors.suffix
                ? "border-red-500 border  py-1 px-3 rounded-sm w-56"
                : "border  py-1 px-3 rounded-sm w-56"
            }
          >
            <SelectValue placeholder="Select Suffix" />
          </SelectTrigger>
          <SelectContent>
            {suffixOptions.map((suffix) => (
              <SelectItem key={suffix} value={suffix}>
                {suffix}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.suffix && (
          <span className="text-xs text-red-500">{errors.suffix}</span>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="gender">
          <span className="text-red-500 mr-[-0.3rem]">*</span>Gender
        </Label>
        <Select
          value={formData.gender || ""}
          onValueChange={(value) => handleSelectChange("gender", value)}
          disabled={loading}
        >
          <SelectTrigger
            className={
              errors.gender
                ? "border-red-500 border  py-1 px-3 rounded-sm w-56"
                : "border  py-1 px-3 rounded-sm w-56"
            }
          >
            <SelectValue placeholder="Select Gender" />
          </SelectTrigger>
          <SelectContent>
            {genderOptions.map((gender) => (
              <SelectItem key={gender} value={gender}>
                {gender}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.gender && (
          <span className="text-xs text-red-500">{errors.gender}</span>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="birth_place">
          <span className="text-red-500 mr-[-0.3rem]">*</span>
          Birth Place
        </Label>
        <Input
          id="birth_place"
          name="birth_place"
          value={formData.birth_place}
          onChange={handleInputChange}
          placeholder="Enter birth_place"
          className={
            errors.birth_place
              ? "border-red-500 border  py-1 px-3 rounded-sm"
              : "border  py-1 px-3 rounded-sm"
          }
          disabled={loading}
        />
        {errors.birth_place && (
          <span className="text-xs text-red-500">{errors.birth_place}</span>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="birth_date">
          <span className="text-red-500 mr-[-0.3rem]">*</span>
          <CalendarDays className="text-violet-500 h-3 w-3" />
          Birth Date
        </Label>

        <Input
          id="birth_date"
          name="birth_date"
          type="date"
          value={formData.birth_date}
          onChange={handleInputChange}
          placeholder="YYYY-MM-DD"
          disabled={loading}
        />

        {errors.birth_date && (
          <span className="text-xs text-red-500">{errors.birth_date}</span>
        )}
      </div>

      <div className="gap-2 hidden">
        <Label htmlFor="status">
          <span className="text-red-500 mr-[-0.3rem]">*</span>Status
        </Label>
        <Input
          type="hidden"
          value={formData.status}
          id="status"
          name="status"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">
          <span className="text-red-500 mr-[-0.3rem]">*</span>Personal Email
        </Label>
        <Input
          id="email"
          name="email"
          value={formData.email}
          onChange={(e) => {
            const value = e.target.value;
            setFormData((prev: any) => ({ ...prev, email: value }));
            setErrors((prev: any) => {
              const n = { ...prev };
              if (!isEmailValid(value)) {
                n.email = "Email must end with @gmail.com";
              } else {
                delete n.email;
              }
              return n;
            });
          }}
          placeholder="Enter Personal Email"
          className={
            errors.email
              ? "border-red-500 border  py-1 px-3 rounded-sm"
              : "border  py-1 px-3 rounded-sm"
          }
          disabled={loading}
          type="email"
          autoComplete="off"
        />
        {errors.email && (
          <span className="text-xs text-red-500">{errors.email}</span>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="contact_no">
          <span className="text-red-500 mr-[-0.3rem]">*</span>Contact Number
        </Label>
        <Input
          id="contact_no"
          name="contact_no"
          type="text"
          inputMode="numeric"
          pattern="\+639\d{9}"
          placeholder="+639_________"
          value={formData.contact_no || "+639"}
          maxLength={13}
          onChange={(e) => {
            // Remove all non-digits except the leading '+'
            let value = e.target.value.replace(/[^\d]/g, "");
            // Always start with '639'
            if (!value.startsWith("639"))
              value = "639" + value.replace(/^6*/, "");
            // Limit to 13 characters (+639 + 9 digits)
            value = value.slice(0, 12);
            setFormData((prev: any) => ({
              ...prev,
              contact_no: "+".concat(value),
            }));
            setErrors((prev: any) => {
              const n = { ...prev };
              delete n.contact_no;
              return n;
            });
          }}
          onBlur={(e) => {
            // If user deletes everything, reset to '+639'
            if (!e.target.value || e.target.value === "+") {
              setFormData((prev: any) => ({
                ...prev,
                contact_no: "+639",
              }));
            }
          }}
          onKeyDown={(e) => {
            // Prevent entering non-numeric except for navigation keys
            if (
              !/[0-9]/.test(e.key) &&
              ![
                "Backspace",
                "ArrowLeft",
                "ArrowRight",
                "Tab",
                "Delete",
              ].includes(e.key)
            ) {
              e.preventDefault();
            }
            // Prevent deleting '+'
            if (
              (e.key === "Backspace" || e.key === "Delete") &&
              (e.currentTarget.selectionStart ?? 0) <= 1
            ) {
              e.preventDefault();
            }
          }}
          className={
            errors.contact_no
              ? "border-red-500 border  py-1 px-3 rounded-sm"
              : "border  py-1 px-3 rounded-sm"
          }
          disabled={loading}
        />
        {errors.contact_no && (
          <span className="text-xs text-red-500">{errors.contact_no}</span>
        )}
      </div>
    </div>
  );
}
