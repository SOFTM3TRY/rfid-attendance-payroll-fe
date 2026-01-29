import { CountTeacherActive, GetAllTeachers, GetTeacherDetails, GetAllAdmin, GetTeacherProfile, EditTeacher, ChangeTeacherPassword, CreateTeacherSubject, UpdateTeacherAvatar } from "@/services/Teacher_service";
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

export const useChangeTeacherPassword = (token: string | null) => {
  return useMutation({
    mutationFn: ({
      id,
      new_password,
      confirm_password,
    }: {
      id: number;
      new_password: string;
      confirm_password: string;
    }) => ChangeTeacherPassword(token as string, id, new_password, confirm_password),
  });
};

export const useUpdateTeacherAvatar = (token: string | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, avatar }: { id: number; avatar: File }) =>
      UpdateTeacherAvatar(token as string, id, avatar),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teacher-details"] });
      toast.success("Teacher updated successfully");
    },
  });
};

export const useCreateTeacherSubject = (token: string | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: {
      user_id: string;
      subject_name: string;
      grade_id: string;
      schedule: string;
      schedule_day: string;
    }) => CreateTeacherSubject(token as string, payload),

    onSuccess: (res) => {
      toast.success(res?.message || "Subject created successfully.");
      // refresh teacher details + list
      queryClient.invalidateQueries({ queryKey: ["teacher-details"] });
      queryClient.invalidateQueries({ queryKey: ["teacher-profile"] });
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.error || "Failed to create subject.");
    },
  });
};
