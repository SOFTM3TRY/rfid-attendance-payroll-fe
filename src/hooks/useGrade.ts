import { useQuery } from '@tanstack/react-query';
import { GetallGrades, createGrade } from '@/services/Grade_service';

export const useGrade = (token: string | null) => {
    return useQuery({
        queryKey: ['grade-details'],
        queryFn: () => GetallGrades(token as string),
        enabled: !!token,  
        staleTime: 1000 * 60 * 5,
    });
};

export const useCreateGrade = (token: string | null) => {
    return useQuery({
        queryKey: ['create-grade'],
        queryFn: () => createGrade(token as string, {}),
        enabled: !!token,  
        staleTime: 1000 * 60 * 5,
    });
};