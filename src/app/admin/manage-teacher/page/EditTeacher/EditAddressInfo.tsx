import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPinHouse, Map } from "lucide-react";


export default function EditAddressInfo({ formData, setFormData }: any) {
  const update = (k: string, v: string) =>
    setFormData((p: any) => ({ ...p, [k]: v }));

  return (
    <div className="bg-zinc-100 dark:bg-zinc-900 p-5 rounded-md w-full space-y-3">
      <h1 className="text-sm font-bold flex items-center mb-3">
        <Map className="text-red-500 size-4 mr-1" /> Primary Information
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3  mt-5">
        <div className="grid gap-2">
          <Label className="flex items-center gap-1">
            <MapPinHouse className="size-3 text-muted-foreground" />
            Region
          </Label>
          <Input
            value={formData.region ?? ""}
            onChange={(e) => update("region", e.target.value)}
            disabled
          />
        </div>

        <div className="grid gap-2">
          <Label className="flex items-center gap-1">
            <MapPinHouse className="size-3 text-muted-foreground" />
            Province
          </Label>
          <Input
            value={formData.province ?? ""}
            onChange={(e) => update("province", e.target.value)}
            disabled
          />
        </div>

        <div className="grid gap-2">
          <Label className="flex items-center gap-1">
            <MapPinHouse className="size-3 text-muted-foreground" />
            City
          </Label>
          <Input
            value={formData.city ?? ""}
            onChange={(e) => update("city", e.target.value)}
            disabled
          />
        </div>

        <div className="grid gap-2">
          <Label className="flex items-center gap-1">
            <MapPinHouse className="size-3 text-muted-foreground" />
            Barangay
          </Label>
          <Input
            value={formData.barangay ?? ""}
            onChange={(e) => update("barangay", e.target.value)}
            disabled
          />
        </div>

        <div className="grid gap-2">
          <Label className="flex items-center gap-1">
            <MapPinHouse className="size-3 text-muted-foreground" />
            Street
          </Label>
          <Input
            value={formData.street ?? ""}
            onChange={(e) => update("street", e.target.value)}
            disabled
          />
        </div>
      </div>
    </div>
  );
}
