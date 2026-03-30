"use client";

import { useMemo, useState } from "react";
import { Megaphone, Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSession } from "@/context/SessionContext";
import {
  useAnnouncements,
  useCreateAnnouncement,
  useDeleteAnnouncement,
  useUpdateAnnouncement,
} from "@/hooks/useAnnouncements";
import { AnnouncementListSkeleton } from "@/components/announcements/AnnouncementListSkeleton";
import type { AnnouncementRecord } from "@/types/announcement";

function getAnnouncementAuthor(record: AnnouncementRecord) {
  if (record.email?.trim()) return record.email.trim();

  const user = record.user;
  if (!user) return "System";

  return [
    user.first_name,
    user.middle_name,
    user.last_name,
    user.suffix,
  ]
    .filter(Boolean)
    .join(" ")
    .trim() || "System";
}

function getAnnouncementDate(record: AnnouncementRecord) {
  const sourceDate = record.date || record.created_at;
  if (!sourceDate) return "Unknown date";

  const value = new Date(sourceDate);
  if (Number.isNaN(value.getTime())) {
    return sourceDate;
  }

  return value.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDatabaseDate(value: Date) {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function AnnouncementSheetContent() {
  const { token, roleId, user } = useSession();
  const canManage = roleId === 1 || roleId === 2;

  const { data, isLoading, isFetching } = useAnnouncements(token);
  const createMutation = useCreateAnnouncement(token);
  const updateMutation = useUpdateAnnouncement(token);
  const deleteMutation = useDeleteAnnouncement(token);

  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<number | string | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<AnnouncementRecord | null>(null);

  const announcements = useMemo(() => {
    const list = Array.isArray(data?.data) ? data.data : [];

    return [...list].sort((left, right) => {
      const leftTime = left.created_at ? new Date(left.created_at).getTime() : 0;
      const rightTime = right.created_at ? new Date(right.created_at).getTime() : 0;
      return rightTime - leftTime;
    });
  }, [data]);

  const isMutating =
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending;

  const resetForm = () => {
    setEditingId(null);
    setContent("");
    setEditorOpen(false);
  };

  const onSubmit = async () => {
    if (!content.trim()) return;

    const payload = {
      content: content.trim(),
      user_id: user?.id ?? null,
      email: user?.email ?? null,
      date: formatDatabaseDate(new Date()),
    };

    if (editingId !== null) {
      await updateMutation.mutateAsync({
        id: editingId,
        ...payload,
      });
    } else {
      await createMutation.mutateAsync(payload);
    }

    resetForm();
  };

  const onEdit = (record: AnnouncementRecord) => {
    setEditingId(record.id);
    setContent(record.content?.trim() || "");
    setEditorOpen(true);
  };

  const onCreate = () => {
    setEditingId(null);
    setContent("");
    setEditorOpen(true);
  };

  return (
    <div className="flex h-full flex-col gap-5 py-4 px-2">
      <div className="space-y-1">
        <h2 className="text-base font-semibold flex items-center gap-2">
          <Megaphone className="h-4 w-4 text-primary" />
          Announcements
        </h2>
        <p className="text-sm text-muted-foreground">
          {canManage
            ? "Create, edit, and remove announcements here."
            : "Latest school announcements."}
        </p>
      </div>

      {canManage ? (
        <div className="flex justify-end">
          <Button onClick={onCreate} disabled={isMutating}>
            <Plus className="h-4 w-4" />
            Create Announcement
          </Button>
        </div>
      ) : null}

      {isLoading || isFetching ? (
        <AnnouncementListSkeleton />
      ) : announcements.length ? (
        <div className="space-y-4 overflow-y-auto">
          {announcements.map((record) => (
            <article
              key={record.id}
              className="rounded-lg border bg-background p-4 space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <button
                  type="button"
                  className="flex-1 text-left space-y-3"
                  onClick={() => setSelectedAnnouncement(record)}
                >
                  <div>
                    <h3 className="font-semibold">Announcement</h3>
                    <p className="text-xs text-muted-foreground">
                      {getAnnouncementAuthor(record)} | {getAnnouncementDate(record)}
                      {record.status !== undefined && record.status !== null
                        ? ``
                        : ""}
                    </p>
                  </div>

                  <p className="text-sm leading-6 text-muted-foreground line-clamp-3">
                    {record.content?.trim() || "No message added."}
                  </p>
                </button>

                {canManage ? (
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(record)}
                      disabled={isMutating}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteMutation.mutate({ id: record.id })}
                      disabled={isMutating}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
          No announcements yet.
        </div>
      )}

      <Dialog open={editorOpen} onOpenChange={(open) => {
        if (!open) {
          resetForm();
          return;
        }

        setEditorOpen(open);
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingId !== null ? "Update Announcement" : "Create Announcement"}
            </DialogTitle>
            <DialogDescription>
              {editingId !== null ? "Update" : "Create"} an announcement
            </DialogDescription>
          </DialogHeader>

          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Announcement content"
            disabled={isMutating}
            rows={6}
            className="flex min-h-[140px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          />

          <DialogFooter>
            <Button variant="ghost" onClick={resetForm} disabled={isMutating}>
              Cancel
            </Button>
            <Button
              onClick={onSubmit}
              disabled={isMutating || !content.trim()}
            >
              {editingId !== null ? (
                <>
                  <Pencil className="h-4 w-4" />
                  Update
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  Create
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!selectedAnnouncement}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedAnnouncement(null);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Announcement</DialogTitle>
            <DialogDescription>
              {selectedAnnouncement
                ? `${getAnnouncementAuthor(selectedAnnouncement)} | ${getAnnouncementDate(selectedAnnouncement)}`
                : ""}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            <p className="text-sm leading-7 whitespace-pre-wrap">
              {selectedAnnouncement?.content?.trim() ||
                "No message added."}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
