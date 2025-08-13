'use client';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { TableIcon, ChevronDownIcon, CircleUser, UserCheck, UserX } from "lucide-react";

const statusTypes = ["Active", "Inactive"];

interface Props {
  selectedFilters: string[];
  setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
}

export function FiltersDropdownStatus({ selectedFilters, setSelectedFilters }: Props) {
  const toggleFilter = (status: string) => {
    setSelectedFilters((prev) =>
      prev.includes(status)
        ? prev.filter((t) => t !== status)
        : [...prev, status]
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <CircleUser className="w-4 h-4" />
          Status
          <ChevronDownIcon className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {statusTypes.map((status) => (
          <DropdownMenuCheckboxItem
            key={status}
            checked={selectedFilters.includes(status)}
            onCheckedChange={() => toggleFilter(status)}
            className="capitalize hover:bg-zinc-300 dark:hover:bg-zinc-800"
          >
            {status === "Active" ? <UserCheck /> : <UserX />} {status}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

