import axios from "axios";

export const GetStudentDetails = async (token: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/get-all-students`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const CreateStudent = async (token: string, studentData: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/create-student`,
      studentData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const CountActiveStudents = async (token: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/count-active-students`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const CountByGradeStudents = async (token: string, grade: number) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/count-students-by-grade/${grade}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

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
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/edit-student/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const RegisterRFIDToStudent = async (token: string, lrn: any, data: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/register-student-by-lrn/${lrn}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const GetStudentDetailsById = async (token: string, id: number) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL_API}/get-student-by-id/${id}`;
    
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;

  } catch (error) {
    throw error;
  }
};

export const GetStudentDetailsByLrn = async (
  token: string,
  lrn: string
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL_API}/get-student-by-lrn/${lrn}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.json();
};

export const CountStudentsPerGrade = async (token: string) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL_API}/students/count-by-grade`;
  
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
}

export const ChangeStudentStatus = async (token: string, id: string) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/change-student-status/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getStudentAttendanceById = async (token: string, id: number) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/student-attendanceby-id/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
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

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/students/avatar/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
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
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/students/change-password/${id}`,
      { new_password, confirm_password },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
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

export const CountRegisteredStudents = async (token: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/students-registered`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}