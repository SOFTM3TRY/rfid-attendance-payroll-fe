export interface Grade {
  id: number;
  grade_level: string;
  description: string | null;
  schedule: string | null;
  status: "active" | "inactive";
}
