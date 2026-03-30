export type AnnouncementId = number | string;

export type AnnouncementAuthor = {
  id?: number | string | null;
  first_name?: string | null;
  middle_name?: string | null;
  last_name?: string | null;
  suffix?: string | null;
  email?: string | null;
  [key: string]: unknown;
};

export type AnnouncementRecord = {
  id: AnnouncementId;
  content?: string | null;
  email?: string | null;
  status?: string | number | boolean | null;
  date?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  user_id?: number | string | null;
  user?: AnnouncementAuthor | null;
  [key: string]: unknown;
};

export type AnnouncementListResponse = {
  status?: boolean;
  message?: string;
  data?: AnnouncementRecord[];
  [key: string]: unknown;
};

export type AnnouncementMutationResponse = {
  status?: boolean;
  message?: string;
  data?: AnnouncementRecord | null;
  [key: string]: unknown;
};

export type CreateAnnouncementPayload = {
  content: string;
  user_id?: number | string | null;
  email?: string | null;
  status?: string | number | boolean | null;
  date?: string | null;
};

export type UpdateAnnouncementPayload = {
  id: AnnouncementId;
  content: string;
  user_id?: number | string | null;
  email?: string | null;
  status?: string | number | boolean | null;
  date?: string | null;
};

export type DeleteAnnouncementPayload = {
  id: AnnouncementId;
};
