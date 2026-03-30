import { apiClient, unwrapData, withAuth } from "@/lib/api";

export const GetallSubjects = async (token: string) =>
  unwrapData(apiClient.get("/getall-subject", withAuth(token)));

export const CreateSubject = async (token: string, data: unknown) =>
  unwrapData(apiClient.post("/create-subject", data, withAuth(token)));

export const EditSubject = async (
  token: string,
  subjectId: string,
  data: { name: string; grade_id: number },
) =>
  unwrapData(apiClient.put(`/edit-subject/${subjectId}`, data, withAuth(token)));

export const DeleteSubject = async (token: string, id: number | string) => {
  try {
    return await unwrapData(
      apiClient.post("/delete-subject", { id }, withAuth(token)),
    );
  } catch (error: any) {
    if (error?.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    if (error?.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error("Failed to delete subject.");
  }
};

export const GetTeacherSchedulesByGradeAndSection = async (
  token: string,
  gradeId: string,
  sectionId: string,
) =>
  unwrapData(
    apiClient.get(`/teacher-schedules/${gradeId}/${sectionId}`, withAuth(token)),
  );
