import axios from "axios";

export const apihealth = async () => {
  const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/health`
    );
    return response;
};
