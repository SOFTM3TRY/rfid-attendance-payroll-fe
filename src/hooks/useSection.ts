import { GetSectionsByGrade, GetAllSections } from "@/services/Section_service";
import { useQuery } from "@tanstack/react-query";

export const useSection = (token: string | null, gradeId: string) => {
  return useQuery({
    queryKey: ['sections-by-grade', gradeId],
    queryFn: () => GetSectionsByGrade(token as string, gradeId),
    enabled: !!token && !!gradeId,  
    staleTime: 1000 * 60 * 5,
  });
};

export const useAllSections = (token: string | null) => {
  return useQuery({
    queryKey: ['get-all-sections'],
    queryFn: () => GetAllSections(token as string),
    enabled: !!token,  
    staleTime: 1000 * 60 * 5,
  });
};