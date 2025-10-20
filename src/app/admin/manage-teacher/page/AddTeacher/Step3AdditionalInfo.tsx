import AddressDropdowns from "@/components/admin/manage-student/AddStudent/AddressDropdown";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
              ? "border-red-500 border dark:bg-zinc-900 py-1 px-3 rounded-sm"
              : "border dark:bg-zinc-900 py-1 px-3 rounded-sm"
          }
          disabled={loading}
        />
        {errors.street && (
          <span className="text-xs text-red-500">{errors.street}</span>
        )}
      </div>

      <hr />

      <span className="col-span-1 md:col-span-4">
        <p className="text-sm font-normal flex items-center">
          <User className="text-blue-500 h-4 w-4 mr-1" />
          Emergency Contact Information
        </p>
      </span>

      <div className="grid gap-2">
        <Label htmlFor="emergency_fname">
          <span className="text-red-500 mr-[-0.3rem]">*</span>First
          Name
        </Label>
        <Input
          id="emergency_fname"
          name="emergency_fname"
          value={formData.emergency_fname}
          onChange={handleChange}
          placeholder="Enter First Name"
          className={
            errors.emergency_fname
              ? "border-red-500 border dark:bg-zinc-900 py-1 px-3 rounded-sm"
              : "border dark:bg-zinc-900 py-1 px-3 rounded-sm"
          }
          disabled={loading}
        />
        {errors.emergency_fname && (
          <span className="text-xs text-red-500">
            {errors.emergency_fname}
          </span>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="emergency_mname">
          Middle Name <small>(Optional)</small>
        </Label>
        <Input
          id="emergency_mname"
          name="emergency_mname"
          value={formData.emergency_mname}
          onChange={handleChange}
          placeholder="Enter Middle Name"
          className={
            errors.emergency_mname
              ? "border-red-500 border dark:bg-zinc-900 py-1 px-3 rounded-sm"
              : "border dark:bg-zinc-900 py-1 px-3 rounded-sm"
          }
          disabled={loading}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="emergency_lname">
          <span className="text-red-500 mr-[-0.3rem]">*</span>Last Name
        </Label>
        <Input
          id="emergency_lname"
          name="emergency_lname"
          value={formData.emergency_lname}
          onChange={handleChange}
          placeholder="Enter Last Name"
          className={
            errors.emergency_lname
              ? "border-red-500 border dark:bg-zinc-900 py-1 px-3 rounded-sm"
              : "border dark:bg-zinc-900 py-1 px-3 rounded-sm"
          }
          disabled={loading}
        />
        {errors.emergency_lname && (
          <span className="text-xs text-red-500">
            {errors.emergency_lname}
          </span>
        )}
      </div>

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
            // Remove all non-digits except the leading '+'
            let value = e.target.value.replace(/[^\d]/g, "");
            // Always start with '639'
            if (!value.startsWith("639"))
              value = "639" + value.replace(/^6*/, "");
            // Limit to 13 characters (+639 + 9 digits)
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
            // If user deletes everything, reset to '+639'
            if (!e.target.value || e.target.value === "+") {
              setFormData((prev: any) => ({
                ...prev,
                emergency_contact: "+639",
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
            errors.emergency_contact
              ? "border-red-500 border dark:bg-zinc-900 py-1 px-3 rounded-sm"
              : "border dark:bg-zinc-900 py-1 px-3 rounded-sm"
          }
          disabled={loading}
        />
        {errors.emergency_contact && (
          <span className="text-xs text-red-500">
            {errors.emergency_contact}
          </span>
        )}
      </div>
    </div>
  );
}
