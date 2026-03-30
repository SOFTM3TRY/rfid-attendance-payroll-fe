import { apiClient, unwrapData, withAuth } from "@/lib/api";

export const GetStudentDetails = async (token: string) =>
  unwrapData(apiClient.get("/get-all-students", withAuth(token)));

export const CreateStudent = async (token: string, studentData: any) =>
  unwrapData(apiClient.post("/create-student", studentData, withAuth(token)));

export const CountActiveStudents = async (token: string) =>
  unwrapData(apiClient.get("/count-active-students", withAuth(token)));

export const CountByGradeStudents = async (token: string, grade: number) =>
  unwrapData(apiClient.get(`/count-students-by-grade/${grade}`, withAuth(token)));

// export async function UpdateStudent(token: string, studentId: string, data: any) {
//   const response = await axios.put(`/api/update-student/${studentId}`, data, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return response.data;
// }

// export const EditStudent = async (token: string, id: any, data: any) => {
//   try {
//     const response = await axios.put(
//       `${process.env.NEXT_PUBLIC_BASE_URL_API}/update-student/${id}`,
//       data,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

export const EditStudent = async (token: string, id: any, data: any) => {
  return unwrapData(apiClient.put(`/edit-student/${id}`, data, withAuth(token)));
};

export const RegisterRFIDToStudent = async (token: string, lrn: any, data: any) => {
  return unwrapData(
    apiClient.post(`/register-student-by-lrn/${lrn}`, data, withAuth(token)),
  );
}

export const GetStudentDetailsById = async (token: string, id: number) => {
  try {
    return await unwrapData(
      apiClient.get(`/get-student-by-id/${id}`, withAuth(token)),
    );

  } catch (error) {
    throw error;
  }
};

export const GetStudentDetailsByLrn = async (
  token: string,
  lrn: string
) => {
  return unwrapData(apiClient.get(`/get-student-by-lrn/${lrn}`, withAuth(token)));
};

export const CountStudentsPerGrade = async (token: string) => {
  return unwrapData(apiClient.get("/students/count-by-grade", withAuth(token)));
}

export const ChangeStudentStatus = async (token: string, id: string) => {
  try {
    return await unwrapData(
      apiClient.put(`/change-student-status/${id}`, {}, withAuth(token)),
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getStudentAttendanceById = async (token: string, id: number) => {
  try {
    return await unwrapData(
      apiClient.get(`/student-attendanceby-id/${id}`, withAuth(token)),
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const UpdateStudentAvatar = async (
  token: string,
  id: number,
  avatar: File
) => {
  try {
    const formData = new FormData();
    formData.append("avatar", avatar);

    const response = await apiClient.post(
      `/students/avatar/${id}`,
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

export const ChangeStudentPassword = async (
  token: string,
  id: number,
  new_password: string,
  confirm_password: string
) => {
  try {
    const res = await apiClient.post(
      `/students/change-password/${id}`,
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

export const CountRegisteredStudents = async (token: string) =>
  unwrapData(apiClient.get("/students-registered", withAuth(token)));
