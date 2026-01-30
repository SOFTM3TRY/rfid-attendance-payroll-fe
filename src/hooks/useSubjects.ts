import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { GetallSubjects, CreateSubject, EditSubject, DeleteSubject, GetTeacherSchedulesByGradeAndSection  } from "@/services/Subject_service";
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

export const useDeleteSubject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ token, id }: { token: string; id: number | string }) =>
      DeleteSubject(token, id),
    onSuccess: (res) => {
      toast.success(res?.message || "School Year deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["subject-details"] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Failed to delete School Year");
    },
  });
};

export const useTeacherSchedulesByGradeAndSection = (
  token: string | null,
  gradeId?: string | number | null,
  sectionId?: string | number | null
) => {
  const g = gradeId ? String(gradeId) : "";
  const s = sectionId ? String(sectionId) : "";

  return useQuery({
    queryKey: ["teacher-schedules", g, s],
    queryFn: () => GetTeacherSchedulesByGradeAndSection(token as string, g, s),
    enabled: !!token && !!g && !!s,
    staleTime: 1000 * 60 * 5,
  });
};