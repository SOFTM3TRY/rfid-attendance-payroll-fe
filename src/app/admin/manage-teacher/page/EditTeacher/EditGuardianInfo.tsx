"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Phone, Mail, SquareUserRound, UserCog } from "lucide-react";

export default function EditGuardianInfo({ data }: { data: any }) {
  const [formData, setFormData] = useState({
    guardian_first_name: data.guardian_first_name || "",
    guardian_middle_name: data.guardian_middle_name || "",
    guardian_last_name: data.guardian_last_name || "",
    guardian_suffix: data.guardian_suffix || "",
    guardian_contact: data.guardian_contact || "+639",
    guardian_email: data.guardian_email || "",
    guardian_occupation: data.guardian_occupation || "",
    relationship: data.relationship || "",
  });

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));

    // Remove error if user starts typing
    setErrors((prev: any) => {
      const updated = { ...prev };
      delete updated[name];
      return updated;
    });
  };

  return (
    <div className="w-full py-5 flex flex-col gap-4 mt-10 rounded-md bg-zinc-100 dark:bg-zinc-900">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <SectionHeader
          icon={<User className="text-teal-500 h-5 w-5" />}
          title="Guardian Information"
        />

        {/* First Name */}
        <FormField
          label="Guardian First Name"
          name="guardian_first_name"
          value={formData.guardian_first_name}
          onChange={handleChange}
          error={errors.guardian_first_name}
          required
        />

        {/* Middle Name */}
        <FormField
          label="Guardian Middle Name"
          name="guardian_middle_name"
          value={formData.guardian_middle_name}
          onChange={handleChange}
          optional
        />

        {/* Last Name */}
        <FormField
          label="Guardian Last Name"
          name="guardian_last_name"
          value={formData.guardian_last_name}
          onChange={handleChange}
          error={errors.guardian_last_name}
          required
        />

        {/* Suffix */}
        <FormField
          label="Guardian Suffix"
          name="guardian_suffix"
          value={formData.guardian_suffix}
          onChange={handleChange}
          optional
        />

        {/* Contact */}
        <FormField
          label="Guardian Contact"
          name="guardian_contact"
          value={formData.guardian_contact}
          onChange={(e) => {
            let value = e.target.value.replace(/[^\d]/g, "");
            if (!value.startsWith("639"))
              value = "639" + value.replace(/^6*/, "");
            value = value.slice(0, 12);
            setFormData((prev: any) => ({
              ...prev,
              guardian_contact: "+" + value,
            }));
            setErrors((prev: any) => {
              const n = { ...prev };
              delete n.guardian_contact;
              return n;
            });
          }}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
            if (!e.target.value || e.target.value === "+") {
              setFormData((prev: any) => ({
                ...prev,
                guardian_contact: "+639",
              }));
            }
          }}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
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

            if (
              (e.key === "Backspace" || e.key === "Delete") &&
              (e.currentTarget.selectionStart ?? 0) <= 1
            ) {
              e.preventDefault();
            }
          }}
          icon={<Phone className="text-blue-500 h-4 w-4" />}
          error={errors.guardian_contact}
          required
        />

        {/* Email */}
        <FormField
          label="Guardian Email"
          name="guardian_email"
          value={formData.guardian_email}
          onChange={(e) => {
            const value = e.target.value;
            setFormData((prev: any) => ({ ...prev, guardian_email: value }));
            setErrors((prev: any) => {
              const n = { ...prev };
              if (
                value &&
                (!value.endsWith("@gmail.com") ||
                  value.length <= "@gmail.com".length)
              ) {
                n.guardian_email = "Email must end with @gmail.com";
              } else {
                delete n.guardian_email;
              }
              return n;
            });
          }}
          icon={<Mail className="text-yellow-500 h-4 w-4" />}
          error={errors.guardian_email}
          required
          type="email"
        />

        {/* Occupation */}
        <FormField
          label="Guardian Occupation"
          name="guardian_occupation"
          value={formData.guardian_occupation}
          onChange={handleChange}
          icon={<SquareUserRound className="text-teal-500 h-4 w-4" />}
          error={errors.guardian_occupation}
          required
        />

        {/* Relationship */}
        <div className="grid gap-2">
          <Label htmlFor="relationship" className="flex items-center gap-1">
            <span className="text-red-500 ml-[-0.3rem]"> * </span><UserCog className="text-green-500 h-4 w-4" />
            Relationship
          </Label>
          <select
            id="relationship"
            name="relationship"
            value={formData.relationship}
            onChange={handleChange}
            className={`border dark:bg-zinc-900 py-1 px-3 rounded-sm ${
              errors.relationship ? "border-red-500" : ""
            }`}
            disabled={loading}
          >
            <option value="" disabled hidden>
              Select Relationship
            </option>
            <option value="Mother">Mother</option>
            <option value="Father">Father</option>
            <option value="Guardian">Guardian</option>
          </select>
          {errors.relationship && (
            <span className="text-xs text-red-500">{errors.relationship}</span>
          )}
        </div>
      </div>
    </div>
  );
}

// ------------------- Reusable Field -------------------

function FormField({
  label,
  name,
  value,
  onChange,
  error,
  icon,
  required,
  optional,
  type = "text",
  ...rest
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: any) => void;
  error?: string;
  icon?: React.ReactNode;
  required?: boolean;
  optional?: boolean;
  type?: string;
  [key: string]: any;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={name} className="flex items-center gap-1">
        {required && <span className="text-red-500 ml-[-0.3rem]">*</span>}
        {icon || <User className="text-green-500 h-4 w-4" />}
        {label}{" "}
        {optional && (
          <small className="text-xs text-muted-foreground">(Optional)</small>
        )}
      </Label>
      <Input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={`Enter ${label}`}
        type={type}
        disabled={false}
        className={`border dark:bg-zinc-900 py-1 px-3 rounded-sm ${
          error ? "border-red-500" : ""
        }`}
        {...rest}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}

function SectionHeader({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="col-span-1 md:col-span-4 mb-3">
      <p className="text-sm font-medium flex items-center gap-1 bg-zinc-200 dark:bg-zinc-800 py-2 px-3 rounded-sm w-56">
        {icon} {title}
      </p>
    </div>
  );
}
