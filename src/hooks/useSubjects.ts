import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { GetallSubjects, CreateSubject, EditSubject } from "@/services/Subject_service";
import { toast } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

export const useSubject = (token: string | null) => {
  return useQuery({
    queryKey: ["subject-details"],
    queryFn: () => GetallSubjects(token as string),
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateSubject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ token, data }: { token: string; data: any }) =>
      CreateSubject(token, data),
    onSuccess: () => {
      toast.success("Subject created successfully");
      queryClient.invalidateQueries({ queryKey: ["subject-details"] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to create new Subject");
      }
    },
  });
};

export const useEditSubject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      token,
      subjectId,
      data,
    }: {
      token: string;
      subjectId: string;
      data: { name: string; grade_id: number };
    }) => EditSubject(token, subjectId, data),

    onSuccess: () => {
      toast.success("Subject updated successfully");
      queryClient.invalidateQueries({ queryKey: ["subject-details"] });
    },

    onError: () => {
      toast.error("Failed to update Subject");
    },
  });
};