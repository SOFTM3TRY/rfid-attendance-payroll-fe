"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Year } from "@/types/year";
import { Button } from "@/components/ui/button";
import { Pencil, GraduationCap, Trash2 } from "lucide-react";
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

export const YearColumns = (
  onEdit: (year: Year) => void,
  onDelete: (year: Year) => void
): ColumnDef<Year>[] => [
  {
    accessorKey: "years",
    header: () => (
      <Button variant="outline" size="sm" className="font-normal text-xs">
        <GraduationCap className="text-primary" />
        School Year
      </Button>
    ),
    cell: ({ getValue }) => (
      <span className="text-xs">{getValue() as string}</span>
    ),
  },
  {
    id: "action",
    header: () => <span className="font-normal text-xs">Actions</span>,
    cell: ({ row }) => {
      const [openDelete, setOpenDelete] = useState(false);

      return (
        <div className="flex items-center gap-2">
          {/* ✅ Edit */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className="rounded-full"
                onClick={() => onEdit(row.original)}
              >
                <Pencil className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Edit</TooltipContent>
          </Tooltip>

          {/* ✅ Delete (AlertDialog Confirm) */}
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
                <AlertDialogTitle>Delete School Year?</AlertDialogTitle>
                <AlertDialogDescription className="text-xs">
                  This will permanently delete{" "}
                  <span className="font-medium">{row.original.years}</span>.
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel size="sm" className="rounded-full">
                  Cancel
                </AlertDialogCancel>

                <AlertDialogAction
                  size="sm" className="rounded-full"
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
