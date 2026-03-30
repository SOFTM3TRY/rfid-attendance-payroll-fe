import { useQuery } from "@tanstack/react-query";
import { DEFAULT_STALE_TIME, buildAuthedQueryKey } from "@/lib/query";
import { getHistoryLogById } from "@/services/historyLogs.service";

export function useHistoryLogById(
  token: string | null,
  id: number | string | null | undefined,
  enabled = true,
) {
  const safeId = id ? String(id) : "";

  return useQuery({
    queryKey: buildAuthedQueryKey("history-log", token, safeId),
    queryFn: ({ signal }) =>
      getHistoryLogById(token as string, safeId, { signal }),
    enabled: enabled && !!token && !!safeId,
    staleTime: DEFAULT_STALE_TIME,
  });
}
