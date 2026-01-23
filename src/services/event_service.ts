import axios from "axios";

export const GetEvents = async (token: string) => {
  try {
    const response = await axios(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/get-events`,
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

export const CreateEvent = async (token: string, data: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/create-event`,
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

// export const UpdateYear = async (
//   token: string,
//   yearId: string,
//   data: { years: string }
// ) => {
//   const response = await axios.put(
//     `${process.env.NEXT_PUBLIC_BASE_URL_API}/update-year/${yearId}`,
//     {
//       id: yearId,     
//       years: data.years,    
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

//   return response.data;
// };
