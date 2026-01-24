'use client';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { TableIcon, ChevronDownIcon, CircleUser, UserCheck, UserX, Circle } from "lucide-react";

const statusTypes = [{ value: "1", label: "Active" }, { value: "0", label: "Inactive" }, { value: "all", label: "Default" }];

interface Props {
  selectedFilters: string[];
  setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
}

export function FiltersDropdownStatus({ selectedFilters, setSelectedFilters }: Props) {
  const toggleFilter = (status: string) => {
    if (status === "all") {
      setSelectedFilters([]);
    } else {
      setSelectedFilters((prev) =>
        prev.includes(status)
          ? prev.filter((t) => t !== status)
          : [...prev, status]
      );
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center text-xs">
          <CircleUser className="size-3 text-teal-500" />
          Status
          <ChevronDownIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {statusTypes.map(({ value, label }) => (
          <DropdownMenuCheckboxItem
            key={value}
            checked={selectedFilters.includes(value)}
            onCheckedChange={() => toggleFilter(value)}
            className="text-xs"
          >
            {value === "1" ? <UserCheck className="text-green-500 size-3"/> : value === "0" ? <UserX className="text-red-500 size-3"/> : <Circle className="text-primary size-3" />} {label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

