import { useQuery } from '@tanstack/react-query';
import { GetStudentDetails } from '@/services/Student_service';

export const useStudentDetails = (token: string | null) => {
  return useQuery({
    queryKey: ['student-details'],
    queryFn: () => GetStudentDetails(token as string),
    enabled: !!token,  
    staleTime: 1000 * 60 * 5,
  });
};