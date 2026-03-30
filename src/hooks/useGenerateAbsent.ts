import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getApiErrorMessage } from "@/lib/api-error";
import { generateAbsent } from "@/services/attendance.service";
import { buildAuthedQueryKey } from "@/lib/query";

export function useGenerateAbsent(token: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (date?: string) => generateAbsent(token as string, date),
    onSuccess: (response) => {
      toast.success(response?.message || "Absent generation completed.");
      queryClient.invalidateQueries({
        queryKey: buildAuthedQueryKey("attendance-by-section", token),
      });
      queryClient.invalidateQueries({ queryKey: ["attendance-today"] });
      queryClient.invalidateQueries({ queryKey: ["attendance-chart"] });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Failed to generate absences."));
    },
  });
}
