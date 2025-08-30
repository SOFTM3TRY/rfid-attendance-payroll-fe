import { GetSectionsByGrade } from "@/services/Section_service";
import { useQuery } from "@tanstack/react-query";

export const useSection = (token: string | null, gradeId: string) => {
  return useQuery({
    queryKey: ['sections-by-grade', gradeId],
    queryFn: () => GetSectionsByGrade(token as string, gradeId),
    enabled: !!token && !!gradeId,  
    staleTime: 1000 * 60 * 5,
  });
};