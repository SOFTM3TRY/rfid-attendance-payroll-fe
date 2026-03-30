import { useQuery } from "@tanstack/react-query";
import { userdetails } from "@/services/User_service";
import { buildAuthedQueryKey, SESSION_STALE_TIME } from "@/lib/query";

export const useUserDetails = (token: string | null) => {
  return useQuery({
    queryKey: buildAuthedQueryKey("user-details", token),
    queryFn: ({ signal }) => userdetails(token as string, { signal }),
    enabled: !!token,  
    staleTime: SESSION_STALE_TIME,
    gcTime: SESSION_STALE_TIME * 2,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};
