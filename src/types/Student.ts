import { Grade } from "./grade";
import { ClassSection } from "./ClassSection";
import { Subject } from "./subject";

export interface Student {
  id: number;
  student_no: string | null;
  lrn: string;
  rfid_uid: string | null;

  first_name: string;
  middle_name: string;
  last_name: string;
  suffix: string | null;

  contact_no: string | null;
  email: string;
  birth_date: string; // ISO date
  birth_place: string;
  gender: string;
  address: string | null;

  status: string;
  role_id: number;
  school_year: string;

  grade_id: string;
  section_id: string;

  last_school_attend: string;
  additional_info: AdditionalInfo;

  grade: Grade;
  section: ClassSection;
  subjects: Subject[];
}

export interface AdditionalInfo {
  city: string | null;
  region: string | null;
  street: string | null;
  barangay: string | null;
  province: string | null;

  relationship: string | null;

  guardian_first_name: string;
  guardian_middle_name: string | null;
  guardian_last_name: string;
  guardian_suffix: string | null;
  guardian_email: string;
  guardian_contact: string;
  guardian_occupation: string;
}

