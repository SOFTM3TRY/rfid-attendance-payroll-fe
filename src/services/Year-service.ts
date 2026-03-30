import { apiClient, unwrapData, withAuth } from "@/lib/api";

export const GetallYears = async (token: string) =>
  unwrapData(apiClient.get("/showall-years", withAuth(token)));

export const CreateYear = async (token: string, data: unknown) =>
  unwrapData(apiClient.post("/create-year", data, withAuth(token)));

export const UpdateYear = async (
  token: string,
  yearId: string,
  data: { years: string },
) =>
  unwrapData(
    apiClient.put(
      `/update-year/${yearId}`,
      {
        id: yearId,
        years: data.years,
      },
      withAuth(token),
    ),
  );

export const DeleteYear = async (token: string, id: number | string) => {
  try {
    return await unwrapData(apiClient.post("/delete-year", { id }, withAuth(token)));
  } catch (error: any) {
    if (error?.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    if (error?.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error("Failed to delete school year.");
  }
};
