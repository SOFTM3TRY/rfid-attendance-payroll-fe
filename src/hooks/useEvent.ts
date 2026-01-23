import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateEvent, GetEvents } from "@/services/event_service";
import { toast } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

export const useEvent = (token: string | null) => {
  return useQuery({
    queryKey: ["year-details"],
    queryFn: () => GetEvents(token as string),
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ token, data }: { token: string; data: any }) =>
      CreateEvent(token, data),
    onSuccess: () => {
      toast.success("Event created successfully");
    //   queryClient.invalidateQueries({ queryKey: ["year-details"] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to create new Event");
      }
    },
  });
};

// export const useUpdateYear = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: ({
//       token,
//       yearId,
//       data,
//     }: {
//       token: string;
//       yearId: string;
//       data: { years: string };
//     }) => UpdateYear(token, yearId, data),

//     onSuccess: () => {
//       toast.success("School Year updated successfully");
//       queryClient.invalidateQueries({ queryKey: ["year-details"] });
//     },

//     onError: () => {
//       toast.error("Failed to update School Year");
//     },
//   });
// };