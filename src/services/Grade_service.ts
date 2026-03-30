import { apiClient, unwrapData, withAuth } from "@/lib/api";

export const GetallGrades = async (token: string) =>
  unwrapData(apiClient.get("/get-all-grades", withAuth(token)));

export const CreateGrade = async (token: string, gradeData: unknown) =>
  unwrapData(apiClient.post("/create-grade", gradeData, withAuth(token)));

export const GetGradeById = async (token: string, id: string) =>
  unwrapData(apiClient.get(`/get-grade-by-id/${id}`, withAuth(token)));

export const EditGrade = async (
  token: string,
  id: string,
  data: unknown,
) => unwrapData(apiClient.put(`/edit-grade/${id}`, data, withAuth(token)));
