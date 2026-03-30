import { useQuery } from "@tanstack/react-query";
import { DEFAULT_STALE_TIME, buildAuthedQueryKey } from "@/lib/query";
import { getHistoryLogs } from "@/services/historyLogs.service";

export function useHistoryLogs(token: string | null) {
  return useQuery({
    queryKey: buildAuthedQueryKey("history-logs", token),
    queryFn: ({ signal }) =>
      getHistoryLogs(token as string, { signal }),
    enabled: !!token,
    staleTime: DEFAULT_STALE_TIME,
  });
}
