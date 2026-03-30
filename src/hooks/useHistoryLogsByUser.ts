import { useQuery } from "@tanstack/react-query";
import { DEFAULT_STALE_TIME, buildAuthedQueryKey } from "@/lib/query";
import { getHistoryLogsByUser } from "@/services/historyLogs.service";

export function useHistoryLogsByUser(
  token: string | null,
  userId: number | string | null | undefined,
) {
  const safeUserId = userId ? String(userId) : "";

  return useQuery({
    queryKey: buildAuthedQueryKey("history-logs-user", token, safeUserId),
    queryFn: ({ signal }) =>
      getHistoryLogsByUser(token as string, safeUserId, { signal }),
    enabled: !!token && !!safeUserId,
    staleTime: DEFAULT_STALE_TIME,
  });
}
