import { apiClient, unwrapData, withAuth } from "@/lib/api";

export type AttendanceChartRange = "7d" | "30d" | "90d";

export type AttendanceChartItem = {
  date: string;
  present: number;
  late: number;
  absent: number;
};

export type AttendanceBySectionItem = {
  id: number;
  lrn: string;
  grade: string;
  section: string;
  fullname: string;
  status: string;
  time_in: string | null;
  time_out: string | null;
  date: string;
};

export type AttendanceBySectionResponse = {
  status: boolean;
  data: AttendanceBySectionItem[];
};

export type GenerateAbsentResponse = {
  status: boolean;
  message: string;
  date: string;
  created: number;
  skipped: number;
};

export const GetAttendanceChart = async (
  token: string,
  range: AttendanceChartRange = "90d"
) => {
  try {
    return await unwrapData(
      apiClient.get("/attendance/chart", {
        ...withAuth(token),
        params: { range },
      }),
    );
  } catch (error: any) {
    console.error("GetAttendanceChart Error:", error);

    if (error?.response?.data) {
      const msg =
        error.response.data.message ||
        error.response.data.error ||
        "Failed to load attendance chart.";
      throw new Error(msg);
    }

    throw new Error("Failed to load attendance chart.");
  }
};

export const AttendanceTimeIn = async (rfid_uid: string) => {
  return unwrapData(apiClient.post("/attendance-timein", { rfid_uid }));
};

export const AttendanceTimeOut = async (rfid_uid: string) => {
  return unwrapData(apiClient.post("/attendance-timeout", { rfid_uid }));
};

export const AttendanceTap = async (rfid_uid: string) => {
  return unwrapData(apiClient.post("/attendance-tap", { rfid_uid }));
};

export const GetAttendanceToday = async (token: string) => {
  return unwrapData(apiClient.get("/ShowTodayAttendance", withAuth(token)));
};

export const GetAttendanceBySection = async (
  token: string,
  section: string,
  start_date?: string,
  end_date?: string
) => {
  return unwrapData(
    apiClient.get(`/get-attendance-by-section/${section}`, {
      ...withAuth(token),
      params: { start_date, end_date },
    }),
  );
};

export const GenerateAbsent = async (
  token: string,
  date?: string
): Promise<GenerateAbsentResponse> => {
  try {
    return await unwrapData(
      apiClient.post(
        "/attendance/generate-absent",
        {},
        {
          ...withAuth(token),
          params: { date },
        },
      ),
    );
  } catch (error: any) {
    console.error("GenerateAbsent Error:", error);

    const msg =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Failed to generate absent students.";

    throw new Error(msg);
  }
};
