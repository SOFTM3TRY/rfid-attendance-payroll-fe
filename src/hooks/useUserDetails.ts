import { useQuery } from '@tanstack/react-query';
import { userdetails } from '@/services/User_service';

export const useUserDetails = (token: string | null) => {
  return useQuery({
    queryKey: ['user-details'],
    queryFn: () => userdetails(token as string),
    enabled: !!token,  
    staleTime: 1000 * 60 * 5,
  });
};
