import { CountTeacherActive,GetAllTeachers } from "@/services/Teacher_service";
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