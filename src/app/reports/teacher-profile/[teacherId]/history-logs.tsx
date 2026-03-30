"use client";

import { useSession } from "@/context/SessionContext";
import { useHistoryLogsByUser } from "@/hooks/useHistoryLogsByUser";
import { HistoryLogsTable } from "@/components/history-logs/HistoryLogsTable";
import { extractHistoryLogs } from "@/lib/history-log";

type Props = {
  teacherId: number | string;
};

export default function HistoryLogs({ teacherId }: Props) {
  const { token } = useSession();
  const { data: response, isLoading, isFetching } = useHistoryLogsByUser(
    token,
    teacherId,
  );
  const historyLogs = extractHistoryLogs(response);

  return (
    <HistoryLogsTable
      title="Teacher History Logs"
      logs={historyLogs}
      isLoading={isLoading || isFetching}
    />
  );
}
