// types/Teacher.ts

import { Grade } from "./grade";
import { ClassSection } from "./ClassSection";

export interface TeacherResponse {
  status: boolean;
  data: TeacherData[];
}

export interface TeacherData {
  id: number;
  avatar: string | null;
  employee_no: string;
  rfid_uid: string | null;

  first_name: string;
  last_name: string;
  middle_name: string | null;
  suffix: string | null;

  contact_no: string;
  status: "0" | "1"; 
  role_id: number;
  email: string;

  additional_info: AdditionalInfo | null;

  grade: Grade | null;      
  section: ClassSection | null; 
}

export interface AdditionalInfo {
  grade?: string;
  section?: string | number;

  region: string;
  province: string;
  city: string;
  barangay: string;
  street: string;

  birth_date: string;
  birth_place: string;
  gender: string;
  school_year: string;

  emergency_contact: string;
  emergency_fname: string;
  emergency_lname: string;
  emergency_mname: string;
  emergency_relationship: string;
}
