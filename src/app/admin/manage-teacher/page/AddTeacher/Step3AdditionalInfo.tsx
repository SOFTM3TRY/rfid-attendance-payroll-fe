import AddressDropdowns from "./AddressDropdown";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ContactRound, Map, User } from "lucide-react";

export default function Step3({
  formData,
  setFormData,
  errors,
  setErrors,
  loading,
}: any) {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
    setErrors((prev: any) => {
      const n = { ...prev };
      delete n[name];
      return n;
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }));
    setErrors((prev: any) => {
      const n = { ...prev };
      delete n[name];
      return n;
    });
  };

  const emergencyRelationOptions = ["Parent", "Guardian", "Sibling", "Other"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-20">
      <span className="col-span-1 md:col-span-4">
        <h1 className="text-xl font-bold flex items-center">
          <ContactRound className="text-yellow-500 h-6 w-6 mr-1" />
          Additional Information
        </h1>
      </span>

      <span className="col-span-1 md:col-span-4">
        <p className="text-sm font-normal flex items-center">
          <Map className="text-green-500 h-4 w-4 mr-1" />
          Address
        </p>
      </span>

      <AddressDropdowns
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        setErrors={setErrors}
        loading={loading}
      />

      <div className="grid gap-2">
        <Label htmlFor="street">
          <span className="text-red-500 mr-[-0.3rem]">*</span>Street
        </Label>
        <Input
          id="street"
          name="street"
          value={formData.street}
          onChange={handleInputChange}
          placeholder="Enter Street Address"
          required
          className={
            errors.street
              ? "border-red-500 border py-1 px-3 rounded-sm"
              : "border py-1 px-3 rounded-sm"
          }
          disabled={loading}
        />
        {errors.street && (
          <span className="text-xs text-red-500">{errors.street}</span>
        )}
      </div>

      <span className="col-span-1 md:col-span-4">
        <p className="text-sm font-normal flex items-center">
          <User className="text-blue-500 h-4 w-4 mr-1" />
          Emergency Contact Information
        </p>
      </span>

      {/* Emergency First Name */}
      <div className="grid gap-2">
        <Label htmlFor="emergency_fname">
          <span className="text-red-500 mr-[-0.3rem]">*</span>First Name
        </Label>
        <Input
          id="emergency_fname"
          name="emergency_fname"
          value={formData.emergency_fname}
          onChange={handleInputChange}
          placeholder="Enter First Name"
          required
          className={
            errors.emergency_fname
              ? "border-red-500 border py-1 px-3 rounded-sm"
              : "border py-1 px-3 rounded-sm"
          }
          disabled={loading}
        />
        {errors.emergency_fname && (
          <span className="text-xs text-red-500">{errors.emergency_fname}</span>
        )}
      </div>

      {/* Emergency Middle Name */}
      <div className="grid gap-2">
        <Label htmlFor="emergency_mname">Middle Name <small>(Optional)</small></Label>
        <Input
          id="emergency_mname"
          name="emergency_mname"
          value={formData.emergency_mname}
          onChange={handleInputChange}
          placeholder="Enter Middle Name"
          className={
            errors.emergency_mname
              ? "border-red-500 border py-1 px-3 rounded-sm"
              : "border py-1 px-3 rounded-sm"
          }
          disabled={loading}
        />
        {errors.emergency_mname && (
          <span className="text-xs text-red-500">{errors.emergency_mname}</span>
        )}
      </div>

      {/* Emergency Last Name */}
      <div className="grid gap-2">
        <Label htmlFor="emergency_lname">
          <span className="text-red-500 mr-[-0.3rem]">*</span>Last Name
        </Label>
        <Input
          id="emergency_lname"
          name="emergency_lname"
          value={formData.emergency_lname}
          onChange={handleInputChange}
          placeholder="Enter Last Name"
          className={
            errors.emergency_lname
              ? "border-red-500 border py-1 px-3 rounded-sm"
              : "border py-1 px-3 rounded-sm"
          }
          disabled={loading}
        />
        {errors.emergency_lname && (
          <span className="text-xs text-red-500">{errors.emergency_lname}</span>
        )}
      </div>

      {/* Emergency Relationship */}
      <div className="grid gap-2">
        <Label htmlFor="emergency_relation">
          <span className="text-red-500 mr-[-0.3rem]">*</span>Relationship
        </Label>
        <Select
          value={formData.emergency_relation || ""}
          onValueChange={(value) => handleSelectChange("emergency_relation", value)}
          disabled={loading}
        >
          <SelectTrigger
            className={
              errors.emergency_relation
                ? "border-red-500 border py-1 px-3 rounded-sm w-full"
                : "border py-1 px-3 rounded-sm w-full"
            }
          >
            <SelectValue placeholder="Select Relationship" />
          </SelectTrigger>
          <SelectContent>
            {emergencyRelationOptions.map((relation) => (
              <SelectItem key={relation} value={relation}>
                {relation}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.emergency_relation && (
          <span className="text-xs text-red-500">{errors.emergency_relation}</span>
        )}
      </div>

      {/* Emergency Contact Number */}
      <div className="grid gap-2">
        <Label htmlFor="emergency_contact">
          <span className="text-red-500 mr-[-0.3rem]">*</span>Emergency Contact
        </Label>
        <Input
          id="emergency_contact"
          name="emergency_contact"
          type="text"
          inputMode="numeric"
          pattern="\+639\d{9}"
          placeholder="+639_________"
          value={formData.emergency_contact || "+639"}
          maxLength={13}
          onChange={(e) => {
            let value = e.target.value.replace(/[^\d]/g, "");
            if (!value.startsWith("639")) value = "639" + value.replace(/^6*/, "");
            value = value.slice(0, 12);
            setFormData((prev: any) => ({
              ...prev,
              emergency_contact: "+".concat(value),
            }));
            setErrors((prev: any) => {
              const n = { ...prev };
              delete n.emergency_contact;
              return n;
            });
          }}
          onBlur={(e) => {
            if (!e.target.value || e.target.value === "+") {
              setFormData((prev: any) => ({ ...prev, emergency_contact: "+639" }));
            }
          }}
          disabled={loading}
          className={
            errors.emergency_contact
              ? "border-red-500 border py-1 px-3 rounded-sm"
              : "border py-1 px-3 rounded-sm"
          }
        />
        {errors.emergency_contact && (
          <span className="text-xs text-red-500">{errors.emergency_contact}</span>
        )}
      </div>
    </div>
  );
}
