"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, User } from "lucide-react";

interface ViewEmergencyContactProps {
  TeacherData: any;
}

export default function ViewEmergencyContact({ TeacherData }: ViewEmergencyContactProps) {
  if (!TeacherData) return null;

  const emergency = TeacherData?.additional_info || {};

  return (
    <div className="w-full py-5 flex flex-col gap-10 mt-10 rounded-md bg-zinc-100 dark:bg-zinc-900">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Header */}
        <div className="col-span-1 md:col-span-4 mb-3">
          <p className="text-sm font-medium flex items-center gap-1 bg-zinc-200 dark:bg-zinc-800 py-2 px-3 rounded-sm w-56">
            <Phone className="text-red-500 h-5 w-5" /> Emergency Contact
          </p>
        </div>

        {/* Emergency Contact Fields */}
        <InputField
          label="First Name"
          value={emergency.emergency_fname}
          icon={<User className="text-green-500 h-4 w-4" />}
        />
        <InputField
          label="Middle Name"
          value={emergency.emergency_mname}
          icon={<User className="text-green-500 h-4 w-4" />}
        />
        <InputField
          label="Last Name"
          value={emergency.emergency_lname}
          icon={<User className="text-green-500 h-4 w-4" />}
        />
        <InputField
          label="Contact Number"
          value={emergency.emergency_contact}
          icon={<Phone className="text-blue-500 h-4 w-4" />}
        />
      </div>
    </div>
  );
}

// ------------------- Reusable InputField -------------------

function InputField({
  label,
  value,
  icon,
  full = false,
}: {
  label: string;
  value?: string;
  icon?: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div className={`${full ? "col-span-1 md:col-span-4" : ""}`}>
      <Label className="flex items-center gap-1">
        {icon}
        {label}
      </Label>
      <Input value={value || ""} className="dark:bg-zinc-900" />
    </div>
  );
}
