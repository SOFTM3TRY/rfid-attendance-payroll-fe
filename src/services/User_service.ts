 
import axios from "axios";
import { User } from "@/types/Login";


export const login = async (user: User) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/login`,
      {
        email: user.email,
        password: user.password,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
