import { apiClient, unwrapData, withAuth } from "@/lib/api";

export const GetEvents = async (token: string) =>
  unwrapData(apiClient.get("/get-events", withAuth(token)));

export const CreateEvent = async (token: string, data: unknown) =>
  unwrapData(apiClient.post("/create-event", data, withAuth(token)));

export const UpdateEvent = async (
  token: string,
  id: number | string,
  data: unknown,
) => unwrapData(apiClient.post(`/update-event/${id}`, data, withAuth(token)));

export const DeleteEvent = async (token: string, id: number | string) =>
  unwrapData(apiClient.delete(`/delete-event/${id}`, withAuth(token)));
