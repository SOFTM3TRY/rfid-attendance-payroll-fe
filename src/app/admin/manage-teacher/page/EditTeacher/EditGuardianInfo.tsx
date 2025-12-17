import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Phone } from "lucide-react";

export default function EditGuardianInfo({ formData, setFormData }: any) {
  const update = (k: string, v: string) =>
    setFormData((prev: any) => ({ ...prev, [k]: v }));

  return (
    <div className="bg-zinc-100 dark:bg-zinc-900 p-5 rounded-md w-full space-y-3">
      {/* Section Header */}
      <h1 className="text-sm font-bold flex items-center mb-3">
        <User className="text-teal-500 mr-1 size-4" /> Guardian Information
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
        <div className="grid gap-2">
          <Label htmlFor="guardian_fname"><User className="size-3 text-muted-foreground" />First Name</Label>
          <Input
            id="guardian_fname"
            placeholder="Guardian First Name"
            value={formData.emergency_fname ?? ""}
            onChange={(e) => update("emergency_fname", e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="guardian_mname"><User className="size-3 text-muted-foreground" />Middle Name</Label>
          <Input
            id="guardian_mname"
            placeholder="Guardian Middle Name"
            value={formData.emergency_mname ?? ""}
            onChange={(e) => update("emergency_mname", e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="guardian_lname"><User className="size-3 text-muted-foreground" />Last Name</Label>
          <Input
            id="guardian_lname"
            placeholder="Guardian Last Name"
            value={formData.emergency_lname ?? ""}
            onChange={(e) => update("emergency_lname", e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="guardian_contact">
            <Phone className="size-3 text-muted-foreground" /> Contact Number
          </Label>
          <Input
            id="guardian_contact"
            placeholder="Guardian Contact No"
            value={formData.emergency_contact ?? ""}
            onChange={(e) => update("emergency_contact", e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="guardian_relationship"><User className="size-3 text-muted-foreground" />Relationship</Label>
          <Input
            id="guardian_relationship"
            placeholder="Relationship to Guardian"
            value={formData.emergency_relationship ?? ""}
            onChange={(e) => update("emergency_relationship", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
