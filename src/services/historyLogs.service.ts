import type { AxiosRequestConfig } from "axios";
import { apiClient, unwrapData, withAuth } from "@/lib/api";
import type { HistoryLogResponse, HistoryLogsResponse } from "@/types/history-log";

function withAuthedConfig(
  token: string,
  config?: AxiosRequestConfig,
): AxiosRequestConfig {
  const authConfig = withAuth(token);

  return {
    ...config,
    ...authConfig,
    headers: {
      ...(authConfig.headers ?? {}),
      ...(config?.headers ?? {}),
    },
  };
}

export function getHistoryLogs(
  token: string,
  config?: AxiosRequestConfig,
) {
  return unwrapData<HistoryLogsResponse>(
    apiClient.get("/history-logs", withAuthedConfig(token, config)),
  );
}

export function getHistoryLogsByUser(
  token: string,
  userId: number | string,
  config?: AxiosRequestConfig,
) {
  return unwrapData<HistoryLogsResponse>(
    apiClient.get(
      `/history-logs/user/${userId}`,
      withAuthedConfig(token, config),
    ),
  );
}

export function getHistoryLogById(
  token: string,
  id: number | string,
  config?: AxiosRequestConfig,
) {
  return unwrapData<HistoryLogResponse>(
    apiClient.get(`/history-logs/${id}`, withAuthedConfig(token, config)),
  );
}
