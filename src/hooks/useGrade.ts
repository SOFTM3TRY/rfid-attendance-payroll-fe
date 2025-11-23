import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { GetallGrades, createGrade } from "@/services/Grade_service";
import { toast } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

export const useGrade = (token: string | null) => {
  return useQuery({
    queryKey: ["grade-details"],
    queryFn: () => GetallGrades(token as string),
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateGrade = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ token, data }: { token: string; data: any }) =>
      createGrade(token, data),
    onSuccess: () => {
      toast.success("Grade created successfully");
      queryClient.invalidateQueries({ queryKey: ["grade-details"] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to create new grade");
      }
    },
  });
};
