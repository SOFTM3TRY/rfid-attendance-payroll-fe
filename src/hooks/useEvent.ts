import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateEvent, DeleteEvent, GetEvents, UpdateEvent } from "@/services/event_service";
import { toast } from "react-hot-toast";

export const useEvent = (token: string | null) => {
  return useQuery({
    queryKey: ["event-details"],
    queryFn: () => GetEvents(token as string),
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ token, data }: { token: string; data: any }) => CreateEvent(token, data),
    onSuccess: () => {
      toast.success("Event created successfully");
      queryClient.invalidateQueries({ queryKey: ["event-details"] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Failed to create new Event");
    },
  });
};

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      token,
      id,
      data,
    }: {
      token: string;
      id: number | string;
      data: any;
    }) => UpdateEvent(token, id, data),
    onSuccess: () => {
      toast.success("Event updated successfully");
      queryClient.invalidateQueries({ queryKey: ["event-details"] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Failed to update Event");
    },
  });
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ token, id }: { token: string; id: number | string }) =>
      DeleteEvent(token, id),
    onSuccess: () => {
      toast.success("Event deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["event-details"] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Failed to delete Event");
    },
  });
};
