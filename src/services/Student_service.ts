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

export const RegisterRFIDToStudent = async (token: string, id: any, data: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/register-student-by-lrn/${id}`,
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