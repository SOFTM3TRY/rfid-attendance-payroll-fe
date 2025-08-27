'use client';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { TableIcon, ChevronDownIcon, CircleUser, UserCheck, UserX } from "lucide-react";

const statusTypes = [1, 0];

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
          <CircleUser className="w-4 h-4 text-teal-500" />
          Status
          <ChevronDownIcon className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {statusTypes.map((status) => (
          <DropdownMenuCheckboxItem
            key={status}
            checked={selectedFilters.includes(status as any)}
            onCheckedChange={() => toggleFilter(status as any)}
            className="text-xs"
          >
            {status} {status === 1 ? <UserCheck className="text-green-500 mr-1 w-2 h-2 px-0"/> : <UserX className="text-red-500 mr-1 w-2 h-2"/>} 
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

