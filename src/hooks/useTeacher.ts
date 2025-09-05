import { CountTeacherActive, GetAllTeachers, GetTeacherDetails } from "@/services/Teacher_service";
import { useQuery } from "@tanstack/react-query";

export const useTeacherActiveCount = (token: string | null) => {
  return useQuery({
    queryKey: ['count-active-teachers'],
    queryFn: () => CountTeacherActive(token as string),
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
