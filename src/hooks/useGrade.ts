import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { GetallGrades, createGrade, GetGradeById, EditGrade } from "@/services/Grade_service";
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

export const useGetGradeById = (token: string | null, gradeId: string) => {
  return useQuery({
    queryKey: ["grade-by-id", gradeId],
    queryFn: () => GetGradeById(token as string, gradeId),
    enabled: !!token && !!gradeId,
    staleTime: 1000 * 60 * 5,
  });
};


export const useEditGrade = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ token, id, data }: { token: string; id: string; data: any }) =>
      EditGrade(token, id, data),
    onSuccess: () => {
      toast.success("Grade updated successfully");
      queryClient.invalidateQueries({ queryKey: ["grade-details"] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to update grade");
      }
    },
  });
};