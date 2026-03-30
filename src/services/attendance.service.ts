import type { AxiosRequestConfig } from "axios";
import { apiClient, unwrapData, withAuth } from "@/lib/api";
import type {
  AttendanceBySectionResponse,
  GenerateAbsentResponse,
} from "@/types/attendance";

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

export function getAttendanceBySection(
  token: string,
  section: string,
  params?: {
    start_date?: string;
    end_date?: string;
  },
  config?: AxiosRequestConfig,
) {
  return unwrapData<AttendanceBySectionResponse>(
    apiClient.get(
      `/get-attendance-by-section/${section}`,
      withAuthedConfig(token, {
        ...config,
        params: {
          ...(params ?? {}),
          ...(config?.params ?? {}),
        },
      }),
    ),
  );
}

export function generateAbsent(
  token: string,
  date?: string,
) {
  return unwrapData<GenerateAbsentResponse>(
    apiClient.post(
      "/attendance/generate-absent",
      {},
      withAuthedConfig(token, {
        params: date ? { date } : undefined,
      }),
    ),
  );
}
