import axios from "axios";

export const CountTeacherActive = async (token: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/count-active-teachers`,
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

export const CreateTeacher = async (token: string, teacherData: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/employee-register`,
      teacherData,
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

export const GetAllAdmin = async (token: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/get-all-admins`,
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

export const GetAllTeachers = async (token: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/get-all-teachers`,
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

export const GetTeacherDetails = async (token: string, id: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/get-teacher-by-id/${id}`,
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

export const GetTeacherProfile = async (token: string, id: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/get-teacher-profile/${id}`,
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

export const EditTeacher = async (token: string, id: string, data: any) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/update-employee/${id}`,
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

export const ChangeTeacherPassword = async (
  token: string,
  id: number,
  new_password: string,
  confirm_password: string
) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/change-password/${id}`,
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

export const UpdateTeacherAvatar = async (
  token: string,
  id: number,
  avatar: File
) => {
  try {
    const formData = new FormData();
    formData.append("avatar", avatar);

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/employee/avatar/${id}`,
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

export const CreateTeacherSubject = async (
  token: string,
  payload: {
    user_id: string;
    subject_name: string;
    grade_id: string;
    schedule: string;
    schedule_day: string;
  }
) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL_API}/create-teacher-subject`;

    const res = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
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

