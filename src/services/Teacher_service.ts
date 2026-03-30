import { apiClient, unwrapData, withAuth } from "@/lib/api";

export const CountTeacherActive = async (token: string) =>
  unwrapData(apiClient.get("/count-active-teachers", withAuth(token)));

export const CreateTeacher = async (token: string, teacherData: any) =>
  unwrapData(apiClient.post("/employee-register", teacherData, withAuth(token)));

export const GetAllAdmin = async (token: string) =>
  unwrapData(apiClient.get("/get-all-admins", withAuth(token)));

export const GetAllTeachers = async (token: string) =>
  unwrapData(apiClient.get("/get-all-teachers", withAuth(token)));

export const GetTeacherDetails = async (token: string, id: string) =>
  unwrapData(apiClient.get(`/get-teacher-by-id/${id}`, withAuth(token)));

export const GetTeacherProfile = async (token: string, id: string) =>
  unwrapData(apiClient.get(`/get-teacher-profile/${id}`, withAuth(token)));

export const EditTeacher = async (token: string, id: string, data: any) =>
  unwrapData(apiClient.put(`/update-employee/${id}`, data, withAuth(token)));

export const ChangeTeacherPassword = async (
  token: string,
  id: number,
  new_password: string,
  confirm_password: string
) => {
  try {
    const res = await apiClient.post(
      `/change-password/${id}`,
      { new_password, confirm_password },
      withAuth(token)
    );

    return res.data;
  } catch (error: any) {
    console.error("Change Password Error:", error);

    // Laravel validation / server errors
    if (error?.response?.data) {
      const msg =
        error.response.data.message ||
        error.response.data.error ||
        (typeof error.response.data === "string" ? error.response.data : null);

      throw new Error(msg || "Failed to change password.");
    }

    // Network or unknown
    throw new Error("Failed to change password.");
  }
};

export const UpdateTeacherAvatar = async (
  token: string,
  id: number,
  avatar: File
) => {
  try {
    const formData = new FormData();
    formData.append("avatar", avatar);

    const response = await apiClient.post(
      `/employee/avatar/${id}`,
      formData,
      {
        ...withAuth(token),
        headers: {
          ...withAuth(token).headers,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Avatar Upload Error:", error);

    if (error.response) {
      throw new Error(
        error.response.data?.message ||
          error.response.data?.error ||
          "Server error while uploading avatar."
      );
    }
    if (error.request) {
      throw new Error("No response from server. Check backend connection.");
    }
    throw new Error("Unexpected error occurred.");
  }
};

export const CreateTeacherSubject = async (
  token: string,
  payload: {
    user_id: string;
    subject_name: string;
    grade_id: string;
    section_id: string;
    schedule: string;
    schedule_day: string;
  }
) => {
  try {
    const res = await apiClient.post("/create-teacher-subject", payload, {
      ...withAuth(token),
      headers: {
        ...withAuth(token).headers,
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (error: any) {
    console.error("CreateTeacherSubject Error:", error);

    throw new Error(
      error?.response?.data?.error?.subject_name?.[0] ||
        error?.response?.data?.error?.message ||
        error?.response?.data?.message ||
        "Failed to create teacher subject."
    );
  }
};

export const getHistoryLogsByUser = async (token: string, id: number) =>
  unwrapData(apiClient.get(`/history-logs/user/${id}`, withAuth(token)));

export const getHistoryLogs = async (token: string) =>
  unwrapData(apiClient.get("/history-logs", withAuth(token)));
