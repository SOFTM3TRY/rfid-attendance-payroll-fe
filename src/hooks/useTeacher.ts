import { CountTeacherActive, GetAllTeachers, GetTeacherDetails, GetAllAdmin, GetTeacherProfile, EditTeacher } from "@/services/Teacher_service";
import { UseMutationResult, useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useTeacherActiveCount = (token: string | null) => {
  return useQuery({
    queryKey: ['count-active-teachers'],
    queryFn: () => CountTeacherActive(token as string),
    enabled: !!token,  
    staleTime: 1000 * 60 * 5,
  });
}

export const useAllAdmins  = (token: string | null) => {
  return useQuery({
    queryKey: ['admin-details'],
    queryFn: () => GetAllAdmin(token as string),
    enabled: !!token,  
    staleTime: 1000 * 60 * 5,
  });
}

export const useAllTeachers  = (token: string | null) => {
  return useQuery({
    queryKey: ['teacher-details'],
    queryFn: () => GetAllTeachers(token as string),
    enabled: !!token,  
    staleTime: 1000 * 60 * 5,
  });
}

export const useTeacherDetails = (token: string | null, { id }: { id: string }) => {
  return useQuery({
    queryKey: ['teacher-details', id],
    queryFn: () => GetTeacherDetails(token as string, id),
    enabled: !!token && !!id,
    staleTime: 1000 * 60 * 5,
  });
};

export const useTeacherProfile = (token: string | null, { id }: { id: string }) => {
  return useQuery({
    queryKey: ['teacher-profile', id],
    queryFn: () => GetTeacherProfile(token as string, id),
    enabled: !!token && !!id,
    staleTime: 1000 * 60 * 5,
  });
};

export const useEditTeacherMutation = (
  token: string | null,
  id: string
): UseMutationResult<any, Error, any, unknown> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => EditTeacher(token as string, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teacher-details"] }); 
      toast.success("Teacher updated successfully");
    },
    onError: () => {
      toast.error("Update failed");
    }
  });
};