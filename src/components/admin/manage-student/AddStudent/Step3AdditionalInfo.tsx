import AddressDropdowns from "@/components/admin/manage-student/AddStudent/AddressDropdown";
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
  const handleChange = (
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

  const isEmailValid = (email: string) => {
    return email.endsWith("@gmail.com") && email.length > "@gmail.com".length;
  };

  const emergencyRelationOptions = ["Parent", "Guardian", "Sibling", "Other"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-20">
      <span className="col-span-1 md:col-span-4">
        <h1 className="text-2xl font-bold flex items-center">
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
          onChange={handleChange}
          placeholder="Enter Street Address"
          className={
            errors.street
              ? "border-red-500 border  py-1 px-3 rounded-sm"
              : "border  py-1 px-3 rounded-sm"
          }
          disabled={loading}
        />
        {errors.street && (
          <span className="text-sm text-red-500">{errors.street}</span>
        )}
      </div>

      <span className="col-span-1 md:col-span-4">
        <p className="text-sm font-normal flex items-center">
          <User className="text-blue-500 h-4 w-4 mr-1" />
          Guardian Information
        </p>
      </span>

      <div className="grid gap-2">
        <Label htmlFor="guardian_first_name">
          <span className="text-red-500 mr-[-0.3rem]">*</span>Guardian First
          Name
        </Label>
        <Input
          id="guardian_first_name"
          name="guardian_first_name"
          value={formData.guardian_first_name}
          onChange={handleChange}
          placeholder="Enter Guardian First Name"
          className={
            errors.guardian_first_name
              ? "border-red-500 border  py-1 px-3 rounded-sm"
              : "border  py-1 px-3 rounded-sm"
          }
          disabled={loading}
        />
        {errors.guardian_first_name && (
          <span className="text-sm text-red-500">
            {errors.guardian_first_name}
          </span>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="guardian_middle_name">
          Guardian Middle Name <small>(Optional)</small>
        </Label>
        <Input
          id="guardian_middle_name"
          name="guardian_middle_name"
          value={formData.guardian_middle_name}
          onChange={handleChange}
          placeholder="Enter Guardian Middle Name"
          className={
            errors.guardian_middle_name
              ? "border-red-500 border  py-1 px-3 rounded-sm"
              : "border  py-1 px-3 rounded-sm"
          }
          disabled={loading}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="guardian_last_name">
          <span className="text-red-500 mr-[-0.3rem]">*</span>Guardian Last Name
        </Label>
        <Input
          id="guardian_last_name"
          name="guardian_last_name"
          value={formData.guardian_last_name}
          onChange={handleChange}
          placeholder="Enter Guardian Last Name"
          className={
            errors.guardian_last_name
              ? "border-red-500 border  py-1 px-3 rounded-sm"
              : "border  py-1 px-3 rounded-sm"
          }
          disabled={loading}
        />
        {errors.guardian_last_name && (
          <span className="text-sm text-red-500">
            {errors.guardian_last_name}
          </span>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="guardian_occupation">
          <span className="text-red-500 mr-[-0.3rem]">*</span>Guardian
          Occupation
        </Label>
        <Input
          id="guardian_occupation"
          name="guardian_occupation"
          value={formData.guardian_occupation}
          onChange={handleChange}
          placeholder="Enter Guardian Occupation"
          className={
            errors.guardian_occupation
              ? "border-red-500 border  py-1 px-3 rounded-sm"
              : "border  py-1 px-3 rounded-sm"
          }
          disabled={loading}
        />
        {errors.guardian_occupation && (
          <span className="text-sm text-red-500">
            {errors.guardian_occupation}
          </span>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="guardian_contact">
          <span className="text-red-500 mr-[-0.3rem]">*</span>Guardian Contact
        </Label>
        <Input
          id="guardian_contact"
          name="guardian_contact"
          type="text"
          inputMode="numeric"
          pattern="\+639\d{9}"
          placeholder="+639_________"
          value={formData.guardian_contact || "+639"}
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
              guardian_contact: "+".concat(value),
            }));
            setErrors((prev: any) => {
              const n = { ...prev };
              delete n.guardian_contact;
              return n;
            });
          }}
          onBlur={(e) => {
            // If user deletes everything, reset to '+639'
            if (!e.target.value || e.target.value === "+") {
              setFormData((prev: any) => ({
                ...prev,
                guardian_contact: "+639",
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
            errors.guardian_contact
              ? "border-red-500 border  py-1 px-3 rounded-sm"
              : "border  py-1 px-3 rounded-sm"
          }
          disabled={loading}
        />
        {errors.guardian_contact && (
          <span className="text-sm text-red-500">
            {errors.guardian_contact}
          </span>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="guardian_email">
          <span className="text-red-500 mr-[-0.3rem]">*</span>Guardian Email
        </Label>
        <Input
          id="guardian_email"
          name="guardian_email"
          value={formData.guardian_email}
          onChange={(e) => {
            const value = e.target.value;
            setFormData((prev: any) => ({ ...prev, guardian_email: value }));
            setErrors((prev: any) => {
              const n = { ...prev };
              if (!isEmailValid(value)) {
                n.guardian_email = "Email must end with @gmail.com";
              } else {
                delete n.guardian_email;
              }
              return n;
            });
          }}
          placeholder="Enter Guardian Email"
          className={
            errors.guardian_email
              ? "border-red-500 border  py-1 px-3 rounded-sm"
              : "border  py-1 px-3 rounded-sm"
          }
          disabled={loading}
          type="email"
          autoComplete="off"
        />
        {errors.guardian_email && (
          <span className="text-sm text-red-500">{errors.guardian_email}</span>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="relationship">
          <span className="text-red-500 mr-[-0.3rem]">*</span>Relationship
        </Label>
        <Select
          value={formData.relationship || ""}
          onValueChange={(value) =>
            handleSelectChange("relationship", value)
          }
          disabled={loading}
        >
          <SelectTrigger
            className={
              errors.relationship
                ? "border-red-500 border  py-1 px-3 rounded-sm w-full"
                : "border  py-1 px-3 rounded-sm w-full"
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
        {errors.relationship && (
          <span className="text-sm text-red-500">{errors.relationship}</span>
        )}
      </div>
    </div>
  );
}
