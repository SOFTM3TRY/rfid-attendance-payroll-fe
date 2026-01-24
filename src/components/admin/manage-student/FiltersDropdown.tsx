import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { TableIcon, ChevronDownIcon } from "lucide-react";
import { useRef } from "react";

interface Props {
  selectedFilters: string[];
  setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
  sectionTypes: string[];
}

export function FiltersDropdown({ selectedFilters, setSelectedFilters, sectionTypes }: Props) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleFilter = (section: string) => {
    setSelectedFilters((prev) =>
      prev.includes(section)
        ? prev.filter((t) => t !== section)
        : [...prev, section]
    );
  };

  const removeAllFilters = () => {
    setSelectedFilters([]);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          ref={buttonRef}
          variant="outline"
          className="flex items-center gap-2 text-xs"
        >
          <TableIcon className="size-3 text-teal-500" />
          Filters Section
          <ChevronDownIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        onCloseAutoFocus={(e) => {
          // Optional: blur to avoid retaining focus in hidden parent
          buttonRef.current?.blur();
        }}
      >
        {sectionTypes.map((section) => (
          <DropdownMenuCheckboxItem
            key={section}
            checked={selectedFilters.includes(section)}
            onCheckedChange={() => toggleFilter(section)}
            className="text-xs"
          >
            {section}
          </DropdownMenuCheckboxItem>
        ))}
        <DropdownMenuCheckboxItem
          onCheckedChange={removeAllFilters}
          className="text-xs text-primary"
        >
          Default
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

}
