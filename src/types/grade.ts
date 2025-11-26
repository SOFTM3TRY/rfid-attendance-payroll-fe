export interface Grade {
  id: number;
  grade_level: string;
  description: string | null;
  status: "active" | "inactive";
}