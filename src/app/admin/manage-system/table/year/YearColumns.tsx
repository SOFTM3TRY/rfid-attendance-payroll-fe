import { ColumnDef } from "@tanstack/react-table";
import { Year } from "@/types/year";
import { Button } from "@/components/ui/button";
import { Pencil, GraduationCap, Dot } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const YearColumns = (
  onEdit: (year: Year) => void
): ColumnDef<Year>[] => [
  {
    accessorKey: "years",
    header: () => (
      <Button variant="outline" size="sm" className="font-normal text-xs">
        <GraduationCap className="text-green-500" />
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
    cell: ({ row }) => (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="sm"
            className="h-6 w-6 p-0 bg-teal-700 hover:bg-teal-600 text-white"
            onClick={() => onEdit(row.original)}
          >
            <Pencil className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Edit</TooltipContent>
      </Tooltip>
    ),
  },
];

