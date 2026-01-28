import axios from "axios";

export const GetallSubjects = async (token: string) => {
  try {
    const response = await axios(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/getall-subject`,
      {
        method: "GET",
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

export const CreateSubject = async (token: string, data: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/create-subject`,
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

export const EditSubject = async (
  token: string,
  subjectId: string,
  data: { name: string; grade_id: number }
) => {
  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_BASE_URL_API}/edit-subject/${subjectId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const DeleteSubject = async (token: string, id: number | string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/delete-subject`,
      { id },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("DeleteYear error:", error);

    if (error?.response?.data?.message) throw new Error(error.response.data.message);
    if (error?.response?.data?.error) throw new Error(error.response.data.error);
    throw new Error("Failed to delete School Year.");
  }
};