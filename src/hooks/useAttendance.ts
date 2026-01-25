import { toast } from "react-hot-toast";
import {
  UseMutationResult,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  GetAttendanceToday,
  GetAttendanceChart,
  AttendanceChartRange,
} from "@/services/Attendance";

import { StdioNull } from "child_process";

export const useAttendanceChart = (
  token: string | null,
  range: AttendanceChartRange
) => {
  return useQuery({
    queryKey: ["attendance-chart", range],
    queryFn: () => GetAttendanceChart(token as string, range),
    enabled: !!token && !!range,
  });
};

export const useAttendanceToday = ( token: string | null) => {
  return useQuery({
    queryKey: ["attendance-today"],
    queryFn: () => GetAttendanceToday(token as string),
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
  });
}