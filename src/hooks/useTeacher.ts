import { CountTeacherActive } from "@/services/Teacher_service";
import { useQuery } from "@tanstack/react-query";

export const useTeacherActiveCount = (token: string | null) => {
  return useQuery({
    queryKey: ['count-active-teachers'],
    queryFn: () => CountTeacherActive(token as string),
    enabled: !!token,  
    staleTime: 1000 * 60 * 5,
  });
}