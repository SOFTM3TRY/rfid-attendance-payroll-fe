import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  User,
  UserCog,
  UserCheck,
  UserX,
  ShieldUser,
  Calendar,
  GraduationCap,
  Book,
  UserLock,
  CalendarDays,
  MapPinHouse,
  CircleSmall,
  School,
  CircleX,
  Map,
  SquareUserRound,
  Mail,
  Phone,
} from "lucide-react";
// import { Label } from "recharts";

export default function ShowProfile({
  open,
  setOpen,
  row,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  row: any;
}) {
  const data = row.original || {};
  const fullName = [
    data.last_name,
    data.first_name,
    data.middle_name,
    data.suffix,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        className="bottom-0 h-full rounded-t-md overflow-y-auto p-3"
        side="bottom"
      >
        <SheetHeader>
          <SheetDescription className="flex items-center text-center text-md">
            <User className="mr-1 w-4 h-4 text-teal-500" />
            Student Profile
            <span
              className={`text-xs ml-2 w-20 h-5 flex items-center justify-center rounded-full font-medium ${
                data.status == 1
                  ? "bg-green-200 shadow text-green-900 dark:bg-green-100 dark:text-green-800"
                  : " bg-red-200 shadow text-red-900 dark:bg-red-100 dark:text-red-800"
              }`}
            >
              {data.status == 1 ? "Active" : "Inactive"}
              <span
                className={`ml-1 ${
                  data.status == 1 ? "text-green-800" : "text-red-800"
                }`}
              >
                {data.status == 1 ? (
                  <UserCheck className="w-4 h-4" />
                ) : (
                  <UserX className="w-4 h-4" />
                )}
              </span>
            </span>
          </SheetDescription>
          <SheetTitle className="uppercase">{fullName}</SheetTitle>
          <SheetDescription>S.Y : {data.school_year}</SheetDescription>
        </SheetHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
          <div className="col-span-1 rounded-md">
            <div className="sticky top-0 shadow-lg dark:border-b-4 dark:border-black z-100 w-full py-5 flex justify-start rounded-md items-center px-5 gap-5 bg-zinc-100 dark:bg-zinc-900">
              <Avatar className="h-30 w-30 flex-shrink-0">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xl font-semibold leading-none uppercase">
                  {fullName}
                </p>
                <p className="text-sm my-1">
                  LRN : {data.lrn}{" "}
                  <span className="ml-3 text-blue-800 font-medium dark:text-blue-200">
                    SY : {data.school_year}
                  </span>
                </p>
                <div className="flex gap-2 mt-2">
                  <span className="uppercase font-medium text-sm px-3 h-6 flex items-center justify-center rounded-full bg-green-200 shadow text-green-900 dark:bg-green-100 dark:text-green-800">
                    Grade : {data.grade}
                  </span>
                  <span className="uppercase font-medium text-sm px-3 h-6 flex items-center justify-center rounded-full bg-green-200 shadow text-green-900 dark:bg-green-100 dark:text-green-800">
                    Section : {data.section}
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full py-5 flex flex-col gap-4 px-5 mt-5 rounded-md bg-zinc-100 dark:bg-zinc-900">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1 md:col-span-2 mb-3">
                  <p className="text-sm font-medium flex items-center">
                    <ShieldUser className="mr-1 w-4 h-4 text-blue-500" />
                    Primary Information
                  </p>
                </div>
                <div>
                  <Label htmlFor="lrn">
                    <ShieldUser className="w-4 h-4 text-blue-500" />
                    LRN
                  </Label>
                  <Input id="lrn" value={data.lrn || ""} disabled />
                </div>
                <div>
                  <Label htmlFor="school_year">
                    <Calendar className="w-4 h-4 text-teal-500" />
                    School Year
                  </Label>
                  <Input
                    id="school_year"
                    value={data.school_year || ""}
                    disabled
                  />
                </div>

                <div className="mt-2">
                  <Label htmlFor="grade">
                    <GraduationCap className="w-4 h-4 text-teal-500" />
                    Grade
                  </Label>
                  <Input id="grade" value={data.grade || ""} disabled />
                </div>
                <div className="mt-2">
                  <Label htmlFor="section">
                    <Book className="w-4 h-4 text-teal-500" />
                    Section
                  </Label>
                  <Input id="section" value={data.section || ""} disabled />
                </div>

                <div className="col-span-1 md:col-span-2 mt-5 mb-3">
                  <p className="text-sm font-medium flex items-center">
                    <UserLock className="mr-1 w-4 h-4 text-yellow-500" />
                    Basic Information
                  </p>
                </div>

                <div>
                  <Label htmlFor="first_name">
                    <User className="w-4 h-4 text-green-500" />
                    First Name
                  </Label>
                  <Input
                    id="first_name"
                    value={data.first_name || ""}
                    disabled
                  />
                </div>
                <div>
                  <Label htmlFor="middle_name">
                    <User className="w-4 h-4 text-green-500" />
                    Middle Name
                  </Label>
                  <Input
                    id="middle_name"
                    value={data.middle_name || ""}
                    disabled
                  />
                </div>
                <div className="mt-2">
                  <Label htmlFor="last_name">
                    <User className="w-4 h-4 text-green-500" />
                    Last Name
                  </Label>
                  <Input id="last_name" value={data.last_name || ""} disabled />
                </div>
                <div className="mt-2">
                  <Label htmlFor="suffix">
                    <User className="w-4 h-4 text-green-500" />
                    Suffix
                  </Label>
                  <Input id="suffix" value={data.suffix || ""} disabled />
                </div>

                <div className="mt-2">
                  <Label htmlFor="birth_date">
                    <CalendarDays className="w-4 h-4 text-indigo-500" />
                    Birth Date
                  </Label>
                  <Input
                    id="birth_date"
                    value={data.birth_date || ""}
                    disabled
                  />
                </div>
                <div className="mt-2">
                  <Label htmlFor="birth_place">
                    <MapPinHouse className="w-4 h-4 text-red-500" />
                    Birth Place
                  </Label>
                  <Input
                    id="birth_place"
                    value={data.birth_place || ""}
                    disabled
                  />
                </div>
                <div className="mt-2">
                  <Label htmlFor="gender">
                    <CircleSmall className="w-4 h-4 text-teal-500" />
                    Gender
                  </Label>
                  <Input id="gender" value={data.gender || ""} disabled />
                </div>
                <div className="mt-2">
                  <Label htmlFor="last_school_attend">
                    <School className="w-4 h-4 text-green-500" />
                    Last School Attended
                  </Label>
                  <Input
                    id="last_school_attend"
                    value={data.last_school_attend || ""}
                    disabled
                  />
                </div>
              </div>

              {/* Additional Info */}
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="col-span-1 md:col-span-2 mt-5 mb-3">
                    <p className="text-sm font-medium flex items-center">
                      <Map className="mr-1 w-4 h-4 text-red-500" />
                      Address
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="region"><MapPinHouse className="w-4 h-4 text-red-500" />Region</Label>
                    <Input
                      id="region"
                      value={data.additional_info?.region || ""}
                      disabled
                    />
                  </div>
                  <div>
                    <Label htmlFor="province"><MapPinHouse className="w-4 h-4 text-red-500" />Province</Label>
                    <Input
                      id="province"
                      value={data.additional_info?.province || ""}
                      disabled
                    />
                  </div>
                  <div className="mt-2">
                    <Label htmlFor="city"><MapPinHouse className="w-4 h-4 text-red-500" />City</Label>
                    <Input
                      id="city"
                      value={data.additional_info?.city || ""}
                      disabled
                    />
                  </div>
                  <div className="mt-2">
                    <Label htmlFor="barangay"><MapPinHouse className="w-4 h-4 text-red-500" />Barangay</Label>
                    <Input
                      id="barangay"
                      value={data.additional_info?.barangay || ""}
                      disabled
                    />
                  </div>
                  <div className="col-span-1 md:col-span-2 mt-2">
                    <Label htmlFor="street"><MapPinHouse className="w-4 h-4 text-red-500" />Street</Label>
                    <Input
                      id="street"
                      value={data.additional_info?.street || ""}
                      disabled
                    />
                  </div>

                  <div className="col-span-1 md:col-span-2 mt-5 mb-3">
                    <p className="text-sm font-medium flex items-center">
                      <User className="mr-1 w-4 h-4 text-teal-500" />
                      Guardian Information
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="guardian_first_name">
                      <User className="w-4 h-4 text-green-500" />Guardian First Name
                    </Label>
                    <Input
                      id="guardian_first_name"
                      value={data.additional_info?.guardian_first_name || ""}
                      disabled
                    />
                  </div>
                  <div>
                    <Label htmlFor="guardian_middle_name">
                      <User className="w-4 h-4 text-green-500" />Guardian Middle Name
                    </Label>
                    <Input
                      id="guardian_middle_name"
                      value={data.additional_info?.guardian_middle_name || ""}
                      disabled
                    />
                  </div>
                  <div className="mt-2">
                    <Label htmlFor="guardian_last_name">
                      <User className="w-4 h-4 text-green-500" />Guardian Last Name
                    </Label>
                    <Input
                      id="guardian_last_name"
                      value={data.additional_info?.guardian_last_name || ""}
                      disabled
                    />
                  </div>
                  <div className="mt-2">
                    <Label htmlFor="guardian_suffix"><User className="w-4 h-4 text-green-500" />Guardian Suffix</Label>
                    <Input
                      id="guardian_suffix"
                      value={data.additional_info?.guardian_suffix || ""}
                      disabled
                    />
                  </div>
                  <div className="mt-2">
                    <Label htmlFor="guardian_contact"><Phone className="w-4 h-4 text-blue-500" />Guardian Contact</Label>
                    <Input
                      id="guardian_contact"
                      value={data.additional_info?.guardian_contact || ""}
                      disabled
                    />
                  </div>
                  <div className="mt-2">
                    <Label htmlFor="guardian_email"><Mail className="w-4 h-4 text-yellow-500" />Guardian Email</Label>
                    <Input
                      id="guardian_email"
                      value={data.additional_info?.guardian_email || ""}
                      disabled
                    />
                  </div>
                  <div className="mt-2">
                    <Label htmlFor="guardian_occupation">
                      <SquareUserRound className="w-4 h-4 text-teal-500" />Guardian Occupation
                    </Label>
                    <Input
                      id="guardian_occupation"
                      value={data.additional_info?.guardian_occupation || ""}
                      disabled
                    />
                  </div>
                  <div className="mt-2">
                    <Label htmlFor="relationship"><UserCog className="w-4 h-4 text-green-500" />Relationship</Label>
                    <Input
                      id="relationship"
                      value={data.additional_info?.relationship || ""}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 rounded-md bg-zinc-100 dark:bg-zinc-900"></div>
          <pre className="whitespace-pre-wrap hidden">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
        <SheetFooter className="fixed bottom-5 right-5">
          <SheetClose asChild>
            <Button className="w-40" variant="outline" onClick={() => setOpen(false)}>
              <CircleX /> Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
