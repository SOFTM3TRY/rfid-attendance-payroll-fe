import { CountTeacherActive, GetAllTeachers, GetTeacherDetails, GetAllAdmin, GetTeacherProfile } from "@/services/Teacher_service";
import { useQuery } from "@tanstack/react-query";

// type UseTeacherDetailsParams = {
//   id: string;
//   enabled?: boolean;
// };

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

// export const useTeacherDetails = (
//   token: string | null,
//   { id, enabled = true }: UseTeacherDetailsParams
// ) => {
//   return useQuery({
//     queryKey: ['teacher-details', id],
//     queryFn: () => GetTeacherDetails(token as string, id),
//     enabled: !!token && !!id && enabled,
//     staleTime: 1000 * 60 * 5,
//   });
// };
