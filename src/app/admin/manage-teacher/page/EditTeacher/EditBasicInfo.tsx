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
    token as string,
  );
  const { data: YearsData, isLoading: isLoadingYearsData } = useYear(
    token as string,
  );

  const SectionID = formData.grade;
  const { data: SectionsData, isLoading: isLoadingSectionsData } = useSection(
    token as string,
    SectionID,
  );

  const handleChange = (name: string, value: string) => {
    setFormData((prev: any) =>
      name === "grade"
        ? { ...prev, [name]: value, section: "" }
        : { ...prev, [name]: value },
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
    <div className="bg-accent/20 p-5 rounded-xl w-full space-y-5">
      {/* Primary Information */}
      <div>
        <h1 className="text-sm font-bold flex items-center mb-3">
          <ShieldUser className="text-blue-500 mr-1 size-4" /> Primary
          Information
        </h1>

        <div className="grid grid-cols-4 gap-5 my-5">
          <div className="grid gap-2">
            <Label htmlFor="employee_no">
              <GraduationCap className="text-muted-foreground size-3" />
              Employee No.
            </Label>
            <Input
              id="employee_no"
              placeholder="Employee Number"
              value={formData.employee_no ?? ""}
              onChange={(e) => update("employee_no", e.target.value)}
              disabled
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="school_year">
              <CalendarDays className="text-muted-foreground size-3" />
              School Year
            </Label>
            <div className="flex gap-2">
              <Select
                value={formData.school_year || ""}
                onValueChange={(value) => handleChange("school_year", value)}
                disabled={loading || isLoadingYearsData}
              >
                <SelectTrigger className="border py-1 px-3 rounded-sm w-56">
                  <SelectValue placeholder="Select School Year" />
                </SelectTrigger>

                <SelectContent>
                  {YearsData?.data?.map((year: any) => (
                    <SelectItem key={year.years} value={String(year.years)}>
                      {year.years}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="grade">
              <Book className="text-muted-foreground size-3" /> Grade
            </Label>
            <Select
              value={formData.grade}
              onValueChange={(value) => handleChange("grade", value)}
              disabled={isLoadingYearsData || isLoadingGradesData}
            >
              <SelectTrigger className="border  py-1 px-3 rounded-sm w-56">
                <SelectValue placeholder="Select Grade" />
              </SelectTrigger>
              <SelectContent>
                {GradesData?.data
                  .filter((grade : any) => grade.status === "active")
                  .map((grade: any) => (
                    <SelectItem key={grade.id} value={String(grade.id)}>
                      {grade.grade_level}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="section">
              <CircleSmall className="text-muted-foreground size-3" /> Section
            </Label>
            <div className="flex gap-2">
              <Input
                id="section"
                placeholder="Section"
                value={formData.section_name ?? ""}
                onChange={(e) => update("section_name", e.target.value)}
                disabled
              />
              <Select
                value={formData.section}
                onValueChange={(value) => handleChange("section", value)}
                disabled={loading || !formData.grade || isLoadingSectionsData}
              >
                <SelectTrigger className="border  py-1 px-3 rounded-sm w-56">
                  <SelectValue placeholder="Select Section" />
                </SelectTrigger>
                <SelectContent>
                  {SectionsData?.data
                    .filter((section: any) => section.status === 1)
                    .map((section: any) => (
                      <SelectItem key={section.id} value={section.id}>
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
          <UserLock className="text-yellow-500 mr-1 size-4" /> Personal
          Information
        </h1>

        <div className="grid grid-cols-4 gap-5 mt-5">
          <div className="grid gap-2">
            <Label htmlFor="first_name">
              <User className="text-muted-foreground size-3" />
              First Name
            </Label>
            <Input
              id="first_name"
              placeholder="First Name"
              value={formData.first_name ?? ""}
              onChange={(e) => update("first_name", e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="middle_name">
              <User className="text-muted-foreground size-3" />
              Middle Name
            </Label>
            <Input
              id="middle_name"
              placeholder="Middle Name"
              value={formData.middle_name ?? ""}
              onChange={(e) => update("middle_name", e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="last_name">
              <User className="text-muted-foreground size-3" />
              Last Name
            </Label>
            <Input
              id="last_name"
              placeholder="Last Name"
              value={formData.last_name ?? ""}
              onChange={(e) => update("last_name", e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="suffix">
              <User className="text-muted-foreground size-3" />
              Suffix
            </Label>
            <Select
              value={formData.suffix || ""}
              onValueChange={(value) => handleChange("suffix", value)}
              disabled={loading}
            >
              <SelectTrigger className="border  py-1 px-3 rounded-sm w-56">
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

          <div className="grid gap-2">
            <Label htmlFor="birth_date">
              <Calendar className="text-muted-foreground size-3" /> Birth Date
            </Label>
            <Input
              id="birth_date"
              placeholder="Birth Date"
              value={formData.birth_date ?? ""}
              onChange={(e) => update("birth_date", e.target.value)}
              type="date"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="birth_place">
              <MapPinHouse className="text-muted-foreground size-3" /> Birth
              Place
            </Label>
            <Input
              id="birth_place"
              placeholder="Birth Place"
              value={formData.birth_place ?? ""}
              onChange={(e) => update("birth_place", e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="gender">Gender</Label>
            <Select
              value={formData.gender || ""}
              onValueChange={(value) => handleChange("gender", value)}
              disabled={loading}
            >
              <SelectTrigger className="border  py-1 px-3 rounded-sm w-56">
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

          <div className="grid gap-2">
            <Label htmlFor="contact_no">
              <Phone className="text-muted-foreground size-3" /> Contact No.
            </Label>
            <Input
              id="contact_no"
              placeholder="Contact Number"
              value={formData.contact_no ?? ""}
              onChange={(e) => update("contact_no", e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">
              <Mail className="text-muted-foreground size-3" /> Email
            </Label>
            <Input
              id="email"
              placeholder="Email"
              value={formData.email ?? ""}
              onChange={(e) => update("email", e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
