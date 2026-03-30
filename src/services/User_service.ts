import { apiClient, unwrapData, withAuth } from "@/lib/api";
import type { AxiosRequestConfig } from "axios";
import { type User } from "@/types/Login";

export const login = async (user: User) =>
  unwrapData(
    apiClient.post("/login", {
      email: user.email,
      password: user.password,
    }),
  );

export const userdetails = async (
  token: string,
  config?: AxiosRequestConfig,
) =>
  unwrapData(
    apiClient.get("/user-details", {
      ...withAuth(token),
      ...config,
    }),
  );

export const logout = async (token: string) =>
  unwrapData(apiClient.post("/logout", {}, withAuth(token)));

export const checkToken = async (token: string) =>
  unwrapData(apiClient.post("/check-token", {}, withAuth(token)));
