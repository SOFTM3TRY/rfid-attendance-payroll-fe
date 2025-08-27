import { useQuery } from '@tanstack/react-query';
import { GetallGrades } from '@/services/Grade_service';

export const useGrade = (token: string | null) => {
    return useQuery({
        queryKey: ['grade-details'],
        queryFn: () => GetallGrades(token as string),
        enabled: !!token,  
        staleTime: 1000 * 60 * 5,
    });
};