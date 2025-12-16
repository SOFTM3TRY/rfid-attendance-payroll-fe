import { Grade } from "./grade";

export interface Subject {
  id: number;
  name: string;
  grade_id: number;
  grade: Grade; 
}