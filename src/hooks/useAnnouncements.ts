import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getApiErrorMessage } from "@/lib/api-error";
import {
  createAnnouncement,
  deleteAnnouncement,
  getAllAnnouncements,
  updateAnnouncement,
} from "@/services/announcement.service";
import {
  DEFAULT_STALE_TIME,
  buildAuthedQueryKey,
} from "@/lib/query";
import type {
  CreateAnnouncementPayload,
  DeleteAnnouncementPayload,
  UpdateAnnouncementPayload,
} from "@/types/announcement";

export function useAnnouncements(token: string | null) {
  return useQuery({
    queryKey: buildAuthedQueryKey("announcements", token),
    queryFn: ({ signal }) =>
      getAllAnnouncements(token as string, { signal }),
    enabled: !!token,
    staleTime: DEFAULT_STALE_TIME,
  });
}

export function useCreateAnnouncement(token: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateAnnouncementPayload) =>
      createAnnouncement(token as string, payload),
    onSuccess: (response) => {
      toast.success(response?.message || "Announcement created.");
      queryClient.invalidateQueries({
        queryKey: buildAuthedQueryKey("announcements", token),
      });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Failed to create announcement."));
    },
  });
}

export function useUpdateAnnouncement(token: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateAnnouncementPayload) =>
      updateAnnouncement(token as string, payload),
    onSuccess: (response) => {
      toast.success(response?.message || "Announcement updated.");
      queryClient.invalidateQueries({
        queryKey: buildAuthedQueryKey("announcements", token),
      });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Failed to update announcement."));
    },
  });
}

export function useDeleteAnnouncement(token: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: DeleteAnnouncementPayload) =>
      deleteAnnouncement(token as string, payload),
    onSuccess: (response) => {
      toast.success(response?.message || "Announcement deleted.");
      queryClient.invalidateQueries({
        queryKey: buildAuthedQueryKey("announcements", token),
      });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Failed to delete announcement."));
    },
  });
}
