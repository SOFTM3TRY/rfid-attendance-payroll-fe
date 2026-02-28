"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Subject } from "@/types/subject";
import { Button } from "@/components/ui/button";
import { Pencil, GraduationCap, Book, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const SubjectColumns = (
  onEdit: (row: Subject) => void,
  onDelete: (row: Subject) => void
): ColumnDef<Subject>[] => [
  {
    accessorKey: "grade.grade_level",
    header: () => (
      <Button variant="outline" size="sm" className="font-normal text-sm">
        <GraduationCap className="text-primary" /> Grade Level
      </Button>
    ),
    cell: ({ row }) => (
      <span className="text-sm">{row.original.grade?.grade_level || "N/A"}</span>
    ),
  },
  {
    accessorKey: "name",
    header: () => (
      <Button variant="outline" size="sm" className="font-normal text-sm">
        <Book className="text-primary" /> Subject Name
      </Button>
    ),
    cell: ({ row }) => <span className="text-sm">{row.original.name}</span>,
  },
  {
    id: "action",
    header: () => <span className="font-normal text-sm">Actions</span>,
    cell: ({ row }) => {
      const [openDelete, setOpenDelete] = useState(false);

      return (
        <div className="flex items-center gap-2">
          {/* Edit */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className="rounded-full"
                onClick={() => onEdit(row.original)}
              >
                <Pencil className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Edit</TooltipContent>
          </Tooltip>

          {/* Delete */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="destructive"
                className="rounded-full"
                onClick={() => setOpenDelete(true)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Delete</TooltipContent>
          </Tooltip>

          <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Subject?</AlertDialogTitle>
                <AlertDialogDescription className="text-sm">
                  This will permanently delete{" "}
                  <span className="font-medium">{row.original.name}</span> under{" "}
                  <span className="font-medium">
                    {row.original.grade?.grade_level || "N/A"}
                  </span>
                  . This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel className="rounded-full">
                  Cancel
                </AlertDialogCancel>

                <AlertDialogAction
                  className="rounded-full"
                  onClick={() => onDelete(row.original)}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
