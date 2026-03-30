import { useQuery } from "@tanstack/react-query";
import { DEFAULT_STALE_TIME, buildAuthedQueryKey } from "@/lib/query";
import { getAttendanceBySection } from "@/services/attendance.service";

export function useAttendanceBySection(
  token: string | null,
  section: string | null | undefined,
  params?: {
    start_date?: string;
    end_date?: string;
  },
) {
  const safeSection = section ? String(section) : "";

  return useQuery({
    queryKey: buildAuthedQueryKey(
      "attendance-by-section",
      token,
      safeSection,
      params?.start_date ?? "",
      params?.end_date ?? "",
    ),
    queryFn: ({ signal }) =>
      getAttendanceBySection(token as string, safeSection, params, { signal }),
    enabled: !!token && !!safeSection,
    staleTime: DEFAULT_STALE_TIME,
  });
}
