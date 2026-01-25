import axios from "axios";

export type AttendanceChartRange = "7d" | "30d" | "90d";

export type AttendanceChartItem = {
  date: string;     // "2026-01-25"
  present: number;
  late: number;
  absent: number;
};

export const GetAttendanceChart = async (
  token: string,
  range: AttendanceChartRange = "90d"
) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/attendance/chart`,
      {
        params: { range },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
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
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL_API}/attendance-timein`,
            { rfid_uid }
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const AttendanceTimeOut = async (rfid_uid: string) => {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL_API}/attendance-timeout`,
            { rfid_uid }
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const AttendanceTap = async (rfid_uid: string) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL_API}/attendance-tap`,
    { rfid_uid }
  );

  return response.data;
};

export const GetAttendanceToday = async (token: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/ShowTodayAttendance`,
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