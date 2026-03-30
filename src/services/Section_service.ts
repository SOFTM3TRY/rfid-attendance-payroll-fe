import { apiClient, unwrapData, withAuth } from "@/lib/api";

export const GetAllSections = async (token: string) =>
  unwrapData(apiClient.get("/get-all-sections", withAuth(token)));

export const GetSectionsByGrade = async (token: string, gradeId: string) =>
  unwrapData(apiClient.get(`/get-sections-by-grade/${gradeId}`, withAuth(token)));

export const CreateSection = async (token: string, sectionData: unknown) =>
  unwrapData(apiClient.post("/create-section", sectionData, withAuth(token)));

export const EditSection = async (
  token: string,
  id: string,
  data: unknown,
) => unwrapData(apiClient.put(`/edit-section/${id}`, data, withAuth(token)));

export const getSectionById = async (token: string, id: string) =>
  unwrapData(apiClient.get(`/get-section-by-id/${id}`, withAuth(token)));
