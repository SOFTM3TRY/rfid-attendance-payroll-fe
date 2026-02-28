import { ColumnDef } from "@tanstack/react-table";
import { Grade } from "@/types/grade";
import { Button } from "@/components/ui/button";
import { Pencil, GraduationCap, Dot } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

export const GradeColumns = (
  onEdit: (row: Grade) => void
): ColumnDef<Grade>[] => [
  {
    accessorKey: "grade_level",
    header: () => (
      <Button variant="outline" size="sm" className="font-normal text-sm">
        <GraduationCap className="text-primary" /> Grade Level
      </Button>
    ),
    cell: (info) => info.getValue(),
  },

  {
    accessorKey: "status",
    header: () => (
      <Button variant="outline" size="sm" className="font-normal text-sm">
        <Dot strokeWidth={10} className="text-blue-500" /> Available
      </Button>
    ),
    cell: ({ row }) => (
      <Badge
        variant={row.original.status === "active" ? "secondary" : "destructive"}
      >
        {row.original.status === "active" ? "Yes" : "No"}
      </Badge>
    ),
  },

  {
    id: "action",
    header: "Action",
    cell: ({ row }) => (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            className="rounded-full"
            onClick={() => onEdit(row.original)}
          >
            <Pencil className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top" align="center">
          Edit
        </TooltipContent>
      </Tooltip>
    ),
  },
];
