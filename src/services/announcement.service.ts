import type { AxiosRequestConfig } from "axios";
import { apiClient, unwrapData, withAuth } from "@/lib/api";
import type {
  AnnouncementListResponse,
  AnnouncementMutationResponse,
  CreateAnnouncementPayload,
  DeleteAnnouncementPayload,
  UpdateAnnouncementPayload,
} from "@/types/announcement";

function withAuthedConfig(
  token: string,
  config?: AxiosRequestConfig,
): AxiosRequestConfig {
  const authConfig = withAuth(token);

  return {
    ...config,
    ...authConfig,
    headers: {
      ...(authConfig.headers ?? {}),
      ...(config?.headers ?? {}),
    },
  };
}

export function getAllAnnouncements(
  token: string,
  config?: AxiosRequestConfig,
) {
  return unwrapData<AnnouncementListResponse>(
    apiClient.get(
      "/get-all-annoucement",
      withAuthedConfig(token, config),
    ),
  );
}

export function createAnnouncement(
  token: string,
  payload: CreateAnnouncementPayload,
) {
  return unwrapData<AnnouncementMutationResponse>(
    apiClient.post(
      "/create-annoucement",
      payload,
      withAuthedConfig(token),
    ),
  );
}

export function updateAnnouncement(
  token: string,
  payload: UpdateAnnouncementPayload,
) {
  return unwrapData<AnnouncementMutationResponse>(
    apiClient.get(
      "/update-annoucement",
      withAuthedConfig(token, { params: payload }),
    ),
  );
}

export function deleteAnnouncement(
  token: string,
  payload: DeleteAnnouncementPayload,
) {
  return unwrapData<AnnouncementMutationResponse>(
    apiClient.post(
      "/delete-annoucement",
      payload,
      withAuthedConfig(token),
    ),
  );
}
