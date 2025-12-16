import { ColumnDef } from "@tanstack/react-table";
import { Subject } from "@/types/subject";
import { Button } from "@/components/ui/button";
import { Pencil, GraduationCap, Book } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

export const SubjectColumns = (
  onEdit: (row: Subject) => void
): ColumnDef<Subject>[] => [
  {
    accessorKey: "grade.grade_level",
    header: () => (
      <Button variant="outline" size="sm" className="font-normal text-sm">
        <GraduationCap className="text-green-500" /> Grade Level
      </Button>
    )
  },
  {
    accessorKey: "name",
    header: () => (
      <Button variant="outline" size="sm" className="font-normal text-sm">
        <Book className="text-green-500" /> Subject Name
      </Button>
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
            className="h-7 w-7 p-0 bg-teal-700 hover:bg-teal-600 dark:bg-teal-500/30 dark:hover:bg-teal-500/50 text-white"
            onClick={() => onEdit(row.original)}
          >
            <Pencil className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Edit</TooltipContent>
      </Tooltip>
    ),
  },
];
