import axios, { type AxiosRequestConfig } from "axios";

const apiBaseUrl = process.env.NEXT_PUBLIC_BASE_URL_API;
const apiStatusBaseUrl =
  process.env.NEXT_PUBLIC_BASE_URL_API_STATUS ?? apiBaseUrl;

function assertBaseUrl(baseUrl: string | undefined, label: string) {
  if (!baseUrl) {
    throw new Error(`${label} is not configured.`);
  }

  return baseUrl;
}

export const apiClient = axios.create({
  baseURL: assertBaseUrl(apiBaseUrl, "NEXT_PUBLIC_BASE_URL_API"),
  headers: {
    Accept: "application/json",
  },
});

export const apiStatusClient = axios.create({
  baseURL: assertBaseUrl(
    apiStatusBaseUrl,
    "NEXT_PUBLIC_BASE_URL_API_STATUS or NEXT_PUBLIC_BASE_URL_API",
  ),
  headers: {
    Accept: "application/json",
  },
});

export function withAuth(token?: string | null): AxiosRequestConfig {
  if (!token) {
    return {};
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export function unwrapData<T = any>(promise: Promise<{ data: T }>): Promise<T> {
  return promise.then((response) => response.data);
}
