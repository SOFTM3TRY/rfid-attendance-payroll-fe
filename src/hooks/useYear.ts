import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { GetallYears, CreateYear, UpdateYear, DeleteYear } from "@/services/Year-service";
import { toast } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { getApiErrorMessage } from "@/lib/api-error";

export const useYear = (token: string | null) => {
  return useQuery({
    queryKey: ["year-details"],
    queryFn: () => GetallYears(token as string),
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateYear = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ token, data }: { token: string; data: any }) =>
      CreateYear(token, data),
    onSuccess: () => {
      toast.success("School Year created successfully");
      queryClient.invalidateQueries({ queryKey: ["year-details"] });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Failed to create new School Year"));
    },
  });
};

export const useUpdateYear = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      token,
      yearId,
      data,
    }: {
      token: string;
      yearId: string;
      data: { years: string };
    }) => UpdateYear(token, yearId, data),

    onSuccess: () => {
      toast.success("School Year updated successfully");
      queryClient.invalidateQueries({ queryKey: ["year-details"] });
    },

    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Failed to update School Year"));
    },
  });
};

export const useDeleteYear = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ token, id }: { token: string; id: number | string }) =>
      DeleteYear(token, id),
    onSuccess: (res) => {
      toast.success(res?.message || "School Year deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["year-details"] });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Failed to delete School Year"));
    },
  });
};
