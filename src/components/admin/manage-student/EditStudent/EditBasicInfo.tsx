import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ShieldUser,
  Calendar,
  GraduationCap,
  Book,
  User,
  UserLock,
  CalendarDays,
  MapPinHouse,
  CircleSmall,
  Phone,
  Mail,
  Building2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import { useGrade } from "@/hooks/useGrade";
import { useSection } from "@/hooks/useSection";
import { useYear } from "@/hooks/useYear";

export default function EditBasicInfo({
  formData,
  setFormData,
  errors,
  setErrors,
  loading,
}: any) {
  const update = (k: string, v: string) =>
    setFormData((prev: any) => ({ ...prev, [k]: v }));

  const { token } = useAuth();

  const { data: GradesData, isLoading: isLoadingGradesData } = useGrade(
    token as string
  );

  const { data: YearsData, isLoading: isLoadingYearsData } = useYear(
    token as string
  );

  // Correct Section ID (should use grade_id)
  const SectionID = formData.grade_id;

  const { data: SectionsData, isLoading: isLoadingSectionsData } = useSection(
    token as string,
    SectionID
  );

  const handleChange = (name: string, value: string) => {
    setFormData((prev: any) =>
      name === "grade_id"
        ? { ...prev, grade_id: value, section_id: "" } // reset section when grade changes
        : { ...prev, [name]: value }
    );

    setErrors((prev: any) => {
      const n = { ...prev };
      delete n[name];
      return n;
    });
  };

  const suffixOptions = ["Jr.", "Sr.", "I", "II", "III", "IV", "V"];
  const genderOptions = ["Male", "Female", "Other"];

  return (
    <div className="bg-zinc-100 dark:bg-zinc-900 p-5 rounded-xl w-full space-y-5">
      {/* Primary Information */}
      <div>
        <h1 className="text-sm font-bold flex items-center mb-3">
          <ShieldUser className="text-blue-500 mr-1 size-4" /> Primary Information
        </h1>

        <div className="grid grid-cols-4 gap-5 my-5">
          <div className="grid gap-2">
            <Label htmlFor="employee_no">
              <GraduationCap className="text-muted-foreground size-3" />
              LRN
            </Label>
            <Input
              id="employee_no"
              value={formData.lrn ?? ""}
              disabled
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="school_year">
              <CalendarDays className="text-muted-foreground size-3" />
              School Year
            </Label>
            <Input
              id="school_year"
              value={formData.school_year ?? ""}
              onChange={(e) => update("school_year", e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="grade">
              <Book className="text-muted-foreground size-3" /> Grade
            </Label>
            <Select
              value={formData.grade_id || ""}
              onValueChange={(value) => handleChange("grade_id", value)}
              disabled={isLoadingYearsData || isLoadingGradesData}
            >
              <SelectTrigger className="border dark:bg-zinc-900 py-1 px-3 rounded-sm w-56">
                <SelectValue placeholder="Select Grade" />
              </SelectTrigger>
              <SelectContent>
                {GradesData?.data.map((grade: any) => (
                  <SelectItem key={grade.id} value={String(grade.id)}>
                    {grade.grade_level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* FIXED SECTION BLOCK */}
          <div className="grid gap-2">
            <Label htmlFor="section">
              <CircleSmall className="text-muted-foreground size-3" /> Section
            </Label>

            <div className="flex gap-2">
              <Input
                id="section"
                disabled
                value={
                  formData.section_id ?? ""
                }
              />

              <Select
                value={formData.section_id || ""}
                onValueChange={(value) => handleChange("section_id", value)}
                disabled={loading || !formData.grade_id || isLoadingSectionsData}
              >
                <SelectTrigger className="border dark:bg-zinc-900 py-1 px-3 rounded-sm w-56">
                  <SelectValue placeholder="Select Section" />
                </SelectTrigger>
                <SelectContent>
                  {SectionsData?.data.map((section: any) => (
                    <SelectItem key={section.id} value={String(section.id)}>
                      {section.section_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div>
        <h1 className="text-sm font-bold flex items-center mb-3">
          <UserLock className="text-yellow-500 mr-1 size-4" /> Personal Information
        </h1>

        <div className="grid grid-cols-4 gap-5 mt-5">
          {/* names */}
          <div className="grid gap-2">
            <Label htmlFor="first_name">
              <User className="text-muted-foreground size-3" />First Name
            </Label>
            <Input
              id="first_name"
              value={formData.first_name ?? ""}
              onChange={(e) => update("first_name", e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="middle_name"><User className="text-muted-foreground size-3" />Middle Name</Label>
            <Input
              id="middle_name"
              value={formData.middle_name ?? ""}
              onChange={(e) => update("middle_name", e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="last_name"><User className="text-muted-foreground size-3" />Last Name</Label>
            <Input
              id="last_name"
              value={formData.last_name ?? ""}
              onChange={(e) => update("last_name", e.target.value)}
            />
          </div>

          {/* suffix */}
          <div className="grid gap-2">
            <Label htmlFor="suffix"><User className="text-muted-foreground size-3" />Suffix</Label>
            <Select
              value={formData.suffix || ""}
              onValueChange={(value) => handleChange("suffix", value)}
            >
              <SelectTrigger className="border dark:bg-zinc-900 py-1 px-3 rounded-sm w-56">
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
          </div>

          {/* birth */}
          <div className="grid gap-2">
            <Label htmlFor="birth_date"><CalendarDays className="text-muted-foreground size-3" />Birth Date</Label>
            <Input
              type="date"
              id="birth_date"
              value={formData.birth_date ?? ""}
              onChange={(e) => update("birth_date", e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="birth_place"><MapPinHouse className="text-muted-foreground size-3" />Birth Place</Label>
            <Input
              id="birth_place"
              value={formData.birth_place ?? ""}
              onChange={(e) => update("birth_place", e.target.value)}
            />
          </div>

          {/* gender */}
          <div className="grid gap-2">
            <Label htmlFor="gender"><CircleSmall className="text-muted-foreground size-3" />Gender</Label>
            <Select
              value={formData.gender || ""}
              onValueChange={(value) => handleChange("gender", value)}
            >
              <SelectTrigger className="border dark:bg-zinc-900 py-1 px-3 rounded-sm w-56">
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
          </div>

          {/* contact */}
          <div className="grid gap-2">
            <Label htmlFor="contact_no"><Building2 className="text-muted-foreground size-3" />Last School Attended</Label>
            <Input
              id="contact_no"
              value={formData.last_school_attend ?? ""}
              onChange={(e) => update("contact_no", e.target.value)}
            />
          </div>

          {/* email */}
          <div className="grid gap-2">
            <Label htmlFor="email"><Mail className="text-muted-foreground size-3" />Email</Label>
            <Input
              id="email"
              value={formData.email ?? ""}
              onChange={(e) => update("email", e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
