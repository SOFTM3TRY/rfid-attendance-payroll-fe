import { ColumnDef } from "@tanstack/react-table";
import { ClassSection } from "@/types/ClassSection";
import { Button } from "@/components/ui/button";
import { Pencil, GraduationCap, Dot } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

export const SectionColumns = (
  onEdit: (row: ClassSection) => void
): ColumnDef<ClassSection>[] => [
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
    accessorKey: "section_name",
    header: () => (
      <Button variant="outline" size="sm" className="font-normal text-sm">
        <GraduationCap className="text-primary" /> Section Name
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
      <Badge variant={Number(row.original.status) === 1 ? "secondary" : "destructive"}>
        {Number(row.original.status) === 1 ? "Yes" : "No"}
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
