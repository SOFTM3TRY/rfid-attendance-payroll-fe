// components/FiltersDropdown.tsx
'use client';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { TableIcon, ChevronDownIcon } from "lucide-react";

const sectionTypes = ["1", "2", "3", "4", "5", "6"];

interface Props {
  selectedFilters: string[];
  setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
}

export function FiltersDropdown({ selectedFilters, setSelectedFilters }: Props) {
  const toggleFilter = (section: string) => {
    setSelectedFilters((prev) =>
      prev.includes(section)
        ? prev.filter((t) => t !== section)
        : [...prev, section]
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <TableIcon className="w-4 h-4" />
            Filters Section
          <ChevronDownIcon className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {sectionTypes.map((section) => (
          <DropdownMenuCheckboxItem
            key={section}
            checked={selectedFilters.includes(section)}
            onCheckedChange={() => toggleFilter(section)}
          >
            {section}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

