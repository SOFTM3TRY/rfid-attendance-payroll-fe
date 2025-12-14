import axios from "axios";

export const GetallYears = async (token: string) => {
  try {
    const response = await axios(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/showall-years`,
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

export const CreateYear = async (token: string, data: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/create-year`,
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

export const UpdateYear = async (
  token: string,
  yearId: string,
  data: { years: string }
) => {
  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_BASE_URL_API}/update-year/${yearId}`,
    {
      id: yearId,     
      years: data.years,    
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
