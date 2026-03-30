import { HistoryLogsTable } from "@/components/history-logs/HistoryLogsTable";
import type { HistoryLogRecord } from "@/types/history-log";

type Props = {
  logs: HistoryLogRecord[];
};

export default function HistoryLogs({ logs }: Props) {
  return (
    <HistoryLogsTable
      title="Teacher History Logs"
      logs={logs}
    />
  );
}
