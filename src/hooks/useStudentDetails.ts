import { useQuery } from '@tanstack/react-query';
import { CountActiveStudents, CountByGradeStudents, GetStudentDetails, RegisterRFIDToStudent } from '@/services/Student_service';

export const useStudentDetails = (token: string | null) => {
  return useQuery({
    queryKey: ['student-details'],
    queryFn: () => GetStudentDetails(token as string),
    enabled: !!token,  
    staleTime: 1000 * 60 * 5,
  });
};

export const useCountActiveStudents = (token: string | null) => {
  return useQuery({
    queryKey: ['count-active-students'],
    queryFn: () => CountActiveStudents(token as string),
    enabled: !!token,  
    staleTime: 1000 * 60 * 5,
  });
};
 
export const useCountByGradeStudents = (token: string | null, grade: number) => {
  return useQuery({
    queryKey: ['count-by-grade-students', grade],
    queryFn: () => CountByGradeStudents(token as string, grade),
    enabled: !!token,  
    staleTime: 1000 * 60 * 5,
  });
}

 